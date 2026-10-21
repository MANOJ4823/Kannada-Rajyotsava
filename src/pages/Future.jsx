import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Credit, img } from '../components/ui.jsx';
import { useLang } from '../i18n.jsx';

const FRAMES = [
  { k: 'halebidu', label: 'Stone · Halebidu' },
  { k: 'bengaluru', label: 'City · Bengaluru' },
  { k: 'stMarys', label: 'Coast · St Mary’s Islands' },
  { k: 'coorgCoffee', label: 'Farms · Kodagu' },
  { k: 'westernGhats', label: 'Forests · Kudremukh' },
  { k: 'iisc', label: 'Classrooms & laboratories · IISc' },
  { k: 'yakshagana', label: 'Performance · Yakshagana' },
];

const LINES = [
  { en: 'Centuries ago, artisans shaped stone into temples. Poets shaped language into literature. Farmers cultivated the land. Traders connected distant markets. Musicians carried stories through generations. Engineers imagined new possibilities. Today, students, entrepreneurs, artists, workers and families continue that journey.',
    kn: 'ಶತಮಾನಗಳ ಹಿಂದೆ ಶಿಲ್ಪಿಗಳು ಕಲ್ಲನ್ನು ದೇವಾಲಯಗಳಾಗಿ ರೂಪಿಸಿದರು. ಕವಿಗಳು ಭಾಷೆಯನ್ನು ಸಾಹಿತ್ಯವಾಗಿಸಿದರು. ರೈತರು ನೆಲವನ್ನು ಉತ್ತು ಬೆಳೆದರು. ವ್ಯಾಪಾರಿಗಳು ದೂರದ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಬೆಸೆದರು. ಸಂಗೀತಗಾರರು ಕಥೆಗಳನ್ನು ತಲೆಮಾರುಗಳಿಗೆ ದಾಟಿಸಿದರು. ಎಂಜಿನಿಯರುಗಳು ಹೊಸ ಸಾಧ್ಯತೆಗಳನ್ನು ಕಲ್ಪಿಸಿದರು. ಇಂದು ವಿದ್ಯಾರ್ಥಿಗಳು, ಉದ್ಯಮಿಗಳು, ಕಲಾವಿದರು, ಕಾರ್ಮಿಕರು ಮತ್ತು ಕುಟುಂಬಗಳು ಆ ಪಯಣವನ್ನು ಮುಂದುವರಿಸುತ್ತಿದ್ದಾರೆ.' },
  { en: 'Karnataka is ancient, but it is not frozen in the past. It is diverse, evolving and alive.',
    kn: 'ಕರ್ನಾಟಕ ಪ್ರಾಚೀನ ನಾಡು, ಆದರೆ ಭೂತಕಾಲದಲ್ಲೇ ಹೆಪ್ಪುಗಟ್ಟಿಲ್ಲ. ಇದು ವೈವಿಧ್ಯಮಯ, ಬೆಳೆಯುತ್ತಿರುವ, ಜೀವಂತ ನಾಡು.' },
  { en: 'You do not have to be born here to appreciate its heritage. You do not have to speak Kannada fluently to begin learning it. Every respectful visitor, colleague and neighbour can take part in its future.',
    kn: 'ಇದರ ಪರಂಪರೆಯನ್ನು ಮೆಚ್ಚಲು ನೀವು ಇಲ್ಲೇ ಹುಟ್ಟಿರಬೇಕಿಲ್ಲ. ಕನ್ನಡ ಕಲಿಯಲು ಆರಂಭಿಸಲು ನಿರರ್ಗಳವಾಗಿ ಮಾತನಾಡಬೇಕಿಲ್ಲ. ಗೌರವದಿಂದ ಬರುವ ಪ್ರತಿಯೊಬ್ಬ ಅತಿಥಿ, ಸಹೋದ್ಯೋಗಿ ಮತ್ತು ನೆರೆಹೊರೆಯವರೂ ಇದರ ಭವಿಷ್ಯದಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಬಹುದು.' },
  { en: 'On Kannada Rajyotsava, we celebrate Kannada, honour Karnataka’s history and welcome everyone who helps make this land what it is today.',
    kn: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದಂದು ನಾವು ಕನ್ನಡವನ್ನು ಸಂಭ್ರಮಿಸುತ್ತೇವೆ, ಕರ್ನಾಟಕದ ಇತಿಹಾಸವನ್ನು ಗೌರವಿಸುತ್ತೇವೆ ಮತ್ತು ಈ ನಾಡನ್ನು ಇಂದಿನಂತೆ ರೂಪಿಸಲು ನೆರವಾಗುವ ಎಲ್ಲರನ್ನೂ ಸ್ವಾಗತಿಸುತ್ತೇವೆ.' },
];

export default function Future() {
  const { t } = useLang();
  const ref = useRef(null);
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      setFrame(Math.min(FRAMES.length - 1, Math.floor(p * FRAMES.length)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const f = FRAMES[frame];
  return (
    <>
      <section ref={ref} style={{ height: `${FRAMES.length * 85}vh`, position: 'relative', background: 'var(--night)' }} aria-label="From ancient stone to the future">
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          {FRAMES.map((fr, i) => (
            <div key={fr.k} className={`hero-slide ${i === frame ? 'on' : ''}`} aria-hidden={i !== frame}>
              {img(fr.k) && <img src={img(fr.k).src} alt="" loading={i < 2 ? 'eager' : 'lazy'} />}
            </div>
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(18,16,42,.55), rgba(18,16,42,.35) 40%, rgba(18,16,42,.9))', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', color: 'var(--cream)' }}>
            <div className="wrap">
              <div className="chapter-no" style={{ color: 'var(--yellow)', fontFamily: 'var(--kn-serif)' }}>೧೮ <span className="en" style={{ fontFamily: 'var(--sans)', fontSize: '.74rem', letterSpacing: '.24em', textTransform: 'uppercase', opacity: .8 }}>Chapter 18</span></div>
              <h1 className="h2" style={{ marginTop: 12 }}>{t({ en: 'The Future of Karnataka', kn: 'ಕರ್ನಾಟಕದ ಭವಿಷ್ಯ' })}</h1>
              <p className="narration" style={{ maxWidth: '30ch', marginTop: 24 }}>{t(LINES[Math.min(LINES.length - 1, Math.floor((frame / FRAMES.length) * LINES.length))])}</p>
            </div>
          </div>
          <div style={{ position: 'absolute', zIndex: 2, left: 0, right: 0, bottom: 24, color: 'rgba(250,245,236,.75)' }}>
            <div className="wrap row between">
              <div className="row" style={{ gap: 6 }} aria-hidden>{FRAMES.map((x, i) => <span key={x.k} style={{ width: i === frame ? 28 : 8, height: 4, borderRadius: 4, background: i === frame ? 'var(--yellow)' : 'rgba(250,245,236,.35)', transition: 'all .4s' }} />)}</div>
              <div className="tiny" style={{ textAlign: 'right' }}>{f.label} · <Credit data={img(f.k)} /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section theme-night grain center" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <div className="wrap-narrow stack-lg">
          <div className="ribbon" style={{ margin: '0 auto' }} />
          <p className="kn-serif" style={{ fontSize: 'clamp(2.6rem, 8vw, 6rem)', lineHeight: 1.25, color: 'var(--yellow)', margin: 0 }} lang="kn">ಇದು ನಮ್ಮ ಕರ್ನಾಟಕ.</p>
          <p className="h2 it" style={{ margin: 0 }}>Idhu Namma Karnataka.</p>
          <p className="h3" style={{ margin: 0 }}>This is our Karnataka.</p>
          <p className="lede" style={{ marginInline: 'auto' }}>{t({ en: 'A land with a remarkable past. A home being built together.', kn: 'ಅದ್ಭುತ ಭೂತಕಾಲದ ನಾಡು. ಎಲ್ಲರೂ ಸೇರಿ ಕಟ್ಟುತ್ತಿರುವ ಮನೆ.' })}</p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn btn-gold">Back to the beginning</Link>
            <Link to="/office" className="btn btn-ghost">Celebrate at the office</Link>
            <Link to="/sources" className="btn btn-ghost">Sources & credits</Link>
          </div>
        </div>
      </section>
    </>
  );
}
