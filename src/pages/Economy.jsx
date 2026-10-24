import { Badge, Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, ZoomImg } from '../components/ui.jsx';
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

// Each group below was checked against the sources listed at the foot of the page.
const MODEL = [
  { t: 'Shivanasamudra hydroelectric station', when: '1902 · Mandya district', img: 'shivanasamudra', cap: 'Gagana Chukki, one of the Shivanasamudra falls on the Kaveri',
    d: 'Built at the Shivanasamudra falls on the Kaveri under Diwan K. Seshadri Iyer, after the engineer A. J. de Lotbinière proposed in 1898 to power the Kolar Gold Fields from the river. It opened in 1902 and is often described as one of the earliest hydroelectric stations in Asia.' },
  { t: 'Sandalwood oil and soap factories', when: 'From 1916 · Bengaluru, Mysuru, Shivamogga', img: 'ecoSoapAd', cap: 'Mysore Sandal Soap advertisement, 1937',
    d: 'When the First World War cut off sandalwood exports to Europe, the state began distilling its own sandalwood oil and making soap in Bengaluru. The business became today’s Karnataka Soaps and Detergents Ltd (KSDL), maker of Mysore Sandal Soap — a registered GI.' },
  { t: 'Mysore Iron Works', when: '1923 · Bhadravati', img: 'ecoVisl', cap: 'A steel plant blast furnace at dusk (illustrative photo)',
    d: 'Started on 18 January 1923 under Maharaja Krishna Raja Wadiyar IV and Diwan M. Visvesvaraya to make iron from local ore. It is now the Visvesvaraya Iron and Steel Plant (VISL), a unit of the Steel Authority of India.' },
  { t: 'Mysore Sugar Company', when: '1933 · Mandya', img: 'ecoMysugar', cap: 'The Mysore Sugar factory at Mandya, about 1934',
    d: 'The state’s first sugar factory opened at Mandya on 30 January 1933, after the Krishna Raja Sagara dam brought canal water to the district’s cane fields. Mandya is still called Sakkare Nagara, “sugar city”.' },
  { t: 'Mysore Paper Mills', when: '1936 · Bhadravati', img: 'ecoMpm', cap: 'A paper roll at a paper mill (illustrative photo)',
    d: 'Set up in 1936 under Krishna Raja Wadiyar IV at Bhadravati, the town of the iron works. It became a Karnataka government company in 1977.' },
];


// Reforms and institutions of Krishnaraja Wadiyar IV's reign (1902–1940, full ruling powers from 8 August 1902).
// kind: 'tradition' marks a popular claim that we could not confirm.
const NALVADI = [
  { y: '1902', t: 'Power from the Kaveri', d: 'The Shivanasamudra hydroelectric station opens, the year he takes full ruling powers.' },
  { y: '1903', t: 'A planned city', d: 'Mysuru’s City Improvement Trust Board is set up to lay out new extensions, roads and open spaces — making Mysuru one of the first cities in Asia to plan its growth.' },
  { y: '1905', t: 'Electric street lights in Bengaluru', d: 'Bengaluru’s streets are first lit by electricity on 5 August 1905. It is often called the first city in Asia to have electric street lights — a popular claim that is hard to confirm.', kind: 'tradition' },
  { y: '1907', t: 'A second house of legislature', d: 'The Mysore Legislative Council is created beside the Representative Assembly, so the state now has two houses that help frame its laws. The Vani Vilas Sagara dam at Chitradurga is completed the same year.' },
  { y: '1909', t: 'IISc, and a social reform', d: 'The Indian Institute of Science, J. N. Tata’s plan, is founded in Bengaluru. The Maharaja gave it about 371 acres of land, ₹5 lakh towards buildings and equipment, and ₹50,000 a year for its running costs. Mysore also bans the dedication of devadasis to temple service — one of the earliest such laws in India.' },
  { y: '1913', t: 'A state bank and farm college', d: 'The Bank of Mysore is set up at Diwan M. Visvesvaraya’s initiative, along with an agricultural school in Bengaluru that grew into today’s University of Agricultural Sciences.' },
  { y: '1913', t: 'Minto Eye Hospital', d: 'Bengaluru’s eye hospital, begun in 1896, moves into the building it still uses, built during his reign. Founded as a specialist eye hospital, it is one of the oldest of its kind in the world.' },
  { y: '1915', t: 'Kannada Sahitya Parishat', d: 'The Kannada Sahitya Parishat is founded in Bengaluru to promote the Kannada language and literature.' },
  { y: '1916', t: 'University of Mysore', d: 'The first university in India outside the British-ruled provinces and the sixth in the subcontinent, with the Maharaja as its first chancellor. The Mysore Chamber of Commerce is founded the same year.' },
  { y: '1917', t: 'Engineering and women’s education', d: 'A government engineering school opens in Bengaluru (today’s UVCE), and Maharani’s College in Mysuru begins teaching science to women.' },
  { y: '1918', t: 'Railways and representation', d: 'The state-run Mysore State Railway expands, and the Miller Committee is appointed to study why backward communities had so little share in government service; its report led to reserved posts for them.' },
  { y: '1922', t: 'Votes for women', d: 'In April 1922 Mysore’s Legislative Council approved votes for women who met the property qualification — among the first places in India to do so.' },
  { y: '1924', t: 'Mysore Medical College', d: 'Mysore Medical College is founded in Mysuru.' },
  { y: '1927', t: 'Krishna Rajendra Hospital', d: 'The K. R. Hospital opens in Mysuru; with the Cheluvamba Hospital it is still the teaching hospital of Mysore Medical College.' },
  { y: '1932', t: 'Krishna Raja Sagara dam', d: 'The great dam on the Kaveri, begun in 1911 to Visvesvaraya’s design, is completed. It irrigates the Mandya plains, supplies water to Mysuru and Bengaluru, and has the Brindavan Gardens laid out below it.' },
  { y: '1934', t: 'Land for C. V. Raman', d: 'Land in Bengaluru is gifted to the Nobel laureate C. V. Raman for what became the Raman Research Institute.' },
  { y: '1935', t: 'Vani Vilas Hospital', d: 'A hospital for women and children is built in Bengaluru; it still serves them today, attached to Bangalore Medical College.' },
  { y: '1937', t: 'The ink of Indian democracy', d: 'He founds Mysore Lac and Paints in Mysuru. Now Mysore Paints and Varnish, it has made the indelible ink marked on voters’ fingers in Indian elections since 1962.' },
  { y: '1939', t: 'Glass and porcelain', d: 'A Government Glass and Porcelain Factory is set up in Bengaluru to make insulators for high-voltage power lines; it later became part of BHEL.' },
];

const FARM = [
  { t: 'Coffee', when: 'Kodagu · Chikkamagaluru · Hassan', img: 'giChikmagalurCoffee', cap: 'Shade-grown coffee plantation, Chikkamagaluru',
    d: 'Karnataka grows about 70 per cent of India’s coffee, almost all of it under shade trees on hill estates, most of them small farms. By tradition, the Sufi saint Baba Budan brought seven coffee beans from Yemen in the 17th century and planted them in the hills now called Baba Budangiri. The Coffee Board of India is headquartered in Bengaluru.' },
  { t: 'Silk', when: 'Old Mysore region · Ramanagara', img: 'ecoCocoonMarket', cap: 'Silk cocoon market, Ramanagara',
    d: 'Karnataka is India’s leading producer of mulberry silk. Farmers grow mulberry and rear silkworms; the cocoons are sold at government markets such as Ramanagara’s, then reeled and woven. The silk-weaving factory set up in Mysuru in 1912 is now run by Karnataka Silk Industries Corporation, and the Central Silk Board is headquartered in Bengaluru.' },
];

const COOPS = [
  { t: 'Kanaginahal credit society', when: '1905 · Gadag district', img: 'ecoKanaginahal', cap: 'Farmers ploughing and sowing in Raichur district, north Karnataka (illustrative photo)',
    d: 'In 1905 villagers of Kanaginahal, led by Siddanagouda Patil, started an agricultural credit cooperative under the new Co-operative Credit Societies Act of 1904. It is widely described as India’s first cooperative society.' },
  { t: 'Nandini (KMF)', when: 'Since 1974 · across Karnataka', img: 'ecoNandini', cap: 'Nandini milk booth, Mysuru',
    d: 'The Karnataka Co-operative Milk Producers’ Federation collects milk from member farmers through village cooperatives in almost every district and sells it as Nandini. It is India’s second-largest dairy cooperative, after Amul.' },
];

const KITCHENS = [
  { t: 'Udupi hotels', when: 'From the coast to all of India', img: 'ecoUdupiHotel', cap: 'Set dose at an Udupi hotel, Bengaluru',
    d: 'Cooks and hoteliers from Udupi and the coast opened vegetarian “Udupi hotels” in cities across India, helping make idli, dosa and filter coffee everyday food far from Karnataka.' },
  { t: 'MTR (Mavalli Tiffin Rooms)', when: '1924 · Lalbagh Road, Bengaluru', img: 'ecoMTR', cap: 'Mavalli Tiffin Room, Lalbagh Road, Bengaluru',
    d: 'Founded in 1924 by Parampalli Yagnanarayana Maiya and his brothers. MTR is credited with popularising rava idli, and its packaged-food business — breakfast mixes and ready-to-eat meals — is now part of Norway’s Orkla.' },
  { t: 'The darshini', when: '1983 · Jayanagar, Bengaluru', img: 'ecoDarshini', cap: 'Upahara Darshini — order at the counter, eat at standing tables',
    d: 'Bengaluru’s own fast-food format: pay first, then eat standing at steel counters. Cafe Darshini in Jayanagar, opened in 1983 by R. Prabhakar, is generally credited as the first; “darshini” became the name for the whole format.' },
];

const POWER = [
  { t: 'Raichur Thermal Power Station', when: 'From 1985 · Raichur district', img: 'ecoRaichur', cap: 'Raichur Thermal Power Station',
    d: 'Karnataka’s first thermal power station, run by the state-owned Karnataka Power Corporation at Shaktinagar; its units were commissioned in stages from 1985.' },
  { t: 'Kaiga Generating Station', when: 'Since 2000 · Uttara Kannada', img: 'ecoKaiga', cap: 'Kaiga Atomic Power Station',
    d: 'A nuclear power station near the Kali river, operated by the Nuclear Power Corporation of India since 2000. Four 220 MW units are running and two 700 MW units are being built.' },
  { t: 'Pavagada Solar Park (Shakti Sthala)', when: '2019 · Tumakuru district', img: 'ecoPavagada', cap: 'Pavagada Solar Park seen from the Sentinel-2 satellite, 2020',
    d: 'About 2,050 MW of solar panels across some 53 sq km of dry land in Pavagada taluk, completed in 2019 — one of the largest solar parks in the world.' },
  { t: 'Iron ore and steel', when: 'Ballari · Hosapete · Sandur', img: 'ecoJsw', cap: 'Steel coils in a steel plant (illustrative photo)',
    d: 'The Ballari–Hosapete–Sandur belt holds some of India’s richest iron ore. Jindal Vijayanagar Steel, set up in 1994 at Toranagallu, grew into JSW Steel’s Vijayanagar Works, one of India’s largest steel plants. After findings of illegal mining, the Supreme Court halted mining in the belt in 2011 and let some mines reopen from 2013 under limits.' },
];

function CardGroup({ items, cols = 'g3' }) {
  return (
    <div className={`grid ${cols} mt-4`}>
      {items.map((s, i) => (
        <Reveal key={s.t} delay={i % 3} className="card">
          <ZoomImg k={s.img} ratio="ratio-16x9" credit={false} alt={s.cap || s.t} placeholderNote="Openly licensed photograph not available."
            title={s.t} eyebrow={s.when} info={<p>{s.d}</p>} />
          <div className="card-body">
            <div className="tiny muted" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.when}</div>
            <h3 className="h4 mt-1">{s.t}</h3><p className="mt-1">{s.d}</p>
            {s.cap && <p className="tiny muted" style={{ margin: '10px 0 0' }}>Photo: {s.cap}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

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

      <section className="section">
        <div className="wrap split top">
          <div className="stack">
            <SectionHead eyebrow="Nalvadi Krishnaraja Wadiyar · r. 1902–1940" title="Mysore, the “model state”." kn="ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್"
              lede="Under Maharaja Krishnaraja Wadiyar IV — remembered as Nalvadi, “the fourth” — and Diwans such as M. Visvesvaraya, the princely state of Mysore built dams, power stations, universities and factories, and passed social reforms that were rare in India at the time." />
            <ZoomImg k="nalwadi" ratio="ratio-3x4" className="img-top" portrait caption="Krishnaraja Wadiyar IV" title="Nalvadi Krishnaraja Wadiyar" eyebrow="Maharaja of Mysore, 1902–1940"
              info={<p>He became Maharaja as a boy in 1895; his mother, Kempananjammanni Devi, ruled as regent until he received full ruling powers on 8 August 1902. He died in 1940.</p>} />
            <blockquote className="panel white" style={{ margin: 0 }}>
              <p className="h4" style={{ margin: 0, fontFamily: 'var(--serif)' }}>“Mysore is the best administered state in the world.”</p>
              <p className="small muted" style={{ margin: '8px 0 0' }}>— Lord Sankey, Britain’s Lord Chancellor, at the first Round Table Conference in London, 1930 (as widely quoted)</p>
            </blockquote>
            <Note kind="fact" title="“Rajarshi”">In 1925 Mahatma Gandhi praised the Maharaja for taking up hand-spinning; he is remembered by the title Rajarshi, “saint-king”.</Note>
          </div>
          <div>
            <ol className="vtl">
              {NALVADI.map((n) => (
                <Reveal as="li" key={n.y + n.t}>
                  <div className="when">{n.y}</div>
                  <div><h4>{n.t}</h4><p>{n.d}</p>{n.kind && <div className="mt-1"><Badge kind={n.kind} /></div>}</div>
                </Reveal>
              ))}
            </ol>
            <Note kind="fact" title="Before his reign">Mysore’s Representative Assembly — the first of its kind in an Indian princely state — was created in 1881 under his father, Chamarajendra Wadiyar X, and Diwan C. V. Rangacharlu. Chamarajendra Wadiyar X also helped pay for Swami Vivekananda’s journey to the 1893 Parliament of the World’s Religions in Chicago, together with the rulers of Ramnad and Khetri and Vivekananda’s disciples in Madras. And in 1805, under Krishnaraja Wadiyar III, queens of the Mysore royal family were vaccinated against smallpox; a painting by Thomas Hickey records this early campaign to win trust in the new vaccine.</Note>
            <Note kind="interpretation" title="Not from his reign">Some Bengaluru landmarks often credited to him are older or newer. Bowring Hospital opened in 1868 under the British Commissioner Lewin Bentham Bowring, before his birth. HMT (1953), BEML (1964) and BHEL are public-sector companies set up by the Government of India after Independence — see “Industries” below.</Note>
            <Note kind="fact" title="Just after his reign">Hindustan Aircraft — today’s HAL — was founded in Bengaluru on 23 December 1940, four months after his death, by Walchand Hirachand and the Mysore government under his successor, Jayachamarajendra Wadiyar. Mysore offered 700 of the factory’s 2,100 acres.</Note>
          </div>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap">
          <SectionHead eyebrow="Industries of the model state" title="Planned industries, decades before Independence." lede="In the early 1900s the princely state of Mysore — under Maharaja Krishna Raja Wadiyar IV and Diwans such as K. Seshadri Iyer and M. Visvesvaraya — built power stations and state-run factories to use its own water, forests and ore." />
          <CardGroup items={MODEL} />
          <Note kind="interpretation" title="“Model state”">Mysore was often praised as a “model state” in its time for this planned development. Each of these units was founded by the state government, and several still run today under new names.</Note>
        </div>
      </section>
      <section className="section">
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

      <section className="section theme-sand">
        <div className="wrap">
          <SectionHead eyebrow="Power & steel" title="Energy and metal for a growing state." />
          <CardGroup items={POWER} cols="g2" />
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

      <section className="section theme-sand">
        <div className="wrap">
          <SectionHead eyebrow="Coffee & silk" title="From hill estates and mulberry fields." />
          <CardGroup items={FARM} cols="g2" />
          <Note kind="tradition" title="Baba Budan’s seven beans">The story of Baba Budan bringing seven beans out of Yemen is a long-held tradition rather than a documented event; it is widely told as the beginning of coffee in India.</Note>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Cooperatives" title="Farmers who pooled together." />
          <CardGroup items={COOPS} cols="g2" />
          <Note kind="interpretation" title="“India’s first”">Kanaginahal’s society is commonly called the country’s first; other credit societies were registered under the 1904 Act around the same time, so we present it as a widely held claim.</Note>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap">
          <SectionHead eyebrow="Kitchens" title="Breakfast, Karnataka style, for all of India." />
          <CardGroup items={KITCHENS} />
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
          { label: 'Hutti Gold Mines Company — history of the mine', url: 'https://huttigold.karnataka.gov.in/58/history-of-mine/en', kind: 'Official' },
          SRC.W('Shivanasamudra Falls'), SRC.W('Karnataka Soaps and Detergents Limited'), SRC.W('Mysore Sandal Soap'), SRC.W('Visvesvaraya Iron and Steel Plant'), SRC.W('Mysore Paper Mills'), SRC.W('Krishna Raja Sagara'),
          SRC.W('Coffee production in India'), SRC.W('Baba Budan'), SRC.W('Coffee Board of India'), SRC.W('Silk industry in the Indian subcontinent'), SRC.W('Mysore silk'),
          SRC.W('Kanaginahal'), SRC.W('Karnataka Milk Federation'), SRC.W('Udupi cuisine'), SRC.W('Mavalli Tiffin Rooms'), SRC.W('MTR Foods'), SRC.W('Darshini (restaurant)'),
          SRC.W('Raichur Thermal Power Station'), SRC.W('Kaiga Atomic Power Station'), SRC.W('Pavagada Solar Park'), SRC.W('JSW Steel'), SRC.W('Mining scams in India'), SRC.W('Krishna Raja Wadiyar IV'), SRC.W('Mysore Representative Assembly'), SRC.W('University of Mysore'), SRC.W('Women\'s suffrage in India'), SRC.W('Variolation'), SRC.W('Kannada Sahitya Parishat'), SRC.W('Indian Institute of Science'), SRC.W('Chamarajendra Wadiyar X'), SRC.W('Swami Vivekananda'), SRC.W('Hindustan Aeronautics Limited'), SRC.W('Mysore'),
          SRC.W('Minto Eye Hospital'), SRC.W('Vanivilas Women and Children Hospital'), SRC.W('Krishna Rajendra Hospital'), SRC.W('Mysore Paints and Varnish'), SRC.W('Bowring and Lady Curzon Hospitals'), SRC.W('HMT Limited'), SRC.W('BEML'),
          { label: 'Indian Institute of Science — Origin of the Institute', url: 'https://www.iisc.ac.in/wp-content/uploads/2018/03/ORIGIN.pdf', kind: 'Official' }]} />
      </div></section>
      <NextChapter path="/economy" />
    </>
  );
}
