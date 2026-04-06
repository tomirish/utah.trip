# Utah Trip Website — Design Spec
**Date:** 2026-04-05  
**Status:** Approved

---

## Goals

- Julie opens it on her phone and says "wow" — immediately sends it to her sisters
- Still fully functional as a day-to-day trip reference for both of them
- Easy to update as planning evolves (itinerary changes, bookings confirmed)
- Two-file split: shareable showcase + internal planning tool

---

## Files

### `index.html` — The Story
Public-facing, shareable. Beautiful on mobile. This is what Julie sends her sisters.

### `plan.html` — The Planner
Internal planning tool. Booking status, costs, open notes. Linked from `index.html` via a small discreet clipboard icon (bottom-right corner).

---

## `index.html` — Full Spec

### Tech Stack
- Single self-contained HTML file (inline CSS + JS, no build step)
- Fonts: Playfair Display (headings) + Jost (body) via Google Fonts — keep existing
- Color palette: keep existing (`--rust`, `--amber`, `--sand`, `--clay`, `--dusk`, `--cream`)
- Images: Unsplash (free, no auth required, `?w=600&q=80` params for mobile sizing)
- Videos: YouTube embeds (tap to play, no autoplay)

### Mobile-First Layout
- Base styles target 390px (iPhone 15 Pro)
- Max content width: 480px centered on desktop, full-bleed on mobile
- No horizontal overflow anywhere
- Tap targets minimum 44px height
- Font sizes: min 13px body, min 20px headings

### Page Structure (top to bottom)

#### 1. Hero
- Auto-crossfading full-bleed photo background: Zion canyon walls → Bryce hoodoos → starry night sky (3 photos, 4s each, CSS animation)
- Overlay text: eyebrow "June 21–28, 2025", large title "Utah Red Rock", subtitle route line
- Wedding pill: "💍 Wedding Jun 27 · St. George"
- Scroll hint arrow at bottom
- No nav bar in the hero — sticky date nav bar appears above content after hero

#### 2. Sticky Date Nav Bar
- Fixed bar pinned below top of viewport, full-width (max 480px), z-index above content
- Body gets `padding-top` matching bar height so no content hides behind it
- Pills: `Sun 21` · `Mon 22` · `Tue 23` · `Wed 24` · `Thu 25` · `Fri 26`
- Tapping a pill scrolls to that chapter's anchor (`#day-1`, `#day-2`, etc.)
- Scrollspy: as user scrolls, the pill for the current chapter highlights (IntersectionObserver watching each `<article>`)
- Same pill style as the existing Zion day selector (rust active, clay border inactive)

#### 3. Story Chapters (one per location)
Seven chapters in sequence (Day 1 added). Each chapter follows this structure:

```
[Full-bleed chapter photo — alternates left/right image placement on tablet+]
[Chapter header: eyebrow date, large title, hotel name]
[Horizontal-scroll media strip: 2–3 Unsplash photos + 1 YouTube thumbnail, swipeable]
[Accordion: one item per activity, collapsed by default]
```

**Chapter list:**

| # | Title | Dates | Key activities | Treatment |
|---|-------|-------|----------------|-----------|
| 1 | Cedar City — Arrival | Sun Jun 21 | Fly in LAS, drive to Cedar City, dinner | Slim (short banner, no media strip) |
| 2 | Kanarra Falls | Mon Jun 22 | Slot canyon hike, drive to Bryce | Full |
| 3 | Bryce Canyon | Mon eve – Tue | Rim drive, Peekaboo + Navajo + Queens | Full |
| 4 | Zion — Arrive | Tue Jun 23 | Belly of Dragon, Canyon Overlook, dinner | Full |
| 5 | Zion — Canyoneering | Wed Jun 24 | The Double Crown, gear pickup | Full |
| 6 | Zion — Narrows + Stars | Thu Jun 25 | Narrows, e-bike → Emerald Pools, stargazing | Full |
| 7 | St. George + Wedding | Fri–Sat Jun 26–27 | Kolob, arrive, wedding day | Full |

Fly home (Sun Jun 28) is a minimal footer element only — no full chapter.

**Day 1 slim treatment:** No full-bleed splash photo. Short banner (~200px) with a Cedar City / Southern Utah desert road photo. Header with eyebrow + title. No media strip. Accordion with 4 beats: Land at LAS → Drive to Cedar City → Check in Abbey Inn → Dinner at The Pub.

**Zion gets a day selector** — since it spans 3 days (chapters 4–6), each Zion chapter has a small "Tue / Wed / Thu" pill selector at the top that swaps the accordion content without a page jump.

#### 4. Footer
- Trip stats: 8 days · 3 national parks · 1 wedding · ~600 miles
- Small link to `plan.html` (clipboard icon + "Planning doc")
- Attribution: Unsplash photo credits

### Accordion Behavior
- All items collapsed by default
- Tap header to expand — smooth CSS height transition
- Expanded state shows: description, duration/distance, cost (if any), booking link button (if applicable)
- Booking status indicator on every item: ✅ or ⬜ inline in the subline

### Media Strip
- Horizontal scroll, no scrollbar visible
- Items: 72×52px rounded thumbnails
- Photos: Unsplash, 2–3 per chapter, **specific to the actual location being visited** (no generic people/travel shots)
- Video: 1 YouTube thumbnail per chapter with red play button overlay — tapping opens YouTube in new tab (no inline embed to keep page fast)
- Labeled with "← swipe →" hint on first visit only
- Day 1 (Cedar City) has no media strip

### Photo Sources (Unsplash — actual locations)
- **Hero slides:** Zion canyon walls/Angel's Landing view · Bryce hoodoos at sunrise · Utah Milky Way
- **Day 1 banner:** Cedar City / Southern Utah desert road
- **Kanarra Falls:** Slot canyon log ladders (the actual Kanarra creek canyon)
- **Bryce Canyon:** Thor's Hammer hoodoo / amphitheater panorama
- **Zion:** The Narrows wading shot · red canyon wall reflections
- **St. George / Kolob:** Red mesa landscape

### Sync Strategy (keeping HTML in sync with markdown)
- Each chapter is wrapped in a clearly commented block: `<!-- CHAPTER: Kanarra Falls -->`
- Each accordion item maps to a row in the markdown day table
- Booking status (✅/⬜) is the only thing that needs frequent updating — isolated to a single `data-status` attribute per item
- A comment at the top of the file: `<!-- Source of truth: utah-trip.md — update both when itinerary changes -->`

---

## `plan.html` — Full Spec

### Purpose
Internal trip planning dashboard. Not shared publicly. Linked from `index.html` footer.

### Sections

#### Bookings Table
Full chronological table matching the markdown `## Bookings` section:
- Columns: Date, What, Location, Book At (clickable link), Status (✅ / ⬜)
- ⬜ rows highlighted subtly (light amber background) so pending items are obvious at a glance
- Total estimated cost line at the bottom

#### Cost Tracker
Running tally of known costs per person:
- Kanarra permits: $15
- Canyoneering (The Double Crown): $279
- Narrows gear rental: ~$50
- E-bike rental: ~$100
- Stargazing tour: $190
- America the Beautiful Pass: $40 (half of $80)
- **Total per person (activities only):** ~$674

#### Open Notes
- Thursday load note (shorten Narrows / move e-bikes to Friday)
- Any other planning notes from the markdown

### Design
- Functional, clean — same color palette but simpler
- No photos, no animations
- Large tap targets, easy to scan on mobile
- Back link to `index.html` at the top

---

## Out of Scope
- No interactive map (Leaflet removed — adds weight, not needed for "wow" goal)
- No server, no backend, no build step
- No user accounts or shareable links beyond the HTML file itself
- No Angels Landing content (removed from itinerary)
- Observation Point / Watchman Trail kept as a note in Thursday accordion only (decision TBD)
