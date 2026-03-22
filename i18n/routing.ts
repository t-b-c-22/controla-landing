import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "ca", "fr", "de", "it", "pt"],
  defaultLocale: "es",
});
