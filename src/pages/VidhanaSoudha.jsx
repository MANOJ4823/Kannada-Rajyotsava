import { Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, ZoomImg } from '../components/ui.jsx';
import { SRC } from '../data/sources.js';

const FACTS = [
  { v: '13 July 1951', l: 'Foundation stone laid by Prime Minister Jawaharlal Nehru' },
  { v: '1956', l: 'Building completed, the year of the enlarged Mysore State' },
  { v: '224 + 75', l: 'Members of the Legislative Assembly and Legislative Council who meet here' },
];

export default function VidhanaSoudha() {
  return (
    <>
      <PageHero path="/vidhana-soudha" image="vidhanaSoudha" alt="Vidhana Soudha, Bengaluru, illuminated"
        lede="A legislature built of Bengaluru granite in an Indian architectural language — a statement about who would govern, and how, in a newly independent democracy." />
      <section className="section">
        <div className="wrap grid g3">
          {FACTS.map((f, i) => <Reveal key={f.v} delay={i} className="stat"><div className="v">{f.v}</div><div className="l">{f.l}</div></Reveal>)}
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap split">
          <div className="stack">
            <SectionHead eyebrow="Construction" title="Kengal Hanumanthaiah’s vision." />
            <p className="prose">Kengal Hanumanthaiah, Chief Minister of Mysore State from 1952 to 1956, drove the project. Mysore’s legislature had outgrown the colonial-era Attara Kacheri (1868), across the road — today the High Court of Karnataka. The new building was designed in the Public Works Department, with B. R. Manickam usually credited as its chief architect, and was built by thousands of workers and stone craftsmen.</p>
            <p className="prose">Its style is often called Neo-Dravidian: a symmetrical plan and classical colonnade combined with motifs from South Indian temple architecture — carved brackets, pillared porches and tiered domes crowned with finials.</p>
          </div>
          <ZoomImg k="hanumanthaiah" ratio="ratio-3x4" caption="Kengal Hanumanthaiah" portrait
            title="Kengal Hanumanthaiah" eyebrow="Chief Minister of Mysore State, 1952–1956"
            info={<p>He drove the project to build the Vidhana Soudha, after Mysore’s legislature had outgrown the colonial-era Attara Kacheri across the road.</p>} />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid g2">
          <Reveal className="stack">
            <ZoomImg k="attaraKacheri" ratio="ratio-4x3" caption="Attara Kacheri (1868), now the High Court of Karnataka"
              title="Attara Kacheri" eyebrow="Colonial public building · 1868"
              info={<p>The red Attara Kacheri, built in a Greco-Roman style for the administration of the British Commission, housed Mysore’s offices and legislative bodies. Today it is the High Court of Karnataka.</p>} />
            <h3 className="h3">Colonial public building</h3>
            <p className="muted">The red Attara Kacheri, built in a Greco-Roman style for the administration of the British Commission, housed Mysore’s offices and legislative bodies. It represents a government designed elsewhere.</p>
          </Reveal>
          <Reveal className="stack" delay={1}>
            <ZoomImg k="vidhanaSoudha" ratio="ratio-4x3" caption="Vidhana Soudha (1956)"
              title="Vidhana Soudha" eyebrow="Post-independence public building · 1956"
              info={<>
                <p>It faces the Attara Kacheri, deliberately larger and built in an Indian idiom, for a legislature elected by universal adult franchise.</p>
                <p className="small muted">Its style is often called Neo-Dravidian: a symmetrical plan and classical colonnade combined with motifs from South Indian temple architecture.</p>
              </>} />
            <h3 className="h3">Post-independence public building</h3>
            <p className="muted">The Vidhana Soudha faces it, deliberately larger and built in an Indian idiom, for a legislature elected by universal adult franchise. Mysore already had a long representative tradition — the Mysore Representative Assembly was created in 1881 and a Legislative Council in 1907.</p>
          </Reveal>
        </div>
      </section>

      <section className="section theme-indigo">
        <div className="wrap split top">
          <div className="stack">
            <SectionHead eyebrow="More than a façade" title="The house of Karnataka’s democracy." />
            <p className="prose muted">The building holds both chambers of the state legislature, the Cabinet room and departments of the state secretariat. Here laws are debated and budgets passed — including, in 1963, the Karnataka Official Language Act. Its façade carries the words <span className="kn-serif" lang="kn">ಸರ್ಕಾರದ ಕೆಲಸ ದೇವರ ಕೆಲಸ</span> — “Government’s work is God’s work” — a reminder that public office is service.</p>
            <p className="prose muted">Its neighbour, the Vikasa Soudha (2005), was built in a matching style to house more offices. The building is lit up on Sundays and public holidays, when crowds gather to see it.</p>
          </div>
          <div className="stack">
            <Note kind="tradition" title="A popular anecdote — not established fact">
              It is often said that a visiting foreign delegation, shown Bengaluru’s European-style buildings, asked whether India had any architecture of its own — and that this prompted Hanumanthaiah to build in an Indian style. The story is widely repeated, including in official tours, but we have not found a contemporary record that confirms it, so we present it as an anecdote.
            </Note>
            <Note kind="fact" title="Scale">It is among the largest legislative buildings in India, built largely of granite quarried around Bengaluru.</Note>
          </div>
        </div>
        <div className="wrap mt-5"><Sources items={[SRC.kaLegislature, SRC.kaGov, SRC.W('Vidhana Soudha'), SRC.W('Kengal Hanumanthaiah'), SRC.W('Attara Kacheri')]} /></div>
      </section>
      <NextChapter path="/vidhana-soudha" />
    </>
  );
}
