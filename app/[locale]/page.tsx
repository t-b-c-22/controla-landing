import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";

/* ──────────────── SVG Icons ──────────────── */
function SnowflakeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /><line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
      <polyline points="8,2 12,6 16,2" /><polyline points="8,22 12,18 16,22" />
      <polyline points="2,8 6,12 2,16" /><polyline points="22,8 18,12 22,16" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
    </svg>
  );
}
function DropletIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">{children}</p>;
}
function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-3 ${className}`}>{children}</h2>;
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PageContent />;
}

function PageContent() {
  const t = useTranslations();
  const locale = useLocale();

  const solutions = [
    { key: "clima" as const, borderClass: "border-l-azul" },
    { key: "ops" as const, borderClass: "border-l-verde" },
    { key: "prevention" as const, borderClass: "border-l-naranja" },
    { key: "access" as const, borderClass: "border-l-navy" },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="pt-[140px] pb-[100px] px-6 bg-gradient-to-b from-white to-gris text-center max-md:pt-[120px] max-md:pb-[70px]">
        <div className="max-w-[820px] mx-auto">
          <div className="inline-block bg-azul-light text-azul text-[0.85rem] font-semibold px-[18px] py-1.5 rounded-full mb-7">
            {t("hero.badge")}
          </div>
          <h1 className="text-[clamp(2.4rem,5vw,3.6rem)] font-[800] leading-[1.12] tracking-[-1.5px] mb-6 text-navy">
            {t("hero.titleStart")}{" "}<span className="text-azul">{t("hero.titleAccent")}</span>
          </h1>
          <p className="text-[clamp(1.05rem,2vw,1.25rem)] text-texto-light max-w-[620px] mx-auto mb-10 leading-[1.7]">
            {t("hero.subtitle")}
          </p>
          <a href="#contacto" className="inline-block bg-naranja text-white text-[1.1rem] font-bold py-4 px-11 rounded-xl no-underline transition-all shadow-[0_4px_16px_rgba(224,94,39,0.25)] hover:bg-naranja-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(224,94,39,0.3)]">
            {t("hero.cta")}
          </a>
          <p className="mt-3.5 text-[0.85rem] text-gris-dark">{t("hero.note")}</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-9 px-6 bg-white border-b border-gris">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-[0.9rem] text-gris-dark font-medium mb-4 uppercase tracking-[0.5px]">{t("proof.text")}</p>
          <div className="flex justify-center flex-wrap gap-2.5">
            {["Barcelona", "Granada", "Asturias", "Bilbao"].map((city) => (
              <span key={city} className="bg-gris text-texto px-5 py-2 rounded-full text-[0.88rem] font-medium">{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="py-[100px] px-6 bg-navy text-white max-md:py-[70px]">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold mb-4 leading-[1.3]">{t("problems.title")}</h2>
          <p className="text-white/60 text-[1.05rem] mb-14 max-w-[600px] mx-auto">{t("problems.subtitle")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: <SnowflakeIcon />, title: t("problems.card1Title"), text: t("problems.card1Text") },
              { icon: <ClockIcon />, title: t("problems.card2Title"), text: t("problems.card2Text") },
              { icon: <DropletIcon />, title: t("problems.card3Title"), text: t("problems.card3Text") },
            ].map((card) => (
              <div key={card.title} className="bg-navy-mid border border-white/6 rounded-2xl p-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 bg-white/6 text-white">{card.icon}</div>
                <h3 className="text-[1.05rem] font-semibold mb-2.5">{card.title}</h3>
                <p className="text-[0.9rem] text-white/50 leading-[1.65]">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="soluciones" className="py-[100px] px-6 bg-white max-md:py-[70px]">
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel>{t("solutions.label")}</SectionLabel>
          <SectionTitle>{t("solutions.title")}</SectionTitle>
          <p className="text-texto-light text-[1.05rem] mb-14 max-w-[600px]">{t("solutions.subtitle")}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {solutions.map((sol) => (
              <div key={sol.key} className={`bg-white border border-gris rounded-2xl p-9 transition-all relative overflow-hidden border-l-4 ${sol.borderClass} hover:border-l-4 hover:border-transparent hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5`}>
                <h3 className="text-[1.2rem] font-bold text-navy mb-2.5">{t(`solutions.${sol.key}.title`)}</h3>
                <p className="text-[0.92rem] text-texto-light leading-[1.65] mb-5">{t(`solutions.${sol.key}.description`)}</p>
                <ul className="list-none p-0 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {(["f1", "f2", "f3", "f4", "f5", "f6"] as const).map((f) => (
                    <li key={f} className="text-[0.84rem] text-texto py-1 pl-[22px] relative before:content-['✓'] before:absolute before:left-0 before:text-verde before:font-bold before:text-[0.85rem]">
                      {t(`solutions.${sol.key}.${f}`)}
                    </li>
                  ))}
                </ul>
                <a href="#" className="inline-block mt-4 text-[0.88rem] text-azul no-underline font-semibold hover:underline">
                  {t("solutions.learnMore")} &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="py-[100px] px-6 bg-gris max-md:py-[70px]">
        <div className="max-w-[1000px] mx-auto text-center">
          <SectionLabel>{t("how.label")}</SectionLabel>
          <SectionTitle className="text-center">{t("how.title")}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left mt-14">
            {([
              { num: "01", title: t("how.step1Title"), text: t("how.step1Text") },
              { num: "02", title: t("how.step2Title"), text: t("how.step2Text") },
              { num: "03", title: t("how.step3Title"), text: t("how.step3Text") },
            ]).map((step) => (
              <div key={step.num}>
                <div className="text-[3.5rem] font-[800] text-azul opacity-15 leading-none mb-3">{step.num}</div>
                <h3 className="text-[1.1rem] font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-[0.9rem] text-texto-light leading-[1.65]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="casos" className="py-[100px] px-6 bg-white max-md:py-[70px]">
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel>{t("cases.label")}</SectionLabel>
          <SectionTitle>{t("cases.title")}</SectionTitle>
          <p className="text-texto-light text-[1.05rem] mb-14 max-w-[600px]">{t("cases.subtitle")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gris rounded-2xl p-9 border border-transparent transition-all hover:border-azul">
              <span className="inline-block text-[0.75rem] font-semibold text-azul bg-azul-light px-2.5 py-1 rounded-md mb-4 uppercase tracking-[0.5px]">{t("cases.tag")}</span>
              <h3 className="text-[1.1rem] font-bold text-navy mb-2">{t("cases.caseTitle")}</h3>
              <p className="text-[0.9rem] text-texto-light leading-[1.6] mb-4">{t("cases.caseText")}</p>
              <div className="flex gap-6 mt-4 pt-4 border-t border-black/6">
                <div>
                  <span className="block text-[1.4rem] font-[800] text-azul">{t("cases.stat1Value")}</span>
                  <span className="block text-[0.78rem] text-gris-dark">{t("cases.stat1Label")}</span>
                </div>
                <div>
                  <span className="block text-[1.4rem] font-[800] text-azul">{t("cases.stat2Value")}</span>
                  <span className="block text-[0.78rem] text-gris-dark">{t("cases.stat2Label")}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center min-h-[200px] border-2 border-dashed border-azul/15 rounded-2xl text-gris-dark text-[0.9rem] font-medium text-center p-6 whitespace-pre-line">
              {t("cases.placeholder1")}
            </div>
            <div className="flex items-center justify-center min-h-[200px] border-2 border-dashed border-azul/15 rounded-2xl text-gris-dark text-[0.9rem] font-medium text-center p-6 whitespace-pre-line">
              {t("cases.placeholder2")}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-[72px] px-6 bg-azul text-white text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold mb-3.5">{t("ctaBanner.title")}</h2>
          <p className="text-[1rem] opacity-85 mb-8">{t("ctaBanner.subtitle")}</p>
          <a href="#contacto" className="inline-block bg-white text-azul font-bold py-4 px-10 rounded-xl no-underline text-[1.05rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
            {t("ctaBanner.cta")}
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-[100px] px-6 bg-gris max-md:py-[70px]">
        <div className="max-w-[760px] mx-auto">
          <div className="text-center">
            <SectionLabel>{t("faq.label")}</SectionLabel>
            <SectionTitle className="text-center mb-12">{t("faq.title")}</SectionTitle>
          </div>
          <FAQ />
        </div>
      </section>

      {/* BLOG */}
      <section id="recursos" className="py-[100px] px-6 bg-white max-md:py-[70px]">
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel>{t("blog.label")}</SectionLabel>
          <SectionTitle>{t("blog.title")}</SectionTitle>
          <p className="text-texto-light text-[1.05rem] mb-14 max-w-[600px]">{t("blog.subtitle")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { n: 1 as const, slug: "cuanto-pierde-hotel-climatizacion" },
              { n: 2 as const, slug: "boton-checkout-operativa" },
              { n: 3 as const, slug: "digitalizar-hotel-sin-empezar-de-cero" },
            ]).map(({ n, slug }) => (
              <a key={n} href={`/${locale}/blog/${slug}`} className="rounded-2xl overflow-hidden border border-gris transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 no-underline">
                <div className="h-[180px] bg-gris flex items-center justify-center text-gris-dark text-[0.85rem] font-medium">{t("blog.soon")}</div>
                <div className="p-6">
                  <div className="text-[0.75rem] font-semibold text-naranja uppercase tracking-[0.5px] mb-2">{t(`blog.tag${n}`)}</div>
                  <h3 className="text-[1.05rem] font-bold text-navy mb-2 leading-[1.4]">{t(`blog.title${n}`)}</h3>
                  <p className="text-[0.88rem] text-texto-light leading-[1.6]">{t(`blog.text${n}`)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section id="nosotros" className="py-[100px] px-6 bg-gris max-md:py-[70px]">
        <div className="max-w-[900px] mx-auto text-center">
          <SectionLabel>{t("founders.label")}</SectionLabel>
          <SectionTitle className="text-center">{t("founders.title")}</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mt-14">
            {[
              { name: "Tomás Kancyper", roleKey: "tomas", linkedin: "https://www.linkedin.com/in/tkancyper/" },
              { name: "Ezequiel Vallejo", roleKey: "ezequiel", linkedin: "https://www.linkedin.com/in/ezequiel-vallejo/" },
            ].map((f) => (
              <div key={f.name} className="bg-white rounded-2xl p-9 border border-transparent">
                <h3 className="text-[1.15rem] font-bold text-navy mb-0.5">{f.name}</h3>
                <div className="text-[0.85rem] text-azul font-semibold mb-3.5">{t(`founders.${f.roleKey}.role`)}</div>
                <p className="text-[0.9rem] text-texto-light leading-[1.65]">{t(`founders.${f.roleKey}.bio`)}</p>
                <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-3.5 text-[0.85rem] text-azul no-underline font-semibold hover:underline">
                  LinkedIn &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="py-[100px] px-6 bg-navy text-white max-md:py-[70px]">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold mb-3">{t("contact.title")}</h2>
          <p className="text-white/60 mb-10 text-[1.05rem]">{t("contact.subtitle")}</p>
          <ContactForm />
        </div>
      </section>

    </main>
  );
}
