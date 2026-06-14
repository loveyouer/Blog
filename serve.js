const http = require('http');
const fs = require('fs');

const PORT = 8889;
const ROOT = 'E:\\Workspace\\Project\\CRTBlog\\out';

const MIME = {
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
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // 1. 解码 URL，去掉查询参数
  let url = decodeURIComponent(req.url).split('?')[0];

  // 2. 去掉开头的 /
  let rel = url.startsWith('/') ? url.slice(1) : url;

  // 3. 空路径 = 首页
  if (!rel) rel = 'index.html';

  // 4. 将 URL 的 / 替换成 Windows 的 \
  const localPath = ROOT + '\\' + rel.replace(/\//g, '\\');

  // 5. 检查文件或目录
  let filePath = null;

  if (fs.existsSync(localPath)) {
    const stat = fs.statSync(localPath);
    if (stat.isFile()) {
      filePath = localPath;
    } else if (stat.isDirectory()) {
      const indexPath = localPath + '\\index.html';
      if (fs.existsSync(indexPath)) {
        filePath = indexPath;
      }
    }
  }

  // 6. 尝试加 .html
  if (!filePath) {
    const htmlPath = localPath + '.html';
    if (fs.existsSync(htmlPath)) {
      filePath = htmlPath;
    }
  }

  // 7. 如果是目录（不带尾斜杠），尝试 index.html
  if (!filePath) {
    const indexPath = localPath + '\\index.html';
    if (fs.existsSync(indexPath)) {
      filePath = indexPath;
    }
  }

  console.log(req.url, '→', filePath || '404');

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1><p>' + req.url + '</p>');
    return;
  }

  const ext = filePath.slice(filePath.lastIndexOf('.')).toLowerCase();
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('500');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('✓ Server at http://localhost:' + PORT + '/');
});
