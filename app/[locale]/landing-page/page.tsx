import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import InterestButton from "./InterestButton";
import ContactForm from "../components/ContactForm";

const baseUrl = "https://controla.cloud";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const meta = messages.onePager?.meta || {};

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/landing-page`;
  }
  languages["x-default"] = `${baseUrl}/es/landing-page`;

  return {
    title: meta.title || "Soluciones IoT para hoteles | Controlá",
    description: meta.description || "",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/landing-page`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/landing-page`,
      siteName: "Controlá",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PageContent />;
}

/* ──────────── Shared ──────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">
      {children}
    </p>
  );
}

function CheckIcon({ color = "#4141e2" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

function ProgressIndicator({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div className="max-w-[1200px] mx-auto mb-8 flex items-center gap-4">
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all ${
              i < current ? "w-8 bg-azul" : "w-4 bg-azul/15"
            }`}
          />
        ))}
      </div>
      <span className="text-texto-light text-[0.78rem] font-medium whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function TextBlock({
  label,
  title,
  titleAccent,
  subtitle,
  features,
  statValue,
  statLabel,
  accentColor,
  strokeColor,
  interestBtn,
  note,
}: {
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  features: string[];
  statValue: string;
  statLabel: string;
  accentColor: string;
  strokeColor: string;
  interestBtn: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="flex flex-col justify-center lg:pl-8">
      <div className={`text-${accentColor} text-[0.78rem] font-bold uppercase tracking-[2px] mb-4`}>
        {label}
      </div>
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.1] tracking-[-1.5px] text-navy mb-2">
        {title} <span className={`text-${accentColor}`}>{titleAccent}</span>
      </h2>
      <p className="text-texto-light text-[1.05rem] leading-[1.7] mb-6 max-w-[500px]">{subtitle}</p>
      {note && (
        <p className="text-texto-light/70 text-[0.85rem] italic mb-6 max-w-[480px]">{note}</p>
      )}
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <CheckIcon color={strokeColor} />
            <span className="text-texto text-[0.95rem]">{f}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-baseline gap-3">
          <span className={`text-[clamp(1.8rem,3vw,2.5rem)] font-[800] text-${accentColor} tracking-tight`}>
            {statValue}
          </span>
          <span className="text-texto-light text-[0.95rem]">{statLabel}</span>
        </div>
        {interestBtn}
      </div>
    </div>
  );
}

/* ──────────── Visual blocks ──────────── */

function ClimaVisual() {
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
        {/* Savings banner - the 22% stat */}
        <div className="bg-verde/10 rounded-xl px-5 py-4 mb-5">
          <p className="text-[0.75rem] text-texto-light mb-1">Ahorro este último mes</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[2.8rem] font-[800] text-verde leading-none">22%</span>
            <span className="text-[0.85rem] text-verde font-semibold">vs. gestión manual</span>
          </div>
        </div>
        {/* Automations */}
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

function CheckoutVisual() {
  return (
    <div className="w-full max-w-[400px] mx-auto">
      <img
        src="/productos/checkout-button-card.png"
        alt="Botón de checkout inteligente"
        className="w-full rounded-2xl shadow-xl"
      />
    </div>
  );
}

function NoiseVisual() {
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

function SecurityVisual() {
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

function WaterVisual() {
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
        {/* Compliance badge */}
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

function OccupancyVisual() {
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

/* ──────────── Page content ──────────── */

function PageContent() {
  const t = useTranslations("onePager");
  const locale = useLocale();

  const colorMap: Record<string, string> = {
    azul: "#4141e2",
    naranja: "#e05e27",
    verde: "#69ca90",
    navy: "#132342",
  };

  // New order: checkout → security → maintenance → clima → occupancy → noise
  const services = [
    { key: "ops", accentColor: "naranja", imageRight: true, bgClass: "bg-white", Visual: CheckoutVisual },
    { key: "security", accentColor: "navy", imageRight: false, bgClass: "bg-gris", Visual: SecurityVisual },
    { key: "maintenance", accentColor: "azul", imageRight: true, bgClass: "bg-white", Visual: WaterVisual },
    { key: "clima", accentColor: "azul", imageRight: false, bgClass: "bg-gris", Visual: ClimaVisual },
    { key: "occupancy", accentColor: "naranja", imageRight: true, bgClass: "bg-white", Visual: OccupancyVisual },
    { key: "noise", accentColor: "verde", imageRight: false, bgClass: "bg-gris", Visual: NoiseVisual },
  ];

  const total = services.length;

  return (
    <main>
      {/* HERO */}
      <section className="pt-[140px] pb-[80px] px-6 bg-gradient-to-b from-white to-gris max-md:pt-[120px] max-md:pb-[60px]">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="inline-block bg-azul-light text-azul text-[0.85rem] font-semibold px-[18px] py-1.5 rounded-full mb-7">
            {t("hero.badge")}
          </div>
          <h1 className="text-[clamp(2.6rem,5.5vw,4rem)] font-[800] leading-[1.08] tracking-[-2px] mb-6 text-navy">
            {t("hero.title")}{" "}
            <span className="text-azul">{t("hero.titleAccent")}</span>
          </h1>
          <p className="text-[clamp(1.05rem,2vw,1.25rem)] text-texto-light max-w-[600px] mx-auto mb-10 leading-[1.7]">
            {t("hero.subtitle")}
          </p>
          <a
            href="#contacto"
            className="inline-block bg-naranja text-white text-[1.1rem] font-bold py-4 px-11 rounded-xl no-underline transition-all shadow-[0_4px_16px_rgba(224,94,39,0.25)] hover:bg-naranja-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(224,94,39,0.3)]"
          >
            {t("hero.cta")}
          </a>
        </div>
      </section>

      {/* SERVICE SECTIONS */}
      {services.map((s, idx) => {
        const strokeColor = colorMap[s.accentColor] || colorMap.azul;
        const current = idx + 1;
        const productName = t(`${s.key}.label`);

        const interestBtn = (
          <InterestButton
            product={productName}
            label={t("interest")}
            sentLabel={t("interestSent")}
            emailPlaceholder={t("interestEmailPlaceholder")}
            submitLabel={t("interestSubmit")}
          />
        );

        // Special rendering for security/AI section
        if (s.key === "security") {
          return (
            <section key={s.key} className="pt-10 pb-[100px] px-6 max-md:pb-[60px] max-md:pt-6 bg-gris">
              <ProgressIndicator current={current} total={total} label={t("progress", { current, total })} />
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="max-md:order-2">
                  <div className="flex flex-col justify-center lg:pl-8">
                    <div className="text-navy text-[0.78rem] font-bold uppercase tracking-[2px] mb-4">
                      {t("security.label")}
                    </div>
                    <h2 className="text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.1] tracking-[-1.5px] text-navy mb-2">
                      {t("security.title")} <span className="text-azul">{t("security.titleAccent")}</span>
                    </h2>
                    <p className="text-texto-light text-[1.05rem] leading-[1.7] mb-4 max-w-[520px]">
                      {t("security.subtitle")}
                    </p>
                    <p className="text-texto text-[1.05rem] leading-[1.7] mb-8 max-w-[520px]">
                      {t("security.subtitleHighlight1")}{" "}
                      <span className="text-azul font-bold">{t("security.subtitleHighlight2")}</span>.{" "}
                      {t("security.subtitleHighlight3")}{" "}
                      <span className="text-azul font-bold">{t("security.subtitleHighlight4")}</span>.
                    </p>

                    {/* Detection list with inline badges */}
                    <ul className="space-y-3 mb-8">
                      {(["d1", "d2", "d3", "d4"] as const).map((dk) => {
                        const badge = t.has(`security.${dk}Badge`) ? t(`security.${dk}Badge`) : "";
                        return (
                          <li key={dk} className="flex items-center gap-3">
                            <CheckIcon color="#132342" />
                            <span className="text-navy text-[0.95rem] font-medium">{t(`security.${dk}`)}</span>
                            {badge && (
                              <span className="text-[0.7rem] bg-naranja/10 text-naranja font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                                {badge}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[clamp(1.8rem,3vw,2.5rem)] font-[800] text-navy tracking-tight">
                          {t("security.statValue")}
                        </span>
                        <span className="text-texto-light text-[0.95rem]">{t("security.statLabel")}</span>
                      </div>
                      {interestBtn}
                    </div>
                  </div>
                </div>
                <div className="max-md:order-1 flex items-center justify-center">
                  <SecurityVisual />
                </div>
              </div>
            </section>
          );
        }

        const textBlock = (
          <TextBlock
            label={t(`${s.key}.label`)}
            title={t(`${s.key}.title`)}
            titleAccent={t(`${s.key}.titleAccent`)}
            subtitle={t(`${s.key}.subtitle`)}
            features={[1, 2, 3, 4].filter((n) => t.has(`${s.key}.f${n}`)).map((n) => t(`${s.key}.f${n}`))}
            statValue={t(`${s.key}.statValue`)}
            statLabel={t(`${s.key}.statLabel`)}
            accentColor={s.accentColor}
            strokeColor={strokeColor}
            note={t.has(`${s.key}.note`) ? t(`${s.key}.note`) : undefined}
            interestBtn={interestBtn}
          />
        );
        const visualBlock = (
          <div className="flex items-center justify-center">
            <s.Visual />
          </div>
        );

        return (
          <section key={s.key} className={`pt-10 pb-[100px] px-6 max-md:pb-[60px] max-md:pt-6 ${s.bgClass}`}>
            <ProgressIndicator
              current={current}
              total={total}
              label={t("progress", { current, total })}
            />
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {s.imageRight ? (
                <>
                  {textBlock}
                  {visualBlock}
                </>
              ) : (
                <>
                  <div className="max-md:order-2">{textBlock}</div>
                  <div className="max-md:order-1">{visualBlock}</div>
                </>
              )}
            </div>
          </section>
        );
      })}

      {/* HOW IT WORKS */}
      <section className="py-[100px] px-6 bg-white max-md:py-[70px]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>{t("how.label")}</SectionLabel>
            <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3]">
              {t("how.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="text-center">
                <div className="w-14 h-14 rounded-full bg-azul text-white flex items-center justify-center text-[1.3rem] font-bold mb-5 mx-auto">
                  {n}
                </div>
                <h3 className="text-navy font-bold text-[1.15rem] mb-3">
                  {t(`how.step${n}Title`)}
                </h3>
                <p className="text-texto-light text-[0.95rem] leading-[1.7]">
                  {t(`how.step${n}Text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contacto" className="py-[80px] px-6 bg-navy max-md:py-[60px]">
        <div className="max-w-[600px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-white mb-3">
              {t("cta.title")}
            </h2>
            <p className="text-white/60 text-[1.05rem]">
              {t("cta.subtitle")}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
