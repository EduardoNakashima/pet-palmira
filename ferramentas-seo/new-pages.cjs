// Conteúdo das 10 páginas planejadas que não existiam (Flor da Montanha e Torres Tibagy).
// Gera data/<slug>.json no mesmo formato do extract.cjs.
const fs = require('fs');
const path = require('path');
const OUT = process.argv[2];

const ENTREGA = 'Lembramos que fazemos entrega somente combinando o local por ligação antecipadamente pelo telefone (11) 2451-1719 ou ligação via WhatsApp (11) 97460-5359. Na ligação confirmamos se o seu endereço está dentro da nossa área de atendimento, num raio aproximado de 10 km do Jardim Palmira.';
const HORARIO = { q: 'Qual o horário de funcionamento da loja?', a: 'Atendemos de segunda a sábado, das 09h às 18h, na Av. Pedro de Souza Lopes, 33B, Jardim Palmira, Guarulhos. Aos domingos e feriados a loja fica fechada.' };
const PAGAMENTO = { q: 'Quais formas de pagamento vocês aceitam?', a: 'Aceitamos Pix, cartões de débito e crédito das principais bandeiras e dinheiro. Sem taxa extra para pagamentos eletrônicos.' };
const entregaFaq = b => ({ q: `Vocês fazem entrega no ${b}?`, a: `Fazemos entrega somente combinando o local por ligação antecipadamente pelo telefone (11) 2451-1719 ou ligação via WhatsApp. Atendemos o Jardim Palmira e bairros próximos num raio aproximado de 10 km; na ligação confirmamos se o seu endereço no ${b} está dentro dessa área.` });

const bairros = [
  { slug: 'flor-da-montanha', nome: 'Jardim Flor da Montanha', curto: 'Flor da Montanha', petshop: 'pet-shop-jardim-flor-da-montanha', base: 91 },
  { slug: 'torres-tibagy', nome: 'Torres Tibagy', curto: 'Torres Tibagy', petshop: 'pet-shop-torres-tibagy-guarulhos', base: 96 },
];

const pages = [];
for (const b of bairros) {
  const N = b.nome, C = b.curto;
  const kwPet = b.slug === 'flor-da-montanha' ? 'pet shop Jardim Flor da Montanha' : 'pet shop Torres Tibagy Guarulhos';

  pages.push({
    slug: b.petshop, keyword: kwPet, numero: b.base,
    title: `${kwPet.replace(/^pet shop/, 'Pet Shop')} | Pet Shop Palmira`,
    description: `Procurando ${kwPet}? O Pet Shop Palmira atende moradores do ${C} há 25 anos com ração, farmácia veterinária, acessórios e entrega combinada por ligação.`,
    ogDescription: `Ração, medicamentos, acessórios e banho e tosa para cães perto do ${N}, em Guarulhos.`,
    badge: `Atendimento para o ${C}`,
    h1: `Pet shop ${N}: <span class="acc">ração, farmácia e acessórios com atendimento de bairro</span>`,
    intro: [
      `Quem mora no <strong>${N}</strong>, em Guarulhos, e procura um <strong>${kwPet}</strong> de confiança encontra no Pet Shop Palmira um atendimento familiar, feito por quem cuida dos pets da região há 25 anos.`,
      `Na nossa loja da Av. Pedro de Souza Lopes, 33B, no Jardim Palmira, você encontra rações das principais marcas, medicamentos veterinários, acessórios e produtos para cães, gatos, pássaros, roedores e animais de criação, com preço acessível e orientação de verdade.`,
    ],
    body: [
      { type: 'h2', text: `Por que escolher o Pet Shop Palmira morando no ${C}?` },
      { type: 'p', html: `Um pet shop de bairro faz diferença no dia a dia: você conversa com quem conhece os produtos, tira dúvidas sobre a ração certa para a idade e o porte do seu animal e não depende de transportadora para receber o que precisa.` },
      { type: 'p', html: `Atendemos famílias do <strong>${N}</strong> e de outros bairros de Guarulhos com a mesma atenção que damos aos vizinhos do Jardim Palmira. Se o produto não estiver na prateleira, encomendamos com nossos fornecedores de confiança.` },
      { type: 'cards', items: [
        { title: '🥣 Rações', text: 'Premier, Golden, Magnus, Special Dog, Pedigree, Whiskas, Royal Canin e outras marcas, para filhotes, adultos e idosos.' },
        { title: '💊 Farmácia veterinária', text: 'Antipulgas, vermífugos e medicamentos prescritos, como Frontline, Capstar, Otovet, Agemoxi e Maxicam.' },
        { title: '🛁 Banho e tosa para cães', text: 'Banho com água morna, tosa higiênica e tosa geral na máquina. Você traz o cão até a loja no horário agendado.' },
        { title: '🩺 Veterinários parceiros', text: 'Indicamos profissionais e clínicas parceiras de confiança em Guarulhos para consultas, vacinas e exames.' },
      ] },
      { type: 'h2', text: `O que você encontra no nosso pet shop` },
      { type: 'ul', items: [
        '<strong>Cães e gatos:</strong> rações secas, sachês, patês, petiscos, areia, tapete higiênico, shampoo, comedouros e bebedouros.',
        '<strong>Acessórios:</strong> coleiras, guias, peitorais, caminhas, casinhas, caixas de transporte e brinquedos.',
        '<strong>Pássaros:</strong> rações, misturas de sementes, brinquedos e acessórios.',
        '<strong>Cavalos e porquinhos-da-índia:</strong> rações e acessórios para cada espécie.',
        '<strong>Porcos e galinhas:</strong> ração para criação, direto na loja do bairro.',
      ] },
      { type: 'highlight', title: `Entrega para o ${C}`, text: ENTREGA },
      { type: 'h2', text: 'Como comprar' },
      { type: 'ol', items: [
        '<strong>Consulte pelo WhatsApp:</strong> envie a marca, o peso ou a foto do produto que você procura para (11) 97460-5359.',
        '<strong>Confirme valores e disponibilidade:</strong> nossa equipe responde com as opções em estoque.',
        '<strong>Retire ou combine a entrega:</strong> passe na loja ou combine o local da entrega por ligação antecipadamente.',
      ] },
    ],
    faq: [entregaFaq(N), { q: 'Vocês fazem banho e tosa em gatos?', a: 'Não. O serviço de banho e tosa é exclusivo para cães, com tosa na máquina (não fazemos tosa na tesoura) e sem táxi dog: o tutor traz o cão até a loja e avisamos quando estiver pronto.' }, PAGAMENTO, HORARIO],
    slides: ['organico/loja.webp', 'produtos/golden.webp', 'produtos/frontline.webp', 'produtos/casinha.webp'],
  });

  pages.push({
    slug: `racao-para-cachorro-${b.slug}`, keyword: `ração para cachorro ${C}`, numero: b.base + 1,
    title: `Ração para Cachorro ${C} | Pet Shop Palmira`,
    description: `Ração para cachorro no ${C}: Golden, Premier, Special Dog, Magnus, Pedigree e Royal Canin no Pet Shop Palmira. Entrega combinada por ligação. Consulte!`,
    ogDescription: `Rações para filhotes, adultos e idosos de todos os portes para quem mora no ${N}, em Guarulhos.`,
    badge: `Nutrição Canina no ${C}`,
    h1: `Ração para cachorro ${C}: <span class="acc">marcas de confiança para cada fase do seu cão</span>`,
    intro: [
      `Escolher a <strong>ração para cachorro</strong> certa é uma das decisões mais importantes para a saúde do seu cão. Para quem mora no <strong>${N}</strong>, o Pet Shop Palmira oferece rações para filhotes, adultos e idosos, de raças pequenas a grandes.`,
      `Trabalhamos com marcas em que confiamos, como Premier, Golden, Magnus, Special Dog, Pedigree e Royal Canin. A disponibilidade pode variar conforme o estoque, e você confirma tudo pelo WhatsApp antes de vir à loja.`,
    ],
    body: [
      { type: 'h2', text: 'Como escolher a ração ideal para o seu cachorro' },
      { type: 'p', html: 'A ração deve combinar com a <strong>fase de vida</strong>, o <strong>porte</strong> e o <strong>nível de atividade</strong> do cão. Filhotes precisam de mais energia e nutrientes para o crescimento; adultos, de equilíbrio para manter o peso; e cães idosos, de fórmulas que ajudam articulações e digestão.' },
      { type: 'table', head: ['Fase do cão', 'O que observar na ração', 'Exemplos na loja'], rows: [
        ['Filhote', 'Grãos menores, mais proteína e energia', 'Golden Filhote, Premiatta Filhote, Max Filhote'],
        ['Adulto', 'Equilíbrio entre proteína, gordura e fibras', 'Golden Formula, Premiatta Classic, Max Professional'],
        ['Idoso', 'Menos calorias e cuidado com articulações', 'Consulte as linhas sênior disponíveis'],
      ] },
      { type: 'highlight', title: 'Troca de ração sem desconforto', text: 'Ao mudar de ração, faça a transição aos poucos, ao longo de 7 a 10 dias, misturando a ração nova à antiga em proporções crescentes. Isso evita diarreia e recusa do alimento.' },
      { type: 'h2', text: 'Sacos pequenos ou grandes?' },
      { type: 'p', html: 'Para cães de médio e grande porte, ou para quem tem mais de um cachorro, os sacos de 15 kg e 20 kg costumam sair mais em conta por quilo. Para raças pequenas, embalagens menores ajudam a manter a ração sempre fresca depois de aberta.' },
      { type: 'highlight', title: `Entrega para o ${C}`, text: ENTREGA },
    ],
    faq: [
      { q: 'Qual ração é melhor para o meu cachorro?', a: 'Depende da idade, do porte e da saúde do cão. Mande pelo WhatsApp a raça, a idade e o peso do seu cachorro que nossa equipe indica as opções em estoque. Para cães com problemas de saúde, siga sempre a orientação do médico veterinário.' },
      { q: 'Posso encomendar uma marca que não está na prateleira?', a: 'Sim! Se não tivermos a ração a pronta entrega, encomendamos com nossos fornecedores de confiança com rapidez.' },
      entregaFaq(N), PAGAMENTO,
    ],
    slides: ['organico/racaoparacachorro.webp', 'produtos/golden.webp', 'produtos/premiata.webp', 'produtos/max.webp'],
  });

  pages.push({
    slug: `racao-para-gato-${b.slug}`, keyword: `ração para gato ${C}`, numero: b.base + 2,
    title: `Ração para Gato ${C} | Pet Shop Palmira`,
    description: `Ração para gato no ${C}: Golden Gatos, CatChow, Whiskas, Premier e Royal Canin, além de sachês e areia. Pet Shop Palmira, entrega combinada por ligação.`,
    ogDescription: `Rações secas, sachês e areia higiênica para gatos de quem mora no ${N}, em Guarulhos.`,
    badge: `Nutrição Felina no ${C}`,
    h1: `Ração para gato ${C}: <span class="acc">rações secas, sachês e cuidados para felinos</span>`,
    intro: [
      `Gatos são exigentes com a comida, e a <strong>ração para gato</strong> certa ajuda a cuidar do trato urinário, do peso e da pelagem. Para os tutores do <strong>${N}</strong>, o Pet Shop Palmira reúne rações secas, sachês, patês e areia higiênica.`,
      `Trabalhamos com marcas como Golden Gatos, CatChow, Whiskas, Premier e Royal Canin, com opções para filhotes, adultos e gatos castrados. A disponibilidade pode variar conforme o estoque.`,
    ],
    body: [
      { type: 'h2', text: 'O que considerar na ração do seu gato' },
      { type: 'ul', items: [
        '<strong>Castrados:</strong> fórmulas com controle calórico ajudam a evitar o ganho de peso depois da castração.',
        '<strong>Trato urinário:</strong> rações com minerais balanceados contribuem para a saúde dos rins e da bexiga.',
        '<strong>Bolas de pelo:</strong> fibras específicas ajudam na eliminação natural dos pelos ingeridos.',
        '<strong>Filhotes:</strong> precisam de grãos menores e mais nutrientes para crescer.',
      ] },
      { type: 'h2', text: 'Ração seca e sachê: por que combinar?' },
      { type: 'p', html: 'Muitos gatos bebem pouca água. Oferecer <strong>sachês e patês</strong> junto com a ração seca aumenta a hidratação e deixa a alimentação mais variada. Temos unidades avulsas para você testar os sabores preferidos do seu gato.' },
      { type: 'cards', items: [
        { title: '🐟 Rações secas', text: 'Golden Gatos, CatChow, Whiskas e outras linhas para adultos, filhotes e castrados.' },
        { title: '🥫 Sachês e patês', text: 'Alimentos úmidos para variar o cardápio e reforçar a hidratação.' },
        { title: '🧺 Areia higiênica', text: 'Areias para manter a caixa limpa e o ambiente sem odor.' },
      ] },
      { type: 'highlight', title: `Entrega para o ${C}`, text: ENTREGA },
    ],
    faq: [
      { q: 'Qual ração indicar para gato castrado?', a: 'Rações específicas para castrados têm menos calorias e cuidam do trato urinário, como a linha Golden Gatos Castrados. Mande a idade e o peso do seu gato pelo WhatsApp que indicamos as opções em estoque.' },
      { q: 'Vocês vendem sachês avulsos?', a: 'Sim! Temos sachês e patês em unidades avulsas. Caixas fechadas você consulta pelo WhatsApp.' },
      entregaFaq(N), HORARIO,
    ],
    slides: ['organico/cachorroegato.webp', 'produtos/goldencat.webp', 'produtos/catchow.webp', 'produtos/saches.webp'],
  });

  pages.push({
    slug: `produtos-para-pets-${b.slug}`, keyword: `produtos para pets ${C}`, numero: b.base + 3,
    title: `Produtos para Pets ${C} | Pet Shop Palmira`,
    description: `Produtos para pets no ${C}: ração, petiscos, higiene, medicamentos e acessórios para cães, gatos, pássaros e roedores. Pet Shop Palmira, há 25 anos em Guarulhos.`,
    ogDescription: `Tudo para o seu pet em um só lugar, perto do ${N}, em Guarulhos.`,
    badge: `Variedade para o ${C}`,
    h1: `Produtos para pets ${C}: <span class="acc">tudo para o seu bicho em um só lugar</span>`,
    intro: [
      `Ração, petisco, shampoo, remédio, brinquedo, caminha: encontrar todos os <strong>produtos para pets</strong> em um só lugar economiza tempo. Para quem mora no <strong>${N}</strong>, o Pet Shop Palmira reúne tudo isso com atendimento de bairro.`,
      `Atendemos cães, gatos, pássaros, cavalos, porquinhos-da-índia, porcos e galinhas, sempre com produto de confiança e preço acessível.`,
    ],
    body: [
      { type: 'h2', text: 'Departamentos da loja' },
      { type: 'cards', items: [
        { title: '🥣 Alimentação', text: 'Rações secas, sachês, patês e petiscos para cães e gatos, além de ração para pássaros, roedores e animais de criação.' },
        { title: '🧼 Higiene', text: 'Shampoo, colônia, tapete higiênico e areia para gatos.' },
        { title: '💊 Saúde', text: 'Antipulgas, vermífugos e medicamentos veterinários prescritos.' },
        { title: '🎾 Acessórios', text: 'Brinquedos, coleiras, guias, caminhas, casinhas, comedouros e caixas de transporte.' },
      ] },
      { type: 'h2', text: 'Orientação na hora de escolher' },
      { type: 'p', html: 'Na dúvida entre dois produtos, fale com a gente. Nossa equipe ajuda a escolher o tamanho certo da coleira ou da caminha, explica a diferença entre as rações e orienta sobre antipulgas e vermífugos, sempre respeitando a prescrição do médico veterinário.' },
      { type: 'p', html: 'Se o produto que você procura não estiver na prateleira, encomendamos com nossos fornecedores de confiança.' },
      { type: 'highlight', title: `Entrega para o ${C}`, text: ENTREGA },
    ],
    faq: [
      { q: 'Vocês têm produtos para pássaros e roedores?', a: 'Sim! Temos rações, misturas de sementes e acessórios para pássaros, além de rações e acessórios para porquinhos-da-índia e outros roedores.' },
      { q: 'Vendem medicamentos com receita?', a: 'Sim. Temos farmácia veterinária na loja com antipulgas, vermífugos e medicamentos prescritos. Traga ou envie pelo WhatsApp a receita do veterinário para separarmos o produto certo.' },
      entregaFaq(N), PAGAMENTO,
    ],
    slides: ['organico/loja2.webp', 'produtos/shampoo.webp', 'produtos/brinquedos.webp', 'produtos/antiparasitario.webp'],
  });

  pages.push({
    slug: `acessorios-para-pets-${b.slug}`, keyword: `acessórios para pets ${C}`, numero: b.base + 4,
    title: `Acessórios para Pets ${C} | Pet Shop Palmira`,
    description: `Acessórios para pets no ${C}: coleiras, guias, peitorais, caminhas, casinhas, caixas de transporte e brinquedos no Pet Shop Palmira. Consulte pelo WhatsApp!`,
    ogDescription: `Coleiras, caminhas, casinhas e caixas de transporte para quem mora no ${N}, em Guarulhos.`,
    badge: `Conforto e Segurança no ${C}`,
    h1: `Acessórios para pets ${C}: <span class="acc">coleiras, caminhas, casinhas e caixas de transporte</span>`,
    intro: [
      `Bons <strong>acessórios para pets</strong> deixam os passeios mais seguros e o descanso mais confortável. Para quem mora no <strong>${N}</strong>, o Pet Shop Palmira tem coleiras, guias, peitorais, caminhas, casinhas, caixas de transporte, comedouros e brinquedos.`,
      `Envie o peso e a raça do seu pet pelo WhatsApp que ajudamos a escolher o tamanho certo antes da compra.`,
    ],
    body: [
      { type: 'h2', text: 'Principais acessórios' },
      { type: 'cards', items: [
        { title: '🦮 Coleiras, guias e peitorais', text: 'Para passeios com controle e conforto, em vários tamanhos.' },
        { title: '🛏️ Caminhas', text: 'Para o descanso de cães e gatos dentro de casa.' },
        { title: '🏠 Casinhas', text: 'Abrigo para cães que ficam no quintal.' },
        { title: '🚙 Caixas de transporte', text: 'Para levar o pet ao veterinário ou em viagens com segurança.' },
      ] },
      { type: 'h2', text: 'Como acertar o tamanho' },
      { type: 'ul', items: [
        '<strong>Peitoral:</strong> meça a circunferência do tórax, logo atrás das patas dianteiras.',
        '<strong>Coleira:</strong> deve passar dois dedos entre a coleira e o pescoço.',
        '<strong>Caminha:</strong> o pet deve conseguir se deitar esticado.',
        '<strong>Caixa de transporte:</strong> o animal precisa ficar em pé e se virar lá dentro.',
      ] },
      { type: 'p', html: 'Se não tivermos o tamanho ou o modelo na prateleira, encomendamos com nossos fornecedores de confiança.' },
      { type: 'highlight', title: `Entrega para o ${C}`, text: ENTREGA },
    ],
    faq: [
      { q: 'Como escolher o tamanho da caixa de transporte?', a: 'O pet deve conseguir ficar em pé, se deitar e dar uma volta completa dentro da caixa. Envie o peso e a raça pelo WhatsApp que indicamos o tamanho.' },
      { q: 'Vocês têm brinquedos para gatos?', a: 'Sim! Temos brinquedos para cães e gatos. Consulte pelo WhatsApp os modelos disponíveis no momento.' },
      entregaFaq(N), HORARIO,
    ],
    slides: ['organico/transportesecasinhas.webp', 'produtos/coleira.webp', 'produtos/colchoes.webp', 'produtos/transporte.webp'],
  });
}

for (const p of pages) {
  const d = { ...p, source: 'novo', slides: p.slides.map(s => ({ src: (s.startsWith('organico/') ? 'assets/' : 'assets/images/') + s, alt: '', caption: '', ok: true })) };
  fs.writeFileSync(path.join(OUT, p.slug + '.json'), JSON.stringify(d, null, 1));
}
console.log('paginas novas:', pages.length);
