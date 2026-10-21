// Present-day (Census 2011) districts mapped to the administrative unit they belonged to before
// reorganisation. Present-day districts were mostly carved out of the older districts, so grouping them
// reproduces the older units closely — but NOT exactly. Known taluk-level exceptions are recorded in `note`.
// Physiographic zone uses the conventional four-fold division (Karavali, Malenadu, Northern and Southern
// Maidan / Bayaluseeme) at district resolution, which is itself a simplification.
export const DISTRICT_1956 = {
  'Bengaluru Urban': { region: 'mysore', old: 'Bangalore', zone: 'southMaidan' },
  'Bengaluru Rural': { region: 'mysore', old: 'Bangalore', zone: 'southMaidan' },
  Ramanagara: { region: 'mysore', old: 'Bangalore', zone: 'southMaidan' },
  Kolar: { region: 'mysore', old: 'Kolar', zone: 'southMaidan' },
  Chikkaballapura: { region: 'mysore', old: 'Kolar', zone: 'southMaidan' },
  Tumakuru: { region: 'mysore', old: 'Tumkur', zone: 'southMaidan' },
  Mysuru: { region: 'mysore', old: 'Mysore', zone: 'southMaidan' },
  Mandya: { region: 'mysore', old: 'Mandya', zone: 'southMaidan' },
  Chamarajanagara: {
    region: 'mysore', old: 'Mysore', zone: 'southMaidan',
    note: 'Kollegal taluk (including today’s Hanur area) belonged to Coimbatore district of Madras State and was transferred to Mysore State in 1956.',
  },
  Hassan: { region: 'mysore', old: 'Hassan', zone: 'malnad' },
  Chikkamagaluru: { region: 'mysore', old: 'Kadur / Chikmagalur', zone: 'malnad' },
  Shivamogga: { region: 'mysore', old: 'Shimoga', zone: 'malnad' },
  Chitradurga: { region: 'mysore', old: 'Chitradurga', zone: 'southMaidan' },
  Davanagere: {
    region: 'mysore', old: 'Chitradurga / Shimoga', zone: 'southMaidan',
    note: 'Formed in 1997, mostly from Chitradurga and Shimoga districts; its Harapanahalli taluk came from Bellary district.',
  },
  Belagavi: { region: 'bombay', old: 'Belgaum', zone: 'northMaidan', note: 'Chandgad taluk of the old Belgaum district remained in Bombay State.' },
  Vijayapura: { region: 'bombay', old: 'Bijapur', zone: 'northMaidan' },
  Bagalkote: { region: 'bombay', old: 'Bijapur', zone: 'northMaidan' },
  Dharwad: { region: 'bombay', old: 'Dharwar', zone: 'northMaidan' },
  Gadag: { region: 'bombay', old: 'Dharwar', zone: 'northMaidan' },
  Haveri: { region: 'bombay', old: 'Dharwar', zone: 'northMaidan' },
  'Uttara Kannada': { region: 'bombay', old: 'North Kanara', zone: 'coast' },
  Kalaburagi: { region: 'hyderabad', old: 'Gulbarga', zone: 'northMaidan', note: 'Some taluks of the old Gulbarga district (e.g. Kodangal, Tandur) went to Andhra Pradesh.' },
  Yadgir: { region: 'hyderabad', old: 'Gulbarga', zone: 'northMaidan' },
  Bidar: { region: 'hyderabad', old: 'Bidar', zone: 'northMaidan', note: 'Several taluks of the old Bidar district (e.g. Udgir, Ahmadpur, Nilanga) went to Bombay State.' },
  Raichur: { region: 'hyderabad', old: 'Raichur', zone: 'northMaidan', note: 'Alampur and Gadwal taluks of the old Raichur district went to Andhra Pradesh.' },
  Koppal: { region: 'hyderabad', old: 'Raichur', zone: 'northMaidan' },
  'Dakshina Kannada': { region: 'madras', old: 'South Kanara', zone: 'coast', note: 'Kasaragod taluk of old South Kanara went to Kerala.' },
  Udupi: { region: 'madras', old: 'South Kanara', zone: 'coast' },
  Kodagu: { region: 'coorg', old: 'Coorg State', zone: 'malnad' },
  Ballari: {
    region: 'bellary', old: 'Bellary', zone: 'northMaidan',
    note: 'Transferred from Madras to Mysore State on 1 October 1953 (Andhra State Act, 1953); Adoni, Alur and Rayadurg taluks went to Andhra. Today’s Vijayanagara district (2021) is included here.',
  },
};

export const REGIONS_1956 = {
  mysore: { label: 'Old Mysore State', kn: 'ಹಳೆ ಮೈಸೂರು', color: '#C9A227', joined: 'Core of the enlarged state' },
  bombay: { label: 'Bombay Karnataka', kn: 'ಮುಂಬೈ ಕರ್ನಾಟಕ', color: '#2F5D8A', joined: '1 Nov 1956 · from Bombay State' },
  hyderabad: { label: 'Hyderabad Karnataka', kn: 'ಹೈದರಾಬಾದ್ ಕರ್ನಾಟಕ', color: '#7A3E6B', joined: '1 Nov 1956 · from Hyderabad State' },
  madras: { label: 'Madras Karnataka (South Kanara, Kollegal)', kn: 'ಮದ್ರಾಸ್ ಕರ್ನಾಟಕ', color: '#2E7D6B', joined: '1 Nov 1956 · from Madras State' },
  coorg: { label: 'Coorg (Kodagu)', kn: 'ಕೊಡಗು', color: '#9C4A2F', joined: '1 Nov 1956 · Part C State merged' },
  bellary: { label: 'Bellary', kn: 'ಬಳ್ಳಾರಿ', color: '#B9772E', joined: '1 Oct 1953 · from Madras State' },
};

export const UNIFICATION_STAGES = [
  {
    id: 'before', year: 'Before 1953',
    title: 'Kannada speakers across five administrations',
    body: 'Kannada-speaking districts were divided between the princely state of Mysore, the Bombay and Madras presidencies (later states), the Nizam’s Hyderabad State and the small province of Coorg. Each had different laws, schools and official languages.',
    show: ['mysore', 'bombay', 'hyderabad', 'madras', 'coorg', 'bellary'], merged: [],
  },
  {
    id: '1953', year: '1 Oct 1953',
    title: 'Bellary joins Mysore State',
    body: 'When Andhra State was carved out of Madras, most of Bellary district — including Hampi — was transferred to Mysore State under the Andhra State Act, 1953.',
    show: ['mysore', 'bombay', 'hyderabad', 'madras', 'coorg', 'bellary'], merged: ['mysore', 'bellary'],
  },
  {
    id: '1956', year: '1 Nov 1956',
    title: 'The enlarged Mysore State',
    body: 'Under the States Reorganisation Act, 1956 (Section 7), four districts of Bombay State, three of Hyderabad State, South Kanara (except Kasaragod) and Kollegal taluk from Madras, and Coorg joined Mysore State. This is the day celebrated as Kannada Rajyotsava.',
    show: ['mysore', 'bombay', 'hyderabad', 'madras', 'coorg', 'bellary'], merged: ['mysore', 'bellary', 'bombay', 'hyderabad', 'madras', 'coorg'],
  },
  {
    id: '1973', year: '1 Nov 1973',
    title: 'Mysore becomes Karnataka',
    body: 'The Mysore State (Alteration of Name) Act, 1973 renamed the state Karnataka, with effect from 1 November 1973, during the chief ministership of D. Devaraj Urs.',
    show: [], merged: ['mysore', 'bellary', 'bombay', 'hyderabad', 'madras', 'coorg'], renamed: true,
  },
];
