export const calculateMortgageData = (
  amount: number,
  period: number,
  annualRate: number,
) => {
  if (period <= 0 || amount <= 0) return { monthly: 0, totalInterest: 0 };

  const monthlyRate = annualRate / 12;

  // Формула аннуитетного коэффициента: K = (i * (1 + i)^n) / ((1 + i)^n - 1)
  const power = Math.pow(1 + monthlyRate, period);
  const monthlyPayment = (amount * (monthlyRate * power)) / (power - 1);

  const totalPaid = monthlyPayment * period;
  const totalInterest = totalPaid - amount;

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
  return parseFloat(value.toString()).toString() + "%";
};
