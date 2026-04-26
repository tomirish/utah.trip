# utah.trip

Static trip-planning site, deployed via GitHub Pages or similar. Two files: `index.html` and `sw.js`.

## Deploying

Before committing, check `sw.js` is current:

- **HTML changes only** — no `sw.js` changes needed. Network-first fetch means the PWA always gets fresh HTML when online; the cache updates automatically.
- **Adding or removing images or fonts** — update the `ASSETS` list in `sw.js` and bump the `CACHE` version (e.g. `v2` → `v3`). This forces the old cache to clear and all assets to be re-fetched.
- Fonts are self-hosted in `fonts/` — do not use Google Fonts CDN, it breaks offline use.
- Never add `plan.html` back to `ASSETS` — it was merged into `index.html`.

## Branches

Commit directly to `main` — no feature branches needed for this site.
