/**
 * Carregador Dinâmico de Produtos — Pet Shop Palmira
 * 
 * Puxa os produtos dinamicamente dos arquivos individuais da pasta /data/produtos/
 * através da API (/api/produtos) ou do arquivo compilado (/data/produtos.json).
 */

const PRODUCT_CATEGORIES = [
  { id: 'todos', nome: 'Todos os Produtos', icon: '🐾', slug: 'produtos.html' },
  { id: 'caes-gatos', nome: 'Cães e Gatos', icon: '🐶🐱', slug: 'cachorros-e-gatos.html' },
  { id: 'passaros', nome: 'Pássaros', icon: '🦜', slug: 'passaros.html' },
  { id: 'cavalos-porquinhos', nome: 'Cavalos e Porquinhos-da-Índia', icon: '🐴🐹', slug: 'cavalos-e-porquinhos.html' },
  { id: 'porcos-galinhas', nome: 'Porcos e Galinhas', icon: '🐷🐔', slug: 'porcos-e-galinhas.html' }
];

const DEFAULT_PRODUCTS_FALLBACK = [
  {
    "id": "prod-golden-adulto",
    "nome": "Ração Golden Formula Cães Adultos",
    "categoria": "caes-gatos",
    "subcategoria": "Rações",
    "descricao": "Ração completa e balanceada para cachorros adultos.",
    "imagem": "assets/images/produtos/golden.webp",
    "badge": "Rações",
    "marca": "Golden",
    "apenasCard": true
  },
  {
    "id": "prod-premiatta-adulto",
    "nome": "Ração Premiatta Alta Performance",
    "categoria": "caes-gatos",
    "subcategoria": "Rações",
    "descricao": "Ração super premium para cachorros com alto nível de exigência nutricional.",
    "imagem": "assets/images/produtos/premiata.webp",
    "badge": "Rações",
    "marca": "Premiatta",
    "apenasCard": true
  },
  {
    "id": "prod-catchow-gatos",
    "nome": "Ração CatChow Gatos Adultos",
    "categoria": "caes-gatos",
    "subcategoria": "Rações",
    "descricao": "Ração para gatos com nutrientes balanceados e saúde do trato urinário.",
    "imagem": "assets/images/produtos/catchow.webp",
    "badge": "Rações",
    "marca": "CatChow",
    "apenasCard": true
  },
  {
    "id": "prod-goldencat-gatos",
    "nome": "Ração Golden Gatos Adultos",
    "categoria": "caes-gatos",
    "subcategoria": "Rações",
    "descricao": "Ração premium especial para gatos adultos castrados e exigentes.",
    "imagem": "assets/images/produtos/goldencat.webp",
    "badge": "Rações",
    "marca": "Golden",
    "apenasCard": true
  },
  {
    "id": "prod-max-adulto",
    "nome": "Ração Max Cães Adultos",
    "categoria": "caes-gatos",
    "subcategoria": "Rações",
    "descricao": "Ração nutritiva para cachorros adultos com ingredientes selecionados.",
    "imagem": "assets/images/produtos/max.webp",
    "badge": "Rações",
    "marca": "Max",
    "apenasCard": true
  },
  {
    "id": "prod-whiskas-gatos",
    "nome": "Ração Whiskas Gatos Adultos",
    "categoria": "caes-gatos",
    "subcategoria": "Rações",
    "descricao": "Ração com nuggets crocantes e recheio cremoso irresistível.",
    "imagem": "assets/images/produtos/whiskas.webp",
    "badge": "Rações",
    "marca": "Whiskas",
    "apenasCard": true
  },
  {
    "id": "prod-golden-filhotes",
    "nome": "Ração Golden Cães Filhotes",
    "categoria": "caes-gatos",
    "subcategoria": "Rações",
    "descricao": "Desenvolvimento e crescimento forte e saudável para filhotes.",
    "imagem": "assets/images/produtos/goldenFilhote.webp",
    "badge": "Rações",
    "marca": "Golden",
    "apenasCard": true
  },
  {
    "id": "prod-premiatta-filhotes",
    "nome": "Ração Premiatta Filhotes",
    "categoria": "caes-gatos",
    "subcategoria": "Rações",
    "descricao": "Nutrição nobre e equilibrada para filhotes em crescimento.",
    "imagem": "assets/images/produtos/premiattaFilhote.webp",
    "badge": "Rações",
    "marca": "Premiatta",
    "apenasCard": true
  },
  {
    "id": "prod-max-filhotes",
    "nome": "Ração Max Cães Filhotes",
    "categoria": "caes-gatos",
    "subcategoria": "Rações",
    "descricao": "Crescimento saudável e alta digestibilidade para cachorros filhotes.",
    "imagem": "assets/images/produtos/maxFilhote.webp",
    "badge": "Rações",
    "marca": "Max",
    "apenasCard": true
  },
  {
    "id": "prod-ovomil-galinha",
    "nome": "Ração Ovomil para Galinhas e Codornas",
    "categoria": "porcos-galinhas",
    "subcategoria": "Criação",
    "descricao": "Ração para codornas e galinhas poedeiras de postura.",
    "imagem": "assets/images/produtos/galinha.webp",
    "badge": "Criação",
    "marca": "Ovomil",
    "apenasCard": true
  },
  {
    "id": "prod-racao-coelho",
    "nome": "Rações Criador para Coelhos e Roedores",
    "categoria": "cavalos-porquinhos",
    "subcategoria": "Roedores",
    "descricao": "Ração rica em alfafa e fibras vegetais para coelhos e porquinhos-da-índia.",
    "imagem": "assets/images/produtos/coelho.webp",
    "badge": "Roedores",
    "marca": "Criador",
    "apenasCard": true
  },
  {
    "id": "prod-top-horse-cavalo",
    "nome": "Ração Top Horse para Equinos",
    "categoria": "cavalos-porquinhos",
    "subcategoria": "Equinos",
    "descricao": "Ração com alta energia e minerais balanceados para cavalos.",
    "imagem": "assets/images/produtos/cavalo.webp",
    "badge": "Equinos",
    "marca": "Top Horse",
    "apenasCard": true
  },
  {
    "id": "prod-sal-lage-vacas",
    "nome": "Sal Mineral Lage para Bois e Vacas",
    "categoria": "cavalos-porquinhos",
    "subcategoria": "Gado e Equinos",
    "descricao": "Suplemento mineral de alta qualidade para gado de corte e leite.",
    "imagem": "assets/images/produtos/vacas.webp",
    "badge": "Suplemento",
    "marca": "Lage",
    "apenasCard": true
  },
  {
    "id": "prod-alcon-basic-peixe",
    "nome": "Ração Alcon BASIC para Peixes",
    "categoria": "caes-gatos",
    "subcategoria": "Aquarismo",
    "descricao": "Alimento completo em flocos para peixes ornamentais tropicais.",
    "imagem": "assets/images/produtos/peixe.webp",
    "badge": "Aquarismo",
    "marca": "Alcon",
    "apenasCard": true
  },
  {
    "id": "prod-pate-pedigree",
    "nome": "Patês Pedigree para Cães",
    "categoria": "caes-gatos",
    "subcategoria": "Petiscos & Patês",
    "descricao": "Alimento úmido irresistível e suculento para cachorros.",
    "imagem": "assets/images/produtos/pate.webp",
    "badge": "Petiscos",
    "marca": "Pedigree",
    "apenasCard": true
  },
  {
    "id": "prod-saches-pedigree",
    "nome": "Sachês Pedigree ao Molho",
    "categoria": "caes-gatos",
    "subcategoria": "Petiscos & Patês",
    "descricao": "Pedaços cozidos ao vapor com molho apetitoso para cães.",
    "imagem": "assets/images/produtos/saches.webp",
    "badge": "Petiscos",
    "marca": "Pedigree",
    "apenasCard": true
  },
  {
    "id": "prod-ossos-porte-grande",
    "nome": "Ossos Naturais Porte Grande",
    "categoria": "caes-gatos",
    "subcategoria": "Petiscos & Patês",
    "descricao": "Ossos mastigáveis e recreativos para cães de grande porte.",
    "imagem": "assets/images/produtos/ossosportegrande.webp",
    "badge": "Petiscos",
    "marca": "Petiscos",
    "apenasCard": true
  },
  {
    "id": "prod-ossos-porte-pequeno",
    "nome": "Ossos Naturais Porte Pequeno",
    "categoria": "caes-gatos",
    "subcategoria": "Petiscos & Patês",
    "descricao": "Ossinhos adequados para a mordida de cães pequenos.",
    "imagem": "assets/images/produtos/ossosportepequeno.webp",
    "badge": "Petiscos",
    "marca": "Petiscos",
    "apenasCard": true
  },
  {
    "id": "prod-casinhas-madeira",
    "nome": "Casinhas de Madeira para Cães",
    "categoria": "caes-gatos",
    "subcategoria": "Caminhas & Casinhas",
    "descricao": "Abrigo térmico, ventilado e resistente contra intempéries.",
    "imagem": "assets/images/produtos/casinha.webp",
    "badge": "Conforto",
    "marca": "Conforto",
    "apenasCard": true
  },
  {
    "id": "prod-caixas-transporte",
    "nome": "Transportes para Cães e Gatos",
    "categoria": "caes-gatos",
    "subcategoria": "Acessórios",
    "descricao": "Caixas de transporte seguras e confortáveis para viagens e visitas.",
    "imagem": "assets/images/produtos/transporte.webp",
    "badge": "Acessórios",
    "marca": "Acessórios",
    "apenasCard": true
  },
  {
    "id": "prod-colchoes-camas",
    "nome": "Colchões e Caminhas para Cães",
    "categoria": "caes-gatos",
    "subcategoria": "Caminhas & Casinhas",
    "descricao": "Colchões macios e anatômicos para um descanso relaxante.",
    "imagem": "assets/images/produtos/colchoes.webp",
    "badge": "Conforto",
    "marca": "Conforto",
    "apenasCard": true
  },
  {
    "id": "prod-roupinhas-pet",
    "nome": "Roupinhas para Cachorros",
    "categoria": "caes-gatos",
    "subcategoria": "Acessórios",
    "descricao": "Roupinhas térmicas em diversos tecidos e tamanhos.",
    "imagem": "assets/images/produtos/roupinha.webp",
    "badge": "Acessórios",
    "marca": "Acessórios",
    "apenasCard": true
  },
  {
    "id": "prod-brinquedos-mordedores",
    "nome": "Brinquedos e Mordedores Diversos",
    "categoria": "caes-gatos",
    "subcategoria": "Acessórios",
    "descricao": "Bolinhas, cordas e brinquedos estimulantes para pets.",
    "imagem": "assets/images/produtos/brinquedos.webp",
    "badge": "Acessórios",
    "marca": "Acessórios",
    "apenasCard": true
  },
  {
    "id": "prod-coleiras-guias",
    "nome": "Coleiras, Guias e Peitorais",
    "categoria": "caes-gatos",
    "subcategoria": "Acessórios",
    "descricao": "Coleiras resistentes e ajustáveis para passeios diários com segurança.",
    "imagem": "assets/images/produtos/coleira.webp",
    "badge": "Acessórios",
    "marca": "Acessórios",
    "apenasCard": true
  },
  {
    "id": "prod-frontline",
    "nome": "Frontline Antipulgas e Carrapatos",
    "categoria": "caes-gatos",
    "subcategoria": "Medicamentos",
    "descricao": "Pipeta de aplicação tópica rápida e duradoura contra parasitas.",
    "imagem": "assets/images/produtos/frontline.webp",
    "badge": "Medicamentos",
    "marca": "Frontline",
    "apenasCard": true
  },
  {
    "id": "prod-otovet",
    "nome": "Otovet Solução Otológica",
    "categoria": "caes-gatos",
    "subcategoria": "Medicamentos",
    "descricao": "Gotas otológicas para alívio e tratamento de otites.",
    "imagem": "assets/images/produtos/otovet.webp",
    "badge": "Medicamentos",
    "marca": "Otovet",
    "apenasCard": true
  },
  {
    "id": "prod-capstar",
    "nome": "Capstar Antipulgas Comprimidos",
    "categoria": "caes-gatos",
    "subcategoria": "Medicamentos",
    "descricao": "Ação rápida contra pulgas em cães e gatos em poucos minutos.",
    "imagem": "assets/images/produtos/capstar.webp",
    "badge": "Medicamentos",
    "marca": "Capstar",
    "apenasCard": true
  },
  {
    "id": "prod-agemoxi",
    "nome": "Agemoxi CL Antibacteriano",
    "categoria": "caes-gatos",
    "subcategoria": "Medicamentos",
    "descricao": "Antibacteriano veterinário prescrito por médicos veterinários.",
    "imagem": "assets/images/produtos/agemoxi.webp",
    "badge": "Medicamentos",
    "marca": "Agemoxi",
    "apenasCard": true
  },
  {
    "id": "prod-enrofloxacina",
    "nome": "Enrofloxacina Antimicrobiano",
    "categoria": "caes-gatos",
    "subcategoria": "Medicamentos",
    "descricao": "Antimicrobiano de amplo espectro para cães e gatos.",
    "imagem": "assets/images/produtos/enrofloxacina.webp",
    "badge": "Medicamentos",
    "marca": "Enrofloxacina",
    "apenasCard": true
  },
  {
    "id": "prod-maxicam",
    "nome": "Maxicam Anti-inflamatório",
    "categoria": "caes-gatos",
    "subcategoria": "Medicamentos",
    "descricao": "Anti-inflamatório veterinário para alívio da dor e inflamação.",
    "imagem": "assets/images/produtos/maxicam.webp",
    "badge": "Medicamentos",
    "marca": "Maxicam",
    "apenasCard": true
  },
  {
    "id": "prod-shampoo-banho",
    "nome": "Shampoos para Cães e Gatos",
    "categoria": "caes-gatos",
    "subcategoria": "Higiene",
    "descricao": "Fórmulas suaves com fragrância duradoura para o banho.",
    "imagem": "assets/images/produtos/shampoo.webp",
    "badge": "Higiene",
    "marca": "Higiene",
    "apenasCard": true
  },
  {
    "id": "prod-shampoo-antiparasitario",
    "nome": "Shampoos Antiparasitários",
    "categoria": "caes-gatos",
    "subcategoria": "Higiene",
    "descricao": "Shampoo auxiliar no controle de pulgas e carrapatos.",
    "imagem": "assets/images/produtos/antiparasitario.webp",
    "badge": "Higiene",
    "marca": "Higiene",
    "apenasCard": true
  },
  {
    "id": "prod-colonia-pet",
    "nome": "Colônias e Perfumes Pet",
    "categoria": "caes-gatos",
    "subcategoria": "Higiene",
    "descricao": "Fragrâncias suaves sem álcool agressivo para perfumar após o banho.",
    "imagem": "assets/images/produtos/colonia.webp",
    "badge": "Higiene",
    "marca": "Higiene",
    "apenasCard": true
  }
];

const ProductManager = {
  _products: [],
  _isLoaded: false,

  // Carrega produtos dinamicamente
  async loadProducts() {
    if (this._isLoaded && this._products.length > 0) {
      return this._products;
    }

    // 1. Tenta carregar da API dinâmica (que lê direto da pasta data/produtos/ no servidor)
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
      // Ignora e tenta o arquivo estático
    }

    // 2. Se a rota de API não existir (ex: hospedagem estática no Netlify), tenta o produtos.json
    try {
      const resStatic = await fetch('data/produtos.json');
      if (resStatic.ok) {
        const dataStatic = await resStatic.json();
        if (Array.isArray(dataStatic) && dataStatic.length > 0) {
          this._products = dataStatic;
          this._isLoaded = true;
          return this._products;
        }
      }
    } catch (e) {
      // Ignora e usa fallback
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
      // Filtro de categoria ou subcategoria
      if (catLower !== 'todos') {
        const prodCat = (prod.categoria || '').toLowerCase();
        const prodSub = (prod.subcategoria || '').toLowerCase();
        const prodBadge = (prod.badge || '').toLowerCase();

        const matchCat = prodCat === catLower ||
          prodSub.includes(catLower) ||
          prodBadge.includes(catLower) ||
          (catLower === 'racoes' && (prodSub.includes('ração') || prodSub.includes('racoes') || prodBadge.includes('rações'))) ||
          (catLower === 'acessorios' && prodSub.includes('acessórios')) ||
          (catLower === 'caminhas' && (prodSub.includes('casinhas') || prodSub.includes('conforto') || prodSub.includes('caminhas'))) ||
          (catLower === 'medicamentos' && prodSub.includes('medicamentos')) ||
          (catLower === 'higiene' && prodSub.includes('higiene')) ||
          (catLower === 'petiscos' && (prodSub.includes('petiscos') || prodSub.includes('patês')));

        if (!matchCat) return false;
      }

      // Filtro de busca textual
      if (!cleanQuery) return true;
      const haystack = [
        prod.nome,
        prod.descricao,
        prod.marca,
        prod.subcategoria,
        prod.badge
      ].filter(Boolean).join(' ').toLowerCase();

      return haystack.includes(cleanQuery);
    });
  },

  getWhatsAppLink(productName) {
    const base = 'https://api.whatsapp.com/send?phone=5511946457048';
    const text = `Olá, vim pelo site do Pet Shop Palmira e gostaria de saber sobre a disponibilidade e preço do produto: "${productName}".`;
    return `${base}&text=${encodeURIComponent(text)}`;
  }
};

window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
window.ProductManager = ProductManager;
