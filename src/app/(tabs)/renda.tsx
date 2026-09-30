import { useState } from 'react';

import { ChipGroup, EntryForm } from '../../components/EntryForm';
import { EntryList } from '../../components/EntryList';
import { Screen } from '../../components/Screen';
import { incomesOfMonth, monthIncome } from '../../features/finance/calculations';
import { useFinanceStore } from '../../features/finance/store';
import { colors } from '../../theme/colors';
import { formatCents } from '../../utils/currency';
import { currentMonthKey, formatShortDate, todayISO } from '../../utils/date';

type Kind = 'mensal' | 'unica';

const KIND_OPTIONS: { value: Kind; label: string }[] = [
  { value: 'mensal', label: 'Todo mês' },
  { value: 'unica', label: 'Só este mês' },
];

export default function RendaScreen() {
  const { incomes, addIncome, removeIncome } = useFinanceStore();
  const [kind, setKind] = useState<Kind>('mensal');
  const month = currentMonthKey();
  const visible = incomesOfMonth(incomes, month);

  return (
    <Screen>
      <EntryForm
        title="Nova entrada"
        descriptionPlaceholder="Ex: Salário, Freela, Pix recebido"
        submitLabel="Adicionar entrada"
        onSubmit={(description, amount) =>
          addIncome({ description, amount, recurring: kind === 'mensal', date: todayISO() })
        }
      >
        <ChipGroup options={KIND_OPTIONS} value={kind} onChange={setKind} />
      </EntryForm>

      <EntryList
        title={`Renda deste mês · ${formatCents(monthIncome(incomes, month))}`}
        emptyText="Cadastre quanto você ganha."
        amountColor={colors.positive}
        onDelete={removeIncome}
        items={visible.map((i) => ({
          id: i.id,
          title: i.description,
          subtitle: i.recurring ? 'Todo mês' : `Única · ${formatShortDate(i.date)}`,
          amount: i.amount,
        }))}
      />
    </Screen>
  );
}
