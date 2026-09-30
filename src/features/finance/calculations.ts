import { daysLeftInMonth, monthKey } from '../../utils/date';
import type { Expense, ExpenseCategory, FixedExpense, Income } from './types';

// Regras de cálculo do orçamento. São funções puras (sem estado),
// então é aqui que se ajusta a lógica de "quanto posso gastar".

const sum = (items: { amount: number }[]) =>
  items.reduce((total, item) => total + item.amount, 0);

/** Entradas que contam no mês: recorrentes (a partir de quando foram criadas) + únicas daquele mês. */
export function incomesOfMonth(incomes: Income[], month: string): Income[] {
  return incomes.filter(
    (i) => (i.recurring && monthKey(i.date) <= month) || monthKey(i.date) === month,
  );
}

export function monthIncome(incomes: Income[], month: string): number {
  return sum(incomesOfMonth(incomes, month));
}

export function fixedTotal(fixed: FixedExpense[]): number {
  return sum(fixed);
}

export function expensesOfMonth(expenses: Expense[], month: string): Expense[] {
  return expenses.filter((e) => monthKey(e.date) === month);
}

export type MonthSummary = {
  income: number;
  fixed: number;
  /** O que sobra depois das despesas fixas: o limite para gastos extras. */
  extrasBudget: number;
  spent: number;
  /** Quanto ainda pode gastar este mês (pode ser negativo). */
  remaining: number;
  /** Quanto pode gastar por dia até o fim do mês. */
  perDay: number;
  /** Fração do orçamento de extras já usada (0 a 1+). */
  usedRatio: number;
};

export function summarizeMonth(
  incomes: Income[],
  fixed: FixedExpense[],
  expenses: Expense[],
  month: string,
): MonthSummary {
  const income = monthIncome(incomes, month);
  const fixedSum = fixedTotal(fixed);
  const extrasBudget = income - fixedSum;
  const spent = sum(expensesOfMonth(expenses, month));
  const remaining = extrasBudget - spent;
  const perDay = remaining > 0 ? Math.floor(remaining / daysLeftInMonth()) : 0;
  const usedRatio = extrasBudget > 0 ? spent / extrasBudget : spent > 0 ? 1 : 0;

  return { income, fixed: fixedSum, extrasBudget, spent, remaining, perDay, usedRatio };
}

/** Total gasto por categoria no mês, do maior para o menor. */
export function spentByCategory(
  expenses: Expense[],
  month: string,
): { category: ExpenseCategory; amount: number }[] {
  const totals = new Map<ExpenseCategory, number>();
  for (const e of expensesOfMonth(expenses, month)) {
    totals.set(e.category, (totals.get(e.category) ?? 0) + e.amount);
  }
  return [...totals.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}
