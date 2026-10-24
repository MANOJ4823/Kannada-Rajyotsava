// Kannada script explorer, phrasebook and language-diversity content.
// Transliteration follows a simplified ISO 15919 style (ā = long a, ḷ = retroflex l, etc.).
export const VOWELS = [
  ['ಅ', 'a', 'ಅಮ್ಮ', 'amma', 'mother'], ['ಆ', 'ā', 'ಆನೆ', 'āne', 'elephant'], ['ಇ', 'i', 'ಇಲಿ', 'ili', 'mouse'], ['ಈ', 'ī', 'ಈಗ', 'īga', 'now'],
  ['ಉ', 'u', 'ಉಪ್ಪು', 'uppu', 'salt'], ['ಊ', 'ū', 'ಊಟ', 'ūṭa', 'meal'], ['ಋ', 'ṛ', 'ಋಷಿ', 'ṛṣi', 'sage'], ['ಎ', 'e', 'ಎಲೆ', 'ele', 'leaf'],
  ['ಏ', 'ē', 'ಏಣಿ', 'ēṇi', 'ladder'], ['ಐ', 'ai', 'ಐದು', 'aidu', 'five'], ['ಒ', 'o', 'ಒಂದು', 'ondu', 'one'], ['ಓ', 'ō', 'ಓದು', 'ōdu', 'read'],
  ['ಔ', 'au', 'ಔಷಧ', 'auṣadha', 'medicine'], ['ಅಂ', 'aṁ', 'ಅಂಗಡಿ', 'aṅgaḍi', 'shop'], ['ಅಃ', 'aḥ', 'ದುಃಖ', 'duḥkha', 'sorrow'],
];
export const CONSONANTS = [
  ['ಕ', 'ka', 'ಕಮಲ', 'kamala', 'lotus'], ['ಖ', 'kha', 'ಖಡ್ಗ', 'khaḍga', 'sword'], ['ಗ', 'ga', 'ಗಡಿಯಾರ', 'gaḍiyāra', 'clock'], ['ಘ', 'gha', 'ಘಂಟೆ', 'ghaṇṭe', 'bell'], ['ಙ', 'ṅa', '', '', 'a rare letter, seen mostly in older or Sanskrit-derived spellings'],
  ['ಚ', 'ca', 'ಚಮಚ', 'camaca', 'spoon'], ['ಛ', 'cha', 'ಛತ್ರಿ', 'chatri', 'umbrella'], ['ಜ', 'ja', 'ಜಲ', 'jala', 'water'], ['ಝ', 'jha', 'ಝರಿ', 'jhari', 'stream'], ['ಞ', 'ña', 'ಜ್ಞಾನ', 'jñāna', 'knowledge'],
  ['ಟ', 'ṭa', 'ಟಗರು', 'ṭagaru', 'ram'], ['ಠ', 'ṭha', 'ಮಠ', 'maṭha', 'monastery'], ['ಡ', 'ḍa', 'ಡಮರು', 'ḍamaru', 'hand drum'], ['ಢ', 'ḍha', 'ಢಕ್ಕೆ', 'ḍhakke', 'large drum'], ['ಣ', 'ṇa', 'ಹಣ', 'haṇa', 'money'],
  ['ತ', 'ta', 'ತಟ್ಟೆ', 'taṭṭe', 'plate'], ['ಥ', 'tha', 'ರಥ', 'ratha', 'chariot'], ['ದ', 'da', 'ದನ', 'dana', 'cattle'], ['ಧ', 'dha', 'ಧ್ವಜ', 'dhvaja', 'flag'], ['ನ', 'na', 'ನವಿಲು', 'navilu', 'peacock'],
  ['ಪ', 'pa', 'ಪಟ', 'paṭa', 'kite'], ['ಫ', 'pha', 'ಫಲ', 'phala', 'fruit'], ['ಬ', 'ba', 'ಬಸ್ಸು', 'bassu', 'bus'], ['ಭ', 'bha', 'ಭೂಮಿ', 'bhūmi', 'earth'], ['ಮ', 'ma', 'ಮನೆ', 'mane', 'house'],
  ['ಯ', 'ya', 'ಯಂತ್ರ', 'yantra', 'machine'], ['ರ', 'ra', 'ರಾಗಿ', 'rāgi', 'finger millet'], ['ಲ', 'la', 'ಲತೆ', 'late', 'creeper'], ['ವ', 'va', 'ವೀಣೆ', 'vīṇe', 'veena'], ['ಶ', 'śa', 'ಶಂಖ', 'śaṅkha', 'conch'],
  ['ಷ', 'ṣa', 'ಷಟ್ಪದಿ', 'ṣaṭpadi', 'six-line verse'], ['ಸ', 'sa', 'ಸಕ್ಕರೆ', 'sakkare', 'sugar'], ['ಹ', 'ha', 'ಹಸು', 'hasu', 'cow'], ['ಳ', 'ḷa', 'ಬಾಳೆ', 'bāḷe', 'banana'],
];
// Kannada numerals (glyph, value, number word, transliteration, English).
export const NUMERALS = [
  ['೦', '0', 'ಸೊನ್ನೆ', 'sonne', 'zero'], ['೧', '1', 'ಒಂದು', 'ondu', 'one'], ['೨', '2', 'ಎರಡು', 'eraḍu', 'two'], ['೩', '3', 'ಮೂರು', 'mūru', 'three'],
  ['೪', '4', 'ನಾಲ್ಕು', 'nālku', 'four'], ['೫', '5', 'ಐದು', 'aidu', 'five'], ['೬', '6', 'ಆರು', 'āru', 'six'], ['೭', '7', 'ಏಳು', 'ēḷu', 'seven'],
  ['೮', '8', 'ಎಂಟು', 'eṇṭu', 'eight'], ['೯', '9', 'ಒಂಬತ್ತು', 'ombattu', 'nine'], ['೧೦', '10', 'ಹತ್ತು', 'hattu', 'ten'],
];
export const VOWEL_SIGNS = [['', 'a'], ['ಾ', 'ā'], ['ಿ', 'i'], ['ೀ', 'ī'], ['ು', 'u'], ['ೂ', 'ū'], ['ೃ', 'ṛ'], ['ೆ', 'e'], ['ೇ', 'ē'], ['ೈ', 'ai'], ['ೊ', 'o'], ['ೋ', 'ō'], ['ೌ', 'au'], ['ಂ', 'aṁ'], ['ಃ', 'aḥ']];

export const PHRASES = [
  { kn: 'ನಮಸ್ಕಾರ', tr: 'namaskāra', en: 'Hello / greetings (formal and friendly)', tag: 'Greetings' },
  { kn: 'ಹೇಗಿದ್ದೀರಾ?', tr: 'hēgiddīrā?', en: 'How are you? (respectful)', tag: 'Greetings' },
  { kn: 'ಚೆನ್ನಾಗಿದ್ದೀನಿ', tr: 'cennāgiddīni', en: 'I am fine', tag: 'Greetings' },
  { kn: 'ಧನ್ಯವಾದಗಳು', tr: 'dhanyavādagaḷu', en: 'Thank you', tag: 'Greetings' },
  { kn: 'ಬನ್ನಿ', tr: 'banni', en: 'Please come / welcome (respectful)', tag: 'Greetings' },
  { kn: 'ಹೋಗಿ ಬರ್ತೀನಿ', tr: 'hōgi bartīni', en: 'Goodbye — literally “I’ll go and come back”', tag: 'Greetings' },
  { kn: 'ನಿಮ್ಮ ಹೆಸರು ಏನು?', tr: 'nimma hesaru ēnu?', en: 'What is your name?', tag: 'Meeting people' },
  { kn: 'ನನ್ನ ಹೆಸರು …', tr: 'nanna hesaru …', en: 'My name is …', tag: 'Meeting people' },
  { kn: 'ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು', tr: 'nimmannu bhēṭiyāgi santōṣavāyitu', en: 'Happy to have met you', tag: 'Meeting people' },
  { kn: 'ಸ್ವಲ್ಪ ಸ್ವಲ್ಪ ಕನ್ನಡ ಗೊತ್ತು', tr: 'svalpa svalpa kannaḍa gottu', en: 'I know a little Kannada', tag: 'Meeting people' },
  { kn: 'ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೀನಿ', tr: 'kannaḍa kaliyuttiddīni', en: 'I am learning Kannada', tag: 'Meeting people' },
  { kn: 'ಊಟ ಆಯ್ತಾ?', tr: 'ūṭa āytā?', en: 'Have you eaten? — a warm, everyday way of asking after someone', tag: 'At the office' },
  { kn: 'ಕಾಫಿ ಕುಡಿಯೋಣವಾ?', tr: 'kāphi kuḍiyōṇavā?', en: 'Shall we have coffee?', tag: 'At the office' },
  { kn: 'ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡಿ', tr: 'svalpa aḍjasṭ māḍi', en: 'Please adjust a little — Bengaluru’s famous phrase of everyday give-and-take', tag: 'At the office' },
  { kn: 'ಸರಿ', tr: 'sari', en: 'Okay / correct', tag: 'At the office' },
  { kn: 'ಹೌದು · ಇಲ್ಲ', tr: 'haudu · illa', en: 'Yes · No', tag: 'At the office' },
  { kn: 'ಕ್ಷಮಿಸಿ', tr: 'kṣamisi', en: 'Sorry / excuse me', tag: 'At the office' },
  { kn: 'ಇದು ಎಷ್ಟು?', tr: 'idu eṣṭu?', en: 'How much is this?', tag: 'Out and about' },
  { kn: 'ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?', tr: 'ellige hōgabēku?', en: 'Where do you need to go?', tag: 'Out and about' },
  { kn: 'ನಿಧಾನವಾಗಿ ಹೇಳಿ', tr: 'nidhānavāgi hēḷi', en: 'Please say it slowly', tag: 'Out and about' },
  { kn: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು', tr: 'kannaḍa rājyōtsavada hārdika śubhāśayagaḷu', en: 'Heartfelt wishes on Kannada Rajyotsava', tag: 'Rajyotsava' },
  { kn: 'ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ', tr: 'sirigannaḍaṁ gelge', en: 'May glorious Kannada prevail — a classic Rajyotsava salutation', tag: 'Rajyotsava' },
];

export const FAMILY = [
  { branch: 'South Dravidian I', langs: ['Kannada', 'Tamil', 'Malayalam', 'Tulu', 'Kodava', 'Badaga', 'Toda', 'Kota', 'Beary*'] },
  { branch: 'South Dravidian II (South-Central)', langs: ['Telugu', 'Gondi', 'Kui', 'Kuvi'] },
  { branch: 'Central Dravidian', langs: ['Kolami', 'Parji', 'Gadaba'] },
  { branch: 'North Dravidian', langs: ['Kurukh', 'Malto', 'Brahui'] },
];

// Census of India 2011, mother tongue grouped by language (Karnataka). Rounded.
export const CENSUS_2011 = [
  ['Kannada', 66.5], ['Urdu', 10.8], ['Telugu', 5.8], ['Tamil', 3.5], ['Marathi', 3.4], ['Tulu', 2.6], ['Hindi', 2.0], ['Konkani', 1.3], ['Malayalam', 1.3],
];

export const LANGUAGES = [
  {
    name: 'Tulu', kn: 'ತುಳು', where: 'Dakshina Kannada and Udupi (and Kasaragod in Kerala) — Tulu Nadu',
    body: 'A Dravidian language with a rich oral tradition: paddanas (sung epics) such as the Siri epic, the ritual worlds of bhuta kola and daiva worship, and Tulu Yakshagana. Historically it was written in the Tigalari (Tulu) script; today it is usually written in Kannada script. Karnataka has a Tulu Sahitya Academy, and there is a long-running campaign for its inclusion in the Constitution’s Eighth Schedule. Tulu is not currently an official administrative language of the state.',
  },
  { name: 'Kodava takk', kn: 'ಕೊಡವ ತಕ್ಕ್', where: 'Kodagu', body: 'The Dravidian language of the Kodava people and several other communities of Kodagu, with its own songs, festivals (such as Puttari, the harvest festival) and oral literature.' },
  { name: 'Konkani', kn: 'ಕೊಂಕಣಿ', where: 'Coastal Karnataka, Uttara Kannada and beyond', body: 'An Indo-Aryan language included in the Eighth Schedule in 1992. In Karnataka it is usually written in Kannada script and is spoken by several Hindu, Christian and Muslim communities.' },
  { name: 'Urdu & Dakhni', kn: 'ಉರ್ದು · ದಖ್ಖನಿ', where: 'North Karnataka, Bengaluru and towns across the state', body: 'Dakhni is the Deccan’s own form of Hindustani; Urdu is the state’s second most widely spoken mother tongue.' },
  { name: 'Beary', kn: 'ಬ್ಯಾರಿ', where: 'Dakshina Kannada and Udupi', body: 'The language of the coastal Beary Muslim community, closely related to Malayalam, with its own literature and a Karnataka Beary Sahitya Academy.' },
  { name: 'Lambani (Banjara)', kn: 'ಲಂಬಾಣಿ', where: 'Tandas (settlements) across Karnataka', body: 'An Indo-Aryan language of the Lambani community, whose mirror-work embroidery from Sandur is a registered GI craft.' },
  { name: 'Marathi, Telugu, Tamil, Malayalam', kn: 'ಮರಾಠಿ · ತೆಲುಗು · ತಮಿಳು · ಮಲಯಾಳಂ', where: 'Border regions and cities', body: 'Karnataka shares borders, rivers and families with five states; their languages are spoken across the state, especially in border districts and Bengaluru.' },
  { name: 'Many more', kn: 'ಇನ್ನೂ ಹಲವು', where: 'Across the state', body: 'Havyaka and Arebhashe (varieties of Kannada), Sanketi, Saurashtri, Siddi communities speaking Kannada and Konkani, Soliga and other tribal languages, Hindi in the cities — and the many languages colleagues bring to Bengaluru.' },
];

// Conventional periodisation of the language. Boundaries are approximate and overlap.
export const STAGES = [
  { name: 'Halegannada', kn: 'ಹಳೆಗನ್ನಡ', en: 'Old Kannada', when: 'c. 9th–12th century',
    body: 'The language of the Rashtrakuta and Kalyani Chalukya courts and of the great Jain poets. It still used the letters ಱ (ṟa) and ೞ (ḻa), and its classical poetry mixed verse and prose in the champu style, rich in Sanskrit vocabulary.',
    works: 'Kavirajamarga (c. 850); Pampa’s Adipurana and Vikramarjuna Vijaya (941); Ponna and Ranna' },
  { name: 'Nadugannada', kn: 'ನಡುಗನ್ನಡ', en: 'Middle Kannada', when: 'c. 12th–17th century',
    body: 'Closer to the speech of ordinary people. An initial “p” in many words became “h”, the letters ಱ and ೞ fell out of use, and native metres such as the ragale, shatpadi and sangatya replaced the courtly champu.',
    works: 'Vachanas of the 12th century, often seen as the start of the shift; Harihara and Raghavanka; Kumaravyasa’s Karnata Bharata Kathamanjari; the Haridasa songs' },
  { name: 'Hosagannada', kn: 'ಹೊಸಗನ್ನಡ', en: 'Modern Kannada', when: 'c. 18th century to today',
    body: 'Most words that once ended in a consonant gained a final vowel, and a standard prose grew with printing, newspapers and schools in the 19th century. It is the Kannada of the Navodaya poets, of cinema and of everyday conversation today.',
    works: 'Muddana’s prose; Kuvempu, D. R. Bendre and the Navodaya movement; the Kannada spoken and written today' },
];

// One word through the three stages: “milk”
export const MILK = [['ಪಾಲ್', 'pāl', 'Halegannada'], ['ಹಾಲ್', 'hāl', 'Nadugannada'], ['ಹಾಲು', 'hālu', 'Hosagannada']];

export const KANNADA_TIMELINE = [
  { when: '5th century', t: 'Halmidi inscription', d: 'A major early Kannada inscription, generally dated to the 5th century CE. Not necessarily the first Kannada ever written — earlier Kannada words appear in Prakrit and other records.' },
  { when: 'c. 700', t: 'Kappe Arabhatta inscription, Badami', d: 'Early Kannada verse in the tripadi metre.' },
  { when: 'c. 850', t: 'Kavirajamarga', d: 'The earliest available Kannada work on poetics, from the Rashtrakuta court.' },
  { when: '941', t: 'Pampa’s Adipurana and Vikramarjuna Vijaya', d: 'Classical (Halegannada) champu poetry.' },
  { when: '12th century', t: 'Vachana literature', d: 'Basavanna, Akka Mahadevi, Allama Prabhu and many others write in direct, everyday Kannada.' },
  { when: '1260', t: 'Shabdamanidarpana', d: 'Kesiraja’s classic grammar of Kannada.' },
  { when: '15th–16th centuries', t: 'Haridasa songs; Kumaravyasa', d: 'Devotional songs in Kannada carry music to every home.' },
  { when: '1843', t: 'Mangalooru Samachara', d: 'Among the first Kannada newspapers, published by the Basel Mission in Mangaluru.' },
  { when: '1894', t: 'Kittel’s dictionary', d: 'Ferdinand Kittel’s Kannada–English dictionary.' },
  { when: '1915', t: 'Kannada Sahitya Parishat', d: 'Founded in Bengaluru to promote Kannada literature.' },
  { when: '1934', t: 'Sati Sulochana', d: 'The first Kannada sound film.' },
  { when: '2008', t: 'Classical language', d: 'Government of India declares Kannada a classical language.' },
];
