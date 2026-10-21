// Dev helper: show resolution, licence, description and categories of Commons files.
// Usage: node scripts/inspect-commons.mjs "File:A.jpg" "File:B.jpg"
const UA = 'NammaKarnatakaRajyotsava/1.0';
const strip = (h = '') => h.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const titles = process.argv.slice(2).map((t) => (t.startsWith('File:') ? t : 'File:' + t));
for (let i = 0; i < titles.length; i += 20) {
  const u = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
    action: 'query', prop: 'imageinfo|categories', iiprop: 'size|extmetadata', cllimit: '30', format: 'json', formatversion: '2', titles: titles.slice(i, i + 20).join('|'),
  });
  const d = await (await fetch(u, { headers: { 'User-Agent': UA } })).json();
  for (const p of d.query.pages) {
    const ii = p.imageinfo?.[0];
    if (!ii) { console.log('MISSING', p.title); continue; }
    const m = ii.extmetadata || {};
    console.log(`## ${p.title}\n   ${ii.width}x${ii.height} · ${strip(m.LicenseShortName?.value)} · ${strip(m.Artist?.value).slice(0, 60)}\n   ${strip(m.ImageDescription?.value).slice(0, 220)}\n   cats: ${(p.categories || []).map((c) => c.title.replace('Category:', '')).join('; ').slice(0, 260)}`);
  }
  await new Promise((r) => setTimeout(r, 1500));
}
