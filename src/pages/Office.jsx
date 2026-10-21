import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NextChapter, PageHero, Reveal, SectionHead } from '../components/ui.jsx';
import { KarnatakaMap } from '../components/maps.jsx';
import { PLACES } from '../data/places.js';

const ACTIVITIES = [
  { t: 'Welcome in Kannada', time: 'All day', d: 'Greet colleagues with ನಮಸ್ಕಾರ and “Kannada Rajyotsavada shubhashayagalu”. Put the phrasebook on a screen at the entrance.', link: '/kannada#phrasebook', cta: 'Open phrasebook' },
  { t: 'Kannada language challenge', time: '15 min', d: 'Kannada-speaking colleagues teach five words each; everyone else learns the kāguṇita for their own name.', link: '/kannada', cta: 'Script explorer' },
  { t: 'Tongue-twister round', time: '10 min', d: 'Volunteers try the ten tongue twisters — laughter guaranteed, perfection not required.', link: '/play#twisters', cta: 'Tongue twisters' },
  { t: 'Guess the monument', time: '15 min', d: 'Project the photographs and guess in teams. Every answer reveals a real place and its history.', link: '/play#guess', cta: 'Start the game' },
  { t: 'Food tasting', time: 'Lunch', d: 'A table from every region — neer dose, bisi bele bath, jolada rotti, Mysore pak, Dharwad peda. Label ingredients and allergens; include vegetarian, vegan and Jain-friendly options.', link: '/food', cta: 'Food map' },
  { t: 'Folk music & Yakshagana introduction', time: '20 min', d: 'Invite a local troupe or play a licensed recording; explain the Bhagavata, the chande and the costume.', link: '/arts', cta: 'The arts' },
  { t: 'Unification timeline challenge', time: '10 min', d: 'Put the stages — 1953, 1956, 1973 — and the regions in order on the interactive map.', link: '/unification', cta: 'Unification map' },
  { t: 'The Karnataka Quiz', time: '20 min', d: 'Three levels with explanations. Mixed teams of Kannada and non-Kannada speakers work best.', link: '/play#quiz', cta: 'Open quiz' },
];

function useLocal(key, initial) {
  const [v, setV] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? initial; } catch { return initial; } });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ } }, [key, v]);
  return [v, setV];
}

function MessageWall() {
  const [notes, setNotes] = useLocal('nk-wall', []);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const add = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setNotes([{ text: text.trim().slice(0, 280), name: name.trim().slice(0, 40), r: (Math.random() * 4 - 2).toFixed(1) }, ...notes]);
    setText('');
  };
  return (
    <div className="split top">
      <form className="stack panel white" onSubmit={add}>
        <div className="eyebrow plain">Add a note</div>
        <label className="field"><span>What makes a place feel like home?</span><textarea className="input" value={text} onChange={(e) => setText(e.target.value)} maxLength={280} placeholder="Any language is welcome — Kannada, English, your own." /></label>
        <label className="field"><span>Your name (optional)</span><input className="input" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} /></label>
        <div className="row"><button className="btn" type="submit">Pin to the wall</button>{notes.length > 0 && <button type="button" className="btn btn-light btn-sm" onClick={() => confirm('Clear all notes on this device?') && setNotes([])}>Clear wall</button>}</div>
        <p className="tiny muted" style={{ margin: 0 }}>Notes are saved only in this browser on this device — ideal for a shared screen at the celebration. Nothing is uploaded.</p>
      </form>
      <div className="notes" aria-live="polite">
        {notes.length === 0 && <p className="muted">The wall is empty — be the first.</p>}
        {notes.map((n, i) => (
          <div key={i} className="note" style={{ '--r': `${n.r}deg` }}>{n.text}{n.name && <div className="by">— {n.name}</div>}</div>
        ))}
      </div>
    </div>
  );
}

function FavouritePlaces() {
  const [pins, setPins] = useLocal('nk-pins', []);
  const [place, setPlace] = useState('hampi');
  const [who, setWho] = useState('');
  const [why, setWhy] = useState('');
  const counts = pins.reduce((a, p) => ({ ...a, [p.place]: (a[p.place] || 0) + 1 }), {});
  const options = PLACES.filter((p) => p.id !== 'ellora');
  return (
    <div className="split top">
      <div className="map-wrap">
        <KarnatakaMap rivers={false} markers={Object.keys(counts).map((id) => ({ id, label: `${options.find((o) => o.id === id)?.name} · ${counts[id]}` }))} title="Colleagues’ favourite places in Karnataka" />
      </div>
      <div className="stack">
        <form className="panel white stack" onSubmit={(e) => { e.preventDefault(); setPins([{ place, who: who.trim().slice(0, 40), why: why.trim().slice(0, 140) }, ...pins]); setWhy(''); }}>
          <label className="field"><span>My favourite place in Karnataka</span>
            <select className="input" value={place} onChange={(e) => setPlace(e.target.value)}>{options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select>
          </label>
          <label className="field"><span>Why? (optional)</span><input className="input" value={why} onChange={(e) => setWhy(e.target.value)} maxLength={140} /></label>
          <label className="field"><span>Name (optional)</span><input className="input" value={who} onChange={(e) => setWho(e.target.value)} maxLength={40} /></label>
          <button className="btn" type="submit">Pin it on the map</button>
        </form>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {pins.slice(0, 8).map((p, i) => <li key={i} className="small" style={{ padding: '8px 0', borderTop: '1px solid var(--line)' }}><b>{options.find((o) => o.id === p.place)?.name}</b>{p.why && ` — ${p.why}`}{p.who && <span className="muted"> ({p.who})</span>}</li>)}
        </ul>
        <p className="tiny muted">Saved on this device only. For photos, collect them with consent in your usual company channel — we don’t upload images.</p>
      </div>
    </div>
  );
}

export default function Office() {
  return (
    <>
      <PageHero path="/office" image="dollu" alt="Dollu Kunitha drummers"
        lede="A celebration for everyone in the office — whether you grew up in Mysuru or moved here last month. Every activity is optional, short and designed for people new to Kannada." />
      <section className="section theme-forest">
        <div className="wrap center stack">
          <p className="kn-serif" style={{ fontSize: 'clamp(2rem,5vw,4rem)', color: 'var(--yellow)', margin: 0, lineHeight: 1.4 }} lang="kn">ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು</p>
          <p className="it h3">kannaḍa rājyōtsavada hārdika śubhāśayagaḷu</p>
          <p className="lede" style={{ marginInline: 'auto' }}>Heartfelt wishes on Kannada Rajyotsava. Welcome — ಸ್ವಾಗತ (svāgata) — to everyone.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Programme ideas" title="Things we can do together" lede="Pick a few. Keep it light, keep it optional, and translate everything." />
          <div className="grid g4 mt-4">
            {ACTIVITIES.map((a, i) => (
              <Reveal key={a.t} delay={i % 3} className="card hover">
                <div className="card-body stack">
                  <div className="row between"><span className="num-kn" style={{ fontSize: '1.6rem', color: 'var(--copper)' }}>{'೧೨೩೪೫೬೭೮'[i]}</span><span className="badge neutral">{a.time}</span></div>
                  <h3 className="h4">{a.t}</h3>
                  <p>{a.d}</p>
                  <Link to={a.link} className="link-arrow small">{a.cta} →</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section theme-sand">
        <div className="wrap">
          <SectionHead eyebrow="Message wall" title="“What makes a place feel like home?”" kn="ಯಾವುದು ಒಂದು ಊರನ್ನು ಮನೆಯಂತೆ ಮಾಡುತ್ತದೆ?" />
          <div className="mt-4"><MessageWall /></div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Our favourite places" title="Pin your Karnataka" lede="Where have you been — or where do you want to go? Build the office map together." />
          <div className="mt-4"><FavouritePlaces /></div>
        </div>
      </section>
      <section className="section tight theme-sand">
        <div className="wrap stack">
          <h3 className="h3">Inclusion checklist</h3>
          <ul className="grid g2" style={{ paddingLeft: 18, margin: 0 }}>
            <li>Every activity is optional; no one is asked to perform.</li>
            <li>Kannada text always appears with transliteration and English.</li>
            <li>Food labels list ingredients, allergens and whether dishes are vegetarian or contain egg or meat.</li>
            <li>Quiz teams mix Kannada and non-Kannada speakers.</li>
            <li>Celebrate Kannada without comparing it against any other language or state.</li>
            <li>Ask permission before photographing colleagues.</li>
          </ul>
        </div>
      </section>
      <NextChapter path="/office" />
    </>
  );
}
