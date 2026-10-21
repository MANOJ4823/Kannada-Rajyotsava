// Dev helper: search Wikimedia Commons file namespace. Usage: node scripts/search-commons.mjs "query1" "query2"
const UA = 'NammaKarnatakaRajyotsava/1.0';
for (const q of process.argv.slice(2)) {
  await new Promise((r) => setTimeout(r, 6000));
  const u = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({ action: 'query', list: 'search', srsearch: q, srnamespace: '6', srlimit: '6', format: 'json' });
  const d = await (await fetch(u, { headers: { 'User-Agent': UA } })).json();
  console.log('## ' + q);
  for (const r of d.query.search) console.log('   ' + r.title + ' :: ' + r.snippet.replace(/<[^>]+>/g, '').slice(0, 110));
}
