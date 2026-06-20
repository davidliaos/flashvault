import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "node_modules", "@ruffle-rs", "ruffle");
const dest = path.join(root, "public", "ruffle");

const PATTERNS = [/^ruffle\.js$/, /^core\.ruffle\..+\.js$/, /^.+\.wasm$/];

if (!fs.existsSync(src)) {
  console.error("Missing @ruffle-rs/ruffle — run npm install first.");
  process.exit(1);
}

fs.mkdirSync(dest, { recursive: true });

const files = fs.readdirSync(src).filter((name) => PATTERNS.some((re) => re.test(name)));
if (files.length === 0) {
  console.error("No Ruffle assets found in", src);
  process.exit(1);
}

for (const name of files) {
  fs.copyFileSync(path.join(src, name), path.join(dest, name));
}

console.log(`Copied ${files.length} Ruffle files → public/ruffle/`);
