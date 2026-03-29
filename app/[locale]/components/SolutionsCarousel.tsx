"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ClimaVisual, CheckoutVisual, NoiseVisual, SecurityVisual, WaterVisual, OccupancyVisual } from "./visuals";

const visualMap: Record<string, React.ComponentType> = {
  ops: CheckoutVisual,
  security: SecurityVisual,
  maintenance: WaterVisual,
  clima: ClimaVisual,
  occupancy: OccupancyVisual,
  noise: NoiseVisual,
};

const colorHex: Record<string, string> = {
  azul: "#4141e2",
  naranja: "#e05e27",
  verde: "#69ca90",
  navy: "#132342",
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
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  const touchDelta = useRef(0);

  const total = solutions.length;

  const goTo = useCallback((idx: number) => {
    setActive(((idx % total) + total) % total);
    setPaused(true);
  }, [total]);

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // Auto-rotate
  useEffect(() => {
    if (paused) {
      const resume = setTimeout(() => setPaused(false), 8000);
      return () => clearTimeout(resume);
    }
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, total]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  };
  const onTouchEnd = () => {
    if (touchDelta.current > 50) prev();
    else if (touchDelta.current < -50) next();
  };

  const sol = solutions[active];
  const Visual = visualMap[sol.key];
  const stroke = colorHex[sol.accentColor] || colorHex.azul;

  return (
    <section id="soluciones" className="py-[100px] bg-white max-md:py-[70px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">{sectionLabel}</p>
        <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-3">{sectionTitle}</h2>
        <p className="text-texto-light text-[1.05rem] mb-10 max-w-[600px]">{sectionSubtitle}</p>
      </div>

      {/* Card carousel */}
      <div
        className="relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Arrow left — desktop */}
        <button
          onClick={prev}
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-gris items-center justify-center cursor-pointer hover:bg-gris transition-colors"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#132342" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Arrow right — desktop */}
        <button
          onClick={next}
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-gris items-center justify-center cursor-pointer hover:bg-gris transition-colors"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#132342" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(50% - ${active * 340 + 170}px))`,
          }}
        >
          {solutions.map((s, i) => {
            const isActive = i === active;
            const SolVisual = visualMap[s.key];
            const solStroke = colorHex[s.accentColor] || colorHex.azul;

            return (
              <div
                key={s.key}
                className={`shrink-0 w-[320px] mx-[10px] transition-all duration-500 cursor-pointer ${
                  isActive ? "scale-100 opacity-100" : "scale-[0.88] opacity-50"
                }`}
                onClick={() => goTo(i)}
              >
                <div className={`bg-white rounded-2xl shadow-xl border-2 transition-colors duration-300 overflow-hidden ${
                  isActive ? "border-azul/30" : "border-transparent"
                }`}>
                  {/* Visual — fixed height */}
                  <div className="h-[260px] bg-gris flex items-center justify-center overflow-hidden p-4">
                    <div className="transform scale-[0.55] origin-center">
                      {SolVisual && <SolVisual />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="text-[0.72rem] font-bold uppercase tracking-[1.5px] mb-2" style={{ color: solStroke }}>
                      {s.label}
                    </div>
                    <h3 className="text-[1.05rem] font-bold text-navy leading-[1.3] mb-2">
                      {s.title} <span style={{ color: solStroke }}>{s.titleAccent}</span>
                    </h3>
                    <p className="text-texto-light text-[0.85rem] leading-[1.6] mb-4 line-clamp-2">
                      {s.subtitle}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[1.4rem] font-[800]" style={{ color: solStroke }}>
                        {s.statValue}
                      </span>
                      <span className="text-texto-light text-[0.8rem]">{s.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {solutions.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer border-none ${
              i === active ? "w-8 h-2 bg-azul" : "w-2 h-2 bg-azul/20"
            }`}
            aria-label={`Go to solution ${i + 1}`}
          />
        ))}
      </div>

      {/* Expanded detail for active card */}
      <div className="max-w-[1200px] mx-auto px-6 mt-10">
        <div className="bg-gris rounded-2xl p-8 max-md:p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-[clamp(1.3rem,2.5vw,1.7rem)] font-[800] leading-[1.15] tracking-[-1px] text-navy mb-3">
                {sol.title} <span style={{ color: stroke }}>{sol.titleAccent}</span>
              </h3>
              <p className="text-texto-light text-[0.95rem] leading-[1.7]">
                {sol.subtitle}
              </p>
            </div>
            <div>
              <ul className="space-y-2.5">
                {sol.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    <span className="text-texto text-[0.9rem]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
