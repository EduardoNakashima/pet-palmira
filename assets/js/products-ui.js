/**
 * Catálogo de Produtos — Pet Shop Palmira
 * 
 * Gerencia a exibição, busca, filtragem combinada (por Tipo de Pet e Categoria),
 * contagem em tempo real e estado vazio.
 */

function initProductCatalog() {
  const container = document.getElementById('products-container');
  if (!container) return;

  const pageContextCategory = container.getAttribute('data-category') || 'todos';

  // Ler parâmetros da URL para abrir pré-filtrado caso venha de um link
  const urlParams = new URLSearchParams(window.location.search);
  const paramPet = urlParams.get('pet');
  const paramCat = urlParams.get('cat') || urlParams.get('categoria');
  const paramQuery = urlParams.get('busca') || urlParams.get('q') || '';

  // Determinar Pet inicial
  let currentPet = 'todos';
  if (['caes-gatos', 'passaros', 'cavalos-porquinhos', 'porcos-galinhas'].includes(pageContextCategory)) {
    currentPet = pageContextCategory;
  } else if (paramPet) {
    currentPet = paramPet.toLowerCase();
  }

  // Determinar Categoria inicial
  let currentCategory = 'todos';
  if (paramCat) {
    currentCategory = paramCat.toLowerCase();
  }

  let currentSearch = paramQuery;

  // Elementos da interface
  const searchInput = document.getElementById('product-search');
  const countBadge = document.getElementById('product-count');
  const activeFiltersBar = document.getElementById('active-filters-bar');
  const clearAllBtn = document.getElementById('btn-clear-all-filters');

  if (searchInput && currentSearch) {
    searchInput.value = currentSearch;
  }

  // Se o container estiver vazio ou precisar ser populado pelo ProductManager
  function renderAllCardsIfEmpty() {
    if (container.children.length === 0 && window.ProductManager) {
      const all = window.ProductManager.getAllProducts();
      container.innerHTML = all.map(p => {
        const waLink = window.ProductManager.getWhatsAppLink(p.nome);
        const file = (p.imagem || '').split('/').pop();
        return `
          <article class="product-card" id="${p.id}" data-category="${p.categoria}" data-pet-types="${(p.petTypes || []).join(',')}" data-keywords="${p.nome} ${p.descricao} ${p.subcategoria} ${(p.keywords || '')}">
            <div class="product-card-img-wrap">
              <span class="product-badge">${p.badge || p.subcategoria}</span>
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
  }

  renderAllCardsIfEmpty();

  function normalize(str) {
    if (!str) return '';
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  function filterCards() {
    const cards = container.querySelectorAll('.product-card');
    const cleanQuery = normalize(currentSearch);
    const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = (card.getAttribute('data-category') || '').toLowerCase().trim();
      const cardPetTypes = (card.getAttribute('data-pet-types') || '').toLowerCase().split(',').map(s => s.trim());
      const cardKeywords = normalize([
        card.getAttribute('data-keywords') || '',
        card.querySelector('.product-title')?.textContent || '',
        card.querySelector('.product-desc')?.textContent || '',
        card.querySelector('.product-category-chip')?.textContent || '',
        card.querySelector('.product-badge')?.textContent || ''
      ].join(' '));

      // 1. Verificação de Tipo de Pet
      let matchPet = true;
      if (currentPet !== 'todos') {
        if (currentPet === 'caes') {
          matchPet = cardPetTypes.includes('caes');
        } else if (currentPet === 'gatos') {
          matchPet = cardPetTypes.includes('gatos');
        } else if (currentPet === 'caes-gatos') {
          matchPet = cardPetTypes.includes('caes') || cardPetTypes.includes('gatos') || cardPetTypes.includes('caes-gatos');
        } else if (currentPet === 'passaros') {
          matchPet = cardPetTypes.includes('passaros') || cardPetTypes.includes('aves');
        } else if (currentPet === 'cavalos-porquinhos') {
          matchPet = cardPetTypes.includes('cavalos') || cardPetTypes.includes('equinos') || cardPetTypes.includes('coelhos') || cardPetTypes.includes('roedores') || cardPetTypes.includes('cavalos-porquinhos');
        } else if (currentPet === 'porcos-galinhas') {
          matchPet = cardPetTypes.includes('porcos') || cardPetTypes.includes('galinhas') || cardPetTypes.includes('gado') || cardPetTypes.includes('porcos-galinhas') || cardPetTypes.includes('criacao');
        }
      }

      // 2. Verificação de Categoria
      let matchCat = true;
      if (currentCategory !== 'todos' && currentCategory !== 'todas') {
        matchCat = cardCategory === currentCategory;
      }

      // 3. Verificação de Busca Textual
      let matchSearch = true;
      if (queryTerms.length > 0) {
        matchSearch = queryTerms.every(term => cardKeywords.includes(term));
      }

      if (matchPet && matchCat && matchSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Atualiza classes ativas nos botões de Pet
    document.querySelectorAll('[data-pet-btn]').forEach(btn => {
      const p = btn.getAttribute('data-pet-btn') || 'todos';
      btn.classList.toggle('active', p === currentPet);
    });

    // Atualiza classes ativas nos botões de Categoria
    document.querySelectorAll('[data-cat-btn]').forEach(btn => {
      const c = btn.getAttribute('data-cat-btn') || 'todos';
      btn.classList.toggle('active', c === currentCategory);
    });

    // Fallback para abas antigas .category-tab-btn que possuam data-cat
    document.querySelectorAll('.category-tab-btn[data-cat]').forEach(btn => {
      const c = btn.getAttribute('data-cat') || 'todos';
      // Se for botão de pet em página específica
      if (['caes-gatos', 'passaros', 'cavalos-porquinhos', 'porcos-galinhas'].includes(c)) {
        btn.classList.toggle('active', c === currentPet);
      } else {
        btn.classList.toggle('active', c === currentCategory);
      }
    });

    // Atualiza contador textual amigável
    if (countBadge) {
      let petLabel = '';
      if (currentPet === 'caes') petLabel = ' para Cães';
      else if (currentPet === 'gatos') petLabel = ' para Gatos';
      else if (currentPet === 'caes-gatos') petLabel = ' para Cães & Gatos';
      else if (currentPet === 'passaros') petLabel = ' para Pássaros';
      else if (currentPet === 'cavalos-porquinhos') petLabel = ' para Cavalos & Roedores';
      else if (currentPet === 'porcos-galinhas') petLabel = ' para Criação & Gado';

      let catLabel = '';
      if (currentCategory === 'racoes') catLabel = ' em Rações';
      else if (currentCategory === 'petiscos') catLabel = ' em Petiscos e Patês';
      else if (currentCategory === 'medicamentos') catLabel = ' em Medicamentos';
      else if (currentCategory === 'higiene') catLabel = ' em Higiene & Banho';
      else if (currentCategory === 'caminhas') catLabel = ' em Caminhas & Transporte';
      else if (currentCategory === 'acessorios') catLabel = ' em Acessórios & Brinquedos';

      const queryLabel = currentSearch ? ` com termo "${currentSearch}"` : '';
      countBadge.innerHTML = `<strong>${visibleCount}</strong> produto${visibleCount === 1 ? '' : 's'} encontrado${visibleCount === 1 ? '' : 's'}${petLabel}${catLabel}${queryLabel}`;
    }

    // Exibe ou oculta barra de filtros ativos
    const isFiltered = (currentPet !== 'todos' && !['caes-gatos', 'passaros', 'cavalos-porquinhos', 'porcos-galinhas'].includes(pageContextCategory)) ||
                       (currentCategory !== 'todos') ||
                       (currentSearch.trim().length > 0);

    if (activeFiltersBar) {
      activeFiltersBar.style.display = isFiltered ? 'flex' : 'none';
    }

    // Gerencia aviso de nenhum produto
    let emptyEl = container.querySelector('.catalog-empty');
    if (visibleCount === 0) {
      if (!emptyEl) {
        emptyEl = document.createElement('div');
        emptyEl.className = 'catalog-empty';
        emptyEl.style.gridColumn = '1 / -1';
        emptyEl.innerHTML = `
          <div style="font-size:48px; margin-bottom:12px">🐾</div>
          <h3 style="font-family:var(--font-title); font-size:22px; color:var(--gd); margin-bottom:8px">Nenhum produto encontrado</h3>
          <p style="color:var(--tx); max-width:440px; margin:0 auto 16px; font-size:15px">Não encontramos produtos com os filtros selecionados. Tente selecionar outra categoria ou limpar a busca.</p>
          <button type="button" class="btn btn-whatsapp sm" id="btn-empty-reset" style="display:inline-flex; align-items:center; gap:6px; font-weight:700; padding:10px 22px; border-radius:9999px; text-decoration:none; color:#fff; background-color:var(--gm); border:none; cursor:pointer;">
            🔄 Limpar todos os filtros
          </button>
        `;
        container.appendChild(emptyEl);
        const resetBtn = emptyEl.querySelector('#btn-empty-reset');
        if (resetBtn) {
          resetBtn.addEventListener('click', window.resetFilter);
        }
      }
      emptyEl.style.display = 'block';
    } else if (emptyEl) {
      emptyEl.style.display = 'none';
    }
  }

  // Função global de reset
  window.resetFilter = function() {
    if (['caes-gatos', 'passaros', 'cavalos-porquinhos', 'porcos-galinhas'].includes(pageContextCategory)) {
      currentPet = pageContextCategory;
    } else {
      currentPet = 'todos';
    }
    currentCategory = 'todos';
    currentSearch = '';
    if (searchInput) searchInput.value = '';
    filterCards();
  };

  // Listeners para botões de Pet
  document.querySelectorAll('[data-pet-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      currentPet = btn.getAttribute('data-pet-btn') || 'todos';
      filterCards();
    });
  });

  // Listeners para botões de Categoria
  document.querySelectorAll('[data-cat-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      currentCategory = btn.getAttribute('data-cat-btn') || 'todos';
      filterCards();
    });
  });

  // Suporte a botões existentes em páginas legadas
  document.querySelectorAll('.category-tab-btn[data-cat]').forEach(btn => {
    // Apenas se for <button>, não interceptar <a href="...">
    if (btn.tagName.toLowerCase() === 'button') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = btn.getAttribute('data-cat') || 'todos';
        if (['caes-gatos', 'passaros', 'cavalos-porquinhos', 'porcos-galinhas'].includes(cat)) {
          currentPet = cat;
        } else {
          currentCategory = cat;
        }
        filterCards();
      });
    }
  });

  // Listener da busca rápida
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      filterCards();
    });
  }

  // Botão de limpar busca específico
  const clearSearchBtn = document.getElementById('btn-clear-search');
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearch = '';
      filterCards();
      searchInput.focus();
    });
  }

  // Botão global de limpar filtros
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      window.resetFilter();
    });
  }

  // Execução inicial
  filterCards();
}

// Inicializa no carregamento do DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductCatalog);
} else {
  initProductCatalog();
}
window.addEventListener('load', initProductCatalog);
