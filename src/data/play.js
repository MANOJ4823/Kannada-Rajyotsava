// status: 'traditional' (widely known), 'adaptation', or 'composed' (written for this site and flagged for
// review by a fluent Kannada speaker before the event).
export const TWISTERS = [
  { kn: 'ತರಿಕೆರೆ ಏರಿ ಮೇಲೆ ಮೂರು ಕರಿ ಕುರಿ ಮರಿ ಮೇಯ್ತಿತ್ತು', tr: 'Tarikere ēri mēle mūru kari kuri mari mēyttittu', en: 'On the bund of the Tarikere tank, three little black lambs were grazing.', level: 3, status: 'traditional' },
  { kn: 'ಕಾಗೆ ಪುಕ್ಕ, ಗುಬ್ಬಿ ಪುಕ್ಕ', tr: 'kāge pukka, gubbi pukka', en: 'Crow’s feather, sparrow’s feather. (Say it five times, fast.)', level: 1, status: 'traditional' },
  { kn: 'ಕೆಂಪು ಲಾರಿ, ಹಳದಿ ಲಾರಿ', tr: 'kempu lāri, haḷadi lāri', en: 'Red lorry, yellow lorry — the English classic in Kannada.', level: 2, status: 'adaptation' },
  { kn: 'ಕಪ್ಪು ಕಾಗೆ ಕೊಪ್ಪರಿಗೆ ಕುಕ್ಕಿತು', tr: 'kappu kāge kopparige kukkitu', en: 'The black crow pecked at the big cauldron.', level: 2, status: 'composed' },
  { kn: 'ಅರಮನೆ ಅಂಗಳದಲ್ಲಿ ಆರು ಆನೆ ಆಡುತ್ತಿದ್ದವು', tr: 'aramane aṅgaḷadalli āru āne āḍuttiddavu', en: 'Six elephants were playing in the palace courtyard.', level: 2, status: 'composed' },
  { kn: 'ಕುರುಡು ಕುದುರೆ ಕೆರೆ ದಡದಲ್ಲಿ ಕಡಲೆ ಕಡಿಯಿತು', tr: 'kuruḍu kudure kere daḍadalli kaḍale kaḍiyitu', en: 'A blind horse munched chickpeas on the lake shore.', level: 3, status: 'composed' },
  { kn: 'ಸುರಿಯುವ ಮಳೆಯಲ್ಲಿ ಸರಸರನೆ ಸರಿದ ಸರ್ಪ', tr: 'suriyuva maḷeyalli sarasarane sarida sarpa', en: 'In the pouring rain, a snake slid swiftly away.', level: 2, status: 'composed' },
  { kn: 'ಬಾಳೆ ಎಲೆ ಮೇಲೆ ಹೋಳಿಗೆ, ಹೋಳಿಗೆ ಮೇಲೆ ತುಪ್ಪ', tr: 'bāḷe ele mēle hōḷige, hōḷige mēle tuppa', en: 'Holige on a banana leaf, ghee on the holige. (Practise ḷ and l!)', level: 3, status: 'composed' },
  { kn: 'ಹತ್ತು ಹತ್ತಿ ಹೂವಿನ ಹತ್ತಿರ ಹತ್ತು ಹಕ್ಕಿ', tr: 'hattu hatti hūvina hattira hattu hakki', en: 'Ten birds near ten cotton flowers.', level: 3, status: 'composed' },
  { kn: 'ಹಳೆ ಹಲಸಿನ ಹಣ್ಣು ಹಳದಿ ಹಳದಿ', tr: 'haḷe halasina haṇṇu haḷadi haḷadi', en: 'The old jackfruit is all yellow.', level: 3, status: 'composed' },
];

// Guess the monument — uses the same verified photographs as the heritage chapters.
export const GUESS = [
  { img: 'stoneChariot', answer: 'Vittala Temple stone chariot, Hampi', options: ['Vittala Temple stone chariot, Hampi', 'Konark Sun Temple', 'Pattadakal', 'Mahabalipuram'],
    hist: 'Vijaya Vitthala temple, Vijayanagara', where: 'Hampi, Vijayanagara district', who: 'Karnata (Vijayanagara) Empire, 16th century', unesco: 'UNESCO World Heritage (Hampi, 1986)', fact: 'The “chariot” is actually a shrine to Garuda, built to resemble a processional chariot.', link: '/monuments' },
  { img: 'badamiCliff', answer: 'Badami Cave Temples', options: ['Ajanta Caves', 'Badami Cave Temples', 'Udayagiri Caves', 'Ellora Caves'],
    hist: 'Vatapi', where: 'Badami, Bagalkot district', who: 'Badami Chalukyas, 6th century', unesco: 'On India’s UNESCO Tentative List (with Aihole and Pattadakal)', fact: 'Cave 3 carries an inscription dating it to 578 CE.', link: '/kingdoms#chalukya' },
  { img: 'pattadakal', answer: 'Pattadakal', options: ['Aihole', 'Pattadakal', 'Lakkundi', 'Belur'],
    hist: 'Kisuvolal', where: 'Bagalkot district', who: 'Badami Chalukyas, 7th–8th centuries', unesco: 'UNESCO World Heritage (1987)', fact: 'Northern- and southern-style temples stand side by side here.', link: '/monuments' },
  { img: 'durgaAihole', answer: 'Durga temple, Aihole', options: ['Durga temple, Aihole', 'Hoysaleswara Temple', 'Virupaksha Temple', 'Kailasa Temple'],
    hist: 'Ayyavole', where: 'Aihole, Bagalkot district', who: 'Chalukya period', unesco: 'On India’s UNESCO Tentative List', fact: 'Its rounded (apsidal) plan is unusual among Hindu temples.', link: '/monuments' },
  { img: 'belur', answer: 'Chennakeshava Temple, Belur', options: ['Chennakeshava Temple, Belur', 'Meenakshi Temple', 'Vittala Temple', 'Somanathapura Keshava Temple'],
    hist: 'Velapuri', where: 'Belur, Hassan district', who: 'Hoysala king Vishnuvardhana, 1117 CE', unesco: 'UNESCO World Heritage (Hoysala ensembles, 2023)', fact: 'It has been in continuous worship for over 900 years.', link: '/kingdoms#hoysala' },
  { img: 'halebidu', answer: 'Hoysaleswara Temple, Halebidu', options: ['Brihadisvara Temple', 'Hoysaleswara Temple, Halebidu', 'Mysore Palace', 'Itagi Mahadeva Temple'],
    hist: 'Dorasamudra', where: 'Halebidu, Hassan district', who: 'Hoysala, 12th century', unesco: 'UNESCO World Heritage (Hoysala ensembles, 2023)', fact: '“Halebidu” means “old capital”.', link: '/monuments' },
  { img: 'kailasa', answer: 'Kailasa Temple, Ellora', options: ['Kailasa Temple, Ellora', 'Badami Cave 3', 'Elephanta Caves', 'Pattadakal'],
    hist: 'Elapura', where: 'Ellora, Maharashtra', who: 'Associated with Rashtrakuta king Krishna I, 8th century', unesco: 'UNESCO World Heritage (Ellora Caves, 1983)', fact: 'It was carved downward from a single rock — nothing was built up.', link: '/kingdoms#rashtrakuta' },
  { img: 'mysorePalace', answer: 'Mysore Palace', options: ['Bengaluru Palace', 'Mysore Palace', 'Lalitha Mahal', 'Laxmi Vilas Palace'],
    hist: 'Amba Vilas', where: 'Mysuru', who: 'Wadiyar dynasty, 1897–1912', unesco: 'Not a World Heritage Site', fact: 'It was rebuilt after a fire destroyed the earlier wooden palace in 1897.', link: '/monuments' },
  { img: 'chitradurgaFort', answer: 'Chitradurga Fort', options: ['Golconda Fort', 'Chitradurga Fort', 'Bidar Fort', 'Gingee Fort'],
    hist: 'Elusuttina Kote', where: 'Chitradurga', who: 'Chitradurga Nayakas, with later additions', unesco: 'Not a World Heritage Site', fact: 'Onake Obavva’s story is linked to a gap in its walls.', link: '/kingdoms#regional' },
  { img: 'vidhanaSoudha', answer: 'Vidhana Soudha, Bengaluru', options: ['Rashtrapati Bhavan', 'Vidhana Soudha, Bengaluru', 'Mysore Palace', 'Attara Kacheri'],
    hist: '—', where: 'Bengaluru', who: 'Mysore State government, completed 1956', unesco: 'Not a World Heritage Site', fact: 'It houses both houses of the Karnataka legislature.', link: '/vidhana-soudha' },
  { img: 'jog', answer: 'Jog Falls', options: ['Athirappilly Falls', 'Dudhsagar Falls', 'Jog Falls', 'Shivanasamudra Falls'],
    hist: 'Gerusoppa Falls', where: 'Shivamogga / Uttara Kannada', who: 'Natural landmark on the Sharavathi', unesco: 'Natural landmark — not a monument', fact: 'The river drops about 253 metres in four streams.', link: '/geography' },
];

const Q = (q, options, answer, explain, link) => ({ q, options, answer, explain, link });
export const QUIZ = {
  beginner: [
    Q('In which year were Kannada-speaking regions brought together into an enlarged Mysore State?', ['1947', '1950', '1956', '1973'], '1956', 'On 1 November 1956, under the States Reorganisation Act. That day is celebrated as Kannada Rajyotsava.', '/unification'),
    Q('When was Mysore State renamed Karnataka?', ['1956', '1966', '1973', '1981'], '1973', 'The renaming took effect on 1 November 1973.', '/unification'),
    Q('What does “ನಮಸ್ಕಾರ” (namaskāra) mean?', ['Thank you', 'Hello / greetings', 'Goodbye', 'Welcome to dinner'], 'Hello / greetings', 'A respectful greeting suitable for anyone, anytime.', '/kannada#phrasebook'),
    Q('What does “ಧನ್ಯವಾದಗಳು” (dhanyavādagaḷu) mean?', ['Sorry', 'Thank you', 'How are you?', 'Very tasty'], 'Thank you', 'The standard way to thank someone in Kannada.', '/kannada#phrasebook'),
    Q('Who wrote Karnataka’s state anthem, “Jaya Bharata Jananiya Tanujate”?', ['D. R. Bendre', 'Kuvempu', 'Shivaram Karanth', 'Masti Venkatesha Iyengar'], 'Kuvempu', 'Kuvempu’s song was declared the state song in 2004.', '/bhuvaneshwari'),
    Q('Which sweet is traditionally linked to the kitchens of the Mysore Palace?', ['Dharwad peda', 'Mysore pak', 'Chiroti', 'Kobbari mithai'], 'Mysore pak', 'Tradition credits the royal cook Kakasura Madappa.', '/food#mysore-pak'),
    Q('What is Karnataka’s state bird?', ['Peacock', 'Indian roller', 'Common myna', 'Kingfisher'], 'Indian roller', 'Known in Kannada as ನೀಲಕಂಠ (Neelakanta).', '/symbols'),
    Q('Which city gives its name to a famous milk-based sweet with a GI tag?', ['Hubballi', 'Dharwad', 'Mangaluru', 'Kalaburagi'], 'Dharwad', '“Dharwad Pedha” is a registered Geographical Indication.', '/gi'),
  ],
  intermediate: [
    Q('The Badami Chalukya capital was historically called…', ['Vatapi', 'Manyakheta', 'Dorasamudra', 'Banavasi'], 'Vatapi', 'Vatapi is today’s Badami. Manyakheta was the Rashtrakuta capital and Dorasamudra the Hoysala capital.', '/kingdoms#chalukya'),
    Q('Who commissioned the Gommateshwara statue at Shravanabelagola?', ['Sri Krishnadevaraya', 'Pulakeshin II', 'Chavundaraya', 'Vishnuvardhana'], 'Chavundaraya', 'Chavundaraya, minister of the Western Ganga king Rachamalla IV, around 983 CE.', '/kingdoms#ganga'),
    Q('Which river flows past Hampi?', ['Kaveri', 'Tungabhadra', 'Sharavathi', 'Netravati'], 'Tungabhadra', 'The Karnata (Vijayanagara) capital grew on the rocky banks of the Tungabhadra.', '/land'),
    Q('Halebidu’s historical name is…', ['Velapuri', 'Dorasamudra', 'Kisuvolal', 'Vaijayanti'], 'Dorasamudra', 'Dorasamudra (Dwarasamudra) was the Hoysala capital; Velapuri is Belur.', '/kingdoms#hoysala'),
    Q('Which Jnanpith laureate wrote Mookajjiya Kanasugalu?', ['U. R. Ananthamurthy', 'K. Shivaram Karanth', 'Girish Karnad', 'V. K. Gokak'], 'K. Shivaram Karanth', 'Karanth received the Jnanpith in 1977 for this novel.', '/literature'),
    Q('What is the highest peak in Karnataka?', ['Kudremukh', 'Mullayanagiri', 'Nandi Hills', 'Tadiandamol'], 'Mullayanagiri', 'About 1,925 metres, in Chikkamagaluru district.', '/geography'),
    Q('Neer dose is most associated with which region?', ['North Karnataka', 'Coastal Karnataka', 'Kalyana Karnataka', 'Old Mysore'], 'Coastal Karnataka', 'It is a Tulu Nadu staple made from a thin rice batter.', '/food'),
    Q('At which city did Basavanna and the vachana movement flourish in the 12th century?', ['Hampi', 'Kalyana', 'Belur', 'Banavasi'], 'Kalyana', 'Kalyana — today’s Basavakalyan in Bidar district.', '/kannada'),
  ],
  advanced: [
    Q('The Halmidi inscription is generally dated to which century?', ['2nd century BCE', '5th century CE', '9th century CE', '12th century CE'], '5th century CE', 'It is a major early Kannada inscription — but not necessarily the earliest Kannada ever written, and some scholars propose a later date.', '/kannada'),
    Q('The authorship of the Kavirajamarga (c. 850) is…', ['Certainly Pampa', 'Debated between Amoghavarsha I and the poet Srivijaya', 'Certainly Kuvempu', 'Unknown — it is anonymous folklore'], 'Debated between Amoghavarsha I and the poet Srivijaya', 'It comes from the Rashtrakuta court; scholars disagree on whether the king or his court poet wrote it.', '/literature'),
    Q('Which Ashokan edict site in Karnataka was the first to reveal the emperor’s name, “Asoka”?', ['Brahmagiri', 'Maski', 'Sannati', 'Siddapura'], 'Maski', 'Found in 1915, the Maski edict named “Devanampiya Asoka”, confirming that “Devanampiya” edicts were Ashoka’s.', '/land'),
    Q('Kollegal taluk joined Mysore State in 1956 from which state?', ['Bombay', 'Hyderabad', 'Madras', 'Coorg'], 'Madras', 'Kollegal was part of Coimbatore district in Madras State.', '/unification'),
    Q('When did most of Bellary district (including Hampi) join Mysore State?', ['1947', '1953', '1956', '1973'], '1953', 'On 1 October 1953, when Andhra State was formed from Madras.', '/unification'),
    Q('The Kailasa Temple at Ellora is associated with which ruler?', ['Pulakeshin II', 'Krishna I of the Rashtrakutas', 'Sri Krishnadevaraya', 'Vikramaditya VI'], 'Krishna I of the Rashtrakutas', 'The attribution rests on Rashtrakuta grants. The temple is in present-day Maharashtra.', '/kingdoms#rashtrakuta'),
    Q('Which of these is a registered Geographical Indication?', ['Mysore pak', 'Bisi bele bath', 'Byadagi chilli', 'Girmit'], 'Byadagi chilli', 'Byadgi chilli was registered in 2010–11. Famous dishes are not automatically GIs.', '/gi'),
    Q('When were the Sacred Ensembles of the Hoysalas inscribed as a UNESCO World Heritage Site?', ['1986', '1999', '2014', '2023'], '2023', 'Belur, Halebidu and Somanathapura were inscribed together in 2023.', '/monuments'),
    Q('Who composed the Aihole inscription of 634 CE?', ['Ranna', 'Ravikirti', 'Bilhana', 'Pampa'], 'Ravikirti', 'Pulakeshin II’s court poet, writing in Sanskrit on the Meguti temple.', '/kingdoms#chalukya'),
    Q('Gulvadi Venkata Rao’s Indira Bai (1899) is significant because…', ['It is the first Kannada film script', 'It is widely regarded as the first original social novel in Kannada', 'It won the first Jnanpith', 'It is the oldest Kannada inscription'], 'It is widely regarded as the first original social novel in Kannada', 'Scholars define “first novel” differently because of earlier translations and adaptations.', '/literature'),
  ],
};
