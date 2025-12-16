import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { ThemedText } from '@/components/themed-text';
import { SectionCard } from '@/components/ui/SectionCard';
import { Palette } from '@/constants/design';

type Props = {
  isSaving: boolean;
  onReset: () => void;
  onLogout?: () => void;
};

export function SettingsStatusCard({ isSaving, onReset, onLogout }: Props) {
  return (
    <SectionCard title="Sinkronisasi & status" hint="Auto-simpan ke perangkat (AsyncStorage)">
      <View style={styles.statusRow}>
        <MaterialIcons name="cloud-done" size={18} color={Palette.primary} />
        <ThemedText style={styles.statusText}>
          {isSaving ? 'Menyimpan perubahan...' : 'Tersimpan di perangkat'}
        </ThemedText>
      </View>
      <View style={styles.actionsRow}>
        <Button mode="contained" buttonColor={Palette.primary} onPress={onReset} icon="backup-restore">
          Reset ke default
        </Button>
        {onLogout ? (
          <Button mode="text" textColor={Palette.danger} onPress={onLogout}>
            Logout
          </Button>
        ) : null}
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
});
