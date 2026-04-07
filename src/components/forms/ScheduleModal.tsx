"use client";

import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2 } from "lucide-react";

const schema = z.object({
  nome: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter ao menos 10 dígitos").regex(/^\+?[\d\s\-().]+$/, "Formato inválido"),
  empresa: z.string().min(2, "Informe o nome da empresa"),
  descricao: z.string().min(20, "Descreva melhor o que precisa (mín. 20 caracteres)")
});

type FormData = z.infer<typeof schema>;

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  const { register, handleSubmit, setFocus, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    const msg = `*[LEAD B2B — CREATE]*%0A*Nome:* ${data.nome}%0A*Email:* ${data.email}%0A*Telefone:* ${data.telefone}%0A*Empresa:* ${data.empresa}%0A*Contexto:* ${data.descricao}`;
    // Substitua pelo número real do BDR: 5511999999999
    window.open(`https://wa.me/5511999999999?text=${msg}`, "_blank");
    reset();
    onClose();
  };

  const onError = (errs: FieldErrors<FormData>) => {
    const firstKey = Object.keys(errs)[0] as keyof FormData;
    if (firstKey) setFocus(firstKey);
  };

  const inputClass = "w-full bg-[var(--color-b2b-acid)] text-[var(--color-b2b-onyx)] border-b-2 border-[var(--color-b2b-onyx)] px-0 py-3 font-medium text-base placeholder:text-[#999] placeholder:font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-b2b-red)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-b2b-acid)] focus:border-[var(--color-b2b-red)] transition-colors";
  const errorClass = "font-mono text-xs text-[var(--color-b2b-red)] mt-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-[var(--color-b2b-onyx)]/90 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[90] h-full w-full max-w-lg bg-[var(--color-b2b-acid)] text-[var(--color-b2b-onyx)] flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-start p-6 pb-0 md:p-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-b2b-red)]">Fale conosco</span>
                <h2 className="text-4xl font-black uppercase tracking-tighter mt-1">Conte sua<br />necessidade.</h2>
              </div>
              <button onClick={onClose} aria-label="Fechar" className="p-2 hover:text-[var(--color-b2b-red)] transition-colors cursor-pointer">
                <X className="w-8 h-8" aria-hidden="true" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-6 md:gap-8 p-6 md:p-8 flex-1">
              <div>
                <input {...register("nome")} type="text" autoComplete="name" aria-label="Nome completo" placeholder="Nome completo *" className={inputClass} />
                {errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
              </div>
              <div>
                <input {...register("email")} type="email" autoComplete="email" spellCheck={false} aria-label="E-mail corporativo" placeholder="E-mail corporativo *" className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
              <div>
                <input {...register("telefone")} type="tel" inputMode="numeric" autoComplete="tel" aria-label="WhatsApp com DDD" placeholder="WhatsApp (com DDD) *" className={inputClass} />
                {errors.telefone && <p className={errorClass}>{errors.telefone.message}</p>}
              </div>
              <div>
                <input {...register("empresa")} type="text" autoComplete="organization" aria-label="Empresa" placeholder="Empresa *" className={inputClass} />
                {errors.empresa && <p className={errorClass}>{errors.empresa.message}</p>}
              </div>
              <div>
                <textarea
                  {...register("descricao")}
                  placeholder="Descreva brevemente o desafio de captação atual. *"
                  rows={4}
                  aria-label="Descrição do desafio de captação"
                  className={`${inputClass} resize-none`}
                />
                {errors.descricao && <p className={errorClass}>{errors.descricao.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-auto w-full flex items-center justify-center gap-3 bg-[var(--color-b2b-onyx)] text-[var(--color-b2b-acid)] py-5 font-black uppercase text-lg tracking-tighter hover:bg-[var(--color-b2b-red)] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Enviar para WhatsApp <ArrowRight className="w-5 h-5" /></>}
              </button>

              <p className="font-mono text-xs text-[#888] text-center">
                Ao enviar, você será redirecionado para o WhatsApp. Resposta em até 24h úteis.
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
