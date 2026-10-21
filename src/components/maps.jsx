import MAPS from '../data/maps.json';
import { placeById } from '../data/places.js';

const K = MAPS.karnataka;
const I = MAPS.india;

export const ZONES = {
  coast: { label: 'Karavali — coastal plain', color: '#9cc3d5' },
  malnad: { label: 'Malenadu — Western Ghats & foothills', color: '#8fb29a' },
  northMaidan: { label: 'Bayaluseeme — northern Deccan plateau', color: '#e6c99a' },
  southMaidan: { label: 'Southern Deccan plateau (maidan)', color: '#ecd9b6' },
};

export const MARKER_COLORS = {
  city: '#1f1c45', capital: '#a8562a', monument: '#c4362c', archaeology: '#6b4c9a', nature: '#1f4436',
};

/** Karnataka map built from Census-2011 district boundaries. */
export function KarnatakaMap({
  zones = false, rivers = true, districtLines = true, markers = [], selected, onSelect,
  districtFill, onDistrict, labels = true, title = 'Map of Karnataka', className = '',
}) {
  const handleKey = (e, fn) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } };
  return (
    <svg viewBox={`0 0 ${K.w} ${K.h}`} className={`map-svg ${className}`} role="group" aria-label={title}>
      <title>{title}</title>
      <defs>
        <clipPath id="ka-clip"><path d={K.outline} /></clipPath>
      </defs>
      <text x="40" y="420" className="label" style={{ fontSize: 13, letterSpacing: '0.3em', fill: '#7c9fb4', stroke: 'none' }} transform="rotate(-72 40 420)">ARABIAN SEA</text>
      {K.districts.map((d) => {
        const fill = districtFill ? districtFill(d) : zones ? ZONES[d.zone].color : undefined;
        return (
          <path key={d.name} d={d.d} className="district"
            style={{ fill, stroke: districtLines ? undefined : fill, cursor: onDistrict ? 'pointer' : undefined }}
            onClick={onDistrict ? () => onDistrict(d) : undefined}
            tabIndex={onDistrict ? 0 : undefined}
            role={onDistrict ? 'button' : undefined}
            aria-label={onDistrict ? `${d.name} district` : undefined}
            onKeyDown={onDistrict ? (e) => handleKey(e, () => onDistrict(d)) : undefined}
          >
            <title>{d.name}</title>
          </path>
        );
      })}
      <path d={K.outline} className="outline" />
      {rivers && (
        <g clipPath="url(#ka-clip)">
          {K.rivers.map((r, i) => <path key={i} d={r.d} className="river"><title>{r.name}</title></path>)}
        </g>
      )}
      {markers.map((m) => {
        const p = K.places[m.id];
        if (!p) return null;
        const place = placeById[m.id];
        const active = selected === m.id;
        const color = m.color || MARKER_COLORS[place.type];
        const act = () => onSelect && onSelect(m.id);
        return (
          <g key={m.id} className={`marker ${active ? 'active' : ''}`} transform={`translate(${p[0]},${p[1]})`}
            tabIndex={onSelect ? 0 : undefined} role={onSelect ? 'button' : undefined}
            aria-label={m.label || place.name} aria-pressed={onSelect ? active : undefined}
            onClick={act} onKeyDown={(e) => handleKey(e, act)}>
            <circle r="14" fill="transparent" />
            <circle className="ring" r={active ? 9 : 6.5} fill="#fff" stroke={color} strokeWidth="1.5" />
            <circle className="dot" r={active ? 5.5 : 3.8} fill={color} />
            {labels && (m.showLabel ?? true) && (
              <text className="label" x={m.dx ?? 10} y={m.dy ?? 4} textAnchor={m.anchor || 'start'} style={active ? { fontWeight: 700 } : undefined}>{m.label || place.name}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** India map (state outlines merged from district boundaries) for kingdoms whose reach crossed today's borders. */
export function IndiaMap({ highlight = [], markers = [], focusKarnataka = true, title = 'Map of India', crop = true }) {
  // Crop to peninsular & central India where the dynasties in this site operated.
  const vb = crop ? '0 240 400 410' : `0 0 ${I.w} ${I.h}`;
  return (
    <svg viewBox={vb} className="map-svg" role="img" aria-label={title}>
      <title>{title}</title>
      {I.states.map((s) => {
        const on = highlight.includes(s.name);
        const ka = s.name === 'Karnataka';
        return (
          <path key={s.name} d={s.d}
            style={{
              fill: on ? (ka && focusKarnataka ? '#c97a43' : '#e3b98d') : '#f3ebdd',
              stroke: ka ? '#1c1915' : '#c8b494', strokeWidth: ka ? 1.1 : 0.5, transition: 'fill .6s',
            }}>
            <title>{s.name}</title>
          </path>
        );
      })}
      {markers.map((id) => {
        const p = I.places[id];
        if (!p) return null;
        return (
          <g key={id} transform={`translate(${p[0]},${p[1]})`}>
            <circle r="3.4" fill="#fff" stroke="#c4362c" strokeWidth="1.2" />
            <circle r="1.7" fill="#c4362c" />
            <text className="label" x="5" y="3" style={{ fontSize: 7, strokeWidth: 2 }}>{placeById[id].name}</text>
          </g>
        );
      })}
    </svg>
  );
}

export const KA_DISTRICTS = K.districts;
export const KA_REGIONS = K.regions;
export const KA_OUTLINE = K.outline;
export const KA_VIEW = [K.w, K.h];
