import { Badge, Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources } from '../components/ui.jsx';
import { SRC } from '../data/sources.js';

const SYMBOLS = [
  { k: 'emblem', type: 'State emblem', en: 'Gandabherunda', kn: 'ಗಂಡಭೇರುಂಡ', status: 'fact',
    d: 'The two-headed mythical bird, long the emblem of the Mysore kingdom, sits at the centre of the state emblem, crowned by the Lion Capital of Sarnath and supported by mythical lion-elephant figures, with the motto Satyameva Jayate.' },
  { k: 'illAnthem', cap: 'Illustration of the anthem’s opening words', type: 'State anthem', en: 'Jaya Bharata Jananiya Tanujate', kn: 'ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ', status: 'fact',
    d: 'Kuvempu’s song, declared the state song in 2004.', placeholder: 'A song — see Chapter 11' },
  { k: 'elephant', type: 'State animal', en: 'Indian elephant', kn: 'ಆನೆ', status: 'fact',
    d: 'Karnataka’s forests — Bandipur, Nagarahole, BRT, the Western Ghats — hold the largest wild Asian elephant population of any Indian state, according to the 2017 synchronous elephant census.', cap: 'Asian elephant, Bandipur' },
  { k: 'roller', type: 'State bird', en: 'Indian roller', kn: 'ನೀಲಕಂಠ', status: 'fact',
    d: 'A bird of open farmland whose wings flash brilliant blue in flight; seeing one at Dasara is considered auspicious in many places.', cap: 'Indian roller (photographed in Gujarat)' },
  { k: 'sandalwood', type: 'State tree', en: 'Sandalwood', kn: 'ಶ್ರೀಗಂಧ', status: 'fact',
    d: 'Santalum album: its fragrant heartwood made Mysore sandalwood oil, soap and carving world-famous. Over-harvesting and smuggling have made the wild tree rare.', cap: 'Santalum album — botanical illustration' },
  { k: 'lotus', type: 'State flower', en: 'Lotus', kn: 'ಕಮಲ', status: 'fact', d: 'A symbol found throughout Karnataka’s temple art — on ceilings, pedestals and doorways.', cap: 'Sacred lotus' },
];

export default function Symbols() {
  return (
    <>
      <PageHero path="/symbols" image="roller" alt="Indian roller, Karnataka’s state bird"
        lede="Some symbols are written into law; others live in popular culture. Both matter — and it helps to know which is which." />

      <section className="section">
        <div className="wrap split">
          <div className="stack">
            <SectionHead eyebrow="The Kannada flag · ಕನ್ನಡ ಬಾವುಟ" title="Red and yellow." />
            <p className="prose">The red-and-yellow bicolour is everywhere on 1 November — on buildings, autorickshaws, scarves and in every Rajyotsava procession. It was designed in the 1960s by the writer and activist Ma. Ramamurthy as a flag for Kannada identity, and over the decades it became the flag of Kannada pride and celebration.</p>
            <Note kind="tradition" title="What the colours mean">Yellow is commonly read as <i>arishina</i> (turmeric) and red as <i>kumkuma</i> (vermilion), both auspicious; others read them as harmony and courage. These are popular interpretations — no law prescribes a meaning.</Note>
            <Note kind="fact" title="Legal status">This is a cultural flag. It is not a legally notified official flag of the State of Karnataka. In 2018 the state government proposed a separate tricolour “Nada Dhwaja” (yellow, white and red with the state emblem); it has not received the approval needed to become official.</Note>
          </div>
          <Reveal>
            <Img k="kannadaFlag" ratio="ratio-3x2" caption="The red-and-yellow Kannada flag — a cultural flag" />
          </Reveal>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap">
          <SectionHead eyebrow="Gallery" title="State symbols" kn="ರಾಜ್ಯದ ಚಿಹ್ನೆಗಳು" lede="Official designations of the Government of Karnataka. Kannada and English names are given for each." />
          <div className="grid g3 mt-4">
            {SYMBOLS.map((s, i) => (
              <Reveal key={s.type} delay={i % 3} className="card">
                <Img k={s.k} ratio="ratio-4x3" credit={!!s.k} alt={s.en} caption={s.cap} placeholderNote={s.placeholder} />
                <div className="card-body">
                  <div className="row between"><div className="meta">{s.type}</div><Badge kind={s.status}>Official</Badge></div>
                  <h3 className="h3">{s.en}</h3>
                  <div className="kn-serif" style={{ color: 'var(--copper)', fontSize: '1.2rem' }} lang="kn">{s.kn}</div>
                  <p className="mt-2">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="tiny muted mt-4">We list only symbols we could confirm as official designations. Some lists online add a state fruit, game or other symbols; we have left those out unless an official notification could be identified.</p>
          <div className="mt-4"><Sources items={[SRC.kaGov, SRC.W('List of Karnataka state symbols'), SRC.W('Flag of Karnataka'), SRC.W('Emblem of Karnataka')]} /></div>
        </div>
      </section>
      <NextChapter path="/symbols" />
    </>
  );
}
