import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';
import { formatCurrency, formatDateByPattern } from '@/constants/format';

export type DateSummary = {
  date: string;
  income: number;
  expense: number;
  net: number;
  count: number;
};

type Props = {
  items: DateSummary[];
  dateFormat: string;
  currency: string;
};

export function DateSummaryList({ items, dateFormat, currency }: Props) {
  if (!items.length) {
    return <ThemedText style={styles.emptyText}>Belum ada transaksi untuk periode ini.</ThemedText>;
  }

  return (
    <View style={{ gap: 10 }}>
      {items.map((entry) => (
        <View key={entry.date} style={styles.dateRow}>
          <View style={{ gap: 4, flex: 1 }}>
            <ThemedText style={styles.dateLabel}>{formatDateByPattern(entry.date, dateFormat)}</ThemedText>
            <ThemedText style={styles.dateMeta}>
              {entry.count} transaksi • {formatCurrency(entry.income, currency)} pemasukan •{' '}
              {formatCurrency(entry.expense, currency)} pengeluaran
            </ThemedText>
          </View>
          <ThemedText style={[styles.dateNet, { color: entry.net >= 0 ? Palette.success : Palette.danger }]}>
            {formatCurrency(entry.net, currency)}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dateRow: {
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dateLabel: {
    fontWeight: '700',
    color: '#0f172a',
  },
  dateMeta: {
    color: Palette.slate,
    fontSize: 13,
  },
  dateNet: {
    fontWeight: '700',
  },
  emptyText: {
    color: Palette.slate,
  },
});
