import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';
import { TransactionType } from '@/constants/transactions';

type RangeFilter = 'today' | 'week' | 'month';
type TypeFilter = 'all' | TransactionType;

type Props = {
  rangeFilter: RangeFilter;
  typeFilter: TypeFilter;
  onChangeRange: (value: RangeFilter) => void;
  onChangeType: (value: TypeFilter) => void;
};

const rangeOptions: { label: string; value: RangeFilter }[] = [
  { label: 'Hari ini', value: 'today' },
  { label: 'Minggu ini', value: 'week' },
  { label: 'Bulan ini', value: 'month' },
];

const typeOptions: { label: string; value: TypeFilter }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Pemasukan', value: 'income' },
  { label: 'Pengeluaran', value: 'expense' },
];

// Filter chips split out to keep screen tidy.
export function TransactionFilters({ rangeFilter, typeFilter, onChangeRange, onChangeType }: Props) {
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.chipRow}>
        {rangeOptions.map((option) => (
          <Pressable
            key={option.value}
            style={[styles.chip, rangeFilter === option.value && styles.chipActive]}
            onPress={() => onChangeRange(option.value)}>
            <ThemedText
              style={[styles.chipText, rangeFilter === option.value && styles.chipTextActive]}>
              {option.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>
      <View style={styles.chipRow}>
        {typeOptions.map((option) => (
          <Pressable
            key={option.value}
            style={[styles.chip, typeFilter === option.value && styles.chipActive]}
            onPress={() => onChangeType(option.value)}>
            <ThemedText
              style={[styles.chipText, typeFilter === option.value && styles.chipTextActive]}>
              {option.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: '#fff',
  },
  chipActive: {
    backgroundColor: Palette.accentSurface,
    borderColor: '#d5e3ff',
  },
  chipText: {
    color: '#0f172a',
  },
  chipTextActive: {
    color: Palette.primary,
    fontWeight: '700',
  },
});
