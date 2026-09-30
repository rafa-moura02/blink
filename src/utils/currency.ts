const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

/** 1250 -> "R$ 12,50" */
export function formatCents(cents: number): string {
  return formatter.format(cents / 100);
}

/**
 * Converte o texto digitado pelo usuário em centavos.
 * Aceita "12", "12,5", "12,50", "1.234,56" e "12.50".
 * Retorna null se o valor for inválido ou menor/igual a zero.
 */
export function parseToCents(input: string): number | null {
  let text = input.trim().replace(/[R$\s]/g, '');
  if (!text) return null;

  if (text.includes(',')) {
    // Formato brasileiro: ponto é separador de milhar, vírgula é decimal
    text = text.replace(/\./g, '').replace(',', '.');
  }

  const value = Number(text);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * 100);
}
