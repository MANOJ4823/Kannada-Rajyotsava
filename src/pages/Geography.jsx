import { useState } from 'react';
import { Badge, Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, ZoomImg } from '../components/ui.jsx';
import { KarnatakaMap, ZONES } from '../components/maps.jsx';
import { SRC } from '../data/sources.js';

const SITES = [
  { id: 'agumbe', cat: 'Western Ghats', img: 'agumbe', name: 'Agumbe', district: 'Shivamogga', eco: 'Tropical evergreen rainforest',
    d: 'One of the wettest places in South India, known for its sunsets over the coastal plain and as home to the Agumbe Rainforest Research Station, famous for king cobra research.' },
  { id: 'kudremukh', cat: 'Western Ghats', img: 'kudremukh', name: 'Kudremukh', district: 'Chikkamagaluru, Udupi, Dakshina Kannada', eco: 'Shola forest and montane grassland',
    d: 'The “horse-face” peak gives the national park its name. The Tunga, Bhadra and Netravati rise in these hills. Iron-ore mining here ended in 2006 after a Supreme Court order to protect the forest.' },
  { id: 'madikeri', cat: 'Western Ghats', img: 'kodagu', name: 'Kodagu', district: 'Kodagu', eco: 'Evergreen forest, coffee agroforestry',
    d: 'Misty hills where the Kaveri rises at Talakaveri — the focus of the Tula Sankramana festival each October; coffee grown under native shade trees supports birds and wildlife alongside farms.' },
  { id: 'mullayanagiri', cat: 'Mountains & peaks', img: 'mullayanagiri', name: 'Mullayanagiri', district: 'Chikkamagaluru', eco: 'Montane grassland',
    d: 'At roughly 1,925 metres, the highest peak in Karnataka, in the Baba Budangiri range.' },
  { id: 'nandi', cat: 'Hills', img: 'nandi', name: 'Nandi Hills', district: 'Chikkaballapura', eco: 'Dry deciduous scrub on granite hills',
    d: 'A hill fort and a sunrise destination near Bengaluru. Several rivers, including the Arkavathi and the South Pennar (Dakshina Pinakini), rise in this range.' },
  { id: 'brhills', cat: 'Hills', img: 'brHills', name: 'Biligiri Rangana Hills', district: 'Chamarajanagar', eco: 'Where the Eastern and Western Ghats meet',
    d: 'The BRT Tiger Reserve is home to the Soliga people, whose forest rights within the reserve were recognised under the Forest Rights Act.' },
  { id: 'hampi', cat: 'Plateau & plains', img: 'hampiRocks', name: 'The Deccan Plateau — granite country', district: 'Vijayanagara, Ballari, Koppal', eco: 'Semi-arid granite landscape',
    d: 'Ancient granite weathered into boulders and tors. Rainfall is low in the rain shadow of the Ghats; tanks, canals and hardy millets made farming possible.' },
  { id: 'vijayapura', cat: 'Plateau & plains', img: 'joladaRotti', imgCap: 'Jolada rotti — sorghum flatbread of the northern plains', name: 'Northern plains (Bayaluseeme)', district: 'Vijayapura, Kalaburagi, Belagavi, Raichur', eco: 'Black-soil plains and dry farmland',
    d: 'Black cotton soils formed partly from Deccan basalt support jowar (sorghum), pulses such as tur, cotton and sunflower. Summers are hot and dry.' },
  { id: 'jog', cat: 'Rivers & waterfalls', img: 'jog', name: 'Jog Falls', district: 'Shivamogga / Uttara Kannada', eco: 'Escarpment waterfall',
    d: 'The Sharavathi drops about 253 metres in four streams — Raja, Rani, Roarer and Rocket. Upstream dams mean it is at its fullest in the monsoon.' },
  { id: 'yana', cat: 'Rivers & waterfalls', img: 'vibhuti', imgCap: 'The rock towers of Yana, near Vibhuti Falls', name: 'Yana & Vibhuti Falls', district: 'Uttara Kannada', eco: 'Forest, karst rock towers, cascades',
    d: 'Dramatic rock outcrops rise from the forest at Yana; nearby Vibhuti Falls cascades through the Western Ghats forests.' },
  { id: 'shivanasamudra', cat: 'Rivers & waterfalls', img: 'shivanasamudra', name: 'Shivanasamudra', district: 'Mandya / Chamarajanagar', eco: 'River island and falls',
    d: 'The Kaveri divides into the Gaganachukki and Bharachukki falls. A hydroelectric station built here in 1902 was among the earliest in Asia, powering the Kolar Gold Fields and, soon after, Bengaluru.' },
  { id: 'kabini', cat: 'Lakes & reservoirs', img: 'kabini', name: 'Kabini reservoir', district: 'Mysuru', eco: 'Reservoir between Nagarahole and Bandipur',
    d: 'In the dry season elephants gather on the receding shores — one of the great wildlife sights of South India.' },
  { id: 'honnavar', cat: 'Lakes & reservoirs', img: 'honnavar', name: 'Honnavar estuary', district: 'Uttara Kannada', eco: 'Estuary and mangroves',
    d: 'Where the Sharavathi meets the sea, backwaters and mangroves shelter fish, crabs and birds and support fishing communities.' },
  { id: 'udupi', cat: 'Coast', img: 'udupi', name: 'Udupi', district: 'Udupi', eco: 'Coastal plain', d: 'A temple town on the coastal plain, famous for its Krishna temple, its Tulu culture and the Udupi restaurant tradition that spread across India.' },
  { id: 'mangaluru', cat: 'Coast', img: 'mangaluru', name: 'Mangaluru', district: 'Dakshina Kannada', eco: 'Port city and river mouths', d: 'Port, education and banking centre at the mouths of the Netravati and Gurupura rivers.' },
  { id: 'karwar', cat: 'Coast', img: 'karwar', name: 'Karwar', district: 'Uttara Kannada', eco: 'Bay, islands and beaches', d: 'Where the Kali river meets the Arabian Sea, with beaches, islands and a major naval base.' },
  { id: 'stmarys', cat: 'Coast', img: 'stMarys', name: 'St Mary’s Islands', district: 'Udupi', eco: 'Basalt islands', d: 'Columnar basalt formed about 88 million years ago — a National Geological Monument.' },
  { id: 'ranganathittu', cat: 'Forests & wetlands', img: 'ranganathittu', name: 'Ranganathittu Bird Sanctuary', district: 'Mandya', eco: 'River islets and wetland',
    d: 'Islets in the Kaveri near Srirangapatna where painted storks, spot-billed pelicans and many other birds nest. Designated a Ramsar wetland of international importance in 2022.' },
  { id: 'talakad', cat: 'Sand dunes', img: 'talakad', imgCap: 'Vaidyeshvara Temple, Talakadu', name: 'Talakadu', district: 'Mysuru', eco: 'River sand dunes — not a desert',
    d: 'Temples of a former Ganga capital on the Kaveri lie partly buried under sand. The Panchalinga Darshana festival is held here at long intervals.', special: true },
];

const CATS = ['All', ...new Set(SITES.map((s) => s.cat))];

export default function Geography() {
  const [cat, setCat] = useState('All');
  const [sel, setSel] = useState('jog');
  const list = SITES.filter((s) => cat === 'All' || s.cat === cat);
  const s = SITES.find((x) => x.id === sel) || list[0];
  return (
    <>
      <PageHero path="/geography" image="jog" alt="Jog Falls on the Sharavathi river"
        lede="Rainforest and rain shadow, sea coast and granite plateau, river islands and sand dunes. Karnataka holds a remarkable range of landscapes — not every textbook category, but many worlds in one state." />
      <section className="section">
        <div className="wrap">
          <div className="pill-row mb-4" role="group" aria-label="Landscape types">
            {CATS.map((c) => <button key={c} className="chip" aria-pressed={cat === c} onClick={() => { setCat(c); const f = SITES.find((x) => c === 'All' || x.cat === c); f && setSel(f.id); }}>{c}</button>)}
          </div>
          <div className="split top">
            <div>
              <div className="map-wrap">
                <KarnatakaMap zones markers={list.map((x) => ({ id: x.id, showLabel: x.id === sel }))} selected={s?.id} onSelect={setSel} title="Physical geography of Karnataka" />
              </div>
              <div className="map-legend mt-2">{Object.values(ZONES).map((z) => <span key={z.label}><span className="sw" style={{ background: z.color }} />{z.label}</span>)}</div>
              <p className="map-note">Zones at district resolution. Select a marker (or use Tab and Enter) to explore each place.</p>
            </div>
            {s && (
              <div className="stack" aria-live="polite">
                <ZoomImg k={s.img} ratio="ratio-4x3" caption={s.imgCap || s.name}
                  title={s.name} eyebrow={s.cat}
                  info={<>
                    <div className="row"><span className="badge fact">{s.eco}</span></div>
                    <p className="small muted" style={{ margin: 0 }}>District: {s.district}</p>
                    <p>{s.d}</p>
                    {s.special && <p className="small muted">Talakadu is a riverside landscape of wind-blown sand on the Kaveri’s banks, not a natural desert.</p>}
                  </>} />
                <div className="row"><span className="badge neutral">{s.cat}</span><span className="badge fact">{s.eco}</span></div>
                <h2 className="h2">{s.name}</h2>
                <p className="small muted" style={{ margin: 0 }}>District: {s.district}</p>
                <p className="lede">{s.d}</p>
                {s.special && (
                  <>
                    <Note kind="fact" title="Not a desert">Talakadu is a riverside landscape of wind-blown sand on the Kaveri’s banks, not a natural desert.</Note>
                    <Note kind="tradition" title="Alamelamma’s curse">Local tradition attributes the sand to a curse uttered by Alamelamma, a queen associated with the 17th-century fall of the Karnata (Vijayanagara) governor of Srirangapatna to the Mysore Wadiyars.</Note>
                    <Note kind="interpretation" title="A scientific explanation">Researchers have suggested that a dam (anicut) built across the Kaveri in medieval times changed the river’s flow, exposing sandbanks whose sand winds then carried over the town.</Note>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="section theme-sand">
        <div className="wrap">
          <SectionHead eyebrow="Every landscape" title="Browse all places" />
          <div className="atlas-grid mt-4">
            {SITES.map((x, i) => (
              <Reveal key={x.id} delay={i % 3}>
                <button className="atlas-card" onClick={() => { setSel(x.id); setCat('All'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>
                  <Img k={x.img} credit={false} zoom alt={x.imgCap || x.name} />
                  <div className="row mt-2"><Badge kind="neutral">{x.cat}</Badge></div>
                  <h3>{x.name}</h3>
                  <div className="loc">{x.district} · {x.eco}</div>
                </button>
              </Reveal>
            ))}
          </div>
          <div className="mt-5"><Sources items={[SRC.unescoGhats, SRC.ramsar, SRC.gsi, SRC.kaTourism, SRC.radhakrishna, SRC.W('Jog Falls'), SRC.W('Talakadu'), SRC.W('Ranganathittu Bird Sanctuary'), SRC.W('Mullayanagiri')]} /></div>
        </div>
      </section>
      <NextChapter path="/geography" />
    </>
  );
}
