const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Logging
app.use(morgan('dev'));

// Proxy middleware para redirigir todas las peticiones a jsonplaceholder.typicode.com
app.use('/', createProxyMiddleware({
  target: 'https://jsonplaceholder.typicode.com',
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
}));

app.listen(PORT, HOST, () => {
  console.log(`✅ Proxy HTTP/HTTPS escuchando en el puerto ${PORT}`);
});
