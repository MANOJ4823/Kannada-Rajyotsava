import { useMemo, useState } from 'react';
import { Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, ZoomImg } from '../components/ui.jsx';
import { SRC } from '../data/sources.js';

// Registered names, GI application numbers and registration years (financial year) as recorded by the
// GI Registry, cross-checked against the compiled list of Indian GIs. Status: registered.
const GI = [
  { name: 'Mysore Silk', app: '11', fy: '2004–05', type: 'Handicraft', region: 'Mysuru region', img: 'mysoreSilk', logo: '532 · 2016–17',
    what: 'Pure mulberry silk saris with gold zari borders, woven by the state-owned Karnataka Silk Industries Corporation in the Mysuru factory founded in 1912 by Maharaja Krishnaraja Wadiyar IV.', how: 'Silk from Karnataka’s sericulture belt is reeled, dyed and woven; the zari contains real gold and silver.' },
  { name: 'Mysore Agarbathi', app: '13 & 18', fy: '2004–05', type: 'Manufactured', region: 'Mysuru and Karnataka', img: 'mysoreAgarbathiImg', imgCap: 'Incense sticks (illustration)',
    what: 'Incense sticks scented with sandalwood and other natural aromatics, produced by thousands of home-based workers.', how: 'Bamboo sticks are hand-rolled in a paste of charcoal, jigat powder and aromatic ingredients, then perfumed.' },
  { name: 'Bidriware', app: '20', fy: '2005–06', type: 'Handicraft', region: 'Bidar', img: 'giBidriware', imgCap: 'Bidriware boxes, vases, plates and pendants',
    what: 'A deep-black alloy of zinc and copper, inlaid with gleaming pure silver in floral and geometric patterns — a craft practised in Bidar for centuries.', how: 'The cast piece is engraved and inlaid with silver wire, then dipped in a boiled solution of ammonium chloride and earth that, by tradition, comes only from the Bidar fort area; this turns the alloy black while the silver keeps its shine.' },
  { name: 'Channapatna toys and dolls', app: '23', fy: '2004–05', type: 'Handicraft', region: 'Channapatna, Ramanagara district', img: 'channapatna',
    what: 'Smooth, brightly lacquered wooden toys free of sharp edges.', how: 'Soft ivory-wood (hale) is turned on a lathe and coloured with lac and vegetable dyes.' },
  { name: 'Mysore Rosewood Inlay', app: '24', fy: '2004–05', type: 'Handicraft', region: 'Mysuru', img: 'mysoreInlayImg', imgCap: 'Inlaid wooden elephant, Lalitha Mahal Palace Hotel, Mysuru',
    what: 'Rosewood panels and furniture inlaid with lighter woods and other materials to form pictures.', how: 'Designs are cut into the rosewood and pieces of contrasting wood are fitted, sanded and polished.' },
  { name: 'Mysore Sandalwood Oil', app: '29', fy: '2004–05', type: 'Manufactured', region: 'Mysuru', img: 'mysoreSandalOilImg', imgCap: 'Sandalwood oil with sandalwood sticks (illustrative product photo)',
    what: 'Essential oil distilled from the heartwood of Santalum album, famed for its fragrance.', how: 'Heartwood is chipped and steam-distilled; state-owned KSDL continues the tradition begun under the Mysore government.' },
  { name: 'Mysore Sandal soap', app: '30', fy: '2004–05', type: 'Manufactured', region: 'Bengaluru (KSDL)', img: 'sandalOil', imgCap: 'Mysore Sandal soap, 2016 edition',
    what: 'Soap made with pure sandalwood oil, produced since 1916 by what is now Karnataka Soaps and Detergents Ltd.', how: 'Made with sandalwood oil from the state’s distilleries.' },
  { name: 'Kasuti embroidery', app: '31', fy: '2004–05', type: 'Handicraft', region: 'Dharwad and North Karnataka', img: 'kasuti', imgCap: 'Kasuti-embroidered blouse, 19th century',
    what: 'Fine counted-thread embroidery with temple, chariot and bird motifs.', how: 'Stitches such as gavanti and menthi are counted thread by thread so the pattern looks the same on both sides.' },
  { name: 'Mysore Traditional Paintings', app: '32', fy: '2004–05', type: 'Handicraft', region: 'Mysuru', img: 'mysorePainting',
    what: 'Paintings with raised gesso work and gold foil.', how: 'Gesso paste is applied, gold foil laid on, and figures painted in fine detail.' },
  { name: 'Ilkal sarees', app: '76', fy: '2007–08', type: 'Handicraft', region: 'Ilkal, Bagalkot district', img: 'ilkalSupplied', imgCap: 'Ilkal saree with its red pallu',
    what: 'Cotton-silk saris with a distinctive red pallu and border joined by the “tope teni” technique.', how: 'Woven on pit looms; the border and pallu are interlocked with the body using a special looping method.' },
  { name: 'Dharwad Pedha', app: '80', fy: '2008–09', type: 'Food stuff', region: 'Dharwad', img: 'dharwadPeda',
    what: 'Caramelised milk sweet with a grainy texture.', how: 'Milk is reduced slowly with sugar until brown, then shaped and rolled in sugar.' },
  { name: 'Byadagi chilli', app: '129', fy: '2010–11', type: 'Agricultural', region: 'Byadagi, Haveri district', img: 'byadagi',
    what: 'Deep-red, wrinkled chilli with mild heat, prized for colour.', how: 'Grown in the region’s soils and traded through the Byadagi market; also used to extract natural colour (oleoresin).' },
  { name: 'Udupi Mattu Gulla Brinjal', app: '199', fy: '2011–12', type: 'Agricultural', region: 'Mattu village, Udupi district', img: 'udupiMattuGulla',
    what: 'A round, green brinjal with a distinctive taste.', how: 'Grown in the sandy soils near the coast; seeds are traditionally associated with the Udupi Krishna temple tradition.' },
  { name: 'Coorg Arabica Coffee', app: '604', fy: '2018–19', type: 'Agricultural', region: 'Kodagu', img: 'coorgCoffee', imgCap: 'Coffee shade trees and paddy fields, Kodagu',
    what: 'Arabica coffee grown under native shade trees in Kodagu’s hills.', how: 'Shade-grown with pepper and other crops, hand-picked and processed on estates.' },
  // Further Karnataka GIs (Wikipedia: Category:Geographical indications in Karnataka), each confirmed in GI Registry records
  { name: 'Coorg orange', app: '33', fy: '2004–05', type: 'Agricultural', region: 'Kodagu', img: 'giCoorgOrange', imgCap: 'Oranges on sale at Nisargadhama, Kodagu',
    what: 'A loose-skinned mandarin orange with a sweet-sour flavour.', how: 'Grown on the hill slopes of Kodagu, often alongside coffee.' },
  { name: 'Mysore betel leaf', app: '34', fy: '2006–07', type: 'Agricultural', region: 'Mysuru', img: 'giBetel', imgCap: 'Betel leaves for sale',
    what: 'Tender, aromatic betel leaves long associated with the Mysuru region.', how: 'Grown on vines trained up support trees in irrigated gardens.' },
  { name: 'Nanjanagud Banana', app: '35', fy: '2006–07', type: 'Agricultural', region: 'Nanjangud, Mysuru district', img: 'giNanjanagud', imgCap: 'Rasabale bananas',
    what: 'The rasabale banana, prized for its aroma and taste.', how: 'Grown in the soils around Nanjangud.' },
  { name: 'Mysore Malligae', app: '69', fy: '2007–08', type: 'Agricultural', region: 'Mysuru', img: 'giMysoreMallige', imgCap: 'Mysore mallige (jasmine)',
    what: 'A strongly fragrant jasmine, strung into garlands and hair ornaments.', how: 'Buds are hand-picked in the early morning and strung by hand.' },
  { name: 'Udupi Malligae', app: '70', fy: '2007–08', type: 'Agricultural', region: 'Udupi', img: 'giUdupiMallige', imgCap: 'Udupi mallige (jasmine)',
    what: 'A jasmine of the coast, traditionally sold strung in measured bundles.', how: 'Grown in home gardens and fields around Udupi; buds are strung into garlands.' },
  { name: 'Hadagali Malligae', app: '71', fy: '2007–08', type: 'Agricultural', region: 'Hoovina Hadagali, Vijayanagara district', img: 'hadagaliSupplied', imgCap: 'Jasmine flowers',
    what: 'A large-flowered, fragrant jasmine — the town’s name itself means “Hadagali of flowers”.', how: 'Grown in the fields of Hoovina Hadagali taluk.' },
  { name: 'Coorg Green Cardamom', app: '78', fy: '2007–08', type: 'Agricultural', region: 'Kodagu', img: 'cardamomSupplied', imgCap: 'Green cardamom pods',
    what: 'Large green cardamom capsules with a strong aroma.', how: 'Grown under the shade of forest trees in Kodagu’s hills.' },
  { name: 'Navalgund Durries', app: '61', fy: '2007–08', type: 'Handicraft', region: 'Navalgund, Dharwad district', img: 'navalgundSupplied', imgCap: 'A Navalgund durrie', logo: '512 · 2015–16',
    what: 'Hand-woven cotton rugs with bold geometric and bird motifs.', how: 'Woven by hand on looms in Navalgund by families who have practised the craft for generations.' },
  { name: 'Molakalmuru sarees', app: '77', fy: '2007–08', type: 'Handicraft', region: 'Molakalmuru, Chitradurga district', img: 'molakalmuruSupplied', imgCap: 'A Molakalmuru saree',
    what: 'Silk sarees with rich borders and traditional motifs.', how: 'Woven on handlooms in Molakalmuru.' },
  { name: 'Monsooned Malabar Arabica Coffee & Monsooned Malabar Robusta Coffee', app: '85 & 114', fy: '2007–08', type: 'Agricultural', region: 'Karnataka and Kerala (shared GI)', img: 'giMonsooned', imgCap: 'Unroasted Monsooned Malabar arabica beans',
    what: 'Coffee beans that swell, turn pale gold and lose acidity after exposure to monsoon winds.', how: 'Beans are spread out in open-sided warehouses on the west coast during the monsoon.' },
  { name: 'Devanahalli Pomello', app: '131', fy: '2009–10', type: 'Agricultural', region: 'Devanahalli, Bengaluru Rural district', img: 'giPomelo', imgCap: 'Pomelo — the same fruit, photographed in Kerala',
    what: 'A large citrus fruit with sweet, juicy flesh.', how: 'Grown in orchards around Devanahalli.' },
  { name: 'Appemidi Mango', app: '132', fy: '2009–10', type: 'Agricultural', region: 'Malnad — Shivamogga and Uttara Kannada', img: 'giAppemidi', imgCap: 'Appemidi — tender mangoes for pickling',
    what: 'Small tender mangoes with a distinctive aroma, prized for pickles.', how: 'Harvested young, mostly from old trees along Malnad streams.' },
  { name: 'Kamalapur Red Banana', app: '133', fy: '2009–10', type: 'Agricultural', region: 'Kamalapur, Kalaburagi district', img: 'kamalapurSupplied', imgCap: 'Kamalapur red bananas',
    what: 'A red-skinned banana with sweet, creamy flesh.', how: 'Grown around Kamalapur in Kalaburagi district.' },
  { name: 'Kinhal toys', app: '213', fy: '2011–12', type: 'Handicraft', region: 'Kinhal, Koppal district', img: 'giKinhal', imgCap: 'Kinhal wooden toys',
    what: 'Light wooden toys and figures painted in bright colours.', how: 'Carved and painted by hand by the craftsmen of Kinhal.' },
  { name: 'Bangalore Blue Grapes', app: '211', fy: '2012–13', type: 'Agricultural', region: 'Bengaluru region', img: 'giBangaloreBlue', imgCap: 'Bangalore Blue grapes',
    what: 'Blue-black grapes eaten fresh and used for juice and wine.', how: 'Grown in vineyards around Bengaluru, Chikkaballapura and Kolar.' },
  { name: 'Bangalore Rose Onion', app: '212', fy: '2014–15', type: 'Agricultural', region: 'Bengaluru region', img: 'giRoseOnion', imgCap: 'Bangalore rose onions at a market',
    what: 'A small, pungent purple onion, much of it exported.', how: 'Grown in the districts around Bengaluru.' },
  { name: 'Gulbarga Tur Dal', app: '593', fy: '2019–20', type: 'Agricultural', region: 'Kalaburagi', img: 'giTurDal', imgCap: 'Gulbarga tur dal (unsplit)',
    what: 'Pigeon pea (tur) from the black soils of Kalaburagi, valued for its taste and cooking quality.', how: 'Grown as a rain-fed crop across Kalaburagi district.' },
  { name: 'Kari Ishad Mango', app: '843', fy: '2022–23', type: 'Agricultural', region: 'Ankola, Uttara Kannada', img: 'giKariIshad', imgCap: 'Kari Ishad mangoes, Karwar market',
    what: 'A sweet, juicy coastal mango variety.', how: 'Grown in Ankola taluk of Uttara Kannada.' },
  { name: 'Ganjifa Cards of Mysore', app: '60', fy: '2007–08', type: 'Handicraft', region: 'Mysuru', img: 'ganjifaSupplied', imgCap: 'Hand-painted round Ganjifa cards', logo: '511 · 2015–16',
    what: 'Round, hand-painted playing cards whose suits depict scenes from Hindu mythology, such as the Dashavatara.', how: 'Painted by hand in fine detail on layered paper or cloth; the Mysore tradition was patronised by Krishnaraja Wadiyar III.' },
  { name: 'Karnataka Bronzeware', app: '62', fy: '2007–08', type: 'Handicraft', region: 'Karnataka', img: 'bronzeSupplied', imgCap: 'Bronze figures — a woman holding a mirror, flanked by two birds', logo: '510 · 2015–16',
    what: 'Bronze icons, lamps and ritual objects with crisp detail.', how: 'Cast by the lost-wax method: a wax model is coated in clay, the wax melted out and molten bronze poured in.' },
  { name: 'Sandur Lambani Embroidery', app: '134', fy: '2010–11', type: 'Handicraft', region: 'Sandur, Ballari district', img: 'giLambani', imgCap: 'Lambani women at work on embroidery',
    what: 'Vivid embroidery with mirrors, cowrie shells and geometric patterns, made by Lambani women.', how: 'Stitched by hand on cloth in a range of traditional stitches, passed down within the community.' },
  { name: 'Guledgudd Khana', app: '210', fy: '2015–16', type: 'Handicraft', region: 'Guledgudda, Bagalkot district', img: 'khanaSupplied', imgCap: 'Guledgudd khana fabric',
    what: 'A woven blouse fabric with small raised motifs, traditionally worn with Ilkal sarees.', how: 'Woven on handlooms in Guledgudda from cotton and silk yarns.' },
  { name: 'Udupi sarees', app: '224', fy: '2015–16', type: 'Handicraft', region: 'Udupi', img: 'udupiSareeSupplied', imgCap: 'An Udupi cotton saree',
    what: 'Light, comfortable cotton handloom sarees suited to the humid coast.', how: 'Woven on handlooms, largely by weavers’ cooperatives in the Udupi region.' },
  { name: 'Chikmagalur Arabica Coffee', app: '606', fy: '2018–19', type: 'Agricultural', region: 'Chikkamagaluru', img: 'giChikmagalurCoffee', imgCap: 'Shade-grown coffee under native trees, Chikkamagaluru',
    what: 'Arabica coffee from the hills of Chikkamagaluru district.', how: 'Grown under a canopy of native shade trees and processed on the estates.' },
  { name: 'Bababudangiri Arabica Coffee', app: '608', fy: '2018–19', type: 'Agricultural', region: 'Bababudangiri hills, Chikkamagaluru', img: 'giBababudangiri', imgCap: 'The Baba Budangiri hills, Chikkamagaluru',
    what: 'Arabica coffee from the Bababudangiri range — by tradition, where Baba Budan first planted coffee in India.', how: 'Grown at high elevation, hand-picked and naturally processed.' },
  { name: 'Sirsi Supari', app: '464', fy: '2018–19', type: 'Agricultural', region: 'Sirsi, Uttara Kannada', img: 'supariSupplied', imgCap: 'Areca nut (supari) pieces',
    what: 'Areca nut from the Sirsi region, valued for its shape and texture.', how: 'Grown in the Malnad areca gardens of Uttara Kannada and processed after harvest.' },
  { name: 'Indi Limbe', app: '745', fy: '2022–23', type: 'Agricultural', region: 'Indi, Vijayapura district', img: 'indiLimbeSupplied', imgCap: 'Limes',
    what: 'A juicy, aromatic lime from the dry plains of North Karnataka.', how: 'Grown in orchards across Indi taluk.' },
];

export default function GIPage() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('All');
  const types = ['All', ...new Set(GI.map((g) => g.type))];
  const list = useMemo(() => GI.filter((g) => (type === 'All' || g.type === type) && (g.name + g.region + g.what).toLowerCase().includes(q.toLowerCase())), [q, type]);
  return (
    <>
      <PageHero path="/gi" image="mysoreSilk" alt="Mysore silk saree"
        lede={`A Geographical Indication protects a product whose quality is tied to its place. Karnataka holds dozens of them — here are ${GI.length}, verified against the GI Registry.`} />
      <section className="section">
        <div className="wrap">
          <div className="split mb-4">
            <SectionHead eyebrow={`${GI.length} selected registered GIs`} title="Treasures with an address" />
            <div className="stack">
              <label className="field"><span className="small">Search</span><input className="input" type="search" placeholder="Try ‘silk’, ‘Bidar’, ‘coffee’…" value={q} onChange={(e) => setQ(e.target.value)} /></label>
              <div className="pill-row" role="group" aria-label="Type">{types.map((t) => <button key={t} className="chip" aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>)}</div>
            </div>
          </div>
          <div className="grid g3" aria-live="polite">
            {list.map((g, i) => (
              <Reveal key={g.name} delay={i % 3} className="card">
                <ZoomImg k={g.img} ratio="ratio-4x3" credit={false} alt={g.imgCap || g.name} placeholderNote="A verified photograph of this registered product was not available."
                  title={g.name} eyebrow={`${g.type} · Registered GI`}
                  info={<>
                    <div className="small muted">{g.region}</div>
                    <p><b>Distinctive:</b> {g.what}</p>
                    <p><b>Method:</b> {g.how}</p>
                    <p className="small muted">GI application no. {g.app} · registered {g.fy}{g.logo ? ` · GI logo also registered (application no. ${g.logo})` : ''}</p>
                  </>} />
                <div className="card-body">
                  <div className="row between"><div className="meta">{g.type}</div><span className="badge fact">Registered GI</span></div>
                  <h3 className="h4 mt-1">{g.name}</h3>
                  <div className="small muted">{g.region}</div>
                  <p className="mt-2"><b>Distinctive:</b> {g.what}</p>
                  <p className="mt-1"><b>Method:</b> {g.how}</p>
                  <p className="tiny muted mt-2" style={{ margin: '12px 0 0' }}>GI application no. {g.app} · registered {g.fy}{g.logo ? ` · GI logo also registered (application no. ${g.logo})` : ''}{g.imgCap ? ` · Photo: ${g.imgCap}` : ''}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {!list.length && <p className="muted">No matches.</p>}
          <div className="grid g2 mt-5">
            <Note kind="fact" title="How we verified">Each item’s registered name, application number and year of registration was checked against GI Registry records (as compiled in the public list of Indian GIs). Registered names are shown exactly — e.g. “Mysore Sandal soap”, “Udupi Mattu Gulla Brinjal”.</Note>
            <Note kind="interpretation" title="GI vs. speciality">A famous regional dish is not automatically a GI. Mysore pak and Mangalore buns, for example, are beloved but are not registered GIs. Some products also have a registered GI logo, noted on their cards.</Note>
          </div>
          <div className="mt-4"><Sources items={[SRC.giRegistry, SRC.giList, { label: 'Wikipedia — Category: Geographical indications in Karnataka', url: 'https://en.wikipedia.org/wiki/Category:Geographical_indications_in_Karnataka', kind: 'Reference (secondary)', note: 'Used to find Karnataka GIs; each was confirmed against GI Registry records before inclusion.' }]} /></div>
        </div>
      </section>
      <NextChapter path="/gi" />
    </>
  );
}
