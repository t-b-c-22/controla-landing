export default function NoiseVisual() {
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
          {[
            { room: "Hab. 101", db: 38, status: "ok" },
            { room: "Hab. 205", db: 42, status: "ok" },
            { room: "Hab. 312", db: 72, status: "alert" },
            { room: "Hab. 408", db: 35, status: "ok" },
          ].map((r) => (
            <div key={r.room} className={`flex items-center justify-between rounded-xl px-4 py-3 ${r.status === "alert" ? "bg-naranja/10" : "bg-gris"}`}>
              <span className="text-navy text-[0.85rem] font-medium">{r.room}</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${r.status === "alert" ? "bg-naranja" : "bg-verde"}`}
                    style={{ width: `${Math.min(r.db, 100)}%` }}
                  />
                </div>
                <span className={`text-[0.85rem] font-bold min-w-[50px] text-right ${r.status === "alert" ? "text-naranja" : "text-navy"}`}>
                  {r.db} dB
                </span>
                {r.status === "alert" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05e27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-naranja/10 rounded-lg px-4 py-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05e27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          <span className="text-naranja text-[0.8rem] font-medium">Alerta: Hab. 312 supera 70 dB</span>
        </div>
      </div>
    </div>
  );
}
