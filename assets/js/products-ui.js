/**
 * Catálogo de Produtos — Pet Shop Palmira
 * 
 * Gerencia a exibição, contagem, busca e filtragem por categoria.
 */

function initProductCatalog() {
  const container = document.getElementById('products-container');
  if (!container) return;

  const pageCategory = container.getAttribute('data-category') || 'todos';
  let currentCategory = 'todos';
  let currentSearch = '';

  const searchInput = document.getElementById('product-search');
  const tabButtons = document.querySelectorAll('.category-tab-btn');
  const countBadge = document.getElementById('product-count');

  // Se o container estiver vazio por algum motivo, renderiza os cards
  if (container.children.length === 0 && window.ProductManager) {
    const prods = window.ProductManager.getFilteredProducts('todos', '', pageCategory);
    container.innerHTML = prods.map(p => {
      const waLink = window.ProductManager.getWhatsAppLink(p.nome);
      const file = (p.imagem || '').split('/').pop();
      return `
        <article class="product-card" id="${p.id}" data-category="${p.categoria}" data-pet-types="${(p.petTypes || []).join(',')}" data-keywords="${p.nome.toLowerCase()} ${p.descricao.toLowerCase()} ${p.subcategoria.toLowerCase()}">
          <div class="product-card-img-wrap">
            <span class="product-badge">${p.badge || 'Pet Palmira'}</span>
            <img src="${p.imagem}" 
                 alt="${p.nome} - ${p.descricao}" 
                 class="product-card-img" 
                 loading="lazy" 
                 onerror="if (!this.dataset.fallbackTried) { this.dataset.fallbackTried = '1'; this.src = 'https://petshoppalmira.netlify.app/assets/img/produtos/${file}'; }">
          </div>
          <div class="product-card-body">
            <span class="product-category-chip">${p.subcategoria}</span>
            <h3 class="product-title">${p.nome}</h3>
            <p class="product-desc">${p.descricao}</p>
            <div class="product-card-footer">
              <a href="${waLink}" class="btn-product-wa" target="_blank" rel="noopener" aria-label="Consultar ${p.nome} no WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Consultar
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function filterCards() {
    const cards = container.querySelectorAll('.product-card');
    const query = currentSearch.toLowerCase().trim();
    const cat = currentCategory.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
      const cardKeywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const cardPetTypes = (card.getAttribute('data-pet-types') || '').toLowerCase();

      let matchCategory = true;
      if (cat !== 'todos') {
        if (cat === 'caes-gatos') {
          matchCategory = cardPetTypes.includes('caes') || cardPetTypes.includes('gatos');
        } else if (cat === 'passaros') {
          matchCategory = cardPetTypes.includes('passaros') || cardPetTypes.includes('aves');
        } else if (cat === 'cavalos-porquinhos') {
          matchCategory = cardPetTypes.includes('cavalos') || cardPetTypes.includes('equinos') || cardPetTypes.includes('coelhos') || cardPetTypes.includes('roedores');
        } else if (cat === 'porcos-galinhas') {
          matchCategory = cardPetTypes.includes('porcos') || cardPetTypes.includes('galinhas') || cardPetTypes.includes('gado');
        } else {
          matchCategory = cardCat === cat;
        }
      }

      let matchSearch = true;
      if (query) {
        matchSearch = cardKeywords.includes(query);
      }

      if (matchCategory && matchSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = `${visibleCount} produto${visibleCount === 1 ? '' : 's'} encontrado${visibleCount === 1 ? '' : 's'}`;
    }

    // Gerencia aviso de nenhum produto
    let emptyEl = container.querySelector('.catalog-empty');
    if (visibleCount === 0) {
      if (!emptyEl) {
        emptyEl = document.createElement('div');
        emptyEl.className = 'catalog-empty';
        emptyEl.style.gridColumn = '1 / -1';
        emptyEl.innerHTML = `
          <div style="font-size:40px; margin-bottom:12px">🐾</div>
          <h3>Nenhum produto encontrado</h3>
          <p>Tente buscar por outro termo ou selecione outra categoria.</p>
          <button type="button" class="btn btn-whatsapp sm" id="btn-empty-reset" style="display:inline-flex; align-items:center; gap:6px; font-weight:700; padding:10px 20px; border-radius:9999px; text-decoration:none; color:#fff; background-color:#25D366; border:none; cursor:pointer;">
            Ver todos os produtos
          </button>
        `;
        container.appendChild(emptyEl);
        const resetBtn = emptyEl.querySelector('#btn-empty-reset');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            window.resetFilter();
          });
        }
      }
      emptyEl.style.display = '';
    } else if (emptyEl) {
      emptyEl.style.display = 'none';
    }
  }

  window.resetFilter = function() {
    currentCategory = 'todos';
    currentSearch = '';
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', (btn.getAttribute('data-cat') || '') === 'todos');
    });
    filterCards();
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat') || 'todos';
      filterCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      filterCards();
    });
  }

  // Execução inicial
  filterCards();
}

// Inicializa com segurança em qualquer estado do DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductCatalog);
} else {
  initProductCatalog();
}
window.addEventListener('load', initProductCatalog);
