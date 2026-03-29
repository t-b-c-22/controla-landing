export default function WaterVisual() {
  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <span className="text-navy text-[0.85rem] font-semibold">Monitorización ACS</span>
          <span className="text-verde text-[0.75rem] font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-verde inline-block" /> En línea
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="bg-azul/8 rounded-xl p-4 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4141e2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" /></svg>
            <p className="text-[1.4rem] font-[800] text-navy">58°C</p>
            <p className="text-[0.7rem] text-texto-light">Temperatura</p>
          </div>
          <div className="bg-verde/10 rounded-xl p-4 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#69ca90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
            <p className="text-[1.4rem] font-[800] text-navy">0.5<span className="text-[0.8rem]">ppm</span></p>
            <p className="text-[0.7rem] text-texto-light">Cloro</p>
          </div>
          <div className="bg-naranja/8 rounded-xl p-4 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e05e27" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>
            <p className="text-[1.4rem] font-[800] text-navy">2.1<span className="text-[0.8rem]">bar</span></p>
            <p className="text-[0.7rem] text-texto-light">Presión</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-azul/8 rounded-lg px-4 py-2.5 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4141e2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          <span className="text-azul text-[0.8rem] font-medium">Normativa de calidad de agua · Registros automáticos</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-gris rounded-lg px-4 py-2.5">
            <span className="text-[0.8rem] text-navy font-medium">Caldera principal</span>
            <span className="text-verde text-[0.8rem] font-semibold flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#69ca90" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12" /></svg>
              OK
            </span>
          </div>
          <div className="flex items-center justify-between bg-naranja/10 rounded-lg px-4 py-2.5">
            <span className="text-[0.8rem] text-navy font-medium">Termo Planta 3</span>
            <span className="text-naranja text-[0.8rem] font-semibold flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e05e27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              45°C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
