const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Proxy middleware: reenvía todas las peticiones a jsonplaceholder.typicode.com
app.use('/', createProxyMiddleware({
  target: 'https://jsonplaceholder.typicode.com',
  changeOrigin: true,
  secure: true,
  logLevel: 'debug'  // Para ver logs en consola (opcional)
}));

app.listen(PORT, HOST, () => {
  console.log(`✅ Proxy server running at http://${HOST}:${PORT}`);
});
