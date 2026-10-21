// Builds SVG-ready map data from real geographic sources:
//  - Karnataka districts (Census 2011 boundaries, via github.com/udit-001/india-maps-data, derived from GADM/Census data)
//  - Indian districts -> merged into state outlines with topojson (accurate shared borders)
//  - Natural Earth 10m river centrelines (public domain)
// Output: src/data/maps.json (projected path strings + projected place coordinates)
import fs from 'node:fs';
import { geoMercator, geoPath } from 'd3-geo';
import { topology } from 'topojson-server';
import { merge, mesh, feature } from 'topojson-client';
import { PLACES } from '../src/data/places.js';
import { DISTRICT_1956 } from '../src/data/unification.js';

const raw = (p) => JSON.parse(fs.readFileSync(new URL('../data-raw/' + p, import.meta.url)));
const ka = raw('ka-districts.geojson');
const india = raw('india-states.geojson');
// The source also contains one whole-state outline per state (no district name); it duplicates every
// district edge and breaks topojson.merge, so keep only real district polygons.
india.features = india.features.filter((f) => f.properties.district && f.geometry);
const rivers = raw('rivers.geojson');

// d3 expects clockwise exterior rings; GeoJSON sources often use the opposite winding.
function rewind(geo) {
  const ringArea = (r) => { let s = 0; for (let i = 0, n = r.length - 1; i < n; i++) s += (r[i + 1][0] - r[i][0]) * (r[i + 1][1] + r[i][1]); return s; };
  const fix = (rings) => rings.map((r, i) => { const cw = ringArea(r) > 0; return (i === 0 ? !cw : cw) ? r.slice().reverse() : r; });
  for (const f of geo.features) {
    const g = f.geometry; if (!g) continue;
    if (g.type === 'Polygon') g.coordinates = fix(g.coordinates);
    if (g.type === 'MultiPolygon') g.coordinates = g.coordinates.map(fix);
  }
  return geo;
}
rewind(ka); rewind(india);

// ---------- Karnataka ----------
const KW = 600, KH = 720;
const kaProj = geoMercator().fitExtent([[20, 20], [KW - 20, KH - 20]], ka);
const kaPath = geoPath(kaProj).digits(1);

const kaTopo = topology({ d: ka }, 1e5);
const outline = kaPath(merge(kaTopo, kaTopo.objects.d.geometries));
const internal = kaPath(mesh(kaTopo, kaTopo.objects.d, (a, b) => a !== b));

const districts = ka.features.map((f) => {
  const name = f.properties.district;
  const c = kaProj(geoPath().centroid(f));
  if (!DISTRICT_1956[name]) throw new Error('No 1956 mapping for ' + name);
  return { name, d: kaPath(f), cx: +c[0].toFixed(1), cy: +c[1].toFixed(1), ...DISTRICT_1956[name] };
});

// Region outlines for the unification map (merge districts by 1956 parent region)
const geoms = kaTopo.objects.d.geometries;
const regions = {};
for (const key of [...new Set(districts.map((d) => d.region))]) {
  regions[key] = kaPath(merge(kaTopo, geoms.filter((g, i) => districts[i].region === key)));
}

const bbox = [73.4, 11.3, 78.8, 18.6];
const inBox = ([x, y]) => x > bbox[0] && x < bbox[2] && y > bbox[1] && y < bbox[3];
const riverFeatures = rivers.features.filter((f) => {
  if (!f.geometry || !f.properties.name) return false;
  const lines = f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates;
  return lines.some((l) => l.some(inBox));
});
const kaRivers = riverFeatures.map((f) => ({ name: f.properties.name, d: kaPath(f) }));

const projectPlaces = (proj) =>
  Object.fromEntries(PLACES.map((p) => { const [x, y] = proj([p.lon, p.lat]); return [p.id, [+x.toFixed(1), +y.toFixed(1)]]; }));

// ---------- India ----------
const IW = 600, IH = 680;
const indiaTopo = topology({ d: india }, 1e5);
const stateNames = [...new Set(india.features.map((f) => f.properties.st_nm))];
const stateGeoms = (s) => indiaTopo.objects.d.geometries.filter((g, i) => india.features[i].properties.st_nm === s);
const mergedStates = stateNames.map((s) => ({ name: s, geo: merge(indiaTopo, stateGeoms(s)) }));
const inProj = geoMercator().fitExtent([[10, 10], [IW - 10, IH - 10]], { type: 'FeatureCollection', features: mergedStates.map((s) => ({ type: 'Feature', geometry: s.geo })) });
const inPath = geoPath(inProj).digits(1);
const states = mergedStates.map((s) => ({ name: s.name, d: inPath(s.geo) }));
const indiaRivers = riverFeatures.map((f) => ({ name: f.properties.name, d: inPath(f) }));

const out = {
  karnataka: { w: KW, h: KH, outline, internal, districts, regions, rivers: kaRivers, places: projectPlaces(kaProj) },
  india: { w: IW, h: IH, states, rivers: indiaRivers, places: projectPlaces(inProj) },
};
fs.writeFileSync(new URL('../src/data/maps.json', import.meta.url), JSON.stringify(out));
console.log('maps.json', (JSON.stringify(out).length / 1024).toFixed(0) + ' KB', 'districts', districts.length, 'states', states.length, 'rivers', kaRivers.map((r) => r.name).join(','));
