# Overview
O projeto "Create" consiste em um portal institucional B2B com foco em altíssima conversão de leads para serviços de automação via WhatsApp (SDR) e de infraestrutura CRM (self-hosted). O site funcionará como vitrine premium ("tech authority") e única porta de qualificação dos prospects para a esteira de atendimento.

# Project Type
WEB

# Success Criteria
- [ ] **Performance (SSG/SSR):** Renderização ultrarrápida via Next.js com mitigação inteligente para suportar mídia rica (Background Video, text-reveals) priorizando Time To Interactive e LCP.
- [ ] **Captura de Leads (Handoff Friccional):** Implementação de um formulário de qualificação modal estrito, provocado pelo CTA "Fale Conosco", retendo 4 dados essenciais (Nome, E-mail, Telefone, "Descrição breve da automação").
- [ ] **Integração WhatsApp CRM:** Submissão do formulário redireciona via SSR ou Link Dinâmico à API `wa.me`, passando todo o dossiê formatado no escopo da primeira mensagem para engatar a automação BDR sem retenção state-backed local.
- [ ] **Diretrizes de UX B2B:** Refletir agressividade construtiva/autoridade técnica seguindo estritamente as restrições anti-template e banimentos de cores (sem tons roxos/violetas).

# Tech Stack
- **Framework Core:** Next.js (App Router, SSG/SSR) garantindo roteamento veloz, estabilidade em Web Vitals e render base robusto.
- **Styling Architecture:** Vanilla CSS / Tailwind CSS v4 para velocidade com manutenibilidade em design system customizado modular.
- **UI & Motion:** Framer Motion fornecendo micro-interações B2B responsivas (transições de background, Hero Entrance) provovendo estética premium.
- **State & Form Validation:** React Hook Form e Zod no Client para validar cada campo estritamente antes de acionar a concatenação da URL do WhatsApp.

# File Structure
```text
/b2b-automation-site
├── public/                 # Vídeos MP4 com tratamento, Fallback images (webp)
├── src/
│   ├── app/                # Estrutura base de App Router
│   │   ├── layout.tsx      # SEO e Meta-tags Master Configuration
│   │   ├── page.tsx        # Single Landing Page Conversion Zone
│   ├── components/
│   │   ├── ui/             # Átomos (Inputs com erro Zod, Base Buttons)
│   │   ├── forms/          # Formulário de Qualificacao Modal
│   │   ├── blocks/         # High Level Components (Hero Video CTA, Features)
│   ├── lib/                # Funções utils (wa.me string builder, validators)
│   └── styles/             # Global Configurations e CSS
└── package.json            # Tooling e Manifest
```

# Task Breakdown

## 1. Scaffold Inicial e Setup
- **Agent:** `@frontend-specialist`
- **Skills:** `app-builder`, `nodejs-best-practices`
- **Dependency:** None
- **INPUT:** `npx create-next-app` com stack selecionada.
- **OUTPUT:** Repositório base com App Router, linter estrito em vigor e layout file limpos.
- **VERIFY:** Build compila sem erros (0 ts errors, `npm run dev` startou okay).

## 2. Main Architecture (Hero com Mídia Rica B2B)
- **Agent:** `@frontend-specialist`
- **Skills:** `frontend-design`, `performance-profiling`
- **Dependency:** Task 1
- **INPUT:** App router estruturado, Assets de vídeo importados.
- **OUTPUT:** Hero Section iterativa B2B, lazy-loading configurado para o arquivo de vídeo do fundo, mantendo a responsividade do `fallback` de carregamento.
- **VERIFY:** Performance Profile aponta que LCP ocorre rapidamente; a fonte carrega de forma assíncrona com fallback block.

## 3. Modal de Qualificação e Lógica de Handoff
- **Agent:** `@frontend-specialist`
- **Skills:** `react-best-practices`
- **Dependency:** Task 2
- **INPUT:** Componente "Form" sem função; Estruturação Tipada (Zod).
- **OUTPUT:** Validador checa (Nome, E-mail, Fone, Automação), engatilha construção da query de URL string (WhatsApp message) e emula roteamento.
- **VERIFY:** Teste manual submetendo payload inválido retorna blocos vermelhos; submit de payload válido gera URL `wa.me` 100% correta no console log antes do replace.

## 4. Otimização e Segurança (Phase X)
- **Agent:** `@orchestrator` / `@frontend-specialist`
- **Skills:** `seo-fundamentals`, `web-design-guidelines`
- **Dependency:** Task 3
- **INPUT:** App pronta.
- **OUTPUT:** Ajustes a11y, metadados formatados.
- **VERIFY:** `verify_all.py` rodou e retornou sucesso total.

# Phase X: Verification Checklist
- [ ] Nenhum código HEX Purple/Violet no setup de classes.
- [ ] No Standard/Clichê Template Layouts (Hero Inovador).
- [ ] **Lint & Typings:** `npm run lint` && `npx tsc --noEmit` Passou.
- [ ] **Lighthouse:** Correções efetuadas para A+ (> 90 em SEO e Performance).
- [ ] As `Skills`/`Scripts` (ex: `ux_audit.py`, `lighthouse_audit.py`) registraram sucesso completo após final.
