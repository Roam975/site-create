"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ClockAlert, DatabaseZap, Frown, PhoneOff, Zap, Bot } from "lucide-react";

const painPoints = [
  { icon: ClockAlert, text: "Demora para responder. O lead perde interesse antes do primeiro contato." },
  { icon: PhoneOff, text: "Time comercial gasto com tarefas manuais em vez de fechar negócios." },
  { icon: Frown, text: "Follow-ups inconsistentes e dados desorganizados no CRM." }
];

const enginePoints = [
  { icon: Zap, text: "Resposta em menos de 4 segundos. O lead recebe atenção antes de ir ao concorrente." },
  { icon: Bot, text: "Qualificação automática. Apenas leads qualificados chegam ao seu time." },
  { icon: DatabaseZap, text: "Dados centralizados. Todo o funil visível no CRM em tempo real." }
];

export function PainEngine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduce = useReducedMotion();

  return (
    <section ref={ref} className="relative w-full overflow-hidden flex flex-col md:flex-row border-y border-[#333]">
      
      {/* Central Brutalist Badge */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[var(--color-b2b-red)] text-[var(--color-b2b-acid)] font-black text-3xl md:text-5xl px-6 py-2 tracking-tighter mix-blend-difference hidden md:block">
        VS
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[var(--color-b2b-red)] text-[var(--color-b2b-acid)] font-black text-xl px-4 py-1 tracking-tighter md:hidden">
        VS
      </div>

      {/* THE PAIN */}
      <motion.div
        initial={{ x: shouldReduce ? 0 : "-100%" }}
        animate={isInView ? { x: 0 } : { x: shouldReduce ? 0 : "-100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 bg-[var(--color-b2b-onyx)] text-[var(--color-b2b-acid)] p-6 py-16 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#333]"
      >
        <h2 className="text-[12vw] md:text-[8vw] leading-none font-black uppercase tracking-tighter mb-4 opacity-10">
          SEM FUNIL.
        </h2>
        <h3 className="text-lg md:text-2xl font-mono uppercase tracking-widest text-[var(--color-b2b-red)] mb-12">
          Processo manual
        </h3>

        <div className="space-y-6 max-w-lg z-10">
          {painPoints.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.3 + (i * 0.15) }}
              className="flex items-start gap-4 p-4 md:p-6 border border-dashed border-[#555] bg-black/20"
            >
              <item.icon className="w-8 h-8 text-[#555] shrink-0" aria-hidden="true" />
              <p className="font-medium text-base md:text-lg text-[#aaa]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* THE ENGINE */}
      <motion.div
        initial={{ x: shouldReduce ? 0 : "100%" }}
        animate={isInView ? { x: 0 } : { x: shouldReduce ? 0 : "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 bg-[var(--color-b2b-acid)] text-[var(--color-b2b-onyx)] p-6 py-16 md:p-24 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white"
      >
        <h2 className="text-[12vw] md:text-[8vw] leading-none font-black uppercase tracking-tighter mb-4 opacity-10 text-[var(--color-b2b-onyx)]">
          COM FUNIL.
        </h2>
        <h3 className="text-lg md:text-2xl font-mono uppercase tracking-widest text-[var(--color-b2b-red)] mb-12">
          Funil automatizado
        </h3>

        <div className="space-y-6 max-w-lg z-10">
          {enginePoints.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.3 + (i * 0.15) }}
              className="flex items-start gap-4 p-4 md:p-6 border-2 border-[var(--color-b2b-onyx)] bg-white shadow-[8px_8px_0px_0px_var(--color-b2b-red)] md:hover:translate-x-1 md:hover:translate-y-1 md:hover:shadow-[4px_4px_0px_0px_var(--color-b2b-red)] transition-all cursor-crosshair"
            >
              <item.icon className="w-8 h-8 text-[var(--color-b2b-onyx)] shrink-0" aria-hidden="true" />
              <p className="font-bold text-base md:text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
