import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 4173);
const host = process.argv[4] ?? "127.0.0.1";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const notFoundPage = join(root, "404.html");

const server = createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent((request.url ?? "/").split("?")[0]);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  const requested = normalize(join(root, pathname));
  const insideRoot = requested === root || requested.startsWith(root + sep);
  if (!insideRoot) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  let filePath = requested;
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  if (!existsSync(filePath)) {
    if (existsSync(notFoundPage)) {
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      createReadStream(notFoundPage).pipe(response);
      return;
    }
    response.writeHead(404).end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": MIME_TYPES[extname(filePath)] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});
