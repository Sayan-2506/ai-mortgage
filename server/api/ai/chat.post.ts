// server/api/ai/chat.post.ts
import OpenAI from "openai";
import {
  calcPayment,
  calcOverpayment,
  fmt,
  TERM_MONTHS,
} from "../../utils/mortgage/calc";
import { normalizePrograms, filterPrograms } from "../../utils/mortgage/filter";
import {
  EXTRACT_PROMPT,
  buildSystemPrompt,
  buildClarifyPrompt,
} from "../../utils/mortgage/prompts";

export default defineEventHandler(async (event) => {
  const { message, history = [] } = await readBody(event);
  const config = useRuntimeConfig();
  const client = new OpenAI({ apiKey: config.openaiKey });

  const historyMessages = history.slice(-10).map((m: any) => ({
    role: m.role === "user" ? ("user" as const) : ("assistant" as const),
    content: m.text,
  }));

  // Шаг 1 — извлекаем параметры
  let params = {
    salary: null as number | null,
    downPayment: null as number | null,
    propertyPrice: null as number | null,
    maxRate: null as number | null,
    primarySecondary: null as "primary" | "secondary" | "both" | null,
  };

  try {
    const extract = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      max_tokens: 200,
      messages: [
        { role: "system", content: EXTRACT_PROMPT },
        ...historyMessages,
        { role: "user", content: message },
      ],
    });
    const raw = extract.choices[0]?.message.content ?? "{}";
    params = JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch {
    console.error("Ошибка парсинга параметров");
  }

  // Шаг 2 — загружаем программы
  const { data } = await $fetch<{ data: any[] }>(
    `${config.public.directusUrl}/items/mortgage_programs`,
    {
      headers: { Authorization: `Bearer ${config.directusToken}` },
      query: { fields: "*,bank.*", limit: -1 },
    },
  );

  const programsSummary = data.map((p) => ({
    program_name: p.program_name,
    bank: p.bank?.name,
    rate_min: parseFloat(p.rate_min),
    rate_max: parseFloat(p.rate_max),
    max_loan_amount: p.max_loan_amount,
    max_term_months: p.max_term_months,
    min_downpayment: p.min_downpayment,
    primary_secondary: p.primary_secondary,
    description_main: p.description_main,
  }));

  // Шаг 3 — проверяем параметры
  const hasEnoughParams = params.propertyPrice && params.downPayment;

  if (!hasEnoughParams) {
    const missing = [];
    if (!params.propertyPrice) missing.push("стоимость квартиры");
    if (!params.downPayment) missing.push("первоначальный взнос");

    const clarifyResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: buildClarifyPrompt(programsSummary, missing),
        },
        ...historyMessages,
        { role: "user", content: message },
      ],
    });

    return { answer: clarifyResponse.choices[0]?.message.content };
  }

  // Шаг 4 — нормализуем и фильтруем
  const loanAmount = params.propertyPrice! - params.downPayment!;
  const downPaymentPercent =
    (params.downPayment! / params.propertyPrice!) * 100;

  const filtered = filterPrograms(
    normalizePrograms(data),
    params,
    loanAmount,
    downPaymentPercent,
  );

  // Шаг 5 — считаем сроки
  const programs = filtered.map((p) => {
    const allTerms = TERM_MONTHS.filter(
      (t) => t <= (p.max_term_months ?? 240),
    ).map((months) => {
      const monthly = calcPayment(loanAmount, months, p.rate_min);
      return {
        years: Math.round(months / 12),
        monthly: fmt(monthly),
        monthly_raw: monthly,
        overpayment: fmt(calcOverpayment(loanAmount, months, p.rate_min)),
      };
    });

    return {
      program_name: p.program_name,
      bank: p.bank?.name,
      rate_min: p.rate_min,
      loan_amount: `${fmt(loanAmount)} ₸ (${fmt(params.propertyPrice!)} - взнос ${fmt(params.downPayment!)})`,
      min_possible_payment: allTerms[0]?.monthly_raw ?? 0,
      term_options: allTerms.filter(
        (t) => !params.salary || t.monthly_raw <= params.salary,
      ),
    };
  });

  const suitable = programs.filter((p) => p.term_options.length > 0);
  const salaryTooLow = programs.filter((p) => p.term_options.length === 0);

  let noResultsReason = "";
  if (suitable.length === 0 && salaryTooLow.length > 0) {
    const minPayment = Math.min(
      ...salaryTooLow.map((p) => p.min_possible_payment),
    );
    noResultsReason = `Программы найдены, но даже при максимальном сроке минимальный платёж ~${fmt(minPayment)} ₸ превышает зарплату ${params.salary ? fmt(params.salary) + " ₸" : ""}. Нужна зарплата от ${fmt(minPayment)} ₸ или больший первоначальный взнос.`;
  } else if (suitable.length === 0) {
    noResultsReason =
      "Нет программ подходящих под указанные параметры (ставка, тип рынка, сумма кредита или стоимость квартиры).";
  }

  const programsForGpt = suitable.map(
    ({ min_possible_payment, ...rest }) => rest,
  );

  // Шаг 6 — GPT форматирует ответ
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    max_tokens: 1500,
    messages: [
      {
        role: "system",
        content: buildSystemPrompt(params, programsForGpt, noResultsReason),
      },
      ...historyMessages,
      { role: "user", content: message },
    ],
  });

  return { answer: response.choices[0]?.message.content };
});
