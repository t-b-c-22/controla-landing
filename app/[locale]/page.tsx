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
    { key: "clima" as const, borderClass: "border-l-azul", href: "#" },
    { key: "ops" as const, borderClass: "border-l-verde", href: `/${locale}/checkout-button` },
    { key: "prevention" as const, borderClass: "border-l-naranja", href: "#" },
    { key: "access" as const, borderClass: "border-l-navy", href: "#" },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="pt-[140px] pb-[100px] px-6 bg-gradient-to-b from-white to-gris max-md:pt-[120px] max-md:pb-[70px]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left column — text + CTA */}
          <div>
            <div className="inline-block bg-azul-light text-azul text-[0.85rem] font-semibold px-[18px] py-1.5 rounded-full mb-7">
              {t("hero.badge")}
            </div>
            <h1 className="text-[clamp(2.6rem,5.5vw,4rem)] font-[800] leading-[1.08] tracking-[-2px] mb-6 text-navy">
              {t("hero.titleStart")}{" "}<span className="text-azul">{t("hero.titleAccent")}</span>
            </h1>
            <p className="text-[clamp(1.05rem,2vw,1.25rem)] text-texto-light max-w-[540px] mb-10 leading-[1.7]">
              {t("hero.subtitle")}
            </p>
            <a href="#contacto" className="inline-block bg-naranja text-white text-[1.1rem] font-bold py-4 px-11 rounded-xl no-underline transition-all shadow-[0_4px_16px_rgba(224,94,39,0.25)] hover:bg-naranja-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(224,94,39,0.3)]">
              {t("hero.cta")}
            </a>
            <p className="mt-3.5 text-[0.85rem] text-gris-dark">{t("hero.note")}</p>
          </div>

          {/* Right column — dashboard mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[540px] rounded-2xl shadow-[0_20px_60px_rgba(19,35,66,0.15)] overflow-hidden border border-black/5 bg-[#f7f8fa]">
              {/* Top bar */}
              <div className="bg-navy px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-[18px] h-[18px] rounded bg-azul flex items-center justify-center">
                    <span className="text-white text-[0.55rem] font-bold">C</span>
                  </div>
                  <span className="text-white/90 text-[0.72rem] font-semibold">Controlá Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-[0.65rem]">Hotel Boutique Granada</span>
                  <div className="w-5 h-5 rounded-full bg-azul/30 flex items-center justify-center">
                    <span className="text-white text-[0.55rem] font-bold">TK</span>
                  </div>
                </div>
              </div>
              {/* Dashboard content */}
              <div className="p-4">
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-2.5 mb-4">
                  {[
                    { value: "12", label: "Ocupadas", color: "text-azul", bg: "bg-azul/8" },
                    { value: "6", label: "Libres", color: "text-verde", bg: "bg-verde/10" },
                    { value: "3", label: "Limpieza", color: "text-naranja", bg: "bg-naranja/8" },
                    { value: "22%", label: "Ahorro", color: "text-verde", bg: "bg-verde/10" },
                  ].map((s) => (
                    <div key={s.label} className={`${s.bg} rounded-xl p-2.5 text-center`}>
                      <p className={`text-[1.1rem] font-[800] ${s.color} leading-none`}>{s.value}</p>
                      <p className="text-[0.6rem] text-texto-light mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                {/* Room grid */}
                <div className="bg-white rounded-xl p-3 shadow-sm mb-3">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-navy text-[0.7rem] font-semibold">Habitaciones</span>
                    <span className="text-texto-light text-[0.6rem]">Tiempo real</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {[
                      { id: "101", s: "o" }, { id: "102", s: "v" }, { id: "103", s: "o" }, { id: "104", s: "c" }, { id: "105", s: "o" }, { id: "106", s: "v" }, { id: "107", s: "o" },
                      { id: "201", s: "v" }, { id: "202", s: "o" }, { id: "203", s: "o" }, { id: "204", s: "v" }, { id: "205", s: "o" }, { id: "206", s: "c" }, { id: "207", s: "v" },
                      { id: "301", s: "o" }, { id: "302", s: "c" }, { id: "303", s: "o" }, { id: "304", s: "v" }, { id: "305", s: "o" }, { id: "306", s: "o" }, { id: "307", s: "v" },
                    ].map((r) => {
                      const bg = r.s === "o" ? "bg-azul/10" : r.s === "v" ? "bg-verde/10" : "bg-naranja/10";
                      const dot = r.s === "o" ? "bg-azul" : r.s === "v" ? "bg-verde" : "bg-naranja";
                      return (
                        <div key={r.id} className={`${bg} rounded-lg p-1.5 text-center`}>
                          <p className="text-[0.6rem] font-bold text-navy leading-none">{r.id}</p>
                          <div className={`w-1.5 h-1.5 rounded-full ${dot} mx-auto mt-1`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Bottom cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Recent activity */}
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <span className="text-navy text-[0.7rem] font-semibold block mb-2">Actividad reciente</span>
                    <div className="space-y-1.5">
                      {[
                        { icon: "🔔", text: "Checkout Hab. 204", time: "Hace 2 min", color: "text-naranja" },
                        { icon: "❄️", text: "Clima OFF Hab. 102", time: "Hace 8 min", color: "text-azul" },
                        { icon: "✅", text: "Limpieza lista 301", time: "Hace 15 min", color: "text-verde" },
                      ].map((a) => (
                        <div key={a.text} className="flex items-center gap-2">
                          <span className="text-[0.6rem]">{a.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[0.6rem] font-medium ${a.color} truncate`}>{a.text}</p>
                          </div>
                          <span className="text-[0.5rem] text-texto-light whitespace-nowrap">{a.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Energy chart mock */}
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <span className="text-navy text-[0.7rem] font-semibold block mb-2">Energía hoy</span>
                    <div className="flex items-end gap-[3px] h-[48px]">
                      {[40, 55, 35, 60, 45, 30, 50, 38, 42, 28, 35, 25].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm bg-azul/20 relative" style={{ height: `${h}%` }}>
                          <div className="absolute bottom-0 left-0 right-0 rounded-sm bg-azul" style={{ height: `${h * 0.65}%` }} />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[0.55rem] text-texto-light">06:00</span>
                      <div className="flex items-center gap-1">
                        <span className="text-verde text-[0.65rem] font-bold">↓ 22%</span>
                        <span className="text-[0.5rem] text-texto-light">vs. ayer</span>
                      </div>
                      <span className="text-[0.55rem] text-texto-light">18:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="py-12 bg-white border-b border-gris overflow-hidden">
        <p className="text-[0.8rem] font-medium text-[#6b7280] uppercase tracking-[2px] mb-8 text-center">{t("proof.text")}</p>
        <div className="logo-marquee">
          <div className="logo-marquee-track">
            {[...Array(2)].map((_, copy) =>
              [
                { src: "/logos_clientes/logocliente_outsite.png", alt: "Outsite" },
                { src: "/logos_clientes/logocliente_lodging.png", alt: "Lodging" },
                { src: "/logos_clientes/logocliente_aspasios.jpg", alt: "Aspasios" },
                { src: "/logos_clientes/logocliente_urbanhosts.png", alt: "Urban Hosts" },
                { src: "/logos_clientes/logocliente_noucentista.png", alt: "Hotel Noucentista" },
                { src: "/logos_clientes/logocliente_canela.png", alt: "Canela Homes" },
                { src: "/logos_clientes/logocliente_apolohomes.png", alt: "Apolo Homes" },
                { src: "/logos_clientes/logocliente_gapri.png", alt: "Gapri" },
              ].map((logo) => (
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
                <a href={sol.href} className="inline-block mt-4 text-[0.88rem] text-azul no-underline font-semibold hover:underline">
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: Array.from({ length: 6 }, (_, i) => ({
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
