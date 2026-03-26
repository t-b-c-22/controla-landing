"use client";

import { useState, useRef, useEffect } from "react";

export default function InterestButton({
  product,
  label,
  sentLabel,
  emailPlaceholder,
  submitLabel,
}: {
  product: string;
  label: string;
  sentLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sent || sending || !email) return;
    setSending(true);
    try {
      await fetch("https://formspree.io/f/mbdzvoen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `🔔 Interés en: ${product}`,
          email,
          product,
          message: `Un visitante (${email}) está interesado en: ${product}`,
          source: "landing-page-interest",
        }),
      });
    } catch {
      // still show success to user
    } finally {
      setSent(true);
      setSending(false);
    }
  }

  if (sent) {
    return (
      <span className="inline-flex items-center gap-2 text-verde text-[0.9rem] font-semibold py-3 px-6">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#69ca90" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12" /></svg>
        {sentLabel}
      </span>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-azul-light text-azul text-[0.9rem] font-semibold py-3 px-6 rounded-xl border-none cursor-pointer transition-all hover:bg-azul hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div ref={popupRef} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-[420px] relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-texto-light hover:text-navy bg-transparent border-none cursor-pointer text-xl"
            >
              ×
            </button>
            <div className="mb-6">
              <p className="text-azul text-[0.78rem] font-bold uppercase tracking-[2px] mb-2">{product}</p>
              <h3 className="text-navy text-[1.4rem] font-bold">{label}</h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={emailPlaceholder}
                className="w-full py-3.5 px-4 bg-gris border border-black/8 rounded-xl text-navy text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-texto-light/50"
                style={{ fontFamily: "inherit" }}
              />
              <button
                type="submit"
                disabled={sending || !email}
                className="w-full bg-azul text-white text-[1rem] font-bold py-3.5 rounded-xl border-none cursor-pointer transition-all hover:bg-azul-hover hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "inherit" }}
              >
                {sending ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </span>
                ) : (
                  submitLabel
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
