// server/utils/mortgage/calc.ts
export const calcPayment = (
  amount: number,
  months: number,
  rate: number,
): number => {
  const r = rate / 12 / 100;
  const pow = Math.pow(1 + r, months);
  return Math.round((amount * r * pow) / (pow - 1));
};

export const calcOverpayment = (
  amount: number,
  months: number,
  rate: number,
): number => Math.round(calcPayment(amount, months, rate) * months - amount);

export const fmt = (n: number): string => n.toLocaleString("ru-RU");

export const TERM_MONTHS = [360, 300, 240, 180, 120, 84, 60, 36, 24];
