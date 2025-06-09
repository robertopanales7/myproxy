const express = require('express');
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// Logging
app.use(morgan('dev'));

// CORS (opcional pero recomendable)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Info
app.get('/info', (req, res) => {
    res.send('✅ This service returns static JSON data mimicking JSONPlaceholder.');
});

// Root redirect
app.get('/', (req, res) => {
    res.redirect('/info');
});

// Fake posts data (acortado aquí, puedes pegar todos los objetos que quieras)
const posts = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae..."
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae..."
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure..."
  }
  // ...continúa pegando los demás objetos aquí
];

// Ruta para devolver los posts
app.get('/json_placeholder/posts', (req, res) => {
    res.json(posts);
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`✅ Server running at http://${HOST}:${PORT}`);
});
