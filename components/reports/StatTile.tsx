import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';

type Props = {
  label: string;
  value: string;
  meta: string;
  color: string;
};

export function StatTile({ label, value, meta, color }: Props) {
  return (
    <View style={styles.statTile}>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
      <ThemedText style={[styles.statValue, { color }]}>{value}</ThemedText>
      <ThemedText style={styles.statMeta}>{meta}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  statTile: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  statLabel: {
    color: Palette.slate,
    fontSize: 14,
  },
  statValue: {
    fontWeight: '700',
    fontSize: 18,
  },
  statMeta: {
    color: '#64748b',
    fontSize: 13,
  },
});
