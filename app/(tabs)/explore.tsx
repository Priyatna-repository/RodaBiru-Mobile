import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { FrequentCategories } from '@/components/transactions/FrequentCategories';
import { PlanList } from '@/components/transactions/PlanList';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionHeader } from '@/components/transactions/TransactionHeader';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionSummary } from '@/components/transactions/TransactionSummary';
import { SectionCard } from '@/components/ui/SectionCard';
import { Palette } from '@/constants/design';
import { formatDateWithWeekday } from '@/constants/format';
import { useSettings } from '@/hooks/use-settings';
import { useTransactions } from '@/hooks/use-transactions';

const favouriteCategories = ['Makan di tempat', 'Takeaway', 'Bahan baku', 'Operasional', 'Gaji'];
const planItems = [
  { title: 'Cek stok bahan baku', meta: 'Catat selisih sebelum shift malam', icon: 'inventory' },
  { title: 'Rekap pembayaran QRIS', meta: 'Sinkronkan sebelum pukul 21.00', icon: 'qr-code-scanner' },
];

export default function TransactionsScreen() {
  const router = useRouter();
  const { settings } = useSettings();
  const { items, filteredItems, totals, balance, rangeFilter, typeFilter, setRangeFilter, setTypeFilter } =
    useTransactions();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TransactionHeader
          title="Transaksi"
          subtitle="Pencatatan harian karyawan dan admin"
          dateLabel={formatDateWithWeekday(new Date(), settings.dateFormat)}
          info={`Format ${settings.dateFormat} | Mata uang ${settings.currency} | Data lokal`}
          onAdd={() => router.push('/modal')}
        />

        <SectionCard title="Filter cepat" hint="Range belum aktif (menunggu field tanggal)">
          <TransactionFilters
            rangeFilter={rangeFilter}
            typeFilter={typeFilter}
            onChangeRange={setRangeFilter}
            onChangeType={setTypeFilter}
          />
        </SectionCard>

        <SectionCard title="Ringkasan hari ini">
          <TransactionSummary totals={totals} balance={balance} />
        </SectionCard>

        <SectionCard
          title="Transaksi hari ini"
          hint={`Menampilkan ${filteredItems.length} dari ${items.length} entri`}
          right={
            <Pressable style={styles.ghostButton} onPress={() => router.push('/modal')}>
              <MaterialIcons name="edit-note" size={18} color={Palette.primary} />
              <ThemedText style={styles.ghostButtonText}>Tambah manual</ThemedText>
            </Pressable>
          }>
          <TransactionList items={filteredItems} onAddPress={() => router.push('/modal')} />
        </SectionCard>

        <SectionCard
          title="Kategori sering dipakai"
          right={<MaterialIcons name="sell" size={18} color={Palette.primary} />}>
          <FrequentCategories categories={favouriteCategories} onSelect={() => router.push('/modal')} />
        </SectionCard>

        <SectionCard title="Rencana input" hint="Bantu karyawan mengingat tugas">
          <PlanList items={planItems} />
        </SectionCard>
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
  ghostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: Palette.accentSurface,
  },
  ghostButtonText: {
    color: Palette.primary,
    fontWeight: '600',
  },
});
