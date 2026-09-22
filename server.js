import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const staticDir = __dirname;

// API dinâmica para ler produtos direto da pasta data/produtos/
const getProdutosHandler = (req, res) => {
  const produtosDir = path.join(__dirname, 'data', 'produtos');
  const produtos = [];

  if (fs.existsSync(produtosDir)) {
    try {
      const files = fs.readdirSync(produtosDir).filter(file => file.endsWith('.json'));
      for (const file of files) {
        try {
          const raw = fs.readFileSync(path.join(produtosDir, file), 'utf-8');
          const data = JSON.parse(raw);
          if (!data.id) {
            data.id = path.basename(file, '.json');
          }
          produtos.push(data);
        } catch (err) {
          console.warn(`[API] Erro ao processar arquivo ${file}:`, err.message);
        }
      }
    } catch (err) {
      console.warn('[API] Erro ao ler pasta de produtos:', err.message);
    }
  }

  // Se a pasta não tiver arquivos, tenta ler do produtos.json compilado
  if (produtos.length === 0) {
    const jsonPath = path.join(__dirname, 'data', 'produtos.json');
    if (fs.existsSync(jsonPath)) {
      try {
        const raw = fs.readFileSync(jsonPath, 'utf-8');
        return res.json(JSON.parse(raw));
      } catch (e) {}
    }
  }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.json(produtos);
};

app.get('/api/produtos', getProdutosHandler);
app.get('/pet-shop-palmira/api/produtos', getProdutosHandler);

// Serve static assets with automatic .html extension handling
app.use(express.static(staticDir, { extensions: ['html', 'htm'] }));

// Also mount under /pet-shop-palmira to ensure compatibility with relative paths
app.use('/pet-shop-palmira', express.static(staticDir, { extensions: ['html', 'htm'] }));

// Fallback to index.html
app.get('*', (req, res) => {
  const indexPath = path.join(staticDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Pet Shop Palmira server running at http://${HOST}:${PORT}`);
});
