// Copie les builds UMD de React vers public/vendor
// afin qu'ils puissent être chargés dans l'iframe sandbox (éditeur intégré).
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const files = [
  ['node_modules/react/umd/react.production.min.js', 'public/vendor/react.js'],
  ['node_modules/react-dom/umd/react-dom.production.min.js', 'public/vendor/react-dom.js'],
];

for (const [src, dest] of files) {
  const from = join(root, src);
  const to = join(root, dest);
  if (!existsSync(from)) {
    console.warn(`[vendor] Introuvable : ${src} (ignoré)`);
    continue;
  }
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  console.log(`[vendor] ${src} -> ${dest}`);
}
