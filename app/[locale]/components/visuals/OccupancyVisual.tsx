export default function OccupancyVisual() {
  const rooms = [
    { id: "101", status: "occupied" }, { id: "102", status: "vacant" }, { id: "103", status: "occupied" }, { id: "104", status: "cleaning" },
    { id: "201", status: "vacant" }, { id: "202", status: "occupied" }, { id: "203", status: "vacant" }, { id: "204", status: "occupied" },
    { id: "301", status: "occupied" }, { id: "302", status: "cleaning" }, { id: "303", status: "occupied" }, { id: "304", status: "vacant" },
  ];
  const statusConfig: Record<string, { bg: string; dot: string; label: string }> = {
    occupied: { bg: "bg-azul/10", dot: "bg-azul", label: "Ocupada" },
    vacant: { bg: "bg-verde/10", dot: "bg-verde", label: "Libre" },
    cleaning: { bg: "bg-naranja/10", dot: "bg-naranja", label: "Limpieza" },
  };

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <span className="text-navy text-[0.85rem] font-semibold">Estado de habitaciones</span>
          <span className="text-texto-light text-[0.75rem]">Tiempo real</span>
        </div>
        <div className="grid grid-cols-4 gap-2.5 mb-5">
          {rooms.map((r) => {
            const cfg = statusConfig[r.status];
            return (
              <div key={r.id} className={`${cfg.bg} rounded-xl p-3 text-center`}>
                <p className="text-navy text-[0.9rem] font-bold">{r.id}</p>
                <div className={`w-2 h-2 rounded-full ${cfg.dot} mx-auto mt-1.5`} />
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 justify-center">
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
              <span className="text-[0.75rem] text-texto-light">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
