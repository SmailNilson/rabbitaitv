// Writes src/data/imageManifest.json: the size and a tiny blurred preview of
// every image used by a blog article. Run `npm run images:manifest` after
// adding images. An image missing from the manifest still works, it just has
// no preview and, inside an article, no reserved space.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const articles = JSON.parse(fs.readFileSync(path.join(root, 'src/data/articles.json'), 'utf8'));

const sources = new Set();
for (const article of articles) {
    if (article.image) sources.add(article.image);
    for (const [, src] of article.content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) sources.add(src);
}

const manifest = {};
for (const src of [...sources].filter((s) => s.startsWith('/')).sort()) {
    const file = path.join(root, 'public', src);
    if (!fs.existsSync(file)) {
        console.warn(`Skipped, file not found: ${src}`);
        continue;
    }
    const { width, height } = await sharp(file).metadata();
    const preview = await sharp(file).resize(16).webp({ quality: 40 }).toBuffer();
    manifest[src] = { width, height, blur: `data:image/webp;base64,${preview.toString('base64')}` };
}

fs.writeFileSync(path.join(root, 'src/data/imageManifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`${Object.keys(manifest).length} images`);
