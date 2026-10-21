import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Interface strings. Long-form chapter content is in English, with Kannada provided where a
// translation is available (titles, opening, closing narration, headings, greetings).
const UI = {
  chapters: { en: 'Chapters', kn: 'ಅಧ್ಯಾಯಗಳು' },
  chapter: { en: 'Chapter', kn: 'ಅಧ್ಯಾಯ' },
  next: { en: 'Next chapter', kn: 'ಮುಂದಿನ ಅಧ್ಯಾಯ' },
  begin: { en: 'Begin the Journey', kn: 'ಪಯಣ ಆರಂಭಿಸಿ' },
  exploreMap: { en: 'Explore the Interactive Map', kn: 'ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ ನೋಡಿ' },
  sources: { en: 'Sources & certainty', kn: 'ಆಕರಗಳು ಮತ್ತು ಖಚಿತತೆ' },
  skip: { en: 'Skip to content', kn: 'ವಿಷಯಕ್ಕೆ ನೇರವಾಗಿ ಹೋಗಿ' },
  close: { en: 'Close', kn: 'ಮುಚ್ಚಿ' },
  menu: { en: 'Open chapter menu', kn: 'ಅಧ್ಯಾಯಗಳ ಪಟ್ಟಿ ತೆರೆಯಿರಿ' },
  home: { en: 'Home', kn: 'ಮುಖಪುಟ' },
  play: { en: 'Play', kn: 'ಆಟ' },
  motion: { en: 'Reduce motion', kn: 'ಚಲನೆ ಕಡಿಮೆ ಮಾಡಿ' },
  translationNote: {
    en: 'Kannada translations are shown where available; detailed chapter text is in English.',
    kn: 'ಲಭ್ಯವಿರುವಲ್ಲಿ ಕನ್ನಡ ಅನುವಾದ ತೋರಿಸಲಾಗಿದೆ; ವಿಸ್ತೃತ ಅಧ್ಯಾಯ ಪಠ್ಯ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿದೆ.',
  },
  fact: { en: 'Established fact', kn: 'ದೃಢಪಟ್ಟ ಸತ್ಯ' },
  interpretation: { en: 'Scholarly interpretation', kn: 'ವಿದ್ವತ್ ವ್ಯಾಖ್ಯಾನ' },
  tradition: { en: 'Oral tradition / popular account', kn: 'ಮೌಖಿಕ ಪರಂಪರೆ / ಜನಪ್ರಿಯ ಕಥನ' },
  disputed: { en: 'Disputed or debated', kn: 'ವಿವಾದಿತ / ಚರ್ಚಾಸ್ಪದ' },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return sessionStorage.getItem('nk-lang') || 'en'; } catch { return 'en'; }
  });
  useEffect(() => {
    document.documentElement.lang = lang === 'kn' ? 'kn' : 'en';
    try { sessionStorage.setItem('nk-lang', lang); } catch { /* storage unavailable */ }
  }, [lang]);
  const value = useMemo(() => {
    // t() accepts a plain string, an {en, kn} object, or a UI key.
    const t = (x) => {
      if (x == null) return '';
      if (typeof x === 'string') return UI[x] ? UI[x][lang] || UI[x].en : x;
      return (lang === 'kn' && x.kn) || x.en;
    };
    return { lang, setLang, t };
  }, [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
