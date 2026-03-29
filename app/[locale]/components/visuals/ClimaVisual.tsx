export default function ClimaVisual() {
  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-verde" />
            <span className="text-navy text-[0.8rem] font-semibold">Dashboard energético</span>
          </div>
          <span className="text-texto-light text-[0.75rem]">Auto</span>
        </div>
        <div className="bg-verde/10 rounded-xl px-5 py-4 mb-5">
          <p className="text-[0.75rem] text-texto-light mb-1">Ahorro este último mes</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[2.8rem] font-[800] text-verde leading-none">22%</span>
            <span className="text-[0.85rem] text-verde font-semibold">vs. gestión manual</span>
          </div>
        </div>
        <div className="space-y-2.5 mb-5">
          {[
            { name: "Límite de temperatura", active: true, detail: "Máx. 24°C" },
            { name: "Modo eco en vacío", active: true, detail: "Activo" },
            { name: "Apagado con ventana", active: true, detail: "Sensor OK" },
          ].map((a) => (
            <div key={a.name} className="flex items-center justify-between bg-gris rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-[18px] rounded-full relative ${a.active ? "bg-azul" : "bg-gray-300"}`}>
                  <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[2px] transition-all ${a.active ? "right-[2px]" : "left-[2px]"}`} />
                </div>
                <span className="text-navy text-[0.82rem] font-medium">{a.name}</span>
              </div>
              <span className={`text-[0.75rem] font-semibold ${a.active ? "text-azul" : "text-texto-light"}`}>{a.detail}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-azul/8 rounded-xl p-3 text-center">
            <p className="text-[1.1rem] font-bold text-navy">22°C</p>
            <p className="text-[0.7rem] text-texto-light">Actual</p>
          </div>
          <div className="bg-azul/8 rounded-xl p-3 text-center">
            <p className="text-[1.1rem] font-bold text-azul">ECO</p>
            <p className="text-[0.7rem] text-texto-light">Modo</p>
          </div>
          <div className="bg-verde/10 rounded-xl p-3 text-center">
            <p className="text-[1.1rem] font-bold text-verde">3</p>
            <p className="text-[0.7rem] text-texto-light">Reglas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
