import { StyleSheet, Text, View } from 'react-native';

import { Card } from '../../components/Card';
import { ProgressBar } from '../../components/ProgressBar';
import { Screen } from '../../components/Screen';
import { spentByCategory, summarizeMonth } from '../../features/finance/calculations';
import { useFinanceStore } from '../../features/finance/store';
import { CATEGORY_LABELS } from '../../features/finance/types';
import { colors, spacing } from '../../theme/colors';
import { formatCents } from '../../utils/currency';
import { currentMonthKey, formatMonth } from '../../utils/date';

export default function ResumoScreen() {
  const { incomes, fixedExpenses, expenses } = useFinanceStore();
  const month = currentMonthKey();
  const summary = summarizeMonth(incomes, fixedExpenses, expenses, month);
  const categories = spentByCategory(expenses, month);
  const overBudget = summary.remaining < 0;

  return (
    <Screen>
      <Text style={styles.month}>{formatMonth(month)}</Text>

      <Card title="Disponível para gastar">
        <Text style={[styles.big, { color: overBudget ? colors.expense : colors.text }]}>
          {formatCents(summary.remaining)}
        </Text>
        <ProgressBar ratio={summary.usedRatio} />
        <Text style={styles.muted}>
          {overBudget
            ? `Você passou ${formatCents(-summary.remaining)} do limite de extras.`
            : `Até ${formatCents(summary.perDay)} por dia até o fim do mês.`}
        </Text>
      </Card>

      <Card title="Como o mês fecha">
        <Line label="Renda do mês" value={summary.income} color={colors.income} />
        <Line label="Despesas fixas" value={-summary.fixed} color={colors.expense} />
        <Line label="Limite para extras" value={summary.extrasBudget} bold />
        <Line label="Gasto com extras" value={-summary.spent} color={colors.expense} />
        <Line label="Sobra" value={summary.remaining} bold />
      </Card>

      {categories.length > 0 ? (
        <Card title="Onde o dinheiro foi">
          {categories.map((c) => (
            <Line key={c.category} label={CATEGORY_LABELS[c.category]} value={c.amount} />
          ))}
        </Card>
      ) : null}

      {summary.income === 0 ? (
        <Text style={styles.tip}>
          Comece cadastrando sua renda na aba “Renda” e suas contas do mês em “Fixas”.
        </Text>
      ) : null}
    </Screen>
  );
}

function Line({
  label,
  value,
  color = colors.text,
  bold,
}: {
  label: string;
  value: number;
  color?: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.line}>
      <Text style={[styles.lineLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.lineValue, { color }, bold && styles.bold]}>{formatCents(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  month: {
    fontSize: 15,
    color: colors.textMuted,
    textTransform: 'capitalize',
  },
  big: { fontSize: 36, fontWeight: '800' },
  muted: { color: colors.textMuted, fontSize: 14 },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  lineLabel: { fontSize: 15, color: colors.text },
  lineValue: { fontSize: 15 },
  bold: { fontWeight: '700' },
  tip: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    paddingHorizontal: spacing.lg,
  },
});
