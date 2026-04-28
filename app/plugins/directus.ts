import {
  createDirectus,
  rest,
  readItem,
  readItems,
  staticToken,
} from "@directus/sdk";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const directus = createDirectus(config.public.directusUrl)
    .with(staticToken(config.directusToken))
    .with(rest());
  return {
    provide: { directus, readItem, readItems },
  };
});
