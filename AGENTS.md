# AGENTS.md — Pantazon E-Commerce

## 1. Propósito

Este arquivo orienta agentes de código, especialmente o Codex, ao trabalhar no repositório público do **Pantazon E-Commerce**.

O Pantazon é um e-commerce headless organizado em monorepo, com:

- backend em ASP.NET Core;
- banco PostgreSQL;
- painel administrativo em React + TypeScript + Vite;
- loja pública em React + TypeScript + Vite;
- Docker Compose para o ambiente local;
- contratos HTTP versionados;
- desenvolvimento por fatias verticais.

O objetivo do agente é preservar a coerência entre produto, frontend, API, banco, testes, documentação e dados demonstrativos.

---

## 2. Ordem de precedência das fontes

Ao encontrar divergências, use esta ordem:

1. código e testes atualmente versionados;
2. contratos OpenAPI e migrations atuais;
3. `AGENTS.md`;
4. documentação mais recente de telas e endpoints;
5. manual público atual;
6. documentos históricos.

Não use decisões históricas incompatíveis com o estado atual.

### Correção obrigatória de stack

A stack vigente dos dois frontends é:

- **Admin:** React + TypeScript + Vite;
- **Store:** React + TypeScript + Vite.

Referências antigas a Vue 3 devem ser tratadas como históricas e não devem orientar novas implementações.

---

## 3. Princípio de implementação

Desenvolva em **fatias verticais**.

Uma tela não deve ser considerada concluída apenas porque renderiza com mocks. Cada fatia deve integrar, conforme o escopo:

- rota do frontend;
- componentes;
- endpoint;
- DTO de entrada;
- DTO de saída;
- validação;
- autorização;
- persistência;
- migration, quando necessária;
- seed;
- loading;
- estado vazio;
- sem resultados;
- erro;
- sucesso;
- teste de integração;
- teste E2E do fluxo principal;
- documentação do contrato.

Evite criar primeiro todo o frontend e deixar a API para depois.

---

## 4. Estrutura de API

Use API versionada:

```text
/api/v1
```

Grupos principais:

```text
/api/v1/store   -> loja pública
/api/v1/admin   -> painel administrativo
/api/v1/auth    -> autenticação e sessão
/api/v1/public  -> recursos públicos limitados, como QR Code
/api/health     -> saúde e prontidão
```

Não criar endpoints fora desse padrão sem justificar e documentar.

---

## 5. Organização esperada do monorepo

A estrutura exata deve ser confirmada no repositório antes de qualquer alteração. A direção esperada é:

```text
pantazon-ecommerce/
├── AGENTS.md
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── docker-compose.yml
├── backend/
│   ├── pantazon.API/
│   ├── pantazon.Application/
│   ├── pantazon.Domain/
│   ├── pantazon.Infrastructure/
│   ├── pantazon.Tests/
│   └── pantazon.sln
├── frontend/
│   ├── admin-react/
│   └── store-react/
└── docs/
```

Não renomeie ou mova diretórios estruturais sem solicitação explícita.

---

## 6. Regras de trabalho do agente

Antes de editar:

1. leia este arquivo integralmente;
2. leia o `README.md`;
3. inspecione a árvore do repositório;
4. confirme branch, HEAD e estado do workspace;
5. identifique documentação ativa;
6. localize padrões já usados;
7. confirme scripts disponíveis;
8. verifique mudanças locais preexistentes;
9. não sobrescreva trabalho não relacionado.

Durante a alteração:

- limite-se ao escopo solicitado;
- preserve comportamento não relacionado;
- prefira mudanças pequenas e revisáveis;
- não faça refatoração ampla incidental;
- não adicione dependências sem necessidade;
- não altere credenciais públicas de desenvolvimento sem solicitação;
- não execute ações destrutivas no banco sem autorização;
- não faça commit ou push salvo quando solicitado;
- não invente sucesso de teste;
- não esconda falhas.

Ao terminar, informe:

- arquivos modificados;
- decisões adotadas;
- testes executados;
- resultados;
- limitações;
- riscos;
- pendências;
- estado final do Git.

---

## 7. Produto, ProductVariant e SKU

### 7.1 Produto

`Product` representa a identidade compartilhada do item:

- nome;
- descrição;
- categoria;
- marca;
- imagens gerais;
- especificações comuns;
- status de publicação;
- metadados públicos.

O produto não é necessariamente a unidade vendável.

### 7.2 Variante

`ProductVariant` representa uma versão vendável concreta do produto.

Exemplos:

- teclado preto com switch marrom;
- teclado branco com switch azul;
- camiseta tamanho M na cor preta;
- notebook com 16 GB de RAM e SSD de 512 GB.

Cada variante pode possuir:

- identificador próprio;
- SKU único;
- atributos;
- preço;
- preço de comparação;
- código de barras;
- peso;
- dimensões;
- imagens específicas;
- disponibilidade;
- status;
- estoque por almoxarifado.

### 7.3 Regra central

Preço, estoque e SKU pertencem à variante, não ao produto base.

Mesmo um produto sem opções visíveis deve possuir uma variante padrão.

```text
Product
└── ProductVariant
    ├── InventoryBalance
    ├── InventoryMovement
    ├── InventoryReservation
    ├── OrderItem
    └── Barcode
```

### 7.4 Regras obrigatórias

- SKU deve ser único;
- variante deve pertencer a um produto;
- atributo de variante deve ter estrutura determinística;
- pedido deve referenciar a variante;
- estoque deve referenciar a variante;
- movimentação deve referenciar a variante;
- etiqueta deve referenciar a variante;
- produto sem variante ativa não pode ser vendido;
- variante inativa não pode ser adicionada ao carrinho;
- preço e disponibilidade públicos devem ser derivados da variante;
- histórico de pedido deve guardar snapshot do nome, SKU, atributos e preço da compra.

### 7.5 Contrato público recomendado

```json
{
  "id": "prod_001",
  "name": "Teclado Mecânico pantazon Pro",
  "description": "...",
  "category": {},
  "images": [],
  "variants": [
    {
      "id": "var_001",
      "sku": "PTZ-KBD-001",
      "attributes": {
        "color": "Preto",
        "switch": "Marrom"
      },
      "price": 349.90,
      "compareAtPrice": 399.90,
      "availableQuantity": 18,
      "available": true
    }
  ],
  "specifications": []
}
```

A loja pública não deve receber saldo físico, reservas, custos ou dados operacionais internos. Deve receber somente disponibilidade pública suficiente para compra.

---

## 8. Regras de domínio essenciais

### Produtos

- produto sem variante ativa não pode ser publicado;
- preço não pode ser negativo;
- `compareAtPrice`, quando informado, deve ser maior ou igual ao preço vigente;
- SKU e código de barras devem respeitar unicidade;
- desativação não apaga histórico;
- exclusão física deve ser evitada quando houver referências.

### Carrinho

- o backend recalcula todos os valores;
- o frontend nunca é fonte confiável de preço, desconto, frete ou total;
- quantidade deve ser positiva;
- variante deve estar ativa e disponível;
- carrinho deve ser revalidado antes do pedido.

### Pedido

- criação deve usar idempotência;
- itens devem guardar snapshot comercial;
- transições devem ser controladas pelo backend;
- não aceitar alteração arbitrária de status;
- pedido pago não volta livremente para pendente;
- cancelamento, envio, entrega e reembolso devem ser comandos explícitos.

### Estoque

Mantenha separados:

- saldo físico;
- saldo reservado;
- saldo disponível.

Relação:

```text
disponível = físico - reservado
```

- saldo disponível não pode ficar negativo;
- toda alteração deve gerar movimentação auditável;
- ajuste manual exige motivo;
- reserva deve apontar para pedido ou carrinho quando aplicável;
- transferência deve ser documento operacional;
- transferência não deve ser simulada pelo frontend como duas movimentações independentes.

### Almoxarifados

- origem e destino de transferência não podem ser iguais;
- almoxarifado inativo não recebe novas operações;
- desativação deve verificar reservas e transferências pendentes;
- conflito operacional deve retornar HTTP 409 com detalhes úteis.

### Cupons

- validade e limites são verificados no backend;
- desconto deve ser recalculado no servidor;
- regras de elegibilidade devem ser determinísticas;
- cupom expirado, esgotado ou inativo não pode ser aplicado.

### QR Code público

Não expor:

- CPF;
- endereço completo;
- dados de pagamento;
- notas internas;
- custos;
- dados de outros pedidos;
- informações administrativas.

---

## 9. Endpoints por módulo

### Infraestrutura e autenticação

```text
GET  /api/health/live
GET  /api/health/ready
GET  /api/v1/config/public
GET  /api/v1/auth/session
POST /api/v1/auth/customer/login
POST /api/v1/auth/customer/register
POST /api/v1/auth/admin/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh
```

### Store — Homepage e catálogo

```text
GET  /api/v1/store/home
GET  /api/v1/store/categories
GET  /api/v1/store/catalog/filters
GET  /api/v1/store/products
GET  /api/v1/store/products/by-sku/{sku}
GET  /api/v1/store/products/{productId}/related
POST /api/v1/store/shipping/quote
```

### Store — Carrinho

```text
GET    /api/v1/store/cart
POST   /api/v1/store/cart/items
PATCH  /api/v1/store/cart/items/{itemId}
DELETE /api/v1/store/cart/items/{itemId}
DELETE /api/v1/store/cart/items
POST   /api/v1/store/cart/coupon
DELETE /api/v1/store/cart/coupon
POST   /api/v1/store/cart/shipping-quote
```

### Store — Conta e checkout

```text
GET   /api/v1/store/account/profile
PATCH /api/v1/store/account/profile
GET   /api/v1/store/account/addresses
POST  /api/v1/store/account/addresses
PATCH /api/v1/store/account/addresses/{addressId}
GET   /api/v1/store/checkout
POST  /api/v1/store/checkout/validate
POST  /api/v1/store/checkout/shipping-options
POST  /api/v1/store/checkout/preview
POST  /api/v1/store/orders
POST  /api/v1/store/orders/{orderId}/payments
```

### Store — Pedidos

```text
GET /api/v1/store/orders/{orderId}/confirmation
GET /api/v1/store/orders/{orderId}
GET /api/v1/store/orders/{orderId}/tracking
GET /api/v1/store/account/orders
```

### Público — QR Code e suporte

```text
GET  /api/v1/public/qr/{qrCodeUuid}
GET  /api/v1/public/qr/{qrCodeUuid}/tracking
POST /api/v1/public/qr/{qrCodeUuid}/support-requests
GET  /api/v1/public/support-requests/{protocol}
```

### Admin — Dashboard

```text
GET /api/v1/admin/dashboard
GET /api/v1/admin/dashboard/summary
GET /api/v1/admin/dashboard/orders-by-status
GET /api/v1/admin/dashboard/revenue
GET /api/v1/admin/dashboard/category-ranking
GET /api/v1/admin/dashboard/low-stock
GET /api/v1/admin/dashboard/recent-orders
```

### Admin — Produtos e variantes

```text
GET    /api/v1/admin/products
GET    /api/v1/admin/products/{productId}
POST   /api/v1/admin/products
PUT    /api/v1/admin/products/{productId}
PATCH  /api/v1/admin/products/{productId}
POST   /api/v1/admin/products/{productId}/activate
POST   /api/v1/admin/products/{productId}/deactivate
POST   /api/v1/admin/products/{productId}/duplicate
POST   /api/v1/admin/products/{productId}/images
DELETE /api/v1/admin/products/{productId}/images/{imageId}
POST   /api/v1/admin/products/{productId}/variants
PATCH  /api/v1/admin/products/{productId}/variants/{variantId}
DELETE /api/v1/admin/products/{productId}/variants/{variantId}
```

### Admin — Categorias

```text
GET   /api/v1/admin/categories
GET   /api/v1/admin/categories/tree
GET   /api/v1/admin/categories/{categoryId}
POST  /api/v1/admin/categories
PUT   /api/v1/admin/categories/{categoryId}
POST  /api/v1/admin/categories/{categoryId}/activate
POST  /api/v1/admin/categories/{categoryId}/deactivate
PATCH /api/v1/admin/categories/reorder
```

### Admin — Cupons

```text
GET  /api/v1/admin/coupons
GET  /api/v1/admin/coupons/{couponId}
POST /api/v1/admin/coupons
PUT  /api/v1/admin/coupons/{couponId}
POST /api/v1/admin/coupons/{couponId}/activate
POST /api/v1/admin/coupons/{couponId}/deactivate
POST /api/v1/admin/coupons/validate
```

### Admin — Pedidos

```text
GET  /api/v1/admin/orders
GET  /api/v1/admin/orders/{orderId}
GET  /api/v1/admin/orders/{orderId}/timeline
POST /api/v1/admin/orders/{orderId}/confirm-payment
POST /api/v1/admin/orders/{orderId}/start-picking
POST /api/v1/admin/orders/{orderId}/ready-to-ship
POST /api/v1/admin/orders/{orderId}/ship
POST /api/v1/admin/orders/{orderId}/deliver
POST /api/v1/admin/orders/{orderId}/cancel
POST /api/v1/admin/orders/{orderId}/refund
POST /api/v1/admin/orders/{orderId}/notes
POST /api/v1/admin/orders/{orderId}/attachments
```

### Admin — Almoxarifados

```text
GET  /api/v1/admin/warehouses
GET  /api/v1/admin/warehouses/{warehouseId}
POST /api/v1/admin/warehouses
PUT  /api/v1/admin/warehouses/{warehouseId}
POST /api/v1/admin/warehouses/{warehouseId}/activate
POST /api/v1/admin/warehouses/{warehouseId}/deactivate
GET  /api/v1/admin/warehouses/{warehouseId}/inventory
GET  /api/v1/admin/warehouses/{warehouseId}/movements
GET  /api/v1/admin/warehouses/{warehouseId}/transfers
GET  /api/v1/admin/warehouses/{warehouseId}/alerts
```

### Admin — Estoque

```text
GET  /api/v1/admin/inventory
GET  /api/v1/admin/inventory/variants/{variantId}
GET  /api/v1/admin/inventory/variants/{variantId}/warehouses
GET  /api/v1/admin/inventory/variants/{variantId}/movements
GET  /api/v1/admin/inventory/variants/{variantId}/reservations
GET  /api/v1/admin/inventory/alerts
GET  /api/v1/admin/inventory/export
GET  /api/v1/admin/inventory/movements
GET  /api/v1/admin/inventory/movements/{movementId}
POST /api/v1/admin/inventory/movements
POST /api/v1/admin/inventory/movements/preview
POST /api/v1/admin/inventory/adjustments
```

### Admin — Transferências

```text
GET  /api/v1/admin/inventory/transfers
GET  /api/v1/admin/inventory/transfers/{transferId}
POST /api/v1/admin/inventory/transfers
POST /api/v1/admin/inventory/transfers/{transferId}/dispatch
POST /api/v1/admin/inventory/transfers/{transferId}/receive
POST /api/v1/admin/inventory/transfers/{transferId}/cancel
```

### Admin — Clientes

```text
GET  /api/v1/admin/customers
GET  /api/v1/admin/customers/{customerId}
GET  /api/v1/admin/customers/{customerId}/overview
PUT  /api/v1/admin/customers/{customerId}
POST /api/v1/admin/customers/{customerId}/block
POST /api/v1/admin/customers/{customerId}/reactivate
GET  /api/v1/admin/customers/{customerId}/orders
GET  /api/v1/admin/customers/{customerId}/addresses
GET  /api/v1/admin/customers/{customerId}/support-requests
GET  /api/v1/admin/customers/{customerId}/activity
GET  /api/v1/admin/customers/{customerId}/notes
POST /api/v1/admin/customers/{customerId}/notes
```

### Admin — Etiquetas

```text
GET  /api/v1/admin/labels/products
POST /api/v1/admin/labels/preview
POST /api/v1/admin/labels/render
POST /api/v1/admin/labels/pdf
GET  /api/v1/admin/labels/templates
POST /api/v1/admin/labels/templates
PUT  /api/v1/admin/labels/templates/{templateId}
```

---

## 10. Autenticação e autorização

- usar cookies seguros `HttpOnly` para sessões web quando essa for a estratégia vigente;
- não armazenar token sensível em `localStorage`;
- aplicar autorização no backend;
- interface pode ocultar ações, mas isso não substitui autorização;
- retornar 401 para ausência de autenticação;
- retornar 403 para falta de permissão;
- retornar 404 quando necessário para evitar enumeração de recursos;
- separar permissões por domínio.

Exemplos:

```text
products.read
products.write
orders.read
orders.update
inventory.read
inventory.adjust
warehouses.manage
customers.read
customers.update
coupons.manage
labels.generate
```

---

## 11. Contratos e erros HTTP

Use contratos consistentes e documentados em OpenAPI.

Padrão recomendado:

```json
{
  "type": "inventory_insufficient",
  "title": "Estoque insuficiente",
  "status": 409,
  "detail": "A variante não possui saldo disponível suficiente.",
  "traceId": "..."
}
```

Códigos esperados:

- `200` consulta ou comando concluído;
- `201` recurso criado;
- `204` operação sem corpo de resposta;
- `400` requisição inválida;
- `401` não autenticado;
- `403` não autorizado;
- `404` recurso não encontrado;
- `409` conflito de domínio;
- `422` validação semântica, se adotada pelo projeto;
- `429` limite excedido;
- `500` erro inesperado.

Não retornar `200` para erro de domínio.

---

## 12. Frontend React + TypeScript + Vite

### Regras

- não espalhar chamadas HTTP diretamente em componentes visuais;
- centralizar cliente HTTP;
- usar tipos derivados do OpenAPI quando possível;
- separar componentes de página, componentes de domínio e componentes visuais;
- manter loading, vazio, erro e sucesso;
- não duplicar regra crítica do backend como fonte de verdade;
- reutilizar design system;
- preservar acessibilidade;
- manter textos em português;
- evitar `any`;
- tratar erros por tipo;
- usar query keys determinísticas se houver biblioteca de cache;
- invalidar cache somente quando necessário.

### Dados

- não manter mocks permanentes em código de produção;
- seeds e fixtures devem usar os mesmos identificadores demonstrativos;
- `PTZ-KBD-001`, Ricardo Lacerda e CD São Paulo devem permanecer coerentes quando usados;
- o frontend não calcula total final de forma autoritativa.

---

## 13. Backend ASP.NET Core

### Regras

- controllers ou endpoints não devem concentrar regras de domínio;
- DTOs não devem expor entidades do EF Core;
- usar operações assíncronas;
- propagar `CancellationToken`;
- validar entrada;
- controlar transações;
- usar índices e restrições no banco;
- aplicar autorização antes da operação;
- não confiar em valores financeiros enviados pelo cliente;
- implementar idempotência no checkout;
- gerar auditoria para ações sensíveis;
- manter OpenAPI atualizado;
- evitar repositórios ou abstrações sem valor concreto.

### Organização preferida

```text
Domain         -> entidades, value objects, regras e eventos
Application    -> casos de uso, comandos, consultas e contratos
Infrastructure -> EF Core, PostgreSQL, arquivos, pagamentos, e-mail
API            -> HTTP, autenticação, autorização e serialização
Tests          -> unidade, integração, contrato e E2E
```

Adapte ao repositório real; não imponha reorganização ampla sem solicitação.

---

## 14. Banco, migrations e seed

- toda mudança de schema exige migration;
- migration publicada não deve ser reescrita;
- seed deve ser idempotente;
- seed usa apenas dados fictícios;
- migrations devem funcionar em banco vazio;
- constraints importantes devem existir no banco;
- não apagar dados reais;
- não executar reset destrutivo sem autorização;
- documentar alterações destrutivas;
- manter unicidade de SKU;
- manter integridade entre produto, variante, estoque e pedido.

---

## 15. Credenciais públicas de desenvolvimento

As credenciais documentadas são intencionalmente públicas e exclusivas do ambiente local.

Exemplo:

```text
Admin:
admin@pantazon.dev
pantazon123

PostgreSQL:
database: pantazon_db
user: pantazon_dev
password: SecretDeveloperPassword2026
```

Regras:

- não remover essas credenciais da documentação sem solicitação;
- não reutilizar em homologação ou produção;
- impedir seed administrativo padrão fora de `Development`;
- não criar recursos externos usando essas senhas;
- qualquer segredo real deve ficar fora do Git;
- `.env.example` não deve conter segredo real.

---

## 16. Testes mínimos

Para cada fatia:

### Backend

- regra de domínio;
- validação;
- autorização;
- integração com PostgreSQL;
- conflito e erro esperado;
- idempotência quando aplicável.

### Frontend

- renderização;
- loading;
- vazio;
- erro;
- sucesso;
- permissão;
- ação principal.

### E2E

Pelo menos um fluxo feliz e um erro crítico.

Exemplos:

```text
buscar produto -> selecionar variante -> adicionar ao carrinho
carrinho -> checkout -> criar pedido
admin -> abrir pedido -> iniciar separação -> enviar
estoque -> buscar PTZ-KBD-001 -> abrir detalhes
estoque -> transferir entre almoxarifados
etiquetas -> selecionar SKU -> gerar PDF
```

Não declarar testes aprovados sem executá-los.

---

## 17. Ordem recomendada de implementação

### Sprint 1 — Catálogo público

- homepage;
- catálogo;
- produto;
- categorias públicas;
- frete simulado.

### Sprint 2 — Carrinho e autenticação

- login;
- cadastro;
- sessão;
- carrinho;
- cupons;
- endereços.

### Sprint 3 — Checkout e pedido

- validação;
- frete;
- preview;
- pedido;
- pagamento;
- confirmação;
- rastreamento.

### Sprint 4 — Produtos administrativos

- listagem;
- cadastro;
- edição;
- imagens;
- variantes;
- SKUs;
- categorias.

### Sprint 5 — Pedidos administrativos

- listagem;
- detalhes;
- timeline;
- ações financeiras;
- ações logísticas.

### Sprint 6 — Estoque

- almoxarifados;
- saldos;
- reservas;
- movimentações;
- transferências;
- alertas.

### Sprint 7 — Clientes, cupons, QR e etiquetas

- cliente 360°;
- campanhas;
- suporte;
- QR Code;
- etiquetas;
- PDF.

---

## 18. Casos de uso acima de CRUD

Prefira casos de uso reais:

```text
adicionar ao carrinho
aplicar cupom
validar checkout
criar pedido
iniciar pagamento
confirmar pagamento
iniciar separação
registrar envio
cancelar pedido
reembolsar pedido
ajustar estoque
reservar estoque
transferir estoque
bloquear cliente
gerar etiquetas
```

Não substitua esses casos por um CRUD genérico que permita estados arbitrários.

---

## 19. Documentação

Atualize no mesmo trabalho, quando aplicável:

- OpenAPI;
- README;
- manual público;
- exemplos de `.env`;
- documentação de endpoints;
- migrations;
- ADRs para decisões relevantes;
- inventário de telas;
- roteiro de execução local.

Não deixar documentação afirmando que uma função está implementada quando ainda é apenas planejada.

Use os estados:

```text
Implementado
Parcial
Em desenvolvimento
Planejado
Fora do escopo
```

---

## 20. Definition of Done

Uma fatia só está concluída quando:

- escopo foi implementado sem alterações incidentais;
- código compila;
- lint passa;
- typecheck passa;
- testes relevantes passam;
- migration foi validada;
- endpoint está documentado;
- autorização está aplicada;
- loading, vazio, erro e sucesso existem;
- dados de seed estão coerentes;
- não há segredo real no Git;
- `git diff --check` passa;
- estado final do workspace é reportado;
- limitações são declaradas.

---

## 21. Restrições

O agente não deve, salvo solicitação explícita:

- trocar React + Vite por outro framework;
- reintroduzir Vue;
- alterar stack de banco;
- remover Docker;
- alterar identidade visual;
- trocar nomes canônicos de rotas;
- fazer redesign amplo;
- criar serviços pagos;
- publicar o sistema;
- fazer commit;
- fazer push;
- apagar migrations;
- resetar volumes;
- apagar dados;
- substituir regras de negócio por mocks;
- expor dados internos na API pública.

---

## 22. Forma esperada de resposta do Codex

Ao final de cada tarefa, responder com:

1. estado inicial;
2. arquivos lidos;
3. alterações realizadas;
4. decisões;
5. testes e comandos executados;
6. resultados;
7. riscos e limitações;
8. arquivos modificados;
9. estado final do Git;
10. confirmação explícita sobre commit e push.

A resposta deve ser factual, verificável e sem afirmar ações que não ocorreram.
