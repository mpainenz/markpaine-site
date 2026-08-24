import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

function resolveRequest(root, requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname);
  const relativePath = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
  const filePath = path.resolve(root, `.${relativePath}`);

  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    throw new Error('Request path escapes the static output directory.');
  }

  return filePath;
}

export async function startStaticServer(rootDirectory) {
  const root = path.resolve(rootDirectory);
  const notFoundPath = path.join(root, '404.html');

  const server = http.createServer(async (request, response) => {
    try {
      const filePath = resolveRequest(root, request.url ?? '/');
      const body = await readFile(filePath);
      response.writeHead(200, {
        'content-type': contentTypes[path.extname(filePath)] ?? 'application/octet-stream',
      });
      response.end(body);
    } catch {
      try {
        const body = await readFile(notFoundPath);
        response.writeHead(404, { 'content-type': contentTypes['.html'] });
        response.end(body);
      } catch {
        response.writeHead(404, { 'content-type': contentTypes['.txt'] });
        response.end('Not found');
      }
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    server.close();
    throw new Error('Static server did not expose a TCP port.');
  }

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve()))),
  };
}
