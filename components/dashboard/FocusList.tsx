import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Palette } from '@/constants/design';

type FocusItem = { title: string; note: string; status: string };

export function FocusList({ items }: { items: FocusItem[] }) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <ThemedText type="subtitle">Fokus hari ini</ThemedText>
          <ThemedText style={styles.cardCaption}>Tugas singkat untuk pemilik</ThemedText>
        </View>
        <MaterialIcons name="flag" size={18} color={Palette.warning} />
      </View>
      <View style={{ gap: 12 }}>
        {items.map((item) => (
          <View key={item.title} style={styles.focusItem}>
            <View style={{ flex: 1, gap: 2 }}>
              <ThemedText style={styles.focusTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.focusNote}>{item.note}</ThemedText>
            </View>
            <View style={styles.focusBadge}>
              <MaterialIcons name="circle" size={8} color={Palette.primary} />
              <ThemedText style={styles.focusBadgeText}>{item.status}</ThemedText>
            </View>
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
    flex: 1,
    width: '100%',
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCaption: {
    color: Palette.slate,
    fontSize: 13,
  },
  focusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  focusTitle: {
    fontWeight: '600',
    color: '#0f172a',
  },
  focusNote: {
    color: Palette.slate,
    fontSize: 13,
  },
  focusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.accentSurface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d5e3ff',
  },
  focusBadgeText: {
    color: Palette.primary,
    fontSize: 13,
  },
});
