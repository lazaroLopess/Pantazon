# pantazon Store

Frontend público da Sprint 1, implementado com React, TypeScript e Vite.

## Estado

- Frontend implementado: shell, Homepage (`/`), Catálogo (`/produtos`) e Produto (`/produtos/:sku`).
- Backend planejado.
- Integração real pendente.

## Executar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Validações disponíveis: `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build`.

## Referência visual

A implementação segue a exportação em `docs/design/stitch_pantazon_headless_e_commerce_system`: Home desktop/mobile, catálogo, detalhe de produto e carrinho apenas para o shell compartilhado. Tokens principais vêm do design system Architectural Commerce: Inter, azul `#1D4ED8`, container de 1280 px, grid de 8 px, bordas frias e raios discretos.

Os protótipos não incluem assets locais de produto; por isso, a Store referencia temporariamente as mesmas imagens públicas presentes no HTML exportado pelo Stitch. A pasta do Stitch permanece intacta.

## Dados temporários

Páginas consomem a interface `StoreCatalogService` pelo `StoreServiceProvider`. `LocalStoreCatalogService` fornece respostas tipadas, isoladas e determinísticas. A integração futura deve criar uma implementação HTTP da mesma interface e trocá-la no provider; componentes e páginas não precisam importar fixtures nem conhecer o transporte.

O frete é uma simulação local. O botão de carrinho apenas informa que a funcionalidade virá em sprint posterior e não persiste estado.

## Limitações

- Sem backend, autenticação, checkout ou carrinho persistente.
- As imagens e a fonte Inter dependem de acesso de rede; há fallback tipográfico e superfícies de fundo.
- A validação visual automatizada por navegador/E2E não foi adicionada; a suíte usa Vitest e Testing Library.
