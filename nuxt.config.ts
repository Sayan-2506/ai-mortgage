// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
  ],

  runtimeConfig: {
    directusToken: "",
    openaiKey: "",
    public: {
      directusUrl: "",
    },
  },

  i18n: {
    locales: [
      { code: "kz", iso: "kz-KZ", name: "Казахский", file: "kz.json" },
      { code: "ru", iso: "ru-RU", name: "Русский", file: "ru.json" },
    ],
    defaultLocale: "ru",
    strategy: "no_prefix",
    langDir: "locales/",
    lazy: true,
    vueI18n: "./i18n/i18n.config.ts",
  },

  site: {
    url: "https://ai-help.asia",
    name: "ai-help.asia",
  },

  sitemap: {
    sources: ["/api/sitemap"], // эндпоинт который возвращает список URL
  },

  app: {
    head: {
      htmlAttrs: { lang: "ru" },
      meta: [
        { name: "theme-color", content: "#0f1117" },
        { name: "robots", content: "index, follow" },
        { property: "og:site_name", content: "ai-help.asia" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ru_RU" },
        {
          property: "og:image",
          content: "https://ai-help.asia/images/og-logo.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://ai-help.asia" },
        { rel: "icon", type: "image/svg+xml", href: "/images/head-icon.svg" },
      ],
    },
  },
});
