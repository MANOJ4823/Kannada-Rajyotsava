import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Img, Note, NextChapter, PageHero, Reveal, SectionHead, Sources, Badge, ZoomImg } from '../components/ui.jsx';
import { KarnatakaMap, MARKER_COLORS, ZONES } from '../components/maps.jsx';
import { PLACES, placeById } from '../data/places.js';
import { SRC } from '../data/sources.js';

const DEEP_TIME = [
  { when: '> 3,000 million years ago', title: 'The Dharwar Craton forms', body: 'Some of the oldest rocks on the Indian subcontinent — gneisses and greenstone (schist) belts of the Dharwar Craton — formed in the Archaean. Rocks of the Sargur group in southern Karnataka have been dated to well over 3 billion years.', kind: 'fact' },
  { when: '≈ 2,500 million years ago', title: 'Gold in the greenstone belts', body: 'The schist belts that host the Kolar and Hutti gold deposits belong to this ancient crust. Hutti preserves evidence of very old mine workings; Kolar was mined industrially from the 1880s until 2001.', kind: 'fact' },
  { when: '≈ 88 million years ago', title: 'India separates from Madagascar', body: 'Volcanism associated with this rifting is preserved in the columnar basalts of St Mary’s Islands off Malpe — recognised by the Geological Survey of India as a National Geological Monument. The western continental margin and escarpment began to take shape.', kind: 'interpretation' },
  { when: '≈ 66 million years ago', title: 'Deccan Traps', body: 'Vast lava flows covered much of west-central India. Their basalts reach into northern Karnataka — around Bidar and Belagavi — where weathering produced fertile black soils.', kind: 'fact' },
  { when: 'Deep time → present', title: 'A tilted plateau', body: 'The Deccan Plateau slopes gently eastward from the Western Ghats, which is why the Krishna, Tungabhadra and Kaveri rise near the western edge yet flow east to the Bay of Bengal.', kind: 'fact' },
];

const HUMAN_TIME = [
  { when: '≈ 1.2 million years ago (dates debated)', title: 'Stone tools at Isampur', body: 'In the Hunsgi–Baichbal valleys (Yadgir district), archaeologists excavated an Acheulian handaxe workshop. Dating methods give ages around 1.2 million years; such early dates continue to be refined.', kind: 'interpretation' },
  { when: '≈ 3000–1200 BCE', title: 'Neolithic ash mounds', body: 'Herding communities around Sanganakallu, Kupgal and Budihal left great mounds of burnt cattle dung, rock art and ground-stone tools — some of the earliest evidence of farming and pastoral life in the region.', kind: 'interpretation' },
  { when: '1st millennium BCE', title: 'Megaliths of Hire Benakal', body: 'Hundreds of stone burial and memorial structures on a hill near Gangavathi (Koppal district) — one of the largest megalithic sites in South India.', kind: 'fact' },
  { when: '3rd century BCE', title: 'Ashoka’s edicts in Karnataka', body: 'Mauryan edicts survive at Brahmagiri, Siddapura, Jatinga-Rameshwara, Maski, Koppal and Sannati. The Maski edict (found 1915) was the first to name the emperor as “Asoka”. At Kanaganahalli near Sannati, a sculpted panel labelled “rāya asoko” is thought to depict him.', kind: 'fact' },
  { when: '≈ 1st c. BCE – 3rd c. CE', title: 'Satavahanas & early trade', body: 'Coins, inscriptions and Buddhist sites at Sannati, Banavasi and Vadgaon-Madhavpur connect the region to Deccan-wide power and Indian Ocean trade — the world into which the Kadambas would rise.', kind: 'interpretation' },
];

const BLURBS = {
  hampi: 'Capital of the Karnata (Vijayanagara) Empire on the Tungabhadra; UNESCO World Heritage Site since 1986.',
  badami: 'Vatapi, capital of the Badami Chalukyas; rock-cut cave temples in red sandstone cliffs.',
  aihole: 'More than a hundred temples — an early experimental centre of Chalukya architecture.',
  pattadakal: 'UNESCO-listed group of 7th–8th-century temples in both northern and southern styles.',
  banavasi: 'Ancient town on the Varada river; capital of the Kadambas.',
  halmidi: 'Village where the Halmidi inscription — among the earliest known Kannada inscriptions — was found.',
  talakad: 'A Western Ganga capital on the Kaveri, now partly buried under sand.',
  kolar: 'Kuvalala, an early Western Ganga centre; later famous for its gold fields.',
  malkhed: 'Manyakheta, the Rashtrakuta capital from the 9th century.',
  basavakalyan: 'Kalyana, capital of the Western Chalukyas — and the setting of the 12th-century vachana movement.',
  halebidu: 'Dorasamudra, the Hoysala capital; Hoysaleswara temple.',
  belur: 'Velapuri; Chennakeshava temple, consecrated in 1117 CE.',
  ikkeri: 'Capitals of the Keladi Nayakas in the Malnad.',
  chitradurga: 'Hill fort of the Chitradurga Nayakas.',
  srirangapatna: 'River-island capital of the Mysore kingdom.',
  kittur: 'Seat of Rani Chennamma, who resisted the East India Company in 1824.',
  ballari: 'Hill fort on Ballari Gudda; the lower fort was built in 1769.',
  isampur: 'Lower Palaeolithic workshop in the Hunsgi valley.',
  hirebenakal: 'Iron Age megalithic necropolis.',
  sanganakallu: 'Neolithic settlement and ash mounds near Ballari.',
  brahmagiri: 'Ashokan edict and excavated prehistoric–early historic site.',
  maski: 'Ashokan edict naming “Asoka”.',
  sannati: 'Buddhist stupa site at Kanaganahalli with Ashokan inscriptions.',
  jog: 'The Sharavathi plunges over the Western Ghats escarpment.',
  agumbe: 'Rainforest village in the Western Ghats, among the wettest places in South India.',
  kudremukh: 'Shola-grassland mountains where the Tunga, Bhadra and Netravati rise nearby.',
  mullayanagiri: 'Highest peak in Karnataka (about 1,925 m).',
};

const LAYERS = [
  { id: 'zones', label: 'Physiographic zones' },
  { id: 'rivers', label: 'Major rivers' },
  { id: 'capital', label: 'Historical capitals' },
  { id: 'archaeology', label: 'Archaeological sites' },
  { id: 'monument', label: 'Temple centres' },
  { id: 'nature', label: 'Landscapes' },
];

function LayeredMap() {
  const [on, setOn] = useState({ zones: true, rivers: true, capital: true, archaeology: true, monument: false, nature: false });
  const [sel, setSel] = useState('hampi');
  const markers = PLACES.filter((p) => on[p.type] && p.id !== 'ellora').map((p) => ({ id: p.id, showLabel: p.id === sel || ['hampi', 'badami', 'banavasi', 'bidar', 'vijayapura', 'srirangapatna', 'halebidu', 'malkhed'].includes(p.id) }));
  const p = placeById[sel];
  return (
    <div className="split top" id="map">
      <div>
        <div className="layer-toggles mb-3" role="group" aria-label="Map layers">
          {LAYERS.map((l) => (
            <button key={l.id} className="chip" aria-pressed={on[l.id]} onClick={() => setOn((o) => ({ ...o, [l.id]: !o[l.id] }))}>
              {l.id in MARKER_COLORS && <span className="sw" style={{ width: 9, height: 9, borderRadius: 9, background: MARKER_COLORS[l.id], display: 'inline-block' }} />}
              {l.label}
            </button>
          ))}
        </div>
        <div className="map-wrap">
          <KarnatakaMap zones={on.zones} rivers={on.rivers} markers={markers} selected={sel} onSelect={setSel} title="Layered map of Karnataka: zones, rivers, capitals and archaeological sites" />
        </div>
        {on.zones && (
          <div className="map-legend mt-2">
            {Object.values(ZONES).map((z) => <span key={z.label}><span className="sw" style={{ background: z.color }} />{z.label}</span>)}
            {on.rivers && <span><span className="sw" style={{ background: '#4f86b0', height: 3 }} />Krishna, Bhima, Tungabhadra, Kaveri (Natural Earth)</span>}
          </div>
        )}
        <p className="map-note">Zones are shown at district resolution — real physiographic boundaries cut across districts. Markers indicate approximate location only and say nothing about the extent of any kingdom. Use Tab to move between markers and Enter to select.</p>
      </div>
      <div className="panel white" style={{ position: 'sticky', top: 100 }} aria-live="polite">
        <div className="eyebrow plain" style={{ color: MARKER_COLORS[p.type] }}>{({ capital: 'Historical capital / centre', archaeology: 'Archaeological site', monument: 'Temple centre', nature: 'Landscape', city: 'City' })[p.type]}</div>
        <h3 className="h3 mt-1">{p.name}</h3>
        <p className="muted">{BLURBS[p.id] || 'A present-day reference point.'}</p>
        <p className="tiny muted">≈ {p.lat.toFixed(2)}° N, {p.lon.toFixed(2)}° E</p>
        <div className="row mt-2">
          {p.type === 'capital' && <Link className="link-arrow" to="/kingdoms">See the kingdoms →</Link>}
          {(p.type === 'monument' || p.type === 'capital') && <Link className="link-arrow" to="/monuments">Heritage atlas →</Link>}
          {p.type === 'nature' && <Link className="link-arrow" to="/geography">Landscapes →</Link>}
        </div>
      </div>
    </div>
  );
}

const RIVERS = [
  { name: 'Krishna', kn: 'ಕೃಷ್ಣಾ', body: 'Enters from Maharashtra and crosses the north; its tributaries Ghataprabha, Malaprabha, Bhima and Tungabhadra water the Chalukya heartland. Badami, Aihole and Pattadakal stand in the Malaprabha valley.' },
  { name: 'Tungabhadra', kn: 'ತುಂಗಭದ್ರಾ', body: 'Formed where the Tunga and Bhadra meet at Kudli near Shivamogga. The Karnata (Vijayanagara) capital grew on its rocky banks at Hampi, feeding canals that still irrigate fields.' },
  { name: 'Kaveri', kn: 'ಕಾವೇರಿ', body: 'Rises at Talakaveri in Kodagu, flows past Srirangapatna and Talakadu, falls at Shivanasamudra and continues into Tamil Nadu — a shared river and a shared history.' },
  { name: 'Sharavathi', kn: 'ಶರಾವತಿ', body: 'A short west-flowing river that drops over Jog Falls and meets the Arabian Sea in a wide estuary at Honnavar.' },
  { name: 'Netravati & Kali', kn: 'ನೇತ್ರಾವತಿ · ಕಾಳಿ', body: 'Coastal rivers reaching the sea at Mangaluru and Karwar; the coast’s ports linked Karnataka to Arabia, East Africa and Southeast Asia.' },
];

const SHAPES = [
  { k: 'udupi', t: 'The coast', b: 'A narrow plain between the sea and the Ghats: rice, coconut, fishing, and ports such as Mangaluru, Bhatkal and Honnavar trading pepper, rice and textiles across the Arabian Sea.' },
  { k: 'agumbe', t: 'The mountain wall', b: 'The Western Ghats catch the monsoon. Forests, spices and rivers begin here; the passes across the Ghats were the trade routes between coast and plateau.' },
  { k: 'hampiRocks', t: 'The plateau', b: 'Granite boulders, black and red soils, and thousands of tanks (kere) that stored monsoon water — the basis of farming and of capitals from Badami to Hampi.' },
  { k: 'kodagu', t: 'Forest & hill', b: 'Kodagu, Chikkamagaluru and the Malnad: dense forest, later coffee and cardamom estates, and communities with distinct languages and traditions.' },
];

export default function Land() {
  return (
    <>
      <PageHero path="/land" image="westernGhats" alt="Shola grasslands, Kudremukh National Park, Western Ghats"
        lede="Long before the first kingdom, there were rocks billions of years old, a mountain wall that catches the monsoon, and rivers that cut the plateau. This is where Karnataka’s story begins." />

      <section className="section">
        <div className="wrap split top">
          <SectionHead eyebrow="Deep time" title="The rocks are older than any story told about them." lede="Geological history is measured in billions of years; human history in thousands. Below, the first timeline is scientific evidence. The second is archaeology. Myths and legends — which matter deeply — are labelled as such wherever they appear." />
          <Reveal className="stack">
            <ZoomImg k="stMarys" ratio="ratio-4x3" caption="Columnar basalt, St Mary’s Islands off Malpe (Udupi district)"
              title={DEEP_TIME[2].title} eyebrow={`Geology · ${DEEP_TIME[2].when}`}
              info={<><p>{DEEP_TIME[2].body}</p><div><Badge kind={DEEP_TIME[2].kind} /></div></>} />
          </Reveal>
        </div>
        <div className="wrap mt-5 grid g2">
          <div>
            <h3 className="h3 mb-3">Geological evidence</h3>
            <ol className="vtl">
              {DEEP_TIME.map((d) => (
                <Reveal as="li" key={d.title}>
                  <div className="when">{d.when}</div>
                  <div><h4>{d.title}</h4><p>{d.body}</p><div className="mt-1"><Badge kind={d.kind} /></div></div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="h3 mb-3">Archaeological evidence</h3>
            <ol className="vtl">
              {HUMAN_TIME.map((d) => (
                <Reveal as="li" key={d.title}>
                  <div className="when">{d.when}</div>
                  <div><h4>{d.title}</h4><p>{d.body}</p><div className="mt-1"><Badge kind={d.kind} /></div></div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
        <div className="wrap mt-5 grid g2">
          <ZoomImg k="hireBenakal" ratio="ratio-16x9" caption="Megalithic structures at Hire Benakal, Koppal district"
            title={HUMAN_TIME[2].title} eyebrow={`Archaeology · ${HUMAN_TIME[2].when}`}
            info={<><p>{HUMAN_TIME[2].body}</p><div><Badge kind={HUMAN_TIME[2].kind} /></div></>} />
          <ZoomImg k="mayurasharma" ratio="ratio-16x9" caption="Talagunda pillar inscription (3D scan) — a 5th-century Sanskrit record of the Kadamba founder Mayurasharma"
            title="Talagunda pillar inscription" eyebrow="Inscription · 5th century"
            info={<p>A Sanskrit record of the Kadamba founder Mayurasharma, composed generations after him. It describes a scholar who turned to arms and founded a kingdom in the forested west of the Deccan — the start of Karnataka’s recorded political history.</p>} />
        </div>
      </section>

      <section className="section theme-sand" aria-labelledby="map-h">
        <div className="wrap">
          <SectionHead eyebrow="Interactive map" title="Coast, mountains, plateau, rivers — and where people settled." lede="Switch layers on and off. Select any marker to learn what happened there." />
          <h2 id="map-h" className="sr-only">Layered map</h2>
          <div className="mt-4"><LayeredMap /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How the land shaped life" title="Terrain decided where water, food and trade could flow." />
          <div className="grid g4 mt-4">
            {SHAPES.map((s, i) => (
              <Reveal key={s.t} delay={i % 3} className="card">
                <ZoomImg k={s.k} ratio="ratio-4x3" credit={false} alt={s.t}
                  title={s.t} eyebrow="How the land shaped life" info={<p>{s.b}</p>} />
                <div className="card-body"><h3 className="h4">{s.t}</h3><p className="mt-1">{s.b}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-indigo">
        <div className="wrap">
          <SectionHead eyebrow="Rivers" title="Five rivers, and the civilisations along them." />
          <div className="grid g2 mt-4">
            <div>
              {RIVERS.map((r) => (
                <details className="acc" key={r.name}>
                  <summary><span className="h3">{r.name} <span className="kn-serif muted" style={{ fontSize: '1rem' }}>{r.kn}</span></span><span className="plus">+</span></summary>
                  <div className="acc-body"><p className="muted">{r.body}</p></div>
                </details>
              ))}
            </div>
            <div className="stack">
              <ZoomImg k="tungabhadra" ratio="ratio-4x3" caption="The Tungabhadra at Hampi"
                title={RIVERS[1].name} eyebrow="Rivers"
                info={<><div className="kn-serif" style={{ color: 'var(--copper)', fontSize: '1.3rem' }} lang="kn">{RIVERS[1].kn}</div><p>{RIVERS[1].body}</p></>} />
              <Note kind="tradition" title="Science and story, side by side">
                Many places carry sacred stories — the Kaveri’s origin at Talakaveri is linked to the sage Agastya, and the Hampi landscape is identified in tradition with Kishkindha of the Ramayana. These are living traditions, not geological or archaeological findings, and we present them as such.
              </Note>
            </div>
          </div>
          <div className="mt-5">
            <Sources
              notes={[
                { kind: 'fact', text: 'Rock ages are from radiometric dating published by the Geological Survey of India and peer-reviewed studies.' },
                { kind: 'interpretation', text: 'Very early archaeological dates (e.g. Isampur) depend on dating methods and are revised as research continues.' },
              ]}
              items={[SRC.gsi, SRC.radhakrishna, SRC.korisettar, SRC.asi, SRC.W('Dharwar Craton'), SRC.W('Isampur'), SRC.W('Hire Benakal'), SRC.W('Maski'), SRC.W('Edicts of Ashoka'), SRC.W("St. Mary's Islands")]}
            />
          </div>
        </div>
      </section>
      <NextChapter path="/land" />
    </>
  );
}
