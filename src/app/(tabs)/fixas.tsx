import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { EntryForm, inputStyle } from '../../components/EntryForm';
import { EntryList } from '../../components/EntryList';
import { Screen } from '../../components/Screen';
import { fixedTotal } from '../../features/finance/calculations';
import { useFinanceStore } from '../../features/finance/store';
import { colors } from '../../theme/colors';
import { formatCents } from '../../utils/currency';

export default function FixasScreen() {
  const { fixedExpenses, addFixedExpense, removeFixedExpense } = useFinanceStore();
  const [dueDay, setDueDay] = useState('');

  function handleSubmit(description: string, amount: number) {
    const day = Number(dueDay);
    const validDay = Number.isInteger(day) && day >= 1 && day <= 31 ? day : undefined;
    addFixedExpense({ description, amount, dueDay: validDay });
    setDueDay('');
  }

  const sorted = [...fixedExpenses].sort((a, b) => (a.dueDay ?? 99) - (b.dueDay ?? 99));

  return (
    <Screen>
      <EntryForm
        title="Nova despesa fixa"
        descriptionPlaceholder="Ex: Aluguel, Internet, Academia"
        submitLabel="Adicionar despesa fixa"
        onSubmit={handleSubmit}
      >
        <TextInput
          style={styles.input}
          placeholder="Dia do vencimento (opcional)"
          placeholderTextColor={colors.textMuted}
          value={dueDay}
          onChangeText={setDueDay}
          keyboardType="number-pad"
          keyboardAppearance="dark"
          maxLength={2}
        />
      </EntryForm>

      <EntryList
        title={`Todo mês · ${formatCents(fixedTotal(fixedExpenses))}`}
        emptyText="Cadastre contas que se repetem todo mês."
        amountColor={colors.text}
        onDelete={removeFixedExpense}
        items={sorted.map((f) => ({
          id: f.id,
          title: f.description,
          subtitle: f.dueDay ? `Vence dia ${f.dueDay}` : undefined,
          amount: f.amount,
        }))}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({ input: inputStyle });
