import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';

type Props = {
  categories: string[];
  onSelect: (value: string) => void;
};

// Simple chip list for frequently used categories.
export function FrequentCategories({ categories, onSelect }: Props) {
  return (
    <View style={styles.chipRow}>
      {categories.map((cat) => (
        <Pressable key={cat} style={styles.secondaryChip} onPress={() => onSelect(cat)}>
          <ThemedText style={styles.secondaryChipText}>{cat}</ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  secondaryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: Palette.border,
  },
  secondaryChipText: {
    color: '#0f172a',
    fontWeight: '600',
  },
});
