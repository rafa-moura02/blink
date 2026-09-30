/** Data de hoje no formato yyyy-mm-dd (horário local). */
export function todayISO(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** Chave do mês, ex: "2026-09". */
export function monthKey(isoDate: string): string {
  return isoDate.slice(0, 7);
}

export function currentMonthKey(): string {
  return monthKey(todayISO());
}

/** Quantos dias faltam no mês atual, contando hoje. */
export function daysLeftInMonth(now = new Date()): number {
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return lastDay - now.getDate() + 1;
}

/** "2026-09-30" -> "30/09" */
export function formatShortDate(isoDate: string): string {
  const [, mm, dd] = isoDate.split('-');
  return `${dd}/${mm}`;
}

/** "2026-09" -> "setembro de 2026" */
export function formatMonth(key: string): string {
  const [y, m] = key.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
}
