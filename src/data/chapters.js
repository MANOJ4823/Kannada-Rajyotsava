// The journey: every chapter has a real route. Order defines "next chapter" navigation.
export const CHAPTERS = [
  { path: '/land', n: 1, en: 'The Land Before the Kingdoms', kn: 'ಸಾಮ್ರಾಜ್ಯಗಳಿಗೂ ಮುನ್ನಿನ ನಾಡು', short: 'The Land', img: 'westernGhats' },
  { path: '/kingdoms', n: 2, en: 'The Kingdoms That Shaped Karnataka', kn: 'ಕರ್ನಾಟಕವನ್ನು ರೂಪಿಸಿದ ರಾಜವಂಶಗಳು', short: 'Kingdoms', img: 'pattadakal' },
  { path: '/monuments', n: 3, en: 'Monuments That Tell Stories', kn: 'ಕಥೆ ಹೇಳುವ ಸ್ಮಾರಕಗಳು', short: 'Monuments', img: 'stoneChariot' },
  { path: '/kannada', n: 4, en: 'Kannada: A Language That Carries a Civilization', kn: 'ಕನ್ನಡ: ನಾಗರಿಕತೆಯನ್ನು ಹೊತ್ತ ಭಾಷೆ', short: 'Kannada', img: 'halmidi' },
  { path: '/literature', n: 5, en: 'The Literature That Won India’s Highest Recognition', kn: 'ಭಾರತದ ಅತ್ಯುನ್ನತ ಗೌರವ ಗಳಿಸಿದ ಸಾಹಿತ್ಯ', short: 'Literature', img: 'kuvempu' },
  { path: '/people', n: 6, en: 'People Who Shaped Karnataka', kn: 'ಕರ್ನಾಟಕವನ್ನು ರೂಪಿಸಿದ ವ್ಯಕ್ತಿಗಳು', short: 'People', img: 'krs' },
  { path: '/unification', n: 7, en: 'The Unification of Karnataka', kn: 'ಕರ್ನಾಟಕ ಏಕೀಕರಣ', short: 'Unification', img: 'kannadaFlag' },
  { path: '/vidhana-soudha', n: 8, en: 'Vidhana Soudha and Modern Karnataka', kn: 'ವಿಧಾನಸೌಧ ಮತ್ತು ಆಧುನಿಕ ಕರ್ನಾಟಕ', short: 'Vidhana Soudha', img: 'vidhanaSoudha' },
  { path: '/bengaluru', n: 9, en: 'Bengaluru: From Kempegowda’s City to the Technology Capital', kn: 'ಬೆಂಗಳೂರು: ಕೆಂಪೇಗೌಡರ ಊರಿನಿಂದ ತಂತ್ರಜ್ಞಾನ ರಾಜಧಾನಿಯವರೆಗೆ', short: 'Bengaluru', img: 'bengaluru' },
  { path: '/geography', n: 10, en: 'Many Landscapes in One State', kn: 'ಒಂದೇ ರಾಜ್ಯದಲ್ಲಿ ಹಲವು ಭೂದೃಶ್ಯಗಳು', short: 'Geography', img: 'jog' },
  { path: '/bhuvaneshwari', n: 11, en: 'Bhuvaneshwari and the Idea of the Motherland', kn: 'ಭುವನೇಶ್ವರಿ ಮತ್ತು ತಾಯ್ನಾಡಿನ ಕಲ್ಪನೆ', short: 'Kannada Thayi', img: 'kodagu' },
  { path: '/symbols', n: 12, en: 'The Kannada Flag and State Symbols', kn: 'ಕನ್ನಡ ಬಾವುಟ ಮತ್ತು ರಾಜ್ಯದ ಚಿಹ್ನೆಗಳು', short: 'Symbols', img: 'roller' },
  { path: '/arts', n: 13, en: 'The Arts That Keep Karnataka Alive', kn: 'ಕರ್ನಾಟಕವನ್ನು ಜೀವಂತವಾಗಿರಿಸುವ ಕಲೆಗಳು', short: 'Arts', img: 'yakshagana' },
  { path: '/food', n: 14, en: 'The Food Map of Karnataka', kn: 'ಕರ್ನಾಟಕದ ಆಹಾರ ನಕ್ಷೆ', short: 'Food', img: 'mysorePak' },
  { path: '/gi', n: 15, en: 'Karnataka’s GI-Tagged Treasures', kn: 'ಕರ್ನಾಟಕದ ಭೌಗೋಳಿಕ ಸೂಚಕ ಸಂಪತ್ತು', short: 'GI Treasures', img: 'mysoreSilk' },
  { path: '/economy', n: 16, en: 'Banks, Industries and Modern Contributions', kn: 'ಬ್ಯಾಂಕುಗಳು, ಉದ್ಯಮಗಳು ಮತ್ತು ಆಧುನಿಕ ಕೊಡುಗೆಗಳು', short: 'Enterprise', img: 'canara' },
  { path: '/office', n: 17, en: 'Kannada Rajyotsava at Our Office', kn: 'ನಮ್ಮ ಕಚೇರಿಯಲ್ಲಿ ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ', short: 'At Our Office', img: 'dollu' },
  { path: '/play', n: 'A–C', en: 'Play: Tongue Twisters, Guess the Monument, Quiz', kn: 'ಆಟ: ನಾಲಿಗೆ ತಿರುಗಿಸುವ ವಾಕ್ಯಗಳು, ಸ್ಮಾರಕ ಗುರುತಿಸಿ, ರಸಪ್ರಶ್ನೆ', short: 'Play', img: 'vittala' },
  { path: '/future', n: 18, en: 'The Future of Karnataka', kn: 'ಕರ್ನಾಟಕದ ಭವಿಷ್ಯ', short: 'The Future', img: 'heroHampi' },
];

const KN_DIGITS = '೦೧೨೩೪೫೬೭೮೯';
export const knNum = (n) => String(n).replace(/[0-9]/g, (d) => KN_DIGITS[d]);
export const chapterByPath = (p) => CHAPTERS.find((c) => c.path === p);
export const nextChapter = (p) => {
  const i = CHAPTERS.findIndex((c) => c.path === p);
  return i >= 0 && i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : null;
};
