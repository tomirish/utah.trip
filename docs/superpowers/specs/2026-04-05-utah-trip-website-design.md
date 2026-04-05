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
- No nav bar — pure story experience, scroll to navigate

#### 2. Story Chapters (one per location)
Six chapters in sequence. Each chapter follows this structure:

```
[Full-bleed chapter photo — alternates left/right image placement on tablet+]
[Chapter header: eyebrow date, large title, hotel name]
[Horizontal-scroll media strip: 2–3 Unsplash photos + 1 YouTube thumbnail, swipeable]
[Accordion: one item per activity, collapsed by default]
```

**Chapter list:**

| # | Title | Dates | Key activities |
|---|-------|-------|----------------|
| 1 | Kanarra Falls | Mon Jun 22 | Slot canyon hike, drive to Bryce |
| 2 | Bryce Canyon | Mon eve – Tue | Rim drive, Peekaboo + Navajo + Queens |
| 3 | Zion — Arrive | Tue Jun 23 | Belly of Dragon, Canyon Overlook, dinner |
| 4 | Zion — Canyoneering | Wed Jun 24 | The Double Crown, gear pickup |
| 5 | Zion — Narrows + Stars | Thu Jun 25 | Narrows, e-bike → Emerald Pools, stargazing |
| 6 | St. George + Wedding | Fri–Sat Jun 26–27 | Kolob, arrive, wedding day |

Fly home (Sun Jun 28) is a minimal footer element only — no full chapter.

**Zion gets a day selector** — since it spans 3 days (chapters 3–5), each Zion chapter has a small "Tue / Wed / Thu" pill selector at the top that swaps the accordion content without a page jump.

#### 3. Footer
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
- Photos: Unsplash, 2–3 per chapter, specific to that location
- Video: 1 YouTube thumbnail per chapter with red play button overlay — tapping opens YouTube in new tab (no inline embed to keep page fast)
- Labeled with "← swipe →" hint on first visit only

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
