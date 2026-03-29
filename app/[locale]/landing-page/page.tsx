import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import InterestButton from "./InterestButton";
import ContactForm from "../components/ContactForm";
import { ClimaVisual, CheckoutVisual, NoiseVisual, SecurityVisual, WaterVisual, OccupancyVisual } from "../components/visuals";

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
