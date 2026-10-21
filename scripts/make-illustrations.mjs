// Generates vector illustrations for subjects with no verifiable photograph and registers them in
// src/data/images.json (key -> /images/generated/<name>.svg). Vector art stays sharp at any size.
// None of these depict a person's likeness.
import fs from 'node:fs';

const OUT = new URL('../public/images/generated/', import.meta.url);
fs.mkdirSync(OUT, { recursive: true });
const KN = "'Noto Serif Kannada','Nirmala UI','Tunga',serif";
const SERIF = "'Fraunces','Georgia',serif";
const SANS = "'Instrument Sans','Segoe UI',Arial,sans-serif";
const GOLD = '#e2b33c', CREAM = '#faf5ec', COPPER = '#c97a43';

const dark = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs><radialGradient id="bg" cx="50%" cy="42%" r="75%"><stop offset="0" stop-color="#2e2a63"/><stop offset="1" stop-color="#12102a"/></radialGradient></defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect x="28" y="28" width="${w - 56}" height="${h - 56}" fill="none" stroke="${GOLD}" stroke-opacity=".35" stroke-width="3"/>
${body}</svg>`;

const warm = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs><radialGradient id="bg" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="#fbf3e4"/><stop offset="1" stop-color="#e8d7bb"/></radialGradient>
<radialGradient id="plate" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#efe4d2"/></radialGradient></defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>${body}</svg>`;

const label = (w, h, text, color = CREAM) => `<text x="${w / 2}" y="${h - 58}" text-anchor="middle" font-family="${SANS}" font-size="26" letter-spacing="6" fill="${color}" fill-opacity=".6">${text}</text>`;

// ---------- Bengaluru changes hands ----------
function changingHands() {
  const W = 1600, H = 1200;
  const steps = [
    ['1537', 'Kempegowda I', 'founds the town', 1], ['1638', 'Shahaji', 'Bijapur general', 1], ['1687', 'Mughal forces', 'take the town', 1],
    ['1689', 'Mysore Wadiyars', 'buy Bengaluru', 1], ['1950', 'Elected government', 'much later · Republic', 0.45],
  ];
  const pos = (i) => [300 + (i % 3) * 500, i < 3 ? 420 : 860];
  let g = '';
  for (let i = 0; i < steps.length - 1; i++) {
    const [x1, y1] = pos(i), [x2, y2] = pos(i + 1);
    const dash = i === steps.length - 2 ? ' stroke-dasharray="14 14"' : '';
    if (y1 === y2) g += `<path d="M${x1 + 140} ${y1} L${x2 - 150} ${y2}" stroke="${GOLD}" stroke-width="5"${dash} marker-end="url(#arr)"/>`;
    // row change: leave from the right of the last circle and run through the clear band between rows
    else g += `<path d="M${x1 + 135} ${y1} H1500 V700 H${x2} V${y2 - 145}" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"${dash} marker-end="url(#arr)"/>`;
  }
  steps.forEach(([yr, who, note, op], i) => {
    const [x, y] = pos(i);
    const crown = op === 1
      ? `<path d="M${x - 46} ${y - 52} l18 -40 l28 26 l28 -26 l18 40 z" fill="${GOLD}" opacity=".9"/>`
      : `<path d="M${x - 40} ${y - 50} h80 M${x - 40} ${y - 50} l40 -34 l40 34 M${x - 30} ${y - 50} v-6 M${x + 30} ${y - 50} v-6" stroke="${GOLD}" stroke-width="5" fill="none"/>`;
    g += `<g opacity="${op}"><circle cx="${x}" cy="${y}" r="130" fill="#1b1840" stroke="${GOLD}" stroke-width="5"/>${crown}
<text x="${x}" y="${y + 30}" text-anchor="middle" font-family="${SERIF}" font-size="68" fill="${CREAM}">${yr}</text>
<text x="${x}" y="${y + 196}" text-anchor="middle" font-family="${SERIF}" font-size="44" fill="${CREAM}">${who}</text>
<text x="${x}" y="${y + 234}" text-anchor="middle" font-family="${SANS}" font-size="28" fill="${CREAM}" fill-opacity=".7">${note}</text></g>`;
  });
  return dark(W, H, `<defs><marker id="arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${GOLD}"/></marker></defs>
<text x="${W / 2}" y="170" text-anchor="middle" font-family="${KN}" font-size="66" fill="${GOLD}">ಕೈ ಬದಲಾದ ಬೆಂಗಳೂರು</text>
<text x="${W / 2}" y="236" text-anchor="middle" font-family="${SERIF}" font-size="44" fill="${CREAM}">Bengaluru changes hands, 1537 – 1689</text>${g}<text x="${W / 2}" y="1152" text-anchor="middle" font-family="${SANS}" font-size="22" letter-spacing="6" fill="${CREAM}" fill-opacity=".55">ILLUSTRATION · TIMELINE OF RULERS</text>`);
}

// ---------- Kailasa temple emblem for Krishna I (no portrait exists) ----------
function krishnaI() {
  const S = 1200, c = S / 2;
  let tiers = '';
  for (let i = 0; i < 5; i++) { const w = 300 - i * 52, y = 520 - i * 58; tiers += `<rect x="${c - w / 2}" y="${y}" width="${w}" height="50" fill="none" stroke="${GOLD}" stroke-width="6"/>`; }
  const elephants = Array.from({ length: 7 }, (_, i) => `<ellipse cx="${c - 270 + i * 90}" cy="742" rx="34" ry="24" fill="${GOLD}" opacity=".75"/>`).join('');
  return dark(S, S, `<circle cx="${c}" cy="${c}" r="430" fill="none" stroke="${GOLD}" stroke-opacity=".25" stroke-width="3"/>
<path d="M${c - 360} 800 V420 L${c - 300} 380 H${c + 300} L${c + 360} 420 V800" fill="none" stroke="${COPPER}" stroke-width="6" stroke-opacity=".7"/>
${tiers}<path d="M${c - 40} 288 L${c} 226 L${c + 40} 288 z" fill="${GOLD}"/><circle cx="${c}" cy="214" r="14" fill="${GOLD}"/>
<rect x="${c - 210}" y="570" width="420" height="150" fill="none" stroke="${GOLD}" stroke-width="6"/>
${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${c - 180 + i * 72}" y1="580" x2="${c - 180 + i * 72}" y2="712" stroke="${GOLD}" stroke-width="5"/>`).join('')}
<rect x="${c - 300}" y="460" width="16" height="260" fill="${GOLD}"/><rect x="${c + 284}" y="460" width="16" height="260" fill="${GOLD}"/>
${elephants}<line x1="${c - 330}" y1="772" x2="${c + 330}" y2="772" stroke="${GOLD}" stroke-width="5"/>
<text x="${c}" y="872" text-anchor="middle" font-family="${KN}" font-size="64" fill="${CREAM}">ಒಂದನೇ ಕೃಷ್ಣ</text>
<text x="${c}" y="930" text-anchor="middle" font-family="${SANS}" font-size="30" letter-spacing="4" fill="${CREAM}" fill-opacity=".65">KAILASA TEMPLE · ILLUSTRATION</text>`);
}

// ---------- Palm-leaf manuscript for classical poets ----------
function poet(kn, en) {
  const S = 1200, c = S / 2;
  const leaf = (y, rot) => `<g transform="rotate(${rot} ${c} ${y})"><rect x="${c - 420}" y="${y - 34}" width="840" height="68" rx="30" fill="#c99a52" stroke="#8a5a26" stroke-width="3"/>
${[0, 1, 2].map((r) => `<line x1="${c - 360}" y1="${y - 14 + r * 14}" x2="${c + 360}" y2="${y - 14 + r * 14}" stroke="#5a3a17" stroke-opacity=".45" stroke-width="3" stroke-dasharray="${18 + r * 4} 9"/>`).join('')}
<circle cx="${c - 250}" cy="${y}" r="9" fill="#5a3a17"/><circle cx="${c + 250}" cy="${y}" r="9" fill="#5a3a17"/></g>`;
  return dark(S, S, `<circle cx="${c}" cy="${c}" r="430" fill="none" stroke="${GOLD}" stroke-opacity=".25" stroke-width="3"/>
<text x="${c}" y="430" text-anchor="middle" font-family="${KN}" font-size="150" fill="${GOLD}">${kn}</text>
<text x="${c}" y="500" text-anchor="middle" font-family="${SERIF}" font-size="52" fill="${CREAM}">${en}</text>
${leaf(640, -3)}${leaf(720, 2)}${leaf(800, -1)}
<path d="M${c - 250} 600 C${c - 260} 760, ${c - 240} 860, ${c - 250} 880 M${c + 250} 600 C${c + 260} 760, ${c + 240} 860, ${c + 250} 880" stroke="#e8d7bb" stroke-width="5" fill="none"/>
<text x="${c}" y="950" text-anchor="middle" font-family="${SANS}" font-size="28" letter-spacing="4" fill="${CREAM}" fill-opacity=".6">10TH CENTURY · ILLUSTRATION</text>`);
}

// ---------- State anthem ----------
function anthem() {
  const W = 1600, H = 1200;
  const staff = [0, 1, 2, 3, 4].map((i) => `<path d="M140 ${640 + i * 26} C 520 ${590 + i * 26}, 1080 ${700 + i * 26}, 1460 ${640 + i * 26}" stroke="${GOLD}" stroke-opacity=".55" stroke-width="3" fill="none"/>`).join('');
  const notes = [[300, 662], [460, 640], [620, 668], [780, 690], [940, 676], [1100, 652], [1260, 680]]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="20" ry="14" transform="rotate(-20 ${x} ${y})" fill="${GOLD}"/><line x1="${x + 18}" y1="${y - 4}" x2="${x + 18}" y2="${y - 96}" stroke="${GOLD}" stroke-width="5"/>`).join('');
  return dark(W, H, `<text x="${W / 2}" y="330" text-anchor="middle" font-family="${KN}" font-size="76" fill="${GOLD}">ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ</text>
<text x="${W / 2}" y="420" text-anchor="middle" font-family="${KN}" font-size="60" fill="${CREAM}">ಜಯ ಹೇ ಕರ್ನಾಟಕ ಮಾತೆ</text>
${staff}${notes}
<text x="${W / 2}" y="900" text-anchor="middle" font-family="${SERIF}" font-size="46" fill="${CREAM}">Karnataka’s state anthem · words by Kuvempu</text>${label(W, H, 'ILLUSTRATION')}`);
}

// ---------- Foods ----------
function sajjappa() {
  const W = 1600, H = 1200, cx = 800, cy = 610;
  const disc = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#c07a2c"/><circle cx="${x}" cy="${y}" r="${r - 14}" fill="#d9963f"/>
${[...Array(14)].map((_, i) => { const a = i * 2.4, d = (i % 5) * (r / 7); return `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d).toFixed(1)}" r="5" fill="#a8622a" opacity=".6"/>`; }).join('')}`;
  return warm(W, H, `<ellipse cx="${cx}" cy="${cy + 20}" rx="470" ry="330" fill="#d8c3a2" opacity=".6"/>
<ellipse cx="${cx}" cy="${cy}" rx="460" ry="320" fill="url(#plate)" stroke="#c9b48f" stroke-width="6"/>
<ellipse cx="${cx}" cy="${cy}" rx="380" ry="255" fill="none" stroke="#d9c7a6" stroke-width="4"/>
${disc(cx - 190, cy - 70, 120)}${disc(cx + 170, cy - 90, 120)}${disc(cx - 20, cy + 110, 125)}
<path d="M${cx + 230} ${cy + 140} a125 125 0 0 1 250 0 z" transform="translate(-120 -30)" fill="#c07a2c"/>
<path d="M${cx + 125} ${cy + 110} a108 70 0 0 1 216 0 z" fill="#7a4415"/>
<text x="${cx}" y="150" text-anchor="middle" font-family="${KN}" font-size="84" fill="#8a3c1c">ಸಜ್ಜಪ್ಪ</text>
<text x="${cx}" y="1060" text-anchor="middle" font-family="${SERIF}" font-size="48" fill="#3d362e">Sajjappa — jaggery–coconut filled sweet</text>
<text x="${cx}" y="1120" text-anchor="middle" font-family="${SANS}" font-size="26" letter-spacing="6" fill="#6e6357">ILLUSTRATION</text>`);
}

function shenga() {
  const W = 1600, H = 1200, cx = 800, cy = 620;
  let grains = '';
  for (let i = 0; i < 160; i++) {
    const a = i * 2.39996, d = Math.sqrt(i / 160) * 300;
    const x = cx + Math.cos(a) * d, y = cy - 40 + Math.sin(a) * d * 0.42;
    grains += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${10 + (i % 4) * 2}" ry="7" fill="${['#a5402d', '#b8582f', '#8f3324', '#c26b3a'][i % 4]}" transform="rotate(${(i * 37) % 180} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  const peanut = (x, y, r) => `<g transform="rotate(${r} ${x} ${y})"><ellipse cx="${x - 30}" cy="${y}" rx="38" ry="30" fill="#d7aa6c"/><ellipse cx="${x + 30}" cy="${y}" rx="36" ry="28" fill="#d7aa6c"/><ellipse cx="${x}" cy="${y}" rx="22" ry="22" fill="#d7aa6c"/></g>`;
  return warm(W, H, `<ellipse cx="${cx}" cy="${cy + 170}" rx="420" ry="70" fill="#cdb48c" opacity=".55"/>
<path d="M${cx - 380} ${cy - 40} Q${cx - 360} ${cy + 230} ${cx} ${cy + 240} Q${cx + 360} ${cy + 230} ${cx + 380} ${cy - 40} z" fill="#6b4a33"/>
<ellipse cx="${cx}" cy="${cy - 40}" rx="380" ry="140" fill="#7d5a40"/>
<ellipse cx="${cx}" cy="${cy - 40}" rx="350" ry="122" fill="#b9543a"/>${grains}
${peanut(cx - 470, cy + 210, 15)}${peanut(cx + 470, cy + 200, -20)}${peanut(cx + 400, cy + 260, 30)}
<path d="M${cx - 560} ${cy + 120} q60 -90 150 -60 q-80 10 -150 60z" fill="#c4362c"/>
<text x="${cx}" y="160" text-anchor="middle" font-family="${KN}" font-size="84" fill="#8a3c1c">ಶೇಂಗಾ ಚಟ್ನಿ</text>
<text x="${cx}" y="1060" text-anchor="middle" font-family="${SERIF}" font-size="48" fill="#3d362e">Shenga chutney — groundnut chutney powder</text>
<text x="${cx}" y="1120" text-anchor="middle" font-family="${SANS}" font-size="26" letter-spacing="6" fill="#6e6357">ILLUSTRATION</text>`);
}

// ---------- GI products without a verifiable photograph ----------
const giCard = (kn, en, art) => warm(1600, 1200, `${art}
<text x="800" y="150" text-anchor="middle" font-family="${KN}" font-size="80" fill="#8a3c1c">${kn}</text>
<text x="800" y="1060" text-anchor="middle" font-family="${SERIF}" font-size="46" fill="#3d362e">${en}</text>
<text x="800" y="1120" text-anchor="middle" font-family="${SANS}" font-size="26" letter-spacing="6" fill="#6e6357">ILLUSTRATION · REGISTERED GI</text>`);

function cardamom() {
  let pods = '';
  for (let i = 0; i < 22; i++) {
    const a = i * 2.4, d = 40 + (i % 6) * 48, x = 800 + Math.cos(a) * d * 1.5, y = 600 + Math.sin(a) * d * 0.8, r = (i * 47) % 180;
    pods += `<g transform="rotate(${r} ${x.toFixed(0)} ${y.toFixed(0)})"><ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="62" ry="30" fill="${i % 3 ? '#7a9a3a' : '#8fae4a'}" stroke="#5a7428" stroke-width="3"/>
<path d="M${(x - 50).toFixed(0)} ${y.toFixed(0)} Q${x.toFixed(0)} ${(y - 18).toFixed(0)} ${(x + 50).toFixed(0)} ${y.toFixed(0)}" stroke="#5a7428" stroke-width="3" fill="none"/></g>`;
  }
  return giCard('ಕೊಡಗಿನ ಹಸಿರು ಏಲಕ್ಕಿ', 'Coorg Green Cardamom', `<ellipse cx="800" cy="640" rx="520" ry="300" fill="url(#plate)" stroke="#c9b48f" stroke-width="6"/>${pods}`);
}

function redBanana() {
  let b = '';
  for (let i = 0; i < 6; i++) {
    const dx = (i - 2.5) * 70;
    b += `<path d="M${780 + dx} 360 C ${600 + dx * 1.6} 480, ${620 + dx * 1.8} 760, ${840 + dx * 1.5} 860 C ${870 + dx * 1.5} 840, ${700 + dx * 1.4} 700, ${830 + dx} 380 Z" fill="${i % 2 ? '#9e2f2a' : '#b23b31'}" stroke="#6e1f1b" stroke-width="4"/>`;
  }
  return giCard('ಕಮಲಾಪುರ ಕೆಂಪು ಬಾಳೆ', 'Kamalapur Red Banana', `<ellipse cx="820" cy="880" rx="420" ry="60" fill="#cdb48c" opacity=".55"/>${b}<rect x="740" y="320" width="90" height="70" rx="20" fill="#5a7428"/>`);
}

function molakalmuru() {
  const fold = (y, body, border) => `<rect x="420" y="${y}" width="760" height="120" rx="10" fill="${body}"/><rect x="420" y="${y + 84}" width="760" height="36" fill="${border}"/>
${[...Array(14)].map((_, i) => `<path d="M${450 + i * 52} ${y + 112} l12 -20 l12 20 z" fill="${GOLD}"/>`).join('')}<line x1="420" y1="${y + 84}" x2="1180" y2="${y + 84}" stroke="${GOLD}" stroke-width="5"/>`;
  return giCard('ಮೊಳಕಾಲ್ಮುರು ಸೀರೆ', 'Molakalmuru Sarees', `<ellipse cx="800" cy="900" rx="460" ry="50" fill="#cdb48c" opacity=".55"/>${fold(400, '#7a1f3d', '#1f4436')}${fold(540, '#1f4436', '#7a1f3d')}${fold(680, '#b5652f', '#5d2f53')}`);
}

function navalgund() {
  let cells = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
    const x = 470 + c * 94, y = 380 + r * 100;
    cells += `<path d="M${x + 47} ${y + 8} L${x + 86} ${y + 50} L${x + 47} ${y + 92} L${x + 8} ${y + 50} Z" fill="${(r + c) % 2 ? '#c4362c' : '#1f1c45'}"/><circle cx="${x + 47}" cy="${y + 50}" r="10" fill="${GOLD}"/>`;
  }
  const fringe = (y) => [...Array(40)].map((_, i) => `<line x1="${450 + i * 18}" y1="${y}" x2="${450 + i * 18}" y2="${y + 40}" stroke="#e8d7bb" stroke-width="4"/>`).join('');
  return giCard('ನವಲಗುಂದ ಜಮಖಾನ', 'Navalgund Durries', `${fringe(320)}${fringe(800)}<rect x="440" y="360" width="720" height="440" fill="#f3e3c3" stroke="#7a3e6b" stroke-width="10"/>${cells}`);
}

function hadagali() {
  const flower = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-30" rx="16" ry="34" fill="#fffdf6" stroke="#d9cfb8" stroke-width="2" transform="rotate(${a})"/>`).join('')}<circle r="10" fill="#f0d36a"/></g>`;
  const bud = (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="12" ry="30" fill="#fffdf6" stroke="#d9cfb8" stroke-width="2" transform="rotate(${r} ${x} ${y})"/>`;
  let art = `<ellipse cx="800" cy="640" rx="500" ry="290" fill="#6e9e7d" opacity=".35"/>`;
  [[620, 560, 1.4], [820, 520, 1.6], [1000, 600, 1.3], [720, 720, 1.2], [930, 760, 1.4]].forEach(([x, y, s]) => (art += flower(x, y, s)));
  for (let i = 0; i < 18; i++) art += bud(520 + (i * 47) % 560, 470 + (i * 83) % 360, (i * 41) % 180);
  return giCard('ಹಡಗಲಿ ಮಲ್ಲಿಗೆ', 'Hadagali Mallige (jasmine)', art);
}

function ganjifa() {
  const card = (x, y, rot, fill) => `<g transform="rotate(${rot} 800 900)"><circle cx="${x}" cy="${y}" r="150" fill="${fill}" stroke="${GOLD}" stroke-width="10"/>
<circle cx="${x}" cy="${y}" r="110" fill="none" stroke="#fff6dc" stroke-width="4"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<ellipse cx="${x}" cy="${y - 62}" rx="16" ry="36" fill="#fff6dc" transform="rotate(${a} ${x} ${y})"/>`).join('')}<circle cx="${x}" cy="${y}" r="22" fill="${GOLD}"/></g>`;
  return giCard('ಮೈಸೂರು ಗಂಜೀಫಾ', 'Ganjifa Cards of Mysore', `${card(800, 600, -40, '#7a1f3d')}${card(800, 600, -14, '#1f4436')}${card(800, 600, 14, '#2e2a63')}${card(800, 600, 40, '#a8562a')}`);
}
function bronze() {
  const tiers = [0, 1, 2].map((i) => `<ellipse cx="800" cy="${430 + i * 120}" rx="${150 - i * 20}" ry="26" fill="#b0702e" stroke="#7a4a1c" stroke-width="5"/>${[...Array(5)].map((_, k) => `<path d="M${800 + (k - 2) * (52 - i * 6)} ${410 + i * 120} q-10 -40 0 -60 q10 20 0 60z" fill="#f0b23c"/>`).join('')}`).join('');
  return giCard('ಕರ್ನಾಟಕ ಕಂಚಿನ ಕಲೆ', 'Karnataka Bronzeware', `<ellipse cx="800" cy="900" rx="300" ry="40" fill="#cdb48c" opacity=".6"/>
<rect x="780" y="440" width="40" height="400" fill="#9a5f26"/>${tiers}<path d="M640 900 Q800 800 960 900 Z" fill="#9a5f26" stroke="#7a4a1c" stroke-width="5"/>`);
}
function khana() {
  let motifs = '';
  for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) motifs += `<rect x="${470 + c * 66}" y="${400 + r * 66}" width="22" height="22" transform="rotate(45 ${481 + c * 66} ${411 + r * 66})" fill="${(r + c) % 2 ? GOLD : '#e8d7bb'}"/>`;
  return giCard('ಗುಳೇದಗುಡ್ಡ ಖಣ', 'Guledgudd Khana (blouse fabric)', `<rect x="440" y="370" width="720" height="420" rx="8" fill="#5d2f53"/>${motifs}
<rect x="440" y="770" width="720" height="50" fill="#1f4436"/><line x1="440" y1="770" x2="1160" y2="770" stroke="${GOLD}" stroke-width="6"/>`);
}
function udupiSaree() {
  let checks = '';
  for (let i = 0; i < 16; i++) checks += `<line x1="${430 + i * 46}" y1="380" x2="${430 + i * 46}" y2="760" stroke="#c4362c" stroke-opacity=".35" stroke-width="4"/>`;
  for (let i = 0; i < 9; i++) checks += `<line x1="420" y1="${390 + i * 46}" x2="1180" y2="${390 + i * 46}" stroke="#c4362c" stroke-opacity=".35" stroke-width="4"/>`;
  return giCard('ಉಡುಪಿ ಸೀರೆ', 'Udupi Sarees (cotton handloom)', `<rect x="420" y="380" width="760" height="380" fill="#f4e7c8"/>${checks}
<rect x="420" y="720" width="760" height="60" fill="#c4362c"/><rect x="420" y="732" width="760" height="8" fill="${GOLD}"/><rect x="420" y="360" width="760" height="30" fill="#1f4436"/>`);
}
function supari() {
  let nuts = '';
  for (let i = 0; i < 26; i++) { const a = i * 2.4, d = Math.sqrt(i / 26) * 300, x = 800 + Math.cos(a) * d * 1.3, y = 640 + Math.sin(a) * d * 0.6;
    nuts += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="46" fill="${['#8a4b25', '#a35f2f', '#7a3f1f'][i % 3]}"/><path d="M${(x - 26).toFixed(0)} ${(y - 6).toFixed(0)} q26 -24 52 0" stroke="#c98a55" stroke-width="5" fill="none"/>`; }
  return giCard('ಶಿರಸಿ ಸುಪಾರಿ', 'Sirsi Supari (areca nut)', `<ellipse cx="800" cy="660" rx="520" ry="270" fill="url(#plate)" stroke="#c9b48f" stroke-width="6"/>${nuts}`);
}
function indiLimbe() {
  const lime = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#9cbf3a" stroke="#6f8f22" stroke-width="5"/><circle cx="${x - r / 3}" cy="${y - r / 3}" r="${r / 4}" fill="#c9e07a" opacity=".7"/>`;
  const half = `<circle cx="1000" cy="720" r="110" fill="#e4f0a8" stroke="#6f8f22" stroke-width="12"/>${[0, 45, 90, 135].map((a) => `<line x1="1000" y1="620" x2="1000" y2="820" stroke="#9cbf3a" stroke-width="6" transform="rotate(${a} 1000 720)"/>`).join('')}`;
  return giCard('ಇಂಡಿ ಲಿಂಬೆ', 'Indi Limbe (lime)', `<ellipse cx="800" cy="860" rx="420" ry="50" fill="#cdb48c" opacity=".6"/>${lime(620, 640, 120)}${lime(800, 560, 130)}${lime(760, 760, 110)}${half}`);
}

const FILES = {
  illChangingHands: ['changing-hands.svg', changingHands(), 1600, 1200, 'Illustration: Bengaluru changes hands, 1537–1689'],
  illKrishnaI: ['krishna-i-kailasa.svg', krishnaI(), 1200, 1200, 'Illustration of the Kailasa Temple, associated with Krishna I'],
  illRanna: ['ranna.svg', poet('ರನ್ನ', 'Ranna'), 1200, 1200, 'Illustration: palm-leaf manuscript, Ranna'],
  illPonna: ['ponna.svg', poet('ಪೊನ್ನ', 'Ponna'), 1200, 1200, 'Illustration: palm-leaf manuscript, Ponna'],
  illPampa: ['pampa.svg', poet('ಪಂಪ', 'Adikavi Pampa'), 1200, 1200, 'Illustration: palm-leaf manuscript, Adikavi Pampa'],
  illAnthem: ['state-anthem.svg', anthem(), 1600, 1200, 'Illustration: opening words of the state anthem'],
  illSajjappa: ['sajjappa.svg', sajjappa(), 1600, 1200, 'Illustration of sajjappa'],
  illShenga: ['shenga-chutney.svg', shenga(), 1600, 1200, 'Illustration of shenga chutney'],
  illCardamom: ['gi-coorg-cardamom.svg', cardamom(), 1600, 1200, 'Illustration of Coorg green cardamom'],
  illRedBanana: ['gi-kamalapur-banana.svg', redBanana(), 1600, 1200, 'Illustration of Kamalapur red bananas'],
  illMolakalmuru: ['gi-molakalmuru.svg', molakalmuru(), 1600, 1200, 'Illustration of Molakalmuru sarees'],
  illNavalgund: ['gi-navalgund.svg', navalgund(), 1600, 1200, 'Illustration of a Navalgund durrie'],
  illHadagali: ['gi-hadagali-mallige.svg', hadagali(), 1600, 1200, 'Illustration of Hadagali jasmine'],
  illGanjifa: ['gi-ganjifa.svg', ganjifa(), 1600, 1200, 'Illustration of Mysore Ganjifa cards'],
  illBronze: ['gi-bronzeware.svg', bronze(), 1600, 1200, 'Illustration of a bronze lamp'],
  illKhana: ['gi-guledgudd-khana.svg', khana(), 1600, 1200, 'Illustration of Guledgudd khana fabric'],
  illUdupiSaree: ['gi-udupi-saree.svg', udupiSaree(), 1600, 1200, 'Illustration of an Udupi cotton saree'],
  illSupari: ['gi-sirsi-supari.svg', supari(), 1600, 1200, 'Illustration of areca nuts'],
  illIndiLimbe: ['gi-indi-limbe.svg', indiLimbe(), 1600, 1200, 'Illustration of limes'],
};

const imgPath = new URL('../src/data/images.json', import.meta.url);
const images = JSON.parse(fs.readFileSync(imgPath));
for (const [key, [file, svg, w, h, desc]] of Object.entries(FILES)) {
  fs.writeFileSync(new URL(file, OUT), svg);
  images[key] = { file, src: '/images/generated/' + file, w, h, supplied: true, author: 'Created for this site', license: 'Original illustration', credit: 'Illustration created for this site (not a photograph)', description: desc };
  console.log('wrote', file);
}
fs.writeFileSync(imgPath, JSON.stringify(images, null, 1));
