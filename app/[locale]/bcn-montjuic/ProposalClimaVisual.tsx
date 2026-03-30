"use client";

import { useState } from "react";

const ROOM_TEMP = 23;

export default function ProposalClimaVisual() {
  const [isOn, setIsOn] = useState(true);
  const [ecoMode, setEcoMode] = useState(true);
  const [targetTemp, setTargetTemp] = useState(22);
  const [tempLimit, setTempLimit] = useState(24);

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-verde" />
            <span className="text-navy text-[0.8rem] font-semibold">Dashboard energético</span>
          </div>
          <span className={`text-[0.75rem] font-semibold ${isOn && ecoMode ? "text-verde" : "text-texto-light"}`}>
            {isOn ? (ecoMode ? "Eco" : "Manual") : "A/C apagado"}
          </span>
        </div>

        {/* Savings display - always visible */}
        <div className="rounded-xl px-5 py-4 mb-5 bg-verde/10">
          <p className="text-[0.75rem] text-texto-light mb-1">Ahorro estimado este mes</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[2.8rem] font-[800] leading-none text-verde">27%</span>
            <span className="text-[0.85rem] font-semibold text-verde">vs. gestión manual</span>
          </div>
        </div>

        {/* Status line */}
        <div className="flex items-center gap-2 rounded-lg px-4 py-2 mb-4 bg-verde/8">
          <div className="w-2 h-2 rounded-full bg-verde animate-pulse" />
          <span className="text-verde text-[0.78rem] font-medium">
            Sistema funcionando correctamente
          </span>
        </div>

        {/* A/C Control panel */}
        <div className="bg-gris rounded-xl px-4 py-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-navy text-[0.82rem] font-semibold">Control A/C</span>
            {isOn && (
              <span className="text-azul text-[0.82rem] font-bold">{targetTemp}°C</span>
            )}
            {!isOn && (
              <span className="text-texto-light text-[0.82rem] font-medium">Apagado</span>
            )}
          </div>
          <div className="flex items-center justify-center gap-4">
            {/* Power button */}
            <button
              onClick={() => setIsOn(!isOn)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isOn
                  ? "bg-azul text-white shadow-lg shadow-azul/30"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
            </button>

            {/* Temp down */}
            <button
              onClick={() => isOn && setTargetTemp(Math.max(16, targetTemp - 1))}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer text-[1.3rem] font-bold ${
                isOn
                  ? "bg-white text-navy shadow-md hover:bg-azul/5"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              −
            </button>

            {/* Target temp display */}
            <div className={`px-4 py-1.5 rounded-xl text-center min-w-[70px] ${isOn ? "bg-white shadow-md" : "bg-gray-100"}`}>
              <span className={`text-[1.5rem] font-[800] ${isOn ? "text-navy" : "text-gray-300"}`}>
                {isOn ? targetTemp : "--"}
              </span>
              {isOn && <span className="text-navy font-[800] text-[1rem]">°C</span>}
            </div>

            {/* Temp up */}
            <button
              onClick={() => isOn && setTargetTemp(Math.min(tempLimit, targetTemp + 1))}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer text-[1.3rem] font-bold ${
                isOn
                  ? "bg-white text-navy shadow-md hover:bg-azul/5"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              +
            </button>

            {/* Eco mode button */}
            <button
              onClick={() => isOn && setEcoMode(!ecoMode)}
              className={`h-11 px-4 rounded-full flex items-center justify-center transition-all cursor-pointer text-[0.75rem] font-bold uppercase tracking-[0.5px] ${
                isOn && ecoMode
                  ? "bg-verde text-white shadow-lg shadow-verde/30"
                  : isOn
                    ? "bg-white text-texto-light shadow-md hover:bg-verde/5"
                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              ECO
            </button>
          </div>
          {isOn && targetTemp >= tempLimit && (
            <p className="text-naranja text-[0.7rem] font-medium text-center mt-2">
              Límite de temperatura alcanzado ({tempLimit}°C)
            </p>
          )}
        </div>

        {/* Temp limit slider - always active */}
        <div className="bg-gris rounded-xl px-4 py-3 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-navy text-[0.82rem] font-medium">Límite de temperatura</span>
            <span className="text-azul text-[0.82rem] font-bold">Máx. {tempLimit}°C</span>
          </div>
          <input
            type="range"
            min={20}
            max={26}
            value={tempLimit}
            onChange={(e) => {
              const newLimit = Number(e.target.value);
              setTempLimit(newLimit);
              if (targetTemp > newLimit) setTargetTemp(newLimit);
            }}
            className="w-full h-1.5 bg-azul/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-azul [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="flex justify-between text-[0.65rem] text-texto-light mt-1">
            <span>20°C</span>
            <span>26°C</span>
          </div>
        </div>

        {/* Bottom stats - room temp and limit always visible */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-azul/8 rounded-xl p-3 text-center">
            <p className="text-[1.1rem] font-bold text-navy">{ROOM_TEMP}°C</p>
            <p className="text-[0.7rem] text-texto-light">Temp. habitación</p>
          </div>
          <div className={`rounded-xl p-3 text-center transition-colors ${isOn && ecoMode ? "bg-verde/10" : "bg-gray-100"}`}>
            <p className={`text-[1.1rem] font-bold transition-colors ${isOn && ecoMode ? "text-verde" : isOn ? "text-navy" : "text-texto-light"}`}>
              {isOn ? (ecoMode ? "ECO" : "STD") : "OFF"}
            </p>
            <p className="text-[0.7rem] text-texto-light">Modo</p>
          </div>
          <div className="bg-azul/8 rounded-xl p-3 text-center">
            <p className="text-[1.1rem] font-bold text-azul">{tempLimit}°C</p>
            <p className="text-[0.7rem] text-texto-light">Límite</p>
          </div>
        </div>
      </div>
    </div>
  );
}
