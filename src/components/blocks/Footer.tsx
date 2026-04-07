"use client";

import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenModal: () => void;
}

export function Footer({ onOpenModal }: FooterProps) {
  return (
    <footer className="w-full bg-[var(--color-b2b-acid)] pt-0 pb-0">
      {/* Rounded top corners - Brutalist Concave Bridge */}
      <div className="w-full bg-[var(--color-b2b-onyx)] text-[var(--color-b2b-acid)] px-6 md:px-16 pt-16 md:pt-24 pb-8 md:pb-12"
        style={{ borderRadius: "24px 24px 0 0" }}
      >
        {/* CTA Luminoso Superior */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-16 md:pb-20 border-b border-[#333]">
            <h2 className="text-4xl md:text-7xl lg:text-[7vw] font-black uppercase tracking-tighter leading-none">
              Pronto para<br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px var(--color-b2b-acid)" }}
              >
                automatizar
              </span>{" "}
              <span className="text-[var(--color-b2b-red)]">suas vendas?</span>
            </h2>
            <div className="flex flex-col gap-4 shrink-0">
              <button
                onClick={onOpenModal}
                className="group flex items-center gap-3 bg-[var(--color-b2b-red)] text-[var(--color-b2b-acid)] px-8 py-5 font-black uppercase tracking-tighter text-xl hover:bg-white hover:text-[var(--color-b2b-onyx)] transition-all cursor-pointer"
              >
                Fale com um especialista
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
              </button>
              <p className="font-mono text-xs text-[#666] text-center">
                Resposta em até 24h úteis.
              </p>
            </div>
          </div>

          {/* Link Map */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 py-12 md:py-16 border-b border-[#333]">
            <div>
              <h3 className="font-black text-2xl uppercase tracking-tighter mb-6">Create.</h3>
              <p className="font-mono text-xs text-[#666] leading-relaxed">
                Automatizamos seu funil de vendas completo — do primeiro contato ao fechamento.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#666] mb-6">Produto</h4>
              <ul className="space-y-3 font-medium text-sm">
                <li><a href="#services" className="hover:text-[var(--color-b2b-red)] transition-colors">Essencial (01)</a></li>
                <li><a href="#services" className="hover:text-[var(--color-b2b-red)] transition-colors">Completo (02)</a></li>
                <li><a href="#services" className="hover:text-[var(--color-b2b-red)] transition-colors">Enterprise (03)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#666] mb-6">Empresa</h4>
              <ul className="space-y-3 font-medium text-sm">
                <li><a href="#philosophy" className="hover:text-[var(--color-b2b-red)] transition-colors">Como pensamos</a></li>
                <li><a href="#protocol" className="hover:text-[var(--color-b2b-red)] transition-colors">Protocolo</a></li>
                <li><a href="#portfolio" className="hover:text-[var(--color-b2b-red)] transition-colors">Cases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#666] mb-6">Contato</h4>
              <ul className="space-y-3 font-mono text-xs">
                <li className="text-[#aaa]">contato@createai.com.br</li>
                <li><button onClick={onOpenModal} className="text-[var(--color-b2b-red)] hover:underline cursor-pointer">Fale pelo WhatsApp →</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
            <p className="font-mono text-xs text-[#555]">
              © 2026 Create — Todos os direitos reservados. LGPD Compliant.
            </p>
            <div className="flex gap-6 font-mono text-xs text-[#555]">
              <button className="hover:text-white transition-colors cursor-pointer">Privacidade</button>
              <button className="hover:text-white transition-colors cursor-pointer">Termos de Uso</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
