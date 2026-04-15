import type { Mortgage } from "~/types/programs";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const config = useRuntimeConfig();
    const result = await $fetch<{ data: Mortgage }>(
      `${config.public.directusUrl}/items/mortgage_programs/${id}`,
      {
        headers: { Authorization: `Bearer ${config.directusToken}` },
        query: {
          fields:
            "*,bank.*,documents.documents_id.*,translations.*,translations.languages_id.*",
        },
      },
    );

    return result?.data;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: "Не удалось загрузить данные программы. Попробуйте позже.",
    });
  }
});
