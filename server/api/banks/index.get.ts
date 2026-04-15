// server/api/banks/index.get.ts
import type { Bank } from "~/types/banks";

export default defineEventHandler(async () => {
  try {
    const config = useRuntimeConfig();

    const result = await $fetch<{ data: Bank }>(
      `${config.public.directusUrl}/items/banks`,
      {
        headers: { Authorization: `Bearer ${config.directusToken}` },
        query: { fields: "*", sort: "-assets" }, // сортировка по активам
      },
    );

    return result?.data;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: "Не удалось загрузить данные банков. Попробуйте позже.",
    });
  }
});
