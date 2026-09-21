# Pet Shop Palmira — Guia de Manutenção e Design System

Este documento registra os elementos reutilizáveis já validados na Home
e como toda página nova deve reaproveitá-los, sem recriar nada do zero.
Nenhuma identidade visual foi alterada nesta etapa — este arquivo apenas
**documenta** o que já existe em `style.css` e `components.css`.

## Estrutura de arquivos (padrão fixo do projeto)

```
pet-shop-palmira/
├── index.html
├── produtos.html
├── cachorros-e-gatos.html
├── passaros.html
├── cavalos-e-porquinhos.html
├── porcos-e-galinhas.html
├── servicos.html
├── sobre-nos.html
├── localizacao.html
├── contato.html
├── assets/
│   ├── css/
│   │   ├── style.css        ← NUNCA duplicar: 1 versão só, linkada por todas as páginas
│   │   ├── components.css   ← NUNCA duplicar: 1 versão só, linkada por todas as páginas
│   │   └── products.css     ← 1 versão só; exclusivo das páginas de categoria/produtos
│   ├── js/
│   │   └── main.js          ← NUNCA duplicar: 1 versão só, linkada por todas as páginas
│   └── images/               ← pasta única, sem subpastas
├── sitemap.xml
├── robots.txt
└── README.md
```

Estrutura **plana** (sem subpasta `produtos/`): todas as páginas ficam na
raiz do projeto, então todo caminho de asset é sempre `assets/...`,
sem nunca precisar de `../`. Isso simplifica copiar e colar o
`<header>`/`<footer>` entre páginas sem ajustar caminho.

Toda página nova carrega os mesmos 3 arquivos de CSS (nesta ordem) e o mesmo JS:

```html
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/products.css">
...
<script src="assets/js/main.js"></script>
```

> `products.css` é linkado em **todas** as páginas por simplicidade (evita
> lógica condicional de `<link>` por página), mas só deve receber regras
> específicas das páginas de produto/categoria. Fica vazio até a primeira
> página de categoria ser criada — CSS morto é pior do que um arquivo
> vazio no ar.

## Regra de ouro para evitar duplicação

| Se a regra CSS é... | Ela vai em... |
|---|---|
| Uma cor, fonte, raio de borda, breakpoint | `style.css` (variável em `:root`) — nunca um valor solto |
| Um componente que se repete em 2+ páginas (botão, card, header) | `components.css` |
| Um ajuste exclusivo das páginas de produto/categoria | `products.css`, comentado com o nome da página |

## Componentes padronizados

### Header + navegação
Classes: `.site-header#site-header`, `.hdr-in`, `.logo`, `.main-nav#main-nav`, `.menu-toggle#menu-toggle`.
Copiar o bloco `<header>` inteiro da Home em toda página nova, só ajustando:
- O link ativo da página atual (pode receber uma classe `.active` se quisermos destacar futuramente).
- Nos itens de menu que hoje apontam para âncoras da Home (`#produtos`, `#servicos`, `#sobre`, `#localizacao`, `#contato`), trocar para o arquivo de página correspondente (`produtos.html`, `servicos.html` etc.) assim que cada página existir.

### Footer
Classes: `.site-footer`, `.footer-grid`, `.footer-col`, `.footer-bottom`.
Copiar o `<footer>` inteiro da Home sem alterações de estrutura — só o link "ativo" muda, se aplicável.

### Botões
- `.btn.btn-whatsapp` (+ modificadores `.sm` / `.lg`) → botão principal de conversão, sempre com o SVG do ícone e o link `wa.me` com a mensagem padrão.
- `.btn.btn-outline` → botão secundário sobre fundos escuros (hero, CTA final).
- `.btn.btn-tel` → botão neutro sobre fundo claro (ex.: telefone, "ver no mapa").
Regra: qualquer novo botão de ação deve reaproveitar uma dessas três classes — não criar um 4º estilo de botão sem necessidade real.

### Botão WhatsApp flutuante
`.float-whatsapp` — presente em todas as páginas, sempre com o mesmo número e mesma mensagem padrão. Copiar o bloco inteiro sem alterações.

### Containers e seções
- `.section` + `.section-in` (max-width central) → envelope padrão de toda seção de conteúdo.
- `.section-head` + `.section-eyebrow` + `h2` + `.section-sub` → cabeçalho padrão de seção (selo pequeno, título, subtítulo).
- `.bg-white` / `.bg-alt` → alternância de fundo entre seções (zebra), já usada na Home — manter essa alternância nas páginas novas para dar ritmo visual.

### Cards
- `.category-card` → cartão de categoria (usado na Home e deve ser reaproveitado em `produtos.html` e, com os mesmos elementos — imagem, nome, descrição curta, botão —, para os produtos individuais dentro de cada página de categoria).
- `.service-card` → cartão de serviço (Home e `servicos.html`).
- `.contact-card` / `.location-card` → cartões de informação em `contato.html` e `localizacao.html`.
Regra: um novo tipo de conteúdo em card **sempre** parte de um desses três padrões (imagem+texto+link, ícone+texto, ícone+label+valor) — não inventar um 4º layout de card sem necessidade.

### Títulos de seção
Hierarquia fixa em todas as páginas: um único `<h1>` por página (título principal daquela página), `<h2>` para cada seção, `<h3>` para itens dentro de cards. Nunca pular nível (ex.: `h2` direto para `h4`).

### Espaçamento
- `.section` já aplica o padding padrão de seção (80px desktop / 60px tablet / 60px mobile, ver `components.css`).
- Grades usam `gap` (nunca margin manual entre itens de card) — ver `.category-grid`, `.service-grid`, `.highlights-list`.

### Cores
Toda cor vem das variáveis em `style.css` (`--gd`, `--gm`, `--gb`, `--gp`, `--gf`, `--or`, `--orl`, `--br`, `--go`, `--dk`, `--tx`, `--tl`, `--wa`). Nenhuma página deve declarar uma cor em hexadecimal direto — sempre referenciar a variável, para manter a identidade visual unificada e permitir ajuste global futuro em um único lugar.

### Tipografia
- Títulos (`h1`–`h3`, `.display`) → Fredoka One.
- Texto corrido, botões, labels → Nunito (pesos 400/600/700/800/900).
Ambas já carregadas via Google Fonts no `<head>` — repetir o mesmo `<link>` em todas as páginas.

### Breakpoints responsivos
Dois pontos de quebra usados em todo o site, definidos em `components.css`:
- `max-width: 900px` → tablet/menu mobile ativa.
- `max-width: 480px` → celular pequeno, ajustes finos de padding.
Qualquer novo componente responsivo deve usar esses dois breakpoints — não introduzir um terceiro valor (ex.: 768px) sem necessidade comprovada.

## Como manter o projeto no dia a dia

1. **Mudou uma cor, fonte ou raio de borda?** Edite a variável em `style.css` — o efeito se propaga para o site inteiro automaticamente.
2. **Vai criar uma nova página?** Copie o `<header>`, `<div class="float-whatsapp">` e `<footer>` de uma página existente, sem modificar a estrutura — só o conteúdo central muda, e todos os caminhos de asset continuam `assets/...` (estrutura plana, sem `../`).
3. **Precisa de um estilo só das páginas de produto?** Vai em `products.css`, dentro de um bloco de comentário com o nome da página.
4. **Vai adicionar um novo card ou botão?** Primeiro veja se um dos padrões já existentes (`category-card`, `service-card`, `contact-card`/`location-card`, `btn-whatsapp`, `btn-outline`, `btn-tel`) resolve. Só crie uma classe nova em último caso, e documente aqui.
