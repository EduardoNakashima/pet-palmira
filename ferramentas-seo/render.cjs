// Gera as 100 páginas SEO em Informacoes/ a partir de data/*.json, todas com o mesmo modelo.
// Uso: node render.cjs <projeto> <data> <planejamento.json>
const fs = require('fs');
const path = require('path');
const [PROJ, DATA, PLAN] = process.argv.slice(2);
const SITE = 'https://petshoppalmira.com.br';
const WA = '5511974605359';

// Script do carrossel/menu e ícone do WhatsApp reaproveitados da página-modelo atual
const modelo = fs.readFileSync(path.join(PROJ, 'Informacoes', 'comprar-racao-para-cachorro-e-gato.html'), 'utf8');
const SCRIPT = modelo.match(/<script>\s*document\.addEventListener[\s\S]*?<\/script>/)[0];
const WA_PATH = modelo.match(/<path d="(M17\.472[^"]+)"/)[1];
const waSvg = (cls, size) => `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="currentColor" width="${size}" height="${size}" aria-hidden="true"><path d="${WA_PATH}"/></svg>`;

const esc = s => String(s).replace(/&(?!amp;|lt;|gt;|quot;|#\d+;|rarr;)/g, '&amp;').replace(/"/g, '&quot;');
const text = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const waLink = msg => `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(msg)}`;

// Catálogo de imagens existentes: texto alternativo e legenda padrão
const IMG = {
  'assets/organico/loja.webp': ['Fachada e balcão do Pet Shop Palmira no Jardim Palmira', 'Nossa loja no Jardim Palmira'],
  'assets/organico/loja2.webp': ['Prateleiras com produtos para pets no Pet Shop Palmira', 'Variedade para todos os bichos'],
  'assets/organico/cachorroegato.webp': ['Cachorro e gato juntos', 'Cuidado para cães e gatos'],
  'assets/organico/pouring-pet-food-into-bowl.webp': ['Ração sendo servida no comedouro', 'Alimentação de qualidade'],
  'assets/organico/racaoparacachorro.webp': ['Cachorro com ração no comedouro', 'Ração para cada fase do cão'],
  'assets/organico/transportesecasinhas.webp': ['Caixas de transporte e casinhas para pets', 'Casinhas e caixas de transporte'],
  'assets/images/produtos/golden.webp': ['Ração Golden Formula para cães adultos', 'Golden Formula Adultos'],
  'assets/images/produtos/goldenFilhote.webp': ['Ração Golden para cães filhotes', 'Golden Filhotes'],
  'assets/images/produtos/goldencat.webp': ['Ração Golden Gatos sabor salmão', 'Golden Gatos'],
  'assets/images/produtos/premiata.webp': ['Ração Premiatta Classic para cães', 'Premiatta Classic Cães'],
  'assets/images/produtos/premiattaFilhote.webp': ['Ração Premiatta para filhotes', 'Premiatta Filhotes'],
  'assets/images/produtos/max.webp': ['Ração Max Professional Line para cães', 'Max Professional Line'],
  'assets/images/produtos/maxFilhote.webp': ['Ração Max para filhotes', 'Max Filhotes'],
  'assets/images/produtos/catchow.webp': ['Ração CatChow peixe e frango para gatos', 'CatChow Peixe e Frango'],
  'assets/images/produtos/whiskas.webp': ['Ração Whiskas carne e peixe para gatos', 'Whiskas Carne e Peixe'],
  'assets/images/produtos/saches.webp': ['Sachês de alimento úmido para cães e gatos', 'Sachês e alimentos úmidos'],
  'assets/images/produtos/pate.webp': ['Patê Pedigree para cães', 'Patê Pedigree'],
  'assets/images/produtos/ossosportegrande.webp': ['Ossinhos para cães de porte grande', 'Ossinhos porte grande'],
  'assets/images/produtos/ossosportepequeno.webp': ['Ossinhos para cães de porte pequeno', 'Ossinhos porte pequeno'],
  'assets/images/produtos/brinquedos.webp': ['Brinquedos para cães e gatos', 'Brinquedos'],
  'assets/images/produtos/casinha.webp': ['Casinha plástica para cachorro', 'Casinhas'],
  'assets/images/produtos/transporte.webp': ['Caixa de transporte para cães e gatos', 'Caixas de transporte'],
  'assets/images/produtos/colchoes.webp': ['Caminhas e colchonetes para pets', 'Caminhas'],
  'assets/images/produtos/coleira.webp': ['Coleiras e guias para cachorro', 'Coleiras e guias'],
  'assets/images/produtos/roupinha.webp': ['Roupinhas para pets', 'Roupinhas'],
  'assets/images/produtos/shampoo.webp': ['Shampoo para cães', 'Shampoo e higiene'],
  'assets/images/produtos/colonia.webp': ['Colônia para pets', 'Colônias'],
  'assets/images/produtos/frontline.webp': ['Antipulgas Frontline Plus', 'Frontline Plus'],
  'assets/images/produtos/capstar.webp': ['Antipulgas Capstar', 'Capstar'],
  'assets/images/produtos/antiparasitario.webp': ['Antiparasitário para cães e gatos', 'Antiparasitários'],
  'assets/images/produtos/otovet.webp': ['Medicamento veterinário Otovet', 'Otovet'],
  'assets/images/produtos/agemoxi.webp': ['Medicamento veterinário Agemoxi', 'Agemoxi'],
  'assets/images/produtos/maxicam.webp': ['Medicamento veterinário Maxicam', 'Maxicam'],
  'assets/images/produtos/enrofloxacina.webp': ['Medicamento veterinário enrofloxacina', 'Farmácia veterinária'],
  'assets/images/produtos/galinha.webp': ['Ração para galinhas e aves de criação', 'Ração para galinhas'],
  'assets/images/produtos/coelho.webp': ['Ração para coelhos e roedores', 'Ração para roedores'],
  'assets/images/produtos/cavalo.webp': ['Ração para cavalos', 'Ração para cavalos'],
  'assets/images/produtos/vacas.webp': ['Ração para animais de criação', 'Ração para criação'],
  'assets/images/produtos/peixe.webp': ['Ração para peixes', 'Ração para peixes'],
  'assets/images/categorias/codorna.webp': ['Codorna', 'Ração para codornas e aves de criação'],
  'assets/images/categorias/periquito.webp': ['Periquito', 'Sementes e ração para pássaros'],
  'assets/images/categorias/pintinho.webp': ['Pintinho', 'Ração inicial para pintinhos'],
  'assets/images/categorias/prea.webp': ['Porquinho-da-índia', 'Ração e feno para roedores'],
};
// Imagens citadas nas páginas antigas que não existem no projeto
const TROCA = {
  'assets/images/produtos/goldenformula.webp': 'assets/images/produtos/golden.webp',
  'assets/images/produtos/bravecto.webp': 'assets/images/produtos/antiparasitario.webp',
  'assets/images/produtos/transportesecasinhas.webp': 'assets/organico/transportesecasinhas.webp',
  'assets/images/produtos/acessorios.webp': 'assets/images/produtos/coleira.webp',
  'assets/images/produtos/casinhas.webp': 'assets/images/produtos/casinha.webp',
  'assets/images/produtos/tapete.webp': 'assets/organico/cachorroegato.webp',
  'assets/images/produtos/premierfilhote.webp': 'assets/images/produtos/goldenFilhote.webp',
  'assets/images/produtos/specialdog.webp': 'assets/images/produtos/max.webp',
  'assets/images/produtos/granplusgato.webp': 'assets/images/produtos/catchow.webp',
  'assets/images/produtos/royalcanin.webp': 'assets/images/produtos/premiata.webp',
};
const P = 'assets/images/produtos/', O = 'assets/organico/';
const POOLS = [
  [/gato|felin|castrad|areia/, [O + 'cachorroegato.webp', P + 'goldencat.webp', P + 'catchow.webp', P + 'whiskas.webp', P + 'saches.webp']],
  [/passaro|aves|calopsita/, [O + 'loja2.webp', P + 'galinha.webp', O + 'loja.webp', P + 'peixe.webp']],
  [/galinha|porco|criacao/, [P + 'galinha.webp', P + 'vacas.webp', P + 'peixe.webp', O + 'loja2.webp']],
  [/cavalo|equino/, [P + 'cavalo.webp', P + 'vacas.webp', O + 'loja2.webp', O + 'loja.webp']],
  [/porquinho|roedor|pequeno-porte/, [P + 'coelho.webp', O + 'loja2.webp', P + 'brinquedos.webp', O + 'loja.webp']],
  [/medicament|farmacia|antipulga|vermifug/, [P + 'frontline.webp', P + 'capstar.webp', P + 'antiparasitario.webp', P + 'otovet.webp', P + 'maxicam.webp']],
  [/shampoo|tapete|higien/, [P + 'shampoo.webp', P + 'colonia.webp', O + 'cachorroegato.webp', O + 'loja2.webp']],
  [/brinquedo|petisco|ossinho|mordedor/, [P + 'brinquedos.webp', P + 'ossosportegrande.webp', P + 'ossosportepequeno.webp', P + 'pate.webp']],
  [/acessorio|caminha|casinha|coleira|transporte|comedouro/, [O + 'transportesecasinhas.webp', P + 'coleira.webp', P + 'colchoes.webp', P + 'casinha.webp', P + 'transporte.webp']],
  [/sache|pate|umido/, [P + 'saches.webp', P + 'pate.webp', P + 'whiskas.webp', P + 'catchow.webp']],
  [/racao|cachorro|caes|filhote|idoso/, [O + 'racaoparacachorro.webp', P + 'golden.webp', P + 'premiata.webp', P + 'max.webp', P + 'goldenFilhote.webp']],
  [/./, [O + 'loja.webp', O + 'loja2.webp', P + 'golden.webp', P + 'frontline.webp', P + 'coleira.webp']],
];

function slides(d) {
  const out = [];
  for (const s of d.slides || []) {
    let src = s.src.replace(/\.jpg$/, '.webp').replace('assets/images/organico/', 'assets/organico/');
    let alt = s.alt, caption = s.caption;
    if (TROCA[src]) { src = TROCA[src]; alt = ''; caption = ''; }
    // ícones (servicos/) e imagens inexistentes não servem como foto do carrossel
    if (src.includes('/servicos/') || !fs.existsSync(path.join(PROJ, src)) || out.find(x => x.src === src)) continue;
    const def = IMG[src] || [text(d.keyword), ''];
    // legendas e textos alternativos neutros do catálogo (as antigas tinham texto de IA)
    out.push(IMG[src] ? { src, alt: def[0], caption: def[1] } : { src, alt: alt || def[0], caption: (caption || def[1]).slice(0, 80) });
    if (out.length === 4) break;
  }
  const pool = POOLS.find(([re]) => re.test(d.slug))[1];
  for (const src of pool) {
    if (out.length === 4) break;
    if (!out.find(x => x.src === src)) out.push({ src, alt: IMG[src][0], caption: IMG[src][1] });
  }
  return out;
}

function block(b) {
  switch (b.type) {
    case 'h2': return `<h2>${esc(b.text)}</h2>`;
    case 'h3': return `<h3>${esc(b.text)}</h3>`;
    case 'p': return `<p>${b.html}</p>`;
    case 'ul': case 'ol': return `<${b.type}>\n${b.items.map(i => `            <li>${i}</li>`).join('\n')}\n          </${b.type}>`;
    case 'highlight': return `<div class="seo-highlight-box">\n            ${b.title ? `<strong>${esc(b.title)}</strong>\n            ` : ''}${esc(b.text)}\n          </div>`;
    case 'cards': return `<div class="seo-cards-grid">\n${b.items.map(c => `            <div class="seo-card">\n              <h3>${esc(c.title)}</h3>\n              <p>${esc(c.text)}</p>\n            </div>`).join('\n')}\n          </div>`;
    case 'table': return `<div class="seo-table-wrapper">\n            <table class="seo-table">\n              <thead><tr>${b.head.map(h => `<th>${h}</th>`).join('')}</tr></thead>\n              <tbody>\n${b.rows.map(r => `                <tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('\n')}\n              </tbody>\n            </table>\n          </div>`;
    default: return '';
  }
}

const BADGE = [
  [/^pet-shop-(jardim-palmira|continental|cabucu|vila|jardim-rosa|picanco|torres|jardim-flor)/, 'Pet Shop de Bairro em Guarulhos'],
  [/medicament|farmacia|antipulga|vermifug/, 'Farmácia Veterinária'],
  [/acessorio|caminha|casinha|coleira|transporte|comedouro/, 'Conforto e Segurança'],
  [/racao|sache|petisco/, 'Nutrição de Qualidade'],
  [/./, 'Pet Shop Palmira'],
];
const BAIRROS = 'Jardim Palmira, Continental, Cabuçu, Vila Galvão, Rosa de França, Picanço, Vila Rosália, Vila Milton, Flor da Montanha, Torres Tibagy';

function page(d) {
  const url = `${SITE}/informacoes/${d.slug}`;
  const kw = text(d.keyword);
  const label = cap(kw);
  const sl = slides(d);
  const badge = d.badge || BADGE.find(([re]) => re.test(d.slug))[1];
  const msg = `Olá! Vim pela página "${label}" do site e gostaria de mais informações.`;
  const faq = (d.faq || []).filter(f => f.q && f.a);
  const intro = (d.intro && d.intro.length ? d.intro : [`Procurando <strong>${kw}</strong>? O Pet Shop Palmira atende Guarulhos há 25 anos com produto de confiança, preço acessível e atendimento de bairro.`]).slice(0, 4);
  const title = d.title || `${label} | Pet Shop Palmira`;
  const desc = d.description || `${label} no Pet Shop Palmira, há 25 anos no Jardim Palmira, Guarulhos. Consulte pelo WhatsApp e combine a entrega por ligação.`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Informações', item: SITE + '/informacoes/' },
        { '@type': 'ListItem', position: 3, name: label, item: url },
      ] },
      { '@type': 'PetStore', name: 'Pet Shop Palmira', image: SITE + '/assets/images/logopetshoppalmira.png', telephone: '+551124511719', priceRange: '$',
        address: { '@type': 'PostalAddress', streetAddress: 'Av. Pedro de Souza Lopes, 33B', addressLocality: 'Guarulhos', addressRegion: 'SP', postalCode: '07074-000', addressCountry: 'BR' },
        openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '18:00' }] },
      ...(faq.length ? [{ '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
    ],
  };

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Palavra-chave foco: ${esc(kw)} -->
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:locale" content="pt_BR">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(d.ogDescription || desc)}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Pet Shop Palmira">
<meta property="og:image" content="${SITE}/${sl[0].src}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="../assets/css/seo-pages.css">
<link rel="icon" type="image/png" href="../assets/images/favicon-logo.png">
<link rel="apple-touch-icon" href="../assets/images/favicon-logo.png">
<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>
</head>
<body>

<a href="${waLink(msg)}" class="float-whatsapp" target="_blank" rel="noopener" aria-label="Chamar o Pet Shop Palmira no WhatsApp">
  ${waSvg('', 24).replace('currentColor', 'white')}
</a>

<header class="site-header" id="site-header">
  <div class="hdr-in">
    <a href="../index.html" class="logo" aria-label="Ir para o início do Pet Shop Palmira">
      <img src="../assets/images/logopetshoppalmira.png" alt="Pet Shop Palmira" class="logo-img">
    </a>
    <nav class="main-nav" id="main-nav" aria-label="Navegação principal">
      <ul>
        <li><a href="../produtos.html">Produtos</a></li>
        <li><a href="../servicos.html">Serviços</a></li>
        <li><a href="../sobre-nos.html">Sobre Nós</a></li>
        <li><a href="../localizacao.html">Localização</a></li>
        <li><a href="../contato.html">Contato</a></li>
        <li><a href="index.html" class="active">Informações</a></li>
      </ul>
    </nav>
    <a href="${waLink(msg)}" class="btn btn-whatsapp sm" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
      ${waSvg('ico-wa', 18)}
      <span class="btn-wa-text">Fale Conosco</span>
    </a>
    <button class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir menu de navegação">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<main>

  <!-- 1. TRILHA DE NAVEGAÇÃO -->
  <section class="seo-breadcrumbs-section" aria-label="Trilha de navegação">
    <div class="section-in">
      <nav class="seo-breadcrumbs">
        <a href="../index.html">Início</a>
        <span class="seo-breadcrumbs-sep">›</span>
        <a href="index.html">Informações</a>
        <span class="seo-breadcrumbs-sep">›</span>
        <span class="seo-breadcrumbs-current" aria-current="page">${esc(label)}</span>
      </nav>
    </div>
  </section>

  <!-- 2. INTRODUÇÃO + CARROSSEL -->
  <section class="seo-intro-section" aria-labelledby="titulo-pagina-seo">
    <div class="section-in">
      <div class="seo-intro-grid">
        <div class="seo-intro-content">
          <span class="seo-intro-badge">${esc(badge)}</span>
          <h1 id="titulo-pagina-seo" class="seo-page-title">${d.h1 || esc(label)}</h1>
          <div class="seo-intro-text">
${intro.map(p => `            <p>${p}</p>`).join('\n')}
            <div class="seo-quick-info">
              <span>Entrega combinada por ligação</span>
              <span>Seg a sáb, 9h às 18h</span>
              <span>Av. Pedro de Souza Lopes, 33B, Jardim Palmira</span>
            </div>
          </div>
          <div class="seo-intro-cta-wrapper">
            <a href="${waLink(msg)}" class="seo-cta-btn" target="_blank" rel="noopener">
              ${waSvg('', 20)}
              <span>Chamar no WhatsApp</span>
            </a>
            <span class="seo-cta-subtext">Ou ligue: (11) 2451-1719</span>
          </div>
        </div>

        <div class="seo-carousel-container" aria-label="Fotos: ${esc(label)}">
          <div class="seo-carousel-track" id="seoCarouselTrack">
${sl.map((s, i) => `            <div class="seo-carousel-slide${i ? '' : ' active'}" data-slide="${i}">
              <img src="../${s.src}" alt="${esc(s.alt)}" class="seo-carousel-img seo-square-img" loading="${i ? 'lazy' : 'eager'}" width="600" height="600">
              <div class="seo-carousel-caption">${esc(s.caption)}</div>
            </div>`).join('\n')}
          </div>
          <button class="seo-carousel-btn prev seo-carousel-prev" id="carouselPrev" aria-label="Foto anterior">‹</button>
          <button class="seo-carousel-btn next seo-carousel-next" id="carouselNext" aria-label="Próxima foto">›</button>
          <div class="seo-carousel-dots" id="carousel-dots" role="tablist" aria-label="Navegar entre fotos">
${sl.map((s, i) => `            <button class="seo-carousel-dot${i ? '' : ' active'}" role="tab" aria-selected="${i ? 'false' : 'true'}" data-index="${i}" aria-label="Ver foto ${i + 1}"></button>`).join('\n')}
          </div>
          <div class="seo-carousel-favicon-badge" aria-hidden="true">
            <img src="../assets/images/favicon-logo.png" alt="" width="30" height="30">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. CONTEÚDO -->
  <section class="seo-body-section" aria-label="${esc(label)}">
    <div class="section-in">
      <article class="seo-content-card">
        <div class="seo-content-body">

          ${(d.body || []).map(block).filter(Boolean).join('\n\n          ')}
${faq.length ? `
          <!-- 4. PERGUNTAS FREQUENTES -->
          <h2>Perguntas frequentes</h2>
          <div class="seo-faq-list">
${faq.map(f => `            <div class="seo-faq-item">
              <h3 class="seo-faq-question">${esc(f.q)}</h3>
              <p>${esc(f.a)}</p>
            </div>`).join('\n')}
          </div>
` : ''}
          <!-- 5. CHAMADA FINAL -->
          <div class="seo-bottom-banner">
            <div>
              <h3>Ficou alguma dúvida?</h3>
              <p>Manda uma mensagem no WhatsApp ou liga no (11) 2451-1719. A gente atende de segunda a sábado, das 9h às 18h.</p>
            </div>
            <a href="${waLink(msg)}" class="seo-cta-btn" target="_blank" rel="noopener">Chamar no WhatsApp</a>
          </div>

        </div>
      </article>
    </div>
  </section>

</main>

<footer class="site-footer">
  <div class="footer-in ftr-in">
    <div class="footer-grid ftr-grid">
      <div class="footer-col">
        <a href="../index.html" class="logo" aria-label="Ir para a página inicial">
          <img src="../assets/images/logopetshoppalmira.png" alt="Pet Shop Palmira" class="footer-logo">
        </a>
        <p class="footer-desc">Há 25 anos cuidando dos animais de estimação no ${BAIRROS} e região de Guarulhos.</p>
      </div>
      <div class="footer-col">
        <h4>Navegação</h4>
        <ul>
          <li><a href="../index.html">Início</a></li>
          <li><a href="../produtos.html">Produtos</a></li>
          <li><a href="../servicos.html">Serviços</a></li>
          <li><a href="../sobre-nos.html">Sobre Nós</a></li>
          <li><a href="../contato.html">Contato</a></li>
          <li><a href="index.html">Informações</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Atendimento &amp; Contato</h4>
        <ul>
          <li><strong>WhatsApp:</strong> <a href="https://api.whatsapp.com/send?phone=${WA}" target="_blank" rel="noopener">(11) 97460-5359</a></li>
          <li><strong>Telefone Fixo:</strong> <a href="tel:1124511719">(11) 2451-1719</a></li>
          <li><strong>Endereço:</strong> Av. Pedro de Souza Lopes, 33B - Jardim Palmira, Guarulhos - SP, CEP 07074-000</li>
          <li><strong>Horário:</strong> Seg a Sáb: 09h às 18h | Dom: Fechado</li>
          <li><strong>Entrega:</strong> Somente combinando por ligação antecipadamente</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Pet Shop Palmira. Todos os direitos reservados.</span>
      <span>Feito com 💚 no Jardim Palmira, Guarulhos, SP</span>
    </div>
  </div>
</footer>

${SCRIPT}

</body>
</html>
`;
}

const plan = JSON.parse(fs.readFileSync(PLAN, 'utf8'));
const list = plan.clusters.flatMap(c => c.paginas.map(p => ({ slug: p.slug.replace(/\.html$/, ''), kw: p.palavra_forte, n: p.numero })));
let n = 0;
for (const it of list) {
  const d = JSON.parse(fs.readFileSync(path.join(DATA, it.slug + '.json'), 'utf8'));
  d.keyword = it.kw;
  fs.writeFileSync(path.join(PROJ, 'Informacoes', it.slug + '.html'), page(d));
  n++;
}
fs.writeFileSync(path.join(DATA, '_lista.json'), JSON.stringify(list));
console.log('paginas geradas:', n);
