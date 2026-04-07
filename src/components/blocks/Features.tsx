"use client";

import { motion } from "framer-motion";
import { Cpu, Maximize, Activity, Lock } from "lucide-react";

const features = [
  { icon: Cpu, title: "Funil Integrado", desc: "Landing page, WhatsApp, CRM e dashboard em uma única operação. Sem ferramentas dispersas, sem gaps entre etapas." },
  { icon: Maximize, title: "CRM sob Medida", desc: "Pipeline configurado para o seu processo. Seu time visualiza leads, etapas e conversões em um só lugar." },
  { icon: Activity, title: "Resposta em 4s", desc: "Contato imediato via WhatsApp — incluindo fora do horário comercial. Nenhum lead fica sem resposta." },
  { icon: Lock, title: "Dados Protegidos", desc: "Infraestrutura dedicada com conformidade LGPD. Seus dados não circulam com terceiros." }
];

export function Features() {
  return (
    <section className="w-full bg-[var(--color-b2b-acid)] text-[var(--color-b2b-onyx)] py-16 md:py-32 px-6 md:px-16 border-y border-[#ccc]">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:justify-between mb-10 md:mb-16 gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-left">
              Por que a<br/><span className="text-[var(--color-b2b-red)]">Create.</span>
            </h2>
            <p className="font-mono text-sm max-w-sm text-left md:border-l-2 md:border-[var(--color-b2b-onyx)] md:pl-4 pt-4 md:pt-0">
              Funil completo, dashboard limpo e IA trabalhando no seu processo comercial.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group relative p-6 md:p-8 border-2 border-[var(--color-b2b-onyx)] bg-white hover:bg-[var(--color-b2b-onyx)] hover:text-[var(--color-b2b-acid)] transition-colors duration-300"
            >
              <feat.icon className="w-10 h-10 md:w-12 md:h-12 mb-6 md:mb-8 text-[var(--color-b2b-red)] group-hover:text-[var(--color-b2b-red)] transition-colors" aria-hidden="true" />
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-3 md:mb-4">{feat.title}</h3>
              <p className="font-mono text-sm opacity-80">{feat.desc}</p>
              
              {/* Aggressive B2B Square Accent */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-[var(--color-b2b-red)] scale-0 group-hover:scale-100 transition-transform origin-top-right" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
