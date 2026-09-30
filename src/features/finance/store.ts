import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Expense, FixedExpense, Income } from './types';

// Estado global do app. Tudo aqui é salvo automaticamente no celular
// (AsyncStorage) e recarregado quando o app abre — não precisa de login.

type FinanceState = {
  incomes: Income[];
  fixedExpenses: FixedExpense[];
  expenses: Expense[];

  addIncome: (data: Omit<Income, 'id'>) => void;
  removeIncome: (id: string) => void;

  addFixedExpense: (data: Omit<FixedExpense, 'id'>) => void;
  removeFixedExpense: (id: string) => void;

  addExpense: (data: Omit<Expense, 'id'>) => void;
  removeExpense: (id: string) => void;
};

const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      incomes: [],
      fixedExpenses: [],
      expenses: [],

      addIncome: (data) => set((s) => ({ incomes: [...s.incomes, { ...data, id: newId() }] })),
      removeIncome: (id) => set((s) => ({ incomes: s.incomes.filter((i) => i.id !== id) })),

      addFixedExpense: (data) =>
        set((s) => ({ fixedExpenses: [...s.fixedExpenses, { ...data, id: newId() }] })),
      removeFixedExpense: (id) =>
        set((s) => ({ fixedExpenses: s.fixedExpenses.filter((f) => f.id !== id) })),

      addExpense: (data) => set((s) => ({ expenses: [{ ...data, id: newId() }, ...s.expenses] })),
      removeExpense: (id) => set((s) => ({ expenses: s.expenses.filter((e) => e.id !== id) })),
    }),
    {
      name: 'blink-finance',
      storage: createJSONStorage(() => AsyncStorage),
      // Aumente este número se mudar o formato dos dados e escreva um `migrate`.
      version: 1,
    },
  ),
);
