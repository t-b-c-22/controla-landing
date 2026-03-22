"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

const prefillMessages: Record<string, string> = {
  es: "Hola, me interesa saber más sobre Controlá",
  en: "Hi, I'd like to know more about Controlá",
  ca: "Hola, m'interessa saber més sobre Controlá",
  fr: "Bonjour, je souhaite en savoir plus sur Controlá",
  de: "Hallo, ich möchte mehr über Controlá erfahren",
  it: "Ciao, vorrei saperne di più su Controlá",
  pt: "Olá, gostaria de saber mais sobre a Controlá",
};

const bubbleTexts: Record<string, string> = {
  es: "¿Tienes dudas? ¡Escríbenos!",
  en: "Got questions? Chat with us!",
  ca: "Tens dubtes? Escriu-nos!",
  fr: "Des questions ? Écrivez-nous !",
  de: "Fragen? Schreiben Sie uns!",
  it: "Hai domande? Scrivici!",
  pt: "Tem dúvidas? Fale connosco!",
};

export default function WhatsAppButton() {
  const locale = useLocale();
  const text = encodeURIComponent(prefillMessages[locale] || prefillMessages.es);
  const bubble = bubbleTexts[locale] || bubbleTexts.es;
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Speech bubble */}
      {showBubble && !dismissed && (
        <div className="animate-fade-in relative bg-white text-navy text-[0.85rem] font-medium py-2.5 px-4 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.12)] max-w-[200px] leading-[1.4]">
          {bubble}
          <button
            onClick={(e) => { e.preventDefault(); setDismissed(true); }}
            className="absolute -top-1.5 -right-1.5 bg-gris-dark text-white w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold border-none cursor-pointer leading-none hover:bg-navy"
            aria-label="Close"
          >
            ✕
          </button>
          {/* Triangle pointing right */}
          <div className="absolute top-1/2 -right-[6px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white" />
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={`https://wa.me/34613094047?text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="bg-[#25D366] text-white w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all hover:scale-110 hover:shadow-[0_6px_24px_rgba(0,0,0,0.25)] no-underline shrink-0"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
