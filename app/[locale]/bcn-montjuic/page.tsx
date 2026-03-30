import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import AccessGate from "./AccessGate";
import ProposalCheckoutVisual from "./ProposalCheckoutVisual";
import ProposalNoiseVisual from "./ProposalNoiseVisual";
import ProposalClimaVisual from "./ProposalClimaVisual";
import { OccupancyVisual } from "../components/visuals";

const baseUrl = "https://controla.cloud";
const ACCESS_CODE = "bcnmontjuic";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Propuesta BCN Montjuic | Controlá",
    description: "Propuesta de automatización para Aparthotel BCN Montjuic",
    robots: { index: false, follow: false },
  };
}

export default async function BCNMontjuicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageContent />;
}

/* ── Shared ── */

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

const colorMap: Record<string, string> = {
  azul: "text-azul",
  naranja: "text-naranja",
  verde: "text-verde",
  navy: "text-navy",
};

function StatCard({ value, label, color = "azul" }: { value: string; label: string; color?: string }) {
  return (
    <div className="text-center">
      <div className={`text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold ${colorMap[color] || "text-azul"} tracking-tight`}>
        {value}
      </div>
      <div className="text-texto-light text-[0.85rem] mt-1">{label}</div>
    </div>
  );
}

const clientLogos = [
  { src: "/logos_clientes/logocliente_outsite.png", alt: "Outsite" },
  { src: "/logos_clientes/logocliente_lodging.png", alt: "Lodging" },
  { src: "/logos_clientes/logocliente_aspasios.jpg", alt: "Aspasios" },
  { src: "/logos_clientes/logocliente_urbanhosts.png", alt: "Urban Hosts" },
  { src: "/logos_clientes/logocliente_noucentista.png", alt: "Hotel Noucentista" },
  { src: "/logos_clientes/logocliente_canela.png", alt: "Canela Homes" },
  { src: "/logos_clientes/logocliente_apolohomes.png", alt: "Apolo Homes" },
  { src: "/logos_clientes/logocliente_gapri.png", alt: "Gapri" },
];

/* ── Page content ── */

function PageContent() {
  const t = useTranslations("proposal");

  return (
    <AccessGate
      correctCode={ACCESS_CODE}
      title={t("gate.title")}
      subtitle={t("gate.subtitle")}
      placeholder={t("gate.placeholder")}
      buttonLabel={t("gate.button")}
      errorMsg={t("gate.error")}
    >
      <main>
        {/* ══════ HERO ══════ */}
        <section className="pt-[140px] pb-[60px] px-6 bg-gradient-to-b from-white to-gris max-md:pt-[120px] max-md:pb-[40px]">
          <div className="max-w-[900px] mx-auto text-center">
            {/* Client hotel logo */}
            <div className="mb-10">
              <div className="inline-block bg-white rounded-2xl px-8 py-5 shadow-lg border border-gray-100">
                <img
                  src="/logos_clientes/logocliente_bcnmontjuic.gif"
                  alt="Aparthotel BCN Montjuic"
                  className="h-[56px] max-md:h-[44px] object-contain"
                />
              </div>
            </div>
            <div className="inline-block bg-azul-light text-azul text-[0.82rem] font-semibold px-[18px] py-1.5 rounded-full mb-5">
              {t("hero.badge")}
            </div>
            <h1 className="text-[clamp(2.6rem,5.5vw,4rem)] font-extrabold leading-[1.08] tracking-[-2px] mb-4 text-navy">
              {t("hero.title")}{" "}
              <span className="text-azul">{t("hero.titleAccent")}</span>
            </h1>
            <p className="text-[clamp(1.05rem,2vw,1.2rem)] text-texto-light max-w-[650px] mx-auto mb-8 leading-[1.7]">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-10 mb-6">
              <div className="text-center">
                <div className="text-[0.78rem] font-semibold text-texto-light uppercase tracking-[1.5px] mb-1">{t("hero.presentedTo")}</div>
                <div className="text-navy font-bold text-[1.1rem]">Aparthotel BCN Montjuic</div>
                <div className="text-texto-light text-[0.9rem]">Daniel López & Gorka Mendiola</div>
              </div>
              <div className="w-px bg-gray-300 hidden md:block" />
              <div className="text-center">
                <div className="text-[0.78rem] font-semibold text-texto-light uppercase tracking-[1.5px] mb-1">{t("hero.projectLabel")}</div>
                <div className="text-navy font-bold text-[1.1rem]">{t("hero.project")}</div>
              </div>
              <div className="w-px bg-gray-300 hidden md:block" />
              <div className="text-center">
                <div className="text-[0.78rem] font-semibold text-texto-light uppercase tracking-[1.5px] mb-1">{t("hero.presentedBy")}</div>
                <div className="text-navy font-bold text-[1.1rem]">Controlá - Barcelona</div>
                <div className="text-texto-light text-[0.9rem]">info@controla.com.es</div>
              </div>
              <div className="w-px bg-gray-300 hidden md:block" />
              <div className="text-center">
                <div className="text-[0.78rem] font-semibold text-texto-light uppercase tracking-[1.5px] mb-1">{t("hero.date")}</div>
                <div className="text-navy font-bold text-[1.1rem]">{t("hero.dateValue")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ CLIENT LOGOS MARQUEE ══════ */}
        <section className="py-12 bg-white border-b border-gris overflow-hidden">
          <p className="text-[0.8rem] font-medium text-[#6b7280] uppercase tracking-[2px] mb-8 text-center">
            {t("about.title")}
          </p>
          <div className="logo-marquee">
            <div className="logo-marquee-track">
              {[...Array(2)].map((_, copy) =>
                clientLogos.map((logo) => (
                  <div key={`${copy}-${logo.alt}`} className="h-[56px] w-[180px] flex-shrink-0 flex items-center justify-center mx-8 max-md:h-[40px] max-md:w-[130px] max-md:mx-5">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ══════ WHAT WE INCLUDE ══════ */}
        <section className="py-[80px] px-6 bg-gris max-md:py-[60px]">
          <div className="max-w-[1000px] mx-auto text-center mb-14">
            <SectionLabel>{t("scope.label")}</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-1.5px] text-navy mb-4">
              {t("scope.title")}
            </h2>
            <p className="text-texto-light text-[1.05rem] leading-[1.7] max-w-[600px] mx-auto">
              {t("scope.subtitle")}
            </p>
          </div>
          <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {(["hardware", "installation", "config", "calibration"] as const).map((k) => (
              <div key={k} className="bg-white rounded-2xl p-6 flex gap-4 shadow-sm">
                <div className="w-10 h-10 bg-azul/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon color="#4141e2" />
                </div>
                <div>
                  <h3 className="text-navy font-bold text-[1.05rem] mb-1">{t(`scope.${k}Title`)}</h3>
                  <p className="text-texto-light text-[0.92rem] leading-[1.6]">{t(`scope.${k}Text`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ SERVICE 1: CHECKOUT ══════ */}
        <section className="py-[100px] px-6 bg-white max-md:py-[70px]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="text-naranja text-[0.78rem] font-bold uppercase tracking-[2px] mb-4">
                {t("checkout.label")}
              </div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-1.5px] text-navy mb-2">
                {t("checkout.title")}{" "}
                <span className="text-naranja">{t("checkout.titleAccent")}</span>
              </h2>
              <p className="text-texto-light text-[1.05rem] leading-[1.7] mb-6 max-w-[500px]">
                {t("checkout.subtitle")}
              </p>
              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4].map((n) => (
                  <li key={n} className="flex items-center gap-3">
                    <CheckIcon color="#e05e27" />
                    <span className="text-texto text-[0.95rem]">{t(`checkout.f${n}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-8">
                <StatCard value={t("checkout.stat1Value")} label={t("checkout.stat1Label")} color="naranja" />
                <StatCard value={t("checkout.stat2Value")} label={t("checkout.stat2Label")} color="naranja" />
                <StatCard value={t("checkout.stat3Value")} label={t("checkout.stat3Label")} color="naranja" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ProposalCheckoutVisual />
            </div>
          </div>
        </section>

        {/* ══════ SERVICE 2: OCCUPANCY ══════ */}
        <section className="py-[100px] px-6 bg-gris max-md:py-[70px]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex items-center justify-center max-md:order-2 lg:order-1">
              <OccupancyVisual />
            </div>
            <div className="max-md:order-1 lg:order-2">
              <div className="text-azul text-[0.78rem] font-bold uppercase tracking-[2px] mb-4">
                {t("occupancy.label")}
              </div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-1.5px] text-navy mb-2">
                {t("occupancy.title")}{" "}
                <span className="text-azul">{t("occupancy.titleAccent")}</span>
              </h2>
              <p className="text-texto-light text-[1.05rem] leading-[1.7] mb-6 max-w-[500px]">
                {t("occupancy.subtitle")}
              </p>
              <ul className="space-y-3 mb-8">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-center gap-3">
                    <CheckIcon color="#4141e2" />
                    <span className="text-texto text-[0.95rem]">{t(`occupancy.f${n}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-8">
                <StatCard value={t("occupancy.stat1Value")} label={t("occupancy.stat1Label")} />
                <StatCard value={t("occupancy.stat2Value")} label={t("occupancy.stat2Label")} />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ SERVICE 3: NOISE + SMOKE ══════ */}
        <section className="py-[100px] px-6 bg-white max-md:py-[70px]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="text-verde text-[0.78rem] font-bold uppercase tracking-[2px] mb-4">
                {t("noiseSmoke.label")}
              </div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-1.5px] text-navy mb-2">
                {t("noiseSmoke.title")}{" "}
                <span className="text-verde">{t("noiseSmoke.titleAccent")}</span>
              </h2>
              <p className="text-texto-light text-[1.05rem] leading-[1.7] mb-6 max-w-[500px]">
                {t("noiseSmoke.subtitle")}
              </p>

              <h3 className="text-navy font-bold text-[1rem] mb-3 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#69ca90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>
                {t("noiseSmoke.noiseTitle")}
              </h3>
              <ul className="space-y-2 mb-6">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-center gap-3">
                    <CheckIcon color="#69ca90" />
                    <span className="text-texto text-[0.92rem]">{t(`noiseSmoke.nf${n}`)}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-navy font-bold text-[1rem] mb-3 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#69ca90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4c.5-1.5 3.5-2 5 0s4.5 1.5 5 0"/><path d="M5 8c.5-1.5 3.5-2 5 0s4.5 1.5 5 0 4.5 1.5 5 0"/><path d="M3 12c.5-1.5 3.5-2 5 0s4.5 1.5 5 0 4.5 1.5 5 0 4.5 1.5 5 0"/></svg>
                {t("noiseSmoke.smokeTitle")}
              </h3>
              <ul className="space-y-2 mb-8">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-center gap-3">
                    <CheckIcon color="#69ca90" />
                    <span className="text-texto text-[0.92rem]">{t(`noiseSmoke.sf${n}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-8">
                <StatCard value={t("noiseSmoke.stat1Value")} label={t("noiseSmoke.stat1Label")} color="verde" />
                <StatCard value={t("noiseSmoke.stat2Value")} label={t("noiseSmoke.stat2Label")} color="verde" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ProposalNoiseVisual />
            </div>
          </div>
        </section>

        {/* ══════ SERVICE 4: ENERGY EFFICIENCY ══════ */}
        <section className="py-[100px] px-6 bg-gris max-md:py-[70px]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex items-center justify-center max-md:order-2 lg:order-1">
              <ProposalClimaVisual />
            </div>
            <div className="max-md:order-1 lg:order-2">
              <div className="text-azul text-[0.78rem] font-bold uppercase tracking-[2px] mb-4">
                {t("energy.label")}
              </div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-1.5px] text-navy mb-2">
                {t("energy.title")}{" "}
                <span className="text-azul">{t("energy.titleAccent")}</span>
              </h2>
              <p className="text-texto-light text-[1.05rem] leading-[1.7] mb-6 max-w-[500px]">
                {t("energy.subtitle")}
              </p>
              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4].filter((n) => t.has(`energy.f${n}`)).map((n) => (
                  <li key={n} className="flex items-center gap-3">
                    <CheckIcon color="#4141e2" />
                    <span className="text-texto text-[0.95rem]">{t(`energy.f${n}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-8">
                <StatCard value={t("energy.stat1Value")} label={t("energy.stat1Label")} />
                <StatCard value={t("energy.stat2Value")} label={t("energy.stat2Label")} />
                <StatCard value={t("energy.stat3Value")} label={t("energy.stat3Label")} />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ BIG STAT (DARK) ══════ */}
        <section className="py-[100px] px-6 bg-navy max-md:py-[70px]">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="text-white/50 text-[0.85rem] font-medium uppercase tracking-[2px] mb-6">
              {t("bigStat.source")}
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-2px] text-white mb-6">
              {t("bigStat.title")}
            </h2>
            <p className="text-white/70 text-[1.1rem] leading-[1.7] max-w-[600px] mx-auto">
              {t("bigStat.subtitle")}
            </p>
          </div>
        </section>

        {/* ══════ IMPLEMENTATION ROADMAP ══════ */}
        <section className="py-[100px] px-6 bg-gris max-md:py-[70px]">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-14">
              <SectionLabel>{t("roadmap.label")}</SectionLabel>
              <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-3">
                {t("roadmap.title")}
              </h2>
              <p className="text-texto-light text-[1.05rem] max-w-[600px] mx-auto">
                {t("roadmap.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {([1, 2, 3, 4] as const).map((n) => (
                <div key={n} className="text-center bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-azul text-white flex items-center justify-center text-[1.2rem] font-bold mb-4 mx-auto">
                    {String(n).padStart(2, "0")}
                  </div>
                  <h3 className="text-navy font-bold text-[1.05rem] mb-2">
                    {t(`roadmap.step${n}Title`)}
                  </h3>
                  <p className="text-texto-light text-[0.9rem] leading-[1.6]">
                    {t(`roadmap.step${n}Text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ PRICING ══════ */}
        <section className="py-[100px] px-6 bg-white max-md:py-[70px]">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-14">
              <SectionLabel>{t("pricing.label")}</SectionLabel>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-1.5px] text-navy mb-4">
                {t("pricing.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* One-time cost */}
              <div className="bg-navy rounded-2xl p-8 text-white text-center">
                <div className="text-white/50 text-[0.78rem] font-semibold uppercase tracking-[2px] mb-4">
                  {t("pricing.oneTimeLabel")}
                </div>
                <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold tracking-[-2px] mb-1">
                  {t("pricing.oneTimePrice")}
                </div>
                <div className="text-white/50 text-[0.9rem] mb-6">{t("pricing.oneTimeTax")}</div>
                <ul className="text-left space-y-3 max-w-[280px] mx-auto">
                  {[1, 2, 3, 4].map((n) => (
                    <li key={n} className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69ca90" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      <span className="text-white/80 text-[0.9rem]">{t(`pricing.includes${n}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Monthly cost */}
              <div className="bg-gris rounded-2xl p-8 text-center border-2 border-azul/20">
                <div className="text-azul text-[0.78rem] font-semibold uppercase tracking-[2px] mb-4">
                  {t("pricing.monthlyLabel")}
                </div>
                <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold tracking-[-2px] text-navy mb-1">
                  {t("pricing.monthlyPrice")}
                </div>
                <div className="text-texto-light text-[0.9rem] mb-6">{t("pricing.monthlyUnit")}</div>
                <ul className="text-left space-y-3 max-w-[280px] mx-auto">
                  {[1, 2, 3].map((n) => (
                    <li key={n} className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4141e2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      <span className="text-texto text-[0.9rem]">{t(`pricing.monthly${n}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section className="py-[80px] px-6 bg-navy max-md:py-[60px]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-white mb-3">
              {t("cta.title")}
            </h2>
            <p className="text-white/60 text-[1.05rem] mb-8">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
              <a
                href="tel:+34602083738"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="font-semibold">+34 602 083 738</span>
              </a>
              <a
                href="mailto:info@controla.com.es"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="font-semibold">info@controla.com.es</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </AccessGate>
  );
}
