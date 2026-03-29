import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { cities, getCityBySlug, getAllCitySlugs } from "@/lib/cities";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import FAQ from "../../components/FAQ";

const baseUrl = "https://controla.cloud";

export async function generateStaticParams() {
  const params: { locale: string; city: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of getAllCitySlugs()) {
      params.push({ locale, city: slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { locale, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const t = messages.cityEnergy || {};

  if (!city) return { title: "Not Found" };

  const cityName = city.name[locale] || city.name.es;
  const countryName = city.country[locale] || city.country.es;
  const title = (t.metaTitle || "Ahorro energético en hoteles de {city} | Controlá")
    .replace("{city}", cityName);
  const description = (t.metaDescription || "Descubre cuánto puede ahorrar tu hotel en {city} con automatización inteligente de climatización. Hasta {savings} de ahorro energético.")
    .replace("{city}", cityName)
    .replace("{savings}", city.hvacSavingsPercent);

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/energia-hotel/${citySlug}`;
  }
  languages["x-default"] = `${baseUrl}/es/energia-hotel/${citySlug}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/energia-hotel/${citySlug}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/energia-hotel/${citySlug}`,
      siteName: "Controlá",
      type: "website",
    },
  };
}

export default async function CityEnergyPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city: citySlug } = await params;
  setRequestLocale(locale);

  const city = getCityBySlug(citySlug);
  if (!city) return <div>City not found</div>;

  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const t = messages.cityEnergy || {};

  const cityName = city.name[locale] || city.name.es;
  const countryName = city.country[locale] || city.country.es;
  const climateNote = city.climateNote[locale] || city.climateNote.es;

  const r = (s: string, replacements: Record<string, string>) => {
    let result = s;
    for (const [key, val] of Object.entries(replacements)) {
      result = result.replaceAll(`{${key}}`, val);
    }
    return result;
  };

  const vars = {
    city: cityName,
    country: countryName,
    hotelCount: city.hotelCount,
    summerTemp: city.avgTemp.summer,
    winterTemp: city.avgTemp.winter,
    tourismMillions: city.tourismMillions,
    savings: city.hvacSavingsPercent,
    waste: city.estimatedAnnualWaste,
  };

  const otherCities = cities.filter((c) => c.slug !== citySlug).slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="bg-navy text-white pt-[140px] pb-[80px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-4">
            {r(t.heroBadge || "Eficiencia energética en hoteles · {city}", vars)}
          </p>
          <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.08] tracking-[-1.5px] mb-6 max-w-[800px]">
            {r(t.heroTitle || "¿Cuánto pierde tu hotel en {city} por climatización ineficiente?", vars)}
          </h1>
          <p className="text-[1.1rem] text-white/80 leading-[1.7] max-w-[650px] mb-8">
            {r(t.heroSubtitle || "Los hoteles de {city} desperdician hasta {waste} al año en climatización de habitaciones vacías. La automatización inteligente puede reducir ese gasto entre un {savings}.", vars)}
          </p>
          <Link
            href={`/${locale}/#contacto`}
            className="inline-block bg-naranja text-white font-bold py-4 px-11 rounded-xl shadow hover:-translate-y-0.5 transition-transform"
          >
            {t.heroCta || "Agendar una llamada"}
          </Link>
          <p className="text-white/50 text-[0.85rem] mt-3">{t.heroNote || "30 minutos. Sin compromiso."}</p>
        </div>
      </section>

      {/* Climate context */}
      <section className="bg-gris py-[80px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">
            {r(t.contextLabel || "El mercado hotelero en {city}", vars)}
          </p>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold text-navy leading-[1.1] tracking-[-1.5px] mb-8">
            {r(t.contextTitle || "¿Por qué la eficiencia energética es clave en {city}?", vars)}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <p className="text-texto leading-[1.7] text-[1.05rem]">{climateNote}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard value={city.hotelCount} label={t.statHotels || "Hoteles"} />
              <StatCard value={`${city.tourismMillions}M`} label={t.statTourists || "Turistas/año"} />
              <StatCard value={city.avgTemp.summer} label={t.statSummer || "Media verano"} />
              <StatCard value={city.avgTemp.winter} label={t.statWinter || "Media invierno"} />
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="bg-white py-[80px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">
            {t.problemLabel || "El problema"}
          </p>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold text-navy leading-[1.1] tracking-[-1.5px] mb-8 max-w-[700px]">
            {r(t.problemTitle || "Un hotel de 50 habitaciones en {city} puede desperdiciar {waste} al año en climatización", vars)}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <ProblemCard
              icon={<SnowflakeIcon />}
              title={t.problem1Title || "Habitaciones vacías climatizadas"}
              text={t.problem1Text || "El aire acondicionado o la calefacción siguen funcionando horas después de que el huésped se fue. Es el mayor gasto invisible."}
            />
            <ProblemCard
              icon={<ChartIcon />}
              title={t.problem2Title || "Sin datos de ocupación real"}
              text={t.problem2Text || "Sin sensores, el hotel no sabe qué habitaciones están vacías. La climatización funciona igual con 20% o 90% de ocupación."}
            />
            <ProblemCard
              icon={<AlertIcon />}
              title={t.problem3Title || "Equipos sin control remoto"}
              text={t.problem3Text || "Termostatos que los huéspedes ponen a 16°C y nadie puede limitar. Ventanas abiertas con el aire a tope."}
            />
          </div>
        </div>
      </section>

      {/* The solution */}
      <section className="bg-gris py-[80px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">
            {t.solutionLabel || "La solución"}
          </p>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold text-navy leading-[1.1] tracking-[-1.5px] mb-4 max-w-[700px]">
            {r(t.solutionTitle || "Automatización inteligente de climatización para hoteles en {city}", vars)}
          </h2>
          <p className="text-texto text-[1.05rem] leading-[1.7] mb-10 max-w-[650px]">
            {r(t.solutionSubtitle || "Controlá conecta sensores de ocupación con tu sistema de climatización existente. Cuando la habitación está vacía, el sistema actúa solo.", vars)}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title={t.feat1Title || "Apagado automático"}
              text={t.feat1Text || "El aire se apaga cuando la habitación está vacía y se reactiva antes de la llegada del huésped."}
            />
            <FeatureCard
              title={t.feat2Title || "Límite de temperatura"}
              text={t.feat2Text || "Configura un rango de temperatura que los huéspedes no pueden superar. Sin desperdiciar energía."}
            />
            <FeatureCard
              title={t.feat3Title || "Modo eco automático"}
              text={t.feat3Text || "Cuando la habitación lleva vacía más de X minutos, el sistema pasa a modo eco automáticamente."}
            />
            <FeatureCard
              title={t.feat4Title || "Detección de ventanas"}
              text={t.feat4Text || "Si el huésped abre la ventana, el aire se apaga. Sin malgastar energía."}
            />
            <FeatureCard
              title={t.feat5Title || "Compatible con tu sistema actual"}
              text={t.feat5Text || "Funciona con split, VRF, fan-coil y termostatos existentes. No necesitas reemplazar nada."}
            />
            <FeatureCard
              title={t.feat6Title || "Dashboard en tiempo real"}
              text={t.feat6Text || "Visualiza el consumo por habitación, las temperaturas y el ahorro acumulado desde un panel único."}
            />
          </div>
        </div>
      </section>

      {/* Savings highlight */}
      <section className="bg-navy text-white py-[80px] px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-10">
            {r(t.savingsTitle || "El ahorro estimado para un hotel en {city}", vars)}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-[800px] mx-auto">
            <div>
              <p className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold text-verde">{city.hvacSavingsPercent}</p>
              <p className="text-white/70 text-[0.95rem] mt-1">{t.savingsStat1 || "Reducción en consumo de climatización"}</p>
            </div>
            <div>
              <p className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold text-verde">{city.estimatedAnnualWaste}</p>
              <p className="text-white/70 text-[0.95rem] mt-1">{t.savingsStat2 || "Desperdicio anual estimado (50 hab.)"}</p>
            </div>
            <div>
              <p className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold text-verde">{"<6"}</p>
              <p className="text-white/70 text-[0.95rem] mt-1">{t.savingsStat3 || "Meses de retorno de inversión"}</p>
            </div>
          </div>
          <p className="text-white/40 text-[0.8rem] mt-6">
            {t.savingsDisclaimer || "Estimaciones basadas en datos propios de Controlá para hoteles de 50 habitaciones en condiciones similares."}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-[80px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">
            {t.howLabel || "Cómo funciona"}
          </p>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold text-navy leading-[1.1] tracking-[-1.5px] mb-10">
            {t.howTitle || "De tu hotel actual a piloto automático en 3 pasos"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title={t.howStep1Title || "Analizamos tu infraestructura"}
              text={r(t.howStep1Text || "Revisamos qué tecnología tiene tu hotel en {city}: termostatos, climatización centralizada, sensores. Identificamos qué se puede aprovechar.", vars)}
            />
            <StepCard
              number="2"
              title={t.howStep2Title || "Conectamos y configuramos"}
              text={t.howStep2Text || "Integramos todo con tu PMS y nuestra plataforma. Configuramos las automatizaciones adaptadas a tu operativa."}
            />
            <StepCard
              number="3"
              title={t.howStep3Title || "Tu hotel funciona solo"}
              text={t.howStep3Text || "La climatización se regula automáticamente según la ocupación real. Tú lo ves todo desde un panel."}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gris py-[80px] px-6">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">
            {t.faqLabel || "Preguntas frecuentes"}
          </p>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold text-navy leading-[1.1] tracking-[-1.5px] mb-8">
            {r(t.faqTitle || "Preguntas sobre eficiencia energética en hoteles de {city}", vars)}
          </h2>
          <div className="space-y-3">
            <FaqItem
              q={r(t.faq1Q || "¿Cuánto puede ahorrar un hotel en {city} con Controlá?", vars)}
              a={r(t.faq1A || "Dependiendo del tamaño y la infraestructura existente, los hoteles en {city} pueden reducir entre un {savings} el consumo de climatización. Para un hotel de 50 habitaciones, esto puede suponer un ahorro de {waste} al año.", vars)}
            />
            <FaqItem
              q={t.faq2Q || "¿Necesito reemplazar mi sistema de climatización?"}
              a={t.faq2A || "No. Controlá es compatible con los sistemas más comunes: split, VRF, fan-coil y termostatos existentes. Aprovechamos lo que ya tienes."}
            />
            <FaqItem
              q={t.faq3Q || "¿Cuánto tiempo lleva la implementación?"}
              a={t.faq3A || "Entre 1 y 3 semanas, dependiendo del tamaño del hotel y la infraestructura existente. En hoteles que ya tienen dispositivos inteligentes, puede ser en días."}
            />
            <FaqItem
              q={t.faq4Q || "¿Cuánto cuesta?"}
              a={t.faq4A || "El modelo es por suscripción mensual por habitación. Sin grandes inversiones iniciales. Te lo detallamos en la llamada de 30 minutos."}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-[80px] px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            {r(t.ctaTitle || "¿Tienes un hotel en {city}?", vars)}
          </h2>
          <p className="text-white/70 text-[1.05rem] leading-[1.7] mb-8">
            {r(t.ctaSubtitle || "Te mostramos cuánto puedes ahorrar en climatización en 30 minutos. Sin compromiso.", vars)}
          </p>
          <Link
            href={`/${locale}/#contacto`}
            className="inline-block bg-naranja text-white font-bold py-4 px-11 rounded-xl shadow hover:-translate-y-0.5 transition-transform"
          >
            {t.ctaButton || "Agendar una llamada"}
          </Link>
        </div>
      </section>

      {/* Other cities */}
      <section className="bg-gris py-[80px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-extrabold text-navy leading-[1.1] tracking-[-1px] mb-6">
            {t.otherCitiesTitle || "Eficiencia energética en hoteles de otras ciudades"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${locale}/energia-hotel/${c.slug}`}
                className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-navy text-[0.95rem]">{c.name[locale] || c.name.es}</p>
                <p className="text-texto-light text-[0.8rem]">{c.country[locale] || c.country.es}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: r(t.faq1Q || "¿Cuánto puede ahorrar un hotel en {city} con Controlá?", vars),
                acceptedAnswer: {
                  "@type": "Answer",
                  text: r(t.faq1A || "Dependiendo del tamaño y la infraestructura existente, los hoteles en {city} pueden reducir entre un {savings} el consumo de climatización.", vars),
                },
              },
              {
                "@type": "Question",
                name: t.faq2Q || "¿Necesito reemplazar mi sistema de climatización?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: t.faq2A || "No. Controlá es compatible con los sistemas más comunes: split, VRF, fan-coil y termostatos existentes.",
                },
              },
              {
                "@type": "Question",
                name: t.faq3Q || "¿Cuánto tiempo lleva la implementación?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: t.faq3A || "Entre 1 y 3 semanas, dependiendo del tamaño del hotel y la infraestructura existente.",
                },
              },
              {
                "@type": "Question",
                name: t.faq4Q || "¿Cuánto cuesta?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: t.faq4A || "El modelo es por suscripción mensual por habitación. Sin grandes inversiones iniciales.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}

/* ──────── Components ──────── */

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
      <p className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold text-azul">{value}</p>
      <p className="text-texto-light text-[0.85rem] mt-1">{label}</p>
    </div>
  );
}

function ProblemCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-gris rounded-2xl p-6">
      <div className="text-naranja mb-3">{icon}</div>
      <h3 className="font-bold text-navy text-[1.1rem] mb-2">{title}</h3>
      <p className="text-texto text-[0.95rem] leading-[1.6]">{text}</p>
    </div>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="font-bold text-navy text-[1.05rem] mb-2">{title}</h3>
      <p className="text-texto text-[0.95rem] leading-[1.6]">{text}</p>
    </div>
  );
}

function StepCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div>
      <div className="w-10 h-10 rounded-full bg-azul text-white flex items-center justify-center font-bold text-[1rem] mb-4">
        {number}
      </div>
      <h3 className="font-bold text-navy text-[1.1rem] mb-2">{title}</h3>
      <p className="text-texto text-[0.95rem] leading-[1.6]">{text}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-white rounded-xl shadow p-5 cursor-pointer">
      <summary className="font-semibold text-navy text-[1rem] list-none flex justify-between items-center">
        {q}
        <svg
          className="w-5 h-5 text-azul shrink-0 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <p className="text-texto text-[0.95rem] leading-[1.6] mt-3">{a}</p>
    </details>
  );
}

/* ──────── SVG Icons ──────── */

function SnowflakeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
      <polyline points="8,2 12,6 16,2" /><polyline points="8,22 12,18 16,22" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
