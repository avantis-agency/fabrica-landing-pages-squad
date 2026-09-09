# Coding Standards — fabrica-landing-pages

## HTML
- Semântico: usar tags corretas (header, main, section, footer, nav, article)
- Indentação: 2 espaços
- Atributos: aspas duplas
- Imagens: sempre com alt, width, height; lazy em tudo menos o hero (`fetchpriority="high"`)
- Links externos: rel="noopener noreferrer"
- Formulários: labels associados via for/id

## CSS
- Metodologia: BEM-like com prefixo de seção (.section--hero__headline)
- Custom Properties: usar CSS variables do design system
- Mobile-first: @media (min-width) para responsividade
- Organização: um arquivo CSS por seção + globals
- No !important (exceto utilities)
- Prefer modern CSS (grid, container queries, :has())

## JavaScript
- Vanilla JS (sem frameworks desnecessários para landing page)
- ES Modules
- Intersection Observer para scroll animations
- Sem jQuery
- Defer/async em scripts
- Event delegation onde possível

## Imagens
- Formato: WebP com fallback PNG
- Lazy loading: loading="lazy" (exceto hero)
- Responsive: srcset com múltiplos tamanhos
- Alt text: descritivo e contextual

## Performance
- Target: Lighthouse Performance >= 95 on the Lighthouse this run resolves; Core Web Vitals at the current "good" thresholds on https://web.dev/articles/vitals (snapshot in `references/state-of-the-art.md`; never FID)
- Critical CSS inline para above-the-fold
- Font preload com crossorigin
- Minify em produção

## Acessibilidade
- WCAG 2.2 AA (ISO/IEC 40500:2025): contraste 4.5:1, 2.4.11, 2.5.8 (≥ 24 px; CTA 44 px)
- Contraste 4.5:1 (texto normal), 3:1 (texto grande)
- Teclado: toda funcionalidade acessível via teclado
- Screen reader: ARIA landmarks e labels
- Focus: indicadores visíveis
- Movimento: respeitar prefers-reduced-motion
