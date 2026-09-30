// Cores do app em um só lugar — mude aqui para alterar o visual inteiro.
// Tema: fundo preto, roxo como cor secundária/destaque.
export const colors = {
  background: '#000000',
  card: '#121217',
  input: '#1B1B22',
  text: '#F5F5F7',
  textMuted: '#9A9AAE',
  border: '#26262F',

  /** Roxo principal: botões, aba ativa, chips selecionados */
  primary: '#8B5CF6',
  /** Roxo mais claro e brilhante: aparece ao tocar num botão */
  primaryPressed: '#A78BFA',
  /** Roxo translúcido: fundo de itens tocados que não são botões principais */
  primarySoft: 'rgba(139, 92, 246, 0.25)',

  /** Saldo positivo / dentro do orçamento */
  positive: '#22C55E',
  /** Atenção: orçamento perto do limite */
  warning: '#F59E0B',
  /** Estourou o orçamento: hora de se controlar */
  danger: '#EF4444',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};

export const radius = 14;

/** A partir de quanto do orçamento de extras usado o app entra em "atenção". */
export const WARNING_RATIO = 0.75;

/**
 * Cor do estado do orçamento:
 * verde = tranquilo, laranja = atenção (passou de 75%), vermelho = estourou.
 */
export function budgetColor(usedRatio: number, remaining: number): string {
  if (remaining < 0 || usedRatio > 1) return colors.danger;
  if (usedRatio > WARNING_RATIO) return colors.warning;
  return colors.positive;
}
