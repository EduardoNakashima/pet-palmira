import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const produtosDir = path.join(rootDir, 'pet-shop-palmira', 'data', 'produtos');
const outputFile = path.join(rootDir, 'pet-shop-palmira', 'data', 'produtos.json');

if (!fs.existsSync(produtosDir)) {
  console.log(`[build-products] Pasta ${produtosDir} não encontrada.`);
  process.exit(0);
}

const files = fs.readdirSync(produtosDir).filter(file => file.endsWith('.json'));
const produtos = [];

for (const file of files) {
  try {
    const raw = fs.readFileSync(path.join(produtosDir, file), 'utf-8');
    const data = JSON.parse(raw);
    if (!data.id) {
      data.id = path.basename(file, '.json');
    }
    produtos.push(data);
  } catch (err) {
    console.warn(`[build-products] Aviso: erro ao ler ${file}:`, err.message);
  }
}

fs.writeFileSync(outputFile, JSON.stringify(produtos, null, 2), 'utf-8');
console.log(`[build-products] ✅ ${produtos.length} produtos compilados com sucesso para ${outputFile}`);
