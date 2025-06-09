const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";

// Logging
app.use(morgan('dev'));

// CORS headers (opcional pero útil si accedes desde navegador)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('✅ This is a proxy service which proxies to JSONPlaceholder API.');
});

// Root redirect to /info
app.get('/', (req, res) => {
    res.redirect('/info');
});

// Proxy endpoints (sin autenticación)
app.use('/json_placeholder', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/json_placeholder`]: '',
    },
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`✅ Starting Proxy at ${HOST}:${PORT}`);
});
