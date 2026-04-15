// server/utils/mortgage/filter.ts
export const matchesMarket = (
  value: string,
  requested: string | null,
): boolean => {
  if (!requested) return true;
  const v = value?.toLowerCase() ?? "";
  if (v.includes("обе") || v.includes("both")) return true;
  return requested === "primary" ? v.includes("перв") : v.includes("втор");
};

export const normalizePrograms = (data: any[]) =>
  data.map((p) => ({
    ...p,
    rate_min: parseFloat(p.rate_min),
    rate_max: parseFloat(p.rate_max),
    max_loan_amount: parseFloat(p.max_loan_amount),
    max_property_price: p.max_property_price
      ? parseFloat(p.max_property_price)
      : null,
    min_downpayment: p.min_downpayment ? parseFloat(p.min_downpayment) : null,
  }));

export const filterPrograms = (
  normalized: any[],
  params: any,
  loanAmount: number,
  downPaymentPercent: number,
) =>
  normalized
    .filter((p) => !params.maxRate || p.rate_min <= params.maxRate)
    .filter((p) => matchesMarket(p.primary_secondary, params.primarySecondary))
    .filter((p) => p.max_loan_amount >= loanAmount)
    .filter(
      (p) =>
        !p.max_property_price || p.max_property_price >= params.propertyPrice,
    )
    .filter(
      (p) => !p.min_downpayment || downPaymentPercent >= p.min_downpayment,
    );
