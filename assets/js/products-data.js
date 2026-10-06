/**
 * Catálogo de Produtos — Pet Shop Palmira
 * 
 * Fonte canônica de dados dos produtos com imagens locais em /assets/images/produtos/
 */

const PET_TYPES_FILTER = [
  { id: 'todos', nome: 'Todos os Pets', icon: '🐾' },
  { id: 'caes', nome: 'Cães', icon: '🐶' },
  { id: 'gatos', nome: 'Gatos', icon: '🐱' },
  { id: 'passaros', nome: 'Pássaros & Aves', icon: '🦜' },
  { id: 'cavalos-porquinhos', nome: 'Cavalos & Roedores', icon: '🐴🐹' },
  { id: 'porcos-galinhas', nome: 'Criação & Gado', icon: '🐷🐔' }
];

const PRODUCT_CATEGORIES = [
  { id: 'todos', nome: 'Todas as Categorias', icon: '✨' },
  { id: 'racoes', nome: 'Rações', icon: '🥣' },
  { id: 'petiscos', nome: 'Petiscos e Patês', icon: '🍖' },
  { id: 'medicamentos', nome: 'Medicamentos & Antipulgas', icon: '💊' },
  { id: 'higiene', nome: 'Higiene & Banho', icon: '🧼' },
  { id: 'caminhas', nome: 'Caminhas & Transporte', icon: '🛏️' },
  { id: 'acessorios', nome: 'Acessórios & Brinquedos', icon: '🎾' }
];

const PRODUCTS_DATA = [
  {
    id: "prod-golden-cao",
    nome: "Golden Formula Adultos",
    descricao: "Ração Premium Especial sabor Frango e Arroz para cães adultos de todos os portes.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Cães Adultos",
    imagem: "assets/images/produtos/golden.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "golden formula adultos cao caes cachorro cachorros racao racoes frango arroz premium especial premier"
  },
  {
    id: "prod-premiatta-cao",
    nome: "Premiatta Classic Cães",
    descricao: "Ração Super Premium de alta digestibilidade e saúde articular para cães adultos.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Super Premium",
    imagem: "assets/images/produtos/premiata.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "premiatta classic cao caes cachorro cachorros racao racoes super premium alta digestibilidade"
  },
  {
    id: "prod-catchow",
    nome: "CatChow Peixe e Frango",
    descricao: "Ração completa para gatos adultos com Defense Plus e controle de bolas de pelo.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Gatos Adultos",
    imagem: "assets/images/produtos/catchow.webp",
    petTypes: ["gatos", "caes-gatos"],
    keywords: "catchow purina cat chow gato gatos felino felinos racao racoes peixe frango defense plus bola pelo"
  },
  {
    id: "prod-golden-gato",
    nome: "Golden Gatos Salmão",
    descricao: "Ração Premium Especial rica em ômegas para pelagem brilhante e trato urinário saudável.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Gatos Adultos",
    imagem: "assets/images/produtos/goldencat.webp",
    petTypes: ["gatos", "caes-gatos"],
    keywords: "golden gatos salmao salmão gato felino felinos racao racoes premium especial trato urinario pelagem"
  },
  {
    id: "prod-max-cao",
    nome: "Max Professional Line",
    descricao: "Ração nutritiva para cães adultos com proteínas selecionadas e livre de corantes artificiais.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Cães Adultos",
    imagem: "assets/images/produtos/max.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "max professional line total alimentos cao caes cachorro cachorros racao racoes sem corantes adulto"
  },
  {
    id: "prod-whiskas",
    nome: "Whiskas Carne e Peixe",
    descricao: "Ração saborosa com pedaços crocantes e recheados de alta aceitação para gatos adultos.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Gatos Adultos",
    imagem: "assets/images/produtos/whiskas.webp",
    petTypes: ["gatos", "caes-gatos"],
    keywords: "whiskas carne peixe gato gatos felino felinos racao racoes crocante recheado wiskas"
  },
  {
    id: "prod-golden-filhotes",
    nome: "Golden Filhotes Frango",
    descricao: "Ração Premium Especial desenvolvida para o crescimento forte e saudável de cães filhotes.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Cães Filhotes",
    imagem: "assets/images/produtos/goldenFilhote.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "golden filhotes frango cao caes cachorro cachorros filhote filhotinho racao racoes crescimento premier"
  },
  {
    id: "prod-premiatta-filhotes",
    nome: "Premiatta Filhotes",
    descricao: "Ração Super Premium com DHA para o desenvolvimento cerebral e ósseo ideal de filhotes.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Cães Filhotes",
    imagem: "assets/images/produtos/premiattaFilhote.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "premiatta filhotes cao caes cachorro cachorros filhote super premium dha osseo crescimento"
  },
  {
    id: "prod-max-filhotes",
    nome: "Max Filhotes Crescimento",
    descricao: "Ração completa com cálcio e proteínas de alta qualidade para cães filhotes no pós-desmame.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Cães Filhotes",
    imagem: "assets/images/produtos/maxFilhote.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "max filhotes cao caes cachorro cachorros filhote filhotinho leite calcio crescimento racao"
  },
  {
    id: "prod-ovomil",
    nome: "Ovomil Postura & Criação",
    descricao: "Ração balanceada com cálcio e minerais para galinhas poedeiras, codornas e aves de criação.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Galinhas & Codornas",
    imagem: "assets/images/produtos/galinha.webp",
    petTypes: ["galinhas", "porcos-galinhas", "criacao", "aves", "passaros"],
    keywords: "ovomil postura galinha galinhas codorna codornas aves frango pintinho criacao ovos postura racao granja ave passaro"
  },
  {
    id: "prod-racoes-criador",
    nome: "Ração Criador para Coelhos",
    descricao: "Ração peletizada rica em fibras e alfafa para coelhos, porquinhos-da-índia e roedores.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Coelhos & Roedores",
    imagem: "assets/images/produtos/coelho.webp",
    petTypes: ["coelhos", "roedores", "cavalos-porquinhos"],
    keywords: "criador racoes coelho coelhos porquinho porquinhos da india roedor roedores alfafa peletizada fibra chinchila hamster"
  },
  {
    id: "prod-top-horse",
    nome: "Top Horse Equinos",
    descricao: "Ração energética de alta digestibilidade e nutrientes para cavalos de passeio e trabalho.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Cavalos & Equinos",
    imagem: "assets/images/produtos/cavalo.webp",
    petTypes: ["cavalos", "equinos", "cavalos-porquinhos"],
    keywords: "top horse cavalo cavalos equino equinos egua potro racao trabalho forca energia equestre montaria"
  },
  {
    id: "prod-sal-lage",
    nome: "Sal Lage Mineral",
    descricao: "Sal mineralizado com fósforo e micronutrientes para gado, vacas, bois e animais de pasto.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Gado & Bovinos",
    imagem: "assets/images/produtos/vacas.webp",
    petTypes: ["gado", "equinos", "cavalos-porquinhos", "porcos-galinhas", "criacao"],
    keywords: "sal lage mineral gado boi bois vaca vacas bezerro bovino pasto corte leite mineralizado cocho criacao"
  },
  {
    id: "prod-alcon-basic",
    nome: "Alcon BASIC Peixes",
    descricao: "Alimento completo em flocos enriquecido com vitaminas para peixes de aquário e água doce.",
    categoria: "racoes",
    subcategoria: "Rações",
    badge: "Peixes & Aquário",
    imagem: "assets/images/produtos/peixe.webp",
    petTypes: ["peixes", "outros"],
    keywords: "alcon basic peixe peixes aquario aquarismo flocos racao alimento bettas kinguios agua doce outros"
  },
  {
    id: "prod-pates-pedigree",
    nome: "Patê Pedigree Cães",
    descricao: "Alimento úmido completo e saboroso com pedaços cozidos no vapor para cães adultos.",
    categoria: "petiscos",
    subcategoria: "Petiscos e Patês",
    badge: "Patês & Úmidos",
    imagem: "assets/images/produtos/pate.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "pate pates pedigree lata comida umida cao caes cachorro cachorros carne frango petisco vapor pedrigree"
  },
  {
    id: "prod-saches-pedigree",
    nome: "Sachê Pedigree ao Molho",
    descricao: "Refeição úmida balanceada em sachê com pedaços macios e caldo suculento para cães.",
    categoria: "petiscos",
    subcategoria: "Petiscos e Patês",
    badge: "Sachês Suculentos",
    imagem: "assets/images/produtos/saches.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "sache saches pedigree molho carne frango cordeiro cao caes cachorro cachorros sachê petisco pedrigree"
  },
  {
    id: "prod-ossos-porte-grande",
    nome: "Osso Mastigável Porte Grande",
    descricao: "Osso natural e resistente para fortalecimento dos dentes e alívio do estresse de cães médios e grandes.",
    categoria: "petiscos",
    subcategoria: "Petiscos e Patês",
    badge: "Ossos Mastigáveis",
    imagem: "assets/images/produtos/ossosportegrande.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "osso ossos mastigavel natural grande porte medio grande cao caes cachorro cachorros dente tartaro mordedor petisco"
  },
  {
    id: "prod-ossos-porte-pequeno",
    nome: "Osso Mastigável Porte Pequeno",
    descricao: "Petisco mastigável para higiene bucal, palatável e seguro para cães de pequeno porte e filhotes.",
    categoria: "petiscos",
    subcategoria: "Petiscos e Patês",
    badge: "Ossos Mastigáveis",
    imagem: "assets/images/produtos/ossosportepequeno.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "osso ossos mastigavel pequeno porte mini filhote cao caes cachorro cachorros dental dentes petisco palito"
  },
  {
    id: "prod-casinhas-de-madeira",
    nome: "Casinha de Madeira Tratada",
    descricao: "Casa resistente às intempéries, com teto térmico e isolamento do solo para cães no quintal.",
    categoria: "caminhas",
    subcategoria: "Caminhas e Colchões",
    badge: "Casinhas & Abrigo",
    imagem: "assets/images/produtos/casinha.webp",
    petTypes: ["caes", "caes-gatos"],
    keywords: "casinha casinhas madeira tratada teto quintal abrigo conforto cao caes cachorro cachorros canil casa abrigo"
  },
  {
    id: "prod-transportes-caes-gatos",
    nome: "Caixa de Transporte SafeTrip",
    descricao: "Caixa plástica reforçada com porta de ferro e ventilação para viagens seguras de cães e gatos.",
    categoria: "caminhas",
    subcategoria: "Caminhas e Colchões",
    badge: "Transporte Seguro",
    imagem: "assets/images/produtos/transporte.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "caixa transporte caixas transportes viagem passeio veterinario carro aviao cao caes cachorro gato gatos caixa de transporte"
  },
  {
    id: "prod-colchoes",
    nome: "Colchões & Caminhas Almofadadas",
    descricao: "Colchonete confortável com tecido impermeável e lavável para sono tranquilo e acolhedor do pet.",
    categoria: "caminhas",
    subcategoria: "Caminhas e Colchões",
    badge: "Conforto Térmico",
    imagem: "assets/images/produtos/colchoes.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "colchao colchoes caminha caminhas almofada colchonete sono descanso impermeavel cao cachorro gato conforto"
  },
  {
    id: "prod-roupinhas",
    nome: "Roupinhas Térmicas & Capinhas",
    descricao: "Roupas de frio macias e confortáveis em diversos tamanhos para aquecer cães e gatos no inverno.",
    categoria: "acessorios",
    subcategoria: "Acessórios",
    badge: "Moda Pet",
    imagem: "assets/images/produtos/roupinha.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "roupinha roupinhas capa capinha sueter casaco inverno frio la tecido cao cachorro gato felino moda pet"
  },
  {
    id: "prod-brinquedos",
    nome: "Brinquedos Interativos & Mordedores",
    descricao: "Bolinhas, cordas com nós, mordedores resistentes e brinquedos com guizo para cães, gatos e pássaros.",
    categoria: "acessorios",
    subcategoria: "Acessórios",
    badge: "Diversão & Estímulo",
    imagem: "assets/images/produtos/brinquedos.webp",
    petTypes: ["caes", "gatos", "caes-gatos", "passaros", "aves"],
    keywords: "brinquedo brinquedos bolinha corda no mordedor borracha guizo sino passaro ave calopsita gato cao cachorro mordedor"
  },
  {
    id: "prod-coleiras",
    nome: "Coleiras, Guias & Peitorais",
    descricao: "Conjuntos de passeio com fecho seguro e regulagem para caminhadas tranquilas no bairro.",
    categoria: "acessorios",
    subcategoria: "Acessórios",
    badge: "Passeio & Segurança",
    imagem: "assets/images/produtos/coleira.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "coleira coleiras guia guias peitoral peitorais enforcador passeio seguranca fecho cao cachorro gato peitoral"
  },
  {
    id: "prod-frontline",
    nome: "Frontline Plus Antipulgas",
    descricao: "Pipeta de aplicação tópica contra pulgas, carrapatos e piolhos mastigadores em cães e gatos.",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Antipulgas & Carrapatos",
    imagem: "assets/images/produtos/frontline.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "frontline plus pipeta antipulgas anti pulgas carrapatos carrapato piolho protecao cao cachorro gato remedio medicamento antipulga"
  },
  {
    id: "prod-otovet",
    nome: "Otovet Solução Otológica",
    descricao: "Gotas auriculares com ação antibacteriana, antifúngica e anti-inflamatória para otites em cães e gatos.",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Saúde Auricular",
    imagem: "assets/images/produtos/otovet.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "otovet gotas ouvido orelha otite infeccao bacteriana fungo antiinflamatorio cao cachorro gato remedio medicamento dor coceira"
  },
  {
    id: "prod-capstar",
    nome: "Capstar Comprimidos",
    descricao: "Comprimido oral de ação ultrarrápida que elimina pulgas adultas a partir de 15 minutos em cães e gatos.",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Ação Rápida",
    imagem: "assets/images/produtos/capstar.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "capstar comprimido pulga pulgas oral rapido 15 minutos coceira cao cachorro gato novartis elanco remedio medicamento antipulgas"
  },
  {
    id: "prod-agemoxi-cl",
    nome: "Agemoxi CL Comprimidos",
    descricao: "Antibiótico potente à base de amoxicilina e ácido clavulânico para infecções em cães e gatos.",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Antibiótico",
    imagem: "assets/images/produtos/agemoxi.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "agemoxi cl amoxicilina clavulanato antibiotico infeccao bacteriana pele respiratoria ferida cao cachorro gato remedio medicamento"
  },
  {
    id: "prod-enrofloxacina",
    nome: "Enrofloxacina 50mg",
    descricao: "Antimicrobiano de amplo espectro para infecções bacterianas em cães, gatos e aves ornamentais.",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Amplo Espectro",
    imagem: "assets/images/produtos/enrofloxacina.webp",
    petTypes: ["caes", "gatos", "caes-gatos", "passaros", "aves"],
    keywords: "enrofloxacina enrofloxacino antimicrobiano antibiotico bacterias trato respiratorio urinario digestivo cao cachorro gato passaro ave aves remedio medicamento"
  },
  {
    id: "prod-maxicam",
    nome: "Maxicam Anti-inflamatório",
    descricao: "Meloxicam em comprimidos para alívio de dores inflamatórias, pós-operatório e problemas articulares.",
    categoria: "medicamentos",
    subcategoria: "Medicamentos",
    badge: "Anti-inflamatório",
    imagem: "assets/images/produtos/maxicam.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "maxicam meloxicam antiinflamatorio dor analgesico articulacao pos operatorio trauma cao cachorro gato ourofino remedio medicamento"
  },
  {
    id: "prod-shampoos",
    nome: "Shampoo & Condicionador Pet",
    descricao: "Fórmula neutra e suave para limpeza profunda, hidratação e desembaraço de pelos de cães e gatos.",
    categoria: "higiene",
    subcategoria: "Higiene",
    badge: "Banho & Pelagem",
    imagem: "assets/images/produtos/shampoo.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "shampoo xampu condicionador banho higiene pelo pelos pelagem brilho maciez desembaraço cao cachorro gato filhote"
  },
  {
    id: "prod-shampoos-antiparasitarios",
    nome: "Shampoo Antiparasitário",
    descricao: "Shampoo medicinal para controle e prevenção de pulgas, carrapatos e sarnas durante o banho.",
    categoria: "higiene",
    subcategoria: "Higiene",
    badge: "Banho Medicinal",
    imagem: "assets/images/produtos/antiparasitario.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "shampoo xampu antiparasitario medicinal pulga pulgas carrapato carrapatos sarna banho medicado tratamento cao cachorro gato antipulga"
  },
  {
    id: "prod-colonias",
    nome: "Colônia & Perfume Pet",
    descricao: "Fragrância suave e fixação duradoura que elimina odores sem agredir o olfato sensível do pet.",
    categoria: "higiene",
    subcategoria: "Higiene",
    badge: "Perfumaria Pet",
    imagem: "assets/images/produtos/colonia.webp",
    petTypes: ["caes", "gatos", "caes-gatos"],
    keywords: "colonia perfume fragrancia cheiro bom banho e tosa desodorante sem alcool cao cachorro gato filhote cheirinho"
  }
];

// Função auxiliar para normalização de acentos na busca
function normalizeSearchText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

const ProductManager = {
  getAllProducts() {
    return PRODUCTS_DATA;
  },

  getFilteredProducts(selectedPet = 'todos', selectedCategory = 'todos', query = '') {
    const cleanQuery = normalizeSearchText(query);
    const petFilter = (selectedPet || 'todos').toLowerCase().trim();
    const catFilter = (selectedCategory || 'todos').toLowerCase().trim();

    return PRODUCTS_DATA.filter(prod => {
      const types = prod.petTypes || [];
      const prodCat = (prod.categoria || '').toLowerCase().trim();

      // 1. Filtro por Pet (Animal)
      if (petFilter !== 'todos') {
        if (petFilter === 'caes') {
          if (!types.includes('caes')) return false;
        } else if (petFilter === 'gatos') {
          if (!types.includes('gatos')) return false;
        } else if (petFilter === 'caes-gatos') {
          if (!types.includes('caes') && !types.includes('gatos') && !types.includes('caes-gatos')) return false;
        } else if (petFilter === 'passaros') {
          if (!types.includes('passaros') && !types.includes('aves')) return false;
        } else if (petFilter === 'cavalos-porquinhos') {
          if (!types.includes('cavalos') && !types.includes('equinos') && !types.includes('coelhos') && !types.includes('roedores') && !types.includes('cavalos-porquinhos')) return false;
        } else if (petFilter === 'porcos-galinhas') {
          if (!types.includes('porcos') && !types.includes('galinhas') && !types.includes('gado') && !types.includes('porcos-galinhas') && !types.includes('criacao')) return false;
        }
      }

      // 2. Filtro por Categoria do Produto
      if (catFilter !== 'todos' && catFilter !== 'todas') {
        if (prodCat !== catFilter) return false;
      }

      // 3. Filtro por Busca Textual (com múltiplos termos e sem acentos)
      if (cleanQuery) {
        const haystack = normalizeSearchText([
          prod.nome,
          prod.descricao,
          prod.subcategoria,
          prod.badge,
          prod.keywords
        ].filter(Boolean).join(' '));

        const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);
        const matchesAllTerms = queryTerms.every(term => haystack.includes(term));
        if (!matchesAllTerms) return false;
      }

      return true;
    });
  },

  getWhatsAppLink(productName) {
    const base = 'https://api.whatsapp.com/send?phone=5511974605359';
    const text = 'Olá, vim pelo site do Pet Shop Palmira e gostaria de consultar a disponibilidade e o valor do produto: "' + productName + '".';
    return base + '&text=' + encodeURIComponent(text);
  }
};

window.PET_TYPES_FILTER = PET_TYPES_FILTER;
window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
window.ProductManager = ProductManager;
window.normalizeSearchText = normalizeSearchText;
