import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { TransactionForm } from '@/components/transactions/TransactionForm';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Palette } from '@/constants/design';
import { TransactionDraft } from '@/constants/transactions';
import { useTransactions } from '@/hooks/use-transactions';
import { validateTransactionDraft } from '@/utils/transactions';

const emptyDraft: TransactionDraft = {
  title: '',
  amount: '',
  category: '',
  method: '',
  time: '',
  type: 'income',
};

export default function ModalScreen() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const [form, setForm] = useState<TransactionDraft>(emptyDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onChange = <K extends keyof TransactionDraft>(key: K, value: TransactionDraft[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

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

    router.back();
  };

  const handleReset = () => {
    setForm((prev) => ({ ...emptyDraft, type: prev.type }));
    setErrors({});
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Tambah Transaksi</ThemedText>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Data masih disimpan lokal (belum API)
        </Text>
      </View>

      <TransactionForm form={form} errors={errors} onChange={onChange} onSubmit={handleSubmit} onReset={handleReset} />

      <Button mode="outlined" onPress={() => router.back()} style={styles.closeButton}>
        Tutup
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  header: {
    gap: 6,
  },
  subtitle: {
    color: Palette.slate,
    fontSize: 14,
  },
  closeButton: {
    marginTop: 6,
    alignSelf: 'center',
  },
});
