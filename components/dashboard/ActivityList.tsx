import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Palette } from '@/constants/design';

type ActivityItem = { title: string; detail: string; icon: string };

export function ActivityList({ items }: { items: ActivityItem[] }) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Aktivitas terbaru</ThemedText>
        <View style={styles.badgeLight}>
          <MaterialIcons name="history" size={16} color={Palette.primary} />
          <ThemedText style={styles.badgeLightText}>Live preview</ThemedText>
        </View>
      </View>
      <View style={{ gap: 10 }}>
        {items.map((item) => (
          <View key={item.title} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <MaterialIcons name={item.icon as any} size={18} color={Palette.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.activityTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.activityDetail}>{item.detail}</ThemedText>
            </View>
            <MaterialIcons name="chevron-right" size={18} color="#94a3b8" />
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  badgeLight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.accentSurface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeLightText: {
    color: Palette.primary,
    fontSize: 13,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Palette.accentSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontWeight: '600',
    color: '#0f172a',
  },
  activityDetail: {
    color: Palette.slate,
    fontSize: 13,
  },
});
