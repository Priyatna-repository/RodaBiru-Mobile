import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';
import { formatCurrencyId } from '@/constants/format';

type Totals = {
  income: number;
  expense: number;
  incomeCount: number;
  expenseCount: number;
};

// Aggregated tiles for transaksi summary.
export function TransactionSummary({
  totals,
  balance,
}: {
  totals: Totals;
  balance: number;
}) {
  return (
    <View style={{ gap: 12 }}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Ringkasan hari ini</ThemedText>
        <MaterialIcons name="chevron-right" size={18} color="#64748b" />
      </View>
      <View style={styles.grid}>
        <SummaryItem
          label="Pemasukan"
          value={formatCurrencyId(totals.income)}
          meta={`${totals.incomeCount} transaksi`}
          color={Palette.success}
        />
        <SummaryItem
          label="Pengeluaran"
          value={formatCurrencyId(totals.expense)}
          meta={`${totals.expenseCount} transaksi`}
          color={Palette.danger}
        />
        <SummaryItem
          label="Saldo"
          value={formatCurrencyId(balance)}
          meta="Setelah biaya operasional"
          color={Palette.primary}
        />
      </View>
    </View>
  );
}

function SummaryItem({
  label,
  value,
  meta,
  color,
}: {
  label: string;
  value: string;
  meta: string;
  color: string;
}) {
  return (
    <View style={styles.item}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <ThemedText style={[styles.value, { color }]}>{value}</ThemedText>
      <ThemedText style={styles.meta}>{meta}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    flex: 1,
    minWidth: '30%',
    gap: 4,
  },
  label: {
    color: Palette.slate,
    fontSize: 14,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  meta: {
    color: '#64748b',
    fontSize: 13,
  },
});
