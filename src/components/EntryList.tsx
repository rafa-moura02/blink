import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme/colors';
import { formatCents } from '../utils/currency';
import { confirmAction } from '../utils/dialog';
import { Card } from './Card';

export type EntryListItem = {
  id: string;
  title: string;
  subtitle?: string;
  amount: number;
};

type Props = {
  title: string;
  items: EntryListItem[];
  emptyText: string;
  amountColor: string;
  onDelete: (id: string) => void;
};

/** Lista de lançamentos, com botão de lixeira para apagar cada um. */
export function EntryList({ title, items, emptyText, amountColor, onDelete }: Props) {
  function confirmDelete(item: EntryListItem) {
    confirmAction('Apagar?', `"${item.title}" — ${formatCents(item.amount)}`, 'Apagar', () =>
      onDelete(item.id),
    );
  }

  return (
    <Card title={title}>
      {items.length === 0 ? (
        <Text style={styles.empty}>{emptyText}</Text>
      ) : (
        <>
          {items.map((item, index) => (
            <View key={item.id} style={[styles.row, index > 0 && styles.divider]}>
              <View style={styles.texts}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
              </View>
              <Text style={[styles.amount, { color: amountColor }]}>{formatCents(item.amount)}</Text>
              <Pressable
                onPress={() => confirmDelete(item)}
                hitSlop={10}
                accessibilityLabel={`Apagar ${item.title}`}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
              </Pressable>
            </View>
          ))}
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: spacing.sm,
  },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  pressed: { opacity: 0.6 },
  texts: { flex: 1 },
  itemTitle: { fontSize: 16, color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  amount: { fontSize: 16, fontWeight: '600' },
  empty: { color: colors.textMuted, fontSize: 15, paddingVertical: spacing.sm },
});
