import { useState } from 'react';
import { Badge, Img, Modal, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, ZoomImg } from '../components/ui.jsx';
import { SRC } from '../data/sources.js';

const ERAS = [
  { y: 'c. 890 CE', t: 'Before Kempegowda', img: 'bullTemple', cap: 'Garuda pillar at the Dodda Basavana Gudi (Bull Temple), Basavanagudi', kind: 'fact',
    d: 'An inscription of about 890 CE at Begur, from the Western Ganga period, mentions a battle at “Bengaluru” — the earliest known record of the name. Ganga, Chola and Hoysala inscriptions survive across today’s city. The tale that a Hoysala king was fed boiled beans (benda kaalu) here and named the place is a folk etymology.' },
  { y: '1537', t: 'Kempegowda’s town', img: 'kempegowda', cap: 'Modern statue of Kempegowda I, Kempegowda International Airport', kind: 'fact',
    d: 'Kempegowda I, a Yelahanka chief under the Karnata (Vijayanagara) empire, built a mud fort and laid out a town in 1537 (the traditional date). Market streets — petes — specialised by trade, and tanks such as Dharmambudhi and Kempambudhi stored water. Four watchtowers attributed by tradition to Kempegowda II marked its limits.' },
  { y: '1638–1759', t: 'Changing hands', img: 'illChangingHands', cap: 'Illustration: the rulers who held Bengaluru between 1537 and 1689', kind: 'fact',
    d: 'Bengaluru passed to the Bijapur general Shahaji (father of Shivaji) as a jagir, then to the Mughals, who sold it to Mysore’s Chikka Devaraja Wadiyar in 1689.' },
  { y: '1761–1799', t: 'Stone fort & Lalbagh', img: 'bangaloreFort', cap: 'Remains of the old Bangalore Fort', kind: 'fact',
    d: 'The fort was rebuilt in stone from 1761 and Lalbagh was begun in 1760; in 1791 British forces under Cornwallis stormed the fort.' },
  { y: '1806–1881', t: 'Cantonment & commission', img: 'attaraKacheri', cap: 'Attara Kacheri (1868), now the High Court', kind: 'fact',
    d: 'The British established a military cantonment east of the old town, with its own mixed, multilingual population. From 1831 the British Commission ruled Mysore from Bengaluru; Cubbon Park and Attara Kacheri date from this period. The railway arrived in 1864.' },
  { y: '1898–1940', t: 'A modern city', img: 'iisc', cap: 'Main Building, Indian Institute of Science', kind: 'fact',
    d: 'After the plague of 1898, planned extensions such as Basavanagudi and Malleswaram were laid out. Electricity from Shivanasamudra reached the city in the early 1900s; the Indian Institute of Science opened in 1909; Hindustan Aircraft was founded in 1940.' },
  { y: '1949–1980s', t: 'Science & public sector', img: 'vidhanaSoudha', cap: 'Vidhana Soudha (1956) — Bengaluru as capital of the enlarged state', kind: 'fact',
    d: 'City and Cantonment merged into one corporation in 1949. Public-sector units — BEL, HMT, ITI, BHEL — and research bodies such as the National Aerospace Laboratories and ISRO made Bengaluru a city of engineers. Electronics City was planned from 1978.' },
  { y: '1985 →', t: 'Software & start-ups', img: 'electronicCity', cap: 'Infosys campus, Electronic City', kind: 'fact',
    d: 'Texas Instruments opened a development centre in 1985; Infosys and Wipro grew here; Software Technology Parks of India opened in the early 1990s. Today the city is home to global technology centres, biotechnology firms and thousands of start-ups. “Bangalore” officially became “Bengaluru” on 1 November 2014.' },
];

const PETES = [
  ['Chikkapete & Doddapete', 'the “small” and “big” market streets'], ['Balepete', 'bangles'], ['Akkipete', 'rice'], ['Ragipete', 'ragi'],
  ['Cottonpete', 'cotton'], ['Tharagupete', 'grain wholesale'], ['Ganigarapete', 'oil pressers'], ['Nagarathpete', 'Nagarathar traders'], ['Upparpete', 'Uppara (salt-making) community'],
];

const LANDMARKS = [
  { id: 'lalbagh', name: 'Lalbagh Botanical Garden', img: 'lalbagh', when: 'Begun 1760',
    d: 'A 240-acre garden with a glasshouse (1889) modelled on London’s Crystal Palace, and biannual flower shows. Its exposed rock is Peninsular Gneiss about 3,000 million years old, recognised by the Geological Survey of India as a National Geological Monument.' },
  { id: 'palace', name: 'Bengaluru Palace', img: 'bangalorePalace', when: 'Late 19th century', d: 'A Tudor-style palace built for the Wadiyar family, with turrets and battlements; now a venue for concerts and events.' },
  { id: 'fort', name: 'Bangalore Fort remnants', img: 'bangaloreFort', when: '1537 mud fort; rebuilt in stone from 1761', d: 'Kempegowda’s mud fort was later rebuilt in stone. A gateway, walls and a Ganesha shrine survive near KR Market.' },
  { id: 'vidhana', name: 'Vidhana Soudha', img: 'vidhanaSoudha', when: '1951–1956', d: 'Seat of Karnataka’s legislature — see Chapter 8.' },
  { id: 'kr', name: 'KR Market', img: 'krMarket', when: 'Building from the 1920s', d: 'Krishna Rajendra Market, the city’s great wholesale market for flowers, fruit and vegetables, near the site of the old fort.' },
  { id: 'bull', name: 'Basavanagudi & the Bull Temple', img: 'bullTemple', cap: 'Garuda pillar at the Dodda Basavana Gudi (Bull Temple)', when: '16th century (traditionally attributed to Kempegowda)', d: 'A monolithic Nandi in the Dodda Basavana Gudi; the area hosts the Kadalekai Parishe groundnut fair each year.' },
  { id: 'ulsoor', name: 'Ulsoor Lake', img: 'ulsoor', when: 'Historic tank', d: 'One of the city’s old tanks, beside the former Cantonment, with small islands and a boat club.' },
  { id: 'cubbon', name: 'Cubbon Park', img: 'cubbon', when: '1870', d: 'Officially Sri Chamarajendra Park; named after commissioner Mark Cubbon. Some 300 acres of trees in the city centre, with the State Central Library.' },
  { id: 'kempegowda', name: 'Kempegowda’s historic Bengaluru', img: 'kempegowda', cap: 'Modern statue of Kempegowda I, Kempegowda International Airport', when: '1537 →', d: 'The pete grid around Avenue Road, Chikkapete and Balepete still trades in textiles, metals, grain and wedding goods. Each spring the Bengaluru Karaga procession sets out from the Dharmaraya Swamy temple in Thigalarapete.' },
  { id: 'iskcon', name: 'ISKCON Sri Radha Krishna Temple', img: 'iskcon', cap: 'ISKCON Bengaluru temple lit up during the Brahmotsava festival', when: 'Inaugurated 1997', d: 'A modern hilltop temple in Rajajinagar, among the largest ISKCON temples in the world; its devotees founded the Akshaya Patra mid-day meal programme in 2000.' },
  { id: 'tech', name: 'Technology districts', img: 'electronicCity', cap: 'Infosys campus, Electronic City', when: '1978 →', d: 'Electronics City, Whitefield, Outer Ring Road, Koramangala and HSR Layout — software campuses, research labs and start-up neighbourhoods.' },
];

export default function Bengaluru() {
  const [era, setEra] = useState(0);
  const [open, setOpen] = useState(null);
  const e = ERAS[era];
  const lm = LANDMARKS.find((l) => l.id === open);
  return (
    <>
      <PageHero path="/bengaluru" image="bengaluru" alt="Bengaluru city view"
        lede="A ridge-top town of tanks and markets became a garden city, a public-sector science city, and a global technology hub — and a meeting place for people from every part of India." />

      <section className="section theme-night">
        <div className="wrap">
          <SectionHead eyebrow="From 890 CE to today" title="Watch a town become a metropolis." />
          <div className="mt-4">
            <label className="sr-only" htmlFor="era">Choose a period</label>
            <input id="era" type="range" min="0" max={ERAS.length - 1} value={era} onChange={(ev) => setEra(+ev.target.value)} className="year-range" aria-valuetext={`${e.y}: ${e.t}`} />
            <div className="row between mt-2" style={{ fontSize: '0.78rem', opacity: 0.7 }}>
              {ERAS.map((x, i) => <button key={x.y} onClick={() => setEra(i)} style={{ background: 'none', border: 0, color: i === era ? 'var(--yellow)' : 'inherit', padding: 4 }}>{x.y}</button>)}
            </div>
          </div>
          <div className="split mt-4" aria-live="polite">
            <div className="stack">
              <div className="eyebrow">{e.y}</div>
              <h3 className="h2">{e.t}</h3>
              <p className="lede">{e.d}</p>
              {era === 0 && <Badge kind="tradition">The “boiled beans” story is folklore</Badge>}
            </div>
            <ZoomImg k={e.img} ratio="ratio-4x3" caption={e.cap} alt={e.cap || e.t} placeholderNote="No verified image for this period."
              title={e.t} eyebrow={e.y}
              info={<><p>{e.d}</p>{era === 0 && <div><Badge kind="tradition">The “boiled beans” story is folklore</Badge></div>}</>} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split top">
          <div className="stack">
            <SectionHead eyebrow="The petes" title="A city organised by trade." lede="Kempegowda’s town was planned around crossing market streets. Their names still tell you what was sold — or who sold it." />
            <Note kind="interpretation" title="Water">Bengaluru has no large river. It grew on a ridge between valleys, and generations built chains of tanks that caught monsoon run-off; many were later built over — the Dharmambudhi tank lies under today’s Kempegowda bus station.</Note>
          </div>
          <ul className="grid g2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {PETES.map(([n, d]) => <Reveal as="li" key={n} className="panel"><div className="h4">{n}</div><div className="muted small">{d}</div></Reveal>)}
          </ul>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap split top">
          <SectionHead eyebrow="Why here?" title="Geography, then institutions." />
          <div className="prose stack">
            <p>Bengaluru sits on the southern Deccan Plateau at roughly 900 metres, which gives it a mild climate. It lay on roads connecting the Mysore region with the Tamil plains, the coast and the north, and later on railway lines. The routes towards Chennai and the Mangaluru coast were parts of this wider network — important, but not on their own the reason the town was founded.</p>
            <p>Its rise as a technology centre came later and was built: a research university (IISc), aircraft and electronics factories, defence and space laboratories, engineering colleges, and a supply of skilled people that drew companies in the 1980s and 1990s.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Landmarks" title="Eleven places to know" lede="Select a card for details." />
          <div className="atlas-grid mt-4">
            {LANDMARKS.map((l, i) => (
              <Reveal key={l.id} delay={i % 3}>
                <button className="atlas-card" onClick={() => setOpen(l.id)}>
                  <Img k={l.img} credit={false} zoom alt={l.name} />
                  <div className="tiny muted mt-2" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l.when}</div>
                  <h3>{l.name}</h3>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-indigo">
        <div className="wrap split">
          <SectionHead eyebrow="Today" title="A city of science, industry and start-ups." lede="IISc, ISRO, HAL, the National Aerospace Laboratories, NIMHANS, IIM Bangalore and the National Centre for Biological Sciences stand alongside software, biotech and aerospace companies. Bengaluru is often called India’s Silicon Valley — a popular nickname, not an official title." />
          <ZoomImg k="iisc" ratio="ratio-4x3" caption="Main Building, Indian Institute of Science (founded 1909)"
            title="Indian Institute of Science" eyebrow="Founded 1909"
            info={<p>A research university that, with aircraft and electronics factories, defence and space laboratories and engineering colleges, helped build Bengaluru’s rise as a technology centre.</p>} />
        </div>
      </section>

      <section className="section theme-night grain center">
        <div className="wrap-narrow">
          <Reveal><p className="quote">Bengaluru’s identity is both deeply local and open — a Kannada city of petes, tanks and temples that welcomes people who come here to study, work, build businesses and make a home.</p></Reveal>
        </div>
      </section>
      <section className="section tight"><div className="wrap">
        <Sources items={[SRC.nair, SRC.bbmp, SRC.horticulture, SRC.gsi, SRC.iisc, SRC.hal, SRC.isro, SRC.W('History of Bangalore'), SRC.W('Begur, Bangalore'), SRC.W('Lal Bagh')]}
          notes={[{ kind: 'fact', text: 'The Lalbagh rock’s age follows the Geological Survey of India’s National Geological Monument listing; we make no claims about the world’s share of ancient rock.' }]} />
      </div></section>
      {lm && (
        <Modal onClose={() => setOpen(null)} label={lm.name}>
          <div className="modal-grid"><Img k={lm.img} ratio="" caption={lm.cap || lm.name} full /><div className="modal-body stack"><div className="eyebrow">{lm.when}</div><h2 className="h2">{lm.name}</h2><p>{lm.d}</p></div></div>
        </Modal>
      )}
      <NextChapter path="/bengaluru" />
    </>
  );
}
