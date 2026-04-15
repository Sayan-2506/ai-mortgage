export default defineI18nConfig(() => ({
  legacy: false, // Должно быть false для Composition API
  locale: "ru",
  fallbackLocale: "ru",
  globalInjection: true, // Чтобы можно было использовать $t
}));
