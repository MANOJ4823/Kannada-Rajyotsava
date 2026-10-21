import { useEffect, useMemo, useState } from 'react';
import { Img, NextChapter, Note, Reveal, SectionHead, Sources } from '../components/ui.jsx';
import { KA_DISTRICTS, KA_OUTLINE, KA_REGIONS, KA_VIEW } from '../components/maps.jsx';
import { REGIONS_1956, UNIFICATION_STAGES } from '../data/unification.js';
import { SRC } from '../data/sources.js';
import { useLang } from '../i18n.jsx';

const [W, H] = KA_VIEW;
const CENTER = [W / 2, H / 2];
const centroids = (() => {
  const acc = {};
  KA_DISTRICTS.forEach((d) => { (acc[d.region] ||= []).push([d.cx, d.cy]); });
  return Object.fromEntries(Object.entries(acc).map(([k, pts]) => [k, [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length]]));
})();

function UnificationMap({ stage, sel, onSel }) {
  const st = UNIFICATION_STAGES[stage];
  const merged = new Set(st.merged);
  return (
    <svg viewBox={`-60 -40 ${W + 120} ${H + 80}`} className="map-svg" role="group" aria-label={`Map: ${st.year} — ${st.title}`}>
      <title>{st.title}</title>
      {Object.entries(KA_REGIONS).map(([key, d]) => {
        const c = centroids[key];
        const apart = !merged.has(key);
        const dx = apart ? (c[0] - CENTER[0]) * 0.16 : 0;
        const dy = apart ? (c[1] - CENTER[1]) * 0.16 : 0;
        const unified = st.merged.length === 6;
        const fill = unified ? (st.renamed ? '#c4362c' : '#d9a92f') : merged.has(key) ? '#d9a92f' : REGIONS_1956[key].color;
        const isSel = sel === key;
        return (
          <path key={key} d={d} className="region" tabIndex={0} role="button"
            aria-label={`${REGIONS_1956[key].label}: ${REGIONS_1956[key].joined}`} aria-pressed={isSel}
            onClick={() => onSel(key)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSel(key))}
            style={{
              fill, transform: `translate(${dx}px, ${dy}px)`, transition: 'transform 1.4s cubic-bezier(.2,.7,.1,1), fill 1.2s',
              stroke: unified ? fill : '#fff', strokeWidth: isSel ? 3 : 1.2, opacity: sel && !isSel && !unified ? 0.55 : 1,
            }}>
            <title>{REGIONS_1956[key].label}</title>
          </path>
        );
      })}
      <path d={KA_OUTLINE} fill="none" stroke="#fff" strokeWidth="2" style={{ opacity: st.merged.length === 6 ? 1 : 0, transition: 'opacity 1s 0.8s' }} />
      {st.merged.length < 6 && Object.entries(centroids).map(([key, c]) => {
        const apart = !merged.has(key);
        const dx = apart ? (c[0] - CENTER[0]) * 0.16 : 0, dy = apart ? (c[1] - CENTER[1]) * 0.16 : 0;
        return (
          <text key={key} x={c[0] + dx} y={c[1] + dy} textAnchor="middle" className="label"
            style={{ fontSize: 14, fontWeight: 600, fill: '#fff', stroke: 'rgba(0,0,0,.35)', strokeWidth: 3, transition: 'all 1.4s cubic-bezier(.2,.7,.1,1)' }}>
            {REGIONS_1956[key].label.split(' (')[0]}
          </text>
        );
      })}
      {st.merged.length === 6 && (
        <text x={W / 2} y={H / 2 + 20} textAnchor="middle" style={{ fontFamily: 'var(--serif)', fontSize: 46, fill: '#fff', letterSpacing: '0.08em', transition: 'all 1s' }}>
          {st.renamed ? 'KARNATAKA' : 'MYSORE STATE'}
        </text>
      )}
      {st.merged.length === 6 && (
        <text x={W / 2} y={H / 2 + 66} textAnchor="middle" className="kn-serif" style={{ fontSize: 28, fill: '#fff' }}>
          {st.renamed ? 'ಕರ್ನಾಟಕ' : 'ಮೈಸೂರು ರಾಜ್ಯ'}
        </text>
      )}
    </svg>
  );
}

const TIMELINE = [
  { when: '1890', t: 'Karnataka Vidyavardhaka Sangha, Dharwad', d: 'Founded to promote Kannada in a Bombay Presidency region where Marathi dominated schools and offices.' },
  { when: '1915', t: 'Kannada Sahitya Parishat, Bengaluru', d: 'A literary body that brought writers from all Kannada regions together.' },
  { when: '1917', t: 'Karnataka Gata Vaibhava', d: 'Aluru Venkata Rao’s history of Karnataka’s past glory inspired the idea of one Kannada land; he is remembered as “Karnataka Kulapurohita”.' },
  { when: '1920', t: 'A Karnataka Congress', d: 'The Indian National Congress organised provincial committees by language, creating a Karnataka Pradesh Congress Committee across administrative borders.' },
  { when: '1924', t: 'Belgaum Congress session', d: 'Presided over by Mahatma Gandhi. Huilgol Narayana Rao’s song “Udayavagali namma cheluva Kannada nadu” (“May our beautiful Kannada land arise”) became an anthem of the movement.' },
  { when: '1920s–50s', t: 'The Ekikarana movement', d: 'Conferences, petitions, newspapers, writers and political workers campaigned across the five administrations. After Independence the demand grew; leaders included Gudleppa Hallikeri, Andanappa Doddameti, S. Nijalingappa and many others.' },
  { when: '1953', t: 'Andhra State and Bellary', d: 'The creation of Andhra State strengthened linguistic reorganisation. Most of Bellary district joined Mysore State on 1 October 1953.' },
  { when: '1953–55', t: 'States Reorganisation Commission', d: 'Chaired by Fazl Ali with K. M. Panikkar and H. N. Kunzru; its 1955 report recommended a Kannada-speaking Mysore State.' },
  { when: '1 Nov 1956', t: 'The enlarged Mysore State', d: 'S. Nijalingappa became chief minister and Jayachamarajendra Wadiyar the Governor (earlier Rajapramukh).' },
  { when: '1 Nov 1973', t: 'Karnataka', d: 'Renamed under Chief Minister D. Devaraj Urs.' },
];

export default function Unification() {
  const { t } = useLang();
  const [stage, setStage] = useState(0);
  const [sel, setSel] = useState(null);
  const [auto, setAuto] = useState(false);
  const [table, setTable] = useState(false);
  useEffect(() => {
    if (!auto) return;
    if (stage >= UNIFICATION_STAGES.length - 1) { setAuto(false); return; }
    const id = setTimeout(() => setStage((s) => s + 1), 3200);
    return () => clearTimeout(id);
  }, [auto, stage]);
  const st = UNIFICATION_STAGES[stage];
  const selDistricts = useMemo(() => KA_DISTRICTS.filter((d) => d.region === sel), [sel]);
  return (
    <>
      <header className="page-hero" style={{ alignItems: 'center', minHeight: '100vh' }}>
        <div className="content" style={{ paddingBottom: 60 }}>
          <div className="wrap split">
            <div className="stack">
              <div className="chapter-no"><span>೭</span><span className="en">Chapter 7</span></div>
              <h1 className="h1" style={{ margin: '12px 0' }}>{t({ en: 'The Unification of Karnataka', kn: 'ಕರ್ನಾಟಕ ಏಕೀಕರಣ' })}</h1>
              <div className="kn-title">ಕರ್ನಾಟಕ ಏಕೀಕರಣ · 1 November 1956</div>
              <p className="lede">Before 1956, Kannada speakers lived under five different administrations. A movement of writers, teachers, journalists and political workers spent decades bringing them together.</p>
              <div className="row mt-2">
                <button className="btn btn-gold" onClick={() => { setStage(0); setSel(null); setAuto(true); }}>▶ Play the story</button>
                <a className="btn btn-ghost" href="#stages">Step through it</a>
              </div>
            </div>
            <div style={{ maxWidth: 560, justifySelf: 'center', width: '100%' }}>
              <UnificationMap stage={stage} sel={sel} onSel={setSel} />
            </div>
          </div>
        </div>
      </header>

      <section id="stages" className="section theme-indigo">
        <div className="wrap split top">
          <div className="stack" style={{ position: 'sticky', top: 100 }}>
            <div className="map-wrap dark"><UnificationMap stage={stage} sel={sel} onSel={setSel} /></div>
            <div className="map-legend" style={{ color: 'rgba(250,245,236,.85)' }}>
              {Object.entries(REGIONS_1956).map(([k, r]) => (
                <button key={k} className="chip" aria-pressed={sel === k} onClick={() => setSel(sel === k ? null : k)}>
                  <span className="sw" style={{ background: r.color }} />{r.label}
                </button>
              ))}
            </div>
          </div>
          <div className="stack-lg">
            <div className="row" role="tablist" aria-label="Stages">
              {UNIFICATION_STAGES.map((s, i) => (
                <button key={s.id} role="tab" aria-selected={stage === i} className="chip" aria-pressed={stage === i} onClick={() => { setAuto(false); setStage(i); }}>{s.year}</button>
              ))}
            </div>
            <div aria-live="polite">
              <div className="eyebrow">{st.year}</div>
              <h2 className="h2 mt-1">{st.title}</h2>
              <p className="lede mt-2">{st.body}</p>
            </div>
            <div className="row">
              <button className="btn btn-ghost btn-sm" disabled={stage === 0} onClick={() => setStage((s) => Math.max(0, s - 1))}>← Previous</button>
              <button className="btn btn-gold btn-sm" disabled={stage === UNIFICATION_STAGES.length - 1} onClick={() => setStage((s) => Math.min(UNIFICATION_STAGES.length - 1, s + 1))}>Next →</button>
            </div>
            {sel ? (
              <div className="panel dark" style={{ background: 'rgba(255,255,255,.05)' }}>
                <div className="row between"><h3 className="h3">{REGIONS_1956[sel].label} <span className="kn-serif muted" style={{ fontSize: '1rem' }}>{REGIONS_1956[sel].kn}</span></h3><button className="icon-btn" onClick={() => setSel(null)} aria-label="Close region details">✕</button></div>
                <p className="small muted">{REGIONS_1956[sel].joined}</p>
                <div className="small" style={{ marginTop: 10 }}>Present-day districts (with their pre-1956 parent district):</div>
                <ul className="small" style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                  {selDistricts.map((d) => <li key={d.name}><b>{d.name}</b> — {d.old}{d.note && <div className="tiny muted">{d.note}</div>}</li>)}
                </ul>
              </div>
            ) : <p className="small muted">Select a region on the map or in the legend to see which present-day districts it covered.</p>}
            <Note kind="fact" title="How this map was made">
              Boundaries are Census 2011 district polygons, grouped by the district each belonged to before reorganisation. Today’s districts were mostly carved from the old ones, so the grouping is close — but reorganisation actually moved specific <b>districts and taluks</b>, not whole former states. Known taluk-level differences (Kollegal, Kasaragod, Chandgad, parts of Bidar, Gulbarga, Raichur and Bellary) are listed for each district. This is not a survey-grade reconstruction of the 1956 boundary.
            </Note>
            <button className="link-arrow" style={{ background: 'none', border: 0, padding: 0, color: 'var(--copper-3)' }} onClick={() => setTable((x) => !x)} aria-expanded={table}>
              {table ? 'Hide' : 'Show'} the static table (accessible alternative) →
            </button>
          </div>
        </div>
        {table && (
          <div className="wrap mt-4" style={{ overflowX: 'auto' }}>
            <table className="small" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <caption className="sr-only">Present-day districts by pre-1956 administration</caption>
              <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--line-light)' }}><th style={{ padding: 8 }}>Present-day district</th><th>Pre-1956 district</th><th>Administration before reorganisation</th><th>Joined</th><th>Notes</th></tr></thead>
              <tbody>
                {[...KA_DISTRICTS].sort((a, b) => a.region.localeCompare(b.region) || a.name.localeCompare(b.name)).map((d) => (
                  <tr key={d.name} style={{ borderBottom: '1px solid var(--line-light)', verticalAlign: 'top' }}>
                    <td style={{ padding: 8 }}>{d.name}</td><td>{d.old}</td><td>{REGIONS_1956[d.region].label}</td><td>{REGIONS_1956[d.region].joined}</td><td className="tiny" style={{ opacity: 0.75 }}>{d.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="section">
        <div className="wrap split top">
          <div className="stack" style={{ position: 'sticky', top: 110 }}>
            <SectionHead eyebrow="Ekikarana · ಏಕೀಕರಣ" title="A movement, not a moment." lede="Unification was achieved through decades of persuasion — books, songs, newspapers, conferences and elected politics — by people from every Kannada region." />
            <div className="grid g2">
              <Img k="aluru" ratio="ratio-3x4" caption="Aluru Venkata Rao" />
              <Img k="nijalingappa" ratio="ratio-3x4" caption="S. Nijalingappa (postage stamp)" />
            </div>
          </div>
          <ol className="vtl">
            {TIMELINE.map((e) => <Reveal as="li" key={e.t}><div className="when">{e.when}</div><div><h4>{e.t}</h4><p>{e.d}</p></div></Reveal>)}
          </ol>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap grid g2">
          <Note kind="fact" title="Borders still discussed">The Maharashtra–Karnataka boundary around Belagavi has been disputed since reorganisation; the Mahajan Commission reported on it in 1967 and the question has since been before the Supreme Court. Kannada-speaking communities also live in neighbouring states, and other language communities within Karnataka.</Note>
          <Note kind="interpretation" title="Why “Karnataka” in 1973?">Many in the northern regions felt that the name “Mysore”, linked to the old princely state, did not represent the whole unified state; renaming it Karnataka recognised all its regions.</Note>
        </div>
      </section>

      <section className="section theme-night grain center">
        <div className="wrap-narrow stack">
          <Reveal><p className="quote">“Different regions. Shared languages and histories. One state, formed through a long movement for linguistic and cultural unity.”</p></Reveal>
          <div className="ribbon" style={{ margin: '24px auto 0' }} />
        </div>
      </section>
      <section className="section tight"><div className="wrap">
        <Sources items={[SRC.indiaCode, SRC.kaGov, SRC.kaLegislature, SRC.kamath, SRC.W('States Reorganisation Act, 1956'), SRC.W('Unification of Karnataka'), SRC.W('Andhra State Act, 1953'), SRC.W('Belgaum border dispute')]}
          notes={[{ kind: 'fact', text: 'Stage dates and the districts transferred follow the Andhra State Act 1953, the States Reorganisation Act 1956 and the Mysore State (Alteration of Name) Act 1973.' }]} />
      </div></section>
      <NextChapter path="/unification" />
    </>
  );
}
