import { useState } from 'react';

import { ChipGroup, EntryForm } from '../../components/EntryForm';
import { EntryList } from '../../components/EntryList';
import { Screen } from '../../components/Screen';
import { expensesOfMonth } from '../../features/finance/calculations';
import { useFinanceStore } from '../../features/finance/store';
import { CATEGORY_LABELS, type ExpenseCategory } from '../../features/finance/types';
import { colors } from '../../theme/colors';
import { currentMonthKey, formatShortDate, todayISO } from '../../utils/date';

const CATEGORY_OPTIONS = (Object.keys(CATEGORY_LABELS) as ExpenseCategory[]).map((value) => ({
  value,
  label: CATEGORY_LABELS[value],
}));

export default function GastosScreen() {
  const { expenses, addExpense, removeExpense } = useFinanceStore();
  const [category, setCategory] = useState<ExpenseCategory>('alimentacao');
  const monthExpenses = expensesOfMonth(expenses, currentMonthKey());

  return (
    <Screen>
      <EntryForm
        title="Novo gasto"
        descriptionPlaceholder="Ex: Mercado, Uber, Cinema"
        submitLabel="Adicionar gasto"
        onSubmit={(description, amount) =>
          addExpense({ description, amount, category, date: todayISO() })
        }
      >
        <ChipGroup options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />
      </EntryForm>

      <EntryList
        title="Gastos deste mês"
        emptyText="Nenhum gasto registrado ainda."
        amountColor={colors.expense}
        onDelete={removeExpense}
        items={monthExpenses.map((e) => ({
          id: e.id,
          title: e.description,
          subtitle: `${CATEGORY_LABELS[e.category]} · ${formatShortDate(e.date)}`,
          amount: e.amount,
        }))}
      />
    </Screen>
  );
}
