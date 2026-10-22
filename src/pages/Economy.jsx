import { Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, ZoomImg } from '../components/ui.jsx';
import { SRC } from '../data/sources.js';

const BANKS = [
  { name: 'Canara Bank', year: '1906', place: 'Mangaluru', fate: 'Nationalised 1969; headquartered in Bengaluru. Syndicate Bank merged into it on 1 April 2020.',
    d: 'Founded by Ammembal Subba Rao Pai as the Canara Hindu Permanent Fund, to encourage thrift and lend to ordinary people; renamed Canara Bank in 1910.' },
  { name: 'Corporation Bank', year: '1906', place: 'Udupi', fate: 'Merged into Union Bank of India, 2020.', d: 'Founded as the Canara Banking Corporation by Khan Bahadur Haji Abdullah Haji Kasim Saheb Bahadur.' },
  { name: 'State Bank of Mysore', year: '1913', place: 'Bengaluru', fate: 'Merged into the State Bank of India, 2017.', d: 'Began as the Bank of Mysore, set up at the initiative of Diwan M. Visvesvaraya with the Mysore government’s support.' },
  { name: 'Karnataka Bank', year: '1924', place: 'Mangaluru', fate: 'Still an independent private-sector bank, headquartered in Mangaluru.', d: 'Founded by a group of Mangaluru citizens in 1924.' },
  { name: 'Syndicate Bank', year: '1925', place: 'Udupi', fate: 'Merged into Canara Bank, 2020.', d: 'Founded as the Canara Industrial and Banking Syndicate by Upendra Ananth Pai, Vaman Srinivas Kudva and T. M. A. Pai; later headquartered in Manipal. Its Pigmy Deposit scheme collected tiny daily savings at people’s doorsteps.' },
  { name: 'Vijaya Bank', year: '1931', place: 'Mangaluru', fate: 'Merged into Bank of Baroda, 2019.', d: 'Founded by A. B. Shetty and a group of farmers to support agricultural communities.' },
];

const SECTORS = [
  { t: 'Information technology & software services', img: 'electronicCity', cap: 'Infosys campus, Electronic City', d: 'Infosys and Wipro are headquartered in Bengaluru, which also hosts development centres of hundreds of global companies. Karnataka is among India’s leading software exporters.' },
  { t: 'Aerospace & defence research', img: 'iisc', cap: 'Indian Institute of Science, Bengaluru', d: 'Hindustan Aircraft (now HAL) was founded in Bangalore in 1940; the National Aerospace Laboratories, DRDO laboratories and ISRO’s headquarters and satellite centre are here. Aero India is held at Yelahanka air base.' },
  { t: 'Public-sector manufacturing', img: 'halTejas', cap: 'HAL Tejas Mk1A at Aero India 2025, Bengaluru', d: 'Hindustan Aeronautics (HAL, founded 1940 as Hindustan Aircraft), Indian Telephone Industries (1948), HMT (1953), Bharat Electronics (1954) and BEML (1964) made Bengaluru an engineering city long before software.' },
  { t: 'Biotechnology', img: 'bioconPark', cap: 'Biocon Park, Bengaluru', d: 'Biocon, founded in Bengaluru in 1978 by Kiran Mazumdar-Shaw, grew into a major biopharmaceutical company; Bengaluru hosts a large biotechnology cluster and research centres such as NCBS.' },
  { t: 'Start-ups & fintech', img: 'nithinKamath', cap: 'Nithin Kamath, co-founder of Zerodha', d: 'Flipkart (2007), Zerodha (2010), Razorpay and thousands of others started in Bengaluru, often by people who moved here from elsewhere in India.' },
  { t: 'Cinema, music & contemporary arts', img: 'rajkumar', cap: 'Dr. Rajkumar on a 2009 postage stamp', d: 'Kannada cinema, independent music, theatre, literature festivals and design studios — a creative economy as well as a cultural one.' },
];

const GOLD = [
  { name: 'Kolar Gold Fields (KGF)', place: 'Kolar district · Kolar Schist Belt', status: 'Mining ended in 2001', img: 'kgfShaft', cap: 'Shaft head at Champion Reef mine, Kolar Gold Fields',
    d: 'Gold-bearing quartz veins run through the ancient Kolar Schist Belt. Long before modern times, local miners had dug workings close to 300 feet deep. Modern mining began in 1881 and grew under the London firm of John Taylor & Sons; from 1902 the mines ran on electricity from the Shivanasamudra hydroelectric station on the Kaveri. The Mysore government took the mines over in 1956, later passing them to Bharat Gold Mines Limited, and mining stopped in 2001.',
    facts: [
      'The workings eventually reached about 3 km below the surface, among the deepest mines in the world.',
      'In 1965 physicists from India, Britain and Japan, working 2.3 km underground at KGF, recorded some of the first neutrinos produced by cosmic rays in the atmosphere.',
      'The township grew with families from many regions, especially Tamil-speaking workers from Madras Presidency.',
    ] },
  { name: 'Hutti Gold Mines', place: 'Lingsugur taluk, Raichur district · Hutti–Maski greenstone belt', status: 'Still producing gold', img: 'huttiMap', cap: 'Raichur district, home of the Hutti Gold Mines (no openly licensed photograph of the mine is available)',
    d: 'Miners worked Hutti in antiquity, breaking the rock by heating it with fire. Modern mining in what was then Hyderabad State stopped around 1920. The Hyderabad Gold Mines Company, formed in 1947, was renamed The Hutti Gold Mines Company Limited in 1956, after the reorganisation of states. Owned by the Government of Karnataka, it is India’s longest-running working gold mine and for decades has been the country’s main source of mined gold.',
    facts: [
      'The company reports that timber from the old workings has been radiocarbon-dated to about 1,900 years ago.',
      'It produced about 1.69 tonnes of gold in 2025–26, according to the company.',
      'Its deepest shaft goes down more than 900 m.',
    ] },
];

export default function Economy() {
  return (
    <>
      <PageHero path="/economy" image="canara" alt="Canara Bank head office, Bengaluru"
        lede="Six major Indian banks were born in Karnataka — five of them on the coast. Later came aircraft, telephones, satellites, software and start-ups." />

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Banking" title="A coast that taught India to save." lede="Undivided Dakshina Kannada is often called the “cradle of Indian banking” — a popular description reflecting how many major banks began there." />
          <ol className="vtl mt-4">
            {BANKS.map((b) => (
              <Reveal as="li" key={b.name}>
                <div className="when">{b.year}<br /><span className="small muted">{b.place}</span></div>
                <div><h4>{b.name}</h4><p>{b.d}</p><p className="small" style={{ color: 'var(--copper)', marginTop: 6 }}>{b.fate}</p></div>
              </Reveal>
            ))}
          </ol>
          <Note kind="fact" title="Nationalisation">Canara, Syndicate, Corporation and Vijaya banks became public-sector banks through the nationalisations of 1969 and 1980; mergers between 2017 and 2020 consolidated several of them into larger national banks.</Note>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap">
          <SectionHead eyebrow="Industries" title="From telephones to satellites to software." />
          <div className="grid g3 mt-4">
            {SECTORS.map((s, i) => (
              <Reveal key={s.t} delay={i % 3} className="card">
                <ZoomImg k={s.img} ratio="ratio-16x9" credit={false} alt={s.cap || s.t} placeholderNote="Openly licensed photograph not available."
                  title={s.t} eyebrow="Industries" info={<p>{s.d}</p>} />
                <div className="card-body"><h3 className="h4">{s.t}</h3><p className="mt-1">{s.d}</p>{s.cap && <p className="tiny muted" style={{ margin: '10px 0 0' }}>Photo: {s.cap}</p>}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Gold" title="Two historic goldfields." lede="Some of Karnataka’s oldest rocks hold gold. Kolar and Hutti were mined long before modern times, then became industrial mines; one is closed, the other still produces." />
          <div className="grid g2 mt-4">
            {GOLD.map((g, i) => (
              <Reveal key={g.name} delay={i} className="card">
                <ZoomImg k={g.img} ratio="ratio-16x9" credit={false} alt={g.cap} placeholderNote="Openly licensed photograph not available."
                  title={g.name} eyebrow={g.place}
                  info={<><p>{g.d}</p><ul>{g.facts.map((f) => <li key={f} className="small">{f}</li>)}</ul><p className="small" style={{ color: 'var(--copper)', margin: 0 }}>{g.status}</p></>} />
                <div className="card-body">
                  <div className="tiny muted" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>{g.place}</div>
                  <h3 className="h4 mt-1">{g.name}</h3>
                  <p className="mt-1">{g.d}</p>
                  <ul className="mt-1">{g.facts.map((f) => <li key={f} className="small">{f}</li>)}</ul>
                  <p className="small" style={{ color: 'var(--copper)', marginTop: 6 }}>{g.status}</p>
                  <p className="tiny muted" style={{ margin: '10px 0 0' }}>Image: {g.cap}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Note kind="interpretation" title="Dates and depths">The age of the earliest workings is hard to pin down: Kolar’s old workings are undated, and Hutti’s date of about 1,900 years comes from the company’s own report. Figures for KGF’s total gold output differ between sources, so we leave them out.</Note>
        </div>
      </section>

      <section className="section theme-night grain">
        <div className="wrap split">
          <Reveal className="stack">
            <div className="eyebrow">A sweet story</div>
            <h2 className="h2">Mangaluru’s ice cream</h2>
            <p className="lede">In 1975 S. Prabhakar Kamath started Ideal Ice Cream in Mangaluru. Its parlours — including the famous Pabba’s — made the <i>gadbad</i>, a tall glass layered with ice creams, fruit, jelly and nuts, a coastal institution.</p>
            <p className="muted">Mangaluru has nurtured several ice-cream businesses, and the coast’s entrepreneurs travelled too: Raghunandan Kamath, who grew up in coastal Karnataka, founded Naturals Ice Cream in Mumbai in 1984, known for fresh-fruit flavours like tender coconut and sitaphal.</p>
            <Note kind="tradition" title="“Ice-cream capital”?">You may hear Mangaluru called India’s ice-cream capital. It is an affectionate local nickname, not an official title.</Note>
          </Reveal>
          <Reveal className="grid g2">
            <ZoomImg k="gadbad" ratio="ratio-3x4" caption="Gadbad ice cream at Pabba’s, Mangaluru" portrait
              title="Gadbad" eyebrow="Mangaluru’s ice cream"
              info={<p>A tall glass layered with ice creams, fruit, jelly and nuts, made famous by Ideal Ice Cream’s parlours, including Pabba’s, in Mangaluru.</p>} />
            <ZoomImg k="idealIcecream" ratio="ratio-3x4" caption="Ideal Ice Cream, Mangaluru" portrait
              title="Ideal Ice Cream" eyebrow="Mangaluru · 1975"
              info={<p>Started in Mangaluru in 1975 by S. Prabhakar Kamath. Its parlours made the gadbad a coastal institution.</p>} />
          </Reveal>
        </div>
      </section>
      <section className="section tight"><div className="wrap">
        <Sources items={[SRC.canara, SRC.karnatakaBank, SRC.rbi, SRC.hal, SRC.isro, SRC.W('Syndicate Bank'), SRC.W('Corporation Bank'), SRC.W('Vijaya Bank'), SRC.W('State Bank of Mysore'), SRC.W('Ideal Ice Cream'), SRC.W('Naturals (ice cream)'),
          SRC.W('Kolar Gold Fields'), SRC.W('Bharat Gold Mines Limited'), SRC.W('Particle experiments at Kolar Gold Fields'), SRC.W('Hutti Gold Mines Limited'),
          { label: 'Hutti Gold Mines Company — history of the mine', url: 'https://huttigold.karnataka.gov.in/58/history-of-mine/en', kind: 'Official' }]} />
      </div></section>
      <NextChapter path="/economy" />
    </>
  );
}
