import { Badge, Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, ZoomImg } from '../components/ui.jsx';
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
  { k: 'emblem', type: 'Motto on the state emblem', en: 'Satyameva Jayate', kn: 'ಸತ್ಯಮೇವ ಜಯತೆ', status: 'fact', badge: 'On the emblem', cap: 'The state emblem, with the motto inscribed below',
    d: '“Truth alone triumphs.” The national motto of India, from the Mundaka Upanishad, is inscribed in Devanagari script (सत्यमेव जयते) on the Karnataka state emblem. It was not adopted separately as a state motto.' },
  { k: 'stateButterfly', type: 'State butterfly', en: 'Southern birdwing', kn: 'ಸದರ್ನ್ ಬರ್ಡ್ ವಿಂಗ್', status: 'fact', cap: 'Southern birdwing (Troides minos) at Clerodendrum flowers',
    d: 'Troides minos: a black-and-yellow swallowtail found only in southern India, mainly in the Western Ghats. Approved by the State Wildlife Board in 2016 and designated in 2017, it is one of India’s largest butterflies — second largest by recorded wingspan.' },
  { k: 'stateFish', type: 'State fish', en: 'Carnatic carp', kn: 'ಕಾವೇರಿ ಗೆಂಡೆ', status: 'fact', cap: 'Carnatic carp, Karnataka, 2010',
    d: 'Hypselobarbus carnaticus: a large native carp of the fast-flowing rivers of the Western Ghats, growing to about 60 cm, valued as a food fish. Listed as Karnataka’s state fish by the National Fisheries Development Board.' },
  { k: 'stateFruit', type: 'State fruit', en: 'Mango', kn: 'ಮಾವಿನ ಹಣ್ಣು', status: 'fact', cap: 'Mangoes (Mangifera indica)',
    d: 'Mangifera indica: Karnataka’s state fruit and one of its major fruit crops.' },
  { k: 'festRajyotsava', type: 'State foundation day', en: 'Kannada Rajyotsava · 1 November', kn: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ', status: 'fact', badge: 'State holiday', cap: 'Kannada flags at a Rajyotsava celebration',
    d: 'Marks 1 November 1956, when Kannada-speaking regions were united into Mysore State, renamed Karnataka on 1 November 1973. It is a state public holiday.' },
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
            <ZoomImg k="kannadaFlag" ratio="ratio-3x2" caption="The red-and-yellow Kannada flag — a cultural flag"
              title="The Kannada flag" eyebrow="ಕನ್ನಡ ಬಾವುಟ · Cultural flag"
              info={<>
                <p>Designed in the 1960s by the writer and activist Ma. Ramamurthy as a flag for Kannada identity, the red-and-yellow bicolour is everywhere on 1 November.</p>
                <p className="small muted">Yellow is commonly read as arishina (turmeric) and red as kumkuma (vermilion); these are popular interpretations. It is a cultural flag, not a legally notified official flag of the State of Karnataka.</p>
              </>} />
          </Reveal>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap">
          <SectionHead eyebrow="Gallery" title="State symbols" kn="ರಾಜ್ಯದ ಚಿಹ್ನೆಗಳು" lede="Official designations of the Government of Karnataka. Kannada and English names are given for each." />
          <div className="grid g3 mt-4">
            {SYMBOLS.map((s, i) => (
              <Reveal key={s.type} delay={i % 3} className="card">
                <ZoomImg k={s.k} ratio="ratio-4x3" credit={!!s.k} alt={s.en} caption={s.cap} placeholderNote={s.placeholder}
                  title={s.en} eyebrow={`${s.type} · ${s.badge || 'Official'}`}
                  info={<>
                    <div className="kn-serif" style={{ color: 'var(--copper)', fontSize: '1.3rem' }} lang="kn">{s.kn}</div>
                    <p>{s.d}</p>
                  </>} />
                <div className="card-body">
                  <div className="row between"><div className="meta">{s.type}</div><Badge kind={s.status}>{s.badge || 'Official'}</Badge></div>
                  <h3 className="h3">{s.en}</h3>
                  <div className="kn-serif" style={{ color: 'var(--copper)', fontSize: '1.2rem' }} lang="kn">{s.kn}</div>
                  <p className="mt-2">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="tiny muted mt-4">We list only symbols we could confirm as official designations. Some lists online add a state fruit, game or other symbols; we have left those out unless an official notification could be identified.</p>
          <div className="mt-4"><Sources items={[SRC.kaGov, SRC.W('List of Karnataka state symbols'), SRC.W('Flag of Karnataka'), SRC.W('Emblem of Karnataka'),
            SRC.W('Southern birdwing'), SRC.W('Hypselobarbus carnaticus'),
            { label: 'National Fisheries Development Board — State fishes of India', url: 'http://web.archive.org/web/20250609172735/https://nfdb.gov.in/PDF/Fish%20&%20Fisheries%20of%20India/2.State%20Fishes%20of%20India.pdf', kind: 'Official' },
            { label: 'The Hindu — “Karnataka gets its own butterfly” (17 May 2017)', url: 'https://www.thehindu.com/news/national/karnataka/karnataka-gets-its-own-butterfly/article18470618.ece', kind: 'Reference (secondary)' }]} /></div>
        </div>
      </section>
      <NextChapter path="/symbols" />
    </>
  );
}
