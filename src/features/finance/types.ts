// Todos os valores em dinheiro são guardados em CENTAVOS (número inteiro)
// para evitar erros de arredondamento. Ex: R$ 12,50 = 1250.

export type Income = {
  id: string;
  description: string;
  amount: number;
  /** true = entra todo mês (ex: salário). false = entrada única no mês de `date`. */
  recurring: boolean;
  /** Data ISO (yyyy-mm-dd) */
  date: string;
};

export type FixedExpense = {
  id: string;
  description: string;
  amount: number;
  /** Dia do mês em que vence (1-31), opcional */
  dueDay?: number;
};

export type ExpenseCategory =
  | 'alimentacao'
  | 'transporte'
  | 'lazer'
  | 'compras'
  | 'saude'
  | 'outros';

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  /** Data ISO (yyyy-mm-dd) */
  date: string;
};

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  alimentacao: 'Alimentação',
  transporte: 'Transporte',
  lazer: 'Lazer',
  compras: 'Compras',
  saude: 'Saúde',
  outros: 'Outros',
};
