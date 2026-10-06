import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '..', 'Apresentacao_Proposta_PinkVet.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  info: {
    Title: 'Proposta Comercial - Clínica Veterinária PinkVet',
    Author: 'Parceria Digital Pet Shop Palmira',
    Subject: 'Projeto de Transformação Digital e Presença Web para PinkVet',
    Keywords: 'PinkVet, Veterinária, Proposta Comercial, SEO, Website',
    CreationDate: new Date()
  }
});

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Colors palette
const PRIMARY = '#BE185D'; // PinkVet deep rose
const PRIMARY_LIGHT = '#FDF2F8';
const PRIMARY_MUTED = '#F472B6';
const SECONDARY = '#0F172A'; // Dark slate
const TEXT_DARK = '#1E293B';
const TEXT_MUTED = '#64748B';
const ACCENT_TEAL = '#0D9488';
const ACCENT_GREEN = '#16A34A';
const CARD_BG = '#F8FAFC';
const BORDER_COLOR = '#E2E8F0';

// Helper: draw top decorative bar
function drawHeaderBar(title, category = 'PROPOSTA COMERCIAL') {
  doc.rect(45, 30, doc.page.width - 90, 4).fill(PRIMARY);
  
  doc.fontSize(8).font('Helvetica-Bold').fillColor(PRIMARY).text(category.toUpperCase(), 45, 42);
  doc.fontSize(16).font('Helvetica-Bold').fillColor(SECONDARY).text(title, 45, 54);
  
  // Thin separator
  doc.moveTo(45, 78).lineTo(doc.page.width - 45, 78).lineWidth(0.5).strokeColor(BORDER_COLOR).stroke();
  doc.y = 90;
}

// Helper: draw footer with page number
function drawFooter(pageNumber, totalPages = 7) {
  const bottomY = doc.page.height - 35;
  doc.moveTo(45, bottomY - 10).lineTo(doc.page.width - 45, bottomY - 10).lineWidth(0.5).strokeColor(BORDER_COLOR).stroke();
  
  doc.fontSize(8).font('Helvetica').fillColor(TEXT_MUTED)
    .text('PinkVet • Clínica Veterinária | Parceria Estratégica Pet Shop Palmira', 45, bottomY);
  
  doc.fontSize(8).font('Helvetica-Bold').fillColor(PRIMARY)
    .text(`Página ${pageNumber} de ${totalPages}`, doc.page.width - 120, bottomY, { align: 'right' });
}

// ==========================================
// PÁGINA 1: CAPA EXECUTIVA
// ==========================================
// Background graphic accents
doc.rect(0, 0, doc.page.width, 14).fill(PRIMARY);
doc.rect(0, 14, doc.page.width, 4).fill(PRIMARY_MUTED);

// Subdued background card
doc.roundedRect(45, 70, doc.page.width - 90, doc.page.height - 130, 12)
  .lineWidth(1).strokeColor('#FCE7F3').fillAndStroke('#FFFDFE', '#FCE7F3');

// Decorative top badge
doc.roundedRect(65, 95, 195, 22, 11).fill(PRIMARY);
doc.fontSize(9).font('Helvetica-Bold').fillColor('#FFFFFF')
  .text('PROPOSTA COMERCIAL & PROJETO DIGITAL', 75, 101);

doc.fontSize(28).font('Helvetica-Bold').fillColor(SECONDARY)
  .text('Transformação Digital & Presença Web', 65, 135, { width: doc.page.width - 130 });

doc.fontSize(16).font('Helvetica').fillColor(PRIMARY)
  .text('Clínica Veterinária PinkVet', 65, 185);

doc.fontSize(11).font('Helvetica').fillColor(TEXT_MUTED)
  .text('Do atendimento presencial de excelência à liderança em agendamentos no Google e WhatsApp em Guarulhos.', 65, 210, { width: doc.page.width - 130, lineGap: 4 });

// Value Highlights Grid
const highlightsY = 270;
const colW = (doc.page.width - 150) / 2;

// Box 1
doc.roundedRect(65, highlightsY, colW, 90, 8).fillAndStroke('#FFFFFF', '#F3E8FF');
doc.fontSize(11).font('Helvetica-Bold').fillColor(PRIMARY).text('Portal de Conversão 24h', 80, highlightsY + 14);
doc.fontSize(9).font('Helvetica').fillColor(TEXT_DARK)
  .text('Site veloz, moderno e humanizado com agendamento instantâneo via WhatsApp para consultas e procedimentos.', 80, highlightsY + 32, { width: colW - 30, lineGap: 3 });

// Box 2
doc.roundedRect(65 + colW + 20, highlightsY, colW, 90, 8).fillAndStroke('#FFFFFF', '#E0F2FE');
doc.fontSize(11).font('Helvetica-Bold').fillColor('#0284C7').text('Sinergia com Pet Shop Palmira', 80 + colW + 20, highlightsY + 14);
doc.fontSize(9).font('Helvetica').fillColor(TEXT_DARK)
  .text('Integração de público qualificado: tutores que compram rações e remédios são direcionados à PinkVet.', 80 + colW + 20, highlightsY + 32, { width: colW - 30, lineGap: 3 });

// Box 3
doc.roundedRect(65, highlightsY + 105, colW, 90, 8).fillAndStroke('#FFFFFF', '#DCFCE7');
doc.fontSize(11).font('Helvetica-Bold').fillColor(ACCENT_GREEN).text('Engenharia & Performance', 80, highlightsY + 119);
doc.fontSize(9).font('Helvetica').fillColor(TEXT_DARK)
  .text('Tecnologia idêntica à do Pet Shop Palmira: menos de 1 segundo de abertura, 100% responsivo para celulares.', 80, highlightsY + 137, { width: colW - 30, lineGap: 3 });

// Box 4 (SEO Experimental)
doc.roundedRect(65 + colW + 20, highlightsY + 105, colW, 90, 8).fillAndStroke('#FFFFFF', '#FEE2E2');
doc.fontSize(11).font('Helvetica-Bold').fillColor('#DC2626').text('SEO Local: Piloto Bonificado', 80 + colW + 20, highlightsY + 119);
doc.fontSize(9).font('Helvetica').fillColor(TEXT_DARK)
  .text('Trabalho avançado de busca no Google incluso como projeto piloto cortesia (sem cobrança no início).', 80 + colW + 20, highlightsY + 137, { width: colW - 30, lineGap: 3 });

// Meta Data Box at Bottom
const metaY = doc.page.height - 180;
doc.roundedRect(65, metaY, doc.page.width - 130, 80, 8).fillAndStroke(PRIMARY_LIGHT, '#FBCFE8');

doc.fontSize(9).font('Helvetica-Bold').fillColor(PRIMARY).text('DADOS DA PROPOSTA & PARCERIA', 80, metaY + 12);

doc.fontSize(9).font('Helvetica-Bold').fillColor(TEXT_DARK).text('Cliente:', 80, metaY + 30);
doc.font('Helvetica').text('Clínica Veterinária PinkVet (Dra. Responsável)', 135, metaY + 30);

doc.font('Helvetica-Bold').text('Parceria:', 80, metaY + 45);
doc.font('Helvetica').text('Pet Shop Palmira & Soluções Digitais', 135, metaY + 45);

doc.font('Helvetica-Bold').text('Data:', 80, metaY + 60);
doc.font('Helvetica').text('Outubro de 2026 | Validade: 15 dias', 135, metaY + 60);

doc.font('Helvetica-Bold').text('Status:', 330, metaY + 60);
doc.font('Helvetica').fillColor(ACCENT_GREEN).text('Proposta Especial de Parceria', 375, metaY + 60);


// ==========================================
// PÁGINA 2: DIAGNÓSTICO & OPORTUNIDADE
// ==========================================
doc.addPage();
drawHeaderBar('Diagnóstico do Mercado & Oportunidade Local', '01. CONTEXTO & SINERGIA');

doc.fontSize(12).font('Helvetica-Bold').fillColor(PRIMARY)
  .text('Como os tutores de animais escolhem uma clínica veterinária hoje?', 45, 95);

doc.fontSize(9.5).font('Helvetica').fillColor(TEXT_DARK)
  .text(
    'No momento em que um cão ou gato adoece, precisa de vacina, castração ou exames de emergência, mais de 85% dos tutores em Guarulhos buscam imediatamente no Google pelo celular ou pedem recomendação no WhatsApp. Se a clínica não possui presença digital profissional ou demora para responder, esse paciente é perdido para concorrentes em minutos.',
    45, 115, { width: doc.page.width - 90, lineGap: 4 }
  );

// Comparative Boxes
const statY = 175;
const boxWidth = (doc.page.width - 100) / 2;

// Pain Points
doc.roundedRect(45, statY, boxWidth, 125, 8).fillAndStroke('#FFF1F2', '#FECDD3');
doc.fontSize(11).font('Helvetica-Bold').fillColor('#BE123C').text('DESAFIOS COMUNS NO SETOR', 58, statY + 14);

const pains = [
  'Depender apenas de indicação boca a boca limita o crescimento.',
  'Instagram sozinho não atende quem tem emergência ou busca no Google.',
  'Falta de canal direto e claro de triagem sobrecarrega a recepção.',
  'Concorrentes anunciando no Google e captando tutores do bairro.'
];
let py = statY + 36;
pains.forEach(p => {
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#E11D48').text('x', 58, py);
  doc.font('Helvetica').fillColor(TEXT_DARK).text(p, 70, py, { width: boxWidth - 30, lineGap: 2 });
  py += 21;
});

// Opportunities with PinkVet
doc.roundedRect(55 + boxWidth, statY, boxWidth, 125, 8).fillAndStroke('#F0FDF4', '#BBF7D0');
doc.fontSize(11).font('Helvetica-Bold').fillColor(ACCENT_GREEN).text('A OPORTUNIDADE PINKVET', 68 + boxWidth, statY + 14);

const gains = [
  'Página de alta credibilidade médica com fotos reais e CRMV.',
  'Botões que direcionam o tutor ao WhatsApp certo em 1 toque.',
  'Sinergia direta com os 25 anos de tradição do Pet Shop Palmira.',
  'Posicionamento no Google para os bairros do entorno imediato.'
];
let gy = statY + 36;
gains.forEach(g => {
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(ACCENT_GREEN).text('OK', 68 + boxWidth, gy);
  doc.font('Helvetica').fillColor(TEXT_DARK).text(g, 85 + boxWidth, gy, { width: boxWidth - 35, lineGap: 2 });
  gy += 21;
});

// Sinergy section
const sinergyY = 320;
doc.roundedRect(45, sinergyY, doc.page.width - 90, 160, 8).fillAndStroke(CARD_BG, BORDER_COLOR);

doc.fontSize(11).font('Helvetica-Bold').fillColor(SECONDARY)
  .text('A Parceria Estratégica: PinkVet + Pet Shop Palmira', 60, sinergyY + 16);

doc.fontSize(9.5).font('Helvetica').fillColor(TEXT_DARK)
  .text(
    'O Pet Shop Palmira já possui uma base sólida e ativa de centenas de tutores que compram mensalmente rações premium, medicamentos e produtos de cuidados na Av. Pedro de Souza Lopes. Todo cliente que compra ração ou remédio tem necessidade recorrente de veterinário (vacinas anuais, exames, check-ups e urgências).\n\nCom o novo ecossistema digital que criamos para o Pet Shop Palmira, podemos criar pontes digitais de encaminhamento mútuo: o tutor que acessa o site do pet shop vê a PinkVet como a clínica oficial de confiança recomendada, e os pacientes da clínica têm acesso rápido a medicamentos e produtos com entrega rápida.',
    60, sinergyY + 36, { width: doc.page.width - 120, lineGap: 4 }
  );

drawFooter(2);


// ==========================================
// PÁGINA 3: ESCOPO DO PROJETO PINKVET
// ==========================================
doc.addPage();
drawHeaderBar('O Que Será Desenvolvido para a PinkVet', '02. ESCOPO & ENTREGÁVEIS');

doc.fontSize(9.5).font('Helvetica').fillColor(TEXT_DARK)
  .text('O projeto PinkVet receberá toda a robustez de design e engenharia aplicada no Pet Shop Palmira, adaptada exclusivamente para a autoridade médica, triagem de pacientes e agendamento de consultas:', 45, 92, { width: doc.page.width - 90 });

// Features List Cards
const features = [
  {
    num: '1',
    title: 'Portal Institucional & Médico de Alta Conversão',
    desc: 'Design exclusivo com a identidade PinkVet (rosa/magenta, cinza clean e branco hospitalar). Apresentação da equipe médica, registro CRMV, fotos dos consultórios e depoimentos de tutores satisfeitos.'
  },
  {
    num: '2',
    title: 'Triagem Inteligente via WhatsApp (1 Toque)',
    desc: 'Botões de contato direto estrategicamente posicionados com mensagens personalizadas: "Olá! Gostaria de agendar uma consulta", "Dúvida sobre vacinação", "Plantão/Urgência Veterinária".'
  },
  {
    num: '3',
    title: 'Guia Completo de Serviços & Especialidades',
    desc: 'Seções dedicadas e detalhadas: Consultas Clínicas, Vacinação Ética, Cirurgias & Castração, Exames Laboratoriais, Limpeza de Tártaro, Farmácia e Orientações para Tutores.'
  },
  {
    num: '4',
    title: 'Localização Integrada com GPS (Google Maps & Waze)',
    desc: 'Módulo de endereço claro com botão de rota direta para facilitar a chegada de tutores em situações de consulta agendada ou emergência.'
  },
  {
    num: '5',
    title: 'Mobile-First & Carregamento Ultrarrápido (< 1s)',
    desc: 'Construído em código puro e limpo, sem plataformas lentas ou pesadas. Abre instantaneamente em qualquer smartphone mesmo no sinal móvel da rua.'
  },
  {
    num: '6',
    title: 'Compartilhamento Elegante nas Redes e WhatsApp',
    desc: 'Configuração completa de OpenGraph: ao compartilhar o link da PinkVet, aparece automaticamente o card visual com logo oficial, título chamativo e resumo do atendimento.'
  }
];

let cardY = 135;
features.forEach(f => {
  doc.roundedRect(45, cardY, doc.page.width - 90, 52, 6).fillAndStroke('#FFFFFF', '#F1F5F9');
  
  // Number badge
  doc.roundedRect(55, cardY + 11, 28, 28, 14).fill(PRIMARY_LIGHT);
  doc.fontSize(12).font('Helvetica-Bold').fillColor(PRIMARY).text(f.num, 64, cardY + 19);
  
  doc.fontSize(10).font('Helvetica-Bold').fillColor(SECONDARY).text(f.title, 95, cardY + 11);
  doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_DARK).text(f.desc, 95, cardY + 26, { width: doc.page.width - 155, lineGap: 2 });
  
  cardY += 58;
});

drawFooter(3);


// ==========================================
// PÁGINA 4: O PILOTO EXPERIMENTAL DE SEO
// ==========================================
doc.addPage();
drawHeaderBar('Módulo de SEO Local & Busca Orgânica no Google', '03. DIFERENCIAL ESTRATÉGICO');

// Highlight Banner
doc.roundedRect(45, 90, doc.page.width - 90, 85, 8).fillAndStroke('#FDF2F8', '#F472B6');
doc.fontSize(11).font('Helvetica-Bold').fillColor(PRIMARY)
  .text('PROJETO PILOTO EXPERIMENTAL: 100% BONIFICADO NO LANÇAMENTO', 60, 104);

doc.fontSize(9).font('Helvetica').fillColor(TEXT_DARK)
  .text(
    'Por ser uma parceira de extrema confiança e vizinha do Pet Shop Palmira, o serviço completo de SEO Técnico e Estratégia de Busca Orgânica no Google será incluído sem qualquer custo de implementação ou mensalidade nesta fase inicial. Queremos validar juntos o crescimento das buscas antes de qualquer contratação definitiva deste serviço.',
    60, 122, { width: doc.page.width - 120, lineGap: 3.5 }
  );

// What is SEO & What is Included
doc.fontSize(12).font('Helvetica-Bold').fillColor(SECONDARY).text('O Que Está Incluso no Piloto de SEO da PinkVet?', 45, 195);

const seoItems = [
  {
    icon: '[G]',
    title: 'Cadastro & Verificação no Google Search Console',
    desc: 'Envio do sitemap oficial para garantir que o Google rastreie e indexe a clínica de forma prioritária.'
  },
  {
    icon: '[JSON]',
    title: 'Dados Estruturados Schema.org (VeterinaryCare)',
    desc: 'Código especial nos bastidores que ensina os robôs do Google que a PinkVet é um estabelecimento médico veterinário com horário de funcionamento, telefone e endereço oficial.'
  },
  {
    icon: '[FAQ]',
    title: 'Perguntas Frequentes Ricas (FAQ Page)',
    desc: 'Perguntas estruturadas para responder dúvidas de tutores ("Precisa de jejum para vacina?", "Como funciona a castração?"), aumentando a chance de aparecer em destaque nos resultados de busca.'
  },
  {
    icon: '[GEO]',
    title: 'Mapeamento de Palavras-Chave de Guarulhos',
    desc: 'Otimização com termos de alta intenção local: "veterinário jardim palmira", "clínica veterinária guarulhos", "vacina v10 cachorro", "consulta veterinária perto de mim".'
  },
  {
    icon: '[REL]',
    title: 'Relatório Transparente de Desempenho Inicial',
    desc: 'Apresentação periódica dos dados reais coletados: quantas pessoas viram a clínica no Google e quais termos geraram cliques e ligações.'
  }
];

let seoY = 220;
seoItems.forEach(item => {
  doc.roundedRect(45, seoY, doc.page.width - 90, 48, 6).fillAndStroke(CARD_BG, BORDER_COLOR);
  
  doc.fontSize(10).font('Helvetica-Bold').fillColor(PRIMARY).text(item.title, 60, seoY + 10);
  doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_DARK).text(item.desc, 60, seoY + 25, { width: doc.page.width - 120, lineGap: 2 });
  
  seoY += 54;
});

// Bottom Note
doc.fontSize(8.5).font('Helvetica-Oblique').fillColor(TEXT_MUTED)
  .text('* Observação: O SEO orgânico é um investimento de médio prazo cujos frutos são acumulativos. Como teste piloto, não há compromisso de fidelidade ou cobrança recorrente de início.', 45, doc.page.height - 75, { width: doc.page.width - 90 });

drawFooter(4);


// ==========================================
// PÁGINA 5: CRONOGRAMA & ETAPAS
// ==========================================
doc.addPage();
drawHeaderBar('Cronograma de Implantação Rápida (14 Dias)', '04. ETAPAS DE EXECUÇÃO');

doc.fontSize(9.5).font('Helvetica').fillColor(TEXT_DARK)
  .text('Todo o processo foi estruturado para não tomar o tempo clínico da Dra. ou da equipe. O fluxo é ágil e direto:', 45, 92);

const steps = [
  {
    badge: 'DIAS 1 - 3',
    title: 'Etapa 1: Alinhamento Inicial & Coleta de Dados',
    items: [
      'Envio de questionário simples pelo WhatsApp (fotos da clínica, logo PinkVet, horários, CRMV).',
      'Definição dos serviços prioritários e diferenciais da clínica.'
    ]
  },
  {
    badge: 'DIAS 4 - 9',
    title: 'Etapa 2: Construção da Engenharia & Design',
    items: [
      'Desenvolvimento do portal com paleta exclusiva da PinkVet.',
      'Configuração das rotas de WhatsApp, Google Maps e apresentação de especialidades.',
      'Implementação do código Schema.org para indexação médica veterinária.'
    ]
  },
  {
    badge: 'DIAS 10 - 12',
    title: 'Etapa 3: Homologação & Aprovação com a Dra.',
    items: [
      'Envio de link de pré-visualização para a veterinária testar em seu próprio celular.',
      'Ajustes finos de textos, fotos e detalhes solicitados.'
    ]
  },
  {
    badge: 'DIAS 13 - 14',
    title: 'Etapa 4: Publicação Oficial & Início do Piloto de SEO',
    items: [
      'Lançamento do site na internet.',
      'Envio do sitemap ao Google Search Console.',
      'Criação de links de indicação entre Pet Shop Palmira e PinkVet.'
    ]
  }
];

let stepY = 120;
steps.forEach(s => {
  doc.roundedRect(45, stepY, doc.page.width - 90, 72, 6).fillAndStroke('#FFFFFF', '#E2E8F0');
  
  // Badge
  doc.roundedRect(55, stepY + 12, 75, 18, 9).fill(SECONDARY);
  doc.fontSize(8).font('Helvetica-Bold').fillColor('#FFFFFF').text(s.badge, 65, stepY + 16);
  
  doc.fontSize(10.5).font('Helvetica-Bold').fillColor(PRIMARY).text(s.title, 140, stepY + 15);
  
  let iy = stepY + 36;
  s.items.forEach(it => {
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor(ACCENT_TEAL).text('•', 65, iy);
    doc.font('Helvetica').fillColor(TEXT_DARK).text(it, 75, iy, { width: doc.page.width - 160, lineGap: 2 });
    iy += 15;
  });
  
  stepY += 80;
});

// Technical guarantee card
doc.roundedRect(45, stepY + 10, doc.page.width - 90, 50, 6).fillAndStroke('#F0FDF4', '#86EFAC');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(ACCENT_GREEN).text('Garantia Técnica & Suporte por 30 Dias Inclusos', 60, stepY + 22);
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_DARK).text('Qualquer alteração de horário, troca de telefone ou pequenos ajustes de texto nos primeiros 30 dias após a publicação são realizados sem custo adicional.', 60, stepY + 36, { width: doc.page.width - 120 });

drawFooter(5);


// ==========================================
// PÁGINA 6: INVESTIMENTO & CONDIÇÕES
// ==========================================
doc.addPage();
drawHeaderBar('Investimento & Condição Especial de Parceria', '05. PROPOSTA FINANCEIRA');

doc.fontSize(9.5).font('Helvetica').fillColor(TEXT_DARK)
  .text('Abaixo apresentamos a estrutura de valores considerando o relacionamento de confiança e a parceria com o Pet Shop Palmira:', 45, 92);

// Pricing Table Header
const tableY = 120;
doc.roundedRect(45, tableY, doc.page.width - 90, 26, 4).fill(SECONDARY);
doc.fontSize(9).font('Helvetica-Bold').fillColor('#FFFFFF').text('ITEM / ESCOPO DO PROJETO', 60, tableY + 9);
doc.text('VALOR DE MERCADO', 320, tableY + 9);
doc.text('CONDIÇÃO PARCERIA', doc.page.width - 150, tableY + 9);

// Row 1: Website
let rowY = tableY + 30;
doc.roundedRect(45, rowY, doc.page.width - 90, 55, 4).fillAndStroke('#FFFFFF', BORDER_COLOR);
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(TEXT_DARK).text('Desenvolvimento do Portal PinkVet', 60, rowY + 10);
doc.fontSize(8).font('Helvetica').fillColor(TEXT_MUTED)
  .text('Design médico, mobile-first, botões de WhatsApp, mapa GPS e 30 dias de suporte.', 60, rowY + 24, { width: 240 });
doc.fontSize(9.5).font('Helvetica').fillColor(TEXT_MUTED).text('R$ 2.800,00', 320, rowY + 18);
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(PRIMARY).text('R$ 1.850,00', doc.page.width - 150, rowY + 18);

// Row 2: SEO Piloto (The highlight!)
rowY += 60;
doc.roundedRect(45, rowY, doc.page.width - 90, 60, 4).fillAndStroke('#FDF2F8', '#F472B6');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(PRIMARY).text('Módulo SEO Local & Google Search Console', 60, rowY + 10);
doc.fontSize(8).font('Helvetica').fillColor(TEXT_DARK)
  .text('Indexação, dados Schema.org de clínica veterinária, FAQs e mapeamento de buscas.', 60, rowY + 24, { width: 240 });
doc.fontSize(9.5).font('Helvetica').fillColor(TEXT_MUTED).text('R$ 1.500,00', 320, rowY + 20);

// Free badge
doc.roundedRect(doc.page.width - 155, rowY + 14, 100, 22, 11).fill(ACCENT_GREEN);
doc.fontSize(9).font('Helvetica-Bold').fillColor('#FFFFFF').text('R$ 0,00 (PILOTO)', doc.page.width - 146, rowY + 20);

// Row 3: Totals
rowY += 66;
doc.roundedRect(45, rowY, doc.page.width - 90, 48, 4).fillAndStroke('#F8FAFC', '#CBD5E1');
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(SECONDARY).text('INVESTIMENTO TOTAL DO PROJETO:', 60, rowY + 18);
doc.fontSize(9.5).font('Helvetica').fillColor(TEXT_MUTED).text('De R$ 4.300,00', 320, rowY + 18);
doc.fontSize(14).font('Helvetica-Bold').fillColor(PRIMARY).text('R$ 1.850,00*', doc.page.width - 150, rowY + 16);

// Payment conditions card
const payY = rowY + 65;
doc.roundedRect(45, payY, doc.page.width - 90, 95, 8).fillAndStroke('#FFFFFF', '#E2E8F0');
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(SECONDARY).text('CONDIÇÕES FACILITADAS DE PAGAMENTO', 60, payY + 14);

const options = [
  'Opção 1 (À Vista com Desconto): R$ 1.650,00 via Pix no início do projeto.',
  'Opção 2 (Entrada + Conclusão): 50% de entrada (R$ 925,00) + 50% na aprovação final e entrega.',
  'Opção 3 (Parcelado): Em até 3x de R$ 640,00 sem juros (ou no cartão em até 10x com pequena taxa da maquininha).'
];
let optY = payY + 34;
options.forEach(o => {
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(PRIMARY).text('✔', 60, optY);
  doc.font('Helvetica').fillColor(TEXT_DARK).text(o, 75, optY);
  optY += 18;
});

doc.fontSize(8).font('Helvetica-Oblique').fillColor(TEXT_MUTED)
  .text('* Custos de domínio próprio (.com.br ~R$ 40/ano) e hospedagem de alta performance já estão orientados e inclusos no suporte.', 45, doc.page.height - 75, { width: doc.page.width - 90 });

drawFooter(6);


// ==========================================
// PÁGINA 7: PRÓXIMOS PASSOS & ACEITE
// ==========================================
doc.addPage();
drawHeaderBar('Próximos Passos & Termo de Início', '06. FORMALIZAÇÃO');

doc.fontSize(11).font('Helvetica-Bold').fillColor(SECONDARY).text('Como Vamos Começar?', 45, 95);

const kickoffSteps = [
  '1. Confirmação do aceite da proposta e escolha da forma de pagamento.',
  '2. Envio rápido via WhatsApp dos dados básicos: logo, fotos da clínica, lista de serviços e horários.',
  '3. Criação do primeiro rascunho visual navegável em até 7 dias para validação.'
];

let ky = 115;
kickoffSteps.forEach(k => {
  doc.fontSize(9.5).font('Helvetica').fillColor(TEXT_DARK).text(k, 45, ky, { width: doc.page.width - 90 });
  ky += 22;
});

// Agreement box
const signY = 220;
doc.roundedRect(45, signY, doc.page.width - 90, 240, 8).fillAndStroke(CARD_BG, BORDER_COLOR);

doc.fontSize(11).font('Helvetica-Bold').fillColor(PRIMARY).text('TERMO DE ACEITE DA PROPOSTA', 60, signY + 18);
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_DARK)
  .text(
    'Fica acordado o desenvolvimento do portal digital para a Clínica Veterinária PinkVet conforme escopo descrito neste documento, com entrega em até 14 dias úteis e inclusão do Módulo de SEO Local em formato Piloto Experimental Bonificado (sem cobrança inicial).',
    60, signY + 36, { width: doc.page.width - 120, lineGap: 3 }
  );

// Signature lines
const lineY = signY + 160;
const sigWidth = (doc.page.width - 150) / 2;

// Left signature: Client
doc.moveTo(60, lineY).lineTo(60 + sigWidth, lineY).lineWidth(0.8).strokeColor(TEXT_MUTED).stroke();
doc.fontSize(9).font('Helvetica-Bold').fillColor(SECONDARY).text('CLÍNICA VETERINÁRIA PINKVET', 60, lineY + 8, { width: sigWidth, align: 'center' });
doc.fontSize(8).font('Helvetica').fillColor(TEXT_MUTED).text('Dra. Responsável / Contratante', 60, lineY + 22, { width: sigWidth, align: 'center' });

// Right signature: Specialist
doc.moveTo(90 + sigWidth, lineY).lineTo(90 + (sigWidth * 2), lineY).lineWidth(0.8).strokeColor(TEXT_MUTED).stroke();
doc.fontSize(9).font('Helvetica-Bold').fillColor(SECONDARY).text('RESPONSÁVEL TÉCNICO & PROJETO', 90 + sigWidth, lineY + 8, { width: sigWidth, align: 'center' });
doc.fontSize(8).font('Helvetica').fillColor(TEXT_MUTED).text('Parceria Digital Pet Shop Palmira', 90 + sigWidth, lineY + 22, { width: sigWidth, align: 'center' });

// Contact info banner
doc.roundedRect(45, doc.page.height - 110, doc.page.width - 90, 48, 6).fillAndStroke(PRIMARY_LIGHT, '#FBCFE8');
doc.fontSize(9).font('Helvetica-Bold').fillColor(PRIMARY).text('DÚVIDAS OU INÍCIO IMEDIATO?', 60, doc.page.height - 98);
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_DARK).text('Estamos à disposição para qualquer ajuste fino no escopo ou condições para viabilizar esse projeto com total segurança e comodidade para a PinkVet.', 60, doc.page.height - 84, { width: doc.page.width - 120 });

drawFooter(7);

doc.end();

stream.on('finish', () => {
  console.log(`PDF successfully generated at: ${outputPath}`);
});
