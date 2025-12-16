import React from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityList } from '@/components/dashboard/ActivityList';
import { CashflowCard } from '@/components/dashboard/CashflowCard';
import { FocusList } from '@/components/dashboard/FocusList';
import { HeroCard } from '@/components/dashboard/HeroCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { SectionCard } from '@/components/ui/SectionCard';
import { Palette } from '@/constants/design';
import { formatDateWithWeekday } from '@/constants/format';
import { useSettings } from '@/hooks/use-settings';

const quickActions = [
  { label: 'Tambah pemasukan', icon: 'trending-up', background: '#e7f0ff', color: Palette.primary },
  { label: 'Tambah pengeluaran', icon: 'trending-down', background: '#ffefef', color: '#d14343' },
  { label: 'Master kategori', icon: 'category', background: '#e8fff3', color: '#0f9d58' },
  { label: 'Lihat laporan', icon: 'stacked-line-chart', background: '#fff7e6', color: '#f59e0b' },
];

const focusItems = [
  { title: 'Input transaksi shift siang', note: 'Target selesai pukul 14.00', status: 'Sedang jalan' },
  { title: 'Review pengeluaran bahan baku', note: 'Cek selisih stok vs kas', status: 'Prioritas' },
];

const activityItems = [
  { title: '5 transaksi baru dicatat', detail: '09:20 oleh Maya', icon: 'assignment-turned-in' },
  { title: 'Pengeluaran listrik diupdate', detail: '08:45 oleh Rudi', icon: 'bolt' },
  { title: 'Kategori QRIS ditambahkan', detail: 'Kemarin oleh Admin', icon: 'qr-code-scanner' },
];

const cashflow = {
  income: 4250000,
  expense: 2180000,
};

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { settings } = useSettings();
  const isCompact = width < 720;
  const todayLabel = formatDateWithWeekday(new Date(), settings.dateFormat);
  const badge = `Preferensi ${settings.currency} • ${settings.dateFormat}`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <HeroCard
          title={settings.businessName || 'Roda Biru'}
          subtitle={settings.address || 'Dashboard pemilik'}
          caption={todayLabel}
          badge={badge}
          logoUri={settings.logoUri}
          reminders={['Reminder input 19.00', '2 karyawan aktif']}
        />

        <SectionCard title="Quick actions" hint="Belum terhubung ke API (tahap prototype)">
          <QuickActions actions={quickActions} />
        </SectionCard>

        <View style={[styles.splitRow, isCompact && styles.splitRowStack]}>
          <CashflowCard
            income={cashflow.income}
            expense={cashflow.expense}
            note="Data contoh untuk validasi alur"
          />
          <FocusList items={focusItems} />
        </View>

        <ActivityList items={activityItems} />
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
  },
  splitRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  splitRowStack: {
    flexDirection: 'column',
  },
});
