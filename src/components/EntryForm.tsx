import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '../theme/colors';
import { parseToCents } from '../utils/currency';
import { showMessage } from '../utils/dialog';
import { Card } from './Card';

type Props = {
  title: string;
  descriptionPlaceholder: string;
  submitLabel: string;
  /** Recebe descrição e valor em centavos já validados. */
  onSubmit: (description: string, amountCents: number) => void;
  /** Campos extras específicos de cada tela (categoria, recorrente, etc). */
  children?: ReactNode;
};

/** Formulário padrão "descrição + valor" usado em Renda, Fixas e Gastos. */
export function EntryForm({ title, descriptionPlaceholder, submitLabel, onSubmit, children }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  function handleSubmit() {
    const cents = parseToCents(amount);
    if (!description.trim()) {
      showMessage('Falta a descrição', 'Escreva o que é esse valor.');
      return;
    }
    if (cents === null) {
      showMessage('Valor inválido', 'Digite um valor maior que zero, ex: 25,90');
      return;
    }
    onSubmit(description.trim(), cents);
    setDescription('');
    setAmount('');
  }

  return (
    <Card title={title}>
      <TextInput
        style={styles.input}
        placeholder={descriptionPlaceholder}
        placeholderTextColor={colors.textMuted}
        value={description}
        onChangeText={setDescription}
        returnKeyType="next"
        keyboardAppearance="dark"
      />
      <TextInput
        style={styles.input}
        placeholder="Valor (R$)"
        placeholderTextColor={colors.textMuted}
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        keyboardAppearance="dark"
      />
      {children}
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </Pressable>
    </Card>
  );
}

export const inputStyle = {
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 10,
  paddingHorizontal: spacing.md,
  paddingVertical: 12,
  fontSize: 16,
  color: colors.text,
  backgroundColor: colors.input,
} as const;

const styles = StyleSheet.create({
  input: inputStyle,
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  // Ao tocar: roxo mais claro com brilho roxo em volta
  buttonPressed: {
    backgroundColor: colors.primaryPressed,
    transform: [{ scale: 0.98 }],
    boxShadow: `0 0 16px ${colors.primary}`,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

/** Linha de opções (chips) para escolher entre valores — ex: categorias. */
export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View style={chipStyles.row}>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={({ pressed }) => [
              chipStyles.chip,
              pressed && chipStyles.chipPressed,
              selected && chipStyles.chipSelected,
            ]}
          >
            <Text style={[chipStyles.text, selected && chipStyles.textSelected]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const chipStyles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.input,
  },
  chipPressed: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { color: colors.text, fontSize: 14 },
  textSelected: { color: '#fff', fontWeight: '600' },
});
