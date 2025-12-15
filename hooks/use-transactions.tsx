import React, { createContext, useContext, useMemo, useState } from 'react';

import {
  initialTransactions,
  Transaction,
  TransactionPayload,
  TransactionType,
} from '@/constants/transactions';

type RangeFilter = 'today' | 'week' | 'month';
type TypeFilter = 'all' | TransactionType;

type Totals = {
  income: number;
  expense: number;
  incomeCount: number;
  expenseCount: number;
};

type TransactionsContextValue = {
  items: Transaction[];
  filteredItems: Transaction[];
  totals: Totals;
  balance: number;
  rangeFilter: RangeFilter;
  typeFilter: TypeFilter;
  setRangeFilter: (value: RangeFilter) => void;
  setTypeFilter: (value: TypeFilter) => void;
  addTransaction: (payload: TransactionPayload) => void;
};

// Context holder for shared transaksi state (dashboard, tab, modal).
const TransactionsContext = createContext<TransactionsContextValue | null>(null);

// Internal state manager so provider + hook stay small.
function useProvideTransactions(seed: Transaction[] = initialTransactions): TransactionsContextValue {
  const [items, setItems] = useState<Transaction[]>(seed);
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>('today');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const filteredItems = useMemo(
    () => items.filter((item) => (typeFilter === 'all' ? true : item.type === typeFilter)),
    [items, typeFilter]
  );

  const totals = useMemo<Totals>(
    () =>
      items.reduce(
        (acc, item) => {
          if (item.type === 'income') {
            acc.income += item.amount;
            acc.incomeCount += 1;
          } else {
            acc.expense += item.amount;
            acc.expenseCount += 1;
          }
          return acc;
        },
        { income: 0, expense: 0, incomeCount: 0, expenseCount: 0 }
      ),
    [items]
  );

  const balance = totals.income - totals.expense;

  const addTransaction = (payload: TransactionPayload) => {
    const newItem: Transaction = {
      id: `trx-${Date.now()}`,
      title: payload.title.trim(),
      amount: payload.amount,
      type: payload.type,
      category: payload.category.trim(),
      method: payload.method.trim(),
      time:
        payload.time ||
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };
    setItems((prev) => [newItem, ...prev]);
  };

  return {
    items,
    filteredItems,
    totals,
    balance,
    rangeFilter,
    typeFilter,
    setRangeFilter,
    setTypeFilter,
    addTransaction,
  };
}

export function TransactionsProvider({
  children,
  seed = initialTransactions,
}: {
  children: React.ReactNode;
  seed?: Transaction[];
}) {
  const value = useProvideTransactions(seed);
  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return ctx;
}
