"use client";

import { useState, useRef, useEffect } from "react";

export default function AccessGate({
  children,
  correctCode,
  title,
  subtitle,
  placeholder,
  buttonLabel,
  errorMsg,
}: {
  children: React.ReactNode;
  correctCode: string;
  title: string;
  subtitle: string;
  placeholder: string;
  buttonLabel: string;
  errorMsg: string;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("bcn-montjuic-access");
      if (stored === correctCode) setUnlocked(true);
    }
  }, [correctCode]);

  useEffect(() => {
    if (!unlocked) inputRef.current?.focus();
  }, [unlocked]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toLowerCase() === correctCode.toLowerCase()) {
      sessionStorage.setItem("bcn-montjuic-access", correctCode);
      setUnlocked(true);
    } else {
      setError(true);
      setCode("");
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gris px-6">
      <div className="max-w-[420px] w-full text-center">
        <div className="w-16 h-16 bg-azul/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4141e2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="text-[clamp(1.6rem,3vw,2.2rem)] font-[800] text-navy tracking-[-1px] mb-2">
          {title}
        </h1>
        <p className="text-texto-light text-[0.95rem] mb-8">{subtitle}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            ref={inputRef}
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            placeholder={placeholder}
            className={`w-full px-5 py-3.5 rounded-xl border-2 text-center text-[1.1rem] font-semibold tracking-[3px] uppercase transition-colors outline-none ${
              error
                ? "border-naranja bg-naranja/5 text-naranja"
                : "border-gray-200 bg-white text-navy focus:border-azul"
            }`}
          />
          {error && (
            <p className="text-naranja text-[0.85rem] font-medium">{errorMsg}</p>
          )}
          <button
            type="submit"
            className="w-full bg-azul text-white font-bold py-3.5 rounded-xl hover:bg-azul-hover transition-colors"
          >
            {buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
