import { Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, Badge, RankBars, ZoomImg } from '../components/ui.jsx';
import { SRC } from '../data/sources.js';

// Award years are the official award years of the Jnanpith (not publication years of the works).
const JNANPITH_TOP_LANGS = [
  { n: 'Hindi', v: 12, detail: 'By state of birth: Uttar Pradesh 6 · Uttarakhand 1 · Bihar 1 · Madhya Pradesh 1 · Himachal Pradesh 1 · Chhattisgarh 1 · present-day Pakistan 1' }, { n: 'Kannada', v: 8, hi: true }, { n: 'Bengali', v: 6 }, { n: 'Malayalam', v: 6 }, { n: 'Urdu', v: 5 },
];

const JNANPITH = [
  { yr: 1967, name: 'Kuvempu', full: 'Kuppali Venkatappa Puttappa', kn: 'ಕುವೆಂಪು', img: 'kuvempu', cited: 'Sri Ramayana Darshanam (ಶ್ರೀ ರಾಮಾಯಣ ದರ್ಶನಂ)', note: 'Shared with Umashankar Joshi (Gujarati).',
    body: 'Poet, novelist and thinker of the “universal human” (Vishwa Manava). His novels Kanuru Heggadithi and Malegalalli Madumagalu portray Malnad life; he wrote Jaya Bharata Jananiya Tanujate, now the state anthem. He was named Rashtrakavi and was the first recipient of the Karnataka Ratna.' },
  { yr: 1973, name: 'D. R. Bendre', full: 'Dattatreya Ramachandra Bendre', kn: 'ದ. ರಾ. ಬೇಂದ್ರೆ', img: 'bendre', imgCap: 'D. R. Bendre (right) with H. S. Krishnaswamy Iyengar', cited: 'Naku Tanti (ನಾಕು ತಂತಿ)', note: 'Shared with Gopinath Mohanty (Odia).',
    body: 'The great lyric poet of Dharwad, writing as “Ambikatanayadatta”. His poems carry the music and idiom of North Karnataka’s spoken Kannada and are widely sung.' },
  { yr: 1977, name: 'K. Shivaram Karanth', full: 'Kota Shivaram Karanth', kn: 'ಕೆ. ಶಿವರಾಮ ಕಾರಂತ', img: 'karanth', cited: 'Mookajjiya Kanasugalu (ಮೂಕಜ್ಜಿಯ ಕನಸುಗಳು)',
    body: 'Novelist, encyclopaedist, Yakshagana reformer and environmental campaigner from coastal Karnataka. Chomana Dudi and Marali Mannige are among his best-known novels.' },
  { yr: 1983, name: 'Masti Venkatesha Iyengar', full: 'Masti Venkatesha Iyengar', kn: 'ಮಾಸ್ತಿ ವೆಂಕಟೇಶ ಅಯ್ಯಂಗಾರ್', img: 'masti', cited: 'Chikkaveera Rajendra (ಚಿಕ್ಕವೀರ ರಾಜೇಂದ್ರ)',
    body: 'Popularly called the father of the modern Kannada short story; he wrote as “Srinivasa”. Chikkaveera Rajendra is a historical novel about the last ruler of Kodagu.' },
  { yr: 1990, name: 'V. K. Gokak', full: 'Vinayaka Krishna Gokak', kn: 'ವಿ. ಕೃ. ಗೋಕಾಕ', img: 'gokak', cited: 'Bharatha Sindhu Rashmi (ಭಾರತ ಸಿಂಧು ರಶ್ಮಿ)',
    body: 'Poet, critic and educationist. The Gokak Committee he chaired (1980–81) recommended primacy for Kannada in schools, sparking the Gokak agitation in which Dr. Rajkumar took part.' },
  { yr: 1994, name: 'U. R. Ananthamurthy', full: 'Udupi Rajagopalacharya Ananthamurthy', kn: 'ಯು. ಆರ್. ಅನಂತಮೂರ್ತಿ', img: 'urAnanthamurthy', cited: 'Overall contribution to literature',
    body: 'A leading voice of the Navya (modernist) movement. His novel Samskara (1965) became a landmark of Indian literature and was adapted into an award-winning film.' },
  { yr: 1998, name: 'Girish Karnad', full: 'Girish Raghunath Karnad', kn: 'ಗಿರೀಶ ಕಾರ್ನಾಡ', img: 'karnad', cited: 'Overall contribution to literature',
    body: 'Playwright, actor and director. Yayati, Tughlaq, Hayavadana, Nagamandala and Taledanda — written in Kannada and widely staged in translation — reshaped modern Indian theatre.' },
  { yr: 2010, name: 'Chandrashekhara Kambara', full: 'Chandrashekhara Basavanneppa Kambara', kn: 'ಚಂದ್ರಶೇಖರ ಕಂಬಾರ', img: 'kambar', cited: 'Overall contribution to literature', note: 'The 2010 award was announced in 2011.',
    body: 'Poet, playwright and folklorist who draws on North Karnataka’s folk theatre. Founding Vice-Chancellor of Kannada University, Hampi, and later President of the Sahitya Akademi.' },
];

const MILESTONES = [
  { when: '5th–8th c.', t: 'Early inscriptions', d: 'Halmidi (5th c.), the Badami Kappe Arabhatta verse (c. 700) and the inscriptions of Shravanabelagola.' },
  { when: 'c. 850', t: 'Kavirajamarga', d: 'The earliest available work on Kannada poetics, at the Rashtrakuta court of Amoghavarsha I. Its authorship — the king or the poet Srivijaya — is debated.', kind: 'disputed' },
  { when: 'c. 900', t: 'Vaddaradhane', d: 'Jain stories attributed to Shivakotiacharya; often regarded as the earliest surviving Kannada prose work.' },
  { when: '10th c.', t: 'The “three gems”', d: 'Pampa (Adipurana, Vikramarjuna Vijaya, 941), Ponna (Shantipurana) and Ranna (Ajitapurana, Gadayuddha) shape classical Kannada (Halegannada).' },
  { when: '12th c.', t: 'Vachana literature', d: 'Basavanna, Akka Mahadevi, Allama Prabhu and hundreds of others compose in direct spoken Kannada.' },
  { when: '12th–13th c.', t: 'New metres', d: 'Harihara’s ragales and Raghavanka’s shatpadis; Janna’s Yashodhara Charite (1209); Kesiraja’s grammar Shabdamanidarpana (1260).' },
  { when: '15th c.', t: 'Kumaravyasa', d: 'Karnata Bharata Kathamanjari (Gadugina Bharata), a retelling of the Mahabharata still recited today.' },
  { when: '15th–17th c.', t: 'Haridasa literature', d: 'Purandara Dasa and Kanaka Dasa; devotional song meets the foundations of Carnatic music teaching.' },
  { when: 'c. 1680', t: 'Early Kannada drama', d: 'Singararya’s Mitravinda Govinda, adapted from Sanskrit, is often cited as the earliest known Kannada play. Yakshagana, a separate performance tradition, has texts going back further.', kind: 'interpretation' },
  { when: '1823', t: 'Mudramanjusha', d: 'Kempu Narayana’s prose narrative — an early modern Kannada prose work.' },
  { when: '1899', t: 'Indira Bai', d: 'Gulvadi Venkata Rao’s Indira Bai is widely regarded as the first original social novel in Kannada; earlier translated and adapted novels mean scholars define “first” differently.', kind: 'disputed' },
  { when: 'Late 19th–20th c.', t: 'Company theatre', d: 'Professional touring companies, among them Gubbi Veeranna’s, carry Kannada drama across the state. T. P. Kailasam is popularly called the father of modern Kannada theatre.' },
  { when: '1921', t: 'Navodaya', d: 'B. M. Srikantaiah’s English Geethegalu (translations of English poems) is often taken as the start of modern Kannada poetry; Kuvempu, Bendre and Masti follow.' },
  { when: '1950s–70s', t: 'Navya and after', d: 'Gopalakrishna Adiga, U. R. Ananthamurthy, P. Lankesh, Yashwant Chittal; then the Dalit–Bandaya movement of Siddalingaiah and Devanur Mahadeva.' },
  { when: '1934 →', t: 'Cinema', d: 'Sati Sulochana (1934) is the first Kannada sound film. Samskara (1970) and Ghatashraddha (1977) opened a celebrated new-wave cinema.' },
  { when: '2025', t: 'A global prize', d: 'Banu Mushtaq’s story collection Heart Lamp, translated by Deepa Bhasthi, wins the International Booker Prize — the first book translated from Kannada to do so.' },
];

const POETS = [
  { name: 'Adikavi Pampa', img: 'illPampa', imgCap: 'Illustration — palm-leaf manuscript (no portrait survives)', when: '10th c.', d: '“The first poet” of classical Kannada; his Vikramarjuna Vijaya retells the Mahabharata with Arjuna as hero.' },
  { name: 'Ranna', img: 'illRanna', imgCap: 'Illustration — palm-leaf manuscript (no portrait survives)', when: '10th c.', d: 'Court poet of the Kalyana Chalukyas; Gadayuddha dramatises the final duel of the Mahabharata.' },
  { name: 'Ponna', img: 'illPonna', imgCap: 'Illustration — palm-leaf manuscript (no portrait survives)', when: '10th c.', d: 'Honoured by Rashtrakuta Krishna III; author of Shantipurana.' },
  { name: 'Basavanna', img: 'basava', imgCap: 'Statue of Basavanna, Basavakalyan', when: '12th c.', d: 'Statesman and saint whose vachanas called for equality and honest work.' },
  { name: 'Akka Mahadevi', img: 'akkaPortrait', imgCap: 'Akka Mahadevi (artistic depiction)', when: '12th c.', d: 'Poet-mystic whose fearless vachanas are addressed to Chennamallikarjuna.' },
  { name: 'Allama Prabhu', img: 'allamaPortrait', imgCap: 'Allama Prabhu (artistic depiction)', when: '12th c.', d: 'Mystic and teacher whose riddling vachanas are among the most philosophical in Kannada.' },
  { name: 'Raghavanka', img: 'raghavankaPortrait', imgCap: 'Raghavanka (artistic depiction)', when: 'c. 1200', d: 'Poet of the Harishchandra Kavya; nephew and pupil of Harihara, credited with popularising the six-line shatpadi metre in Kannada narrative poetry.' },
  { name: 'Kumaravyasa', img: 'kumaravyasaPortrait', imgCap: 'Kumaravyasa (artistic depiction)', when: '15th c.', d: 'Poet of the Karnata Bharata Kathamanjari (Gadugina Bharata), a Kannada retelling of the first ten books of the Mahabharata in bhamini shatpadi.' },
  { name: 'Purandara Dasa', img: 'purandara', when: 'c. 1484–1564', d: 'Haridasa composer; traditionally honoured as the grandfather of Carnatic music.' },
  { name: 'Kanaka Dasa', img: 'kanaka', when: 'c. 1509–1609', d: 'Poet-saint from the Kuruba community; Mohanatarangini and Ramadhanya Charite.' },
  { name: 'Sarvagna (Sarvajna)', img: 'sarvajnaStatue', imgCap: 'Statue of Sarvagna, Abalur (modern statue)', when: '16th–17th c.', d: 'Poet of tripadis, pithy three-line verses; tradition links him with Abalur and Masur in today’s Haveri district.' },
];

export default function Literature() {
  return (
    <>
      <PageHero path="/literature" image="kuvempu" alt="Kuvempu"
        lede="Eight Jnanpith Awards — India’s highest literary honour — have gone to writers in Kannada, among the most for any Indian language. Behind them stand fifteen centuries of poets, saints, dramatists and storytellers." />

      <section className="section theme-night">
        <div className="wrap">
          <SectionHead eyebrow="Jnanpith Award · Kannada laureates · in award-year order" title="The eight" kn="ಜ್ಞಾನಪೀಠ ಪುರಸ್ಕೃತರು"
            lede="Where the award honoured a specific work, it is named. In later decades the award has often recognised an author’s overall contribution; for those years we do not invent an “award-winning book”." />
          <div className="jnanpith mt-4">
            {JNANPITH.map((j, i) => (
              <Reveal key={j.name} className="jp" delay={i % 3}>
                <div className="yr">{j.yr}</div>
                <ZoomImg k={j.img} ratio="" caption={j.imgCap} credit portrait
                  title={j.name} eyebrow={`Jnanpith Award · ${j.yr}`}
                  info={<>
                    <div className="kn-serif" style={{ color: 'var(--copper)', fontSize: '1.3rem' }} lang="kn">{j.kn}</div>
                    <div className="small muted">{j.full}</div>
                    <dl className="facts"><div><dt>Cited by the award</dt><dd>{j.cited}{j.note && <div className="small muted" style={{ marginTop: 4 }}>{j.note}</div>}</dd></div></dl>
                    <p>{j.body}</p>
                  </>} />
                <div>
                  <h3>{j.name}</h3>
                  <div className="kn" lang="kn">{j.kn}</div>
                  <div className="tiny" style={{ opacity: 0.6 }}>{j.full}</div>
                </div>
                <div className="cited"><b>Cited by the award</b>{j.cited}{j.note && <div className="tiny" style={{ opacity: 0.65, marginTop: 4 }}>{j.note}</div>}</div>
                <p>{j.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-5" style={{ maxWidth: 620 }}>
            <RankBars title="Jnanpith Awards by language — top 5 in India" rows={JNANPITH_TOP_LANGS}
              note="66 laureates from the 1st award (1965) to the 60th (2025). The award is given by language, not by state. Select Hindi to see its laureates by birthplace (present-day state)." />
          </Reveal>
          <div className="mt-4"><Sources items={[SRC.jnanpith, SRC.W('Jnanpith Award'), SRC.kannadaSahitya]} notes={[{ kind: 'fact', text: 'Names, years and citations checked against the Bharatiya Jnanpith list of laureates.' }]} /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Voices across centuries" title="Poets, saints and singers" />
          <div className="grid g4 mt-4">
            {POETS.map((p, i) => (
              <Reveal key={p.name} delay={i % 3} className="card">
                <ZoomImg k={p.img} ratio="ratio-1" caption={p.imgCap} credit={false} alt={p.name} portrait
                  placeholderNote="No verified portrait exists. Images of early poets are later artistic imaginings."
                  title={p.name} eyebrow={p.when} info={<p>{p.d}</p>} />
                <div className="card-body"><div className="meta">{p.when}</div><h3 className="h4 mt-1">{p.name}</h3><p className="mt-1">{p.d}</p></div>
              </Reveal>
            ))}
          </div>
          <p className="tiny muted mt-3">No contemporary portraits survive of pre-modern poets; images shown are later sculptures or artistic depictions and are labelled as such.</p>
        </div>
      </section>

      <section className="section theme-sand">
        <div className="wrap split top">
          <div className="stack" style={{ position: 'sticky', top: 110 }}>
            <SectionHead eyebrow="Timeline" title="Literary milestones" kn="ಸಾಹಿತ್ಯದ ಮೈಲಿಗಲ್ಲುಗಳು" lede="Dates are of composition or publication, not of awards. “Firsts” are labelled carefully, because scholars define them differently." />
            <Note kind="disputed" title="Why “first” is hard">A “first novel” depends on whether translations, adaptations and prose romances count. We show the most widely held view and say where it is contested.</Note>
          </div>
          <ol className="vtl">
            {MILESTONES.map((m) => (
              <Reveal as="li" key={m.t}>
                <div className="when">{m.when}</div>
                <div><h4>{m.t}</h4><p>{m.d}</p>{m.kind && <div className="mt-1"><Badge kind={m.kind} /></div>}</div>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="wrap mt-5"><Sources items={[SRC.pollock, SRC.ramanujan, SRC.kannadaSahitya, SRC.W('Kannada literature'), SRC.W('Indira Bai'), SRC.W('Heart Lamp')]} /></div>
      </section>
      <NextChapter path="/literature" />
    </>
  );
}
