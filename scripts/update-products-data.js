import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const prods = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'produtos.json'), 'utf-8'));

const code = `/**
 * Carregador Dinâmico de Produtos — Pet Shop Palmira
 * 
 * Produtos oficiais conforme https://petshoppalmira.netlify.app/#products
 * Puxa dinamicamente dos arquivos individuais em /data/produtos/
 */

const PRODUCT_CATEGORIES = [
  { id: 'todos', nome: 'Todos os Produtos', icon: '🐾' },
  { id: 'racoes', nome: 'Rações', icon: '🥣' },
  { id: 'acessorios', nome: 'Acessórios', icon: '🎾' },
  { id: 'caminhas', nome: 'Caminhas e Colchões', icon: '🛏️' },
  { id: 'higiene', nome: 'Higiene', icon: '🧼' },
  { id: 'medicamentos', nome: 'Medicamentos', icon: '💊' },
  { id: 'petiscos', nome: 'Petiscos e Patês', icon: '🍖' }
];

const DEFAULT_PRODUCTS_FALLBACK = ${JSON.stringify(prods, null, 2)};

const ProductManager = {
  _products: [],
  _isLoaded: false,

  async loadProducts() {
    if (this._isLoaded && this._products.length > 0) {
      return this._products;
    }

    // 1. Tenta carregar da API interna dinâmica
    try {
      const res = await fetch('/api/produtos');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          this._products = data;
          this._isLoaded = true;
          return this._products;
        }
      }
    } catch (e) {
      console.warn('[ProductManager] Falha ao carregar /api/produtos:', e.message);
    }

    // 2. Tenta carregar do arquivo compilado data/produtos.json
    try {
      const resJson = await fetch('data/produtos.json');
      if (resJson.ok) {
        const data = await resJson.json();
        if (Array.isArray(data) && data.length > 0) {
          this._products = data;
          this._isLoaded = true;
          return this._products;
        }
      }
    } catch (e) {
      console.warn('[ProductManager] Falha ao carregar data/produtos.json:', e.message);
    }

    // 3. Fallback de segurança embutido
    this._products = DEFAULT_PRODUCTS_FALLBACK;
    this._isLoaded = true;
    return this._products;
  },

  getAllProducts() {
    return this._products.length > 0 ? this._products : DEFAULT_PRODUCTS_FALLBACK;
  },

  getFilteredProducts(category = 'todos', query = '') {
    const all = this.getAllProducts();
    const cleanQuery = query.toLowerCase().trim();
    const catLower = category.toLowerCase().trim();

    return all.filter(prod => {
      // Filtro de categoria
      if (catLower !== 'todos') {
        const prodCat = (prod.categoria || '').toLowerCase();
        const prodSub = (prod.subcategoria || '').toLowerCase();
        const prodBadge = (prod.badge || '').toLowerCase();

        const matchCat = prodCat === catLower ||
          prodSub.toLowerCase().includes(catLower) ||
          prodBadge.toLowerCase().includes(catLower) ||
          (catLower === 'racoes' && (prodCat === 'racoes' || prodSub.includes('ração') || prodBadge.includes('rações'))) ||
          (catLower === 'acessorios' && (prodCat === 'acessorios' || prodSub.includes('acessórios'))) ||
          (catLower === 'caminhas' && (prodCat === 'caminhas' || prodSub.includes('caminhas') || prodSub.includes('casinhas') || prodSub.includes('colchões') || prodBadge.includes('caminhas'))) ||
          (catLower === 'medicamentos' && (prodCat === 'medicamentos' || prodSub.includes('medicamentos'))) ||
          (catLower === 'higiene' && (prodCat === 'higiene' || prodSub.includes('higiene'))) ||
          (catLower === 'petiscos' && (prodCat === 'petiscos' || prodSub.includes('petiscos') || prodSub.includes('patês')));

        if (!matchCat) return false;
      }

      // Filtro de busca textual
      if (!cleanQuery) return true;
      const haystack = [
        prod.nome,
        prod.descricao,
        prod.subcategoria,
        prod.badge
      ].filter(Boolean).join(' ').toLowerCase();

      return haystack.includes(cleanQuery);
    });
  },

  getWhatsAppLink(productName) {
    const base = 'https://api.whatsapp.com/send?phone=5511946457048';
    const text = 'Olá, vim pelo site do Pet Shop Palmira e gostaria de saber sobre a disponibilidade e preço do produto: "' + productName + '".';
    return base + '&text=' + encodeURIComponent(text);
  }
};

window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
window.ProductManager = ProductManager;
`;

const dest1 = path.join(rootDir, 'assets', 'js', 'products-data.js');
const dest2 = path.join(rootDir, 'pet-shop-palmira', 'assets', 'js', 'products-data.js');

fs.writeFileSync(dest1, code, 'utf-8');
if (fs.existsSync(path.dirname(dest2))) {
  fs.writeFileSync(dest2, code, 'utf-8');
}
console.log('Successfully updated products-data.js in assets/js and pet-shop-palmira/assets/js');
