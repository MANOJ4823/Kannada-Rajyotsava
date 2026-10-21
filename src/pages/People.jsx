import { useState } from 'react';
import { Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, Tabs } from '../components/ui.jsx';
import { SRC } from '../data/sources.js';

const NO_PORTRAIT = 'No contemporary portrait survives. We show no invented likeness.';

const GROUPS = {
  rulers: {
    label: 'Historical rulers & leaders',
    intro: 'None of these rulers governed “Karnataka” as a single state — each ruled a different territory in a different century. They are presented in chronological order with their own historical context.',
    people: [
      { name: 'Mayurasharma (Mayuravarma)', when: 'c. 4th century CE', role: 'Founder of the Kadamba dynasty, Banavasi · Title: “Shadanana”', img: 'mayurasharmaPortrait', cap: 'Mayurasharma — artistic depiction (no contemporary portrait survives)',
        body: 'Known chiefly from the Talagunda inscription composed generations later, which describes a scholar who turned to arms and founded a kingdom in the forested west of the Deccan. He stands at the start of Karnataka’s recorded political history.' },
      { name: 'Pulakeshin II (Immadi Pulikeshi)', when: 'r. c. 610–642', role: 'Badami Chalukya emperor · Title: “Dakshinapatheshwara”', img: 'pulakeshin', cap: 'Modern statue of Pulakeshin II, Badami',
        body: 'United much of the Deccan, repulsed the north Indian emperor Harshavardhana and was visited by Xuanzang. His career is known from the Aihole inscription of 634 and other records.' },
      { name: 'Krishna I', when: 'r. c. 756–774', role: 'Rashtrakuta ruler · Title: “Shrivallabha”', img: 'illKrishnaI', cap: 'Illustration of the Kailasa Temple (no portrait of Krishna I survives)',
        body: 'Consolidated the Rashtrakuta kingdom; the Kailasa Temple at Ellora (Maharashtra) is associated with his patronage on the evidence of later Rashtrakuta grants.' },
      { name: 'Sri Krishnadevaraya', when: 'r. 1509–1529', role: 'Karnata (Vijayanagara) emperor · Title: “Kannada Rajya Rama Ramana”', img: 'krishnadevaraya', cap: 'Statues of Sri Krishnadevaraya with queens Chinnadevi and Tirumaladevi, Chandragiri Museum',
        body: 'A period of military success and generous patronage of Kannada, Telugu, Sanskrit and Tamil literature; himself the author of the Telugu poem Amuktamalyada. His rule extended far beyond today’s Karnataka.' },
      { name: 'Kempegowda I', when: 'c. 1510–1569', role: 'Chieftain of Yelahanka; founder of Bengaluru · Title: “Nadaprabhu”', img: 'kempegowda', cap: 'Modern statue of Kempegowda, Kempegowda International Airport',
        body: 'A Nadaprabhu (local chief) under the Karnata (Vijayanagara) empire, he founded the fort-town of Bengaluru in 1537 (the traditional date), laid out its market quarters (petes) and encouraged tanks for water.' },
      { name: 'Madakari Nayaka V', when: 'r. 1758–1779', role: 'Last Nayaka ruler of Chitradurga · Title: “Eppatelu Palegarara Ganda”', img: 'madakari', cap: 'Modern statue of Madakari Nayaka',
        body: 'Held Chitradurga until it fell after a long siege in 1779. The fort was built in several phases; individual walls and structures are attributed variously to him, his predecessors and later rulers, so we avoid crediting him with the whole fort.' },
      { name: 'Nalwadi Krishnaraja Wadiyar (Krishnaraja Wadiyar IV)', when: 'r. 1894–1940', role: 'Maharaja of Mysore · Title: “Rajarshi”', img: 'nalwadi', cap: 'Krishnaraja Wadiyar IV',
        body: 'Under his rule Mysore established the University of Mysore (1916), the Krishna Raja Sagara dam, the Mysore Iron Works at Bhadravati, the Government Soap Factory and the Bank of Mysore, and appointed the Miller Committee (1918) on representation for backward communities. He is popularly remembered by the title “Rajarshi” (saint-king).' },
    ],
  },
  builders: {
    label: 'Engineers, scientists & entrepreneurs',
    intro: 'Builders of institutions and industries — distinguished here by what each personally did.',
    people: [
      { name: 'Sir M. Visvesvaraya', when: '1861–1962', role: 'Engineer and statesman · Bharat Ratna 1955', img: 'visvesvaraya', cap: 'M. Visvesvaraya in his thirties',
        body: 'As chief engineer he led the Krishna Raja Sagara dam project on the Kaveri; he designed automatic sluice gates, advised on flood protection for Hyderabad after the 1908 floods, and as Diwan of Mysore (1912–1918) promoted industries, banking and technical education. India marks Engineers’ Day on his birthday, 15 September. Many public works of his era were the work of large teams; we credit him with the roles he actually held.' },
      { name: 'C. N. R. Rao', when: 'b. 1934', role: 'Chemist · Bharat Ratna 2014', img: 'cnrRao', cap: 'C. N. R. Rao',
        body: 'Bengaluru-born scientist known for solid-state and materials chemistry, long associated with the Indian Institute of Science and the Jawaharlal Nehru Centre for Advanced Scientific Research.' },
      { name: 'N. R. Narayana Murthy', when: 'b. 1946', role: 'Co-founder, Infosys · Padma Vibhushan 2008', img: 'narayanaMurthy', cap: 'N. R. Narayana Murthy',
        body: 'Co-founded Infosys in 1981 with six colleagues and led it as chief executive until 2002, helping define India’s software-services industry from Bengaluru.' },
      { name: 'Sudha Murty', when: 'b. 1950', role: 'Engineer, author, philanthropist · Padma Bhushan 2023', img: 'sudhaMurty', cap: 'Sudha Murty',
        body: 'Became the first woman engineer hired by TELCO; later chaired the Infosys Foundation, supporting education, health and libraries. A prolific author in Kannada and English, she was nominated to the Rajya Sabha in 2024. Her work is distinct from her husband’s role at Infosys.' },
      { name: 'Nithin Kamath & Nikhil Kamath', when: 'Zerodha, founded 2010', role: 'Fintech entrepreneurs, Bengaluru', img: 'nithinKamath', cap: 'Nithin Kamath', img2: 'nikhilKamath', cap2: 'Nikhil Kamath',
        body: 'The brothers co-founded Zerodha, a Bengaluru-based brokerage that brought low-cost online investing to millions, and the Rainmatter initiatives supporting fintech and climate start-ups.' },
      { name: 'Saalumarada Thimmakka', when: 'Hulikal, Ramanagara district', role: 'Environmentalist · Padma Shri 2019', img: 'thimmakka', cap: 'Saalumarada Thimmakka, 2011',
        body: 'With her husband Bikkala Chikkaiah, she planted and nurtured hundreds of banyan saplings along the road between Hulikal and Kudur, carrying water to them over years. “Saalumarada” means “of the row of trees” — a name the public gave her.' },
    ],
  },
  arts: {
    label: 'Arts, music & letters',
    intro: 'A few of the many artists who carried Karnataka’s culture to the world.',
    people: [
      { name: 'Dr. Rajkumar', when: '1929–2006', role: 'Actor and singer · Dadasaheb Phalke Award 1995', img: 'rajkumar', cap: 'Rajkumar on a 2009 Indian postage stamp',
        body: 'The defining star of Kannada cinema, with more than two hundred films. He received the Padma Bhushan (1983), a National Film Award for playback singing, and led the 1982 Gokak agitation for Kannada in education.' },
      { name: 'Arun Yogiraj', when: 'Mysuru', role: 'Sculptor', img: 'arunYogirajPortrait', cap: 'Arun Yogiraj with one of his sculptures',
        body: 'From a family of sculptors in Mysuru, he carved the Ram Lalla idol consecrated at the Ram temple in Ayodhya in January 2024, as well as the statue of Netaji Subhas Chandra Bose at India Gate, New Delhi.' },
      { name: 'Bhimsen Joshi & Gangubai Hangal', when: '20th century', role: 'Hindustani vocalists from North Karnataka', img: 'bhimsenPortrait', cap: 'Bhimsen Joshi', img2: 'gangubaiPortrait', cap2: 'Gangubai Hangal',
        body: 'Dharwad, Hubballi and Gadag gave Hindustani music some of its greatest voices — Bhimsen Joshi (Bharat Ratna 2008), Gangubai Hangal, Mallikarjun Mansur and Basavaraj Rajguru — a reminder that Karnataka lives in both Carnatic and Hindustani traditions.' },
      { name: 'R. K. Laxman', when: '1921–2015', role: 'Cartoonist, born in Mysuru', img: 'rkLaxmanPortrait', cap: 'R. K. Laxman',
        body: 'Creator of “The Common Man”, whose daily cartoon observed Indian public life for more than five decades.' },
    ],
  },
  sport: {
    label: 'Sport',
    intro: 'Champions who learned their game in Karnataka.',
    people: [
      { name: 'Anil Kumble', when: 'b. 1970, Bengaluru', role: 'Cricketer, captain and coach', img: 'kumble', cap: 'Anil Kumble',
        body: 'India’s highest Test wicket-taker with 619 wickets. In 1999 at Delhi he took all ten wickets in a Test innings against Pakistan — only the second bowler ever to do so.' },
      { name: 'Prakash Padukone', when: 'b. 1955', role: 'Badminton player', img: 'padukone', cap: 'Prakash Padukone',
        body: 'Won the All England Championships in 1980, the first Indian to do so, and later co-founded a leading badminton academy in Bengaluru.' },
    ],
  },
  reform: {
    label: 'Reformers & resistance',
    intro: 'People who fought injustice — colonial rule, caste prejudice, exclusion.',
    people: [
      { name: 'Rani Abbakka Chowta', when: '16th century', role: 'Queen of Ullal', img: 'abbakka', cap: 'Rani Abbakka on a 2023 Indian postage stamp',
        body: 'Led resistance against Portuguese attempts to control the coastal trade around Mangaluru.' },
      { name: 'Kittur Rani Chennamma', when: '1778–1829', role: 'Queen of Kittur', img: 'chennamma', cap: 'Kittur Rani Chennamma (statue)',
        body: 'In 1824 she took up arms when the East India Company refused to recognise her adopted son. She died in captivity at Bailhongal; her lieutenant Sangolli Rayanna continued the fight.' },
      { name: 'Kudmul Ranga Rao', when: '1859–1928', role: 'Social reformer, Mangaluru', img: 'kudmulPortrait', cap: 'Kudmul Ranga Rao (portrait painting)',
        body: 'Founded the Depressed Classes Mission in Mangaluru (1897), opening schools and hostels for children of oppressed castes.' },
    ],
  },
};

function Person({ p }) {
  return (
    <Reveal className="person">
      <div className="stack">
        <Img k={p.img} ratio="ratio-1" credit={false} alt={p.cap || p.name} placeholderNote={p.note} />
        {p.img2 && <Img k={p.img2} ratio="ratio-1" credit={false} alt={p.cap2} />}
      </div>
      <div>
        <div className="tiny muted" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.when}</div>
        <h3 className="h4">{p.name}</h3>
        <div className="role">{p.role}</div>
        <p>{p.body}</p>
        {p.cap && <p className="tiny muted mt-1" style={{ margin: '8px 0 0' }}>Image: {p.cap}{p.cap2 ? `; ${p.cap2}` : ''} — credits on the Sources page.</p>}
      </div>
    </Reveal>
  );
}

export default function People() {
  const [g, setG] = useState('rulers');
  const group = GROUPS[g];
  return (
    <>
      <PageHero path="/people" image="krs" alt="Krishna Raja Sagara dam on the Kaveri"
        lede="Rulers, engineers, saints, scientists, artists, athletes and ordinary citizens with extraordinary persistence. Biographies are brief and factual; we do not attach quotations we cannot verify." />
      <section className="section">
        <div className="wrap">
          <Tabs label="People by field" value={g} onChange={setG} tabs={Object.entries(GROUPS).map(([id, x]) => ({ id, label: x.label }))} />
          <div className="split top">
            <div className="stack" style={{ position: 'sticky', top: 110 }}>
              <SectionHead eyebrow={`${group.people.length} people`} title={group.label} lede={group.intro} />
              {g === 'rulers' && <Note kind="interpretation" title="Context">Kingdoms overlapped and borders moved. See the timeline chapter to compare their periods.</Note>}
            </div>
            <div>{group.people.map((p) => <Person key={p.name} p={p} />)}</div>
          </div>
          <div className="mt-5"><Sources items={[SRC.padma, SRC.dff, SRC.pib, SRC.kamath, SRC.W('M. Visvesvaraya'), SRC.W('Saalumarada Thimmakka'), SRC.W('Arun Yogiraj'), SRC.W('Krishna Raja Wadiyar IV'), SRC.W('Anil Kumble')]} /></div>
        </div>
      </section>
      <NextChapter path="/people" />
    </>
  );
}
