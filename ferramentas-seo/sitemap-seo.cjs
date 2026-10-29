// Gera o XML só com as páginas SEO (índice de Informações + lista-paginas.json) para enviar à indexação.
// O arquivo vai para sitemaps/<Nome>-<dd-mm-aaaa>.xml: sempre com o nome e a data no nome.
// Uso: node sitemap-seo.cjs <projeto> [nome] [aaaa-mm-dd]   (padrão: Sitemaps, data de hoje)
const fs = require('fs');
const path = require('path');
const [PROJ, NOME = 'Sitemaps', DATA = new Date().toISOString().slice(0, 10)] = process.argv.slice(2);
const SITE = 'https://petshoppalmira.com.br';

const lista = JSON.parse(fs.readFileSync(path.join(__dirname, 'lista-paginas.json'), 'utf8'));
for (const it of lista) if (!fs.existsSync(path.join(PROJ, 'Informacoes', it.slug + '.html'))) throw new Error('página sem arquivo: ' + it.slug);

const urls = ['', ...lista.map(it => it.slug)].map(slug => `  <url>
    <loc>${SITE}/informacoes/${slug}</loc>
    <lastmod>${DATA}</lastmod>
  </url>`);
const [a, m, d] = DATA.split('-');
const arquivo = path.join(PROJ, 'sitemaps', `${NOME}-${d}-${m}-${a}.xml`);
fs.mkdirSync(path.dirname(arquivo), { recursive: true });
fs.writeFileSync(arquivo, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`);
console.log(`${path.relative(PROJ, arquivo)}: ${urls.length} URLs`);
