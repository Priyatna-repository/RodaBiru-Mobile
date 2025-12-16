import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { ThemedText } from '@/components/themed-text';
import { SectionCard } from '@/components/ui/SectionCard';
import { Palette } from '@/constants/design';
import { AppSettings } from '@/hooks/use-settings';

type Props = {
  settings: AppSettings;
  onChange: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
};

export function SettingsIdentityCard({ settings, onChange }: Props) {
  return (
    <SectionCard title="Identitas usaha" hint="Ditampilkan di Dashboard & Laporan">
      <TextInput
        label="Nama usaha"
        mode="outlined"
        dense
        value={settings.businessName}
        onChangeText={(text) => onChange('businessName', text)}
        style={styles.input}
      />
      <TextInput
        label="Alamat singkat"
        mode="outlined"
        dense
        multiline
        value={settings.address}
        onChangeText={(text) => onChange('address', text)}
        style={styles.input}
      />
      <Pressable style={styles.logoButton}>
        <MaterialIcons name="image" size={18} color={Palette.primary} />
        <View>
          <ThemedText style={styles.logoText}>
            {settings.logoUri ? 'Ganti logo (placeholder)' : 'Pilih logo (belum aktif)'}
          </ThemedText>
          <ThemedText style={styles.logoHint}>Simbol akan muncul di Dashboard & PDF</ThemedText>
        </View>
      </Pressable>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
  },
  logoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
  },
  logoText: {
    fontWeight: '700',
    color: '#0f172a',
  },
  logoHint: {
    color: Palette.slate,
    fontSize: 12,
  },
});
