// Resolves every image used on the site to a real, openly licensed Wikimedia Commons file.
// Source of truth: scripts/image-sources.mjs (key -> Wikipedia article lead image, or explicit Commons file).
// Output: src/data/images.json with URL, author, licence and source page for every key.
// Files that are not hosted on Commons (i.e. non-free "fair use" uploads) are rejected, so the site
// falls back to a labelled placeholder instead.
import fs from 'node:fs';
import { IMAGE_SOURCES } from './image-sources.mjs';

const UA = 'NammaKarnatakaRajyotsava/1.0 (educational office celebration site)';
const API = 'https://en.wikipedia.org/w/api.php';

async function api(params) {
  const url = API + '?' + new URLSearchParams({ format: 'json', formatversion: '2', origin: '*', ...params });
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (res.ok) return res.json();
    await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
  }
  throw new Error('API failed: ' + url);
}

const strip = (html = '') =>
  html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim();

const chunk = (arr, n) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

async function main() {
  const entries = Object.entries(IMAGE_SOURCES);
  const fileFor = {};

  // 1. Article lead images
  const byArticle = entries.filter(([, v]) => v.article);
  for (const group of chunk(byArticle, 40)) {
    const data = await api({ action: 'query', prop: 'pageimages', piprop: 'name', redirects: '1', titles: group.map(([, v]) => v.article).join('|') });
    const norm = {};
    for (const n of data.query.normalized || []) norm[n.from] = n.to;
    for (const r of data.query.redirects || []) norm[r.from] = r.to;
    const pageByTitle = Object.fromEntries((data.query.pages || []).map((p) => [p.title, p]));
    for (const [key, v] of group) {
      let t = v.article;
      while (norm[t]) t = norm[t];
      const p = pageByTitle[t];
      if (p && p.pageimage) fileFor[key] = 'File:' + p.pageimage;
      else console.warn('  no lead image:', key, v.article);
    }
  }
  // 2. Explicit Commons files override
  for (const [key, v] of entries) if (v.file) fileFor[key] = v.file.startsWith('File:') ? v.file : 'File:' + v.file;

  // 3. Metadata + thumbnails
  const out = {};
  const files = [...new Set(Object.values(fileFor))];
  const info = {};
  for (const group of chunk(files, 40)) {
    const data = await api({ action: 'query', prop: 'imageinfo', iiprop: 'url|extmetadata|size', iiurlwidth: '1600', titles: group.join('|') });
    const norm = {};
    for (const n of data.query.normalized || []) norm[n.to] = n.from;
    for (const p of data.query.pages || []) {
      const ii = p.imageinfo && p.imageinfo[0];
      if (!ii) continue;
      info[norm[p.title] || p.title] = { ii, title: p.title };
    }
  }
  for (const [key, file] of Object.entries(fileFor)) {
    const rec = info[file];
    if (!rec) { console.warn('  missing file:', key, file); continue; }
    const { ii } = rec;
    const m = ii.extmetadata || {};
    if (!/commons\.wikimedia\.org/.test(ii.descriptionurl)) { console.warn('  non-commons (skipped):', key, file); continue; }
    if (m.NonFree && m.NonFree.value === 'true') { console.warn('  non-free (skipped):', key, file); continue; }
    out[key] = {
      file: rec.title.replace(/^File:/, ''),
      src: ii.thumburl || ii.url,
      w: ii.thumbwidth || ii.width,
      h: ii.thumbheight || ii.height,
      page: ii.descriptionurl,
      author: strip(m.Artist && m.Artist.value) || 'Unknown author',
      license: strip(m.LicenseShortName && m.LicenseShortName.value) || 'See source page',
      licenseUrl: (m.LicenseUrl && m.LicenseUrl.value) || ii.descriptionurl,
      description: strip(m.ImageDescription && m.ImageDescription.value).slice(0, 300),
    };
  }
  fs.writeFileSync(new URL('../src/data/images.json', import.meta.url), JSON.stringify(out, null, 1));
  console.log(`Resolved ${Object.keys(out).length}/${entries.length} images`);
  for (const [k, v] of Object.entries(out)) console.log(k.padEnd(22), v.file.slice(0, 90));
}
main();
