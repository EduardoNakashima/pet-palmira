/**
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

const DEFAULT_PRODUCTS_FALLBACK = [
  {
    "id": "prod-golden",
    "slug": "golden",
    "nome": "Golden",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para cachorros",
    "imagem": "assets/images/produtos/golden.webp",
    "apenasCard": true
  },
  {
    "id": "prod-premiatta",
    "slug": "premiatta",
    "nome": "Premiatta",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para cachorros",
    "imagem": "assets/images/produtos/premiata.webp",
    "apenasCard": true
  },
  {
    "id": "prod-catchow",
    "slug": "catchow",
    "nome": "CatChow",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para gatos",
    "imagem": "assets/images/produtos/catchow.webp",
    "apenasCard": true
  },
  {
    "id": "prod-goldencat",
    "slug": "goldencat",
    "nome": "Golden Gatos",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para gatos",
    "imagem": "assets/images/produtos/goldencat.webp",
    "apenasCard": true
  },
  {
    "id": "prod-max",
    "slug": "max",
    "nome": "Max",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para cachorros",
    "imagem": "assets/images/produtos/max.webp",
    "apenasCard": true
  },
  {
    "id": "prod-whiskas",
    "slug": "whiskas",
    "nome": "Whiskas",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para gatos",
    "imagem": "assets/images/produtos/whiskas.webp",
    "apenasCard": true
  },
  {
    "id": "prod-golden-filhotes",
    "slug": "golden-filhotes",
    "nome": "Golden Filhotes",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para cachorros filhotes",
    "imagem": "assets/images/produtos/goldenFilhote.webp",
    "apenasCard": true
  },
  {
    "id": "prod-premiatta-filhotes",
    "slug": "premiatta-filhotes",
    "nome": "Premiatta Filhotes",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para cachorros filhotes",
    "imagem": "assets/images/produtos/premiattaFilhote.webp",
    "apenasCard": true
  },
  {
    "id": "prod-max-filhotes",
    "slug": "max-filhotes",
    "nome": "Max Filhotes",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para cachorros filhotes",
    "imagem": "assets/images/produtos/maxFilhote.webp",
    "apenasCard": true
  },
  {
    "id": "prod-ovomil",
    "slug": "ovomil",
    "nome": "Ovomil",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para Codornas e Galinhas",
    "imagem": "assets/images/produtos/galinha.webp",
    "apenasCard": true
  },
  {
    "id": "prod-racoes-criador",
    "slug": "racoes-criador",
    "nome": "Rações Criador",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para Coelhos",
    "imagem": "assets/images/produtos/coelho.webp",
    "apenasCard": true
  },
  {
    "id": "prod-top-horse",
    "slug": "top-horse",
    "nome": "Top Horse",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para Equinos",
    "imagem": "assets/images/produtos/cavalo.webp",
    "apenasCard": true
  },
  {
    "id": "prod-sal-lage",
    "slug": "sal-lage",
    "nome": "Sal Lage",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Sal para Bois e Vacas",
    "imagem": "assets/images/produtos/vacas.webp",
    "apenasCard": true
  },
  {
    "id": "prod-alcon-basic",
    "slug": "alcon-basic",
    "nome": "Alcon BASIC",
    "categoria": "racoes",
    "subcategoria": "Rações",
    "badge": "Rações",
    "descricao": "Ração para Peixes",
    "imagem": "assets/images/produtos/peixe.webp",
    "apenasCard": true
  },
  {
    "id": "prod-pates-pedigree",
    "slug": "pates-pedigree",
    "nome": "Patês Pedigree",
    "categoria": "petiscos",
    "subcategoria": "Petiscos e Patês",
    "badge": "Petiscos e Patês",
    "descricao": "Petiscos diversos",
    "imagem": "assets/images/produtos/pate.webp",
    "apenasCard": true
  },
  {
    "id": "prod-saches-pedigree",
    "slug": "saches-pedigree",
    "nome": "Sachês Pedigree",
    "categoria": "petiscos",
    "subcategoria": "Petiscos e Patês",
    "badge": "Petiscos e Patês",
    "descricao": "Petiscos diversos",
    "imagem": "assets/images/produtos/saches.webp",
    "apenasCard": true
  },
  {
    "id": "prod-ossos-porte-grande",
    "slug": "ossos-porte-grande",
    "nome": "Ossos para porte grande",
    "categoria": "petiscos",
    "subcategoria": "Petiscos e Patês",
    "badge": "Petiscos e Patês",
    "descricao": "Petiscos diversos",
    "imagem": "assets/images/produtos/ossosportegrande.webp",
    "apenasCard": true
  },
  {
    "id": "prod-ossos-porte-pequeno",
    "slug": "ossos-porte-pequeno",
    "nome": "Ossos para porte pequeno",
    "categoria": "petiscos",
    "subcategoria": "Petiscos e Patês",
    "badge": "Petiscos e Patês",
    "descricao": "Petiscos diversos",
    "imagem": "assets/images/produtos/ossosportepequeno.webp",
    "apenasCard": true
  },
  {
    "id": "prod-casinhas-madeira",
    "slug": "casinhas-madeira",
    "nome": "Casinhas de Madeira",
    "categoria": "caminhas",
    "subcategoria": "Caminhas e Colchões",
    "badge": "Caminhas e Colchões",
    "descricao": "Casinhas diversas",
    "imagem": "assets/images/produtos/casinha.webp",
    "apenasCard": true
  },
  {
    "id": "prod-transportes",
    "slug": "transportes-caes-gatos",
    "nome": "Transportes para cães e gatos",
    "categoria": "caminhas",
    "subcategoria": "Caminhas e Colchões",
    "badge": "Caminhas e Colchões",
    "descricao": "Casinhas diversas",
    "imagem": "assets/images/produtos/transporte.webp",
    "apenasCard": true
  },
  {
    "id": "prod-colchoes",
    "slug": "colchoes",
    "nome": "Colchões",
    "categoria": "caminhas",
    "subcategoria": "Caminhas e Colchões",
    "badge": "Caminhas e Colchões",
    "descricao": "Casinhas diversas",
    "imagem": "assets/images/produtos/colchoes.webp",
    "apenasCard": true
  },
  {
    "id": "prod-roupinhas",
    "slug": "roupinhas",
    "nome": "Roupinhas",
    "categoria": "acessorios",
    "subcategoria": "Acessórios",
    "badge": "Acessórios",
    "descricao": "Roupinhas diversas",
    "imagem": "assets/images/produtos/roupinha.webp",
    "apenasCard": true
  },
  {
    "id": "prod-brinquedos",
    "slug": "brinquedos",
    "nome": "Brinquedos",
    "categoria": "acessorios",
    "subcategoria": "Acessórios",
    "badge": "Acessórios",
    "descricao": "Brinquedos diversos",
    "imagem": "assets/images/produtos/brinquedos.webp",
    "apenasCard": true
  },
  {
    "id": "prod-coleiras",
    "slug": "coleiras",
    "nome": "Coleiras",
    "categoria": "acessorios",
    "subcategoria": "Acessórios",
    "badge": "Acessórios",
    "descricao": "Coleiras diversos",
    "imagem": "assets/images/produtos/coleira.webp",
    "apenasCard": true
  },
  {
    "id": "prod-frontline",
    "slug": "frontline",
    "nome": "Frontline",
    "categoria": "medicamentos",
    "subcategoria": "Medicamentos",
    "badge": "Medicamentos",
    "descricao": "Medicamentos diversos",
    "imagem": "assets/images/produtos/frontline.webp",
    "apenasCard": true
  },
  {
    "id": "prod-otovet",
    "slug": "otovet",
    "nome": "Otovet",
    "categoria": "medicamentos",
    "subcategoria": "Medicamentos",
    "badge": "Medicamentos",
    "descricao": "Medicamentos diversos",
    "imagem": "assets/images/produtos/otovet.webp",
    "apenasCard": true
  },
  {
    "id": "prod-capstar",
    "slug": "capstar",
    "nome": "Capstar",
    "categoria": "medicamentos",
    "subcategoria": "Medicamentos",
    "badge": "Medicamentos",
    "descricao": "Medicamentos diversos",
    "imagem": "assets/images/produtos/capstar.webp",
    "apenasCard": true
  },
  {
    "id": "prod-agemoxi",
    "slug": "agemoxi",
    "nome": "Agemoxi CL",
    "categoria": "medicamentos",
    "subcategoria": "Medicamentos",
    "badge": "Medicamentos",
    "descricao": "Medicamentos diversos",
    "imagem": "assets/images/produtos/agemoxi.webp",
    "apenasCard": true
  },
  {
    "id": "prod-enrofloxacina",
    "slug": "enrofloxacina",
    "nome": "Enrofloxacina",
    "categoria": "medicamentos",
    "subcategoria": "Medicamentos",
    "badge": "Medicamentos",
    "descricao": "Medicamentos diversos",
    "imagem": "assets/images/produtos/enrofloxacina.webp",
    "apenasCard": true
  },
  {
    "id": "prod-maxicam",
    "slug": "maxicam",
    "nome": "Maxicam",
    "categoria": "medicamentos",
    "subcategoria": "Medicamentos",
    "badge": "Medicamentos",
    "descricao": "Medicamentos diversos",
    "imagem": "assets/images/produtos/maxicam.webp",
    "apenasCard": true
  },
  {
    "id": "prod-shampoos",
    "slug": "shampoos",
    "nome": "Shampoos",
    "categoria": "higiene",
    "subcategoria": "Higiene",
    "badge": "Higiene",
    "descricao": "Produtos de Higiene",
    "imagem": "assets/images/produtos/shampoo.webp",
    "apenasCard": true
  },
  {
    "id": "prod-shampoos-antiparasitarios",
    "slug": "shampoos-antiparasitarios",
    "nome": "Shampoos antiparasitários",
    "categoria": "higiene",
    "subcategoria": "Higiene",
    "badge": "Higiene",
    "descricao": "Produtos de Higiene",
    "imagem": "assets/images/produtos/antiparasitario.webp",
    "apenasCard": true
  },
  {
    "id": "prod-colonias",
    "slug": "colonias",
    "nome": "Colonias",
    "categoria": "higiene",
    "subcategoria": "Higiene",
    "badge": "Higiene",
    "descricao": "Produtos de Higiene",
    "imagem": "assets/images/produtos/colonia.webp",
    "apenasCard": true
  }
];

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
