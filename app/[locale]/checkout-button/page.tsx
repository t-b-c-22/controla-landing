import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import Link from "next/link";

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
  const meta = messages.checkoutButton?.meta || {};

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/checkout-button`;
  }
  languages["x-default"] = `${baseUrl}/es/checkout-button`;

  return {
    title: meta.title || "Checkout Button | Controlá",
    description: meta.description || "",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/checkout-button`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/checkout-button`,
      siteName: "Controlá",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function CheckoutButtonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PageContent />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">
      {children}
    </p>
  );
}

function PageContent() {
  const t = useTranslations("checkoutButton");
  const locale = useLocale();

  return (
    <main>
      {/* HERO */}
      <section className="pt-[140px] pb-[80px] px-6 bg-gradient-to-b from-white to-gris max-md:pt-[120px] max-md:pb-[60px]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          <div>
            <div className="inline-block bg-azul-light text-azul text-[0.85rem] font-semibold px-[18px] py-1.5 rounded-full mb-7">
              {t("hero.badge")}
            </div>
            <h1 className="text-[clamp(2.6rem,5.5vw,4rem)] font-[800] leading-[1.08] tracking-[-2px] mb-6 text-navy">
              {t("hero.title")}
            </h1>
            <p className="text-[clamp(1.05rem,2vw,1.25rem)] text-texto-light max-w-[540px] mb-10 leading-[1.7]">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#precio"
                className="inline-block bg-naranja text-white text-[1.1rem] font-bold py-4 px-11 rounded-xl no-underline transition-all shadow-[0_4px_16px_rgba(224,94,39,0.25)] hover:bg-naranja-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(224,94,39,0.3)] text-center"
              >
                {t("hero.cta")}
              </a>
              <a
                href="#como-funciona"
                className="inline-block bg-gris text-navy text-[1.1rem] font-bold py-4 px-11 rounded-xl no-underline transition-all hover:bg-gris-dark/20 text-center"
              >
                {t("hero.secondaryCta")}
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src="/productos/checkout-button-hero.png"
              alt="Botón de checkout instalado en puerta de hotel"
              className="w-full max-w-[460px] rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-[100px] px-6 bg-navy text-white max-md:py-[70px]">
        <div className="max-w-[900px] mx-auto">
          <SectionLabel>{t("problem.label")}</SectionLabel>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold mb-10 leading-[1.2]">
            {t("problem.title")}
          </h2>
          <div className="space-y-6">
            {(["text1", "text2", "text3"] as const).map((key) => (
              <div key={key} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-naranja mt-2.5 shrink-0" />
                <p className="text-white/80 text-[1.05rem] leading-[1.7]">
                  {t(`problem.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-[100px] px-6 bg-white max-md:py-[70px]">
        <div className="max-w-[900px] mx-auto">
          <SectionLabel>{t("solution.label")}</SectionLabel>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-6">
            {t("solution.title")}
          </h2>
          <p className="text-texto-light text-[1.1rem] leading-[1.7] mb-4">
            {t("solution.text")}
          </p>
          <p className="text-texto-light text-[1.1rem] leading-[1.7]">
            {t("solution.text2")}
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-[80px] px-6 bg-verde/10 max-md:py-[60px]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {([1, 2, 3] as const).map((n) => (
            <div key={n}>
              <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-[800] text-navy tracking-tight">
                {t(`stats.stat${n}Value`)}
              </p>
              <p className="text-texto-light text-[0.95rem] mt-1">
                {t(`stats.stat${n}Label`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="como-funciona"
        className="py-[100px] px-6 bg-white max-md:py-[70px]"
      >
        <div className="max-w-[1000px] mx-auto">
          <SectionLabel>{t("howItWorks.label")}</SectionLabel>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-14">
            {t("howItWorks.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="relative">
                <div className="w-12 h-12 rounded-full bg-azul text-white flex items-center justify-center text-[1.2rem] font-bold mb-5">
                  {n}
                </div>
                <h3 className="text-navy font-bold text-[1.15rem] mb-3">
                  {t(`howItWorks.step${n}Title`)}
                </h3>
                <p className="text-texto-light text-[0.95rem] leading-[1.7]">
                  {t(`howItWorks.step${n}Text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTIFICATIONS */}
      <section className="py-[100px] px-6 bg-gris max-md:py-[70px]">
        <div className="max-w-[1000px] mx-auto">
          <SectionLabel>{t("notifications.label")}</SectionLabel>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-4">
            {t("notifications.title")}
          </h2>
          <p className="text-texto-light text-[1.05rem] mb-10 max-w-[600px]">
            {t("notifications.text")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-navy font-bold mb-4 text-[0.95rem] uppercase tracking-wide">
                ¿A quién?
              </p>
              <ul className="space-y-3">
                {(["who1", "who2", "who3", "who4"] as const).map((key) => (
                  <li key={key} className="flex items-center gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4141e2"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    <span className="text-texto text-[0.95rem]">
                      {t(`notifications.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-navy font-bold mb-4 text-[0.95rem] uppercase tracking-wide">
                ¿Por dónde?
              </p>
              <ul className="space-y-3">
                {(["channel1", "channel2", "channel3", "channel4"] as const).map(
                  (key) => (
                    <li key={key} className="flex items-center gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4141e2"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      <span className="text-texto text-[0.95rem]">
                        {t(`notifications.${key}`)}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="py-[100px] px-6 bg-white max-md:py-[70px]">
        <div className="max-w-[1000px] mx-auto">
          <SectionLabel>{t("dashboard.label")}</SectionLabel>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-4">
            {t("dashboard.title")}
          </h2>
          <p className="text-texto-light text-[1.05rem] mb-8 max-w-[600px]">
            {t("dashboard.text")}
          </p>
          <ul className="space-y-3 mb-10">
            {(["f1", "f2", "f3", "f4"] as const).map((key) => (
              <li key={key} className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#69ca90"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                <span className="text-texto text-[1rem]">
                  {t(`dashboard.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INSTALLATION */}
      <section className="py-[100px] px-6 bg-gris max-md:py-[70px]">
        <div className="max-w-[900px] mx-auto">
          <SectionLabel>{t("installation.label")}</SectionLabel>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-12">
            {t("installation.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {([1, 2, 3] as const).map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl p-8 shadow-sm text-center"
              >
                <div className="w-10 h-10 rounded-full bg-azul text-white flex items-center justify-center text-[1rem] font-bold mx-auto mb-4">
                  {n}
                </div>
                <p className="text-navy font-semibold text-[1rem]">
                  {t(`installation.step${n}`)}
                </p>
              </div>
            ))}
          </div>
          <p className="text-texto-light text-[0.95rem] leading-[1.7] text-center max-w-[600px] mx-auto">
            {t("installation.note")}
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="precio"
        className="py-[100px] px-6 bg-white max-md:py-[70px]"
      >
        <div className="max-w-[500px] mx-auto text-center">
          <SectionLabel>{t("pricing.label")}</SectionLabel>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-10">
            {t("pricing.title")}
          </h2>
          <div className="bg-gris rounded-2xl p-10 shadow-sm">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-[3.5rem] font-[800] text-navy tracking-tight">
                {t("pricing.price")}
              </span>
              <span className="text-[1.5rem] font-bold text-navy">
                {t("pricing.currency")}
              </span>
            </div>
            <p className="text-gris-dark text-[0.9rem] mb-8">
              {t("pricing.perUnit")}
            </p>
            <ul className="space-y-3 text-left max-w-[280px] mx-auto mb-10">
              {(["includes1", "includes2", "includes3", "includes4"] as const).map(
                (key) => (
                  <li key={key} className="flex items-center gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4141e2"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    <span className="text-texto text-[0.95rem]">
                      {t(`pricing.${key}`)}
                    </span>
                  </li>
                )
              )}
            </ul>
            <a
              href={`/${locale}#contacto`}
              className="block w-full bg-naranja text-white text-[1.1rem] font-bold py-4 rounded-xl no-underline transition-all shadow-[0_4px_16px_rgba(224,94,39,0.25)] hover:bg-naranja-hover hover:-translate-y-0.5 text-center"
            >
              {t("pricing.cta")}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[100px] px-6 bg-gris max-md:py-[70px]">
        <div className="max-w-[760px] mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>{t("faq.label")}</SectionLabel>
            <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3]">
              {t("faq.title")}
            </h2>
          </div>
          <div className="space-y-0">
            {([1, 2, 3, 4, 5, 6, 7] as const).map((n) => (
              <details key={n} className="border-b border-black/8 group">
                <summary className="w-full cursor-pointer flex justify-between items-center py-6 text-left font-semibold text-[1.05rem] text-navy list-none [&::-webkit-details-marker]:hidden">
                  <span>{t(`faq.q${n}`)}</span>
                  <span className="text-2xl text-azul font-light shrink-0 ml-4 group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="pb-6 text-[0.95rem] text-texto-light leading-[1.7]">
                  {t(`faq.a${n}`)}
                </div>
              </details>
            ))}
          </div>
          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: Array.from({ length: 7 }, (_, i) => ({
                  "@type": "Question",
                  name: t(`faq.q${i + 1}`),
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: t(`faq.a${i + 1}`),
                  },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[80px] px-6 bg-azul text-white text-center max-md:py-[60px]">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold mb-6">
            {t("cta.title")}
          </h2>
          <a
            href={`/${locale}#contacto`}
            className="inline-block bg-white text-azul font-bold py-4 px-10 rounded-xl no-underline text-[1.05rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          >
            {t("cta.button")}
          </a>
        </div>
      </section>

      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Botón de Checkout Inteligente",
            description: t("hero.subtitle"),
            brand: { "@type": "Brand", name: "Controlá" },
            offers: {
              "@type": "Offer",
              price: "99",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
            },
            image: `${baseUrl}/productos/checkout-button-hero.png`,
          }),
        }}
      />
    </main>
  );
}
