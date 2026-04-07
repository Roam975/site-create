"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const steps = [
  { step: "01", title: "CAPTAÇÃO", desc: "Landing page profissional com formulário integrado. O lead entra diretamente no seu funil." },
  { step: "02", title: "QUALIFICAÇÃO", desc: "IA conversa com o lead via WhatsApp, entende a necessidade e filtra o que é relevante." },
  { step: "03", title: "ENRIQUECIMENTO", desc: "Dados organizados no CRM. Cada interação registrada e acessível em tempo real." },
  { step: "04", title: "DISTRIBUIÇÃO", desc: "Leads qualificados enviados ao vendedor certo, no momento certo, com contexto completo." },
  { step: "05", title: "ANÁLISE", desc: "Dashboard clean com métricas do funil. Você enxerga onde está o gargalo e onde está o ouro." }
];

export function Protocol() {
  const targetRef = useRef(null);

  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], shouldReduce ? ["0%", "0%"] : ["0%", "-75%"]);

  return (
    <section id="protocol" ref={targetRef} className="relative h-[400vh] bg-[var(--color-b2b-acid)] text-[var(--color-b2b-onyx)] border-y-8 border-[var(--color-b2b-onyx)]">
      <div className="sticky top-0 flex flex-col h-screen overflow-hidden">

        {/* Título — bloco separado, topo fixo, nunca sobrepõe os cards */}
        <div className="shrink-0 px-8 md:px-16 pt-10 pb-6">
          <h2 className="text-[14vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none">
            A Esteira.
          </h2>
        </div>

        {/* Trilho (Track) Horizontal — ocupa o espaço restante da viewport */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 md:gap-24 pl-[10vw] md:pl-16 pr-[20vw] items-center">
            {steps.map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-center shrink-0 w-[80vw] md:w-[42vw] lg:w-[32vw] h-[50vh] p-8 md:p-10 border-4 border-[var(--color-b2b-onyx)] bg-white shadow-[12px_12px_0px_0px_var(--color-b2b-onyx)] hover:bg-[var(--color-b2b-onyx)] hover:text-[var(--color-b2b-acid)] transition-all duration-500 hover:-translate-y-3"
              >
                <div className="absolute top-6 right-6 text-[6vw] md:text-[4vw] font-black tracking-tighter opacity-10 group-hover:text-[var(--color-b2b-red)] group-hover:opacity-100 transition-colors duration-500 pointer-events-none">
                  {item.step}
                </div>
                <h3 className="text-2xl md:text-4xl font-black uppercase mt-12 mb-4 leading-[1.1] z-10 w-3/4">
                  {item.title}
                </h3>
                <p className="font-mono text-sm md:text-base border-l-4 border-[var(--color-b2b-red)] pl-4 z-10 opacity-90">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
