const express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');

const PORT = process.env.PORT || 10000;
const HOST = '0.0.0.0';

const proxy = httpProxy.createProxyServer({});

// Crear servidor HTTP que maneje también CONNECT para túneles HTTPS
const server = http.createServer((req, res) => {
  // Proxy normal HTTP
  proxy.web(req, res, { target: 'https://jsonplaceholder.typicode.com' }, (err) => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad gateway');
  });
});

// Manejar método CONNECT para túneles HTTPS (muy importante para Proxifier)
server.on('connect', (req, clientSocket, head) => {
  const { port, hostname } = new URL(`http://${req.url}`);

  const serverSocket = net.connect(port || 443, hostname, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });

  serverSocket.on('error', () => {
    clientSocket.write('HTTP/1.1 502 Bad Gateway\r\n\r\n');
    clientSocket.end();
  });
});

server.listen(PORT, HOST, () => {
  console.log(`✅ Proxy HTTP/HTTPS escuchando en el puerto ${PORT}`);
});
