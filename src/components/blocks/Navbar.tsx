"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ScheduleModal } from "@/components/forms/ScheduleModal";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[40] flex items-center justify-between px-6 py-4 bg-[var(--color-b2b-onyx)]/90 backdrop-blur-md border-b border-[var(--color-b2b-gray)] text-[var(--color-b2b-acid)]">
        <div className="font-black text-2xl md:text-3xl uppercase tracking-tighter">
          CREATE.
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          <a href="#protocol" className="hover:text-[var(--color-b2b-red)] transition-colors">Como funciona</a>
          <a href="#portfolio" className="hover:text-[var(--color-b2b-red)] transition-colors">Resultados</a>
          <a href="#services" className="hover:text-[var(--color-b2b-red)] transition-colors">Planos</a>
          <button onClick={() => setIsModalOpen(true)} className="bg-[var(--color-b2b-red)] text-[var(--color-b2b-acid)] px-5 py-2.5 hover:bg-white hover:text-black transition-all font-bold">
            FALE CONOSCO
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 -m-2" aria-label="Abrir menu" onClick={() => setIsOpen(true)}>
          <Menu className="w-7 h-7" aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile Full-Stack Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-[var(--color-b2b-red)] text-[var(--color-b2b-acid)] flex flex-col justify-center px-8"
          >
            <button className="absolute top-6 right-6" aria-label="Fechar menu" onClick={() => setIsOpen(false)}>
              <X className="w-10 h-10" aria-hidden="true" />
            </button>
            <div className="flex flex-col gap-6 text-5xl font-black uppercase tracking-tighter">
              <motion.a href="#protocol" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="text-left py-2 border-b border-black/20 hover:text-black" onClick={() => setIsOpen(false)}>Como funciona</motion.a>
              <motion.a href="#portfolio" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="text-left py-2 border-b border-black/20 hover:text-black" onClick={() => setIsOpen(false)}>Resultados</motion.a>
              <motion.a href="#services" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="text-left py-2 border-b border-black/20 hover:text-black" onClick={() => setIsOpen(false)}>Planos</motion.a>
              <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="text-left py-2 mt-8 text-[var(--color-b2b-onyx)] hover:text-white" onClick={() => { setIsOpen(false); setIsModalOpen(true); }}>FALE CONOSCO</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
