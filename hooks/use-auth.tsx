import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type UserRole = 'admin' | 'karyawan';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => Promise<void>;
};

const STORAGE_KEY = 'rb_auth_user';

const demoUsers: Array<AuthUser & { password: string }> = [
  {
    id: 'u-admin',
    name: 'Admin Roda Biru',
    email: 'admin@rodabiru.local',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 'u-staff',
    name: 'Karyawan Shift',
    email: 'staff@rodabiru.local',
    password: 'shift123',
    role: 'karyawan',
  },
];

const AuthContext = createContext<AuthContextValue | null>(null);

function useProvideAuth(): AuthContextValue {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (error) {
        console.warn('Failed to load auth user', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next: AuthUser | null) => {
    if (next) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback<AuthContextValue['login']>(
    async (email, password) => {
      const normalizedEmail = email.trim().toLowerCase();
      const matched = demoUsers.find(
        (candidate) =>
          candidate.email === normalizedEmail && candidate.password === password.trim()
      );

      if (!matched) {
        return { ok: false, error: 'Email atau password salah (demo: admin@rodabiru.local / admin123)' };
      }

      const { password: _hidden, ...safeUser } = matched;
      setUser(safeUser);
      await persist(safeUser);
      return { ok: true };
    },
    [persist]
  );

  const logout = useCallback(async () => {
    setUser(null);
    await persist(null);
  }, [persist]);

  return { user, isLoading, login, logout };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = useProvideAuth();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
