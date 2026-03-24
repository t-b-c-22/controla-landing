"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrolled);
      setVisible(scrollTop > 300);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const r = 18;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - progress * circumference;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-50 w-[44px] h-[44px] rounded-full bg-white border-none cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.15)] flex items-center justify-center transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? undefined : "translateY(10px)",
      }}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 44 44"
      >
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2.5"
        />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="#4141e2"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.1s" }}
        />
      </svg>
      {/* Arrow */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4141e2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18,15 12,9 6,15" />
      </svg>
    </button>
  );
}
