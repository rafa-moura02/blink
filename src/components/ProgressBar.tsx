import { StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';

/** Barra de quanto do orçamento já foi usado, na cor do estado (ver budgetColor). */
export function ProgressBar({ ratio, color }: { ratio: number; color: string }) {
  const clamped = Math.max(0, Math.min(ratio, 1));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 999 },
});
