const fs = require('fs');
const path = require('path');

const plan = JSON.parse(fs.readFileSync('Informacoes/planejamento-50-paginas-seo.json', 'utf8'));

// Topic image mappings
function getSlidesForPage(p) {
  const title = p.palavra_forte.toLowerCase();
  const slug = p.slug.toLowerCase();

  // 1. Gato
  if (title.includes('gato') || slug.includes('gato')) {
    return [
      {
        src: '../assets/organico/pouring-pet-food-into-bowl.jpg',
        alt: 'Nutrição felina especializada com equilíbrio renal',
        caption: 'Nutrição Equilibrada com Proteção Renal'
      },
      {
        src: '../assets/images/produtos/goldencat.webp',
        alt: 'Ração Golden Gatos Castrados sabor frango e salmão',
        caption: 'Golden Gatos: Especial para Castrados'
      },
      {
        src: '../assets/images/produtos/whiskas.webp',
        alt: 'Ração Whiskas com recheio crocante e alta aceitação',
        caption: 'Whiskas Crocante e Saboroso'
      },
      {
        src: '../assets/images/produtos/saches.webp',
        alt: 'Sachês úmidos para hidratação diária do trato renal dos felinos',
        caption: 'Sachês Úmidos: Hidratação Renal Obrigatória'
      }
    ];
  }

  // 2. Acessórios
  if (title.includes('acessórios') || title.includes('acessorios') || slug.includes('acessorios')) {
    return [
      {
        src: '../assets/organico/transportesecasinhas.jpg',
        alt: 'Casinhas térmicas plásticas e caixas de transporte resistentes',
        caption: 'Casinhas Térmicas e Caixas de Transporte'
      },
      {
        src: '../assets/images/produtos/colchoes.webp',
        alt: 'Caminhas confortáveis e almofadões laváveis com zíper',
        caption: 'Caminhas Confortáveis e Fáceis de Lavar'
      },
      {
        src: '../assets/images/produtos/coleira.webp',
        alt: 'Peitorais ergonômicos antipuxão e guias reforçadas com amortecedor',
        caption: 'Guias e Peitorais Antipuxão para Passeios'
      },
      {
        src: '../assets/images/produtos/transporte.webp',
        alt: 'Caixas de transporte homologadas para viagens veiculares e aéreas',
        caption: 'Caixas Homologadas para Carro e Viagens'
      }
    ];
  }

  // 3. Brinquedos
  if (title.includes('brinquedos') || slug.includes('brinquedos')) {
    return [
      {
        src: '../assets/images/produtos/brinquedos.webp',
        alt: 'Brinquedos mordedores, bolinhas e cordas reforçadas para cães e gatos',
        caption: 'Mordedores e Brinquedos Interativos'
      },
      {
        src: '../assets/images/produtos/ossosportegrande.webp',
        alt: 'Ossos recreativos e funcionais para cães de médio e grande porte',
        caption: 'Ossos Naturais e Recreativos'
      },
      {
        src: '../assets/images/produtos/ossosportepequeno.webp',
        alt: 'Mordedores e ossinhos sob medida para cães de pequeno porte',
        caption: 'Mordedores para Porte Pequeno'
      },
      {
        src: '../assets/organico/loja2.jpg',
        alt: 'Variedade completa em brinquedos e enriquecimento mental',
        caption: 'Enriquecimento Mental e Diversão'
      }
    ];
  }

  // 4. Medicamentos
  if (title.includes('medicamentos') || slug.includes('medicamentos')) {
    return [
      {
        src: '../assets/images/produtos/capstar.webp',
        alt: 'Medicamentos veterinários com ação rápida contra parasitas',
        caption: 'Farmácia Veterinária com Ação Rápida'
      },
      {
        src: '../assets/images/produtos/frontline.webp',
        alt: 'Antipulgas e carrapatos em pipeta tópica de alta eficácia',
        caption: 'Antipulgas em Pipeta e Spray'
      },
      {
        src: '../assets/images/produtos/agemoxi.webp',
        alt: 'Antibióticos, anti-inflamatórios e curativos para cães e gatos',
        caption: 'Antibióticos e Anti-inflamatórios'
      },
      {
        src: '../assets/organico/loja2.jpg',
        alt: 'Prateleiras de farmácia veterinária com orientação farmacêutica básica',
        caption: 'Farmácia Preventiva Completa'
      }
    ];
  }

  // 5. Pássaros e Aves
  if (title.includes('pássaros') || title.includes('passaros') || title.includes('aves') || slug.includes('passaros')) {
    return [
      {
        src: '../assets/organico/loja2.jpg',
        alt: 'Misturas de sementes limpas e selecionadas para pássaros',
        caption: 'Misturas de Sementes Selecionadas'
      },
      {
        src: '../assets/images/produtos/galinha.webp',
        alt: 'Rações balanceadas e suplementos para aves e galináceos',
        caption: 'Nutrição Balanceada para Aves'
      },
      {
        src: '../assets/organico/loja.jpg',
        alt: 'Gaiolas, bebedouros e acessórios para calopsitas, canários e periquitos',
        caption: 'Gaiolas, Poleiros e Bebedouros'
      },
      {
        src: '../assets/organico/transportesecasinhas.jpg',
        alt: 'Comedouros automáticos e vitaminas para aves cantoras',
        caption: 'Comedouros e Vitaminas Avícolas'
      }
    ];
  }

  // 6. Pequeno Porte / Roedores
  if (title.includes('pequeno porte') || slug.includes('pequeno-porte')) {
    return [
      {
        src: '../assets/images/produtos/coelho.webp',
        alt: 'Alimentos e feno para coelhos, porquinhos-da-índia e hamsters',
        caption: 'Alimentos para Coelhos e Roedores'
      },
      {
        src: '../assets/organico/transportesecasinhas.jpg',
        alt: 'Gaiolas espaçosas e bebedouros de bico metálico para pequenos animais',
        caption: 'Gaiolas e Bebedouros Automáticos'
      },
      {
        src: '../assets/organico/loja2.jpg',
        alt: 'Substratos higiênicos de madeira e petiscos naturais',
        caption: 'Substratos e Higiene Roedora'
      },
      {
        src: '../assets/images/produtos/brinquedos.webp',
        alt: 'Brinquedos de madeira para desgaste dental de roedores',
        caption: 'Brinquedos para Desgaste Dental'
      }
    ];
  }

  // 7. Produtos para pets geral
  if (title.includes('produtos para') || slug.includes('produtos-para')) {
    return [
      {
        src: '../assets/organico/loja2.jpg',
        alt: 'Variedade completa em produtos para cães e gatos no Pet Shop Palmira',
        caption: 'Sortimento Completo em Produtos Pet'
      },
      {
        src: '../assets/images/produtos/shampoo.webp',
        alt: 'Shampoos hipoalergênicos e sabonetes dermatológicos',
        caption: 'Shampoos e Higiene Especializada'
      },
      {
        src: '../assets/images/produtos/brinquedos.webp',
        alt: 'Brinquedos mordedores resistentes e cordas para recreação',
        caption: 'Brinquedos Duráveis e Mordedores'
      },
      {
        src: '../assets/images/produtos/capstar.webp',
        alt: 'Farmácia veterinária preventiva, antipulgas e vermífugos',
        caption: 'Farmácia e Proteção Antipulgas'
      }
    ];
  }

  // 8. Ração de Cachorro
  if (title.includes('cachorro') || slug.includes('cachorro')) {
    return [
      {
        src: '../assets/organico/racaoparacachorro.jpg',
        alt: 'Sacos de 15kg e 20kg das melhores marcas de ração canina',
        caption: 'Sacos de 15kg e 20kg em Estoque'
      },
      {
        src: '../assets/images/produtos/golden.webp',
        alt: 'Ração Golden Fórmula para cães adultos e filhotes',
        caption: 'Golden Fórmula: Sabor e Custo-Benefício'
      },
      {
        src: '../assets/images/produtos/premiata.webp',
        alt: 'Linha Super Premium com nutrientes funcionais e condroitina',
        caption: 'Super Premium para Saúde Articular'
      },
      {
        src: '../assets/organico/pouring-pet-food-into-bowl.jpg',
        alt: 'Nutrição equilibrada com grãos crocantes servidos na tigela',
        caption: 'Digestibilidade Máxima e Fezes Menores'
      }
    ];
  }

  // 9. Institucional / Pet Shop Bairro geral (default)
  return [
    {
      src: '../assets/organico/loja.jpg',
      alt: 'Atendimento acolhedor e tradição de 25 anos no Pet Shop Palmira',
      caption: 'Tradição de 25 Anos na Região'
    },
    {
      src: '../assets/organico/racaoparacachorro.jpg',
      alt: 'Sacos de rações Super Premium e Premium Especial com lote fresco',
      caption: 'Grandes Marcas de Ração Canina e Felina'
    },
    {
      src: '../assets/organico/transportesecasinhas.jpg',
      alt: 'Casinhas plásticas térmicas, caminhas e caixas de transporte',
      caption: 'Acessórios, Casinhas e Caixas de Transporte'
    },
    {
      src: '../assets/organico/loja2.jpg',
      alt: 'Corredores com farmácia veterinária, antipulgas e artigos de higiene',
      caption: 'Farmácia Veterinária e Higiene Completa'
    }
  ];
}

// Generate the 4-slide carousel HTML
function buildCarouselHtml(slides, pageKeyword) {
  const slidesHtml = slides.map((s, idx) => {
    const activeClass = idx === 0 ? ' active' : '';
    const loadingAttr = idx === 0 ? 'loading="eager"' : 'loading="lazy"';
    return `            <div class="seo-carousel-slide${activeClass}" data-slide="${idx}">
              <img src="${s.src}" 
                   alt="${s.alt}" 
                   class="seo-carousel-img seo-square-img"
                   ${loadingAttr}
                   width="600"
                   height="600">
              <div class="seo-carousel-caption">${s.caption}</div>
            </div>`;
  }).join('\n\n');

  const dotsHtml = slides.map((_, idx) => {
    const activeClass = idx === 0 ? ' active' : '';
    const ariaSelected = idx === 0 ? 'true' : 'false';
    return `            <button class="seo-carousel-dot${activeClass}" role="tab" aria-selected="${ariaSelected}" data-index="${idx}" aria-label="Ver slide ${idx + 1}"></button>`;
  }).join('\n');

  return `        <div class="seo-carousel-container" aria-label="Fotos de ${pageKeyword} do Pet Shop Palmira">
          <div class="seo-carousel-track" id="seoCarouselTrack">
${slidesHtml}
          </div>

          <!-- Controles de Navegação -->
          <button class="seo-carousel-btn prev seo-carousel-prev" id="carouselPrev" aria-label="Foto anterior">‹</button>
          <button class="seo-carousel-btn next seo-carousel-next" id="carouselNext" aria-label="Próxima foto">›</button>

          <!-- Indicadores de Pontos (Dots) -->
          <div class="seo-carousel-dots" id="carousel-dots" role="tablist" aria-label="Navegar entre slides">
${dotsHtml}
          </div>
        
          <!-- Badge oficial com a logo/favicon no canto inferior direito -->
          <div class="seo-carousel-favicon-badge" aria-hidden="true" title="Pet Shop Palmira">
            <img src="../assets/images/favicon-logo.png" alt="Pet Shop Palmira" width="30" height="30">
          </div>
        </div>`;
}

// Generate standard Table HTML for any page that lacks it
function buildTableHtml(p) {
  const kw = p.palavra_forte;
  return `      <!-- Tabela Resumo -->
      <section class="seo-body-section" aria-label="Tabela de produtos e soluções em destaque">
        <h2>Tabela de Produtos e Marcas em Destaque</h2>
        <div class="seo-table-wrapper">
          <table class="seo-table">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Marcas em Destaque</th>
                <th>Vantagem Principal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Rações Secas</strong></td>
                <td>Premier Pet, Golden, Royal Canin, Special Dog, GranPlus</td>
                <td>Nutrição de precisão, lotes sempre frescos e sacos de 1kg a 20kg</td>
              </tr>
              <tr>
                <td><strong>Alimentos Úmidos</strong></td>
                <td>Sachês Premier, Golden, Whiskas e latas patê</td>
                <td>Hidratação renal para felinos e agrado saboroso para cães</td>
              </tr>
              <tr>
                <td><strong>Antiparasitários</strong></td>
                <td>Bravecto, Simparic, Nexgard, Capstar, Frontline</td>
                <td>Proteção contra pulgas, carrapatos e sarnas com ação prolongada</td>
              </tr>
              <tr>
                <td><strong>Acessórios &amp; Higiene</strong></td>
                <td>Caminhas laváveis, casinhas térmicas, tapetes higiênicos</td>
                <td>Conforto térmico, casa sem odores e passeios seguros</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>`;
}

// Standard JavaScript at page bottom
const standardScriptHtml = `<!-- Script do Menu Mobile e Carrossel Quadrado 1:1 -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });
  }

  const track = document.getElementById('seoCarouselTrack') || document.querySelector('.seo-carousel-track');
  const slides = track ? track.querySelectorAll('.seo-carousel-slide') : [];
  const dots = document.querySelectorAll('.seo-carousel-dot');
  const prevBtn = document.getElementById('carouselPrev') || document.getElementById('carousel-prev') || document.querySelector('.seo-carousel-prev');
  const nextBtn = document.getElementById('carouselNext') || document.getElementById('carousel-next') || document.querySelector('.seo-carousel-next');
  let currentIndex = 0;

  function goToSlide(index) {
    if (!track || slides.length === 0) return;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
      dot.setAttribute('aria-selected', idx === currentIndex ? 'true' : 'false');
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-index'), 10);
      goToSlide(idx);
    });
  });

  let autoTimer = setInterval(() => goToSlide(currentIndex + 1), 6000);
  const container = document.querySelector('.seo-carousel-container');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoTimer));
    container.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => goToSlide(currentIndex + 1), 6000);
    });
  }
});
</script>`;

let processed = 0;

plan.clusters.forEach(c => {
  if (!c.paginas) return;
  c.paginas.forEach(p => {
    const filePath = path.join('Informacoes', p.slug);
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Replace entire carousel block with standardized topic-specific carousel
    const slides = getSlidesForPage(p);
    const newCarouselHtml = buildCarouselHtml(slides, p.palavra_forte);

    // Regex to match existing carousel container
    const carouselRegex = /<div class="seo-carousel-container"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i;
    if (carouselRegex.test(html)) {
      html = html.replace(carouselRegex, `${newCarouselHtml}\n      </div>\n    </div>\n  </section>`);
    }

    // 2. Ensure .seo-quick-info exists in hero
    if (!html.includes('seo-quick-info')) {
      const quickInfoHtml = `          <div class="seo-quick-info">
            <span>📞 Entrega sob consulta combinando por ligação antecipadamente</span>
            <span>⭐ Atendimento acolhedor e preço justo</span>
            <span>📍 Av. Pedro de Souza Lopes, 33B - Jardim Palmira</span>
          </div>`;
      if (html.includes('</p>\n        </div>\n\n        <!-- Coluna da Direita') || html.includes('</p>\n        </div>\n        <div class="seo-carousel-container"')) {
        html = html.replace('</p>\n        </div>', `</p>\n${quickInfoHtml}\n        </div>`);
      } else if (html.includes('</div>\n\n          <!-- CTA alinhado')) {
        html = html.replace('</div>\n\n          <!-- CTA alinhado', `${quickInfoHtml}\n          </div>\n\n          <!-- CTA alinhado`);
      } else if (html.includes('</div>\n\n          <div class="seo-intro-cta-wrapper">')) {
        html = html.replace('</div>\n\n          <div class="seo-intro-cta-wrapper">', `${quickInfoHtml}\n          </div>\n\n          <div class="seo-intro-cta-wrapper">`);
      }
    }

    // 3. Ensure Table exists in article body
    if (!html.includes('seo-table') && !html.includes('seo-table-wrapper')) {
      const tableHtml = buildTableHtml(p);
      // Insert right before FAQ or before Chamada para Ação
      if (html.includes('<!-- Perguntas Frequentes (FAQ) -->')) {
        html = html.replace('<!-- Perguntas Frequentes (FAQ) -->', `${tableHtml}\n\n      <!-- Perguntas Frequentes (FAQ) -->`);
      } else if (html.includes('<section class="seo-body-section" aria-label="Dúvidas') || html.includes('<section class="seo-body-section" aria-label="Perguntas')) {
        const idx = html.search(/<section class="seo-body-section" aria-label="(Dúvidas|Perguntas)/);
        html = html.slice(0, idx) + tableHtml + '\n\n      ' + html.slice(idx);
      } else if (html.includes('<!-- Chamada para Ação Final -->')) {
        html = html.replace('<!-- Chamada para Ação Final -->', `${tableHtml}\n\n      <!-- Chamada para Ação Final -->`);
      }
    }

    // 4. Standardize Script at bottom
    const scriptRegex = /<!-- Script do Menu Mobile[\s\S]*?<\/script>/i;
    if (scriptRegex.test(html)) {
      html = html.replace(scriptRegex, standardScriptHtml);
    } else {
      const endBodyRegex = /<\/body>/i;
      html = html.replace(endBodyRegex, `${standardScriptHtml}\n\n</body>`);
    }

    // 5. Ensure official contact & hours in footer
    const hoursRegex = /Seg a Sáb:[^<]*/g;
    html = html.replace(hoursRegex, 'Seg a Sáb: 09h às 18h | Dom: Fechado');

    // Write back
    fs.writeFileSync(filePath, html, 'utf8');
    processed++;
  });
});

console.log(`Harmonized all ${processed} pages with standard layout, topic-specific images, and interactive controls!`);
