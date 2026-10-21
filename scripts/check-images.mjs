// Verifies every image URL in src/data/images.json responds (HEAD), politely and sequentially.
import fs from 'node:fs';
const imgs = JSON.parse(fs.readFileSync(new URL('../src/data/images.json', import.meta.url)));
let bad = 0;
for (const [k, v] of Object.entries(imgs)) {
  let status = 0;
  for (let a = 0; a < 3 && status !== 200; a++) {
    const r = await fetch(v.src, { method: 'HEAD', headers: { 'User-Agent': 'NammaKarnatakaRajyotsava/1.0 (image check)' } }).catch(() => null);
    status = r ? r.status : 0;
    if (status === 429) await new Promise((x) => setTimeout(x, 3000));
  }
  if (status !== 200) { bad++; console.log('BAD', status, k, v.src); }
  await new Promise((x) => setTimeout(x, 250));
}
console.log('checked', Object.keys(imgs).length, 'bad', bad);
