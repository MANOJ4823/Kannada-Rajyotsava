// Adds new image keys to src/data/images.json WITHOUT re-resolving existing ones.
// Usage: node scripts/add-images.mjs   (edit ADD below; existing keys are never overwritten)
import fs from 'node:fs';

const ADD = {
  ottuShavige: 'Shavige Kai Halu - Bhatru Hotel, Hebri - Karnataka - PXL4225.jpg',
  kadubu: 'Kadubu 2.jpg',
  veeragasePerformance: 'Veeragaase 01.JPG',
  kolata: 'Kolatha by Kodava Youth- 26-10-2013-P M Muthanna.jpg',
  ninasam: 'Ninasam Heggodu.jpg',
  bhuvaneshwariShrine: 'Decorative bay ceiling in the Pampa Devi-Bhuvaneshwari shrine within the Virupaksha temple complex at Hampi.JPG',
  bellaryFort: 'Bellary Fort3.jpg',
  lalithaMahal: 'Lalitha Mahal Palace Hotel.jpg',
  jaganmohan: 'A view of Jaganmohan Palace.jpg',
  shivappaPalace: 'Shivappa Nayaka Palace in Shivamogga.JPG',
  ranginMahal: 'Rangeen Mahal at Bidar Fort.jpg',
  ashturTombs: 'Bahamani Tombs.JPG',
  baridTombs: 'Barid Shahi 05.jpg',
  jamaBijapur: 'JUMA MASJID BIJAPUR.jpg',
  jamaGulbarga: 'Great Mosque in Gulbarga Fort..jpg',
  iskcon: 'ISKCON Bangalore Temple.jpg',
  halTejas: 'HAL Tejas MK1A Aero India 2025.jpg',
  bioconPark: 'Biocon Park .jpg',
  maddurVade: 'Maddur vada and Gulab jamun.jpg',
  benneMurukku: 'Benne Mucchore.jpg',
  belagaviKunda: 'Kunda mithai.jpg',
  raveUnde: 'Rava Laddu.jpg',
  kajjaya: 'Ariselu or Adhirasam or Kajjaya or Athirasa.jpg',
  uppittu: 'A photo of Upma.jpg',
  kesariBath: 'KEsari baat.jpg',
  uddinaVade: 'Medu Vada with chutnies.jpg',
  pathrode: 'Pathrode 2.jpg',
  thalipeeth: 'Maharashtrian Thalipith - 1.jpg',
  bassaru: 'Ragi Mudde - Bassaru.jpg',
  pandiCurry: 'Pandi Curry.jpg',
  festDasara: 'Mysore Palace Dussehra Illumination.jpg',
  festKambala: 'Kambala panning.jpg',
  festKaraga: 'Poo Karaga making a final round.JPG',
  festRajyotsava: 'Karnataka Rajyotsava celebration at Belagavi.jpg',
  festMahamastaka: 'Mahamastakabhisheka - Gommateshwara statue (1).jpg',
  festHampi: 'Jaltarang music concert by Vidushi Shashikala Dani at Hampi Utsav.jpg',
  festMelukote: 'Melukote BNC.jpg',
  festTalakaveri: 'Talakaveri Temple, Talacauvery and surroundings (37).jpg',
  festBhutaKola: 'Appe Rakhteshwari Kola.jpg',
  festDaivaKola: 'Tannimaniga daiva.jpg',
  giCoorgOrange: 'Orange selling at Nisargadhama.JPG',
  giMysoreMallige: 'Jasmine0001.JPG',
  giUdupiMallige: 'Udupi Mallige.JPG',
  giBangaloreBlue: 'ಬೆಂಗಳೂರುನೀಲಿದ್ರಾಕ್ಷಿ-BangaloreBlueGrapes.jpg',
  giRoseOnion: 'Bangalore rose onion.jpg',
  giPomelo: 'Babloos Naranga IMG 4323.JPG',
  giAppemidi: 'APPEMIDI1.jpg',
  giTurDal: 'Gulbarga Tur Dal (Unsplit).jpg',
  giKinhal: 'Kinnal toys, Karnataka.jpeg',
  giMonsooned: '2015 0117 Monsooned Malabar beans unroosted.jpg',
  giBetel: 'Betel leafs Selling.JPG',
  giNanjanagud: 'Rasa BaLe HaNNu.JPG',
  giKariIshad: 'Kari Ishad mango.jpg',
  giLambani: 'Lambani embroidery.JPG',
  giChikmagalurCoffee: 'Traditional shade coffee plantation Chikmagalur 1.jpg',
  giBababudangiri: 'Baba Budangiri, Chikmagalur (2024) 74.jpg',
};

const UA = 'NammaKarnatakaRajyotsava/1.0 (educational office celebration site)';
const strip = (h = '') => h.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const path = new URL('../src/data/images.json', import.meta.url);
const images = JSON.parse(fs.readFileSync(path));

for (const [key, file] of Object.entries(ADD)) {
  if (images[key]) { console.log('keep existing', key); continue; }
  const u = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
    action: 'query', prop: 'imageinfo', iiprop: 'url|extmetadata|size', iiurlwidth: '1600', format: 'json', formatversion: '2', titles: 'File:' + file,
  });
  const d = await (await fetch(u, { headers: { 'User-Agent': UA } })).json();
  const ii = d.query.pages[0].imageinfo?.[0];
  if (!ii) { console.log('MISSING', key, file); continue; }
  const m = ii.extmetadata || {};
  images[key] = {
    file, src: ii.thumburl || ii.url, w: ii.thumbwidth || ii.width, h: ii.thumbheight || ii.height, page: ii.descriptionurl,
    author: strip(m.Artist?.value) || 'Unknown author', license: strip(m.LicenseShortName?.value) || 'See source page',
    licenseUrl: m.LicenseUrl?.value || ii.descriptionurl, description: strip(m.ImageDescription?.value).slice(0, 300),
    original: `${ii.width}x${ii.height}`,
  };
  console.log('added', key, images[key].original, images[key].license);
  fs.writeFileSync(path, JSON.stringify(images, null, 1)); // save as we go (API may rate-limit)
  await new Promise((r) => setTimeout(r, 4000));
}
fs.writeFileSync(path, JSON.stringify(images, null, 1));
