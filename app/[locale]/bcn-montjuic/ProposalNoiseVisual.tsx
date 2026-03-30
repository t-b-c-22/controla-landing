"use client";

import { useState, useEffect } from "react";

export default function ProposalNoiseVisual() {
  const [alertPulse, setAlertPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertPulse(true);
      setTimeout(() => setAlertPulse(false), 2000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const rooms = [
    { room: "Hab. 101", db: 38, status: "ok" as const },
    { room: "Hab. 205", db: 42, status: "ok" as const },
    { room: "Hab. 312", db: 72, status: "alert" as const },
    { room: "Hab. 408", db: 35, status: "ok" as const },
  ];

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-navy text-[0.85rem] font-semibold">Monitor de ruido</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-verde animate-pulse" />
            <span className="text-verde text-[0.75rem] font-medium">24/7</span>
          </div>
        </div>
        <div className="space-y-3 mb-5">
          {rooms.map((r) => (
            <div
              key={r.room}
              className={`rounded-xl px-4 py-3 transition-all duration-500 ${
                r.status === "alert"
                  ? alertPulse
                    ? "bg-naranja/15 shadow-md shadow-naranja/10"
                    : "bg-naranja/10"
                  : "bg-gris"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {r.status === "alert" && (
                    <div className={`transition-transform duration-300 ${alertPulse ? "scale-110" : "scale-100"}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e05e27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </div>
                  )}
                  <span className={`text-[0.85rem] font-medium ${
                    r.status === "alert" && alertPulse ? "text-naranja" : "text-navy"
                  } transition-colors duration-500`}>
                    {r.room}
                  </span>
                </div>
                <span className={`text-[0.85rem] font-bold ${
                  r.status === "alert" ? "text-naranja" : "text-navy"
                }`}>
                  {r.db} dB
                </span>
              </div>
              <div className="mt-2 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    r.status === "alert" ? "bg-naranja" : "bg-verde"
                  }`}
                  style={{ width: `${Math.min(r.db, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition-all duration-500 ${
          alertPulse ? "bg-naranja/20 shadow-md shadow-naranja/10" : "bg-naranja/10"
        }`}>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05e27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`shrink-0 transition-transform duration-300 ${alertPulse ? "scale-110 rotate-12" : "scale-100 rotate-0"}`}
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="text-naranja text-[0.8rem] font-medium">Alerta: Hab. 312 supera 70 dB</span>
        </div>
      </div>
    </div>
  );
}
