import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FrequentCategories } from '@/components/transactions/FrequentCategories';
import { PlanList } from '@/components/transactions/PlanList';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionHeader } from '@/components/transactions/TransactionHeader';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionSummary } from '@/components/transactions/TransactionSummary';
import { SectionCard } from '@/components/ui/SectionCard';
import { Palette } from '@/constants/design';
import { TransactionDraft } from '@/constants/transactions';
import { useTransactions } from '@/hooks/use-transactions';
import { validateTransactionDraft } from '@/utils/transactions';

const favouriteCategories = ['Makan di tempat', 'Takeaway', 'Bahan baku', 'Operasional', 'Gaji'];
const planItems = [
  { title: 'Cek stok bahan baku', meta: 'Catat selisih sebelum shift malam', icon: 'inventory' },
  { title: 'Rekap pembayaran QRIS', meta: 'Sinkronkan sebelum pukul 21.00', icon: 'qr-code-scanner' },
];

const emptyFormState: TransactionDraft = {
  title: '',
  amount: '',
  category: '',
  method: '',
  type: 'income',
  time: '',
};

export default function TransactionsScreen() {
  const scrollRef = useRef<ScrollView | null>(null);
  const formOffsetRef = useRef(0);
  const router = useRouter();
  const {
    items,
    filteredItems,
    totals,
    balance,
    rangeFilter,
    typeFilter,
    setRangeFilter,
    setTypeFilter,
    addTransaction,
  } = useTransactions();

  const [form, setForm] = useState<TransactionDraft>(emptyFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleScrollToForm = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: Math.max(formOffsetRef.current - 16, 0), animated: true });
    }
  };

  const updateForm = <K extends keyof TransactionDraft>(key: K, value: TransactionDraft[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => {
    setForm((prev) => ({ ...emptyFormState, type: prev.type }));
    setErrors({});
  };

  const handleSubmit = () => {
    const { errors: nextErrors, parsedAmount } = validateTransactionDraft(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    addTransaction({
      title: form.title,
      amount: parsedAmount,
      category: form.category,
      method: form.method,
      time: form.time || undefined,
      type: form.type,
    });
    resetForm();
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <TransactionHeader
        title="Transaksi"
        subtitle="Pencatatan harian karyawan dan admin"
        dateLabel="Sabtu, 14 Des 2025"
        info="Prototype v0.2: form lokal + data dummy (belum API)"
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
          <Pressable style={styles.ghostButton} onPress={handleScrollToForm}>
            <MaterialIcons name="edit-note" size={18} color={Palette.primary} />
            <ThemedText style={styles.ghostButtonText}>Tambah manual</ThemedText>
          </Pressable>
        }>
        <TransactionList items={filteredItems} onAddPress={handleScrollToForm} />
      </SectionCard>

      <SectionCard
        title="Kategori sering dipakai"
        right={<MaterialIcons name="sell" size={18} color={Palette.primary} />}>
        <FrequentCategories categories={favouriteCategories} onSelect={(cat) => updateForm('category', cat)} />
      </SectionCard>

      <SectionCard title="Rencana input" hint="Bantu karyawan mengingat tugas">
        <PlanList items={planItems} />
      </SectionCard>
    </ScrollView>
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
  badgeLight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.accentSurface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeLightText: {
    color: Palette.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});
