"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [token, setToken] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    // Load the Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => {
      if (window.turnstile && widgetRef.current && !renderedRef.current) {
        renderedRef.current = true;
        window.turnstile.render(widgetRef.current, {
          sitekey: "0x4AAAAAACunPwlBzvgxnM39",
          theme: "dark",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(null),
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <form action="https://formspree.io/f/mbdzvoen" method="POST" className="flex flex-col gap-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-[0.82rem] font-medium text-white/50 mb-1">{t("name")}</label>
          <input type="text" id="name" name="name" placeholder={t("namePlaceholder")} required className="w-full py-3.5 px-4 bg-navy-mid border border-white/8 rounded-[10px] text-white text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-white/25" style={{ fontFamily: "inherit" }} />
        </div>
        <div>
          <label htmlFor="hotel" className="block text-[0.82rem] font-medium text-white/50 mb-1">{t("hotel")}</label>
          <input type="text" id="hotel" name="hotel" placeholder={t("hotelPlaceholder")} className="w-full py-3.5 px-4 bg-navy-mid border border-white/8 rounded-[10px] text-white text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-white/25" style={{ fontFamily: "inherit" }} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-[0.82rem] font-medium text-white/50 mb-1">{t("email")}</label>
          <input type="email" id="email" name="email" placeholder={t("emailPlaceholder")} required className="w-full py-3.5 px-4 bg-navy-mid border border-white/8 rounded-[10px] text-white text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-white/25" style={{ fontFamily: "inherit" }} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-[0.82rem] font-medium text-white/50 mb-1">{t("phone")}</label>
          <input type="tel" id="phone" name="phone" placeholder={t("phonePlaceholder")} className="w-full py-3.5 px-4 bg-navy-mid border border-white/8 rounded-[10px] text-white text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-white/25" style={{ fontFamily: "inherit" }} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-[0.82rem] font-medium text-white/50 mb-1">{t("message")}</label>
        <textarea id="message" name="message" placeholder={t("messagePlaceholder")} className="w-full py-3.5 px-4 bg-navy-mid border border-white/8 rounded-[10px] text-white text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-white/25 resize-y min-h-[100px]" style={{ fontFamily: "inherit" }} />
      </div>

      {/* Turnstile widget */}
      <div ref={widgetRef} className="flex justify-center" />

      <button
        type="submit"
        disabled={!token}
        className="bg-naranja text-white text-[1.05rem] font-bold py-4 px-10 border-none rounded-xl cursor-pointer transition-all mt-2 hover:bg-naranja-hover hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        style={{ fontFamily: "inherit" }}
      >
        {t("submit")}
      </button>
      <p className="text-center text-[0.82rem] text-white/40 mt-3">{t("note")}</p>
    </form>
  );
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          theme: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
        }
      ) => string;
    };
  }
}
