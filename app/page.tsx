import MobileNav from "./components/MobileNav";
import FAQ from "./components/FAQ";

/* ──────────────── SVG Icons for Problem Cards ──────────────── */
function SnowflakeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
      <polyline points="8,2 12,6 16,2" />
      <polyline points="8,22 12,18 16,22" />
      <polyline points="2,8 6,12 2,16" />
      <polyline points="22,8 18,12 22,16" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
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

/* ──────────────── Reusable Components ──────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">
      {children}
    </p>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-3 ${className}`}>
      {children}
    </h2>
  );
}

/* ──────────────── Solution Card Data ──────────────── */
const solutions = [
  {
    title: "Gestión de climatización",
    color: "azul",
    borderClass: "border-l-azul",
    description: "La climatización se adapta automáticamente a la ocupación real de cada habitación. Sin intervenir manualmente.",
    features: [
      "Apagado automático en habitaciones vacías",
      "Ajuste de temperatura por ocupación",
      "Compatible con termostatos existentes",
      "Soporte para sistemas centralizados",
      "Control de aires y calefacción",
      "Gestión de termos de agua",
    ],
  },
  {
    title: "Operativa de habitaciones",
    color: "verde",
    borderClass: "border-l-verde",
    description: "El hotel sabe en tiempo real qué está pasando en cada habitación y actúa automáticamente.",
    features: [
      "Botón de checkout (3.000+ usos)",
      "Aviso automático a housekeeping",
      "Detección de ocupación en tiempo real",
      "Conexión directa con tu PMS",
      "80% de adopción por huéspedes",
      "Dashboard centralizado",
    ],
  },
  {
    title: "Prevención de incidencias",
    color: "naranja",
    borderClass: "border-l-naranja",
    description: "Detectá problemas antes de que escalen. Menos quejas de huéspedes, menos reparaciones costosas.",
    features: [
      "Sensor de fugas de agua",
      "Alertas de consumo anormal",
      "Detección de humo",
      "Control de ventanas post-checkout",
      "Monitoreo de puertas",
      "Estado de bombillas",
    ],
  },
  {
    title: "Control de acceso",
    color: "navy",
    borderClass: "border-l-navy",
    description: "Códigos de acceso dinámicos que se generan automáticamente para cada huésped. Sin llaves físicas.",
    features: [
      "Códigos vinculados a la reserva",
      "Cerraduras inteligentes",
      "Check-in autónomo 24/7",
      "Powered by RemoteLock",
      "Historial de accesos",
      "Integración con PMS",
    ],
  },
];

/* ──────────────── PAGE ──────────────── */
export default function Home() {
  return (
    <main>
      {/* ═══════════════════ NAV ═══════════════════ */}
      <nav className="fixed top-0 w-full bg-white/96 backdrop-blur-[12px] border-b border-gris z-50 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[68px] relative">
          <a href="#" className="text-2xl font-bold text-azul no-underline tracking-tight">
            Controlá
          </a>
          <MobileNav />
        </div>
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="pt-[140px] pb-[100px] px-6 bg-gradient-to-b from-white to-gris text-center max-md:pt-[120px] max-md:pb-[70px]">
        <div className="max-w-[820px] mx-auto">
          <div className="inline-block bg-azul-light text-azul text-[0.85rem] font-semibold px-[18px] py-1.5 rounded-full mb-7">
            Para hoteles y aparthoteles
          </div>
          <h1 className="text-[clamp(2.4rem,5vw,3.6rem)] font-[800] leading-[1.12] tracking-[-1.5px] mb-6 text-navy">
            Ponemos tu hotel en{" "}
            <span className="text-azul">piloto automático</span>
          </h1>
          <p className="text-[clamp(1.05rem,2vw,1.25rem)] text-texto-light max-w-[620px] mx-auto mb-10 leading-[1.7]">
            Aprovechamos la infraestructura que ya tenés y completamos lo que
            falta para que las operaciones de tus habitaciones se gestionen
            solas.
          </p>
          <a
            href="#contacto"
            className="inline-block bg-naranja text-white text-[1.1rem] font-bold py-4 px-11 rounded-xl no-underline transition-all shadow-[0_4px_16px_rgba(224,94,39,0.25)] hover:bg-naranja-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(224,94,39,0.3)]"
          >
            Agendar una llamada
          </a>
          <p className="mt-3.5 text-[0.85rem] text-gris-dark">
            15 minutos. Sin compromiso.
          </p>
        </div>
      </section>

      {/* ═══════════════════ SOCIAL PROOF BAR ═══════════════════ */}
      <section className="py-9 px-6 bg-white border-b border-gris">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-[0.9rem] text-gris-dark font-medium mb-4 uppercase tracking-[0.5px]">
            Ya funcionando en hoteles y alojamientos de
          </p>
          <div className="flex justify-center flex-wrap gap-2.5">
            {["Barcelona", "Granada", "Asturias", "Bilbao"].map((city) => (
              <span
                key={city}
                className="bg-gris text-texto px-5 py-2 rounded-full text-[0.88rem] font-medium"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROBLEMS ═══════════════════ */}
      <section className="py-[100px] px-6 bg-navy text-white max-md:py-[70px]">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold mb-4 leading-[1.3]">
            Lo que pasa cuando no sabés qué está pasando en tus habitaciones
          </h2>
          <p className="text-white/60 text-[1.05rem] mb-14 max-w-[600px] mx-auto">
            La mayoría de los hoteles se enteran de los problemas cuando ya es
            tarde.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: <SnowflakeIcon />,
                title: "Climatización encendida sin nadie",
                text: "Habitaciones vacías con el aire o la calefacción funcionando durante horas. Dinero que se va por el techo.",
              },
              {
                icon: <ClockIcon />,
                title: "Housekeeping a ciegas",
                text: "El equipo de limpieza no sabe cuándo el huésped se fue. Tocan puertas, esperan, pierden tiempo. O peor: la habitación queda sin limpiar.",
              },
              {
                icon: <DropletIcon />,
                title: "Incidencias que se descubren tarde",
                text: "Fugas de agua, termos que no funcionan, aires averiados. Te enterás cuando el huésped se queja, no cuando el problema empieza.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-navy-mid border border-white/6 rounded-2xl p-8"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 bg-white/6 text-white">
                  {card.icon}
                </div>
                <h3 className="text-[1.05rem] font-semibold mb-2.5">
                  {card.title}
                </h3>
                <p className="text-[0.9rem] text-white/50 leading-[1.65]">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SOLUTIONS ═══════════════════ */}
      <section id="soluciones" className="py-[100px] px-6 bg-white max-md:py-[70px]">
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel>Soluciones</SectionLabel>
          <SectionTitle>Todo lo que necesitás, en un solo lugar</SectionTitle>
          <p className="text-texto-light text-[1.05rem] mb-14 max-w-[600px]">
            Cada solución se integra con los sistemas que ya tenés. Sin empezar
            de cero.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {solutions.map((sol) => (
              <div
                key={sol.title}
                className={`bg-white border border-gris rounded-2xl p-9 transition-all relative overflow-hidden border-l-4 ${sol.borderClass} hover:border-l-4 hover:border-transparent hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5`}
              >
                <h3 className="text-[1.2rem] font-bold text-navy mb-2.5">
                  {sol.title}
                </h3>
                <p className="text-[0.92rem] text-texto-light leading-[1.65] mb-5">
                  {sol.description}
                </p>
                <ul className="list-none p-0 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {sol.features.map((feat) => (
                    <li
                      key={feat}
                      className="text-[0.84rem] text-texto py-1 pl-[22px] relative before:content-['✓'] before:absolute before:left-0 before:text-verde before:font-bold before:text-[0.85rem]"
                    >
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="inline-block mt-4 text-[0.88rem] text-azul no-underline font-semibold hover:underline"
                >
                  Saber más &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section id="como-funciona" className="py-[100px] px-6 bg-gris max-md:py-[70px]">
        <div className="max-w-[1000px] mx-auto text-center">
          <SectionLabel>Cómo funciona</SectionLabel>
          <SectionTitle className="text-center">
            De tu hotel actual a piloto automático en 3 pasos
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left mt-14">
            {[
              {
                num: "01",
                title: "Analizamos tu infraestructura",
                text: "Revisamos qué tecnología tiene tu hotel: termostatos, climatización centralizada, cámaras, cerraduras. Identificamos qué se puede aprovechar y qué hay que completar.",
              },
              {
                num: "02",
                title: "Conectamos y configuramos",
                text: "Integramos todo con tu PMS y nuestra plataforma. Configuramos las automatizaciones adaptadas a la operativa real de tu hotel.",
              },
              {
                num: "03",
                title: "Tu hotel funciona solo",
                text: "Las habitaciones se gestionan automáticamente. La climatización se regula sola, limpieza recibe los avisos, y vos lo ves todo desde un único panel.",
              },
            ].map((step) => (
              <div key={step.num}>
                <div className="text-[3.5rem] font-[800] text-azul opacity-15 leading-none mb-3">
                  {step.num}
                </div>
                <h3 className="text-[1.1rem] font-bold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-[0.9rem] text-texto-light leading-[1.65]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CASES ═══════════════════ */}
      <section id="casos" className="py-[100px] px-6 bg-white max-md:py-[70px]">
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel>Casos de éxito</SectionLabel>
          <SectionTitle>
            Hoteles que ya funcionan en piloto automático
          </SectionTitle>
          <p className="text-texto-light text-[1.05rem] mb-14 max-w-[600px]">
            Cada implementación es diferente. Estos son algunos ejemplos reales.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Real case */}
            <div className="bg-gris rounded-2xl p-9 border border-transparent transition-all hover:border-azul">
              <span className="inline-block text-[0.75rem] font-semibold text-azul bg-azul-light px-2.5 py-1 rounded-md mb-4 uppercase tracking-[0.5px]">
                Climatización + Checkout
              </span>
              <h3 className="text-[1.1rem] font-bold text-navy mb-2">
                Hotel boutique en Granada
              </h3>
              <p className="text-[0.9rem] text-texto-light leading-[1.6] mb-4">
                Automatización de climatización y botón de checkout integrado
                con PMS para gestión de housekeeping.
              </p>
              <div className="flex gap-6 mt-4 pt-4 border-t border-black/6">
                <div>
                  <span className="block text-[1.4rem] font-[800] text-azul">
                    3.000+
                  </span>
                  <span className="block text-[0.78rem] text-gris-dark">
                    Checkouts procesados
                  </span>
                </div>
                <div>
                  <span className="block text-[1.4rem] font-[800] text-azul">
                    80%
                  </span>
                  <span className="block text-[0.78rem] text-gris-dark">
                    Adopción huéspedes
                  </span>
                </div>
              </div>
            </div>

            {/* Placeholder 1 */}
            <div className="flex items-center justify-center min-h-[200px] border-2 border-dashed border-azul/15 rounded-2xl text-gris-dark text-[0.9rem] font-medium text-center p-6">
              Caso de estudio en preparación.
              <br />
              Datos de ahorro energético real disponibles próximamente.
            </div>

            {/* Placeholder 2 */}
            <div className="flex items-center justify-center min-h-[200px] border-2 border-dashed border-azul/15 rounded-2xl text-gris-dark text-[0.9rem] font-medium text-center p-6">
              Caso de estudio en preparación.
              <br />
              Contactanos si querés ser un caso de éxito.
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA BANNER ═══════════════════ */}
      <section className="py-[72px] px-6 bg-azul text-white text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold mb-3.5">
            Menos desperdicio. Menos sorpresas. Menos trabajo manual.
          </h2>
          <p className="text-[1rem] opacity-85 mb-8">
            Cada hotel es diferente. Por eso nos adaptamos a lo que ya tenés y
            construimos desde ahí.
          </p>
          <a
            href="#contacto"
            className="inline-block bg-white text-azul font-bold py-4 px-10 rounded-xl no-underline text-[1.05rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          >
            Quiero verlo en 15 minutos
          </a>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section id="faq" className="py-[100px] px-6 bg-gris max-md:py-[70px]">
        <div className="max-w-[760px] mx-auto">
          <div className="text-center">
            <SectionLabel>Preguntas frecuentes</SectionLabel>
            <SectionTitle className="text-center mb-12">
              Lo que nos preguntan siempre
            </SectionTitle>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ═══════════════════ BLOG / RESOURCES PLACEHOLDER ═══════════════════ */}
      <section id="recursos" className="py-[100px] px-6 bg-white max-md:py-[70px]">
        <div className="max-w-[1100px] mx-auto">
          <SectionLabel>Recursos</SectionLabel>
          <SectionTitle>Artículos e informes</SectionTitle>
          <p className="text-texto-light text-[1.05rem] mb-14 max-w-[600px]">
            Contenido sobre eficiencia operativa, tecnología hotelera y
            automatización.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "Eficiencia energética",
                title:
                  "¿Cuánto pierde tu hotel en climatización de habitaciones vacías?",
                text: "Un análisis del impacto real del desperdicio energético en hoteles de 20 a 100 habitaciones.",
              },
              {
                tag: "Operativa",
                title:
                  "El botón de checkout: cómo un gesto simple cambia la operativa de un hotel",
                text: "Datos reales de adopción y el impacto en la coordinación de housekeeping.",
              },
              {
                tag: "Tecnología",
                title: "Cómo digitalizar tu hotel sin empezar de cero",
                text: "Guía práctica para aprovechar la infraestructura existente y añadir capas de automatización.",
              },
            ].map((article) => (
              <div
                key={article.title}
                className="rounded-2xl overflow-hidden border border-gris transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <div className="h-[180px] bg-gris flex items-center justify-center text-gris-dark text-[0.85rem] font-medium">
                  Próximamente
                </div>
                <div className="p-6">
                  <div className="text-[0.75rem] font-semibold text-naranja uppercase tracking-[0.5px] mb-2">
                    {article.tag}
                  </div>
                  <h3 className="text-[1.05rem] font-bold text-navy mb-2 leading-[1.4]">
                    {article.title}
                  </h3>
                  <p className="text-[0.88rem] text-texto-light leading-[1.6]">
                    {article.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOUNDERS ═══════════════════ */}
      <section id="nosotros" className="py-[100px] px-6 bg-gris max-md:py-[70px]">
        <div className="max-w-[900px] mx-auto text-center">
          <SectionLabel>Equipo</SectionLabel>
          <SectionTitle className="text-center">
            Quiénes están detrás de Controlá
          </SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mt-14">
            {[
              {
                name: "Tomás Kancyper",
                role: "CEO y cofundador",
                bio: "Ingeniero en computación con más de 7 años de experiencia en IoT. Trabajó en Israel, Alemania y España desarrollando soluciones de conectividad y automatización para edificios.",
                linkedin: "https://www.linkedin.com/in/tkancyper/",
              },
              {
                name: "Ezequiel Vallejo",
                role: "Cofundador",
                bio: "Fundador de Lodging Apartments. 20 años gestionando alojamientos turísticos, con más de 150 propiedades bajo su dirección. Conoce los problemas operativos de primera mano.",
                linkedin: "https://www.linkedin.com/in/ezequiel-vallejo/",
              },
            ].map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-2xl p-9 border border-transparent"
              >
                <h3 className="text-[1.15rem] font-bold text-navy mb-0.5">
                  {founder.name}
                </h3>
                <div className="text-[0.85rem] text-azul font-semibold mb-3.5">
                  {founder.role}
                </div>
                <p className="text-[0.9rem] text-texto-light leading-[1.65]">
                  {founder.bio}
                </p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3.5 text-[0.85rem] text-azul no-underline font-semibold hover:underline"
                >
                  LinkedIn &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section id="contacto" className="py-[100px] px-6 bg-navy text-white max-md:py-[70px]">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold mb-3">
            Hablemos de tu hotel
          </h2>
          <p className="text-white/60 mb-10 text-[1.05rem]">
            Contanos un poco sobre tu operativa y te mostramos cómo sería el
            piloto automático en tu caso concreto.
          </p>
          <form action="#" method="POST" className="flex flex-col gap-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-[0.82rem] font-medium text-white/50 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  required
                  className="w-full py-3.5 px-4 bg-navy-mid border border-white/8 rounded-[10px] text-white text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-white/25"
                  style={{ fontFamily: "inherit" }}
                />
              </div>
              <div>
                <label htmlFor="hotel" className="block text-[0.82rem] font-medium text-white/50 mb-1">
                  Hotel
                </label>
                <input
                  type="text"
                  id="hotel"
                  name="hotel"
                  placeholder="Nombre del hotel"
                  className="w-full py-3.5 px-4 bg-navy-mid border border-white/8 rounded-[10px] text-white text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-white/25"
                  style={{ fontFamily: "inherit" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-[0.82rem] font-medium text-white/50 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tu@email.com"
                  required
                  className="w-full py-3.5 px-4 bg-navy-mid border border-white/8 rounded-[10px] text-white text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-white/25"
                  style={{ fontFamily: "inherit" }}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-[0.82rem] font-medium text-white/50 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+34 ..."
                  className="w-full py-3.5 px-4 bg-navy-mid border border-white/8 rounded-[10px] text-white text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-white/25"
                  style={{ fontFamily: "inherit" }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-[0.82rem] font-medium text-white/50 mb-1">
                Mensaje (opcional)
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Contanos brevemente qué te interesa o qué problemas tenés en tu hotel..."
                className="w-full py-3.5 px-4 bg-navy-mid border border-white/8 rounded-[10px] text-white text-[0.95rem] outline-none transition-colors focus:border-azul placeholder:text-white/25 resize-y min-h-[100px]"
                style={{ fontFamily: "inherit" }}
              />
            </div>
            <button
              type="submit"
              className="bg-naranja text-white text-[1.05rem] font-bold py-4 px-10 border-none rounded-xl cursor-pointer transition-all mt-2 hover:bg-naranja-hover hover:-translate-y-px"
              style={{ fontFamily: "inherit" }}
            >
              Agendar llamada
            </button>
            <p className="text-center text-[0.82rem] text-white/40 mt-3">
              Te contactamos en menos de 24 horas.
            </p>
          </form>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="py-10 px-6 bg-navy border-t border-white/4">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center flex-wrap gap-4 max-md:justify-center max-md:text-center">
          <span className="text-[1.1rem] font-bold text-azul">Controlá</span>
          <ul className="flex gap-6 list-none max-md:justify-center">
            {[
              { href: "#soluciones", label: "Soluciones" },
              { href: "#casos", label: "Casos de éxito" },
              { href: "#recursos", label: "Recursos" },
              { href: "#nosotros", label: "Nosotros" },
              { href: "mailto:info@controla.com.es", label: "info@controla.com.es" },
              {
                href: "https://www.linkedin.com/company/controla-iot/",
                label: "LinkedIn",
                external: true,
              },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...("external" in link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-[0.85rem] text-white/50 no-underline transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[0.8rem] text-white/35 w-full text-center mt-6 pt-6 border-t border-white/4">
            &copy; 2026 Controlá. Barcelona, España. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
