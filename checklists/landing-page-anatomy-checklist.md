---
checklist: Landing Page Anatomy
description: Verifica que todas as seções obrigatórias da landing page estão presentes e completas
usage: Usar antes de considerar a landing page "pronta"
---

# Landing Page Anatomy Checklist

Baseado na anatomia comprovada de landing pages de alta conversão.

## Seções (vendas = 11; captura = sem links de nav)

- [ ] **1. Navigation/Header** (omitir links em página de captura / tráfego pago)
  - [ ] Logo presente
  - [ ] Links de navegação (max 5) **ou** só logo + um CTA
  - [ ] CTA no header
  - [ ] Sticky on scroll (desktop)
  - [ ] Hamburger só se houver links

- [ ] **2. Hero Section** (CRITICAL)
  - [ ] Headline magnético (max 10 palavras)
  - [ ] Supporting copy (1-2 frases)
  - [ ] Hero image gerada via nano-banana-pro
  - [ ] Primary CTA button
  - [ ] Acima do fold (visível sem scroll)

- [ ] **3. Social Proof Bar**
  - [ ] Texto de confiança ("Usado por X+ empresas")
  - [ ] Logos de empresas/clientes (4-6)
  - [ ] Logos em grayscale

- [ ] **4. Problem/Agitation**
  - [ ] Subheadline que identifica a dor
  - [ ] Supporting copy que amplifica o problema
  - [ ] Transição natural para a solução

- [ ] **5. Solution/Demo**
  - [ ] Form header com benefício
  - [ ] Supporting copy (o que recebe em troca)
  - [ ] Form com campos mínimos
  - [ ] CTA button do form
  - [ ] GDPR checkbox

- [ ] **6. Testimonials/Social Proof**
  - [ ] Mínimo 1 depoimento (ideal 3)
  - [ ] Foto do depoente
  - [ ] Nome + cargo + empresa
  - [ ] Quote com resultado específico

- [ ] **7. Reinforcing Statement**
  - [ ] Frase de reforço da proposta de valor
  - [ ] Visualmente destacada

- [ ] **8. Benefits** (CRITICAL)
  - [ ] 3 benefícios principais
  - [ ] Cada um com imagem
  - [ ] Título = resultado (não feature)
  - [ ] Descrição concisa

- [ ] **9. Features**
  - [ ] 3-6 features com ícones
  - [ ] Título + descrição curta
  - [ ] Ícones consistentes

- [ ] **10. Final CTA** (CRITICAL)
  - [ ] Repete ou intensifica oferta principal
  - [ ] CTA button proeminente
  - [ ] Texto de urgência/escassez (se genuíno)
  - [ ] Garantia/risk reversal

- [ ] **11. Footer**
  - [ ] Logo
  - [ ] Tagline
  - [ ] Links essenciais
  - [ ] Copyright
  - [ ] Privacy policy link

## Requisitos Transversais

- [ ] **Responsividade**
  - [ ] Funciona em mobile (375px)
  - [ ] Funciona em tablet (768px)
  - [ ] Funciona em desktop (1440px)

- [ ] **Acessibilidade**
  - [ ] Contraste WCAG AA
  - [ ] Alt text em imagens
  - [ ] Navegação por teclado
  - [ ] Skip to content link

- [ ] **Performance**
  - [ ] Lighthouse Performance >= 95 on the Lighthouse this run resolves
  - [ ] LCP / INP / CLS at the current "good" thresholds on https://web.dev/articles/vitals
  - [ ] Snapshot: `references/state-of-the-art.md`

- [ ] **SEO**
  - [ ] Meta title + description
  - [ ] Open Graph tags
  - [ ] Heading hierarchy (h1 → h2 → h3)

- [ ] **Imagens**
  - [ ] TODAS geradas via nano-banana-pro
  - [ ] Otimizadas (WebP)
  - [ ] Lazy loading (exceto hero)
