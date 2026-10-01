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

// Endpoint estático de produtos
const getProdutosHandler = (req, res) => {
  const jsonPath = path.join(__dirname, 'data', 'produtos.json');
  if (fs.existsSync(jsonPath)) {
    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.sendFile(jsonPath);
  }
  res.json([]);
};

app.get('/api/produtos', getProdutosHandler);
app.get('/pet-shop-palmira/api/produtos', getProdutosHandler);

// Favicon direto com a logo do pet shop
app.get(['/favicon.ico', '/favicon.png'], (req, res) => {
  const logoPath = path.join(staticDir, 'assets', 'images', 'logopetshoppalmira.png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.sendFile(logoPath);
});

// Suporte a rota /informacoes e /Informacoes
app.use(['/informacoes', '/Informacoes'], express.static(path.join(staticDir, 'Informacoes'), { extensions: ['html', 'htm'] }));

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
