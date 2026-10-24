import { useMemo, useState } from 'react';
import IMAGES from '../data/images.json';
import { Badge, Reveal, SectionHead } from '../components/ui.jsx';
import { SRC } from '../data/sources.js';

const PRINCIPLES = [
  { kind: 'fact', d: 'Directly supported by inscriptions, monuments, archaeological finds, official records or the consensus of standard scholarship.' },
  { kind: 'interpretation', d: 'A reading of evidence by historians — for example, attributing a monument to a patron on the basis of a later grant, or a debated date.' },
  { kind: 'tradition', d: 'Dynastic legends, folklore, family accounts and popular anecdotes. Valuable and respected — but not presented as proven fact.' },
  { kind: 'disputed', d: 'Where scholars or communities disagree, we say so and describe the disagreement rather than choosing a convenient answer.' },
];

export default function SourcesPage() {
  const [q, setQ] = useState('');
  const imgs = useMemo(() => Object.entries(IMAGES).filter(([k, v]) => (k + v.file + v.author).toLowerCase().includes(q.toLowerCase())), [q]);
  const official = Object.values(SRC).filter((s) => typeof s === 'object' && s.kind?.startsWith('Official'));
  const scholarly = Object.values(SRC).filter((s) => typeof s === 'object' && s.kind === 'Scholarly');
  return (
    <>
      <section className="section theme-night" style={{ paddingTop: 160 }}>
        <div className="wrap stack">
          <div className="eyebrow">Editorial method</div>
          <h1 className="h1">Sources, certainty & image credits</h1>
          <p className="lede">This site separates established fact, scholarly interpretation, oral tradition and disputed claims. Nothing here is invented — no dates, awards, GI registrations, UNESCO statuses or image credits — and where we could not verify something, we say so or leave it out.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid g4">
          {PRINCIPLES.map((p) => <Reveal key={p.kind} className="panel stack"><Badge kind={p.kind} /><p className="small" style={{ margin: 0 }}>{p.d}</p></Reveal>)}
        </div>
        <div className="wrap grid g2 mt-5">
          <div>
            <h2 className="h3 mb-3">Official & institutional sources</h2>
            <ul className="source-list" style={{ gridTemplateColumns: '1fr' }}>{official.map((s) => <li key={s.url + s.label}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>{s.note && <div className="tiny muted">{s.note}</div>}</li>)}</ul>
          </div>
          <div>
            <h2 className="h3 mb-3">Scholarly works</h2>
            <ul className="source-list" style={{ gridTemplateColumns: '1fr' }}>{scholarly.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>{s.note && <div className="tiny muted">{s.note}</div>}</li>)}</ul>
            <h2 className="h3 mb-3 mt-4">Map data</h2>
            <ul className="source-list" style={{ gridTemplateColumns: '1fr' }}>
              <li><a href="https://github.com/udit-001/india-maps-data" target="_blank" rel="noreferrer">india-maps-data</a> — Census 2011 district boundaries for Karnataka and India (state outlines merged from districts). <div className="tiny muted">Used for all Karnataka and India maps; present-day boundaries, never presented as historical frontiers.</div></li>
              <li><a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a> — 1:10m river centrelines (public domain).</li>
            </ul>
            <h2 className="h3 mb-3 mt-4">Verification notes</h2>
            <ul className="small" style={{ paddingLeft: 18 }}>
              <li>Tongue twisters 4–10 were composed for this site and should be reviewed by a fluent Kannada speaker before the event.</li>
              <li>Where no openly licensed photograph of a subject could be verified (e.g. Bhuvaneshwari, Veeragase, early poets), a labelled placeholder is shown.</li>
              <li>Wikipedia is cited only as a secondary summary that points to primary sources.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section theme-sand" id="credits">
        <div className="wrap">
          <div className="row between mb-4">
            <SectionHead eyebrow={`${Object.keys(IMAGES).length} photographs`} title="Image credits" lede="Every image is an openly licensed file on Wikimedia Commons, shown with its author and licence. Select a file name to see the original." />
            <label className="field" style={{ minWidth: 260 }}><span className="small">Filter</span><input className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Hampi" /></label>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="small" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--line)' }}><th style={{ padding: 8 }}>Preview</th><th>File</th><th>Author</th><th>Licence</th></tr></thead>
              <tbody>
                {imgs.map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid var(--line)', verticalAlign: 'top' }}>
                    <td style={{ padding: 8, width: 84 }}><img src={v.thumb || v.src} alt="" loading="lazy" style={{ width: 72, height: 54, objectFit: 'cover', borderRadius: 4 }} /></td>
                    <td style={{ padding: '8px 8px 8px 0' }}>{v.page ? <a href={v.page} target="_blank" rel="noreferrer">{v.file}</a> : v.file}</td>
                    <td style={{ padding: '8px 8px 8px 0', maxWidth: 260 }}>{v.author}</td>
                    <td style={{ padding: '8px 0' }}>{v.licenseUrl ? <a href={v.licenseUrl} target="_blank" rel="noreferrer">{v.license}</a> : v.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
