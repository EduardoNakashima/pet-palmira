/**
 * Catálogo de Produtos — Pet Shop Palmira
 * 
 * Produtos com imagens locais em /assets/images/produtos/
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

const PRODUCTS_DATA = [
  {
    id: "prod-golden-cao",
    nome: "Golden",
    descricao: "Ração para cachorros",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/golden.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-premiatta-cao",
    nome: "Premiatta",
    descricao: "Ração para cachorros",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/premiata.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-catchow",
    nome: "CatChow",
    descricao: "Ração para gatos",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/catchow.webp",
    petTypes: ["gatos", "caes-gatos"]
  },
  {
    id: "prod-golden-gato",
    nome: "Golden",
    descricao: "Ração para gatos",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/goldencat.webp",
    petTypes: ["gatos", "caes-gatos"]
  },
  {
    id: "prod-max-cao",
    nome: "Max",
    descricao: "Ração para cachorros",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/max.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-whiskas",
    nome: "Whiskas",
    descricao: "Ração para gatos",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/whiskas.webp",
    petTypes: ["gatos", "caes-gatos"]
  },
  {
    id: "prod-golden-filhotes",
    nome: "Golden Filhotes",
    descricao: "Ração para cachorros filhotes",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/goldenFilhote.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-premiatta-filhotes",
    nome: "Premiatta Filhotes",
    descricao: "Ração para cachorros filhotes",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/premiattaFilhote.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-max-filhotes",
    nome: "Max Filhotes",
    descricao: "Ração para cachorros filhotes",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/maxFilhote.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-ovomil",
    nome: "Ovomil",
    descricao: "Ração para Codornas e Galinhas",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/galinha.webp",
    petTypes: ["aves", "galinhas", "porcos-galinhas"]
  },
  {
    id: "prod-racoes-criador",
    nome: "Rações Criador",
    descricao: "Ração para Coelhos",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/coelho.webp",
    petTypes: ["coelhos", "roedores", "cavalos-porquinhos"]
  },
  {
    id: "prod-top-horse",
    nome: "Top Horse",
    descricao: "Ração para Equinos",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/cavalo.webp",
    petTypes: ["equinos", "cavalos", "cavalos-porquinhos"]
  },
  {
    id: "prod-sal-lage",
    nome: "Sal Lage",
    descricao: "Sal para Bois e Vacas",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/vacas.webp",
    petTypes: ["gado", "equinos", "cavalos-porquinhos", "porcos-galinhas"]
  },
  {
    id: "prod-alcon-basic",
    nome: "Alcon BASIC",
    descricao: "Ração para Peixes",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Rações",
    imagem: "assets/images/produtos/peixe.webp",
    petTypes: ["peixes", "outros"]
  },
  {
    id: "prod-pates-pedigree",
    nome: "Patês Pedigree",
    descricao: "Petiscos diversos",
    categoria: "petiscos",
    subcategoria: "Petiscos e Patês",
    badge: "Petiscos e Patês",
    imagem: "assets/images/produtos/pate.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-saches-pedigree",
    nome: "Sachês Pedigree",
    descricao: "Petiscos diversos",
    categoria: "petiscos",
    subcategoria: "Petiscos e Patês",
    badge: "Petiscos e Patês",
    imagem: "assets/images/produtos/saches.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-ossos-porte-grande",
    nome: "Ossos para porte grande",
    descricao: "Petiscos diversos",
    categoria: "petiscos",
    subcategoria: "Petiscos e Patês",
    badge: "Petiscos e Patês",
    imagem: "assets/images/produtos/ossosportegrande.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-ossos-porte-pequeno",
    nome: "Ossos para porte pequeno",
    descricao: "Petiscos diversos",
    categoria: "petiscos",
    subcategoria: "Petiscos e Patês",
    badge: "Petiscos e Patês",
    imagem: "assets/images/produtos/ossosportepequeno.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-casinhas-de-madeira",
    nome: "Casinhas de Madeira",
    descricao: "Casinhas diversas",
    categoria: "caminhas",
    subcategoria: "Caminhas e Colchões",
    badge: "Caminhas e Colchões",
    imagem: "assets/images/produtos/casinha.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-transportes-caes-gatos",
    nome: "Transportes para cães e gatos",
    descricao: "Casinhas diversas",
    categoria: "caminhas",
    subcategoria: "Caminhas e Colchões",
    badge: "Caminhas e Colchões",
    imagem: "assets/images/produtos/transporte.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  },
  {
    id: "prod-colchoes",
    nome: "Colchões",
    descricao: "Casinhas diversas",
    categoria: "caminhas",
    subcategoria: "Caminhas e Colchões",
    badge: "Caminhas e Colchões",
    imagem: "assets/images/produtos/colchoes.webp",
    petTypes: ["caes", "caes-gatos"]
  },
  {
    id: "prod-roupinhas",
    nome: "Roupinhas",
    descricao: "Roupinhas diversas",
    categoria: "acessorios",
    subcategoria: "Acessórios",
    badge: "Acessórios",
    imagem: "assets/images/produtos/roupinha.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  },
  {
    id: "prod-brinquedos",
    nome: "Brinquedos",
    descricao: "Brinquedos diversos",
    categoria: "acessorios",
    subcategoria: "Acessórios",
    badge: "Acessórios",
    imagem: "assets/images/produtos/brinquedos.webp",
    petTypes: ["caes", "gatos", "caes-gatos", "passaros"]
  },
  {
    id: "prod-coleiras",
    nome: "Coleiras",
    descricao: "Coleiras diversos",
    categoria: "acessorios",
    subcategoria: "Acessórios",
    badge: "Acessórios",
    imagem: "assets/images/produtos/coleira.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  },
  {
    id: "prod-frontline",
    nome: "Frontline",
    descricao: "Medicamentos diversos",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Medicamentos",
    imagem: "assets/images/produtos/frontline.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  },
  {
    id: "prod-otovet",
    nome: "Otovet",
    descricao: "Medicamentos diversos",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Medicamentos",
    imagem: "assets/images/produtos/otovet.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  },
  {
    id: "prod-capstar",
    nome: "Capstar",
    descricao: "Medicamentos diversos",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Medicamentos",
    imagem: "assets/images/produtos/capstar.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  },
  {
    id: "prod-agemoxi-cl",
    nome: "Agemoxi CL",
    descricao: "Medicamentos diversos",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Medicamentos",
    imagem: "assets/images/produtos/agemoxi.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  },
  {
    id: "prod-enrofloxacina",
    nome: "Enrofloxacina",
    descricao: "Medicamentos diversos",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Medicamentos",
    imagem: "assets/images/produtos/enrofloxacina.webp",
    petTypes: ["caes", "gatos", "caes-gatos", "aves", "passaros"]
  },
  {
    id: "prod-maxicam",
    nome: "Maxicam",
    descricao: "Medicamentos diversos",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Medicamentos",
    imagem: "assets/images/produtos/maxicam.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  },
  {
    id: "prod-shampoos",
    nome: "Shampoos",
    descricao: "Produtos de Higiene",
    categoria: "higiene",
    subcategoria: "Higiene",
    badge: "Higiene",
    imagem: "assets/images/produtos/shampoo.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  },
  {
    id: "prod-shampoos-antiparasitarios",
    nome: "Shampoos antiparasitários",
    descricao: "Produtos de Higiene",
    categoria: "higiene",
    subcategoria: "Higiene",
    badge: "Higiene",
    imagem: "assets/images/produtos/antiparasitario.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  },
  {
    id: "prod-colonias",
    nome: "Colonias",
    descricao: "Produtos de Higiene",
    categoria: "higiene",
    subcategoria: "Higiene",
    badge: "Higiene",
    imagem: "assets/images/produtos/colonia.webp",
    petTypes: ["caes", "gatos", "caes-gatos"]
  }
];

const ProductManager = {
  getAllProducts() {
    return PRODUCTS_DATA;
  },

  getFilteredProducts(category = 'todos', query = '', pageContext = '') {
    const cleanQuery = query.toLowerCase().trim();
    const catLower = category.toLowerCase().trim();

    return PRODUCTS_DATA.filter(prod => {
      // Filtro de contexto de página de animal específico
      if (pageContext && pageContext !== 'todos') {
        const types = prod.petTypes || [];
        if (pageContext === 'caes-gatos') {
          if (!types.includes('caes') && !types.includes('gatos') && !types.includes('caes-gatos')) return false;
        } else if (pageContext === 'passaros') {
          if (!types.includes('passaros') && !types.includes('aves')) return false;
        } else if (pageContext === 'cavalos-porquinhos') {
          if (!types.includes('cavalos') && !types.includes('equinos') && !types.includes('coelhos') && !types.includes('roedores') && !types.includes('cavalos-porquinhos')) return false;
        } else if (pageContext === 'porcos-galinhas') {
          if (!types.includes('porcos') && !types.includes('galinhas') && !types.includes('gado') && !types.includes('porcos-galinhas')) return false;
        }
      }

      // Filtro de categoria selecionada nas abas
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
    const base = 'https://api.whatsapp.com/send?phone=5511974605359';
    const text = 'Olá, vim pelo site do Pet Shop Palmira e gostaria de saber sobre a disponibilidade e preço do produto: "' + productName + '".';
    return base + '&text=' + encodeURIComponent(text);
  }
};

window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
window.ProductManager = ProductManager;
