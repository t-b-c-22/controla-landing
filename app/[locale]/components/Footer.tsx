"use client";

import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="py-10 px-6 bg-navy border-t border-white/4">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center flex-wrap gap-4 max-md:justify-center max-md:text-center">
        <a href={`/${locale}`} className="text-[1.1rem] font-bold text-azul no-underline">Controlá</a>
        <ul className="flex gap-6 list-none flex-wrap max-md:justify-center">
          {[
            { href: `/${locale}#soluciones`, label: t("solutions") },
            { href: `/${locale}#casos`, label: t("cases") },
            { href: `/${locale}#recursos`, label: t("resources") },
            { href: `/${locale}#nosotros`, label: t("about") },
            { href: "mailto:info@controla.cloud", label: "info@controla.cloud" },
            { href: "https://www.linkedin.com/company/controla-iot/", label: "LinkedIn", external: true },
          ].map((link) => (
            <li key={link.label}>
              <a href={link.href} {...("external" in link ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-[0.85rem] text-white/50 no-underline transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[0.8rem] text-white/35 w-full text-center mt-6 pt-6 border-t border-white/4">{t("copyright")}</p>
      </div>
    </footer>
  );
}
