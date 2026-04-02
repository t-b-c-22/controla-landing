import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export const proxy = intlMiddleware;

export const config = {
  matcher: ["/", "/(es|en|ca|fr|de|it|pt|sv|nb|da|pl)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
