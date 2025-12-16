import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import { DateSummaryList, type DateSummary } from '@/components/reports/DateSummaryList';
import { PeriodSwitcher } from '@/components/reports/PeriodSwitcher';
import { StatTile } from '@/components/reports/StatTile';
import { SectionCard } from '@/components/ui/SectionCard';
import { Palette } from '@/constants/design';
import { formatCurrency, formatDateWithWeekday } from '@/constants/format';
import { Transaction } from '@/constants/transactions';
import { useSettings } from '@/hooks/use-settings';
import { useTransactions } from '@/hooks/use-transactions';

type Summary = {
  income: number;
  expense: number;
  net: number;
  count: number;
};

const todayIso = new Date().toISOString().slice(0, 10);

const computeSummary = (list: Transaction[]): Summary =>
  list.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.income += item.amount;
      } else {
        acc.expense += item.amount;
      }
      acc.count += 1;
      acc.net = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, net: 0, count: 0 } as Summary
  );

const groupByDate = (list: Transaction[]): DateSummary[] => {
  const map = new Map<string, Summary>();
  list.forEach((item) => {
    const current = map.get(item.date) ?? { income: 0, expense: 0, net: 0, count: 0 };
    if (item.type === 'income') {
      current.income += item.amount;
    } else {
      current.expense += item.amount;
    }
    current.count += 1;
    current.net = current.income - current.expense;
    map.set(item.date, current);
  });
  return Array.from(map.entries())
    .map(([date, summary]) => ({ ...summary, date }))
    .sort((a, b) => b.date.localeCompare(a.date));
};

const shiftDate = (iso: string, deltaDays: number) => {
  const date = new Date(iso);
  date.setDate(date.getDate() + deltaDays);
  return date.toISOString().slice(0, 10);
};

const shiftMonth = (isoMonth: string, deltaMonths: number) => {
  const [year, month] = isoMonth.split('-').map((n) => Number(n));
  const date = new Date(year, month - 1 + deltaMonths, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const formatMonthLabel = (isoMonth: string) =>
  new Date(`${isoMonth}-01`).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

export default function ReportsScreen() {
  const { items } = useTransactions();
  const { settings } = useSettings();
  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [selectedMonth, setSelectedMonth] = useState(todayIso.slice(0, 7));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const dailyItems = useMemo(() => items.filter((item) => item.date === selectedDate), [items, selectedDate]);
  const monthlyItems = useMemo(
    () => items.filter((item) => item.date.startsWith(selectedMonth)),
    [items, selectedMonth]
  );

  const dailySummary = useMemo(() => computeSummary(dailyItems), [dailyItems]);
  const monthlySummary = useMemo(() => computeSummary(monthlyItems), [monthlyItems]);
  const monthlyGrouped = useMemo(() => groupByDate(monthlyItems), [monthlyItems]);

  const dateLabel = formatDateWithWeekday(selectedDate, settings.dateFormat);
  const monthLabel = formatMonthLabel(selectedMonth);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <SectionCard
          title="Ringkasan harian"
          hint="Filter berdasarkan tanggal input transaksi"
          right={
            <PeriodSwitcher
              label={dateLabel}
              onPrev={() => setSelectedDate(shiftDate(selectedDate, -1))}
              onNext={() => setSelectedDate(shiftDate(selectedDate, 1))}
              onReset={() => setSelectedDate(todayIso)}
              resetLabel="Hari ini"
              onLabelPress={() => setShowDatePicker(true)}
            />
          }>
          <View style={styles.statRow}>
            <StatTile
              label="Pemasukan"
              value={formatCurrency(dailySummary.income, settings.currency)}
              meta={`${dailySummary.count} transaksi`}
              color={Palette.success}
            />
            <StatTile
              label="Pengeluaran"
              value={formatCurrency(dailySummary.expense, settings.currency)}
              meta={`${dailySummary.count} transaksi`}
              color={Palette.danger}
            />
            <StatTile
              label="Saldo"
              value={formatCurrency(dailySummary.net, settings.currency)}
              meta="Pemasukan - Pengeluaran"
              color={dailySummary.net >= 0 ? Palette.success : Palette.danger}
            />
          </View>
        </SectionCard>

        <SectionCard title="Ringkasan bulanan" hint="Agregasi per tanggal di bulan terpilih">
          <PeriodSwitcher
            label={monthLabel}
            onPrev={() => setSelectedMonth(shiftMonth(selectedMonth, -1))}
            onNext={() => setSelectedMonth(shiftMonth(selectedMonth, 1))}
            onReset={() => setSelectedMonth(todayIso.slice(0, 7))}
            resetLabel="Bulan ini"
            onLabelPress={() => setShowMonthPicker(true)}
          />

          <View style={styles.statRow}>
            <StatTile
              label="Total pemasukan"
              value={formatCurrency(monthlySummary.income, settings.currency)}
              meta={`${monthlySummary.count} transaksi`}
              color={Palette.success}
            />
            <StatTile
              label="Total pengeluaran"
              value={formatCurrency(monthlySummary.expense, settings.currency)}
              meta={`${monthlySummary.count} transaksi`}
              color={Palette.danger}
            />
            <StatTile
              label="Saldo bulan ini"
              value={formatCurrency(monthlySummary.net, settings.currency)}
              meta="Setelah pengeluaran"
              color={monthlySummary.net >= 0 ? Palette.success : Palette.danger}
            />
          </View>

          <DateSummaryList items={monthlyGrouped} dateFormat={settings.dateFormat} currency={settings.currency} />
        </SectionCard>
        {showDatePicker ? (
          <DateTimePicker
            value={new Date(selectedDate)}
            mode="date"
            display="spinner"
            onChange={(_, date) => {
              if (date) setSelectedDate(date.toISOString().slice(0, 10));
              setShowDatePicker(false);
            }}
          />
        ) : null}

        {showMonthPicker ? (
          <DateTimePicker
            value={new Date(`${selectedMonth}-01`)}
            mode="date"
            display="spinner"
            onChange={(_, date) => {
              if (date) {
                const iso = date.toISOString().slice(0, 7);
                setSelectedMonth(iso);
              }
              setShowMonthPicker(false);
            }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.surface,
  },
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
});
