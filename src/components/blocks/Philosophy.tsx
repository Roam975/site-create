"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function Philosophy() {
  const container = useRef(null);
  
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  // Parallax calculations
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduce ? "0%" : "-40%"]);
  const yBadge = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduce ? "0%" : "50%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.1, 1, 1, 0.1]);

  return (
    <section id="philosophy" ref={container} className="relative w-full h-[100vh] md:h-[150vh] bg-[var(--color-b2b-onyx)] text-[var(--color-b2b-acid)] overflow-hidden flex items-center justify-center">
      
      {/* Background massive texture overlay mapped to scroll */}
      <motion.div 
        style={{ y: shouldReduce ? 0 : yBadge }}
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_center,_var(--color-b2b-acid)_0%,_transparent_100%)] w-full h-[200vh] -top-[50vh]" 
      />

      <motion.div 
        style={{ y: shouldReduce ? 0 : yText, opacity: shouldReduce ? 1 : opacityTransform }}
        className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center text-center"
      >
        <span className="font-mono text-xs md:text-sm uppercase tracking-[0.5em] md:tracking-[1em] text-[var(--color-b2b-red)] mb-12">
          Como pensamos
        </span>

        <h2 className="text-[12vw] md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter">
          Não é uma automação. <br/> <span className="opacity-50">É o funil inteiro.</span> <br/>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-b2b-acid)' }}>
            Entregando para
          </span>
          <br/>
          você <span className="text-[var(--color-b2b-red)]">operar.</span>
        </h2>
      </motion.div>
      
    </section>
  );
}
