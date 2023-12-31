import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import EventEmitter from 'events';
import { IncomingMessage, ServerResponse } from 'http';

const serverHit = new EventEmitter();
const PORT: number | string = process.env.PORT || 3300;
//const certs = {
//  key: fs.readFileSync('/etc/ssl/sslTime/privateKey.pem'),
//  cert: fs.readFileSync('/etc/ssl/sslTime/originCert.pem'),
//};
//const certs = {
//  key: fs.readFileSync('/etc/ssl/sslTime/timesup.test.key'),
//  cert: fs.readFileSync('/etc/ssl/sslTime/timesup.test.crt'),
//  passphrase: 'Priknedis'
//};

const serveFile = async (filePath: string, contentType: string, httpResponse: any): Promise<void> => {
  console.log('line 10', filePath, contentType);
  try {
    const data = await fsPromises.readFile(filePath, 'utf8');
    httpResponse.writeHead(200, { 'Content-Type': contentType });
    httpResponse.end(data);
  } catch (error) {
    console.log(error);
    httpResponse.statusCode = 500;
    httpResponse.end();
  }
}

serverHit.on('hit', (request: IncomingMessage) => {
  const time = new Date();
  fs.appendFileSync(path.join(__dirname, '..', 'log.txt'),
  `host: ${request.headers.host}\turl: ${request.url}\n\tmethod: ${request.method}\n\tdate: ${time}\n`);
});

const parseRequest = (request: any, response: ServerResponse): void => {
    console.log(request.url);
//  if (request.headers.host.includes('timer')) {
//    console.log('good');
//    response.writeHead(301, { 'Location': 'http://chrisjohnedis.com:3500' });
//    response.end();
//  }
//  console.log(`hit number: ${serverHits}, ${request.url} ${request.method}`);

  serverHit.emit('hit', request);

//  console.log('incoming url', request.url);
//  console.log(request.headers);
  if (request.url) {
    const extension: any  = path.extname(request.url);
    let contentType: string;

    switch (extension) {
      case '.css':
        contentType = 'text/css';
      break;
      case '.js':
        contentType = 'text/javascript';
      break;
      case '.json':
        contentType = 'application/json';
      break;
      case '.jpg':
        contentType = 'image/jpeg';
      break;
      case '.png':
        contentType = 'image/png';
      break;
      case '.txt':
        contentType = 'text/plain';
      break;
      default:
        contentType = 'text/html';
    }

    let filePath = 
      contentType === 'text/html' && request.url === '/'
        ? path.join(__dirname, '..', 'home.html')
          : contentType === 'text/html' && request.url === '/home.html'
            ? path.join(__dirname, '..', 'home.html')
              : contentType === 'text/css'
                ? path.join(__dirname, '..', path.basename(request.url))
                  : path.join(__dirname, '..', request.url);

      console.log('88', filePath);
    // ensures spa won't try to reload to the current spot
    if (!extension && request.url?.slice(-1) !== '/') {
      filePath = path.join(__dirname, '..', '/home.html');
      console.log('92', filePath);
    }

    console.log('check file path', filePath);
//    // check if file exists
    let fileExists = fs.existsSync(filePath);


    if (fileExists) {
      // serve file
//      console.log(`congrats, we will serve the file: ${filePath}`);
      serveFile(filePath, contentType, response);

    } else {
//      console.log(`file didn't exist`);
      // 301 redirect
      switch(path.parse(filePath).base) {
        case 'unused-url.html':
          response.writeHead(301, { 'Location': '/index.html' });
          response.end();
          break;
        case 'www-something.html':
          response.writeHead(301, { 'Location': '/' });
          response.end();
          break;
        default:
////          serve a 404
//          console.log('trouble at the mill');
//          serveFile(path.join(__dirname, '..', '..', 'client', 'src', '404.html'), 'text/html', response);
      };
    };

//    console.log(`line 94: contentType: ${contentType}, extension: ${extension}, filePath ${filePath}, request.url: ${request.url}`);
  }
} 

const server = http.createServer(parseRequest);
server.listen(PORT, () => console.log(`server is running on ${PORT}`));
