// Confere as páginas por bairro: tamanho do texto, títulos e descrições repetidos e
// semelhança entre páginas do mesmo tipo (trechos de 5 palavras em comum).
// Uso: node checar.cjs <data> <lista-paginas.json>
const fs = require('fs');
const path = require('path');
const [DATA, LISTA] = process.argv.slice(2);

const text = s => String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const lista = JSON.parse(fs.readFileSync(LISTA, 'utf8')).filter(it => it.grupo === 'bairro');
const pags = lista.map(it => {
  const d = JSON.parse(fs.readFileSync(path.join(DATA, it.slug + '.json'), 'utf8'));
  const partes = [...(d.intro || []), ...(d.body || []).map(b => b.text || b.html || (b.items || []).map(i => typeof i === 'string' ? i : i.title + ' ' + i.text).join(' ') || [b.head, ...(b.rows || [])].flat().join(' ')), ...(d.faq || []).map(f => f.q + ' ' + f.a)];
  const t = text(partes.join(' ')).toLowerCase();
  return { ...it, d, t, palavras: t.split(' ').filter(Boolean).length };
});

const avisos = [];
const vistos = {};
for (const p of pags) {
  if (!p.d.humanizado) { avisos.push(`${p.slug}: sem texto`); continue; }
  if (p.palavras < 350 || p.palavras > 450) avisos.push(`${p.slug}: ${p.palavras} palavras`);
  if (p.d.description.length > 160) avisos.push(`${p.slug}: descrição com ${p.d.description.length} caracteres`);
  if (p.d.title.length > 70) avisos.push(`${p.slug}: título com ${p.d.title.length} caracteres`);
  for (const k of ['title', 'description']) {
    if (vistos[k + p.d[k]]) avisos.push(`${p.slug}: ${k} igual a ${vistos[k + p.d[k]]}`);
    vistos[k + p.d[k]] = p.slug;
  }
}

const shingles = t => { const w = t.split(' '), s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s; };
for (const p of pags) p.sh = shingles(p.t);
const pior = [];
for (let i = 0; i < pags.length; i++) for (let j = i + 1; j < pags.length; j++) {
  const a = pags[i], b = pags[j];
  if (a.tipo !== b.tipo || !a.d.humanizado || !b.d.humanizado) continue;
  let c = 0; for (const x of a.sh) if (b.sh.has(x)) c++;
  const sim = c / Math.min(a.sh.size, b.sh.size);
  pior.push([sim, a.slug, b.slug]);
}
pior.sort((x, y) => y[0] - x[0]);
const feitos = pags.filter(p => p.d.humanizado);
console.log(`com texto: ${feitos.length}/${pags.length} | palavras: ${Math.min(...feitos.map(p => p.palavras))} a ${Math.max(...feitos.map(p => p.palavras))}`);
console.log('mais parecidas (mesmo tipo):');
for (const [s, a, b] of pior.slice(0, 8)) console.log(`  ${(s * 100).toFixed(0)}%  ${a}  x  ${b}`);
console.log(avisos.length ? 'AVISOS:\n' + avisos.join('\n') : 'sem avisos');
