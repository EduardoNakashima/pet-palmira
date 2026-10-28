// Extrai o conteúdo das páginas SEO (qualquer estrutura antiga) para JSON padronizado.
// Uso: node extract.cjs <projeto> <zipInformacoes> <saida>
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const [PROJ, ZIP, OUT] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
const plan = JSON.parse(fs.readFileSync(path.join(ZIP, 'planejamento-100-paginas-seo.json'), 'utf8'));

const clean = s => (s || '').replace(/\s+/g, ' ').trim();
const exists = rel => fs.existsSync(path.join(PROJ, rel));

// HTML inline permitido dentro de parágrafos/listas
function inline($, el) {
  const out = [];
  $(el).contents().each((_, n) => {
    if (n.type === 'text') { out.push(n.data.replace(/</g, '&lt;')); return; }
    if (n.type !== 'tag') return;
    const t = n.name;
    if (['strong', 'b'].includes(t)) out.push('<strong>' + inline($, n) + '</strong>');
    else if (['em', 'i'].includes(t)) out.push('<em>' + inline($, n) + '</em>');
    else if (t === 'br') out.push('<br>');
    else if (t === 'a') {
      const h = $(n).attr('href') || '';
      const txt = inline($, n);
      if (/^(https:\/\/api\.whatsapp\.com|tel:|\.\.\/|[a-z0-9-]+\.html$|index\.html)/.test(h)) out.push(`<a href="${h}"${/^https/.test(h) ? ' target="_blank" rel="noopener"' : ''}>${txt}</a>`);
      else out.push(txt);
    } else if (['svg', 'img', 'button', 'script'].includes(t)) { /* descarta */ }
    else out.push(inline($, n));
  });
  return out.join('').replace(/\s+/g, ' ').trim();
}

function listItems($, el) {
  return $(el).children('li').map((_, li) => inline($, li)).get().filter(Boolean);
}

function table($, el) {
  const rows = $(el).find('tr').map((_, tr) => [$(tr).children('th,td').map((_, c) => inline($, c)).get()]).get();
  if (!rows.length) return null;
  return { type: 'table', head: rows[0], rows: rows.slice(1) };
}

const isCard = ($, el) => {
  const c = ($(el).attr('class') || '');
  return /(^|\s|-)(card|benefit-card|seo-card|mini-card|card-block|highlight-item|feature|seo-info-card|product-card)(\s|$|-)/.test(c)
    && !/seo-content-card|carousel|faq|cta|banner/.test(c)
    && $(el).find('h2').length === 0;
};
const isHighlight = ($, el) => /highlight-box|delivery-alert|seo-tip|dica|seo-note|seo-alert|seo-warning|callout/.test($(el).attr('class') || '');

function card($, el) {
  const $e = $(el);
  const icon = clean($e.find('[class*=icon]').first().text());
  const $t = $e.find('h3,h4,h5,strong').first();
  const title = clean($t.text());
  $t.remove();
  $e.find('[class*=icon]').remove();
  const body = $e.find('p').length ? $e.find('p').map((_, p) => inline($, p)).get().join(' ') : inline($, el);
  return { title: (icon && !title.startsWith(icon) ? icon + ' ' : '') + title, text: clean(body) };
}

function linearize($, root) {
  const blocks = [];
  const walk = el => {
    $(el).children().each((_, c) => {
      const t = c.name;
      if (['script', 'style', 'svg', 'button', 'img', 'figure', 'picture'].includes(t)) return;
      if (t === 'h1') return blocks.push({ type: 'h1', html: inline($, c) });
      if (t === 'h2') return blocks.push({ type: 'h2', text: clean($(c).text()) });
      if (['h3', 'h4'].includes(t)) return blocks.push({ type: 'h3', text: clean($(c).text()) });
      if (t === 'p') { const h = inline($, c); if (h) blocks.push({ type: 'p', html: h }); return; }
      if (t === 'ul' || t === 'ol') { const it = listItems($, c); if (it.length) blocks.push({ type: t, items: it }); return; }
      if (t === 'table') { const tb = table($, c); if (tb) blocks.push(tb); return; }
      if (isHighlight($, c)) {
        const title = clean($(c).find('strong,h3,h4').first().text());
        const all = clean($(c).text());
        blocks.push({ type: 'highlight', title, text: clean(all.replace(title, '')).replace(/^[:\-–\s]+/, '') });
        return;
      }
      if (isCard($, c)) return blocks.push({ type: 'card', ...card($, c) });
      walk(c);
    });
  };
  walk(root);
  // agrupa cards consecutivos
  const out = [];
  for (const b of blocks) {
    if (b.type === 'card') {
      const last = out[out.length - 1];
      if (last && last.type === 'cards') last.items.push({ title: b.title, text: b.text });
      else out.push({ type: 'cards', items: [{ title: b.title, text: b.text }] });
    } else out.push(b);
  }
  return out;
}

function extract(file, meta) {
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  const d = { slug: meta.slug, keyword: meta.keyword, numero: meta.numero, cluster: meta.cluster, source: meta.source };
  d.title = clean($('title').first().text());
  d.description = clean($('meta[name=description]').attr('content'));
  d.ogDescription = clean($('meta[property="og:description"]').attr('content'));

  // FAQ (DOM primeiro, JSON-LD como reserva)
  let faq = [];
  $('.seo-faq-item, details').each((_, it) => {
    const $it = $(it);
    const $q = $it.find('.seo-faq-question, summary, h3, h4, strong').first();
    const q = clean($q.text());
    $q.remove();
    const a = clean($it.find('.seo-faq-answer').length ? $it.find('.seo-faq-answer').text() : $it.text());
    if (q && a) faq.push({ q, a });
  });
  if (!faq.length) {
    $('script[type="application/ld+json"]').each((_, s) => {
      try {
        const j = JSON.parse($(s).html());
        const nodes = j['@graph'] || [j];
        for (const n of nodes) if (n['@type'] === 'FAQPage') for (const q of n.mainEntity || []) faq.push({ q: clean(q.name), a: clean(q.acceptedAnswer && q.acceptedAnswer.text) });
      } catch (e) { /* ignora */ }
    });
  }
  const seenQ = new Set();
  d.faq = faq.filter(f => !seenQ.has(f.q) && seenQ.add(f.q));

  // Slides do carrossel
  d.slides = [];
  $('.seo-carousel-slide, .seo-carousel-container img').each((_, s) => {
    const $s = $(s);
    const $img = s.name === 'img' ? $s : $s.find('img').first();
    let src = ($img.attr('src') || '').replace(/^(\.\.\/)+/, '').replace(/^\//, '');
    if (!src) return;
    if (!src.startsWith('assets/')) src = 'assets/' + src.replace(/^images\//, 'images/');
    const cap = clean(s.name === 'img' ? '' : $s.find('[class*=caption]').text());
    if (!d.slides.find(x => x.src === src)) d.slides.push({ src, alt: clean($img.attr('alt')), caption: cap, ok: exists(src) });
  });

  // Título com o destaque colorido (span.acc) preservado
  const $h1 = $('h1').first().clone();
  const acc = $h1.find('.acc').first();
  if (acc.length) acc.replaceWith('§§' + clean(acc.text()) + '§§');
  const h1raw = clean($h1.text()).replace(/§§(.*?)§§/, '<span class="acc">$1</span>');

  const badge = $('.seo-intro-badge, [class*=eyebrow], .seo-hero-badge, .seo-badge').first();
  d.badge = clean(badge.text());

  // Remove o que o modelo novo gera sozinho
  $('header.site-header, footer, script, style, .float-whatsapp, .seo-breadcrumbs, .seo-breadcrumbs-section, .seo-breadcrumb-bar, nav').remove();
  $('.seo-carousel-container, .seo-carousel-card, .seo-intro-visual, .seo-faq-section, .seo-faq-list, .seo-faq-item, details').remove();
  $('.seo-bottom-banner, .seo-cta-box, .seo-location-banner, .seo-card-cta, .seo-intro-cta-wrapper, .seo-contact-section, .seo-cta-section, [class*=cta-wrapper]').remove();
  $('.seo-quick-info, .seo-intro-highlights, .seo-info-pill, [class*=intro-badge], [class*=eyebrow], .seo-hero-badge, .seo-badge').remove();

  const root = $('main').length ? $('main') : $('body');
  const blocks = linearize($, root);
  const h1i = blocks.findIndex(b => b.type === 'h1');
  d.h1 = h1raw || (h1i >= 0 ? blocks[h1i].html : meta.keyword);
  const rest = blocks.slice(h1i + 1);
  const firstH2 = rest.findIndex(b => b.type === 'h2');
  const introBlocks = firstH2 < 0 ? rest : rest.slice(0, firstH2);
  d.intro = introBlocks.filter(b => b.type === 'p').map(b => b.html)
    .filter(h => !/^Lembramos que fazemos entrega somente combinando/i.test(h));
  let body = firstH2 < 0 ? [] : rest.slice(firstH2);
  // tira títulos de FAQ que ficaram sem itens e títulos vazios
  body = body.filter((b, i) => !(b.type === 'h2' && /perguntas frequentes|d[úu]vidas (comuns|frequentes)|^faq/i.test(b.text)));
  body = body.filter((b, i) => !(['h2', 'h3'].includes(b.type) && (!body[i + 1] || ['h2'].includes(body[i + 1].type))));
  // banners e CTAs finais costumam virar h3 + p soltos no fim: corta o que vem depois do último bloco "de conteúdo"
  d.body = body;
  return d;
}

const results = [];
for (const c of plan.clusters) for (const p of c.paginas) {
  const slug = p.slug.replace(/\.html$/, '');
  const site = path.join(PROJ, 'Informacoes', slug + '.html');
  const zip = path.join(ZIP, slug + '.html');
  const src = fs.existsSync(site) ? site : fs.existsSync(zip) ? zip : null;
  const meta = { slug, keyword: p.palavra_forte, numero: p.numero, cluster: c.id, source: src ? (src === site ? 'site' : 'zip') : 'novo' };
  const d = src ? extract(src, meta) : { ...meta, title: '', description: '', faq: [], slides: [], intro: [], body: [] };
  fs.writeFileSync(path.join(OUT, slug + '.json'), JSON.stringify(d, null, 1));
  const words = (JSON.stringify(d.body) + d.intro.join(' ')).replace(/<[^>]+>/g, ' ').split(/\s+/).length;
  results.push([p.numero, meta.source, slug, 'intro:' + d.intro.length, 'body:' + d.body.length, 'faq:' + d.faq.length, 'slides:' + d.slides.filter(s => s.ok).length + '/' + d.slides.length, 'palavras:' + words].join(' '));
}
console.log(results.join('\n'));
