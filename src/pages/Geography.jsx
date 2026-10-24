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
  { id: 'vijayapura', cat: 'Plateau & plains', img: 'northernPlains', imgCap: 'A cotton field ready for harvest, Raichur district', name: 'Northern plains (Bayaluseeme)', district: 'Vijayapura, Kalaburagi, Belagavi, Raichur', eco: 'Black-soil plains and dry farmland',
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
  { id: 'bandipur', cat: 'Forests & wetlands', img: 'paBandipur', imgCap: 'Bengal tiger in Bandipur National Park', name: 'Bandipur National Park & Tiger Reserve', district: 'Chamarajanagar, Mysuru', eco: 'Dry and moist deciduous forest and scrub',
    d: 'Where the Deccan Plateau meets the Western Ghats, between the Kabini and Moyar rivers. Once a hunting ground of the Mysore Maharajas, it was among the first nine tiger reserves of Project Tiger in 1973 and is part of the Nilgiri Biosphere Reserve; tigers, elephants, gaur and dhole live here.' },
  { id: 'nagarahole', cat: 'Forests & wetlands', img: 'paNagarahole', imgCap: 'Asian elephant in Nagarahole Tiger Reserve', name: 'Nagarahole (Rajiv Gandhi) National Park & Tiger Reserve', district: 'Kodagu, Mysuru', eco: 'Moist and dry deciduous forest',
    d: 'Spreading down the Western Ghats foothills from the Brahmagiri hills, Nagarahole — “snake stream” — is separated from Bandipur by the Kabini reservoir. Once a hunting reserve of the Mysore rulers and a national park since 1983, it supports tigers, leopards, dhole, elephants and gaur.' },
  { id: 'bhadra', cat: 'Forests & wetlands', img: 'paBhadra', imgCap: 'Forested hillside in Bhadra Wildlife Sanctuary', name: 'Bhadra Tiger Reserve', district: 'Chikkamagaluru, Shivamogga', eco: 'Moist and dry deciduous forest, shola on the high hills',
    d: 'A forested valley of the Bhadra river ringed by the Baba Budan hills, protected since 1951 and a tiger reserve since 2007. It is known for a pioneering voluntary resettlement in 2002–04, when more than 4,000 people from villages inside the sanctuary moved out by choice.' },
  { id: 'kalitr', cat: 'Forests & wetlands', img: 'paKali', imgCap: 'The Kali river winding through Kali Tiger Reserve', name: 'Kali Tiger Reserve (Dandeli–Anshi)', district: 'Uttara Kannada', eco: 'Moist deciduous and semi-evergreen forest',
    d: 'Named after the Kali river that runs through it, the reserve joins the Dandeli Wildlife Sanctuary (1956) and Anshi National Park (1987). Its Western Ghats forests shelter tigers, black panthers, elephants and all four hornbill species of the region.' },
  { id: 'bannerghatta', cat: 'Forests & wetlands', img: 'paBannerghatta', imgCap: 'Scrub-covered hills and a waterhole, Bannerghatta National Park', name: 'Bannerghatta National Park', district: 'Bengaluru Urban', eco: 'Moist deciduous valleys and dry scrub on granite hills',
    d: 'On the granite hills about 22 km south of Bengaluru, the park forms part of an elephant corridor towards the BR Hills. Within it, the Bannerghatta Biological Park runs a zoo, safaris, a butterfly park and a wildlife rescue centre.' },
  { id: 'cauverywls', cat: 'Forests & wetlands', img: 'paCauvery', imgCap: 'The Kaveri flowing through Cauvery Wildlife Sanctuary', name: 'Cauvery Wildlife Sanctuary', district: 'Mandya, Chamarajanagar, Ramanagara', eco: 'Dry deciduous and thorn forest along the Kaveri gorge',
    d: 'Protected since 1987, the sanctuary follows the Kaveri through rugged dry forest towards the Tamil Nadu border, past Mekedatu. Its river pools shelter the hump-backed mahseer, and its forests link elephant ranges between Bannerghatta and the hills of Chamarajanagar.' },
  { id: 'mmhills', cat: 'Forests & wetlands', img: 'paMMHills', imgCap: 'Forested hills of Male Mahadeshwara Wildlife Sanctuary', name: 'Male Mahadeshwara (MM Hills) Wildlife Sanctuary', district: 'Chamarajanagar', eco: 'Dry and moist deciduous forest of the Eastern Ghats',
    d: 'Named after the hill shrine of Male Mahadeshwara within it, this sanctuary, declared in 2013, lies where the Eastern and Western Ghats meet. It links the Cauvery sanctuary, BRT Tiger Reserve and Sathyamangalam into one large landscape for tigers and elephants.' },
  { id: 'brahmagiriwls', cat: 'Forests & wetlands', img: 'paBrahmagiri', imgCap: 'Shola grassland in Brahmagiri Wildlife Sanctuary', name: 'Brahmagiri Wildlife Sanctuary', district: 'Kodagu', eco: 'Evergreen forest and shola grassland',
    d: 'Named after Brahmagiri Peak on the Kerala border, this rain-soaked sanctuary of 1974 protects evergreen forest and high shola grasslands in southern Kodagu. The Lakshmana Tirtha river rises here and tumbles over Iruppu Falls.' },
  { id: 'sharavathiwls', cat: 'Forests & wetlands', img: 'paSharavathi', imgCap: 'Sharavathi Wildlife Sanctuary near Sigandur', name: 'Sharavathi Valley Lion-tailed Macaque Sanctuary', district: 'Shivamogga, Uttara Kannada', eco: 'Evergreen forest and Myristica swamps',
    d: 'Protected since 1978 and enlarged in 2019, when it was renamed after the endangered lion-tailed macaque. It takes in the Sharavathi valley and the forests of Aghanashini, and protects rare freshwater Myristica swamp forests and hornbills.' },
  { id: 'daroji', cat: 'Forests & wetlands', img: 'paDaroji', imgCap: 'Sloth bear carrying a cub, Daroji Sloth Bear Sanctuary', name: 'Daroji Sloth Bear Sanctuary', district: 'Ballari, Vijayanagara', eco: 'Boulder hills with dry scrub and thorn forest',
    d: 'Declared in 1994 for the sloth bear, the sanctuary protects the boulder hills about 15 km from Hampi, where the bears shelter in rock caves. Once bare, the hillsides have recovered into scrub forest that also supports leopards and star tortoises.' },
  { id: 'ranebennur', cat: 'Forests & wetlands', img: 'paRanebennur', imgCap: 'Blackbuck at Ranebennur Blackbuck Sanctuary', name: 'Ranebennur Blackbuck Sanctuary', district: 'Haveri', eco: 'Open scrub and grassland on the plateau',
    d: 'Set aside in 1974 to protect the blackbuck, this sanctuary of scrub and planted woodland lies among farmland near Ranebennur. It is also known for the Indian wolf.' },
  { id: 'gudavi', cat: 'Forests & wetlands', img: 'paGudavi', imgCap: 'Waterbirds roosting on trees in Gudavi Lake', name: 'Gudavi Bird Sanctuary', district: 'Shivamogga', eco: 'Malnad lake with heronry trees',
    d: 'A small lake in Soraba taluk whose trees, standing in the water, fill with roosting and nesting waterbirds after the monsoon. More than 200 bird species have been recorded, among them spoonbills, ibises, herons and cormorants.' },
  { id: 'kokkarebellur', cat: 'Forests & wetlands', img: 'paKokkare', imgCap: 'Painted storks at Kokkare Bellur', name: 'Kokkare Bellur', district: 'Mandya', eco: 'Village heronry — a community-protected bird village',
    d: 'In this village between Bengaluru and Mysuru, spot-billed pelicans and painted storks nest in trees among the houses. Villagers protect them as bringers of good luck, and since 1976 the Forest Department has compensated owners of the nesting trees.' },
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
          <SectionHead eyebrow={cat === 'All' ? 'Every landscape' : cat} title={cat === 'All' ? 'Browse all places' : `${list.length} ${list.length === 1 ? 'place' : 'places'}`} />
          <div className="atlas-grid mt-4">
            {list.map((x, i) => (
              <Reveal key={x.id} delay={i % 3}>
                <button className="atlas-card" onClick={() => { setSel(x.id); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>
                  <Img k={x.img} credit={false} zoom alt={x.imgCap || x.name} />
                  <div className="row mt-2"><Badge kind="neutral">{x.cat}</Badge></div>
                  <h3>{x.name}</h3>
                  <div className="loc">{x.district} · {x.eco}</div>
                </button>
              </Reveal>
            ))}
          </div>
          <div className="mt-5"><Sources items={[SRC.unescoGhats, SRC.ramsar, SRC.gsi, SRC.kaTourism, SRC.radhakrishna, SRC.W('Jog Falls'), SRC.W('Talakadu'), SRC.W('Ranganathittu Bird Sanctuary'), SRC.W('Mullayanagiri'),
            { label: 'National Tiger Conservation Authority — tiger reserves', url: 'https://ntca.gov.in/tiger-reserves/', kind: 'Official' },
            SRC.W('Bandipur National Park'), SRC.W('Nagarhole National Park'), SRC.W('Bhadra Wildlife Sanctuary'), SRC.W('Kali Tiger Reserve'), SRC.W('Bannerghatta National Park'),
            SRC.W('Cauvery Wildlife Sanctuary'), SRC.W('Male Mahadeshwara Wildlife Sanctuary'), SRC.W('Brahmagiri Wildlife Sanctuary'), SRC.W('Daroji Sloth Bear Sanctuary'), SRC.W('Ranibennur Blackbuck Sanctuary'), SRC.W('Gudavi Bird Sanctuary'), SRC.W('Kokrebellur'),
            { label: 'The Hindu — Sharavathi sanctuary extended to protect the lion-tailed macaque (9 Jun 2019)', url: 'https://www.thehindu.com/news/national/karnataka/sharavathi-sanctuary-boundary-extended-to-protect-lion-tailed-macaque/article27699566.ece', kind: 'Reference (secondary)' }]} /></div>
        </div>
      </section>
      <NextChapter path="/geography" />
    </>
  );
}
