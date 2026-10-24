# Namma Karnataka — The Soul of a Land. The Story of a Civilization.

An interactive digital museum for the office Kannada Rajyotsava celebration (1 November).
React + Vite, no backend. Eighteen chapters plus three activities, each on its own route.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/
npm run preview    # serve the production build
```

Deploy `dist/` to any static host. All routes are client-side, so the host must fall back to
`index.html` (`public/_redirects` covers Netlify; `vercel.json` covers Vercel).

## Structure

| Path | What it holds |
| --- | --- |
| `src/pages/` | One component per chapter (`Land`, `Kingdoms`, `Monuments`, … `Future`, `Play`, `SourcesPage`) |
| `src/components/ui.jsx` | Image-with-credit/placeholder, reveal-on-scroll, certainty badges, sources panel, modal, tabs, speech |
| `src/components/maps.jsx` | Karnataka and India SVG maps built from real boundary data |
| `src/components/Layout.jsx` | Header, EN/ಕನ್ನಡ toggle, chapter drawer, persistent chapter rail, footer |
| `src/data/` | Structured content: `kingdoms`, `monuments`, `kannada`, `food`, `play` (quiz, tongue twisters, guess-the-monument), `unification`, `places`, `sources`, `chapters` |
| `src/data/images.json` | Generated — every image's Commons URL, author and licence |
| `src/data/maps.json` | Generated — projected SVG paths for districts, states, rivers and places |
| `scripts/` | Data pipelines (see below) |

## Data pipelines

- `npm run data:images` resolves every key in `scripts/image-sources.mjs` to an openly licensed
  Wikimedia Commons file and records author, licence and source page. Non-Commons (non-free) files
  are rejected, so the site shows a labelled placeholder instead. `node scripts/check-images.mjs`
  confirms every URL responds.
- `npm run data:maps` builds `maps.json` from `data-raw/` (Census 2011 district boundaries from
  github.com/udit-001/india-maps-data; Natural Earth rivers). The 1956 unification map groups
  present-day districts by their pre-1956 parent district (`src/data/unification.js`), with taluk-level
  exceptions recorded per district.

## Before the event — please check

1. **Tongue twisters 4–10** (`src/data/play.js`, marked `composed`) were written for this site; have a
   fluent Kannada speaker review them. Twisters 1–2 are traditional; 3 is an adaptation.
2. **Placeholders** appear where no verified, openly licensed photograph exists (Bhuvaneshwari,
   Veeragase, Kolata, several early poets and dishes). Replace them only with images whose subject and
   licence you can confirm, by adding a Commons file in `scripts/image-sources.mjs` and re-running
   `npm run data:images`.
3. Audio uses the device's Kannada text-to-speech voice when one is installed; otherwise the
   buttons are hidden.
4. The message wall and favourite-places map save to `localStorage` on the device in use. Nothing is uploaded.
