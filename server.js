const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
 console.log('request has been made from browser to server');

 res.setHeader('Content-Type', 'text/html');

 let path = './views'

 switch(req.url){
  case '/':
   path +='/index.html'
   res.statusCode = 200;
   break;
  case '/about':
   path += '/about.html'
   res.statusCode = 200;
   break;
  case '/contact':
   path += '/contact.html'
   res.statusCode = 200;
   break;
  default:
   path += '/notfound.html'
   res.statusCode = 404;
   break;
 }

 // Read the HTML file and send it as the response
 fs.readFile(path, (err, data) => {
  if (err) {
   console.error(`Error reading file ${path}:`, err);
   res.end('<h1>Internal Server Error</h1>');
  } else {
   res.end(data);
  }
 });

})

const PORT = 3000;

server.listen(PORT, () => {
 console.log(`Server is listening on port ${PORT}`);
});
