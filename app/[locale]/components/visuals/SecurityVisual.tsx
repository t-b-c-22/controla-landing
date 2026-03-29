export default function SecurityVisual() {
  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="rounded-2xl shadow-xl overflow-hidden">
        <img
          src="/productos/ai-camera-tray.png"
          alt="Detección de bandejas vacías con IA"
          className="w-full h-auto"
        />
        <div className="bg-navy p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-verde animate-pulse" />
            <span className="text-white text-[0.8rem] font-semibold">IA · Análisis en tiempo real</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Personas", "Platos", "Mascotas", "Flujo"].map((tag) => (
              <span key={tag} className="text-[0.7rem] bg-white/10 text-white/80 px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
