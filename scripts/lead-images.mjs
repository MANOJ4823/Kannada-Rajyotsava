// Dev helper: print the lead image (file, size, licence, description) of Wikipedia articles.
// Usage: node scripts/lead-images.mjs "Article A" "Article B"
const UA = 'NammaKarnatakaRajyotsava/1.0';
const strip = (h = '') => h.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const api = async (base, p) => (await fetch(base + '?' + new URLSearchParams({ format: 'json', formatversion: '2', ...p }), { headers: { 'User-Agent': UA } })).json();
const titles = process.argv.slice(2);
const d = await api('https://en.wikipedia.org/w/api.php', { action: 'query', prop: 'pageimages', piprop: 'name', redirects: '1', titles: titles.join('|') });
for (const p of d.query.pages) {
  if (!p.pageimage) { console.log('## ' + p.title + ' :: no lead image' + (p.missing ? ' (missing article)' : '')); continue; }
  await new Promise((r) => setTimeout(r, 2500));
  const f = await api('https://commons.wikimedia.org/w/api.php', { action: 'query', prop: 'imageinfo', iiprop: 'size|extmetadata', titles: 'File:' + p.pageimage });
  const ii = f.query.pages[0].imageinfo?.[0];
  const m = ii?.extmetadata || {};
  console.log(`## ${p.title}\n   ${p.pageimage}\n   ${ii ? ii.width + 'x' + ii.height : 'not on Commons'} · ${strip(m.LicenseShortName?.value)} · ${strip(m.ImageDescription?.value).slice(0, 160)}`);
}
