import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import IMAGES from '../data/images.json';
import { useLang } from '../i18n.jsx';
import { chapterByPath, knNum, nextChapter } from '../data/chapters.js';

export const img = (k) => IMAGES[k];

/* ---------- Image with attribution, or an honest placeholder ---------- */
export function Img({ k, alt, caption, ratio = 'ratio-4x3', className = '', credit = true, eager = false, zoom = false, placeholderNote }) {
  const data = IMAGES[k];
  const [loaded, setLoaded] = useState(false);
  return (
    <figure className={`fig ${zoom ? 'zoom' : ''} ${className}`}>
      <div className={`frame ${ratio}`}>
        {data ? (
          <img
            src={data.src}
            alt={alt || caption || data.description || ''}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className={loaded ? '' : 'loading'}
            onLoad={() => setLoaded(true)}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <Placeholder label={alt || caption} note={placeholderNote} />
        )}
      </div>
      {(caption || (credit && data)) && (
        <figcaption>
          {caption && <span className="cap">{caption}</span>}
          {credit && data && <Credit data={data} />}
        </figcaption>
      )}
    </figure>
  );
}

export function Credit({ data, prefix = 'Photo' }) {
  if (!data) return null;
  if (data.supplied) return <span>{data.credit}</span>;
  return (
    <span>
      {prefix}: {data.author.slice(0, 80)} ·{' '}
      <a href={data.licenseUrl} target="_blank" rel="noreferrer">{data.license}</a> ·{' '}
      <a href={data.page} target="_blank" rel="noreferrer">Wikimedia Commons</a>
    </span>
  );
}

export function Placeholder({ label, note }) {
  return (
    <div className="placeholder" role="img" aria-label={`Placeholder: verified image not available${label ? ' for ' + label : ''}`}>
      <div>
        <span className="tiny" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>Placeholder</span>
        <strong>{label || 'Image to be added'}</strong>
        <div className="tiny">{note || 'A verified, openly licensed photograph was not available. We show this placeholder rather than an unverified image.'}</div>
      </div>
    </div>
  );
}

/* ---------- Scroll reveal ---------- */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${delay ? 'd' + delay : ''} ${inView ? 'in' : ''} ${className}`} {...rest}>{children}</Tag>;
}

/* ---------- Certainty labels ---------- */
export function Badge({ kind = 'fact', children }) {
  const { t } = useLang();
  return <span className={`badge ${kind}`}>{children || t(kind)}</span>;
}

export function Note({ kind = 'tradition', title, children }) {
  return (
    <div className={`callout ${kind}`}>
      <span className="label"><Badge kind={kind}>{title}</Badge></span>
      <div>{children}</div>
    </div>
  );
}

/* ---------- Sources & certainty panel ---------- */
export function Sources({ items = [], notes = [], open = false }) {
  const { t } = useLang();
  return (
    <details className="sources" open={open}>
      <summary><span className="plus" aria-hidden>+</span>{t('sources')} <span className="muted small">({items.length})</span></summary>
      {notes.length > 0 && (
        <div className="mt-3 grid g2">
          {notes.map((n, i) => (
            <div key={i} className="small"><Badge kind={n.kind} /> <span style={{ marginLeft: 6 }}>{n.text}</span></div>
          ))}
        </div>
      )}
      <ul className="source-list">
        {items.map((s, i) => (
          <li key={i}>
            <span className="tiny muted" style={{ textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.kind || 'Source'}</span>
            <div><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></div>
            {s.note && <div className="tiny muted">{s.note}</div>}
          </li>
        ))}
      </ul>
    </details>
  );
}

/* ---------- Chapter opener ---------- */
export function PageHero({ path, image, title, lede, short = false, alt, dimImage = false, children }) {
  const { t, lang } = useLang();
  const ch = chapterByPath(path);
  const data = IMAGES[image || ch?.img];
  return (
    <header className={`page-hero ${short ? 'short' : ''}`}>
      <div className="bg">{data && <img src={data.src} alt={alt || ''} style={dimImage ? { filter: 'brightness(0.5) saturate(0.9)' } : undefined} />}</div>
      <div className="content">
        <div className="wrap">
          {ch && (
            <div className="chapter-no">
              <span>{typeof ch.n === 'number' ? knNum(ch.n) : ch.n}</span>
              <span className="en">{t('chapter')} {ch.n}</span>
            </div>
          )}
          <h1 className="h1">{title || (ch && t(ch))}</h1>
          {ch && lang === 'en' && <div className="kn-title">{ch.kn}</div>}
          {lede && <p className="lede">{lede}</p>}
          {children}
        </div>
      </div>
      {data && (
        <div className="credit">
          {alt && <span>{alt} · </span>}
          <Credit data={data} />
        </div>
      )}
    </header>
  );
}

export function NextChapter({ path }) {
  const { t } = useLang();
  const n = nextChapter(path);
  if (!n) return null;
  const data = IMAGES[n.img];
  return (
    <Link to={n.path} className="next-chapter">
      <div className="bg">{data && <img src={data.src} alt="" loading="lazy" />}</div>
      <div className="wrap inner">
        <div>
          <div className="eyebrow">{t('next')} · {typeof n.n === 'number' ? knNum(n.n) : n.n}</div>
          <div className="t mt-2">{t(n)}</div>
        </div>
        <span className="btn btn-gold">Continue <span className="arrow" aria-hidden>→</span></span>
      </div>
    </Link>
  );
}

export function SectionHead({ eyebrow, title, kn, lede, center = false, children }) {
  const { lang } = useLang();
  return (
    <Reveal className={`stack ${center ? 'center' : ''}`} style={center ? { marginInline: 'auto', maxWidth: 900 } : undefined}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="h2">{lang === 'kn' && kn ? kn : title}</h2>
      {lang === 'en' && kn && <div className="kn-serif muted" style={{ fontSize: '1.05rem' }}>{kn}</div>}
      {lede && <p className="lede" style={center ? { marginInline: 'auto' } : undefined}>{lede}</p>}
      {children}
    </Reveal>
  );
}

/* ---------- Modal dialog with focus handling ---------- */
export function Modal({ onClose, label, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    ref.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus?.(); };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} ref={ref}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        {children}
      </div>
    </div>
  );
}

export function Tabs({ tabs, value, onChange, label }) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {tabs.map((tb) => (
        <button key={tb.id} role="tab" aria-selected={value === tb.id} onClick={() => onChange(tb.id)}>{tb.label}</button>
      ))}
    </div>
  );
}

/* ---------- Speech (Kannada voice only if the device actually has one) ---------- */
export function useKannadaVoice() {
  const [voice, setVoice] = useState(null);
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const pick = () => setVoice(speechSynthesis.getVoices().find((v) => v.lang && v.lang.toLowerCase().startsWith('kn')) || null);
    pick();
    speechSynthesis.addEventListener?.('voiceschanged', pick);
    return () => speechSynthesis.removeEventListener?.('voiceschanged', pick);
  }, []);
  const speak = (text) => {
    if (!voice) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice; u.lang = voice.lang; u.rate = 0.8;
    speechSynthesis.speak(u);
  };
  return { available: !!voice, speak };
}

export function SpeakButton({ text, voice }) {
  if (!voice.available) return null;
  return (
    <button className="speak" onClick={() => voice.speak(text)} aria-label={`Hear pronunciation: ${text}`}>
      <span aria-hidden>🔊</span> Listen
    </button>
  );
}
