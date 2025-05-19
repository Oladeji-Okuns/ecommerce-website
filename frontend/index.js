const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('E-commerce Frontend is currently running');
});

server.listen(3000, () => {
  console.log('Frontend running on port 3000');
});
