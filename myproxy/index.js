const http = require('http');
const net = require('net');
const url = require('url');
const HttpProxy = require('http-proxy');

const proxy = HttpProxy.createProxyServer({});

// Puerto que asigna Render o 3000 local
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Proxy para peticiones HTTP normales
  proxy.web(req, res, { target: req.url, changeOrigin: true }, (err) => {
    res.writeHead(502);
    res.end('Bad Gateway');
  });
});

// Soporte para método CONNECT (túnel HTTPS)
server.on('connect', (req, clientSocket, head) => {
  const { port, hostname } = url.parse(`http://${req.url}`);

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

server.listen(PORT, () => {
  console.log(`✅ Proxy HTTP/HTTPS escuchando en el puerto ${PORT}`);
});
