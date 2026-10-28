// Alinha as páginas SEO (Informacoes/*.html) com os fatos das páginas principais do site.
// Uso: node fix.cjs <pasta Informacoes> [--write]
const fs = require('fs');
const path = require('path');
const dir = process.argv[2];
const write = process.argv.includes('--write');

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
const PAG = 'Aceitamos Pix, cartões de débito e crédito das principais bandeiras e dinheiro. Sem taxa extra para pagamentos eletrônicos.';
const ENC = 'Com certeza! Se não tivermos o produto a pronta entrega na prateleira, encomendamos com nossos fornecedores de confiança com rapidez.';

// [texto antigo | RegExp, texto novo]
const R = [
  // Tempo de loja: o site diz "há 25 anos" (1999 daria 27 anos)
  ['Estamos no mesmo endereço no Jardim Palmira desde 1999, construindo', 'Estamos no Jardim Palmira há 25 anos, construindo'],
  ['parte da história de milhares de tutores em Guarulhos desde 1999', 'parte da história de muitos tutores em Guarulhos há 25 anos'],
  ['Fundado em 1999, nosso espaço nasceu', 'Há 25 anos, nosso espaço nasceu'],
  ['desde 1999, mantemos parceria direta com as maiores fábricas do Brasil. Isso nos permite oferecer', 'há 25 anos, trabalhamos com marcas em que confiamos para oferecer'],
  ['Desde 1999 na Av.', 'Há 25 anos na Av.'],
  [/desde 1999/gi, 'há 25 anos'],

  // Trocas: política não informada no site
  ['Troca rápida garantida:</strong> Se a caminha ou peitoral não ficou do tamanho exato, realizamos a troca no mesmo dia.', 'Encomenda sob medida:</strong> Se não tivermos o tamanho ou modelo na prateleira, encomendamos com nossos fornecedores de confiança.'],
  ['Troca imediata no balcão:</strong> Se comprou para presentear ou o tamanho não serviu perfeitamente, trocamos na hora sem burocracia.', 'Encomenda sob medida:</strong> Se não tivermos o tamanho ou modelo na prateleira, encomendamos com nossos fornecedores de confiança.'],
  ['Troca imediata no balcão: Se comprou para presentear ou o tamanho não serviu perfeitamente, trocamos na hora sem burocracia.', 'Encomenda sob medida: Se não tivermos o tamanho ou modelo na prateleira, encomendamos com nossos fornecedores de confiança.'],
  ['possibilidade de troca ágil se o tamanho não der certo', 'ajuda para escolher o tamanho certo'],
  ['Vocês realizam trocas caso o tamanho do produto não sirva?', 'Posso encomendar uma marca ou tamanho específico?'],
  ['Sim! Mantendo o produto sem uso e com a embalagem original, realizamos a troca pelo tamanho correto com total facilidade.', ENC],

  // Formas de pagamento: Pix, débito, crédito e dinheiro (sem parcelamento, maquininha ou troco informados)
  ['Parcelamento facilitado e entrega combinada rápida', 'Pix, cartões e dinheiro · entrega combinada por ligação'],
  ['Pix, cartões com parcelamento e dinheiro', 'Pix, cartões de débito e crédito e dinheiro'],
  ['Vocês parcelam compras de sacos grandes?', 'Quais formas de pagamento vocês aceitam?'],
  ['Sim! Aceitamos cartões de crédito e facilitamos o pagamento para compras de sacos grandes e kits mensais.', PAG],
  ['Cartão no Delivery:</strong> Levamos a maquininha sem fio até você (débito e crédito).', 'Cartão:</strong> Aceitamos cartões de débito e crédito das principais bandeiras.'],
  ['Cartão no Delivery: Levamos a maquininha sem fio até você (débito e crédito).', 'Cartão: Aceitamos cartões de débito e crédito das principais bandeiras.'],
  ['Dinheiro com Troco:</strong> Basta avisar para quanto precisa de troco que enviamos trocado.', 'Dinheiro:</strong> Também aceitamos pagamento em dinheiro.'],
  ['Dinheiro com Troco: Basta avisar para quanto precisa de troco que enviamos trocado.', 'Dinheiro: Também aceitamos pagamento em dinheiro.'],
  ['O entregador leva até você com maquininha de cartão ou opção de pagamento via Pix.', 'A entrega é combinada por ligação antecipadamente, e você paga com Pix, cartão ou dinheiro.'],
  ['Pix, débito, crédito e dinheiro com troco garantido.', 'Pix, débito, crédito e dinheiro.'],
  ['Levamos seu pedido pontualmente até sua casa ou chácara no Cabuçu com pagamento via Pix, dinheiro ou máquina de cartão na entrega.', 'Entregamos no local combinado por ligação antecipadamente, na sua casa ou chácara no Cabuçu. Aceitamos Pix, cartões e dinheiro.'],
  ['Pague no Recebimento', 'Receba no Local Combinado'],
  ['Receba seus itens no endereço combinado com pagamento via Pix, dinheiro ou máquina de cartão.', 'Receba seus itens no endereço combinado por ligação. Aceitamos Pix, cartões e dinheiro.'],
  ['Pague via Pix, cartão de crédito, débito ou dinheiro no momento da entrega.', 'Pix, cartão de crédito, débito ou dinheiro.'],
  ['Você pode pagar via Pix na hora do pedido ou na entrega, além de cartões de débito e crédito (levamos a maquininha até você) e dinheiro em espécie.', PAG],
  ['Pagamento flexível na porta:</strong> Pague via Pix ou no cartão de débito/crédito na maquininha sem fio levada pelo entregador.', 'Pagamento flexível:</strong> Pix, cartões de débito e crédito ou dinheiro.'],
  ['Pagamento flexível na porta: Pague via Pix ou no cartão de débito/crédito na maquininha sem fio levada pelo entregador.', 'Pagamento flexível: Pix, cartões de débito e crédito ou dinheiro.'],
  ['Receba com rapidez e pague na máquina de cartão ou via Pix na entrega.', 'Combine a entrega por ligação e pague com Pix, cartão ou dinheiro.'],
  ['Receba com rapidez na porta da sua casa e pague no Pix ou no cartão.', 'Combine a entrega por ligação e pague com Pix, cartão ou dinheiro.'],
  ['Receba a entrega e pague via Pix, débito, crédito ou dinheiro na entrega.', 'Receba no local combinado. Aceitamos Pix, débito, crédito e dinheiro.'],
  ['Pague via Pix, cartão ou dinheiro no ato da entrega ou na retirada.', 'Pix, cartões ou dinheiro.'],
  [', tanto no balcão da loja quanto no ato da entrega a domicílio.', '.'],
  [', tanto na loja física quanto na entrega domiciliar.', '.'],
  [' no balcão e no delivery.', '.'],
  [' tanto na loja quanto nas entregas combinadas.', '.'],
  [' na loja física e nas entregas combinadas.', '.'],

  // Entrega: só combinando o local por ligação antecipadamente (sem prazo, taxa ou "mesmo dia" informados)
  ['e receba no mesmo dia no Jardim Palmira e bairros vizinhos', 'e combine a entrega por ligação no Jardim Palmira e bairros vizinhos'],
  ['Entrega combinada expressa:</strong> Chega rápido na sua porta em Guarulhos.', 'Entrega combinada:</strong> Fazemos entrega somente combinando o local por ligação antecipadamente.'],
  ['Entrega combinada expressa: Chega rápido na sua porta em Guarulhos.', 'Entrega combinada: Fazemos entrega somente combinando o local por ligação antecipadamente.'],
  ['Entrega expressa no bairro:</strong> Peça seus produtos pelo WhatsApp e receba rapidamente sem carregar peso.', 'Entrega combinada no bairro:</strong> Fazemos entrega somente combinando o local por ligação antecipadamente, para você não carregar peso.'],
  ['Entrega expressa no bairro: Peça seus produtos pelo WhatsApp e receba rapidamente sem carregar peso.', 'Entrega combinada no bairro: Fazemos entrega somente combinando o local por ligação antecipadamente, para você não carregar peso.'],
  ['entrega expressa no Parque Continental', 'entrega combinada por ligação no Parque Continental'],
  ['e receba no conforto do seu lar com taxa amiga no Jardim Palmira e região.', 'e combine a entrega por ligação no Jardim Palmira e região.'],
  ['Casinhas e caixas de transporte grandes entregues sem taxas abusivas.', 'Casinhas e caixas de transporte grandes entregues no local combinado por ligação antecipadamente.'],
  [' no mesmo pedido sem pagar fretes adicionais.', ' no mesmo pedido.'],
  ['e chega na sua casa em questão de minutos, com frete muito acessível e sem complicação.', 'e chega na sua casa com entrega combinada por ligação antecipadamente.'],
  ['traz a vantagem da entrega imediata:', 'traz a vantagem da entrega combinada no bairro:'],
  ['você combina tudo em uma única mensagem no WhatsApp e nossa equipe leva no mesmo dia até sua casa.', 'você consulta tudo pelo WhatsApp e combina a entrega por ligação antecipadamente.'],
  ['Por isso, mantemos atendimento diário ágil e entrega combinada no mesmo dia em Guarulhos.', 'Por isso, atendemos de segunda a sábado e fazemos entrega somente combinando o local por ligação antecipadamente.'],
  ['Vocês entregam medicamentos veterinários aos finais de semana?', 'Vocês entregam medicamentos veterinários aos domingos?'],
  ['Sim! Atendemos de segunda a sábado das 09h às 18h (aos domingos permanecemos fechados). Mensagens recebidas no domingo são respondidas no início da manhã de segunda-feira.', 'Não. Atendemos e combinamos entregas de segunda a sábado, das 09h às 18h. Aos domingos permanecemos fechados.'],
  [' Mensagens recebidas no domingo são respondidas no início da manhã de segunda-feira.', ''],
  ['Posso solicitar a entrega da ração hoje mesmo?', 'Como solicito a entrega da ração?'],
  [/Sim!\s*Pedidos feitos no horário comercial via WhatsApp são enviados com agilidade para moradores do Jardim Palmira e bairros próximos em Guarulhos\./g, 'Fazemos entrega somente combinando o local por ligação antecipadamente pelo telefone (11) 2451-1719 ou ligação via WhatsApp, para o Jardim Palmira e bairros próximos em Guarulhos.'],
  ['Vocês entregam ração no mesmo dia na Vila Galvão?', 'Como funciona a entrega de ração na Vila Galvão?'],
  [/Dependendo do horário do pedido e da rota diária, sim!\s*Lembramos que fazemos/g, 'Fazemos'],
  [/\bentrega rápida\b/g, 'entrega combinada'],
  [/\bEntrega rápida\b/g, 'Entrega combinada'],
  ['com a rapidez do nosso delivery pelo WhatsApp.', 'com entrega combinada por ligação antecipadamente.'],
  ['Envie a foto da receita e receba em casa com agilidade', 'Envie a foto da receita e combine a entrega por ligação'],
  [/\s+montad(?:a|as|o|os)\b/g, ''],

  // Descontos, combos e percentuais não informados no site
  ['Posso pedir caixas fechadas de sachês pelo WhatsApp com desconto?', 'Posso pedir caixas fechadas de sachês pelo WhatsApp?'],
  ['Sim! Temos condições especiais para caixas fechadas de sachês de 12 ou 24 unidades nos sabores favoritos do seu gato. Consulte nossa equipe pelo WhatsApp para conferir os preços do dia.', 'Sim! Consulte nossa equipe pelo WhatsApp para conferir sabores, disponibilidade e os preços do dia.'],
  ['Vocês vendem caixas fechadas de sachês com desconto?', 'Vocês vendem caixas fechadas de sachês?'],
  ['Sim! Temos opções de caixas fechadas com 12 ou mais sachês de marcas como Whiskas, Golden e Premier com preço econômico.', 'Consulte pelo WhatsApp a disponibilidade de caixas fechadas de sachês de marcas como Whiskas, Golden e Premier.'],
  ['e também caixas fechadas com preços especiais.', 'e caixas fechadas sob consulta pelo WhatsApp.'],
  ['Chame no WhatsApp para conhecer nossos combos do mês!', 'Chame no WhatsApp para consultar preços e disponibilidade!'],
  ['Trabalhamos com embalagens econômicas de rações e combos de petiscos e higiene para você economizar o mês todo.', 'Trabalhamos com embalagens econômicas de rações, que costumam sair mais em conta por quilo.'],
  ['reduz o custo mensal com o pet em até 30%.', 'costuma reduzir o custo mensal com o pet.'],
  ['reduz o preço do quilo em até 30% em comparação com', 'costuma reduzir o preço do quilo em comparação com'],
  ['reduz o custo por quilo em até 35% se comparado a', 'costuma reduzir o custo por quilo se comparado a'],
  ['preços especiais para o bairro e entrega garantida', 'preço acessível e entrega combinada por ligação'],
  ['quase 80% dos gatos são castrados', 'muitos gatos são castrados'],

  // Estacionamento: não informado no site
  [' Temos estacionamento fácil e acesso rápido para moradores da região.', ''],
  [' Estacionamento fácil na porta para carregar compras com tranquilidade.', ''],
  [' Estacionamento fácil na porta.', ''],
  [', com estacionamento fácil e retirada imediata.', '.'],
  ['No coração do Jardim Palmira com estacionamento fácil e entrega combinada', 'No coração do Jardim Palmira, com entrega combinada'],

  // Marcas que não aparecem no catálogo do site
  [' (Simparic, Bravecto, NexGard)', ''],
  ['Golden Formula, Premier ou GranPlus', 'Golden Formula ou Premier'],
];

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const hits = R.map(() => 0);
const changed = new Set();
for (const f of files) {
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, 'utf8');
  const orig = s;
  R.forEach(([a, b], i) => {
    const re = a instanceof RegExp ? a : new RegExp(esc(a), 'g');
    s = s.replace(re, () => { hits[i]++; return b; });
  });
  if (s !== orig) { changed.add(f); if (write) fs.writeFileSync(p, s); }
}
R.forEach(([a], i) => { if (!hits[i]) console.log('SEM MATCH:', String(a).slice(0, 90)); });
console.log('regras:', R.length, '| com match:', hits.filter(Boolean).length, '| substituições:', hits.reduce((x, y) => x + y, 0), '| arquivos:', changed.size, write ? '(gravado)' : '(teste)');
