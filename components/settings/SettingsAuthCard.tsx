import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { ThemedText } from '@/components/themed-text';
import { SectionCard } from '@/components/ui/SectionCard';
import { Palette } from '@/constants/design';
import { AuthUser } from '@/hooks/use-auth';

type Props = {
  user: AuthUser | null;
  onLogout: () => void;
};

export function SettingsAuthCard({ user, onLogout }: Props) {
  return (
    <SectionCard title="Akun" hint="Role mempengaruhi akses menu & aksi">
      {user ? (
        <View style={styles.userRow}>
          <View style={{ flex: 1, gap: 4 }}>
            <ThemedText style={styles.name}>{user.name}</ThemedText>
            <ThemedText style={styles.meta}>{user.email}</ThemedText>
            <ThemedText style={styles.meta}>Role: {user.role}</ThemedText>
          </View>
          <Button mode="outlined" textColor={Palette.danger} onPress={onLogout}>
            Keluar
          </Button>
        </View>
      ) : (
        <ThemedText style={styles.meta}>Belum login (gunakan layar Login untuk masuk).</ThemedText>
      )}
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontWeight: '700',
    color: '#0f172a',
  },
  meta: {
    color: Palette.slate,
  },
});
