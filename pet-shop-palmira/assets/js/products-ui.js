/**
 * Catálogo Dinâmico de Produtos — Pet Shop Palmira
 * 
 * Exibe os produtos carregados a partir dos arquivos da pasta de produtos.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('products-container');
  if (!container) return;

  const pageCategory = container.getAttribute('data-category') || 'todos';
  let currentCategory = pageCategory;
  let currentSearch = '';

  const searchInput = document.getElementById('product-search');
  const tabButtons = document.querySelectorAll('.category-tab-btn');
  const countBadge = document.getElementById('product-count');

  // Exibição temporária: "Produtos em breve"
  if (countBadge) {
    countBadge.textContent = 'Produtos em breve';
  }

  function renderProducts() {
    container.innerHTML = `
      <div class="catalog-coming-soon" style="grid-column: 1 / -1; text-align: center; padding: 56px 24px; background: #ffffff; border-radius: 16px; border: 2px dashed #cbd5e1; box-shadow: 0 4px 16px rgba(0,0,0,0.03); max-width: 620px; margin: 20px auto;">
        <div style="font-size: 52px; margin-bottom: 16px; line-height: 1;">📦</div>
        <h3 style="font-size: 26px; font-weight: 800; color: #1e293b; margin-bottom: 12px; font-family: var(--font-title, sans-serif);">Produtos em breve</h3>
        <p style="font-size: 16px; color: #64748b; line-height: 1.6; margin-bottom: 24px;">
          Nosso catálogo digital está sendo preparado com os melhores produtos para o seu pet. Enquanto finalizamos as novidades, você pode consultar disponibilidade, marcas e valores diretamente com nossa equipe no WhatsApp!
        </p>
        <a href="https://api.whatsapp.com/send?phone=5511946457048&text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20a%20disponibilidade%20de%20produtos%20no%20Pet%20Shop%20Palmira" class="btn btn-whatsapp" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700; padding: 14px 28px; border-radius: 9999px; text-decoration: none; color: #fff; background-color: #25D366;">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Consultar produtos no WhatsApp
        </a>
      </div>
    `;
  }

  window.resetFilter = function() {
    currentCategory = pageCategory;
    currentSearch = '';
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === currentCategory);
    });
    renderProducts();
  };

  // Eventos de clique nas abas de categoria
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat');
      renderProducts();
    });
  });

  // Busca instantânea
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderProducts();
    });
  }

  // Render inicial
  renderProducts();
});

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
