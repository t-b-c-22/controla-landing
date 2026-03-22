"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "#soluciones", label: t("solutions") },
    { href: "#como-funciona", label: t("howItWorks") },
    { href: "#casos", label: t("cases") },
    { href: "#faq", label: t("faq") },
    { href: "#nosotros", label: t("about") },
    { href: `/${locale}/blog`, label: t("blog") },
  ];

  return (
    <>
      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-2 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-texto-light text-[0.9rem] font-medium px-4 py-2 rounded-lg transition-all hover:text-navy hover:bg-gris no-underline"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contacto"
            className="bg-naranja text-white text-[0.9rem] font-semibold px-6 py-2.5 rounded-lg no-underline transition-all hover:bg-naranja-hover"
          >
            {t("cta")}
          </a>
        </li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>

      {/* Mobile: language switcher + hamburger */}
      <div className="md:hidden flex items-center gap-2">
        <LanguageSwitcher />
        <button
          className="bg-transparent border-none text-2xl cursor-pointer text-navy p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? "\u2715" : "\u2630"}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${open ? "open" : ""} md:hidden absolute top-full left-0 w-full bg-white border-b border-gris`}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-texto-light text-[0.9rem] font-medium py-3 no-underline transition-colors hover:text-navy"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="bg-naranja text-white text-[0.9rem] font-semibold px-6 py-3 rounded-lg no-underline text-center mt-2 transition-all hover:bg-naranja-hover"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </>
  );
}
