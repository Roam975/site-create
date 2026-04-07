"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { ContactModal } from "@/components/forms/ContactModal";

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden bg-[var(--color-b2b-onyx)] text-[var(--color-b2b-acid)] flex flex-col md:flex-row">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-b2b-gray)_0%,_var(--color-b2b-onyx)_100%)]" />
        {/* Placeholder: A real <video> would go here */}
      </div>

      {/* The Main Content */}
      <div className="relative z-10 w-full md:w-[90%] h-full flex flex-col justify-center items-center px-8 md:px-16 pt-20 md:pt-0 md:justify-end md:pb-24 md:items-start border-b md:border-b-0 md:border-r border-[#333]">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl text-left"
        >
          <h1 className="text-[10vw] leading-[0.85] font-black uppercase tracking-tighter mix-blend-difference">
            Do primeiro
            <br />
            <span className="text-[var(--color-b2b-red)]">clique ao fechamento.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduce ? 0 : 1, delay: shouldReduce ? 0 : 0.3 }}
          className="mt-10 flex flex-col md:flex-row items-start gap-6 max-w-2xl w-full text-left"
        >
          <p className="text-base md:text-xl font-medium text-[var(--color-b2b-acid)]/80 uppercase tracking-widest md:border-l-2 md:border-[var(--color-b2b-red)] md:pl-6">
            Automatizamos seu funil de vendas completo — da captação no site ao fechamento via WhatsApp e CRM.
          </p>
          {/* CTA Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative flex items-center justify-center gap-4 bg-[var(--color-b2b-red)] text-[var(--color-b2b-acid)] px-6 py-4 md:px-8 md:py-5 uppercase font-bold tracking-widest hover:bg-[var(--color-b2b-acid)] hover:text-[var(--color-b2b-onyx)] transition-colors duration-300"
          >
            Fale com um especialista
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-b2b-onyx)]" />
          </button>
        </motion.div>
      </div>

      {/* The 10% Right Side - Tension Space */}
      <div className="relative z-10 hidden md:flex w-[10%] h-full flex-col items-center justify-between py-12">
        <motion.div 
          initial={{ scaleY: shouldReduce ? 1 : 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: shouldReduce ? 0 : 1, delay: shouldReduce ? 0 : 0.5 }}
          className="w-px h-32 bg-[var(--color-b2b-red)]/50 origin-top" 
        />
        <div className="rotate-180 uppercase tracking-[0.5em] text-xs font-mono text-[var(--color-b2b-acid)]/40" style={{ writingMode: 'vertical-rl' }}>
          CREATE INC. // 2026
        </div>
        <Terminal className="w-6 h-6 text-[var(--color-b2b-acid)]/30" aria-hidden="true" />
      </div>
    </section>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
