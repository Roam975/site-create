"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    tier: "01",
    name: "Essencial",
    price: "",
    period: "",
    tag: "Para começar",
    highlight: false,
    desc: "Funil de captação com WhatsApp e CRM básico para times que precisam automatizar o primeiro contato.",
    features: [
      "Landing page profissional — site moderno com formulário de captação integrado",
      "Integração WhatsApp — primeiro contato automatizado em até 4 segundos",
      "CRM configurado — pipeline personalizado para o seu processo de vendas",
      "Qualificação automática — filtragem por critérios definidos pelo seu time",
      "Dashboard de resultados — visão clara de leads, conversões e gargalos",
      "30 dias de suporte — acompanhamento pós-entrega para ajustes finos"
    ],
    cta: "Começar Agora"
  },
  {
    tier: "02",
    name: "Completo",
    price: "",
    period: "",
    tag: "Mais procurado",
    highlight: true,
    desc: "O funil inteiro funcionando — IA de qualificação, CRM avançado e acompanhamento completo.",
    features: [
      "Tudo do Essencial, mais:",
      "IA conversacional — qualificação natural no WhatsApp, sem scripts engessados",
      "Agendamento automático — o lead agenda reunião direto no calendário do vendedor",
      "Integrações personalizadas — conexão com suas ferramentas existentes",
      "Relatórios semanais — análise do funil enviada toda semana com insights",
      "Múltiplos canais — operação com mais de um número de WhatsApp simultaneamente",
      "Suporte dedicado — atendimento direto com a equipe técnica, sem tickets"
    ],
    cta: "Quero o Completo"
  },
  {
    tier: "03",
    name: "Enterprise",
    price: "",
    period: "",
    tag: "Sob medida",
    highlight: false,
    desc: "Para empresas com operações complexas, múltiplos times de vendas e integrações sob demanda.",
    features: [
      "Tudo do Completo, mais:",
      "Arquitetura dedicada — servidor isolado, sem compartilhamento de recursos",
      "Multi-canal — WhatsApp, e-mail e SMS em uma única operação integrada",
      "Integrações sob demanda — ERPs, CRMs legados, gateways de pagamento",
      "SLA garantido em contrato — uptime e tempo de resposta com garantia formal",
      "Treinamento da equipe — onboarding completo do seu time comercial",
      "Consultoria contínua — evolução do funil com base em dados reais"
    ],
    cta: "Falar com Especialista"
  }
];

interface ServicesProps {
  onOpenModal: () => void;
}

export function Services({ onOpenModal }: ServicesProps) {
  return (
    <section id="services" className="w-full bg-[var(--color-b2b-onyx)] text-[var(--color-b2b-acid)] py-16 md:py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-4xl md:text-[6vw] font-black uppercase tracking-tighter leading-none mb-4">
            Pacotes de<br /><span className="text-[var(--color-b2b-red)]">Operação.</span>
          </h2>
          <p className="font-mono text-sm text-[#aaa] max-w-md">
            Escolha a densidade de infraestrutura que o seu pipeline exige.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`relative flex flex-col p-6 md:p-10 border-4 ${
                tier.highlight
                  ? "border-[var(--color-b2b-red)] bg-[var(--color-b2b-red)] text-[var(--color-b2b-acid)]"
                  : "border-[#333] bg-[#111]"
              }`}
            >
              {/* Tag */}
              <span className={`absolute -top-4 left-8 font-mono text-xs uppercase tracking-widest px-4 py-1 font-bold ${
                tier.highlight ? "bg-[var(--color-b2b-acid)] text-[var(--color-b2b-red)]" : "bg-[var(--color-b2b-acid)] text-[var(--color-b2b-onyx)]"
              }`}>
                {tier.tag}
              </span>

              <div className="mb-6 pt-4">
                <div className="font-mono text-xs uppercase tracking-widest mb-2 opacity-60">{tier.tier} — {tier.name}</div>
                <div className="text-4xl md:text-5xl font-black tracking-tighter">{tier.price}</div>
                {tier.period && <div className="font-mono text-sm opacity-60">{tier.period}</div>}
              </div>

              <p className={`font-medium mb-6 md:mb-10 text-sm md:text-base border-l-2 pl-4 ${tier.highlight ? "border-[rgba(255,255,255,0.5)]" : "border-[var(--color-b2b-red)]"} opacity-90`}>
                {tier.desc}
              </p>

              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-12 flex-1">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 font-mono text-xs md:text-sm">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlight ? "text-white" : "text-[var(--color-b2b-red)]"}`} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenModal}
                className={`w-full py-4 font-black uppercase tracking-tighter text-lg transition-all cursor-pointer ${
                  tier.highlight
                    ? "bg-[var(--color-b2b-acid)] text-[var(--color-b2b-onyx)] hover:bg-[var(--color-b2b-onyx)] hover:text-[var(--color-b2b-acid)]"
                    : "bg-[var(--color-b2b-red)] text-[var(--color-b2b-acid)] hover:bg-white hover:text-[var(--color-b2b-onyx)]"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
