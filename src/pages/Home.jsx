import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { CHAPTERS, knNum } from '../data/chapters.js';
import { Credit, Img, Reveal, img } from '../components/ui.jsx';
import { KarnatakaMap } from '../components/maps.jsx';

const SLIDES = [
  { k: 'westernGhats', en: 'Western Ghats · Kudremukh', kn: 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು · ಕುದುರೆಮುಖ', alt: 'Shola grasslands and forests of Kudremukh National Park in the Western Ghats, Karnataka' },
  { k: 'heroBadami', en: 'Badami · sandstone cliffs', kn: 'ಬಾದಾಮಿ · ಮರಳುಗಲ್ಲಿನ ಬಂಡೆಗಳು', alt: 'Agastya Lake at Badami ringed by red sandstone cliffs and temples' },
  { k: 'heroHampi', en: 'Hampi · Karnata (Vijayanagara)', kn: 'ಹಂಪಿ · ಕರ್ನಾಟ (ವಿಜಯನಗರ)', alt: 'The boulder landscape and ruins of Hampi seen from Matanga Hill' },
  { k: 'bengaluru', en: 'Bengaluru · today', kn: 'ಬೆಂಗಳೂರು · ಇಂದು', alt: 'Bengaluru city view from the Visvesvaraya Industrial and Technological Museum' },
];

const NARRATION = [
  {
    en: 'Before there was a state called Karnataka, there was a land shaped by ancient rocks, rivers, forests, trade routes and human imagination. Over centuries, people built kingdoms, carved temples, wrote poetry, developed musical traditions, cultivated crops, exchanged ideas and created cities.',
    kn: 'ಕರ್ನಾಟಕ ಎಂಬ ರಾಜ್ಯ ರೂಪುಗೊಳ್ಳುವ ಮೊದಲೇ, ಪ್ರಾಚೀನ ಶಿಲೆಗಳು, ನದಿಗಳು, ಕಾಡುಗಳು, ವ್ಯಾಪಾರ ಮಾರ್ಗಗಳು ಮತ್ತು ಮಾನವ ಕಲ್ಪನೆಯಿಂದ ರೂಪುಗೊಂಡ ಒಂದು ನಾಡು ಇತ್ತು. ಶತಮಾನಗಳುದ್ದಕ್ಕೂ ಜನರು ರಾಜ್ಯಗಳನ್ನು ಕಟ್ಟಿದರು, ದೇವಾಲಯಗಳನ್ನು ಕೆತ್ತಿದರು, ಕಾವ್ಯ ರಚಿಸಿದರು, ಸಂಗೀತ ಪರಂಪರೆಗಳನ್ನು ಬೆಳೆಸಿದರು, ಬೆಳೆ ಬೆಳೆದರು, ವಿಚಾರಗಳನ್ನು ಹಂಚಿಕೊಂಡರು ಮತ್ತು ನಗರಗಳನ್ನು ನಿರ್ಮಿಸಿದರು.',
  },
  {
    en: 'Borders changed. Capitals rose and fell. Yet languages, stories, craftsmanship, food and memory travelled from one generation to the next.',
    kn: 'ಗಡಿಗಳು ಬದಲಾದವು. ರಾಜಧಾನಿಗಳು ಮೆರೆದು ಮರೆಯಾದವು. ಆದರೂ ಭಾಷೆ, ಕಥೆ, ಕರಕುಶಲತೆ, ಆಹಾರ ಮತ್ತು ನೆನಪುಗಳು ಒಂದು ತಲೆಮಾರಿನಿಂದ ಮತ್ತೊಂದು ತಲೆಮಾರಿಗೆ ಸಾಗಿಬಂದವು.',
  },
  {
    en: 'On <strong>1 November 1956</strong>, many Kannada-speaking regions were brought together into an enlarged Mysore State. In <strong>1973</strong>, it became Karnataka.',
    kn: '<strong>೧೯೫೬ರ ನವೆಂಬರ್ ೧</strong>ರಂದು ಕನ್ನಡ ಮಾತನಾಡುವ ಹಲವು ಪ್ರದೇಶಗಳನ್ನು ಒಗ್ಗೂಡಿಸಿ ವಿಶಾಲ ಮೈಸೂರು ರಾಜ್ಯವನ್ನು ರಚಿಸಲಾಯಿತು. <strong>೧೯೭೩</strong>ರಲ್ಲಿ ಅದು ಕರ್ನಾಟಕವಾಯಿತು.',
  },
  {
    en: 'This is the story of that land. Not a story belonging to only one community, but a heritage to discover and share.',
    kn: 'ಇದು ಆ ನಾಡಿನ ಕಥೆ. ಒಂದೇ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿದ ಕಥೆಯಲ್ಲ; ಎಲ್ಲರೂ ಅರಿತು ಹಂಚಿಕೊಳ್ಳಬಹುದಾದ ಪರಂಪರೆ.',
  },
];

function Hero() {
  const { t, lang } = useLang();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('reduce-motion');
    if (paused || reduce) return;
    const id = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 7000);
    return () => clearInterval(id);
  }, [paused]);
  const s = SLIDES[i];
  return (
    <section className="hero" aria-label="Opening">
      {SLIDES.map((sl, j) => (
        <div key={sl.k} className={`hero-slide ${j === i ? 'on' : ''}`} aria-hidden={j !== i}>
          {img(sl.k) && <img src={img(sl.k).src} alt={sl.alt} loading={j === 0 ? 'eager' : 'lazy'} />}
        </div>
      ))}
      <div className="hero-content">
        <div className="wrap">
          <Reveal>
            <div className="hero-kn">ನಮ್ಮ ಕರ್ನಾಟಕ</div>
            <h1 className="display">NAMMA<br />KARNATAKA</h1>
            <p className="hero-tag">{t({ en: 'The Soul of a Land. The Story of a Civilization.', kn: 'ಒಂದು ನಾಡಿನ ಆತ್ಮ. ಒಂದು ನಾಗರಿಕತೆಯ ಕಥೆ.' })}</p>
            <p className="hero-sub">
              {t({
                en: 'From ancient stones to silicon dreams. From the first inscriptions to a living language. Discover the land we call Karnataka.',
                kn: 'ಪ್ರಾಚೀನ ಶಿಲೆಗಳಿಂದ ಸಿಲಿಕಾನ್ ಕನಸುಗಳವರೆಗೆ. ಮೊದಲ ಶಾಸನಗಳಿಂದ ಜೀವಂತ ಭಾಷೆಯವರೆಗೆ. ನಾವು ಕರ್ನಾಟಕ ಎಂದು ಕರೆಯುವ ನಾಡನ್ನು ಅರಿಯಿರಿ.',
              })}
            </p>
            <div className="hero-ctas">
              <Link to="/land" className="btn btn-gold">{t('begin')} <span className="arrow" aria-hidden>→</span></Link>
              <Link to="/land#map" className="btn btn-ghost">{t('exploreMap')}</Link>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden />
      <div className="hero-caption">
        <div className="wrap">
          <div className="hero-place" role="tablist" aria-label="Landscapes">
            {SLIDES.map((sl, j) => (
              <button key={sl.k} role="tab" aria-selected={j === i} className={j === i ? 'on' : ''} onClick={() => { setI(j); setPaused(true); }} lang={lang}>
                {t(sl)}
              </button>
            ))}
          </div>
          <div className="hero-credit">{s.alt}. <Credit data={img(s.k)} /></div>
        </div>
      </div>
    </section>
  );
}

function Narration() {
  const { t } = useLang();
  const refs = useRef([]);
  const [lit, setLit] = useState(-1);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setLit((l) => Math.max(l, +e.target.dataset.i)); });
    }, { rootMargin: '0px 0px -35% 0px' });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section className="section theme-night grain">
      <div className="wrap-narrow">
        <div className="eyebrow mb-4">{t({ en: 'Prologue', kn: 'ಪೀಠಿಕೆ' })}</div>
        <div className="narration">
          {NARRATION.map((p, i) => (
            <p key={i} ref={(el) => (refs.current[i] = el)} data-i={i} className={i <= lit ? 'lit' : 'dim'} dangerouslySetInnerHTML={{ __html: t(p) }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Dates() {
  const { t } = useLang();
  const items = [
    { y: '1 Nov 1956', en: 'Kannada-speaking districts of five administrations join an enlarged Mysore State under the States Reorganisation Act, 1956.', link: '/unification' },
    { y: '1 Nov 1973', en: 'Mysore State is renamed Karnataka. The idea is far older: the 9th-century Kavirajamarga describes the Kannada-speaking land as stretching “from the Kaveri to the Godavari”.', link: '/unification' },
    { y: 'Every 1 Nov', en: 'Kannada Rajyotsava — “the state’s festival” — celebrated across Karnataka with the red-and-yellow Kannada flag, music and the state anthem.', link: '/symbols' },
  ];
  return (
    <section className="section tight theme-sand">
      <div className="wrap">
        <div className="grid g3">
          {items.map((d, i) => (
            <Reveal key={d.y} delay={i} className="stat">
              <div className="v">{d.y}</div>
              <p className="l" style={{ fontSize: '1rem', color: 'var(--ink-2)' }}>{d.en}</p>
              <Link to={d.link} className="link-arrow small">{t({ en: 'Read more', kn: 'ಇನ್ನಷ್ಟು ಓದಿ' })} →</Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterIndex() {
  const { t, lang } = useLang();
  return (
    <section className="section theme-night">
      <div className="wrap">
        <div className="split mb-4" style={{ alignItems: 'end' }}>
          <Reveal className="stack">
            <div className="eyebrow">{t({ en: 'The Journey', kn: 'ಪಯಣ' })}</div>
            <h2 className="h2">{t({ en: 'Eighteen chapters. One living civilization.', kn: 'ಹದಿನೆಂಟು ಅಧ್ಯಾಯಗಳು. ಒಂದು ಜೀವಂತ ನಾಗರಿಕತೆ.' })}</h2>
          </Reveal>
          <Reveal className="lede">
            {t({
              en: 'Walk it in order, or jump to what calls you — the stone, the script, the food, the people. A persistent chapter guide stays at the edge of your screen wherever you go.',
              kn: 'ಕ್ರಮವಾಗಿ ಸಾಗಿ, ಇಲ್ಲವೇ ನಿಮ್ಮನ್ನು ಸೆಳೆಯುವ ಅಧ್ಯಾಯಕ್ಕೆ ನೇರವಾಗಿ ಹೋಗಿ.',
            })}
          </Reveal>
        </div>
        <ol className="chapter-index">
          {CHAPTERS.map((c) => (
            <li key={c.path}>
              <Link to={c.path}>
                <div className="ci-bg">{img(c.img) && <img src={img(c.img).src} alt="" loading="lazy" />}</div>
                <span className="ci-num">{typeof c.n === 'number' ? knNum(c.n) : c.n}</span>
                <span className="ci-title">{t(c)}</span>
                <span className="ci-kn">{lang === 'en' ? c.kn : c.en}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MapTeaser() {
  const { t } = useLang();
  const markers = ['hampi', 'badami', 'pattadakal', 'aihole', 'belur', 'halebidu', 'vijayapura', 'banavasi', 'shravanabelagola', 'mysuru', 'bengaluru', 'chitradurga', 'jog', 'mangaluru', 'bidar']
    .map((id) => ({ id, showLabel: ['hampi', 'badami', 'mysuru', 'bengaluru', 'vijayapura', 'mangaluru', 'bidar', 'jog'].includes(id) }));
  return (
    <section className="section">
      <div className="wrap split">
        <Reveal className="map-wrap"><KarnatakaMap markers={markers} title="Karnataka with selected heritage sites" /></Reveal>
        <Reveal className="stack-lg">
          <div className="stack">
            <div className="eyebrow">{t({ en: 'Many worlds within one land', kn: 'ಒಂದು ನಾಡಿನೊಳಗೆ ಹಲವು ಲೋಕಗಳು' })}</div>
            <h2 className="h2">{t({ en: 'A coast, a mountain wall, a vast plateau.', kn: 'ಕರಾವಳಿ, ಘಟ್ಟಗಳ ಗೋಡೆ, ವಿಶಾಲ ಪ್ರಸ್ಥಭೂಮಿ.' })}</h2>
            <p className="lede">Karnataka stretches about 750 km from Bidar in the north to the Biligiri Rangana hills in the south, and from the Arabian Sea across the Western Ghats onto the Deccan Plateau. Kingdoms rose where rivers, soil and trade routes allowed.</p>
          </div>
          <div className="row">
            <Link to="/land#map" className="btn">{t('exploreMap')} <span className="arrow">→</span></Link>
            <Link to="/geography" className="btn btn-light">{t({ en: 'Landscapes', kn: 'ಭೂದೃಶ್ಯಗಳು' })}</Link>
          </div>
          <p className="map-note">Present-day district boundaries (Census 2011). Markers show approximate locations, not territorial extent.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Welcome() {
  const { t } = useLang();
  return (
    <section className="section theme-forest">
      <div className="wrap split">
        <Reveal className="stack">
          <div className="eyebrow">{t({ en: 'New to Kannada?', kn: 'ಕನ್ನಡಕ್ಕೆ ಹೊಸಬರೇ?' })}</div>
          <p className="kn-serif" style={{ fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 1.2, color: 'var(--yellow)', margin: 0 }}>ನಮಸ್ಕಾರ</p>
          <p className="h3" style={{ fontStyle: 'italic' }}>namaskāra — hello, and welcome.</p>
          <p className="lede">You don’t have to be born here to belong to this story. Start with three words, a dosa and a monument — the rest follows.</p>
          <div className="row mt-2">
            <Link to="/kannada#phrasebook" className="btn btn-gold">Phrasebook for colleagues →</Link>
            <Link to="/play" className="btn btn-ghost">Take the quiz</Link>
          </div>
        </Reveal>
        <Reveal className="grid g2">
          <Img k="mysorePak" ratio="ratio-3x4" caption="Mysore pak" zoom />
          <div className="stack">
            <Img k="masalaDosa" ratio="ratio-1" caption="Masala dosa" zoom />
            <Img k="filterCoffee" ratio="ratio-1" caption="Filter coffee" zoom />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Narration />
      <Dates />
      <MapTeaser />
      <ChapterIndex />
      <Welcome />
    </>
  );
}
