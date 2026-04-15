export const amountFmt = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n);

export const periodFmt = (n: number) => {
  const { t } = useI18n();
  return `${n} ${n === 1 ? t("filters.month") : n < 5 ? t("filters.months") : t("filters.months")}`;
};

export const fmtDownPayment = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n);

export function formatPercent(value: string | number): string {
  const num =
    typeof value === "string" ? parseFloat(value.replace("%", "")) : value;

  if (isNaN(num)) return "";

  return `${parseFloat(num.toFixed(5)).toString()}%`;
}
