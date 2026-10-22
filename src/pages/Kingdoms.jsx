import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, ZoomImg } from '../components/ui.jsx';
import { IndiaMap } from '../components/maps.jsx';
import { EVENTS, GANTT_ROWS, KINGDOMS } from '../data/kingdoms.js';
import { useLang } from '../i18n.jsx';

const MIN = 300, MAX = 1950;
const pct = (y) => ((y - MIN) / (MAX - MIN)) * 100;

function Contemporaries({ onJump }) {
  const [year, setYear] = useState(1400);
  const active = GANTT_ROWS.filter((r) => year >= r.start && year <= r.end);
  const nearby = useMemo(() => {
    const sorted = [...EVENTS].sort((a, b) => Math.abs(a.y - year) - Math.abs(b.y - year));
    return sorted.slice(0, 3).sort((a, b) => a.y - b.y);
  }, [year]);
  const ticks = [400, 600, 800, 1000, 1200, 1400, 1600, 1800];
  return (
    <div>
      <div className="row between mb-3">
        <div>
          <div className="eyebrow">Who was contemporary?</div>
          <div className="h2 mt-1" aria-live="polite"><span style={{ color: 'var(--yellow)' }}>{year}</span> CE</div>
        </div>
        <div className="pill-row">
          {[640, 980, 1150, 1400, 1550, 1780].map((y) => <button key={y} className="chip" aria-pressed={year === y} onClick={() => setYear(y)}>{y}</button>)}
        </div>
      </div>
      <label htmlFor="year" className="sr-only">Choose a year between {MIN} and {MAX} CE</label>
      <div className="gantt-range">
        <input id="year" type="range" min={MIN} max={MAX} step="5" value={year} onChange={(e) => setYear(+e.target.value)} className="year-range" aria-valuetext={`${year} CE`} />
      </div>
      <div className="gantt mt-4" role="list" aria-label="Approximate periods of dynasties">
        <div className="gantt-axis" aria-hidden>
          {ticks.map((t) => <span key={t} style={{ left: pct(t) + '%' }}>{t}</span>)}
        </div>
        <div style={{ position: 'relative' }}>
          <div className="gantt-cursor" style={{ left: `calc(var(--gl) + (100% - var(--gl)) * ${pct(year) / 100})` }} aria-hidden><span>{year}</span></div>
          {GANTT_ROWS.map((r) => {
            const on = year >= r.start && year <= r.end;
            return (
              <div className="gantt-row" role="listitem" key={r.label}>
                <button className="name" onClick={() => onJump(r.section)}>{r.label}</button>
                <div className="track">
                  <button className={`gantt-bar ${on ? 'on' : ''}`} onClick={() => onJump(r.section)}
                    style={{ left: pct(r.start) + '%', width: pct(r.end) - pct(r.start) + '%', background: r.color }}
                    aria-label={`${r.label}, about ${r.start} to ${r.end} CE${on ? ' — active in ' + year : ''}. Go to section.`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid g2 mt-4">
        <div>
          <div className="small muted mb-2">Active around {year} CE</div>
          <div className="pill-row">
            {active.length ? active.map((r) => (
              <button key={r.label} className="chip" style={{ borderColor: r.color }} onClick={() => onJump(r.section)}>
                <span style={{ width: 8, height: 8, borderRadius: 9, background: r.color, display: 'inline-block' }} /> {r.label}
              </button>
            )) : <span className="muted small">No dynasty in this chart — try another year.</span>}
          </div>
        </div>
        <div>
          <div className="small muted mb-2">Around this time</div>
          <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
            {nearby.map((e) => <li key={e.y + e.t}><b style={{ color: 'var(--copper-3)' }}>{e.y}</b> — {e.t}</li>)}
          </ul>
        </div>
      </div>
      <p className="tiny muted mt-3">Approximate periods, not claims of continuous control over the same territory. Many powers coexisted, competed and served as one another’s feudatories.</p>
    </div>
  );
}

function KingdomSection({ k }) {
  const { lang } = useLang();
  const [a, ...rest] = k.images;
  return (
    <section id={k.id} className="section kingdom" aria-labelledby={`${k.id}-h`}>
      <div className="wrap">
        <div className="kingdom-head">
          <div className="kingdom-years"><span className="big">{k.letter}</span>{k.years}</div>
          <Reveal className="stack">
            <h2 id={`${k.id}-h`} className="h2">{lang === 'kn' ? k.kn : k.name}</h2>
            {lang === 'en' && <div className="kn-serif muted" style={{ fontSize: '1.15rem' }}>{k.kn}</div>}
            <p className="lede">{k.summary}</p>
          </Reveal>
        </div>

        <dl className="facts">
          <div><dt>Period</dt><dd>{k.years}</dd></div>
          <div><dt>Capitals — historical (present-day)</dt><dd>{k.capitals.map((c) => <div key={c.hist}><b>{c.hist}</b> ({c.modern})</div>)}</dd></div>
          <div><dt>Important rulers</dt><dd>{k.rulers.join(' · ')}</dd></div>
        </dl>

        <div className="split top">
          <Reveal className="stack-lg">
            <div className="prose">
              <p style={{ fontSize: '1.08rem' }}>{k.story}</p>
              <Badge kind={k.storyKind} />
            </div>
            <div>
              <h3 className="h4 mb-2">Political & cultural achievements</h3>
              <ul className="prose" style={{ paddingLeft: 18, margin: 0 }}>{k.achievements.map((x) => <li key={x} style={{ marginBottom: 6 }}>{x}</li>)}</ul>
            </div>
            <div className="prose"><h3 className="h4 mb-2">Kannada, inscriptions & literature</h3><p>{k.kannada}</p></div>
            <div className="prose"><h3 className="h4 mb-2">Architecture, sculpture & patronage</h3><p>{k.architecture}</p></div>
            {k.notes?.map((n, i) => <Note key={i} kind={n.kind}>{n.text}</Note>)}
          </Reveal>
          <Reveal className="stack-lg">
            <div className="map-wrap">
              <IndiaMap highlight={k.states} markers={k.markers} title={`Approximate reach of the ${k.short || k.name} on a map of present-day India`} />
              <p className="map-note" style={{ padding: '0 6px' }}>Shaded: present-day states containing parts of the territory at its widest extent (approximate). Karnataka outlined. This is not a historical boundary map — frontiers shifted constantly and were rarely lines.</p>
            </div>
            <div className="remains">
              <h4>What remains today?</h4>
              <ul>{k.remains.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          </Reveal>
        </div>

        <div className="mosaic mt-5">
          {[a, ...rest].map((im, i) => {
            const pos = i === 0 ? 'm-a' : ['m-b', 'm-c', 'm-c', 'm-b', 'm-d'][i - 1] || 'm-c';
            const [title, ...more] = im.cap.split(' — ');
            return (
              <ZoomImg key={im.k} k={im.k} caption={im.cap} className={pos} buttonClass={pos} ratio="" zoom portrait
                title={title} eyebrow={`${k.name} · ${k.years}`}
                info={more.length > 0 && <p>{more.join(' — ').replace(/^./, (c) => c.toUpperCase())}</p>} />
            );
          })}
        </div>
        <div className="mt-4"><Sources items={k.sources} /></div>
      </div>
    </section>
  );
}

function SubNav() {
  const [active, setActive] = useState(KINGDOMS[0].id);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' });
    KINGDOMS.forEach((k) => { const el = document.getElementById(k.id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="subnav" aria-label="Historical periods">
      <div className="wrap">
        {KINGDOMS.map((k) => (
          <a key={k.id} href={`#${k.id}`} className={active === k.id ? 'active' : ''}>
            {k.letter}. {k.short || k.name.replace(' Dynasty', '')}<span className="yr">{k.years.replace(' CE', '')}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

export default function Kingdoms() {
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <>
      <PageHero path="/kingdoms" image="pattadakal" alt="Pattadakal group of monuments, 7th–8th century"
        lede="Kingdoms rose alongside one another. Languages, communities and artistic traditions crossed their boundaries. Explore eight chapters of power and patronage — and see who was contemporary with whom." />
      <section className="section theme-night">
        <div className="wrap">
          <Contemporaries onJump={jump} />
        </div>
      </section>
      <SubNav />
      <section className="section tight">
        <div className="wrap split">
          <SectionHead eyebrow="How to read this chapter" title="Historical names, present-day places." lede="Each dynasty is introduced with its approximate period, capitals (historical and present-day names together — Vatapi (Badami), Manyakheta (Malkhed), Dorasamudra (Halebidu)), rulers, achievements, monuments and what survives today." />
          <div className="panel stack">
            <div className="row"><Badge kind="fact" /><span className="small">Supported directly by inscriptions, monuments or contemporary records.</span></div>
            <div className="row"><Badge kind="interpretation" /><span className="small">Historians’ reading of the evidence; may be revised.</span></div>
            <div className="row"><Badge kind="tradition" /><span className="small">Dynastic legend, folklore or popular memory.</span></div>
            <div className="row"><Badge kind="disputed" /><span className="small">Scholars or communities disagree.</span></div>
          </div>
        </div>
      </section>
      {KINGDOMS.map((k) => <KingdomSection key={k.id} k={k} />)}
      <section className="section tight theme-sand">
        <div className="wrap row between">
          <p className="lede" style={{ margin: 0 }}>See every monument mentioned here on one atlas, with UNESCO status and patrons.</p>
          <Link to="/monuments" className="btn">Open the heritage atlas →</Link>
        </div>
      </section>
      <NextChapter path="/kingdoms" />
    </>
  );
}
