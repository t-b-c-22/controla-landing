"use client";

import { useState } from "react";

const faqItems = [
  {
    q: "¿Necesito comprar dispositivos nuevos?",
    a: "Depende de lo que ya tengas. Si tu hotel tiene termostatos inteligentes, sistemas de climatización centralizada o cerraduras conectadas, los aprovechamos. Si falta algo, te recomendamos qué comprar o te lo proporcionamos directamente. El objetivo es minimizar la inversión inicial.",
  },
  {
    q: "¿Cuánto tiempo lleva la implementación?",
    a: "Depende del tamaño del hotel y de la infraestructura existente. En hoteles que ya tienen dispositivos inteligentes, la conexión puede hacerse en días. Si hay que instalar hardware nuevo, el proceso puede tardar entre 1 y 3 semanas.",
  },
  {
    q: "¿Qué PMS son compatibles?",
    a: "Trabajamos con los PMS más utilizados en el sector hotelero. Si usás un PMS específico, contactanos y te confirmamos la compatibilidad. La integración con el PMS es lo que permite que las automatizaciones respondan a check-ins, checkouts y cambios de reserva en tiempo real.",
  },
  {
    q: "¿Hay que hacer obras en el hotel?",
    a: "En la mayoría de los casos, no. Los dispositivos que utilizamos son inalámbricos y se instalan sin necesidad de modificar la infraestructura existente. Si el hotel ya tiene sistemas centralizados, la integración es por software.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "El modelo es por suscripción mensual por dispositivo o habitación. No hay grandes inversiones iniciales. El precio exacto depende de qué soluciones necesitás y de la infraestructura existente. Te lo detallamos en la llamada de 15 minutos.",
  },
  {
    q: "¿Qué pasa si algo falla?",
    a: "Tenemos monitoreo continuo de todos los dispositivos conectados. Si un sensor deja de funcionar o pierde conexión, lo detectamos automáticamente y te avisamos. Además, las automatizaciones están diseñadas con fallbacks para que el hotel siga operando normalmente.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {faqItems.map((item, i) => (
        <div key={i} className="border-b border-black/8">
          <button
            className="w-full bg-transparent border-none cursor-pointer flex justify-between items-center py-6 text-left font-semibold text-[1.05rem] text-navy"
            style={{ fontFamily: "inherit" }}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span>{item.q}</span>
            <span
              className={`faq-icon text-2xl text-azul font-light shrink-0 ml-4 ${openIndex === i ? "open" : ""}`}
            >
              +
            </span>
          </button>
          <div className={`faq-answer ${openIndex === i ? "open" : ""}`}>
            <div className="pb-6 text-[0.95rem] text-texto-light leading-[1.7]">
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
