"use client";

import { motion, useReducedMotion } from "framer-motion";

const cases = [
  { company: "Agência Digital", result: "+230%", metric: "Agendamentos por Mês", desc: "Com o funil automatizado, o time comercial passou a focar apenas em leads qualificados. O drop-off na etapa de qualificação caiu de 65% para 22%." },
  { company: "Consultoria B2B", result: "3 seg", metric: "Primeiro Contato", desc: "O tempo de resposta caiu de horas para segundos. Leads recebendo contato imediato, mesmo fora do horário de expediente." },
  { company: "SaaS de Varejo", result: "-65%", metric: "Custo por Lead", desc: "A captação via landing page integrada com qualificação automática reduziu drasticamente o investimento em SDR manual." },
  { company: "Software House", result: "2.1x", metric: "Conversão em Vendas", desc: "Com leads chegando pré-qualificados no pipeline, a taxa de conversão do time comercial mais que dobrou em 3 meses." },
  { company: "Serviços Financeiros", result: "+8.5k", metric: "Leads Qualificados/Mês", desc: "Infraestrutura escalando com volume sem perda de qualidade. Todo lead registrado e acompanhável no CRM." },
  { company: "EdTech B2B", result: "+47%", metric: "Retenção de Clientes", desc: "O acompanhamento automatizado pós-venda reduziu churn e aumentou a taxa de renovação de contratos em menos de um trimestre." }
];

function MetricCard({ result, metric, company, desc, dark = false }: { result: string; metric: string; company: string; desc: string; dark?: boolean }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: shouldReduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group border-4 ${
        dark
          ? "border-[var(--color-b2b-acid)] bg-[var(--color-b2b-onyx)] text-[var(--color-b2b-acid)]"
          : "border-[var(--color-b2b-onyx)] bg-white text-[var(--color-b2b-onyx)]"
      } p-6 md:p-10 transition-colors duration-300`}
    >
      <span className={`block font-mono text-xs tracking-[0.3em] uppercase mb-4 ${dark ? "text-[var(--color-b2b-acid)]/50" : "text-[#888]"}`}>
        {company}
      </span>

      <div className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4 text-[var(--color-b2b-red)]">
        {result}
      </div>

      <span className={`inline-block font-mono text-xs font-bold uppercase tracking-widest px-3 py-1.5 mb-4 ${
        dark
          ? "bg-[var(--color-b2b-acid)] text-[var(--color-b2b-onyx)]"
          : "bg-[var(--color-b2b-onyx)] text-[var(--color-b2b-acid)]"
      }`}>
        {metric}
      </span>

      <p className={`font-medium text-base leading-relaxed ${dark ? "text-[var(--color-b2b-acid)]/70" : "text-[#444]"}`}>
        {desc}
      </p>
    </motion.div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="w-full bg-[var(--color-b2b-acid)] text-[var(--color-b2b-onyx)] py-16 md:py-32 px-6 md:px-16 border-b border-[#ccc]">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-4xl md:text-[6vw] font-black uppercase tracking-tighter leading-none mb-4">
            Resultados<br /><span className="text-[var(--color-b2b-red)]">reais.</span>
          </h2>
          <p className="font-mono text-sm max-w-sm text-[#555]">
            Métricas de clientes que construíram um funil comercial estruturado com a Create.
          </p>
        </div>

        {/* 2x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cases.map((item, i) => (
            <MetricCard key={i} {...item} dark={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
