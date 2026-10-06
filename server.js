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

// Favicon direto com a logo do pet shop (sem o texto Palmira)
app.get('/favicon.ico', (req, res) => {
  const icoPath = path.join(staticDir, 'favicon.ico');
  res.setHeader('Content-Type', 'image/x-icon');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.sendFile(icoPath);
});

app.get(['/favicon.png', '/assets/images/favicon-logo.png'], (req, res) => {
  const pngPath = path.join(staticDir, 'favicon.png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.sendFile(pngPath);
});

// Suporte a download da Proposta PinkVet em PDF
app.get(['/Apresentacao_Proposta_PinkVet.pdf', '/proposta-pinkvet.pdf', '/pinkvet.pdf'], (req, res) => {
  const pdfPath = path.join(staticDir, 'Apresentacao_Proposta_PinkVet.pdf');
  if (fs.existsSync(pdfPath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Apresentacao_Proposta_PinkVet.pdf"');
    return res.sendFile(pdfPath);
  }
  res.status(404).send('PDF não encontrado');
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
