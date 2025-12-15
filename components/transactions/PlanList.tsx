import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';

type PlanItem = { title: string; meta: string; icon: string };

export function PlanList({ items }: { items: PlanItem[] }) {
  return (
    <View style={{ gap: 10 }}>
      {items.map((item) => (
        <View key={item.title} style={styles.planRow}>
          <View style={styles.planIcon}>
            <MaterialIcons name={item.icon as any} size={18} color={Palette.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.planTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.planMeta}>{item.meta}</ThemedText>
          </View>
          <MaterialIcons name="chevron-right" size={18} color="#94a3b8" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  planIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Palette.accentSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTitle: {
    fontWeight: '600',
    color: '#0f172a',
  },
  planMeta: {
    color: Palette.slate,
    fontSize: 13,
  },
});
