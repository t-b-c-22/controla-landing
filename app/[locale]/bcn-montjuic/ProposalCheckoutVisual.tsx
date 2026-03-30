"use client";

import { useState, useEffect } from "react";

export default function ProposalCheckoutVisual() {
  const [showNotification, setShowNotification] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    const show = () => {
      setShowNotification(true);
      requestAnimationFrame(() => setSlideIn(true));
    };
    const hide = () => {
      setSlideIn(false);
      setTimeout(() => setShowNotification(false), 400);
    };

    const timer1 = setTimeout(show, 1500);
    const timer2 = setTimeout(hide, 6000);

    const interval = setInterval(() => {
      show();
      setTimeout(hide, 4500);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-[400px] mx-auto relative">
      {/* Notification toast floating above the image */}
      {showNotification && (
        <div
          className={`absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-[95%] transition-all duration-400 ${
            slideIn
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-naranja/10 rounded-xl flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e05e27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-navy font-bold text-[0.85rem]">Check Out</span>
                <span className="text-texto-light text-[0.7rem]">7:56 AM</span>
              </div>
              <p className="text-texto text-[0.82rem] leading-snug">
                <span className="font-semibold text-naranja">Habitación 301</span> — Lista para limpieza.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Original checkout button image */}
      <div className="mt-12">
        <img
          src="/productos/checkout-button-card.png"
          alt="Botón de checkout inteligente"
          className="w-full rounded-2xl shadow-xl"
        />
      </div>
    </div>
  );
}
