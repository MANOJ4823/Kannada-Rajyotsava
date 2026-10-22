import { useMemo, useState } from 'react';
import { Badge, Img, NextChapter, Note, PageHero, Reveal, SectionHead, Sources, ZoomImg } from '../components/ui.jsx';
import { KarnatakaMap } from '../components/maps.jsx';
import { DISHES, FOOD_REGIONS, MYSORE_PAK_STEPS } from '../data/food.js';
import { SRC } from '../data/sources.js';

const regionOf = Object.fromEntries(Object.entries(FOOD_REGIONS).flatMap(([k, r]) => r.districts.map((d) => [d, k])));

function DishCard({ d }) {
  const r = FOOD_REGIONS[d.region];
  return (
    <Reveal className="card food-card">
      <ZoomImg k={d.img} ratio="ratio-4x3" credit={false} alt={d.imgCap || d.name} caption={undefined} placeholderNote="A verified, openly licensed photograph of this dish was not available."
        title={d.name} eyebrow={r.label}
        info={<>
          <div className="kn-serif" style={{ color: 'var(--copper)', fontSize: '1.3rem' }} lang="kn">{d.kn}</div>
          <p>{d.d}</p>
          {d.story && <p className="small muted">{d.story} {d.kind && <Badge kind={d.kind} />}</p>}
          <dl className="facts"><div><dt>Ingredients</dt><dd>{d.ing}</dd></div></dl>
        </>} />
      <div className="card-body">
        <div className="kn-name" lang="kn">{d.kn}</div>
        <h3 className="h4 mt-1">{d.name}</h3>
        <p className="mt-1">{d.d}</p>
        {d.story && <p className="small mt-2" style={{ color: 'var(--muted)' }}>{d.story} {d.kind && <Badge kind={d.kind} />}</p>}
        <div className="food-tags">
          <span style={{ background: r.color, color: '#fff' }}>{r.label.split(' (')[0]}</span>
          {d.ing.split(', ').slice(0, 4).map((x) => <span key={x}>{x}</span>)}
        </div>
        {d.imgCap && <p className="tiny muted mt-2" style={{ margin: '10px 0 0' }}>Photo: {d.imgCap}</p>}
      </div>
    </Reveal>
  );
}

export default function Food() {
  const [region, setRegion] = useState(null);
  const [group, setGroup] = useState('all');
  const list = useMemo(() => DISHES.filter((d) => d.id !== 'mysorepak' && (group === 'all' || d.group === group || (group === 'sweet' && d.group === 'snack')) && (!region || d.region === region)), [region, group]);
  return (
    <>
      <PageHero path="/food" image="mysorePak" alt="Mysore pak"
        lede="Ragi and jowar, coconut and kokum, palace sweets and darshini breakfasts. Food changes every hundred kilometres — explore the map, then come hungry to the office tasting." />

      <section className="section">
        <div className="wrap split top">
          <div>
            <div className="map-wrap">
              <KarnatakaMap rivers={false} title="Food regions of Karnataka"
                districtFill={(d) => { const k = regionOf[d.name]; return !region || region === k ? FOOD_REGIONS[k].color : '#efe6d6'; }}
                onDistrict={(d) => setRegion(regionOf[d.name] === region ? null : regionOf[d.name])} />
            </div>
            <p className="map-note">Food regions are cultural and overlap; district shading is approximate. Select a district or a region button.</p>
          </div>
          <div className="stack">
            <SectionHead eyebrow="A culinary map" title="Six kitchens, one state." />
            <div className="stack">
              {Object.entries(FOOD_REGIONS).map(([k, r]) => (
                <button key={k} className="panel" onClick={() => setRegion(region === k ? null : k)} aria-pressed={region === k}
                  style={{ textAlign: 'left', border: region === k ? `2px solid ${r.color}` : '2px solid transparent', padding: '16px 18px', background: region === k ? '#fff' : 'var(--sand)' }}>
                  <div className="row"><span className="sw" style={{ width: 12, height: 12, borderRadius: 4, background: r.color, display: 'inline-block' }} /><b>{r.label}</b></div>
                  <div className="small muted mt-1">{r.d}</div>
                </button>
              ))}
            </div>
            <p className="small muted">Karnataka has an extraordinary variety of breakfasts — you may hear it called a “breakfast capital”, but that is affectionate praise, not an official title.</p>
          </div>
        </div>
      </section>

      <section className="section theme-night grain" id="mysore-pak">
        <div className="wrap split">
          <Reveal className="stack">
            <div className="eyebrow">Featured story</div>
            <h2 className="h1">Mysore pak</h2>
            <div className="kn-serif" style={{ fontSize: '1.6rem', color: 'var(--yellow)' }}>ಮೈಸೂರು ಪಾಕ್</div>
            <p className="lede">Three ingredients — gram flour, ghee and sugar — and a great deal of skill.</p>
            <p className="muted">The commonly told story places its creation in the kitchens of the Mysore Palace under the Wadiyar court, traditionally during the reign of Krishnaraja Wadiyar IV, and credits the royal cook Kakasura Madappa. Asked the name of his new sweet, he is said to have called it simply “Mysore paka” — <i>pāka</i> meaning a sweet made with sugar syrup. Descendants of Madappa’s family still run a sweet shop in Mysuru.</p>
            <Note kind="tradition" title="Traditional account">No contemporary palace record of the invention is known; this is a family and popular tradition, widely accepted and cherished.</Note>
          </Reveal>
          <Reveal className="stack">
            <ZoomImg k="mysorePak" ratio="ratio-4x3" caption="Mysore pak"
              title="Mysore pak" eyebrow="A palace sweet"
              info={<>
                <p>Three ingredients — gram flour, ghee and sugar — and a great deal of skill.</p>
                <p className="small muted">The commonly told story places its creation in the kitchens of the Mysore Palace and credits the royal cook Kakasura Madappa. No contemporary palace record of the invention is known; this is a family and popular tradition.</p>
                <div><Badge kind="tradition" /></div>
              </>} />
            <ol className="story-steps">{MYSORE_PAK_STEPS.map((s) => <li key={s}><span>{s}</span></li>)}</ol>
            <p className="small muted">Texture has evolved: the traditional sweet is firm, porous and slightly crumbly, while many modern shops make a soft, melt-in-the-mouth version with far more ghee.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="row between mb-4">
            <SectionHead eyebrow={region ? FOOD_REGIONS[region].label : 'All regions'} title={group === 'everyday' ? 'Breakfast & everyday dishes' : group === 'sweet' ? 'Sweets & snacks' : 'Everything'} />
            <div className="pill-row" role="group" aria-label="Dish type">
              <button className="chip" aria-pressed={group === 'all'} onClick={() => setGroup('all')}>All</button>
              <button className="chip" aria-pressed={group === 'everyday'} onClick={() => setGroup('everyday')}>Breakfast & everyday</button>
              <button className="chip" aria-pressed={group === 'sweet'} onClick={() => setGroup('sweet')}>Sweets & snacks</button>
              {region && <button className="chip" onClick={() => setRegion(null)}>✕ Clear region</button>}
            </div>
          </div>
          {list.length ? <div className="grid g3">{list.map((d) => <DishCard key={d.id} d={d} />)}</div>
            : <p className="muted">No dishes in this combination yet — try another region or type.</p>}
          <p className="tiny muted mt-4">Photographs are openly licensed from Wikimedia Commons (credits on the Sources page). Where a photograph shows a closely related dish under another name, the caption says so.</p>
          <div className="mt-4"><Sources items={[SRC.kaTourism, SRC.giRegistry, SRC.W('Mysore pak'), SRC.W('Dharwad pedha'), SRC.W('Cuisine of Karnataka'), SRC.W('Kori rotti'), SRC.W('Baba Budan')]} /></div>
        </div>
      </section>
      <NextChapter path="/food" />
    </>
  );
}
