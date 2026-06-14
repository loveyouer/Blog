const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;
// 使用绝对路径，确保在 Windows 和 Git Bash 中都能正确解析
const ROOT = path.join('E:', 'Workspace', 'Project', 'CRTBlog', 'out');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  let filePath = path.join(ROOT, pathname);

  // 如果请求根目录，返回 index.html
  if (pathname === '/') {
    filePath = path.join(ROOT, 'index.html');
  }
  // 如果路径以 / 结尾，是目录，尝试返回 index.html
  else if (pathname.endsWith('/')) {
    filePath = path.join(filePath, 'index.html');
  }

  console.log('Request:', pathname, '→ Resolved:', filePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // 尝试加 .html 后缀
      const htmlPath = filePath + '.html';
      fs.stat(htmlPath, (err2, stats2) => {
        if (!err2 && stats2.isFile()) {
          serveFile(htmlPath, res);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1><p>Path: ' + pathname + '</p>');
        }
      });
      return;
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (err2) => {
        if (!err2) {
          serveFile(indexPath, res);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1>');
        }
      });
      return;
    }

    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 Internal Server Error</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT + '/');
  console.log('Serving from: ' + ROOT);
  console.log('Index exists: ' + fs.existsSync(path.join(ROOT, 'index.html')));
});
