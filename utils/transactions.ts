import { TransactionDraft } from '@/constants/transactions';

const normalizeDate = (value?: string) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  // Accept YYYY-MM-DD or DD/MM/YYYY
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return trimmed;

  const dmyMatch = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (dmyMatch) {
    const [, dd, mm, yyyy] = dmyMatch;
    return `${yyyy}-${mm}-${dd}`;
  }
  return null;
};

export const validateTransactionDraft = (draft: TransactionDraft) => {
  const parsedAmount = parseInt(draft.amount.replace(/[^0-9]/g, ''), 10);
  const parsedDate = normalizeDate(draft.date);
  const errors: Record<string, string> = {};

  if (!draft.title.trim()) errors.title = 'Judul wajib diisi';
  if (!parsedAmount || Number.isNaN(parsedAmount)) errors.amount = 'Nominal wajib angka';
  if (!draft.category.trim()) errors.category = 'Kategori wajib diisi';
  if (!draft.method.trim()) errors.method = 'Metode wajib diisi';
  if (parsedDate === null) errors.date = 'Gunakan format YYYY-MM-DD atau DD/MM/YYYY';

  return { errors, parsedAmount, parsedDate };
};
