"use client";

import { useState, useEffect, useCallback } from "react";
import { ClimaVisual, CheckoutVisual, NoiseVisual, SecurityVisual, WaterVisual, OccupancyVisual } from "./visuals";

const visualMap: Record<string, React.ComponentType> = {
  ops: CheckoutVisual,
  security: SecurityVisual,
  maintenance: WaterVisual,
  clima: ClimaVisual,
  occupancy: OccupancyVisual,
  noise: NoiseVisual,
};

const accentClasses: Record<string, { text: string; bg: string; bgLight: string }> = {
  azul: { text: "text-azul", bg: "bg-azul", bgLight: "bg-azul-light" },
  naranja: { text: "text-naranja", bg: "bg-naranja", bgLight: "bg-naranja/10" },
  verde: { text: "text-verde", bg: "bg-verde", bgLight: "bg-verde/10" },
  navy: { text: "text-navy", bg: "bg-navy", bgLight: "bg-navy/10" },
};

interface Solution {
  key: string;
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  features: string[];
  statValue: string;
  statLabel: string;
  accentColor: string;
}

interface Props {
  solutions: Solution[];
  sectionLabel: string;
  sectionTitle: string;
  sectionSubtitle: string;
}

export default function SolutionsCarousel({ solutions, sectionLabel, sectionTitle, sectionSubtitle }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % solutions.length);
  }, [solutions.length]);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [paused, next]);

  const sol = solutions[active];
  const accent = accentClasses[sol.accentColor] || accentClasses.azul;
  const Visual = visualMap[sol.key];

  return (
    <section
      id="soluciones"
      className="py-[100px] px-6 bg-white max-md:py-[70px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">{sectionLabel}</p>
        <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-3">{sectionTitle}</h2>
        <p className="text-texto-light text-[1.05rem] mb-10 max-w-[600px]">{sectionSubtitle}</p>

        {/* Tab pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {solutions.map((s, i) => {
            const a = accentClasses[s.accentColor] || accentClasses.azul;
            const isActive = i === active;
            return (
              <button
                key={s.key}
                onClick={() => { setActive(i); setPaused(true); }}
                className={`px-5 py-2.5 rounded-xl text-[0.88rem] font-semibold transition-all cursor-pointer border-none ${
                  isActive
                    ? `${a.bg} text-white shadow-lg`
                    : "bg-gris text-texto-light hover:bg-gray-200"
                }`}
                style={{ fontFamily: "inherit" }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-10">
          {solutions.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? "w-12 bg-azul" : "w-4 bg-azul/15"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[420px]">
          {/* Visual */}
          <div className="flex items-center justify-center" key={`visual-${sol.key}`}>
            {Visual && <Visual />}
          </div>

          {/* Text */}
          <div key={`text-${sol.key}`}>
            <div className={`${accent.text} text-[0.78rem] font-bold uppercase tracking-[2px] mb-4`}>
              {sol.label}
            </div>
            <h3 className="text-[clamp(1.6rem,3vw,2.3rem)] font-[800] leading-[1.1] tracking-[-1.5px] text-navy mb-2">
              {sol.title} <span className={accent.text}>{sol.titleAccent}</span>
            </h3>
            <p className="text-texto-light text-[1.05rem] leading-[1.7] mb-6 max-w-[500px]">
              {sol.subtitle}
            </p>
            <ul className="space-y-3 mb-8">
              {sol.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accentClasses[sol.accentColor]?.text === "text-azul" ? "#4141e2" : sol.accentColor === "naranja" ? "#e05e27" : sol.accentColor === "verde" ? "#69ca90" : "#132342"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  <span className="text-texto text-[0.95rem]">{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-baseline gap-3">
              <span className={`text-[clamp(1.8rem,3vw,2.5rem)] font-[800] ${accent.text} tracking-tight`}>
                {sol.statValue}
              </span>
              <span className="text-texto-light text-[0.95rem]">{sol.statLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
