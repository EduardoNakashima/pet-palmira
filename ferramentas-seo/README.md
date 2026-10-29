# Ferramentas das páginas SEO (Informacoes/)

Pasta de trabalho, bloqueada no site pelo `netlify.toml` (não é publicada).

As páginas de `Informacoes/` são geradas a partir de dados, com um modelo único.
Não edite o HTML das páginas à mão: edite o texto em `textos/` e gere de novo.

## Arquivos

| Arquivo | O que faz |
|---|---|
| `textos/*.txt` | Texto das páginas, escrito à mão no formato do `humanize.cjs` |
| `humanize.cjs` | Lê `textos/`, grava em `dados/` e aponta padrões de escrita de IA |
| `dados/*.json` | Conteúdo de cada página (título, introdução, corpo, perguntas, fotos) |
| `dados/_lista.json` | Ordem e palavra-chave das páginas (gerado pelo render) |
| `bairros.json` | Os 20 bairros, distância até a loja e os slugs antigos que foram mantidos |
| `lista.cjs` | Monta `lista-paginas.json`: 50 guias gerais + 5 palavras x 20 bairros |
| `lista-paginas.json` | Lista das 150 páginas usada pelo render |
| `render.cjs` | Gera `Informacoes/<slug>.html` a partir de `dados/`, o índice de Informações e as URLs do sitemap |
| `../sitemaps/sitemap-seo.xml` | Sitemap só das páginas SEO (gerado pelo render), para enviar à indexação |
| `checar.cjs` | Confere as páginas por bairro: tamanho, títulos repetidos e semelhança entre bairros |
| `planejamento-100-paginas-seo.json` | Planejamento original das 100 páginas |
| `extract.cjs`, `new-pages.cjs`, `fix-data.cjs`, `fix.cjs` | Etapas antigas (extração das páginas antigas e correções de fatos), mantidas como referência |

## Gerar as páginas

```bash
npm install --prefix ferramentas-seo
node ferramentas-seo/lista.cjs . ferramentas-seo/dados
node ferramentas-seo/humanize.cjs ferramentas-seo/textos ferramentas-seo/dados
node ferramentas-seo/checar.cjs ferramentas-seo/dados ferramentas-seo/lista-paginas.json
NODE_PATH=ferramentas-seo/node_modules node ferramentas-seo/render.cjs . ferramentas-seo/dados ferramentas-seo/lista-paginas.json
```

## Páginas por bairro

Cada bairro tem 5 páginas: pet shop, casa de ração, ração para cachorro, ração para gato e veterinário.
Os textos ficam em `textos/bNN-<bairro>.txt`, de 350 a 450 palavras, cada página com um assunto diferente.
As páginas `veterinario-*` deixam claro que a loja não é clínica e levam o botão principal para o WhatsApp da Pink Vet.
As antigas `produtos-para-pets-*` e `acessorios-para-pets-*` redirecionam (301) para o pet shop do bairro no `netlify.toml`.

## Fatos da loja (não inventar nada além disso)

- Pet Shop Palmira, Av. Pedro de Souza Lopes, 33B, Jardim Palmira, Guarulhos, há 25 anos
- Seg a sáb, 9h às 18h. Domingo e feriado fechado
- WhatsApp (11) 97460-5359, fixo (11) 2451-1719
- Entrega somente combinando o local por ligação antes, raio de cerca de 10 km
- Pix, débito, crédito e dinheiro, sem taxa extra no cartão. Sem parcelamento informado
- Banho e tosa só para cães, tosa na máquina, sem táxi dog
- Veterinários parceiros por indicação. Farmácia: Frontline, Capstar, Otovet, Agemoxi, Maxicam, Enrofloxacina, vermífugos
- Marcas: Premier, Golden, Magnus, Special Dog, Pedigree, Whiskas, Royal Canin, CatChow, Premiatta, Max
- Parceira veterinária: Pink Vet Consultório Veterinário, Av. Pedro de Souza Lopes, 33, WhatsApp +55 11 93317-1589, seg a sex 9h às 17h, sáb 9h às 16h, nota 5,0 no Google
