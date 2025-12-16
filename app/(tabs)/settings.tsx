import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsAuthCard } from '@/components/settings/SettingsAuthCard';
import { SettingsIdentityCard } from '@/components/settings/SettingsIdentityCard';
import { SettingsPreferencesCard } from '@/components/settings/SettingsPreferencesCard';
import { SettingsStatusCard } from '@/components/settings/SettingsStatusCard';
import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';
import { useAuth } from '@/hooks/use-auth';
import { AppSettings, useSettings } from '@/hooks/use-settings';

export default function SettingsScreen() {
  const { settings, isLoading, isSaving, updateSettings, resetSettings } = useSettings();
  const { user, logout } = useAuth();

  const handleChange = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) =>
    updateSettings({ [key]: value } as Partial<AppSettings>);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.loadingState}>
          <ActivityIndicator animating color={Palette.primary} />
          <ThemedText style={{ marginTop: 10 }}>Memuat pengaturan...</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (user && user.role !== 'admin') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.loadingState}>
          <ThemedText type="subtitle">Akses Settings hanya untuk Admin</ThemedText>
          <ThemedText style={{ color: Palette.slate, textAlign: 'center' }}>
            Hubungi admin untuk mengubah identitas usaha atau preferensi format.
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <SettingsIdentityCard settings={settings} onChange={handleChange} />
        <SettingsPreferencesCard settings={settings} onChange={handleChange} />
        <SettingsAuthCard user={user} onLogout={logout} />
        <SettingsStatusCard isSaving={isSaving} onReset={resetSettings} onLogout={logout} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.surface,
  },
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  loadingState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Palette.surface,
  },
});
