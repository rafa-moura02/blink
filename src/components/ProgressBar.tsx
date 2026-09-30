import { StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';

/** Barra de progresso: verde até 75%, laranja até 100%, vermelha acima. */
export function ProgressBar({ ratio }: { ratio: number }) {
  const clamped = Math.max(0, Math.min(ratio, 1));
  const color = ratio > 1 ? colors.expense : ratio > 0.75 ? colors.warning : colors.income;

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
