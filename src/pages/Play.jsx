import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Img, NextChapter, PageHero, Reveal, SectionHead, SpeakButton, Tabs, useKannadaVoice } from '../components/ui.jsx';
import { GUESS, QUIZ, TWISTERS } from '../data/play.js';

/* Session-scoped persistence for quiz progress */
function useSession(key, initial) {
  const [v, setV] = useState(() => {
    try { const s = sessionStorage.getItem(key); return s ? JSON.parse(s) : initial; } catch { return initial; }
  });
  useEffect(() => { try { sessionStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ } }, [key, v]);
  return [v, setV];
}

const STATUS = {
  traditional: ['fact', 'Traditional'],
  adaptation: ['interpretation', 'Adaptation'],
  composed: ['tradition', 'Composed for this site — awaiting native-speaker review'],
};

function Twister({ t, voice, i }) {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [left, setLeft] = useState(10);
  const [best, setBest] = useState(0);
  useEffect(() => {
    if (!running) return;
    if (left === 0) { setRunning(false); setBest((b) => Math.max(b, count)); return; }
    const id = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(id);
  }, [running, left, count]);
  const [kind, label] = STATUS[t.status];
  return (
    <Reveal className="twister" delay={i % 3}>
      <div className="row between">
        <span className="dots" aria-label={`Difficulty ${t.level} of 3`}>{[1, 2, 3].map((n) => <i key={n} className={n <= t.level ? 'on' : ''} />)}</span>
        <span className={`badge ${kind}`}>{label}</span>
      </div>
      <div className="kn-text" lang="kn">{t.kn}</div>
      <div className="tr">{t.tr}</div>
      <div className="small muted">{t.en}</div>
      <div className="row mt-1">
        <SpeakButton text={t.kn} voice={voice} />
        {!running ? (
          <button className="btn btn-sm" onClick={() => { setCount(0); setLeft(10); setRunning(true); }}>Try saying it — 10 s</button>
        ) : (
          <button className="btn btn-sm btn-gold" onClick={() => setCount((c) => c + 1)} aria-live="polite">Said it! ({count}) · {left}s</button>
        )}
        {best > 0 && !running && <span className="small muted">Best: {best} times in 10 s</span>}
      </div>
    </Reveal>
  );
}

function Twisters() {
  const voice = useKannadaVoice();
  return (
    <div className="stack-lg">
      <p className="prose">Say each one slowly first, then faster. Tap <b>Try saying it</b>, then tap once for each time you say it correctly in ten seconds. {voice.available ? 'Audio uses your device’s Kannada voice.' : 'Your device has no Kannada voice, so audio is hidden — ask a colleague to say it first!'}</p>
      <div className="grid g2">{TWISTERS.map((t, i) => <Twister key={t.kn} t={t} voice={voice} i={i} />)}</div>
      <p className="tiny muted">The first two are traditional Kannada tongue twisters. The others were composed for this site in grammatical Kannada and are marked for checking by a fluent speaker before the event.</p>
    </div>
  );
}

function shuffle(a, seed) {
  const r = [...a];
  let s = seed;
  for (let i = r.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

function Guess() {
  const [st, setSt] = useSession('nk-guess', { i: 0, score: 0, picked: null, revealed: false, mcq: true });
  const g = GUESS[st.i];
  const options = useMemo(() => shuffle(g.options, st.i + 7), [st.i]);
  const done = st.i >= GUESS.length - 1 && st.revealed;
  const pick = (o) => setSt({ ...st, picked: o, revealed: true, score: st.score + (o === g.answer ? 1 : 0) });
  return (
    <div className="quiz-card">
      <div className="quiz-progress"><span style={{ width: `${((st.i + (st.revealed ? 1 : 0)) / GUESS.length) * 100}%` }} /></div>
      <div className="row between mb-3">
        <div className="small muted">Photograph {st.i + 1} of {GUESS.length} · Score {st.score}</div>
        <label className="small row" style={{ gap: 6 }}><input type="checkbox" checked={st.mcq} onChange={(e) => setSt({ ...st, mcq: e.target.checked })} /> Show multiple-choice options</label>
      </div>
      <div className="guess-img"><Img k={g.img} ratio="" credit={false} alt="Mystery monument — guess what it is" /></div>
      {!st.revealed ? (
        <>
          <h3 className="h3 mt-3">What is this place?</h3>
          {st.mcq ? (
            <div className="options">{options.map((o, k) => <button key={o} className="option" onClick={() => pick(o)}><span className="k">{'ABCD'[k]}</span>{o}</button>)}</div>
          ) : (
            <div className="row mt-3"><button className="btn" onClick={() => setSt({ ...st, revealed: true, picked: null })}>I’ve made my guess — reveal</button></div>
          )}
        </>
      ) : (
        <div className="explain mt-3">
          {st.picked && <div className="mb-2" style={{ fontWeight: 600, color: st.picked === g.answer ? 'var(--forest-2)' : 'var(--red)' }}>{st.picked === g.answer ? '✓ Correct!' : `✗ You chose ${st.picked}.`}</div>}
          <h3 className="h3">{g.answer}</h3>
          <dl className="facts" style={{ margin: '12px 0' }}>
            <div><dt>Historical name</dt><dd>{g.hist}</dd></div>
            <div><dt>Location</dt><dd>{g.where}</dd></div>
            <div><dt>Dynasty / patron</dt><dd>{g.who}</dd></div>
            <div><dt>Status</dt><dd>{g.unesco}</dd></div>
          </dl>
          <p style={{ margin: 0 }}>{g.fact}</p>
          <div className="row mt-3 between">
            <Link to={g.link} className="link-arrow">Read the full chapter →</Link>
            {!done ? <button className="btn" onClick={() => setSt({ ...st, i: st.i + 1, picked: null, revealed: false })}>Next photograph →</button>
              : <button className="btn btn-gold" onClick={() => setSt({ i: 0, score: 0, picked: null, revealed: false, mcq: st.mcq })}>Play again ({st.score}/{GUESS.length})</button>}
          </div>
        </div>
      )}
    </div>
  );
}

function Quiz() {
  const [level, setLevel] = useSession('nk-quiz-level', 'beginner');
  const [st, setSt] = useSession('nk-quiz', { beginner: { i: 0, score: 0, picked: null }, intermediate: { i: 0, score: 0, picked: null }, advanced: { i: 0, score: 0, picked: null } });
  const qs = QUIZ[level];
  const s = st[level];
  const finished = s.i >= qs.length;
  const q = qs[Math.min(s.i, qs.length - 1)];
  const update = (patch) => setSt({ ...st, [level]: { ...s, ...patch } });
  return (
    <div className="stack-lg">
      <div className="pill-row" role="group" aria-label="Difficulty">
        {Object.keys(QUIZ).map((l) => <button key={l} className="chip" aria-pressed={level === l} onClick={() => setLevel(l)} style={{ textTransform: 'capitalize' }}>{l} · {QUIZ[l].length} questions</button>)}
      </div>
      <div className="quiz-card">
        <div className="quiz-progress"><span style={{ width: `${(Math.min(s.i + (s.picked ? 1 : 0), qs.length) / qs.length) * 100}%` }} /></div>
        {finished ? (
          <div className="stack center">
            <div className="eyebrow plain" style={{ justifyContent: 'center' }}>Final score · {level}</div>
            <div className="display" style={{ fontSize: '5rem' }}>{s.score}/{qs.length}</div>
            <p className="lede" style={{ marginInline: 'auto' }}>{s.score === qs.length ? 'ಅದ್ಭುತ! Outstanding.' : s.score >= qs.length / 2 ? 'ಚೆನ್ನಾಗಿದೆ! Well done — you learned a lot.' : 'Every answer is something new learned. Try the chapters and come back!'}</p>
            <div className="row" style={{ justifyContent: 'center' }}>
              <button className="btn" onClick={() => update({ i: 0, score: 0, picked: null })}>Play again</button>
              {level !== 'advanced' && <button className="btn btn-gold" onClick={() => setLevel(level === 'beginner' ? 'intermediate' : 'advanced')}>Next level →</button>}
              <Link className="btn btn-light" to="/land">Discover more →</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="small muted">Question {s.i + 1} of {qs.length} · Score {s.score}</div>
            <h3 className="h3 mt-2">{q.q}</h3>
            <div className="options">
              {q.options.map((o, k) => {
                const cls = s.picked ? (o === q.answer ? 'correct' : o === s.picked ? 'wrong' : '') : '';
                return <button key={o} className={`option ${cls}`} disabled={!!s.picked} onClick={() => update({ picked: o, score: s.score + (o === q.answer ? 1 : 0) })}><span className="k">{'ABCD'[k]}</span>{o}</button>;
              })}
            </div>
            {s.picked && (
              <div className="explain" aria-live="polite">
                <b style={{ color: s.picked === q.answer ? 'var(--forest-2)' : 'var(--red)' }}>{s.picked === q.answer ? '✓ Correct.' : `✗ The answer is: ${q.answer}.`}</b>
                <p style={{ margin: '6px 0 0' }}>{q.explain}</p>
                <div className="row between mt-3">
                  <Link to={q.link} className="link-arrow small">Discover more →</Link>
                  <button className="btn" onClick={() => update({ i: s.i + 1, picked: null })}>{s.i + 1 === qs.length ? 'See final score' : 'Next question →'}</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <p className="tiny muted">No timer — this quiz rewards learning, not speed. Progress is kept for this browser session only.</p>
    </div>
  );
}

export default function Play() {
  const [tab, setTab] = useSession('nk-play-tab', 'quiz');
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (['twisters', 'guess', 'quiz'].includes(h)) setTab(h);
  }, []);
  return (
    <>
      <PageHero path="/play" image="vittala" alt="Stone chariot and mantapas, Vittala Temple, Hampi" short
        lede="Three activities for the office celebration: ten Kannada tongue twisters, a photograph quiz on Karnataka’s monuments, and a three-level Karnataka quiz." />
      <section className="section theme-sand" id={tab}>
        <div className="wrap">
          <Tabs label="Activities" value={tab} onChange={setTab} tabs={[
            { id: 'twisters', label: 'A · Ten tongue twisters' }, { id: 'guess', label: 'B · Guess the monument' }, { id: 'quiz', label: 'C · The Karnataka Quiz' },
          ]} />
          {tab === 'twisters' && <><SectionHead title="Ten Kannada tongue twisters" kn="ನಾಲಿಗೆ ತಿರುಗಿಸುವ ವಾಕ್ಯಗಳು" /><div className="mt-4"><Twisters /></div></>}
          {tab === 'guess' && <div className="split top"><SectionHead title="Guess the monument" kn="ಸ್ಮಾರಕ ಗುರುತಿಸಿ" lede="The same verified photographs used in the heritage chapters — no names shown until you guess." /><Guess /></div>}
          {tab === 'quiz' && <div className="split top"><SectionHead title="The Karnataka Quiz" kn="ಕರ್ನಾಟಕ ರಸಪ್ರಶ್ನೆ" lede="Beginner, intermediate and advanced. Every answer comes with an explanation and a link to learn more." /><Quiz /></div>}
        </div>
      </section>
      <NextChapter path="/play" />
    </>
  );
}
