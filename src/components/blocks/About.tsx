"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";

const aboutData = [
  {
    year: "2023",
    label: "O Problema",
    title: "Equipes comerciais perdendo 80% do tempo em tarefas que a IA resolve.",
    description: "Vimos de perto o desperdício: leads esfriando em planilhas, follow-ups esquecidos, dashboards que ninguém abre. O funil existia — mas não funcionava.",
  },
  {
    year: "2024",
    label: "A Fundação",
    title: "Criamos a Create com uma tese: captação + qualificação + análise num único ecossistema.",
    description: "Não outra ferramenta. Uma esteira integral — da landing page ao CRM, do WhatsApp ao relatório. Tudo conectado, tudo operando.",
  },
  {
    year: "2025",
    label: "A Prova",
    title: "Primeiros times operando funis inteiros sem intervenção manual.",
    description: "Landing pages que captam. IA que qualifica. CRM que organiza. Dashboards que mostram o que importa. Sem planilha, sem gargalo, sem perda.",
  },
  {
    year: "2026",
    label: "O Futuro",
    title: "Todo time comercial focado no que importa: fechar negócios.",
    description: "O resto fica conosco. Enquanto a IA capta, filtra e organiza, sua equipe faz o que máquina nenhuma faz — construir relacionamento e fechar.",
  }
];

// The timeline starts AFTER the hero. We track scrollYProgress specifically on the timeline container,
// so it goes 0→1 exactly over the 4 panels, independent of the hero.
function TimelinePanel({ item, index, progress }: { item: typeof aboutData[number]; index: number; progress: any }) {
  const shouldReduce = useReducedMotion();
  const total = aboutData.length;
  const p = 1 / total;
  const entryStart = index * p;
  const entryEnd = entryStart + p * 0.25;
  const exitStart = entryStart + p * 0.75;
  const exitEnd = entryStart + p;

  const opacity = useTransform(
    progress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [entryStart, entryEnd, exitStart, exitEnd],
    shouldReduce ? [0, 0, 0, 0] : [80, 0, 0, -80]
  );

  return (
    <div className="relative w-full min-h-[75vh] md:py-40 flex flex-col items-center justify-center border-b border-[var(--color-b2b-gray)]/20">
      <motion.div
        style={{ opacity: shouldReduce ? 1 : opacity, y: shouldReduce ? 0 : y }}
        className="w-full max-w-4xl px-8 md:px-16 text-center"
      >
        <span className="block font-mono text-xs text-[var(--color-b2b-red)] tracking-[0.3em] uppercase mb-4">
          {item.year} // {item.label}
        </span>
        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[var(--color-b2b-acid)] mb-6 leading-tight">
          {item.title}
        </h3>
        <p className="text-base md:text-xl font-medium text-[var(--color-b2b-acid)]/70 max-w-2xl mx-auto leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

function ProgressDot({ index, progress }: { index: number; progress: any }) {
  const total = aboutData.length;
  const p = 1 / total;
  const start = index * p;
  const mid = start + p * 0.5;
  const fill = useTransform(progress, [start, mid], [0, 1]);
  return (
    <div className="relative w-2.5 h-2.5 border border-[var(--color-b2b-acid)]/30 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[var(--color-b2b-red)]"
        style={{ scaleY: fill }}
      />
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="relative w-full bg-[var(--color-b2b-onyx)]">
      {/* Hero intro */}
      <div className="relative w-full min-h-[80vh] flex items-center justify-center px-8 md:px-16 border-b border-[var(--color-b2b-gray)]/20">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl"
        >
          <span className="block font-mono text-xs tracking-[0.5em] text-[var(--color-b2b-red)] uppercase mb-6">
            Quem Somos
          </span>
          <h2 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.85] font-black uppercase tracking-tighter text-[var(--color-b2b-acid)]">
            Não nascemos para fazer{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: "2px var(--color-b2b-acid)" }}>
              automações
            </span>
            .<br />
            Nascemos para resolver o{" "}
            <span className="text-[var(--color-b2b-red)]">funil</span>.
          </h2>
        </motion.div>
      </div>

      {/* Timeline panels — tracked independently */}
      <div ref={timelineRef} className="relative">
        {/* Progress dots */}
        <motion.div
          animate={{ opacity: isInView ? 1 : 0, pointerEvents: isInView ? "auto" : "none" as const }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 items-center"
        >
          {aboutData.map((_, i) => (
            <ProgressDot key={i} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {aboutData.map((item, index) => (
          <TimelinePanel
            key={index}
            item={item}
            index={index}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
