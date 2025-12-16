import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { DateFormat } from '@/constants/format';

export type WeekStart = 'monday' | 'sunday';
export type CurrencyCode = 'IDR' | 'USD';

export type AppSettings = {
  businessName: string;
  address: string;
  currency: CurrencyCode;
  dateFormat: DateFormat;
  weekStart: WeekStart;
  logoUri?: string | null;
};

type SettingsContextValue = {
  settings: AppSettings;
  isLoading: boolean;
  isSaving: boolean;
  updateSettings: (patch: Partial<AppSettings>) => void;
  resetSettings: () => void;
};

const SETTINGS_KEY = 'rb_settings';

const defaultSettings: AppSettings = {
  businessName: 'Roda Biru',
  address: 'Dashboard pemilik',
  currency: 'IDR',
  dateFormat: 'DD/MM/YYYY',
  weekStart: 'monday',
  logoUri: null,
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

const parseSettings = (raw: string | null): AppSettings => {
  if (!raw) return defaultSettings;
  try {
    const saved = JSON.parse(raw) as Partial<AppSettings>;
    return { ...defaultSettings, ...saved };
  } catch {
    return defaultSettings;
  }
};

function useProvideSettings(): SettingsContextValue {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const persistTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_KEY);
        setSettings(parseSettings(stored));
      } catch (error) {
        console.warn('Failed to load settings', error);
        setSettings(defaultSettings);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next: AppSettings) => {
    setIsSaving(true);
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn('Failed to persist settings', error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const schedulePersist = useCallback(
    (next: AppSettings) => {
      if (persistTimeout.current) clearTimeout(persistTimeout.current);
      persistTimeout.current = setTimeout(() => {
        persist(next);
      }, 250);
    },
    [persist]
  );

  const updateSettings = useCallback(
    (patch: Partial<AppSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...patch };
        schedulePersist(next);
        return next;
      });
    },
    [schedulePersist]
  );

  const resetSettings = useCallback(() => {
    if (persistTimeout.current) clearTimeout(persistTimeout.current);
    setSettings(defaultSettings);
    persist(defaultSettings);
  }, [persist]);

  useEffect(
    () => () => {
      if (persistTimeout.current) clearTimeout(persistTimeout.current);
    },
    []
  );

  return { settings, isLoading, isSaving, updateSettings, resetSettings };
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const value = useProvideSettings();
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}

export const defaultAppSettings = defaultSettings;
