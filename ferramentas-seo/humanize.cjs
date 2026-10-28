// Lê os textos escritos à mão (textos/*.txt) e grava nos dados das páginas (dados/*.json).
// Também aponta padrões de escrita de IA que a skill humanizer-pt-br proíbe.
// Uso: node humanize.cjs <content> <data>
//
// Formato:
//   @@ slug
//   title: ...            desc: ...            badge: ...
//   h1: Texto com [trecho em destaque]
//   linhas soltas antes do primeiro "## " = parágrafos de introdução
//   ## Subtítulo          texto = parágrafo     - item (lista)     1. item (lista numerada)
//   > Título | texto      (caixa de destaque)
//   * Título | texto      (cards)
//   | a | b | c           (tabela, a primeira linha é o cabeçalho)
//   ? pergunta            = resposta
//   **negrito**
const fs = require('fs');
const path = require('path');
const [CONTENT, DATA] = process.argv.slice(2);

const md = s => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const PROIBIDO = [
  [/—|–/, 'travessão'], [/[“”‘’]/, 'aspas curvas'],
  [/\balém disso\b|\bnesse sentido\b|\bnesse contexto\b|\bcabe ressaltar\b|\bvale destacar\b|\bé importante (salientar|ressaltar|destacar)\b/i, 'conectivo de IA'],
  [/\b(crucial|fundamental|essencial|vibrante|potencializa|renomad[ao]|imperdível|tapeçaria|cenário|epicentro|indelével|comprometid[ao] com)\b/i, 'vocabulário de IA'],
  [/\b(serve como|atua como|é uma prova|não é apenas|não se trata apenas|e isso muda tudo|é aqui que|cada detalhe)\b/i, 'fórmula de IA'],
  [/\b(garantindo|destacando|evidenciando|refletindo|contribuindo para|promovendo|proporcionando)\b/i, 'gerúndio de efeito'],
  [/\b(localizad[ao] no coração|no coração d)/i, 'linguagem de folder'],
];

const pages = {};
for (const f of fs.readdirSync(CONTENT).filter(f => f.endsWith('.txt')).sort()) {
  const raw = fs.readFileSync(path.join(CONTENT, f), 'utf8').replace(/\r/g, '');
  for (const chunk of raw.split(/^@@ /m).slice(1)) {
    const lines = chunk.split('\n');
    const slug = lines.shift().trim();
    const p = { intro: [], body: [], faq: [] };
    let seenH2 = false, q = null;
    const push = b => {
      const last = p.body[p.body.length - 1];
      if (['ul', 'ol', 'cards'].includes(b.type) && last && last.type === b.type) last.items.push(...b.items);
      else if (b.type === 'table' && last && last.type === 'table') last.rows.push(b.head);
      else p.body.push(b);
    };
    for (let l of lines) {
      l = l.trim();
      if (!l) continue;
      let m;
      if ((m = l.match(/^(title|desc|badge|h1):\s*(.+)$/))) { p[m[1]] = m[2]; continue; }
      if (l.startsWith('? ')) { q = l.slice(2); continue; }
      if (l.startsWith('= ')) { p.faq.push({ q, a: l.slice(2) }); q = null; continue; }
      if (l.startsWith('## ')) { seenH2 = true; push({ type: 'h2', text: l.slice(3) }); continue; }
      if (!seenH2) { p.intro.push(md(l)); continue; }
      if (l.startsWith('- ')) push({ type: 'ul', items: [md(l.slice(2))] });
      else if ((m = l.match(/^\d+\.\s+(.+)/))) push({ type: 'ol', items: [md(m[1])] });
      else if (l.startsWith('> ')) { const [t, x] = l.slice(2).split(' | '); push({ type: 'highlight', title: t, text: x }); }
      else if (l.startsWith('* ')) { const [t, x] = l.slice(2).split(' | '); push({ type: 'cards', items: [{ title: t, text: x }] }); }
      else if (l.startsWith('|')) { const cells = l.split('|').slice(1, -1).map(c => md(c.trim())); push({ type: 'table', head: cells, rows: [] }); }
      else push({ type: 'p', html: md(l) });
    }
    pages[slug] = p;
  }
}

let ok = 0;
const avisos = [];
for (const [slug, p] of Object.entries(pages)) {
  const file = path.join(DATA, slug + '.json');
  if (!fs.existsSync(file)) { avisos.push(`${slug}: slug não existe`); continue; }
  for (const k of ['title', 'desc', 'badge', 'h1']) if (!p[k]) avisos.push(`${slug}: falta ${k}`);
  if (p.faq.length < 2) avisos.push(`${slug}: menos de 2 perguntas`);
  const texto = JSON.stringify(p);
  for (const [re, nome] of PROIBIDO) { const m = texto.match(re); if (m) avisos.push(`${slug}: ${nome} -> "${m[0]}"`); }
  for (const b of p.body) if (b.type === 'h2' && b.text.split(' ').filter(w => w.length > 3 && /^[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(w)).length > 2) avisos.push(`${slug}: título em Title Case -> ${b.text}`);
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  d.title = p.title; d.description = p.desc; d.ogDescription = p.desc; d.badge = p.badge;
  d.h1 = p.h1.replace(/\[(.+?)\]/, '<span class="acc">$1</span>');
  d.intro = p.intro; d.body = p.body; d.faq = p.faq;
  d.humanizado = true;
  fs.writeFileSync(file, JSON.stringify(d, null, 1));
  ok++;
}
const lista = JSON.parse(fs.readFileSync(path.join(__dirname, 'lista-paginas.json'), 'utf8'));
const faltam = lista.filter(it => !JSON.parse(fs.readFileSync(path.join(DATA, it.slug + '.json'), 'utf8')).humanizado).map(it => it.n);
console.log(`páginas gravadas agora: ${ok} | ainda sem reescrita: ${faltam.length}${faltam.length && faltam.length < 30 ? ' (' + faltam.join(', ') + ')' : ''}`);
console.log(avisos.length ? 'AVISOS:\n' + avisos.join('\n') : 'nenhum padrão de IA encontrado');
