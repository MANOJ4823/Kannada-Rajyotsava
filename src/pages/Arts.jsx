import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Img, Modal, NextChapter, Note, PageHero, Reveal, SectionHead, Sources } from '../components/ui.jsx';
import { SRC } from '../data/sources.js';
import { FESTIVALS, FESTIVAL_SOURCES } from '../data/festivals.js';

const ARTS = [
  { id: 'yakshagana', name: 'Yakshagana', kn: 'ಯಕ್ಷಗಾನ', img: 'yakshagana', cap: 'A Yakshagana performer in costume', cat: 'Theatre',
    region: 'Coastal Karnataka and the Malnad (also Kasaragod in Kerala)', instruments: 'Chande and maddale drums, cymbals (tala), harmonium or shruti box',
    costume: 'Towering headdresses, painted faces, layered skirts and wooden ornaments covered in gold foil',
    context: 'All-night performances by troupes (melas), many attached to temples, during the dry season from about November to May. Tala-maddale is a costume-free form of spoken debate.',
    meaning: 'Episodes (prasangas) from the epics and Puranas are sung by the Bhagavata, the lead singer-narrator, while actors dance and improvise dialogue. Styles include the southern Tenkutittu and northern Badagutittu.' },
  { id: 'dollu', name: 'Dollu Kunitha', kn: 'ಡೊಳ್ಳು ಕುಣಿತ', img: 'dollu', cap: 'Dollu Kunitha performers, Fireflies Festival of Sacred Music, Bengaluru, 2006', cat: 'Folk dance',
    region: 'Across central and northern Karnataka, notably Shivamogga and Chitradurga', instruments: 'Large barrel drums (dollu) slung from the shoulders, cymbals, flute',
    costume: 'Simple dhotis and vests; the drums themselves are the spectacle', context: 'Festivals and processions, traditionally associated with worship of Beereshwara by the Kuruba community.',
    meaning: 'Energetic group drumming with leaps and formations — a celebration of strength and devotion.' },
  { id: 'veeragase', name: 'Veeragase', kn: 'ವೀರಗಾಸೆ', img: 'veeragasePerformance', cap: 'Veeragase performers in a street procession, Karnataka', cat: 'Folk dance',
    region: 'Across Karnataka, especially in Shaiva and Lingayat communities', instruments: 'Drums and wind instruments',
    costume: 'Bright skirts, headgear, rudraksha beads, with a sword or shield', context: 'Festivals including Dasara and Shivaratri.',
    meaning: 'A vigorous dance that retells the story of Virabhadra, the fierce form of Shiva.' },
  { id: 'kamsale', name: 'Kamsale', kn: 'ಕಂಸಾಳೆ', img: 'kamsale', cap: 'Beesu Kamsale performers', cat: 'Folk dance',
    region: 'Mysuru, Chamarajanagar and around Male Mahadeshwara hills', instruments: 'Kamsale — a pair of bronze cymbals, one held in each hand',
    costume: 'Traditional dhoti and turban', context: 'Performed by devotees of Male Mahadeshwara as part of worship and festival.',
    meaning: 'Rhythmic, acrobatic cymbal play in group patterns; Beesu Kamsale features sweeping swings of the cymbals.' },
  { id: 'pilinalike', name: 'Pili Nalike', kn: 'ಪಿಲಿ ನಲಿಕೆ', img: 'piliNalike', cap: 'Pili Nalike (huli vesha) performers in tiger body paint', cat: 'Folk dance',
    region: 'Udupi and Dakshina Kannada (Tulu Nadu)', instruments: 'Tase drums and a band of percussion and brass',
    costume: 'Full-body paint in bold tiger stripes, with tails and furry headgear',
    context: 'Danced through the streets during Navaratri — especially Mangaluru Dasara — and at Krishna Janmashtami in Udupi; troupes move from house to house and perform acrobatic feats.',
    meaning: '“Pili nalike” is Tulu for the tiger dance (huli vesha in Kannada). It is popularly linked to the goddess Durga, whose mount is the tiger, and is a proud symbol of coastal festivals.' },
  { id: 'kolata', name: 'Kolata', kn: 'ಕೋಲಾಟ', img: 'kolataSupplied', cap: 'Dancers performing the Kolata stick dance', cat: 'Folk dance',
    region: 'Villages across Karnataka — and across South India and beyond', instruments: 'Pairs of short sticks (kolu); songs', costume: 'Everyday festive dress',
    context: 'Village festivals and celebrations; performed by men and women.', meaning: 'Dancers strike sticks in rhythm with partners while moving in circles. It is shared by many regions, not exclusive to Karnataka.' },
  { id: 'janapada', name: 'Janapada songs & storytelling', kn: 'ಜನಪದ ಹಾಡು', img: 'janapadaSingers', cap: 'Folk singers with a drum and a stringed instrument', cat: 'Music',
    region: 'Every region', instruments: 'Tamboori, damaru, voice', costume: '—',
    context: 'Sobane wedding songs, grinding songs, lavani ballads, Gee Gee songs of North Karnataka, and the long sung epics of Male Mahadeshwara and Manteswamy by travelling tamboori singers.',
    meaning: 'History as remembered by the people: Kittur Chennamma and Sangolli Rayanna live on in ballads.' },
  { id: 'painting', name: 'Mysore painting', kn: 'ಮೈಸೂರು ಚಿತ್ರಕಲೆ', img: 'mysorePainting', cap: '19th-century Mysore painting of the goddess Saraswati', cat: 'Visual art',
    region: 'Mysuru', instruments: '—', costume: '—', context: 'Developed from Karnata (Vijayanagara) painting traditions and patronised by the Wadiyar court, especially Krishnaraja Wadiyar III.',
    meaning: 'Delicate figures with raised gesso work covered in gold foil; mostly gods and goddesses. “Mysore Traditional Paintings” is a registered GI.' },
  { id: 'carnatic', name: 'Carnatic music & Karnataka', kn: 'ಕರ್ನಾಟಕ ಸಂಗೀತ', img: 'purandara', cap: 'Purandara Dasa (artistic depiction)', cat: 'Music',
    region: 'Across South India', instruments: 'Voice, veena, violin, mridangam, flute', costume: '—',
    context: 'Purandara Dasa’s graded lessons are still the first a student learns; the Mysore court nurtured veena and vocal traditions; Bengaluru’s Ramanavami concerts have run for decades.',
    meaning: 'Carnatic music is a shared South Indian tradition — many of its greatest composers lived in today’s Tamil Nadu and Andhra Pradesh. Karnataka is one of its homes, and North Karnataka is equally a home of Hindustani music.' },
  { id: 'vachana', name: 'Vachana singing', kn: 'ವಚನ ಗಾಯನ', img: 'vachanaSinging', cap: 'A vocalist in performance', cat: 'Music',
    region: 'Across Karnataka', instruments: 'Voice with harmonium, tabla or tanpura', costume: '—',
    context: 'Concerts, gatherings and recordings set 12th-century vachanas to music in both Carnatic and Hindustani styles.',
    meaning: 'Brings the egalitarian poetry of the vachana saints to new audiences.' },
  { id: 'theatre', name: 'Kannada theatre', kn: 'ಕನ್ನಡ ರಂಗಭೂಮಿ', img: 'ninasam', cap: 'Shivarama Karantha Rangamandira, Ninasam, Heggodu (Shivamogga district)', cat: 'Theatre',
    region: 'Statewide', instruments: '—', costume: '—',
    context: 'Company theatre toured towns from the late 19th century; Ninasam at Heggodu (founded by K. V. Subbanna) and Rangayana in Mysuru (founded by B. V. Karanth) trained generations.',
    meaning: 'Girish Karnad, Chandrashekhara Kambara and P. Lankesh wrote plays staged across India.' },
  { id: 'sandalwood', name: 'Sandalwood — Kannada cinema', kn: 'ಚಂದನವನ', img: 'rajkumar', cap: 'Dr. Rajkumar on a 2009 Indian postage stamp', cat: 'Cinema',
    region: 'Bengaluru and beyond', instruments: '—', costume: '—',
    context: 'From Sati Sulochana (1934) and the Dr. Rajkumar era to the new wave of Samskara and Ghatashraddha and recent hits such as KGF and Kantara, which drew on coastal bhuta kola traditions.',
    meaning: '“Sandalwood” is the industry’s nickname, after Karnataka’s famous tree.' },
  { id: 'crafts', name: 'Crafts: wood, weave & metal', kn: 'ಕರಕುಶಲ', img: 'channapatna', cap: 'Lacquered wooden toys of the Channapatna tradition', cat: 'Craft',
    region: 'Channapatna, Bidar, Mysuru, Ilkal, Navalgund, Sagara and more', instruments: '—', costume: '—',
    context: 'Lacquered Channapatna toys, rosewood inlay, sandalwood carving by Gudigar artisans, Ilkal and Molakalmuru saris, Navalgund durries, Kasuti embroidery.',
    meaning: 'Many are registered Geographical Indications — see Chapter 15.' },
];

export default function Arts() {
  const [open, setOpen] = useState(null);
  const a = ARTS.find((x) => x.id === open);
  const [openF, setOpenF] = useState(null);
  const f = FESTIVALS.find((x) => x.id === openF);
  return (
    <>
      <PageHero path="/arts" image="yakshagana" alt="A Yakshagana performer"
        lede="Drums that shake the ground, all-night theatre under the stars, gold-leaf paintings, sung epics and a film industry named after a tree. Select any art form to explore it." />
      <section className="section">
        <div className="wrap">
          <div className="atlas-grid">
            {ARTS.map((x, i) => (
              <Reveal key={x.id} delay={i % 3}>
                <button className="atlas-card" onClick={() => setOpen(x.id)} aria-label={`${x.name}: open details`}>
                  <Img k={x.img} credit={false} zoom alt={x.cap || x.name} placeholderNote="Openly licensed photograph not verified for this art form." />
                  <div className="tiny muted mt-2" style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>{x.cat}</div>
                  <h3>{x.name} <span className="kn-serif muted" style={{ fontSize: '1rem' }}>{x.kn}</span></h3>
                  <div className="loc">{x.region}</div>
                </button>
              </Reveal>
            ))}
          </div>
          <div className="grid g2 mt-5">
            <Note kind="interpretation" title="Shared traditions">Many art forms here — Kolata, Carnatic music, Yakshagana-like theatre — are also practised in neighbouring states. Celebrating Karnataka’s versions does not mean claiming them exclusively.</Note>
            <Note kind="fact" title="Audio and video">We have not embedded recordings: performances belong to their artists and troupes. Watch live — Rajyotsava season is full of free performances.</Note>
          </div>
          <div className="mt-4"><Sources items={[SRC.culture, SRC.kaTourism, SRC.W('Yakshagana'), SRC.W('Dollu Kunitha'), SRC.W('Mysore painting'), SRC.W('Kannada cinema'), SRC.W('Ninasam')]} /></div>
        </div>
      </section>
      <section className="section theme-sand" id="festivals" aria-labelledby="festivals-h">
        <div className="wrap">
          <SectionHead eyebrow="Festivals · ಹಬ್ಬಗಳು" title="Festivals that fill the calendar" kn="ನಾಡಿನ ಹಬ್ಬಗಳು"
            lede="Royal processions, buffalo races in paddy fields, a night-long flower procession, a statue anointed once in twelve years. Select a festival to explore it." />
          <h2 id="festivals-h" className="sr-only">Festivals</h2>
          <div className="atlas-grid mt-4">
            {FESTIVALS.map((x, i) => (
              <Reveal key={x.id} delay={i % 3}>
                <button className="atlas-card" onClick={() => setOpenF(x.id)} aria-label={`${x.name}: open details`}>
                  <Img k={x.img} credit={false} zoom alt={x.cap || x.name} />
                  <div className="tiny muted mt-2" style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>{x.when}</div>
                  <h3>{x.name} <span className="kn-serif muted" style={{ fontSize: '1rem' }}>{x.kn}</span></h3>
                  <div className="loc">{x.where}</div>
                </button>
              </Reveal>
            ))}
          </div>
          <div className="mt-4"><Sources items={FESTIVAL_SOURCES} /></div>
        </div>
      </section>
      {f && (
        <Modal onClose={() => setOpenF(null)} label={f.name}>
          <div className="modal-grid">
            <Img k={f.img} ratio="" caption={f.cap} />
            <div className="modal-body stack">
              <div className="eyebrow">Festival</div>
              <h2 className="h2">{f.name}</h2>
              <div className="kn-serif" style={{ color: 'var(--copper)', fontSize: '1.3rem' }}>{f.kn}</div>
              <dl className="facts">
                <div><dt>When</dt><dd>{f.when}</dd></div>
                <div><dt>Where</dt><dd>{f.where}</dd></div>
              </dl>
              <div><div className="small muted">What happens</div><p>{f.what}</p></div>
              <div><div className="small muted">Meaning</div><p>{f.meaning}</p>{f.kind !== 'fact' && <Badge kind={f.kind} />}</div>
              <Link to={f.link.to} className="link-arrow small">{f.link.label} →</Link>
            </div>
          </div>
        </Modal>
      )}
      {a && (
        <Modal onClose={() => setOpen(null)} label={a.name}>
          <div className="modal-grid">
            <Img k={a.img} ratio="" caption={a.cap} placeholderNote="Openly licensed photograph not verified for this art form." />
            <div className="modal-body stack">
              <div className="eyebrow">{a.cat}</div>
              <h2 className="h2">{a.name}</h2>
              <div className="kn-serif" style={{ color: 'var(--copper)', fontSize: '1.3rem' }}>{a.kn}</div>
              <dl className="facts">
                <div><dt>Region</dt><dd>{a.region}</dd></div>
                <div><dt>Instruments</dt><dd>{a.instruments}</dd></div>
                <div><dt>Costume</dt><dd>{a.costume}</dd></div>
              </dl>
              <div><div className="small muted">Performance context</div><p>{a.context}</p></div>
              <div><div className="small muted">Cultural meaning</div><p>{a.meaning}</p></div>
            </div>
          </div>
        </Modal>
      )}
      <NextChapter path="/arts" />
    </>
  );
}
