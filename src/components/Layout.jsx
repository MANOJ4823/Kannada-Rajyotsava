import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { CHAPTERS, knNum } from '../data/chapters.js';

const NAV = [
  { to: '/land', en: 'The Journey', kn: 'ಪಯಣ' },
  { to: '/kingdoms', en: 'Timeline', kn: 'ಕಾಲರೇಖೆ' },
  { to: '/monuments', en: 'Monuments', kn: 'ಸ್ಮಾರಕಗಳು' },
  { to: '/kannada', en: 'Kannada', kn: 'ಕನ್ನಡ' },
  { to: '/unification', en: 'Unification', kn: 'ಏಕೀಕರಣ' },
  { to: '/bengaluru', en: 'Bengaluru', kn: 'ಬೆಂಗಳೂರು' },
  { to: '/arts', en: 'Arts', kn: 'ಕಲೆಗಳು' },
  { to: '/food', en: 'Food', kn: 'ಆಹಾರ' },
  { to: '/play', en: 'Play', kn: 'ಆಟ' },
];

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden>
      <path d="M7 33h26M10 33V20h20v13M13 20l7-9 7 9M20 11V6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M15 33v-7h3v7M22 33v-7h3v7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 36.5h13" stroke="#e2b33c" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 36.5h13" stroke="#c4362c" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Header({ onMenu }) {
  const { lang, setLang, t } = useLang();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > window.innerHeight * 0.7);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);
  useEffect(() => { document.documentElement.classList.toggle('header-hidden', hidden); }, [hidden]);
  const darkHero = !scrolled;
  return (
    <header className={`site-header ${darkHero ? 'over-dark' : ''} ${hidden ? 'hidden' : ''}`}>
      <div className="wrap">
        <Link to="/" className="brand" aria-label="Namma Karnataka — home">
          <BrandMark />
          <div>
            <div className="brand-name">NAMMA KARNATAKA</div>
            <div className="brand-sub">ನಮ್ಮ ಕರ್ನಾಟಕ · ನಮ್ಮ ಕಥೆ</div>
          </div>
        </Link>
        <nav className="main-nav" aria-label="Primary">
          {NAV.map((n) => <NavLink key={n.to} to={n.to}>{t(n)}</NavLink>)}
        </nav>
        <div className="header-tools">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">EN</button>
            <button aria-pressed={lang === 'kn'} onClick={() => setLang('kn')} lang="kn" className="kn">ಕನ್ನಡ</button>
          </div>
          <button className="icon-btn" onClick={onMenu} aria-label={t('menu')}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export function Drawer({ open, onClose, reduceMotion, setReduceMotion }) {
  const { t, lang } = useLang();
  const { pathname } = useLocation();
  useEffect(() => { if (open) onClose(); }, [pathname]); // close on navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return (
    <>
      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={onClose} aria-hidden />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-label={t('chapters')} aria-hidden={!open} inert={open ? undefined : ''}>
        <div className="row between">
          <div className="eyebrow">{t('chapters')}</div>
          <button className="icon-btn" onClick={onClose} aria-label={t('close')} style={{ color: 'inherit' }}>✕</button>
        </div>
        <ul className="drawer-list">
          <li><Link to="/" className={pathname === '/' ? 'active' : ''}><span className="dl-num">✦</span><span className="dl-title">{t('home')}<span className="dl-sub">Namma Karnataka — opening</span></span></Link></li>
          {CHAPTERS.map((c) => (
            <li key={c.path}>
              <Link to={c.path} className={pathname === c.path ? 'active' : ''}>
                <span className="dl-num">{typeof c.n === 'number' ? knNum(c.n) : c.n}</span>
                <span className="dl-title">{t(c)}<span className="dl-sub" lang={lang === 'en' ? 'kn' : 'en'}>{lang === 'en' ? c.kn : c.en}</span></span>
              </Link>
            </li>
          ))}
          <li><Link to="/sources"><span className="dl-num">§</span><span className="dl-title">Sources, method & image credits</span></Link></li>
        </ul>
        <label className="row mt-4 small" style={{ cursor: 'pointer' }}>
          <input type="checkbox" checked={reduceMotion} onChange={(e) => setReduceMotion(e.target.checked)} /> {t('motion')}
        </label>
        <p className="tiny" style={{ opacity: 0.6 }}>{t('translationNote')}</p>
      </aside>
    </>
  );
}

/** Persistent chapter navigator — always visible on desktop, on every page. */
export function ChapterRail() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [onDark, setOnDark] = useState(true);
  useEffect(() => {
    const onScroll = () => setOnDark(window.scrollY < window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);
  return (
    <nav className={`chapter-rail ${onDark ? 'on-dark' : ''}`} aria-label="Chapter navigator">
      {CHAPTERS.map((c) => (
        <Link key={c.path} to={c.path} className={pathname === c.path ? 'active' : ''} aria-current={pathname === c.path ? 'page' : undefined}>
          <span className="rail-label">{c.n} · {t({ en: c.short, kn: c.kn })}</span>
          <span className="rail-dot" />
        </Link>
      ))}
    </nav>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand-name" style={{ color: 'var(--cream)' }}>NAMMA KARNATAKA</div>
            <p className="kn-serif mt-2" style={{ color: 'var(--yellow)', fontSize: '1.2rem' }}>ಇದು ನಮ್ಮ ಕರ್ನಾಟಕ.</p>
            <p className="small">An interactive digital museum made for a Kannada Rajyotsava celebration at our office — 1 November.</p>
            <div className="ribbon mt-3" />
          </div>
          <div>
            <h4>History</h4>
            <ul>{CHAPTERS.slice(0, 7).map((c) => <li key={c.path}><Link to={c.path}>{t({ en: c.short, kn: c.kn })}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Land & life</h4>
            <ul>{CHAPTERS.slice(7, 14).map((c) => <li key={c.path}><Link to={c.path}>{t({ en: c.short, kn: c.kn })}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Together</h4>
            <ul>
              {CHAPTERS.slice(14).map((c) => <li key={c.path}><Link to={c.path}>{t({ en: c.short, kn: c.kn })}</Link></li>)}
              <li><Link to="/sources">Sources & image credits</Link></li>
            </ul>
          </div>
        </div>
        <hr className="hr" style={{ background: 'var(--line-light)' }} />
        <p className="tiny" style={{ opacity: 0.65, maxWidth: '90ch' }}>
          Photographs are openly licensed works from Wikimedia Commons, credited beside each image and listed on the Sources page.
          Map geometry: Census 2011 district boundaries (via the open india-maps-data project) and Natural Earth rivers. Dates for early
          dynasties are approximate. Claims are labelled as established fact, scholarly interpretation, oral tradition or disputed.
        </p>
      </div>
    </footer>
  );
}
