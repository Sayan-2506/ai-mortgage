// server/api/sitemap.ts
export default defineEventHandler(async () => {
  try {
    const config = useRuntimeConfig();

    const { data } = await $fetch<{ data: any[] }>(
      `${config.public.directusUrl}/items/mortgage_programs`,
      {
        headers: { Authorization: `Bearer ${config.directusToken}` },
        query: { fields: "id", limit: -1 },
      },
    );

    return data.map((p) => ({
      loc: `/mortgage/${p.id}`,
      lastmod: new Date().toISOString(),
    }));
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: "Не удалось загрузить данные для карты сайта. Попробуйте позже.",
    });
  }
});
