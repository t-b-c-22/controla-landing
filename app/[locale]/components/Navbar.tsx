"use client";

import { useLocale } from "next-intl";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const locale = useLocale();

  return (
    <nav className="fixed top-0 w-full bg-white/96 backdrop-blur-[12px] border-b border-gris z-50 px-6">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[68px] relative">
        <a href={`/${locale}`} className="no-underline">
          <img src="/logo.svg" alt="Controlá" className="h-[32px] w-auto" />
        </a>
        <MobileNav />
      </div>
    </nav>
  );
}
