"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  description: z.string().min(10, "Por favor, detalhe sua necessidade"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onError = (errs: FieldErrors<FormData>) => {
    const firstKey = Object.keys(errs)[0] as keyof FormData;
    if (firstKey) setFocus(firstKey);
  };

  const onSubmit = (data: FormData) => {
    // Format message for WhatsApp
    const message = `*Novo Lead B2B - Landing Page*%0A%0A*Nome:* ${data.name}%0A*E-mail:* ${data.email}%0A*Contato:* ${data.phone}%0A%0A*Demanda de Automação:*%0A${data.description}`;
    
    // Replace with actual BDR phone number
    const wameUrl = `https://wa.me/5511999999999?text=${message}`;
    
    // Redirect to wa.me (BDR/SDR loop integration)
    window.open(wameUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        >
          {/* Tunnel Focus - complete blackout with slight opacity */}
          <button
            aria-label="Fechar modal"
            className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-default"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[var(--color-b2b-onyx)] border border-[#333] p-8 md:p-12 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-6 right-6 text-[var(--color-b2b-acid)]/50 hover:text-[var(--color-b2b-acid)] transition-colors"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[var(--color-b2b-acid)]">
                Start the<br/><span className="text-[var(--color-b2b-red)]">Engine.</span>
              </h2>
              <p className="mt-4 text-[var(--color-b2b-acid)]/60 uppercase tracking-widest text-sm border-l-2 border-[var(--color-b2b-red)] pl-4">
                Descreva seu escopo. Nosso SDR B2B entrará no loop de comunicação via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-mono uppercase tracking-widest text-[var(--color-b2b-acid)]/40">Nome</label>
                  <input
                    id="contact-name"
                    {...register("name")}
                    type="text"
                    autoComplete="name"
                    className="w-full bg-transparent border-b border-[#333] py-2 text-[var(--color-b2b-acid)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-b2b-red)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-b2b-onyx)] focus:border-[var(--color-b2b-red)] transition-colors placeholder:text-[#333]"
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-[var(--color-b2b-red)] text-xs">{errors.name.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-mono uppercase tracking-widest text-[var(--color-b2b-acid)]/40">E-mail Corporativo</label>
                  <input
                    id="contact-email"
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    className="w-full bg-transparent border-b border-[#333] py-2 text-[var(--color-b2b-acid)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-b2b-red)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-b2b-onyx)] focus:border-[var(--color-b2b-red)] transition-colors placeholder:text-[#333]"
                    placeholder="john@empresa.com"
                  />
                  {errors.email && <span className="text-[var(--color-b2b-red)] text-xs">{errors.email.message}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-phone" className="text-xs font-mono uppercase tracking-widest text-[var(--color-b2b-acid)]/40">WhatsApp (com DDD)</label>
                <input
                  id="contact-phone"
                  {...register("phone")}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  className="w-full bg-transparent border-b border-[#333] py-2 text-[var(--color-b2b-acid)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-b2b-red)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-b2b-onyx)] focus:border-[var(--color-b2b-red)] transition-colors placeholder:text-[#333]"
                  placeholder="(11) 99999-9999"
                />
                {errors.phone && <span className="text-[var(--color-b2b-red)] text-xs">{errors.phone.message}</span>}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-description" className="text-xs font-mono uppercase tracking-widest text-[var(--color-b2b-acid)]/40">Breve explicação da automação</label>
                <textarea
                  id="contact-description"
                  {...register("description")}
                  rows={3}
                  className="w-full bg-transparent border-b border-[#333] py-2 text-[var(--color-b2b-acid)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-b2b-red)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-b2b-onyx)] focus:border-[var(--color-b2b-red)] transition-colors placeholder:text-[#333] resize-none"
                  placeholder="Precisamos integrar o CRM com o time de vendas…"
                />
                {errors.description && <span className="text-[var(--color-b2b-red)] text-xs">{errors.description.message}</span>}
              </div>

              <button 
                type="submit"
                className="w-full bg-[var(--color-b2b-red)] text-[var(--color-b2b-acid)] py-4 uppercase font-bold tracking-widest hover:bg-[var(--color-b2b-acid)] hover:text-[var(--color-b2b-onyx)] transition-colors duration-300 relative group"
              >
                Engatar Automação
                <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-b2b-onyx)]" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
