import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  let port = 3007;
  let dir = path.join(path.dirname(__dirname), "out");
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--port" && argv[i + 1]) port = Number(argv[++i]);
    if (argv[i] === "--dir" && argv[i + 1]) dir = argv[++i];
  }
  return { port, dir: path.resolve(dir) };
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".wasm": "application/wasm",
  ".swf": "application/x-shockwave-flash",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolveFile(root, urlPath) {
  const safe = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  let rel = safe.startsWith("/") ? safe.slice(1) : safe;
  if (!rel || rel.endsWith("/")) rel = path.join(rel, "index.html");
  const file = path.join(root, rel);
  if (!file.startsWith(root)) return null;
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  const html = `${file}.html`;
  if (fs.existsSync(html) && fs.statSync(html).isFile()) return html;
  const index = path.join(file, "index.html");
  if (fs.existsSync(index) && fs.statSync(index).isFile()) return index;
  const fallback = path.join(root, "404.html");
  if (fs.existsSync(fallback)) return fallback;
  return null;
}

const { port, dir } = parseArgs(process.argv.slice(2));
if (!fs.existsSync(dir)) {
  console.error(`Missing output dir: ${dir}`);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const file = resolveFile(dir, decodeURIComponent(new URL(req.url, "http://localhost").pathname));
  if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`FlashVault preview: http://127.0.0.1:${port}/`);
});
