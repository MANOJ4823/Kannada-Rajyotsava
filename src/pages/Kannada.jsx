import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, SpeakButton, Tabs, useKannadaVoice } from '../components/ui.jsx';
import { CENSUS_2011, CONSONANTS, FAMILY, KANNADA_TIMELINE, LANGUAGES, PHRASES, VOWELS, VOWEL_SIGNS } from '../data/kannada.js';
import { SRC } from '../data/sources.js';

function ScriptExplorer({ voice }) {
  const [set, setSet] = useState('vowels');
  const [sel, setSel] = useState(VOWELS[0]);
  const [cons, setCons] = useState('ಕ');
  const list = set === 'vowels' ? VOWELS : CONSONANTS;
  const consRoman = CONSONANTS.find((c) => c[0] === cons)[1].replace(/a$/, '');
  return (
    <div className="stack-lg">
      <Tabs label="Script explorer" value={set} onChange={(v) => { setSet(v); setSel(v === 'vowels' ? VOWELS[0] : CONSONANTS[0]); }}
        tabs={[{ id: 'vowels', label: 'Vowels · ಸ್ವರಗಳು' }, { id: 'consonants', label: 'Consonants · ವ್ಯಂಜನಗಳು' }, { id: 'kagunita', label: 'Building syllables · ಕಾಗುಣಿತ' }]} />
      {set !== 'kagunita' ? (
        <>
          <div className="glyph-stage" aria-live="polite">
            <div className="big" lang="kn">{sel[0]}</div>
            <div className="stack">
              <div className="h3">“{sel[1]}”</div>
              {sel[2] ? (
                <p style={{ margin: 0 }}>
                  as in <span className="kn-serif" style={{ fontSize: '1.6rem', color: 'var(--yellow)' }} lang="kn">{sel[2]}</span> <i>{sel[3]}</i> — {sel[4]}
                </p>
              ) : <p style={{ margin: 0 }}>{sel[4]}</p>}
              {sel[2] && <div><SpeakButton text={sel[2]} voice={voice} /></div>}
            </div>
          </div>
          <div className="script-grid" role="group" aria-label={set === 'vowels' ? 'Kannada vowels' : 'Kannada consonants'}>
            {list.map((g) => (
              <button key={g[0]} className="glyph" aria-pressed={sel[0] === g[0]} onClick={() => setSel(g)} aria-label={`${g[0]}, ${g[1]}`} lang="kn">
                {g[0]}<small>{g[1]}</small>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="stack">
          <p className="prose">Kannada is an <i>abugida</i>: each consonant carries an inherent “a”, and vowel signs attach to it. Choose a consonant to see all its forms — this table, the <i>kāguṇita</i>, is how children learn to read.</p>
          <div className="pill-row">
            {['ಕ', 'ಗ', 'ತ', 'ನ', 'ಪ', 'ಮ', 'ರ', 'ಲ', 'ಸ', 'ಹ'].map((c) => <button key={c} className="chip kn-serif" style={{ fontSize: '1.2rem' }} aria-pressed={cons === c} onClick={() => setCons(c)}>{c}</button>)}
            <SpeakButton text={VOWEL_SIGNS.map(([sign]) => cons + sign).join(', ')} voice={voice} />
          </div>
          <div className="script-grid">
            {VOWEL_SIGNS.map(([sign, v]) => voice.available ? (
              <button key={v} className="glyph" lang="kn" onClick={() => voice.speak(cons + sign)} aria-label={`Hear ${cons + sign}, ${consRoman}${v}`}>{cons + sign}<small>{consRoman}{v}</small></button>
            ) : (
              <div key={v} className="glyph" lang="kn">{cons + sign}<small>{consRoman}{v}</small></div>
            ))}
          </div>
          {voice.available && <p className="tiny muted" style={{ margin: 0 }}>Select any syllable to hear it, or Listen for the whole row.</p>}
        </div>
      )}
      <p className="tiny muted">Kannada script descends from the Brahmi family through the Kadamba and later Chalukya scripts, and shares its ancestry with the Telugu script.</p>
    </div>
  );
}

function Phrasebook({ voice }) {
  const tags = [...new Set(PHRASES.map((p) => p.tag))];
  const [tag, setTag] = useState(tags[0]);
  return (
    <div id="phrasebook">
      <div className="pill-row mb-3" role="group" aria-label="Phrase categories">
        {tags.map((t) => <button key={t} className="chip" aria-pressed={tag === t} onClick={() => setTag(t)}>{t}</button>)}
      </div>
      {PHRASES.filter((p) => p.tag === tag).map((p) => (
        <div className="phrase" key={p.kn}>
          <div>
            <div className="kn-text" lang="kn">{p.kn}</div>
            <div className="tr">{p.tr}</div>
            <div className="en">{p.en}</div>
          </div>
          <SpeakButton text={p.kn} voice={voice} />
        </div>
      ))}
      <p className="tiny muted mt-2">
        {voice.available
          ? 'Audio uses your device’s Kannada text-to-speech voice. It is a guide, not a native recording.'
          : 'No Kannada voice was found on this device, so audio is hidden. Ask a Kannada-speaking colleague — that’s the best pronunciation guide anyway.'}
      </p>
    </div>
  );
}

export default function Kannada() {
  const voice = useKannadaVoice();
  return (
    <>
      <PageHero path="/kannada" image="halmidi" alt="The Halmidi inscription (3D scan)" dimImage
        lede="Kannada has been written for more than fifteen centuries and spoken for far longer. It carried royal grants, Jain epics, rebel poetry, devotional songs, newspapers, cinema and now code comments and memes." />

      <section className="section">
        <div className="wrap split top">
          <SectionHead eyebrow="A Dravidian language" title="One of India’s great classical languages." kn="ಭಾರತದ ಶಾಸ್ತ್ರೀಯ ಭಾಷೆಗಳಲ್ಲೊಂದು"
            lede="Kannada belongs to the Dravidian family, alongside Tamil, Malayalam, Telugu, Tulu and many others. It is the mother tongue of about 4.4 crore people (Census 2011) and was declared a classical language by the Government of India in 2008." />
          <Reveal className="panel stack">
            {FAMILY.map((f, i) => (
              <div key={f.branch}>
                <div className="small muted">{f.branch}</div>
                <div className="pill-row mt-1">
                  {f.langs.map((l) => <span key={l} className="chip" style={l === 'Kannada' ? { background: 'var(--ink)', color: 'var(--cream)', borderColor: 'var(--ink)' } : { cursor: 'default' }}>{l}</span>)}
                </div>
              </div>
            ))}
            <p className="tiny muted" style={{ margin: 0 }}>Simplified classification. *Beary is usually grouped with Malayalam.</p>
          </Reveal>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap split top">
          <div className="stack">
            <SectionHead eyebrow="The Halmidi inscription" title="A stone that speaks Kannada." />
            <p className="prose">Found in Halmidi village in Hassan district, this inscription records a grant in the time of the Kadamba kings. Scholars generally date it to the 5th century CE, and it is one of the most important early Kannada inscriptions. It is <b>not</b> necessarily the earliest Kannada ever written: Kannada words and place names appear in older Prakrit records, and new finds continue to be studied.</p>
            <p className="prose">The Kadamba period saw Kannada begin to take a place in public records alongside Sanskrit and Prakrit — a shift carried by many generations of scribes and patrons, not decreed by a single ruler.</p>
            <Note kind="interpretation" title="On dates">The commonly cited date of c. 450 CE rests on the inscription’s script and content; some scholars argue for a somewhat later date.</Note>
          </div>
          <Img k="halmidi" ratio="ratio-3x4" caption="Halmidi inscription — high-resolution digital image made by 3D scanning the original stone" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Interactive" title="Kannada script explorer" kn="ಕನ್ನಡ ಲಿಪಿ" lede="Tap a letter to hear how it sounds and see it in a word." />
          <div className="mt-4"><ScriptExplorer voice={voice} /></div>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap split top">
          <div className="stack">
            <SectionHead eyebrow="For colleagues" title="A small phrasebook" kn="ಪುಟ್ಟ ನುಡಿಗನ್ನಡಿ" lede="Kannada speakers are delighted by any attempt — even a single ನಮಸ್ಕಾರ. Respectful forms (ending -ಇ, -ರಾ) are safest with people you don’t know well." />
            <Img k="kavirajamarga" ratio="ratio-16x9" caption="A stanza from the Kavirajamarga (c. 850)" />
          </div>
          <Phrasebook voice={voice} />
        </div>
      </section>

      <section className="section theme-indigo">
        <div className="wrap">
          <SectionHead eyebrow="Movements in language" title="Vachanas and the Haridasas: poetry for everyone." />
          <div className="grid g2 mt-4">
            <Reveal className="stack">
              <h3 className="h3">Vachana literature · 12th century</h3>
              <p className="muted">At Kalyana, Basavanna — a minister at the Kalachuri court — and saints such as Akka Mahadevi and Allama Prabhu composed vachanas: short, rhythmic sayings in plain spoken Kannada, addressed directly to God. They questioned caste, empty ritual and hierarchy, and valued <i>kāyaka</i>, honest work, as worship. Many vachana composers came from artisan and labouring communities, and many were women.</p>
              <blockquote className="panel dark" style={{ margin: 0 }}>
                <p className="kn-serif" style={{ fontSize: '1.15rem', lineHeight: 1.8, margin: 0 }} lang="kn">ಉಳ್ಳವರು ಶಿವಾಲಯವ ಮಾಡುವರು, ನಾನೇನ ಮಾಡುವೆ ಬಡವನಯ್ಯಾ. ಎನ್ನ ಕಾಲೇ ಕಂಬ, ದೇಹವೇ ದೇಗುಲ, ಶಿರ ಹೊನ್ನ ಕಳಸವಯ್ಯಾ. ಕೂಡಲಸಂಗಮದೇವಾ ಕೇಳಯ್ಯಾ, ಸ್ಥಾವರಕ್ಕಳಿವುಂಟು ಜಂಗಮಕ್ಕಳಿವಿಲ್ಲ.</p>
                <p className="mt-2" style={{ fontStyle: 'italic', marginBottom: 0 }}>The rich build temples to Shiva; what can I, a poor man, do? My legs are the pillars, my body the shrine, my head its golden dome. Listen, Lord of the Meeting Rivers: what stands still will fall; what moves will endure.</p>
                <p className="tiny muted mt-2" style={{ marginBottom: 0 }}>Vachana of Basavanna. Plain-language translation prepared for this site; for a celebrated literary translation see A. K. Ramanujan, <i>Speaking of Śiva</i>.</p>
              </blockquote>
              <Note kind="tradition" title="Anubhava Mantapa">Tradition remembers an “Anubhava Mantapa”, a hall of spiritual experience where people of every background debated. It is known from later hagiographic literature rather than contemporary records.</Note>
            </Reveal>
            <Reveal className="stack">
              <h3 className="h3">Haridasa literature · 15th–17th centuries</h3>
              <p className="muted">The Haridasas — wandering devotees of Vishnu — sang in Kannada so that anyone could understand. Purandara Dasa (c. 1484–1564) composed thousands of songs and is traditionally honoured as the “grandfather” (pitāmaha) of Carnatic music for his graded lessons still taught to beginners. Kanaka Dasa (c. 1509–1609), from the Kuruba shepherd community, wrote poetry and songs that challenged caste prejudice.</p>
              <div className="grid g2">
                <Img k="purandara" ratio="ratio-3x4" caption="Purandara Dasa (artistic depiction)" />
                <Img k="kanaka" ratio="ratio-3x4" caption="Kanaka Dasa (artistic depiction)" />
              </div>
              <Note kind="tradition" title="Kanakana Kindi">At Udupi, a small window called Kanakana Kindi is linked to the story that the deity turned to give darshan to Kanaka Dasa when he was refused entry. The story is a cherished tradition.</Note>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Fifteen centuries" title="Inscriptions and milestones" kn="ಶಾಸನಗಳು ಮತ್ತು ಮೈಲಿಗಲ್ಲುಗಳು" />
          <ol className="vtl mt-4">
            {KANNADA_TIMELINE.map((e) => (
              <Reveal as="li" key={e.t}><div className="when">{e.when}</div><div><h4>{e.t}</h4><p>{e.d}</p></div></Reveal>
            ))}
          </ol>
          <p className="mt-4"><Link to="/literature" className="link-arrow">Explore literature and the Jnanpith laureates →</Link></p>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap">
          <SectionHead eyebrow="Language diversity" title="Many tongues, one home." kn="ಹಲವು ನುಡಿ, ಒಂದೇ ನಾಡು" lede="Kannada is the state’s official language, and Karnataka is also home to speakers of dozens of other languages. Respect for Kannada and respect for these languages go together." />
          <div className="split top mt-4">
            <div className="grid g2">
              {LANGUAGES.map((l, i) => (
                <Reveal key={l.name} delay={i % 2} className="card"><div className="card-body">
                  <div className="meta">{l.where}</div>
                  <h3 className="h4 mt-1">{l.name} <span className="kn-serif muted" style={{ fontSize: '0.95rem' }}>{l.kn}</span></h3>
                  <p className="mt-1">{l.body}</p>
                </div></Reveal>
              ))}
            </div>
            <Reveal className="panel white" style={{ position: 'sticky', top: 100 }}>
              <div className="eyebrow plain">Mother tongues in Karnataka</div>
              <p className="small muted">Share of population by first language, Census of India 2011 (rounded). Languages under 1% not shown.</p>
              <div className="stack mt-2" role="list">
                {CENSUS_2011.map(([n, v]) => (
                  <div key={n} role="listitem" aria-label={`${n}: ${v}%`}>
                    <div className="row between small"><span>{n}</span><b>{v}%</b></div>
                    <div style={{ height: 8, background: 'var(--sand)', borderRadius: 9, overflow: 'hidden' }}>
                      <div style={{ width: `${(v / 66.5) * 100}%`, height: '100%', background: n === 'Kannada' ? 'var(--copper)' : 'var(--indigo-3)', borderRadius: 9 }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="mt-5"><Sources items={[SRC.census, SRC.pib, SRC.pollock, SRC.ramanujan, SRC.kannadaSahitya, SRC.W('Halmidi inscription'), SRC.W('Kannada script'), SRC.W('Tulu language'), SRC.W('Vachana sahitya'), SRC.W('Haridasa')]}
            notes={[{ kind: 'fact', text: 'Kannada is the official language under the Karnataka Official Language Act, 1963.' }, { kind: 'interpretation', text: 'The relative dating of the earliest Kannada inscriptions is still debated.' }]} /></div>
        </div>
      </section>
      <NextChapter path="/kannada" />
    </>
  );
}
