export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  method: string;
  date: string;
  time: string;
};

export type TransactionDraft = {
  title: string;
  amount: string;
  category: string;
  method: string;
  time: string;
  type: TransactionType;
};

export type TransactionPayload = {
  title: string;
  amount: number;
  category: string;
  method: string;
  time?: string;
  date?: string;
  type: TransactionType;
};

export const initialTransactions: Transaction[] = [
  {
    id: 'trx-1',
    title: 'Penjualan makan siang',
    amount: 320000,
    type: 'income',
    category: 'Makan di tempat',
    method: 'Tunai',
    date: '2025-12-14',
    time: '10:23',
  },
  {
    id: 'trx-2',
    title: 'Takeaway paket hemat',
    amount: 210000,
    type: 'income',
    category: 'Takeaway',
    method: 'QRIS',
    date: '2025-12-14',
    time: '11:05',
  },
  {
    id: 'trx-3',
    title: 'Belanja bahan baku',
    amount: 480000,
    type: 'expense',
    category: 'Bahan baku',
    method: 'Transfer',
    date: '2025-12-13',
    time: '08:40',
  },
  {
    id: 'trx-4',
    title: 'Bayar listrik',
    amount: 160000,
    type: 'expense',
    category: 'Operasional',
    method: 'VA',
    date: '2025-12-12',
    time: '07:55',
  },
  {
    id: 'trx-5',
    title: 'Pesanan online',
    amount: 430000,
    type: 'income',
    category: 'Online',
    method: 'E-wallet',
    date: '2025-12-14',
    time: '12:12',
  },
];
