// Monta a lista das 150 páginas (50 guias gerais + 5 palavras x 20 bairros) em lista-paginas.json.
// Cria o dado vazio das páginas novas e apaga as páginas de produtos/acessórios por bairro.
// Uso: node lista.cjs <projeto> <data>
const fs = require('fs');
const path = require('path');
const [PROJ, DATA] = process.argv.slice(2);
const DIR = __dirname;

const TIPOS = [
  ['pet-shop', 'pet shop'],
  ['casa-de-racao', 'casa de ração'],
  ['racao-para-cachorro', 'ração para cachorro'],
  ['racao-para-gato', 'ração para gato'],
  ['veterinario', 'veterinário'],
];

const antiga = JSON.parse(fs.readFileSync(path.join(DIR, 'planejamento-100-paginas-seo.json'), 'utf8'));
const gerais = antiga.clusters.flatMap(c => c.paginas).filter(p => p.numero <= 50)
  .map(p => ({ slug: p.slug.replace(/\.html$/, ''), kw: p.palavra_forte, n: p.numero, grupo: 'geral' }));

const bairros = JSON.parse(fs.readFileSync(path.join(DIR, 'bairros.json'), 'utf8'));
const regionais = [];
for (const b of bairros) for (const [tipo, kw] of TIPOS) {
  regionais.push({ slug: b[tipo] || `${tipo}-${b.id}`, kw: `${kw} ${b.nome}`, n: 51 + regionais.length, grupo: 'bairro', bairro: b.id, tipo });
}

const lista = [...gerais, ...regionais];
for (const it of lista) {
  const f = path.join(DATA, it.slug + '.json');
  if (!fs.existsSync(f)) fs.writeFileSync(f, JSON.stringify({ slug: it.slug, keyword: it.kw, slides: [] }, null, 1));
}

// Páginas de produtos/acessórios por bairro saem do site (301 para o pet shop do bairro no netlify.toml)
const redirects = [];
for (const f of fs.readdirSync(DATA).filter(f => /^(produtos|acessorios)-para-pets-/.test(f))) {
  const slug = f.replace(/\.json$/, '');
  const id = slug.replace(/^(produtos|acessorios)-para-pets-/, '');
  const b = bairros.find(x => x.id === id);
  redirects.push([slug, b['pet-shop']]);
  fs.unlinkSync(path.join(DATA, f));
  const html = path.join(PROJ, 'Informacoes', slug + '.html');
  if (fs.existsSync(html)) fs.unlinkSync(html);
}

fs.writeFileSync(path.join(DIR, 'lista-paginas.json'), JSON.stringify(lista, null, 1));
console.log(`gerais: ${gerais.length} | por bairro: ${regionais.length} | removidas: ${redirects.length}`);
for (const [de, para] of redirects) console.log(`  /informacoes/${de} -> /informacoes/${para}`);
