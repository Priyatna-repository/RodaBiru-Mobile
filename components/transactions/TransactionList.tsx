import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';
import { formatCurrency, formatDateByPattern } from '@/constants/format';
import { Transaction } from '@/constants/transactions';
import { useSettings } from '@/hooks/use-settings';

type Props = {
  items: Transaction[];
  onAddPress?: () => void;
};

// Simple list renderer separated from screen to encourage reuse across tabs.
export function TransactionList({ items, onAddPress }: Props) {
  const { settings } = useSettings();

  if (!items.length) {
    return (
      <View style={styles.emptyState}>
        <ThemedText style={styles.emptyTitle}>Belum ada transaksi</ThemedText>
        <ThemedText style={styles.emptyHint}>Tekan tombol tambah untuk mulai mencatat.</ThemedText>
        {onAddPress ? (
          <Pressable style={styles.addRow} onPress={onAddPress}>
            <ThemedText style={styles.addText}>Tambah transaksi</ThemedText>
          </Pressable>
        ) : null}
      </View>
    );
  }

  return (
    <View style={{ gap: 10 }}>
      {items.map((item) => (
        <View key={item.id} style={styles.transactionRow}>
          <View style={styles.dot(item.type === 'income' ? Palette.success : Palette.danger)} />
          <View style={{ flex: 1, gap: 4 }}>
            <ThemedText style={styles.transactionTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.transactionMeta}>
              {[
                item.date ? formatDateByPattern(item.date, settings.dateFormat) : null,
                item.time,
                item.category,
                item.method,
              ]
                .filter((part): part is string => Boolean(part))
                .join(' • ')}
            </ThemedText>
          </View>
          <ThemedText
            style={[
              styles.transactionAmount,
              { color: item.type === 'income' ? Palette.success : Palette.danger },
            ]}>
            {item.type === 'income' ? '+' : '-'}
            {formatCurrency(item.amount, settings.currency)}
          </ThemedText>
        </View>
      ))}

      {onAddPress ? (
        <Pressable style={styles.addRow} onPress={onAddPress}>
          <ThemedText style={styles.addText}>Tambah transaksi manual</ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  transactionTitle: {
    fontWeight: '600',
    color: '#0f172a',
  },
  transactionMeta: {
    color: Palette.slate,
    fontSize: 13,
  },
  transactionAmount: {
    fontWeight: '700',
  },
  addRow: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.accentSurface,
    backgroundColor: Palette.accentSurface,
    alignItems: 'center',
  },
  addText: {
    color: Palette.primary,
    fontWeight: '700',
  },
  emptyState: {
    gap: 6,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: '#fff',
  },
  emptyTitle: {
    fontWeight: '700',
    color: '#0f172a',
  },
  emptyHint: {
    color: Palette.slate,
  },
  dot: (color: string) => ({
    width: 10,
    height: 10,
    borderRadius: 12,
    backgroundColor: color,
  }),
});
