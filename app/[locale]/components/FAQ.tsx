"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
  ];

  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div key={i} className="border-b border-black/8">
          <button
            className="w-full bg-transparent border-none cursor-pointer flex justify-between items-center py-6 text-left font-semibold text-[1.05rem] text-navy"
            style={{ fontFamily: "inherit" }}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span>{item.q}</span>
            <span
              className={`faq-icon text-2xl text-azul font-light shrink-0 ml-4 ${openIndex === i ? "open" : ""}`}
            >
              +
            </span>
          </button>
          <div className={`faq-answer ${openIndex === i ? "open" : ""}`}>
            <div className="pb-6 text-[0.95rem] text-texto-light leading-[1.7]">
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
