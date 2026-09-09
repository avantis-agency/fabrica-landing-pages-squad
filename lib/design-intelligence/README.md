# lib/design-intelligence

Fonte única de inteligência de design para TODOS os squads que produzem interface, landing page,
site, dashboard ou peça visual do Nirvana-OS. Squads **referenciam** estes arquivos; não os copiam.

O problema que esta lib resolve: um agente sem direção converge para a média estatística do treino —
Inter, gradiente roxo, hero centralizado. A Anthropic chama isso de convergência distribucional. O
resultado tem cara reconhecível de IA e não passa em nenhum gate de craft. Esta lib é o antídoto,
com regra binária no lugar de conselho vago.

## Conteúdo

| Arquivo | O quê |
|---|---|
| `ANTI-SLOP.md` | Contrato anti-slop. Proibições binárias + o que fazer no lugar. É gate, não sugestão. |
| `VIBE-ATLAS.md` | 14 estilos visuais nomeados, com sinais, sósia e brief de implementação. |
| `AESTHETIC-FAMILIES.md` | 9 famílias estéticas com referências reais + receitas de remix. |
| `UI-LEXICON.md` | 76 padrões de UI com nome canônico, símbolo de API e papel ARIA. Nomear antes de desenhar. |
| `DESIGN-MD.md` | O formato DESIGN.md (Google Labs, alpha). Spec + template + regras de geração. |
| `REFERENCE-SOURCES.md` | Catálogo de fontes de referência (confirme o que está ativo nesta execução), organizado por finalidade. |
| `CLAUDE-DESIGN.md` | Claude Design, `/design-sync`, tool `DesignSync`, handoff. Quando usar e quando não. |
| `CAPABILITY.yaml` | A capability canônica `frontend.design_language.define_fabrica`. |

O injetor é compartilhado com a lib de busca e fica um nível acima: `../web-capabilities-inject.js`.

## Ordem de leitura para quem vai desenhar

```
1. UI-LEXICON.md        → nomeie os padrões do brief com o nome certo
2. VIBE-ATLAS.md        → escolha UM estilo e nomeie-o
   AESTHETIC-FAMILIES.md → ou uma família / receita de remix
3. REFERENCE-SOURCES.md → colete 3-5 referências reais da fonte certa
4. DESIGN-MD.md         → escreva o DESIGN.md antes da primeira linha de UI
5. ANTI-SLOP.md         → rode o gate antes de entregar
```

O passo 4 não é burocracia. O DESIGN.md é o que o Claude Design importa, o que `/design-sync` move
entre design e código, e o que impede o segundo componente de divergir do primeiro.

## Rollout

```bash
bun ../web-capabilities-inject.js --dry-run      # relatório
bun ../web-capabilities-inject.js                # injeta nos squads de design/frontend
bun ../web-capabilities-inject.js --slug <slug>  # um squad só
bun ../web-capabilities-inject.js --list         # a matriz squad → conjuntos
```

## Companheira

Visibilidade em busca (SEO técnico, AEO, GEO) fica em `lib/seo-geo-aeo/`. As duas se
encontram na mesma página: o DESIGN.md define como ela parece, a lib de busca define se ela existe
para quem procura.
