// server/api/subscribe.post.ts
export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody(event);
    const config = useRuntimeConfig();

    if (!email || !email.includes("@")) {
      throw createError({
        statusCode: 400,
        message: "Некорректный формат почты",
      });
    }

    await $fetch(`${config.public.directusUrl}/items/subscribers`, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.directusToken}` },
      body: { email, status: "active" },
    });

    return { success: true };
  } catch (error: any) {
    const errorCode = error.data?.errors?.[0]?.extensions?.code;

    const errorTranslations: Record<string, string> = {
      RECORD_NOT_UNIQUE: "Этот email уже подписан на рассылку.",
      FORBIDDEN: "Ошибка доступа. Обратитесь к администратору.",
      SERVICE_UNAVAILABLE: "Сервер базы данных временно недоступен.",
      INTERNAL_SERVER_ERROR: "Внутренняя ошибка сервера. Попробуйте позже.",
      VALIDATION_ERROR: "Данные не прошли проверку валидности.",
    };

    let finalMessage = "Произошла ошибка. Попробуйте позже.";

    if (errorTranslations[errorCode]) {
      finalMessage = errorTranslations[errorCode];
    } else if (error.statusCode === 400) {
      finalMessage = error.message;
    } else if (error.message?.includes("fetch failed")) {
      finalMessage = "Не удалось связаться с сервером базы данных.";
    }

    throw createError({
      statusCode: error.statusCode || 500,
      message: finalMessage,
    });
  }
});
