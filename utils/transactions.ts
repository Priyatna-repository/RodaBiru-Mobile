import { TransactionDraft } from '@/constants/transactions';

export const validateTransactionDraft = (draft: TransactionDraft) => {
  const parsedAmount = parseInt(draft.amount.replace(/[^0-9]/g, ''), 10);
  const errors: Record<string, string> = {};

  if (!draft.title.trim()) errors.title = 'Judul wajib diisi';
  if (!parsedAmount || Number.isNaN(parsedAmount)) errors.amount = 'Nominal wajib angka';
  if (!draft.category.trim()) errors.category = 'Kategori wajib diisi';
  if (!draft.method.trim()) errors.method = 'Metode wajib diisi';

  return { errors, parsedAmount };
};
