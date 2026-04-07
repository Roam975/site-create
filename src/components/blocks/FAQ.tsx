"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Quanto tempo leva para tudo estar funcionando?",
    a: "Do início ao fim, entre 5 e 15 dias úteis — depende do escopo. Antes de começar, alinhamos cada etapa do funil para não haver surpresas no meio do projeto."
  },
  {
    q: "Preciso ter um CRM antes de contratar?",
    a: "Não. Configuramos um CRM personalizado para o seu time do zero. Se já usa alguma ferramenta, avaliamos a integração antes de qualquer mudança."
  },
  {
    q: "Como os leads chegaram ao meu time de vendas?",
    a: "O sistema qualifica via WhatsApp e envia apenas os leads relevantes ao vendedor certo — com todo o histórico da conversa registrado no CRM."
  },
  {
    q: "O atendimento por IA soa artificial?",
    a: "Não. Os fluxos são construídos com a linguagem da sua marca. O lead conversa naturalmente, sem perceber que existe automação por trás."
  },
  {
    q: "E se o volume de leads aumentar?",
    a: "A estrutura é feita para escalar. Picos de demanda não comprometem a velocidade de resposta e cada lead continua sendo registrado normalmente."
  },
  {
    q: "O que acontece depois da entrega?",
    a: "Todo projeto inclui acompanhamento pós-entrega. Você pode escolher manter um plano de suporte contínuo ou manter o sistema rodando sem custo mensal."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[var(--color-b2b-acid)] text-[var(--color-b2b-onyx)] py-32 px-8 md:px-16 border-t border-[#ccc]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-[6vw] font-black uppercase tracking-tighter leading-none mb-4">
            Perguntas<br /><span className="text-[var(--color-b2b-red)]">frequentes.</span>
          </h2>
          <p className="font-mono text-sm text-[#555] max-w-sm">
            Sua pergunta, sem rodeios. Se precisar de mais detalhes, fale com um especialista.
          </p>
        </div>

        <div className="flex flex-col divide-y-2 divide-[var(--color-b2b-onyx)] border-y-2 border-[var(--color-b2b-onyx)]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center gap-8 py-8 text-left group cursor-pointer"
              >
                <span className="font-black text-xl md:text-2xl uppercase tracking-tight group-hover:text-[var(--color-b2b-red)] transition-colors">
                  {faq.q}
                </span>
                <span className="shrink-0 w-10 h-10 border-2 border-current flex items-center justify-center">
                  {openIndex === i
                    ? <Minus className="w-5 h-5" />
                    : <Plus className="w-5 h-5" />
                  }
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 font-medium text-lg md:text-xl border-l-4 border-[var(--color-b2b-red)] pl-6 text-[#333]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
