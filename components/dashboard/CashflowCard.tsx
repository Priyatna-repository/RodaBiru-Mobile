import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Card, ProgressBar, Text } from 'react-native-paper';

import { Palette } from '@/constants/design';
import { formatCurrencyId } from '@/constants/format';

type Props = {
  income: number;
  expense: number;
  note: string;
  onPress?: () => void;
};

// Cashflow snapshot using react-native-paper with responsive stacking for small screens.
export function CashflowCard({ income, expense, note, onPress }: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 720;
  const balance = income - expense;
  const balanceColor = balance >= 0 ? Palette.success : Palette.danger;
  const progress = income > 0 ? Math.min(Math.max(expense / income, 0), 1) : 0;

  return (
    <Card mode="outlined" style={styles.card} onPress={onPress}>
      <Card.Title
        title="Cashflow hari ini"
        titleVariant="titleSmall"
        subtitle={note}
        subtitleStyle={styles.cardCaption}
        right={(props) => <MaterialIcons name="chevron-right" color="#64748b" {...props} />}
      />
      <Card.Content style={{ gap: 12 }}>
        <View style={[styles.cashRow, isCompact && styles.cashRowStack]}>
          <StatBlock
            label="Pemasukan"
            value={formatCurrencyId(income)}
            color={Palette.success}
            meta="Penjualan & takeaway"
          />
          <StatBlock
            label="Pengeluaran"
            value={formatCurrencyId(expense)}
            color={Palette.danger}
            meta="Bahan baku & operasional"
          />
        </View>
        <View style={styles.balanceRow}>
          <MaterialIcons name="account-balance-wallet" size={18} color={balanceColor} />
          <Text variant="titleMedium" style={[styles.balanceText, { color: balanceColor }]}>
            Saldo: {formatCurrencyId(balance)}
          </Text>
        </View>
        <View style={{ gap: 6 }}>
          <View style={styles.legendRow}>
            <LegendDot color={Palette.success} label="Pemasukan" />
            <LegendDot color={Palette.danger} label="Pengeluaran" />
          </View>
          <ProgressBar progress={progress} color={Palette.danger} style={styles.progress} />
        </View>
      </Card.Content>
    </Card>
  );
}

function StatBlock({
  label,
  value,
  color,
  meta,
}: {
  label: string;
  value: string;
  color: string;
  meta: string;
}) {
  return (
    <View style={styles.cashItem}>
      <Text variant="labelLarge" style={styles.cashLabel}>
        {label}
      </Text>
      <Text variant="titleMedium" style={[styles.cashValue, { color }]}>
        {value}
      </Text>
      <Text variant="bodySmall" style={styles.cashNote}>
        {meta}
      </Text>
    </View>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text variant="bodySmall" style={styles.legendText}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
   flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  cardCaption: {
    color: Palette.slate,
  },
  cashRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cashRowStack: {
    flexDirection: 'column',
  },
  cashItem: {
    flex: 1,
    gap: 4,
  },
  cashLabel: {
    color: Palette.slate,
  },
  cashValue: {
    fontWeight: '700',
  },
  cashNote: {
    color: '#64748b',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  balanceText: {
    fontWeight: '700',
  },
  legendRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendText: {
    color: Palette.slate,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 12,
  },
  progress: {
    height: 8,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
  },
});
