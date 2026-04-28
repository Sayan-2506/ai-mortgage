export const calculateMortgageData = (
  amount: number | undefined,
  period: number | undefined,
  annualRate: number | undefined,
) => {
  const a = amount ?? 0;
  const p = period ?? 0;
  const r = annualRate ?? 0;

  if (p <= 0 || a <= 0) return { monthly: 0, interest: 0 };

  const monthlyRate = r / 12;
  const power = Math.pow(1 + monthlyRate, p);
  const monthlyPayment = (a * (monthlyRate * power)) / (power - 1);
  const totalInterest = monthlyPayment * p - a;

  return {
    monthly: Math.round(monthlyPayment),
    interest: Math.round(totalInterest),
  };
};

// Функции-обертки для шаблона
export const getMonthlyPayment = (
  amount: number | undefined,
  period: number | undefined,
  annualRate: number | undefined,
): string => {
  return amountFmt(
    calculateMortgageData(amount ?? 0, period ?? 0, annualRate ?? 0).monthly,
  );
};

export const getTotalInterest = (
  amount: number | undefined,
  period: number | undefined,
  annualRate: number | undefined,
): string => {
  return amountFmt(
    calculateMortgageData(amount ?? 0, period ?? 0, annualRate ?? 0).interest,
  );
};

export const formatRatePercent = (value: number): string => {
  return parseFloat(value.toString()).toString();
};
