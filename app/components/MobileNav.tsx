"use client";

import { useState } from "react";

const navLinks = [
  { href: "#soluciones", label: "Soluciones" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#casos", label: "Casos de éxito" },
  { href: "#faq", label: "FAQ" },
  { href: "#nosotros", label: "Nosotros" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

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
            Hablemos
          </a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden bg-transparent border-none text-2xl cursor-pointer text-navy p-2"
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        {open ? "\u2715" : "\u2630"}
      </button>

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
            Hablemos
          </a>
        </div>
      </div>
    </>
  );
}
