import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Img, Modal, NextChapter, PageHero, Reveal, SectionHead, Sources } from '../components/ui.jsx';
import { IndiaMap, KarnatakaMap } from '../components/maps.jsx';
import { MONUMENTS, TYPES } from '../data/monuments.js';
import { SRC } from '../data/sources.js';

const byId = Object.fromEntries(MONUMENTS.map((m) => [m.id, m]));

function Detail({ m, onClose, onOpen }) {
  return (
    <Modal onClose={onClose} label={m.name}>
      <div className="modal-grid">
        <Img k={m.img} ratio="" caption={m.name} />
        <div className="modal-body stack">
          <div className="row">
            {m.unesco ? <span className="badge unesco">UNESCO · {m.unesco.split('—').pop().trim()}</span> : <span className="badge neutral">Not a World Heritage Site</span>}
            <span className="badge neutral">{m.dynasty}</span>
          </div>
          <h2 className="h2">{m.name}</h2>
          <dl className="facts" style={{ margin: '8px 0' }}>
            <div><dt>Historical name</dt><dd>{m.hist}</dd></div>
            <div><dt>Present-day location</dt><dd>{m.location}</dd></div>
            <div><dt>Period</dt><dd>{m.period}</dd></div>
            <div><dt>Style</dt><dd>{m.style}</dd></div>
          </dl>
          <div>
            <div className="small muted">Patron / dynasty</div>
            <p style={{ margin: '4px 0' }}>{m.patron} <Badge kind={m.patronKind}>{m.patronKind === 'fact' ? 'Attested' : 'Attributed'}</Badge></p>
            {m.patronNote && <p className="small muted" style={{ margin: 0 }}>{m.patronNote}</p>}
          </div>
          {(m.unesco || m.unescoNote) && <p className="small" style={{ margin: 0 }}><b>UNESCO status:</b> {m.unesco || m.unescoNote}</p>}
          <div>
            <h3 className="h4 mb-2">Notable features</h3>
            <ul style={{ margin: 0, paddingLeft: 18 }}>{m.features.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
          <div className="panel"><div className="eyebrow plain mb-2">The people behind it</div><p style={{ margin: 0 }}>{m.story}</p></div>
          <div className="grid g2" style={{ alignItems: 'center' }}>
            <div className="map-wrap" style={{ padding: 6 }}>
              {m.place === 'ellora'
                ? <IndiaMap highlight={['Maharashtra', 'Karnataka']} markers={['ellora', 'badami']} title="Location of Ellora relative to Karnataka" />
                : <KarnatakaMap markers={[{ id: m.place }]} rivers={false} title={`Location of ${m.name}`} />}
            </div>
            <div className="stack">
              {m.related.length > 0 && <div className="small muted">Related monuments</div>}
              <div className="pill-row">{m.related.map((r) => <button key={r} className="chip" onClick={() => onOpen(r)}>{byId[r].name}</button>)}</div>
              {m.chapter && <Link to={`/kingdoms#${m.chapter}`} className="link-arrow small">Read the dynasty’s chapter →</Link>}
              {m.id === 'vidhanasoudha' && <Link to="/vidhana-soudha" className="link-arrow small">Read the Vidhana Soudha chapter →</Link>}
              {m.page && <Link to={m.page.to} className="link-arrow small">{m.page.label} →</Link>}
            </div>
          </div>
          <Sources items={m.sources} />
        </div>
      </div>
    </Modal>
  );
}

export default function Monuments() {
  const [type, setType] = useState('all');
  const [open, setOpen] = useState(null);
  const [view, setView] = useState('grid');
  const list = useMemo(() => MONUMENTS.filter((m) => type === 'all' || (type === 'unesco' ? m.unesco : m.type === type || m.also?.includes(type))), [type]);
  const unescoCount = MONUMENTS.filter((m) => m.unesco).length;
  return (
    <>
      <PageHero path="/monuments" image="stoneChariot" alt="Garuda stone chariot, Vittala Temple, Hampi"
        lede="A visual heritage atlas. Each monument is shown with its real photograph, its historical and present-day names, the patron supported by evidence, and the people who built, used and maintained it." />
      <section className="section">
        <div className="wrap">
          <div className="row between mb-4">
            <SectionHead eyebrow={`${MONUMENTS.length} monuments · ${unescoCount} within UNESCO World Heritage properties`} title="The heritage atlas" />
            <div className="row" role="group" aria-label="View">
              <button className="chip" aria-pressed={view === 'grid'} onClick={() => setView('grid')}>Gallery</button>
              <button className="chip" aria-pressed={view === 'map'} onClick={() => setView('map')}>Map</button>
            </div>
          </div>
          <div className="atlas-filters" role="group" aria-label="Filter monuments">
            {TYPES.map((t) => <button key={t.id} className="chip" aria-pressed={type === t.id} onClick={() => setType(t.id)}>{t.label}</button>)}
          </div>
          {view === 'grid' ? (
            <div className="atlas-grid">
              {list.map((m, i) => (
                <Reveal key={m.id} delay={i % 3}>
                  <button className="atlas-card" onClick={() => setOpen(m.id)} aria-label={`${m.name}, ${m.location}. Open details`}>
                    <Img k={m.img} credit={false} zoom alt={m.name} />
                    <div className="row mt-2">
                      {m.unesco && <span className="badge unesco">UNESCO</span>}
                      <span className="tiny muted" style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>{m.period}</span>
                    </div>
                    <h3>{m.name}</h3>
                    <div className="loc">{m.hist !== '—' && <i>{m.hist}</i>} {m.hist !== '—' && '· '}{m.location}</div>
                  </button>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="split top">
              <div className="map-wrap">
                <KarnatakaMap rivers={false} markers={[...new Set(list.filter((m) => m.place !== 'ellora').map((m) => m.place))].map((id) => ({ id }))}
                  onSelect={(id) => setOpen(list.find((m) => m.place === id).id)} title="Map of monuments in the atlas" />
                <p className="map-note">Select a marker to open the monument. Kailasa Temple at Ellora lies outside Karnataka, in Maharashtra.</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {list.map((m) => (
                  <li key={m.id} className="person" style={{ gridTemplateColumns: '90px 1fr' }}>
                    <button className="img-open" onClick={() => setOpen(m.id)} aria-label={`${m.name}: open enlarged image and details`}>
                      <Img k={m.img} ratio="ratio-1" credit={false} alt="" />
                    </button>
                    <div><button className="link-arrow" style={{ background: 'none', border: 0, padding: 0 }} onClick={() => setOpen(m.id)}>{m.name}</button><p className="small muted">{m.location} · {m.period}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="tiny muted mt-4">Every photograph shows the monument named in its caption. Photographs are openly licensed from Wikimedia Commons; open a monument to see the credit.</p>
        </div>
      </section>
      <section className="section tight theme-sand">
        <div className="wrap">
          <Sources open items={[SRC.unescoHampi, SRC.unescoPattadakal, SRC.unescoHoysala, SRC.unescoEllora, SRC.unescoTentative, SRC.asi, SRC.kaTourism]}
            notes={[{ kind: 'fact', text: 'UNESCO status is shown only for inscribed World Heritage properties; Tentative List entries are labelled separately.' }, { kind: 'interpretation', text: '“Attributed” marks patrons inferred from indirect evidence such as later grants.' }]} />
        </div>
      </section>
      {open && <Detail m={byId[open]} onClose={() => setOpen(null)} onOpen={setOpen} />}
      <NextChapter path="/monuments" />
    </>
  );
}
