import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ChapterRail, Drawer, Footer, Header } from './components/Layout.jsx';
import { useLang } from './i18n.jsx';
import { CHAPTERS } from './data/chapters.js';
import Home from './pages/Home.jsx';

const pages = {
  '/land': lazy(() => import('./pages/Land.jsx')),
  '/kingdoms': lazy(() => import('./pages/Kingdoms.jsx')),
  '/monuments': lazy(() => import('./pages/Monuments.jsx')),
  '/kannada': lazy(() => import('./pages/Kannada.jsx')),
  '/literature': lazy(() => import('./pages/Literature.jsx')),
  '/people': lazy(() => import('./pages/People.jsx')),
  '/unification': lazy(() => import('./pages/Unification.jsx')),
  '/vidhana-soudha': lazy(() => import('./pages/VidhanaSoudha.jsx')),
  '/bengaluru': lazy(() => import('./pages/Bengaluru.jsx')),
  '/geography': lazy(() => import('./pages/Geography.jsx')),
  '/bhuvaneshwari': lazy(() => import('./pages/Bhuvaneshwari.jsx')),
  '/symbols': lazy(() => import('./pages/Symbols.jsx')),
  '/arts': lazy(() => import('./pages/Arts.jsx')),
  '/food': lazy(() => import('./pages/Food.jsx')),
  '/gi': lazy(() => import('./pages/GI.jsx')),
  '/economy': lazy(() => import('./pages/Economy.jsx')),
  '/office': lazy(() => import('./pages/Office.jsx')),
  '/play': lazy(() => import('./pages/Play.jsx')),
  '/future': lazy(() => import('./pages/Future.jsx')),
  '/sources': lazy(() => import('./pages/SourcesPage.jsx')),
};

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const { t, lang } = useLang();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const tryScroll = (n = 0) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView();
        else if (n < 20) setTimeout(() => tryScroll(n + 1), 100);
      };
      tryScroll();
    } else window.scrollTo(0, 0);
  }, [pathname, hash]);
  useEffect(() => {
    const ch = CHAPTERS.find((c) => c.path === pathname);
    document.title = ch ? `${t(ch)} — Namma Karnataka` : 'Namma Karnataka — The Soul of a Land. The Story of a Civilization.';
  }, [pathname, lang]);
  return null;
}

function NotFound() {
  return (
    <section className="section theme-night" style={{ minHeight: '80vh', paddingTop: 180 }}>
      <div className="wrap stack">
        <div className="eyebrow">404</div>
        <h1 className="h1">This path is not on the map.</h1>
        <p className="lede"><a href="/" className="link-arrow">Return to the beginning →</a></p>
      </div>
    </section>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(() => {
    try { return localStorage.getItem('nk-rm') === '1'; } catch { return false; }
  });
  const { t } = useLang();
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
    try { localStorage.setItem('nk-rm', reduceMotion ? '1' : '0'); } catch { /* ignore */ }
  }, [reduceMotion]);
  return (
    <>
      <a href="#main" className="skip-link">{t('skip')}</a>
      <ScrollManager />
      <Header onMenu={() => setMenu(true)} />
      <Drawer open={menu} onClose={() => setMenu(false)} reduceMotion={reduceMotion} setReduceMotion={setReduceMotion} />
      <ChapterRail />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--night)' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {Object.entries(pages).map(([p, C]) => <Route key={p} path={p} element={<C />} />)}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
