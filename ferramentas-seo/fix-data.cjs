// Segunda rodada de alinhamento com o site, aplicada nos dados (data/*.json) antes do render.
// Uso: node fix-data.cjs <data>
const fs = require('fs');
const path = require('path');
const DATA = process.argv[2];
const PAG = 'Aceitamos Pix, cartões de débito e crédito das principais bandeiras e dinheiro. Sem taxa extra para pagamentos eletrônicos.';

const R = [
  ['com pagamento facilitado no Pix ou cartão (débito/crédito na maquininha). Peça sacos de 15kg e 20kg combinando por ligação', 'com pagamento no Pix, cartão ou dinheiro. Peça sacos de 15kg e 20kg combinando a entrega por ligação'],
  ['Receba na porta da sua casa sacos de ração de 15kg e 20kg, areias para gatos e medicamentos veterinários com pagamento facilitado no Pix ou maquininha de cartão no local pelo Pet Shop Palmira.', 'Receba sacos de ração de 15kg e 20kg, areias para gatos e medicamentos veterinários no local combinado por ligação, com pagamento no Pix, cartão ou dinheiro.'],
  ['Nós separamos os produtos com validade longa e lote recém-chegado da fábrica e levamos a maquininha sem fio até a sua residência.', 'Nós separamos os produtos e combinamos com você o local e o horário da entrega.'],
  ['O entregador leva a máquina de cartão até minha residência?', 'Quais formas de pagamento vocês aceitam?'],
  [/Sim! Nosso entregador leva a maquininha sem fio até sua residência[^"]*?via chave Pix\./g, PAG],
  ['Há taxa de entrega para o meu bairro?', 'Como são combinadas as condições da entrega?'],
  [/A taxa de entrega é calculada conforme a distância e o volume do pedido[^"]*?WhatsApp\./g, 'Local, horário e demais condições da entrega são combinados por ligação antecipadamente pelo telefone (11) 2451-1719 ou ligação via WhatsApp (11) 97460-5359.'],
  [/Atendemos o Jardim Palmira, Parque Continental \(fases 1 a 5\), Cabuçu, Vila Galvão, Rosa de França, Picanço, Vila Rosália, Torres Tibagy e imediações combinando previamente por ligação\./g, 'Atendemos o Jardim Palmira e bairros próximos num raio aproximado de 10 km, como Parque Continental, Cabuçu, Vila Galvão, Rosa de França, Picanço, Vila Rosália, Vila Milton, Flor da Montanha e Torres Tibagy, sempre combinando o local por ligação antecipadamente.'],
  [' com necessidade de troco', ''],
  ['solicite a entrega combinando por ligação com entrega no mesmo dia.', 'solicite a entrega combinando o local por ligação antecipadamente.'],
  ['Quais as formas de pagamento disponíveis na loja física e no delivery?', 'Quais as formas de pagamento disponíveis?'],
  ['Delivery no bairro:</strong> Rapidez na entrega para você não precisar carregar fardos pesados até sua casa.', 'Entrega no bairro:</strong> Fazemos entrega somente combinando o local por ligação antecipadamente, para você não carregar fardos pesados.'],
  ['Nosso serviço de delivery via WhatsApp combina agilidade, preços', 'Nosso atendimento pelo WhatsApp combina preços'],
  ['Preços compatíveis e promoções frequentes nas principais marcas de nutrição animal.', 'Preços acessíveis nas principais marcas de nutrição animal.'],
  ['Bairros Atendidos pelo Nosso Delivery em Guarulhos', 'Bairros Atendidos pela Nossa Entrega em Guarulhos'],
  ['Entrega ultra rápida para residências e condomínios locais.', 'Entrega combinada por ligação para residências e condomínios locais.'],
  ['Delivery ágil:</strong> Faça seu pedido pelo WhatsApp e receba no conforto da sua residência sem pegar trânsito.', 'Entrega combinada:</strong> Consulte pelo WhatsApp e combine a entrega por ligação antecipadamente, sem pegar trânsito.'],
  ['delivery rápido e sem trânsito', 'entrega combinada e sem trânsito'],
  ['com a comodidade do delivery vizinho', 'com a comodidade da entrega combinada por ligação'],
  ['Delivery no mesmo bairro:', 'Entrega no mesmo bairro:'],
  [', com acesso rápido pelas vias principais e facilidade para estacionar.', ', com acesso pelas vias principais.'],
  [' tanto na loja física quanto na entrega combinada.', '.'],
  [' Temos fácil estacionamento na porta.', ''],
  ['Temos fácil estacionamento na porta.', ''],
  ['Aceitamos maquininha de cartão sem fio (débito e crédito), transferência via Pix instantâneo e dinheiro em espécie.', 'Aceitamos cartões de débito e crédito, Pix e dinheiro.'],
  ['Posso parcelar a compra de pacotes grandes no cartão?', 'Quais formas de pagamento vocês aceitam?'],
  ['Sim, aceitamos cartões de crédito com opções de parcelamento na loja ou levamos a maquininha sem fio até o seu portão na entrega combinada.', PAG],
  ['Combos promocionais:</strong> leve a ração do mês e adicione o pacote de bifinhos com valor reduzido.', 'Encomendas:</strong> se não tivermos o petisco preferido do seu pet, encomendamos com nossos fornecedores de confiança.'],
  ['Combos promocionais: leve a ração do mês e adicione o pacote de bifinhos com valor reduzido.', 'Encomendas: se não tivermos o petisco preferido do seu pet, encomendamos com nossos fornecedores de confiança.'],
  ['Nossa equipe separa os remédios com precisão e envia no delivery até você.', 'Nossa equipe separa os remédios com precisão e combina a entrega por ligação antecipadamente.'],
  ['Qual a taxa de entrega para o Parque Continental?', 'Como funciona a entrega para o Parque Continental?'],
  ['atendendo prontamente no balcão e pelo delivery no Jardim Palmira.', 'atendendo no balcão e com entrega combinada por ligação no Jardim Palmira.'],
  ['Temos várias opções no balcão e no delivery!', 'Temos várias opções no balcão!'],
  ['Balcão ou Delivery no Jardim Palmira', 'Balcão ou Entrega Combinada no Jardim Palmira'],
  ['Combos promocionais com sachês e areia higiênica de alta absorção.', 'Sachês e areia higiênica de alta absorção.'],
  ['O Pet Shop Palmira entrega rações para gatos no mesmo dia em Guarulhos?', 'Como funciona a entrega de rações para gatos em Guarulhos?'],
  ['O Pet Shop Palmira vende sachês e patês em caixas fechadas com desconto?', 'O Pet Shop Palmira vende sachês e patês em caixas fechadas?'],
  [/Temos preços promocionais especiais para caixas com 12, 24 ou mais unidades de sachês e latas de patê das marcas Whiskas, Golden, Premier e Cat Chow\./g, 'Consulte pelo WhatsApp a disponibilidade de caixas fechadas de sachês e patês das marcas Whiskas, Golden, Premier e Cat Chow.'],
  ['Consulte nossos combos pelo WhatsApp!', 'Consulte a disponibilidade pelo WhatsApp!'],
  ['reduzem o custo por folha em até 40% em relação', 'costumam reduzir o custo por folha em relação'],
  ['Você pode trazer seu amigo para pesar gratuitamente na balança do Pet Shop Palmira ou nos informar o peso aproximado', 'Informe o peso aproximado do seu pet'],
  ['Variedade Imediata:</strong> Pacotes de 1kg, 3kg, 10.1kg, 15kg e 20kg sempre disponíveis para retirada ou entrega combinada.', 'Variedade de embalagens:</strong> Pacotes de vários tamanhos, conforme o estoque, para retirada ou entrega combinada.'],
  ['Variedade Imediata: Pacotes de 1kg, 3kg, 10.1kg, 15kg e 20kg sempre disponíveis para retirada ou entrega combinada.', 'Variedade de embalagens: Pacotes de vários tamanhos, conforme o estoque, para retirada ou entrega combinada.'],
  [/\bdelivery canino\b/gi, 'Entrega Combinada'],
  ['fórmulas secas, sachês e areia com delivery', 'fórmulas secas, sachês e areia com entrega combinada'],
  ['Pix imediato', 'Pix'],
  [/delivery rápido/gi, 'entrega combinada'],
  [/Delivery eficiente/g, 'Entrega combinada'],
  [/delivery sem complicações/gi, 'entrega combinada'],
  [/e delivery em Guarulhos/g, 'e entrega combinada em Guarulhos'],
  ['embalagens promocionais', 'embalagens econômicas'],
];

const fixStr = s => R.reduce((acc, [a, b]) => typeof a === 'string' ? acc.split(a).join(b) : acc.replace(a, b), s);
const deep = v => typeof v === 'string' ? fixStr(v) : Array.isArray(v) ? v.map(deep) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;

let n = 0;
for (const f of fs.readdirSync(DATA).filter(f => f.endsWith('.json') && !f.startsWith('_'))) {
  const p = path.join(DATA, f);
  const orig = fs.readFileSync(p, 'utf8');
  let d = deep(JSON.parse(orig));
  if (d.slug === 'entrega-de-racao-em-domicilio-com-pagamento-no-pix-ou-cartao') {
    // Tabela de "formas de pagamento na entrega" (maquininha, entregador) não tem base no site
    const i = d.body.findIndex(b => b.type === 'h2' && /Formas de Pagamento na Entrega/.test(b.text));
    if (i >= 0) d.body.splice(i, 2);
    d.body = d.body.map(b => b.type === 'highlight' && /Formas de Pagamento/.test(b.title) ? { type: 'highlight', title: 'Formas de pagamento', text: PAG } : b);
  }
  const out = JSON.stringify(d, null, 1);
  if (out !== JSON.stringify(JSON.parse(orig), null, 1)) { fs.writeFileSync(p, out); n++; }
}
console.log('arquivos de dados alterados:', n);
