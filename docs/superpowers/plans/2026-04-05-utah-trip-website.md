# Utah Trip Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `index.html` as a mobile-first story scroll site with full-bleed photos, swipeable media strips, and accordion day details — plus a new `plan.html` internal planning dashboard.

**Architecture:** Two self-contained HTML files, no build step. `index.html` is the shareable story (4 location chapters + Zion 3-day selector). `plan.html` is the internal booking/cost tracker. Both use inline CSS + JS, same color palette, Google Fonts.

**Tech Stack:** HTML5, CSS custom properties, vanilla JS, Unsplash (photos), YouTube links (video thumbnails)

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `index.html` | **Rewrite** | Story scroll — hero, 4 chapters, footer |
| `plan.html` | **Create** | Internal planner — bookings, costs, notes |

The existing `index.html` is large and outdated. Rewrite from scratch — do not patch the old file.

---

## Task 1: Scaffold + CSS Foundation

**Files:**
- Rewrite: `index.html`

- [ ] **Step 1: Replace index.html with the new scaffold**

```html
<!DOCTYPE html>
<!-- Source of truth: utah-trip.md — update both when itinerary changes -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Utah Red Rock · June 2025</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --rust:  #C4521A;
  --amber: #E07B39;
  --sand:  #F2DEC4;
  --clay:  #8B4A2B;
  --dusk:  #2C1810;
  --sage:  #7A8C6E;
  --cream: #FBF5ED;
  --light: #FBF0E4;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Jost', sans-serif;
  background: var(--cream);
  color: var(--dusk);
  overflow-x: hidden;
  max-width: 480px;
  margin: 0 auto;
}
img { display: block; width: 100%; }
a { color: inherit; text-decoration: none; }
</style>
</head>
<body>
  <!-- content goes here -->
</body>
</html>
```

- [ ] **Step 2: Open `index.html` in browser**

Verify: page loads, background is `#FBF5ED` cream, no horizontal scrollbar, Jost font renders in dev tools.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: scaffold new index.html with CSS foundation"
```

---

## Task 2: Hero Section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add hero CSS inside the `<style>` block**

```css
/* ── HERO ── */
.hero {
  position: relative;
  height: 100svh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 0 48px;
  overflow: hidden;
}
.hero-slides { position: absolute; inset: 0; }
.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  animation: cf 15s infinite;
}
.hero-slide:nth-child(1) { animation-delay: 0s; }
.hero-slide:nth-child(2) { animation-delay: 5s; }
.hero-slide:nth-child(3) { animation-delay: 10s; }
@keyframes cf {
  0%   { opacity: 0; }
  6%   { opacity: 1; }
  33%  { opacity: 1; }
  40%  { opacity: 0; }
  100% { opacity: 0; }
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(44,24,16,0.1) 0%,
    rgba(44,24,16,0.2) 40%,
    rgba(44,24,16,0.85) 100%
  );
}
.hero-content {
  position: relative;
  z-index: 2;
  padding: 0 24px;
}
.hero-eyebrow {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 10px;
  opacity: 0;
  animation: fadeUp 0.8s 0.3s forwards;
}
.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(52px, 14vw, 80px);
  line-height: 0.95;
  color: var(--sand);
  margin-bottom: 12px;
  opacity: 0;
  animation: fadeUp 0.8s 0.5s forwards;
}
.hero-title em { color: var(--amber); font-style: italic; }
.hero-route {
  font-size: 12px;
  font-weight: 300;
  color: rgba(242,222,196,0.6);
  letter-spacing: 0.5px;
  margin-bottom: 20px;
  opacity: 0;
  animation: fadeUp 0.8s 0.7s forwards;
}
.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--rust);
  color: white;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  opacity: 0;
  animation: fadeUp 0.8s 0.9s forwards;
}
.hero-scroll {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: rgba(242,222,196,0.4);
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
  animation: fadeIn 1s 1.4s forwards;
}
.hero-scroll-line {
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, transparent, rgba(242,222,196,0.4));
  animation: pulse 2s infinite;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
```

- [ ] **Step 2: Add hero HTML inside `<body>`**

```html
<!-- HERO -->
<section class="hero">
  <div class="hero-slides">
    <div class="hero-slide" style="background-image:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80')"></div>
    <div class="hero-slide" style="background-image:url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80')"></div>
    <div class="hero-slide" style="background-image:url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80')"></div>
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">June 21 – 28, 2025</div>
    <h1 class="hero-title">Utah<br><em>Red Rock</em></h1>
    <p class="hero-route">Las Vegas → Cedar City → Bryce → Zion → St. George</p>
    <div class="hero-pill">💍 Wedding Jun 27 · St. George</div>
  </div>
  <div class="hero-scroll">
    <div class="hero-scroll-line"></div>
    scroll
  </div>
</section>
```

- [ ] **Step 3: Open in browser (mobile viewport 390px)**

Verify: photos crossfade every 5 seconds, text animates in, "Utah Red Rock" is large and bold, wedding pill appears, scroll hint pulses at bottom. Check in browser devtools at 390px width.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: hero section with crossfade photos and animated text"
```

---

## Task 3: Chapter CSS + Accordion JS

**Files:**
- Modify: `index.html`

This task builds the shared styles and JS used by all 4 chapters. No chapter content yet.

- [ ] **Step 1: Add chapter + media strip CSS to the `<style>` block**

```css
/* ── CHAPTERS ── */
.chapter { background: white; }
.chapter + .chapter { border-top: 3px solid var(--rust); }

.chapter-splash {
  position: relative;
  height: 260px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}
.chapter-splash-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 30%, rgba(44,24,16,0.82));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
}
.chapter-eyebrow {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 4px;
}
.chapter-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 900;
  color: white;
  line-height: 1.0;
}
.chapter-title em { color: var(--amber); font-style: italic; }
.chapter-hotel {
  font-size: 11px;
  color: rgba(242,222,196,0.6);
  margin-top: 5px;
}

/* ── MEDIA STRIP ── */
.media-strip-wrap { background: var(--light); padding: 12px 0 10px; }
.media-strip-hint {
  font-size: 10px;
  color: rgba(139,74,43,0.5);
  padding: 0 16px 6px;
  letter-spacing: 0.5px;
}
.media-strip {
  display: flex;
  gap: 8px;
  padding: 0 16px;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.media-strip::-webkit-scrollbar { display: none; }
.media-thumb {
  flex-shrink: 0;
  width: 90px;
  height: 64px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 8px rgba(44,24,16,0.15);
}
.media-thumb-video {
  flex-shrink: 0;
  width: 90px;
  height: 64px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 8px rgba(44,24,16,0.15);
  position: relative;
  overflow: hidden;
  display: block;
  text-decoration: none;
}
.media-thumb-video::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
}
.yt-play-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 28px;
  height: 28px;
  background: rgba(255,0,0,0.9);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.yt-play-badge::after {
  content: '';
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 11px solid white;
  margin-left: 2px;
}

/* ── ACCORDION ── */
.accordion { background: white; }
.acc-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(44,24,16,0.07);
  cursor: pointer;
  min-height: 44px;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s;
}
.acc-header:active { background: var(--light); }
.acc-icon { font-size: 18px; flex-shrink: 0; width: 24px; text-align: center; }
.acc-header-text { flex: 1; }
.acc-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--dusk);
  line-height: 1.3;
}
.acc-sub {
  font-size: 11px;
  color: rgba(139,74,43,0.7);
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.acc-time {
  font-size: 11px;
  font-weight: 700;
  color: var(--rust);
  white-space: nowrap;
  flex-shrink: 0;
}
.acc-chevron {
  font-size: 11px;
  color: rgba(139,74,43,0.35);
  flex-shrink: 0;
  transition: transform 0.25s;
}
.acc-header.open .acc-chevron { transform: rotate(180deg); }
.acc-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.acc-body-inner {
  padding: 12px 18px 16px 54px;
  background: #faf6f2;
  border-bottom: 1px solid rgba(44,24,16,0.07);
}
.acc-desc {
  font-size: 13px;
  font-weight: 300;
  color: var(--clay);
  line-height: 1.65;
  margin-bottom: 10px;
}
.acc-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.acc-tag {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
}
.acc-tag-dur  { background: rgba(139,74,43,0.1); color: var(--clay); }
.acc-tag-cost { background: rgba(196,82,26,0.1); color: var(--rust); }
.acc-tag-book { background: rgba(122,140,110,0.15); color: var(--sage); }
.acc-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 11px;
  font-weight: 600;
  background: var(--rust);
  color: white;
  text-decoration: none;
  transition: background 0.2s;
}
.acc-btn:active { background: var(--clay); }
.status-booked { color: #4caf50; }
.status-pending { color: var(--amber); }

/* ── ZION DAY SELECTOR ── */
.day-selector {
  display: flex;
  gap: 8px;
  padding: 14px 18px;
  background: var(--light);
  border-bottom: 1px solid rgba(44,24,16,0.07);
}
.day-pill {
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid rgba(196,82,26,0.25);
  color: var(--clay);
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.day-pill.active {
  background: var(--rust);
  border-color: var(--rust);
  color: white;
}

/* ── FOOTER ── */
.site-footer {
  background: var(--dusk);
  padding: 40px 24px;
  text-align: center;
}
.footer-stats {
  display: flex;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.footer-stat {
  padding: 0 20px;
  border-right: 1px solid rgba(242,222,196,0.15);
}
.footer-stat:last-child { border-right: none; }
.footer-stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--amber);
  display: block;
}
.footer-stat-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(242,222,196,0.4);
}
.footer-plan-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  border: 1px solid rgba(242,222,196,0.2);
  border-radius: 24px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(242,222,196,0.5);
  text-decoration: none;
  margin-bottom: 28px;
  transition: all 0.2s;
}
.footer-plan-link:active { border-color: var(--amber); color: var(--amber); }
.footer-credit {
  font-size: 10px;
  color: rgba(242,222,196,0.2);
  line-height: 1.7;
}

/* ── FADE-UP SCROLL ANIMATION ── */
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-up.visible { opacity: 1; transform: none; }
```

- [ ] **Step 2: Add JavaScript before `</body>`**

```html
<script>
// ── Accordion ──
function toggleAcc(header) {
  const body = header.nextElementSibling;
  const isOpen = header.classList.contains('open');
  // close siblings
  header.closest('.accordion').querySelectorAll('.acc-header.open').forEach(h => {
    h.classList.remove('open');
    h.nextElementSibling.style.maxHeight = null;
  });
  if (!isOpen) {
    header.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

// ── Zion day selector ──
function showZionDay(day, btn) {
  document.querySelectorAll('.zion-day').forEach(d => { d.style.display = 'none'; });
  document.getElementById('zion-day-' + day).style.display = 'block';
  document.querySelectorAll('.day-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
}

// ── Scroll fade-up ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
</script>
```

- [ ] **Step 3: Verify no JS errors**

Open browser devtools console. Reload page. Should be zero errors.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: chapter/accordion/day-selector CSS and JS"
```

---

## Task 4: Chapter 1 — Kanarra Falls (Mon Jun 22)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Chapter 1 HTML after the `</section>` hero closing tag**

```html
<!-- CHAPTER: Kanarra Falls -->
<article class="chapter fade-up">
  <div class="chapter-splash" style="background-image:url('https://images.unsplash.com/photo-1518623001395-125242310d0c?w=800&q=80')">
    <div class="chapter-splash-overlay">
      <div class="chapter-eyebrow">Day 2 · Monday June 22</div>
      <h2 class="chapter-title">Kanarra<br><em>Falls</em></h2>
      <div class="chapter-hotel">🌙 Ruby's Inn · Bryce Canyon City</div>
    </div>
  </div>

  <div class="media-strip-wrap">
    <div class="media-strip-hint">← swipe photos →</div>
    <div class="media-strip">
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1518623001395-125242310d0c?w=300&q=80')"></div>
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&q=80')"></div>
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80')"></div>
      <!-- REPLACE search: "Kanarra Falls hike Utah" on YouTube, copy video ID from URL -->
      <a class="media-thumb-video" href="https://www.youtube.com/results?search_query=kanarra+falls+hike+utah" target="_blank" rel="noopener"
         style="background-image:url('https://images.unsplash.com/photo-1518623001395-125242310d0c?w=300&q=80')">
        <div class="yt-play-badge"></div>
      </a>
    </div>
  </div>

  <div class="accordion">
    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🚗</div>
      <div class="acc-header-text">
        <div class="acc-name">Drive Cedar City → Kanarraville</div>
        <div class="acc-sub"><span>30 min · 25 mi · I-15 south</span></div>
      </div>
      <div class="acc-time">8:30 AM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Head south on I-15 to Exit 51. Kanarraville is a tiny town — just follow signs to the trailhead. Park at the town park ($5 fee collected on site).</p>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🌊</div>
      <div class="acc-header-text">
        <div class="acc-name">Kanarra Falls</div>
        <div class="acc-sub"><span class="status-booked">✅ Permits booked</span><span>3.7 mi · 3 hrs</span></div>
      </div>
      <div class="acc-time">9:00 AM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Hike IN Kanarra Creek through a jaw-dropping slot canyon with two major waterfalls. Water is ankle-to-knee deep throughout. Climb a 20-foot metal ladder next to the first waterfall. Cold, beautiful, completely unique.</p>
      <div class="acc-tags">
        <span class="acc-tag acc-tag-dur">3.7 mi out-and-back</span>
        <span class="acc-tag acc-tag-dur">~3 hours</span>
        <span class="acc-tag acc-tag-cost">$15/person</span>
      </div>
      <a class="acc-btn" href="https://www.kanarrafalls.com" target="_blank" rel="noopener">kanarrafalls.com</a>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🚗</div>
      <div class="acc-header-text">
        <div class="acc-name">Drive to Bryce Canyon</div>
        <div class="acc-sub"><span>~1.5 hrs · 80 mi · Hwy 20 → Hwy 89</span></div>
      </div>
      <div class="acc-time">12:00 PM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Scenic ranch-country drive east on Hwy 20 then south on Hwy 89. Stop for lunch on the way — Panguitch has a few diner options.</p>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🏨</div>
      <div class="acc-header-text">
        <div class="acc-name">Check in — Ruby's Inn</div>
        <div class="acc-sub"><span class="status-booked">✅ Booked</span><span>Breakfast included</span></div>
      </div>
      <div class="acc-time">2:30 PM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Classic Bryce Canyon basecamp right at the park entrance. Hot breakfast included. General store on site for any last-minute supplies.</p>
      <a class="acc-btn" href="https://www.rubysinn.com" target="_blank" rel="noopener">rubysinn.com</a>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🌅</div>
      <div class="acc-header-text">
        <div class="acc-name">Bryce Rim Drive — Golden Hour</div>
        <div class="acc-sub"><span>Sunset Point → Inspiration Point</span><span>~1.5 hrs</span></div>
      </div>
      <div class="acc-time">4:30 PM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Drive the rim road at golden hour. Sunset Point is the classic Thor's Hammer shot — glow is best 45 min before actual sunset. Inspiration Point has the widest panoramic view of the whole amphitheater and fewer crowds.</p>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🍽️</div>
      <div class="acc-header-text">
        <div class="acc-name">Dinner at Ruby's Inn</div>
        <div class="acc-sub"><span>On-site · ~1 hr</span></div>
      </div>
      <div class="acc-time">7:30 PM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">On-site restaurant — no driving needed. Early bed. 7 AM hike tomorrow.</p>
    </div></div>
  </div>
</article>
```

- [ ] **Step 2: Open in browser**

Verify: Chapter splash photo shows with title overlay, media strip scrolls horizontally with 3 photos + video thumbnail, accordions all start closed, tapping one opens smoothly, tapping another closes the first and opens the new one. Check that ✅ and pending status render in the subline.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: chapter 1 — Kanarra Falls with media strip and accordion"
```

---

## Task 5: Chapter 2 — Bryce Canyon (Tue Jun 23)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Chapter 2 HTML after Chapter 1 `</article>`**

```html
<!-- CHAPTER: Bryce Canyon -->
<article class="chapter fade-up">
  <div class="chapter-splash" style="background-image:url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80')">
    <div class="chapter-splash-overlay">
      <div class="chapter-eyebrow">Day 3 · Tuesday June 23</div>
      <h2 class="chapter-title">Bryce<br><em>Canyon</em></h2>
      <div class="chapter-hotel">🌙 Petty Ranch Inn · Night 1 of 3</div>
    </div>
  </div>

  <div class="media-strip-wrap">
    <div class="media-strip-hint">← swipe photos →</div>
    <div class="media-strip">
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80')"></div>
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1526090056489-40c74b8b9ad2?w=300&q=80')"></div>
      <!-- REPLACE search: "Bryce Canyon hoodoos drone 4K" on YouTube -->
      <a class="media-thumb-video" href="https://www.youtube.com/results?search_query=bryce+canyon+hoodoos+drone+4k" target="_blank" rel="noopener"
         style="background-image:url('https://images.unsplash.com/photo-1526090056489-40c74b8b9ad2?w=300&q=80')">
        <div class="yt-play-badge"></div>
      </a>
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&q=80')"></div>
    </div>
  </div>

  <div class="accordion">
    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🥾</div>
      <div class="acc-header-text">
        <div class="acc-name">Peekaboo + Navajo + Queen's Garden</div>
        <div class="acc-sub"><span>5.5 mi · 4 hrs · Start 7 AM sharp</span></div>
      </div>
      <div class="acc-time">7:00 AM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">The ultimate Bryce morning. Start at Sunset Point and combine three trails: Navajo Loop descends through Wall Street (Bryce's only slot canyon), Queen's Garden gets you past the Queen Victoria hoodoo, Peekaboo takes you deeper where most visitors never go. Zero shade — start by 7 AM or it gets brutal.</p>
      <div class="acc-tags">
        <span class="acc-tag acc-tag-dur">5.5 mi loop</span>
        <span class="acc-tag acc-tag-dur">3.5–4.5 hrs</span>
        <span class="acc-tag acc-tag-dur">Strenuous</span>
      </div>
      <a class="acc-btn" href="https://www.alltrails.com/trail/us/utah/navajo-loop-and-queens-garden-trail" target="_blank" rel="noopener">AllTrails</a>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🚗</div>
      <div class="acc-header-text">
        <div class="acc-name">Rainbow Point Drive-Through</div>
        <div class="acc-sub"><span>20 min · 9,115 ft · on route south</span></div>
      </div>
      <div class="acc-time">11:30 AM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Highest point in the park on the way out. Sweeping views over the Grand Staircase. Only adds 20 minutes — worth it.</p>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🐉</div>
      <div class="acc-header-text">
        <div class="acc-name">Belly of the Dragon</div>
        <div class="acc-sub"><span>Free · 1.7 mi · 20–30 min · skip if raining</span></div>
      </div>
      <div class="acc-time">12:30 PM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">A drainage tunnel carved under Hwy 89 — erosion has sculpted the sandstone interior into a ribbed, cave-like passage. Completely dark in the middle. Bring a flashlight. Right on the drive to Zion — free, unique, 20 minutes. Do NOT enter if raining, it floods fast.</p>
      <a class="acc-btn" href="https://www.alltrails.com/trail/us/utah/the-belly-of-the-dragon" target="_blank" rel="noopener">AllTrails</a>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🏨</div>
      <div class="acc-header-text">
        <div class="acc-name">Check in — Petty Ranch Inn</div>
        <div class="acc-sub"><span class="status-booked">✅ Booked</span><span>3 nights base camp</span></div>
      </div>
      <div class="acc-time">2:00 PM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Drive ~85 miles / 1.5 hrs from Bryce via Hwy 89. Petty Ranch Inn is your home base for 3 nights in Zion.</p>
      <a class="acc-btn" href="https://www.pettyranchinn.com" target="_blank" rel="noopener">pettyranchinn.com</a>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🏞️</div>
      <div class="acc-header-text">
        <div class="acc-name">Canyon Overlook Trail</div>
        <div class="acc-sub"><span>1 mi · 45 min · Easy warm-up</span></div>
      </div>
      <div class="acc-time">3:30 PM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Best easy hike in Zion. Starts at the east end of the Mt. Carmel Tunnel — almost no elevation, ends at a stunning overlook of lower Zion Canyon and the Great Arch. Perfect first-afternoon hike: gets your legs moving without destroying them before the big days.</p>
      <a class="acc-btn" href="https://www.alltrails.com/trail/us/utah/canyon-overlook-trail" target="_blank" rel="noopener">AllTrails</a>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🍽️</div>
      <div class="acc-header-text">
        <div class="acc-name">Dinner — Balcony Restaurant</div>
        <div class="acc-sub"><span>Best in Springdale · ~1 hr</span></div>
      </div>
      <div class="acc-time">7:00 PM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">First night in Zion — treat yourselves. The balcony restaurant in Springdale has great views of the canyon walls at dusk.</p>
    </div></div>
  </div>
</article>
```

- [ ] **Step 2: Open in browser**

Verify: Bryce chapter appears below Kanarra, splash photo is the hoodoos, chapters are separated by rust border, accordions work independently from Chapter 1's accordions.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: chapter 2 — Bryce Canyon"
```

---

## Task 6: Chapter 3 — Zion (3-Day Selector: Wed + Thu)

**Files:**
- Modify: `index.html`

This is the largest chapter. One splash image and media strip, then a Tue/Wed/Thu day pill selector that swaps which day's accordion is shown. Note: Tue Jun 23 content is already in Chapter 2 (drive to Zion + Canyon Overlook), so the Zion chapter covers Wed + Thu only. The day selector shows **Wed** and **Thu**.

- [ ] **Step 1: Add Chapter 3 HTML after Chapter 2 `</article>`**

```html
<!-- CHAPTER: Zion National Park -->
<article class="chapter fade-up">
  <div class="chapter-splash" style="background-image:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80')">
    <div class="chapter-splash-overlay">
      <div class="chapter-eyebrow">Days 4–5 · Wed–Thu June 24–25</div>
      <h2 class="chapter-title">Zion<br><em>National Park</em></h2>
      <div class="chapter-hotel">🌙 Petty Ranch Inn · Nights 2 & 3</div>
    </div>
  </div>

  <div class="media-strip-wrap">
    <div class="media-strip-hint">← swipe photos →</div>
    <div class="media-strip">
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80')"></div>
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?w=300&q=80')"></div>
      <!-- REPLACE search: "Zion Narrows hike bottom up" on YouTube -->
      <a class="media-thumb-video" href="https://www.youtube.com/results?search_query=zion+narrows+hike+bottom+up" target="_blank" rel="noopener"
         style="background-image:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80')">
        <div class="yt-play-badge"></div>
      </a>
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&q=80')"></div>
      <!-- REPLACE search: "Zion National Park night sky Milky Way" on YouTube -->
      <a class="media-thumb-video" href="https://www.youtube.com/results?search_query=zion+national+park+milky+way+night+sky" target="_blank" rel="noopener"
         style="background-image:url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&q=80')">
        <div class="yt-play-badge"></div>
      </a>
    </div>
  </div>

  <!-- Day selector -->
  <div class="day-selector">
    <button class="day-pill active" onclick="showZionDay('wed', this)">Wed Jun 24</button>
    <button class="day-pill"        onclick="showZionDay('thu', this)">Thu Jun 25</button>
  </div>

  <!-- WED JUN 24 — Canyoneering -->
  <div id="zion-day-wed" class="zion-day">
    <div class="accordion">
      <div class="acc-header" onclick="toggleAcc(this)">
        <div class="acc-icon">🧗</div>
        <div class="acc-header-text">
          <div class="acc-name">"The Double Crown" — Huntress + Ladder</div>
          <div class="acc-sub"><span class="status-pending">⬜ Book now</span><span>7 hrs · $279/person</span></div>
        </div>
        <div class="acc-time">9:00 AM</div>
        <div class="acc-chevron">▼</div>
      </div>
      <div class="acc-body"><div class="acc-body-inner">
        <p class="acc-desc">Julie's pick. Two of Zion's most coveted slot canyons in one full day — Huntress and Ladder. 10+ rappels up to 80ft free-hanging into narrow sandstone corridors. Private tour, no experience needed. One of the best things on this entire trip.</p>
        <div class="acc-tags">
          <span class="acc-tag acc-tag-dur">7 hours</span>
          <span class="acc-tag acc-tag-cost">$279/person</span>
          <span class="acc-tag acc-tag-dur">Moderate</span>
        </div>
        <a class="acc-btn" href="https://www.zionguru.com" target="_blank" rel="noopener">Book at zionguru.com</a>
      </div></div>

      <div class="acc-header" onclick="toggleAcc(this)">
        <div class="acc-icon">🛍️</div>
        <div class="acc-header-text">
          <div class="acc-name">Pick up Narrows gear</div>
          <div class="acc-sub"><span>Zion Guru · ~$50/person · 20 min</span></div>
        </div>
        <div class="acc-time">5:00 PM</div>
        <div class="acc-chevron">▼</div>
      </div>
      <div class="acc-body"><div class="acc-body-inner">
        <p class="acc-desc">Pick up neoprene socks, water shoes, and a trekking pole for tomorrow's Narrows hike. Gear must be picked up the evening before.</p>
        <a class="acc-btn" href="https://www.zionguru.com" target="_blank" rel="noopener">Zion Guru</a>
      </div></div>

      <div class="acc-header" onclick="toggleAcc(this)">
        <div class="acc-icon">🍽️</div>
        <div class="acc-header-text">
          <div class="acc-name">Dinner in Springdale</div>
          <div class="acc-sub"><span>~1 hr</span></div>
        </div>
        <div class="acc-time">6:00 PM</div>
        <div class="acc-chevron">▼</div>
      </div>
      <div class="acc-body"><div class="acc-body-inner">
        <p class="acc-desc">Spotted Dog Café or Switchback Grille. Early night — big day tomorrow.</p>
      </div></div>
    </div>
  </div>

  <!-- THU JUN 25 — Narrows + Stargazing -->
  <div id="zion-day-thu" class="zion-day" style="display:none">
    <div class="accordion">
      <div class="acc-header" onclick="toggleAcc(this)">
        <div class="acc-icon">🌊</div>
        <div class="acc-header-text">
          <div class="acc-name">The Narrows</div>
          <div class="acc-sub"><span>Up to 9 mi · 4–5 hrs · gear from last night</span></div>
        </div>
        <div class="acc-time">7:00 AM</div>
        <div class="acc-chevron">▼</div>
      </div>
      <div class="acc-body"><div class="acc-body-inner">
        <p class="acc-desc">One of the most iconic hikes in America. The trail disappears into the Virgin River — you hike upstream through a 1,000-ft slot canyon, water ankle to waist deep. Go as far as you want and turn back. Consider doing 2–2.5 hrs to save energy for the afternoon and stargazing.</p>
        <div class="acc-tags">
          <span class="acc-tag acc-tag-dur">Up to 9 mi</span>
          <span class="acc-tag acc-tag-dur">4–5 hrs (or shorten)</span>
          <span class="acc-tag acc-tag-cost">Gear ~$50/person</span>
        </div>
        <a class="acc-btn" href="https://www.alltrails.com/trail/us/utah/zion-narrows-trail-to-imlay-temple-and-big-spring" target="_blank" rel="noopener">AllTrails</a>
      </div></div>

      <div class="acc-header" onclick="toggleAcc(this)">
        <div class="acc-icon">🚲</div>
        <div class="acc-header-text">
          <div class="acc-name">E-Bike → Emerald Pools</div>
          <div class="acc-sub"><span class="status-pending">⬜ Book bikes</span><span>~7 mi bike + 3 mi hike · 4 hrs</span></div>
        </div>
        <div class="acc-time">2:00 PM</div>
        <div class="acc-chevron">▼</div>
      </div>
      <div class="acc-body"><div class="acc-body-inner">
        <p class="acc-desc">Rent Trek e-bikes from Zion Cycles, ride the Pa'rus Trail + Scenic Drive up to Zion Lodge (stop 5), lock bikes, hike Emerald Pools (pools + walk-behind waterfall), ride back. Pedal assist makes it easy even after the Narrows. A completely different perspective of the canyon.</p>
        <div class="acc-tags">
          <span class="acc-tag acc-tag-cost">~$100/bike</span>
          <span class="acc-tag acc-tag-dur">Half day</span>
        </div>
        <a class="acc-btn" href="https://www.zioncycles.com" target="_blank" rel="noopener">Zion Cycles</a>
      </div></div>

      <div class="acc-header" onclick="toggleAcc(this)">
        <div class="acc-icon">🍽️</div>
        <div class="acc-header-text">
          <div class="acc-name">Dinner in Springdale</div>
          <div class="acc-sub"><span>~1 hr · pack tonight for Friday departure</span></div>
        </div>
        <div class="acc-time">6:30 PM</div>
        <div class="acc-chevron">▼</div>
      </div>
      <div class="acc-body"><div class="acc-body-inner">
        <p class="acc-desc">Last dinner in Springdale. Pack everything tonight — sleeping in Friday before Kolob.</p>
      </div></div>

      <div class="acc-header" onclick="toggleAcc(this)">
        <div class="acc-icon">🌟</div>
        <div class="acc-header-text">
          <div class="acc-name">Zion Stargazing Tour</div>
          <div class="acc-sub"><span class="status-pending">⬜ Book now</span><span>NEW MOON · 2 hrs · $190/person</span></div>
        </div>
        <div class="acc-time">9:00 PM</div>
        <div class="acc-chevron">▼</div>
      </div>
      <div class="acc-body"><div class="acc-body-inner">
        <p class="acc-desc">June 25 is the new moon — maximum darkness. Zion is a certified Dark Sky Park. Zero-gravity reclining pods, blankets, Celestron binoculars, hot drinks. Professional guide walks you through constellations, planets, and the full Milky Way arching overhead. The best possible night of the month to do this.</p>
        <div class="acc-tags">
          <span class="acc-tag acc-tag-cost">$190/person</span>
          <span class="acc-tag acc-tag-dur">2 hours</span>
          <span class="acc-tag acc-tag-dur">Kolob Terrace Rd</span>
        </div>
        <a class="acc-btn" href="https://www.stargazingzion.com" target="_blank" rel="noopener">stargazingzion.com</a>
      </div></div>
    </div>
  </div>
</article>
```

- [ ] **Step 2: Open in browser**

Verify: Wed tab is active by default, Wed accordion shows, tapping Thu switches content without scrolling. Both day accordions work independently. Stargazing item shows ⬜ pending. Thursday note visible in Narrows description.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: chapter 3 — Zion with Wed/Thu day selector"
```

---

## Task 7: Chapter 4 — St. George + Wedding + Footer

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Chapter 4 + footer HTML after Chapter 3 `</article>`**

```html
<!-- CHAPTER: St. George + Wedding -->
<article class="chapter fade-up">
  <div class="chapter-splash" style="background-image:url('https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80')">
    <div class="chapter-splash-overlay">
      <div class="chapter-eyebrow">Days 6–7 · Fri–Sat June 26–27</div>
      <h2 class="chapter-title">St. George<br><em>&amp; The Wedding</em></h2>
      <div class="chapter-hotel">🌙 The Ledges of St. George · Poolside Oasis</div>
    </div>
  </div>

  <div class="media-strip-wrap">
    <div class="media-strip-hint">← swipe photos →</div>
    <div class="media-strip">
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&q=80')"></div>
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300&q=80')"></div>
      <div class="media-thumb" style="background-image:url('https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=300&q=80')"></div>
    </div>
  </div>

  <div class="accordion">
    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">💤</div>
      <div class="acc-header-text">
        <div class="acc-name">Sleep in — Depart Springdale</div>
        <div class="acc-sub"><span>15 min to Kolob exit</span></div>
      </div>
      <div class="acc-time">10:00 AM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Late night after stargazing — no rush. Hwy 9 west to I-15 north, 15 min to the Kolob Canyons exit.</p>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🔴</div>
      <div class="acc-header-text">
        <div class="acc-name">Kolob Canyons</div>
        <div class="acc-sub"><span>5-mi scenic drive · 30–45 min · optional Taylor Creek Trail</span></div>
      </div>
      <div class="acc-time">10:15 AM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Most visitors have no idea this is part of Zion NP — accessed from I-15 Exit 40. Dramatic finger canyons of deep red Navajo sandstone with almost no crowds. Covered by your America the Beautiful Pass. Optional: Taylor Creek Trail (5 mi, 2.5 hrs, double arch at the end).</p>
      <a class="acc-btn" href="https://www.alltrails.com/trail/us/utah/middle-fork-taylor-creek-trail--4" target="_blank" rel="noopener">Taylor Creek AllTrails</a>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">🎉</div>
      <div class="acc-header-text">
        <div class="acc-name">Arrive St. George</div>
        <div class="acc-sub"><span class="status-booked">✅ The Ledges booked</span><span>30 min from Kolob</span></div>
      </div>
      <div class="acc-time">12:30 PM</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">Check in at The Ledges of St. George — Poolside Oasis. Relax, decompress, wedding prep. Snow Canyon State Park is a great easy option nearby if you want one more short hike.</p>
      <a class="acc-btn" href="https://www.ledges.com" target="_blank" rel="noopener">ledges.com</a>
    </div></div>

    <div class="acc-header" onclick="toggleAcc(this)">
      <div class="acc-icon">💍</div>
      <div class="acc-header-text">
        <div class="acc-name">Wedding Day</div>
        <div class="acc-sub"><span>Saturday June 27 · St. George, Utah</span></div>
      </div>
      <div class="acc-time">All Day</div>
      <div class="acc-chevron">▼</div>
    </div>
    <div class="acc-body"><div class="acc-body-inner">
      <p class="acc-desc">You made it. One of the most epic road trips in the American Southwest — and now the celebration begins. Enjoy every moment.</p>
    </div></div>
  </div>
</article>

<!-- FOOTER -->
<footer class="site-footer fade-up">
  <div class="footer-stats">
    <div class="footer-stat">
      <span class="footer-stat-num">8</span>
      <span class="footer-stat-label">Days</span>
    </div>
    <div class="footer-stat">
      <span class="footer-stat-num">3</span>
      <span class="footer-stat-label">Parks</span>
    </div>
    <div class="footer-stat">
      <span class="footer-stat-num">1</span>
      <span class="footer-stat-label">Wedding</span>
    </div>
    <div class="footer-stat">
      <span class="footer-stat-num">600</span>
      <span class="footer-stat-label">Miles</span>
    </div>
  </div>
  <a class="footer-plan-link" href="plan.html">📋 Planning doc</a>
  <p class="footer-credit">Photos: Unsplash · Built with love for the trip ✦</p>
</footer>
```

- [ ] **Step 2: Open in browser, scroll full page**

Verify: All 4 chapters render in sequence, each separated by rust border, footer stats appear, "Planning doc" link renders. Full page scroll feels like a story from top to bottom.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: chapter 4 (St. George + Wedding) and footer"
```

---

## Task 8: plan.html

**Files:**
- Create: `plan.html`

- [ ] **Step 1: Create plan.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Utah Trip · Planning</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --rust: #C4521A; --amber: #E07B39; --sand: #F2DEC4;
  --clay: #8B4A2B; --dusk: #2C1810; --cream: #FBF5ED; --light: #FBF0E4;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--dusk); max-width: 480px; margin: 0 auto; }

.plan-header {
  background: var(--dusk);
  padding: 20px 20px 16px;
  display: flex; align-items: center; justify-content: space-between;
}
.plan-header-title { font-size: 16px; font-weight: 600; color: var(--sand); }
.plan-back {
  font-size: 11px; color: rgba(242,222,196,0.5);
  text-decoration: none; display: flex; align-items: center; gap: 4px;
}

.plan-section { padding: 24px 20px 0; }
.plan-section-title {
  font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--rust); margin-bottom: 14px;
}

/* Bookings table */
.bookings { width: 100%; border-collapse: collapse; }
.bookings th {
  font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--clay);
  padding: 0 8px 8px 0; text-align: left; border-bottom: 1px solid rgba(139,74,43,0.15);
}
.bookings td {
  font-size: 12px; padding: 10px 8px 10px 0;
  border-bottom: 1px solid rgba(139,74,43,0.08);
  vertical-align: top; line-height: 1.4;
}
.bookings tr.pending td { background: rgba(224,123,57,0.06); }
.bookings tr.pending td:first-child { border-left: 3px solid var(--amber); padding-left: 8px; }
.book-link { color: var(--rust); text-decoration: underline; font-size: 11px; }
.status-ok { color: #4caf50; font-weight: 600; }
.status-no { color: var(--amber); font-weight: 600; }

/* Cost tracker */
.cost-list { list-style: none; }
.cost-item {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 10px 0; border-bottom: 1px solid rgba(139,74,43,0.08);
  font-size: 13px;
}
.cost-item-name { color: var(--clay); }
.cost-item-amt { font-weight: 600; color: var(--dusk); }
.cost-total {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 14px 0 0; font-size: 15px; font-weight: 700;
}
.cost-total-label { color: var(--dusk); }
.cost-total-amt { color: var(--rust); }

/* Notes */
.note-card {
  background: white; border-radius: 10px;
  border-left: 3px solid var(--amber);
  padding: 12px 14px; margin-bottom: 10px;
  font-size: 13px; font-weight: 300; color: var(--clay); line-height: 1.6;
}
.note-card strong { font-weight: 600; color: var(--dusk); display: block; margin-bottom: 3px; }

.plan-footer { padding: 32px 20px; text-align: center; font-size: 11px; color: rgba(139,74,43,0.4); }
</style>
</head>
<body>

<div class="plan-header">
  <div class="plan-header-title">📋 Utah Trip — Planning</div>
  <a class="plan-back" href="index.html">← Back to trip</a>
</div>

<!-- BOOKINGS -->
<div class="plan-section">
  <div class="plan-section-title">Bookings</div>
  <table class="bookings">
    <thead>
      <tr>
        <th>Date</th>
        <th>What</th>
        <th>Book at</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr class="pending">
        <td>Sun Jun 21</td>
        <td>✈️ Flights (LAS in)</td>
        <td>—</td>
        <td class="status-no">⬜</td>
      </tr>
      <tr class="pending">
        <td>Sun Jun 21</td>
        <td>🚗 Rental Car (LAS)</td>
        <td>—</td>
        <td class="status-no">⬜</td>
      </tr>
      <tr>
        <td>Sun Jun 21</td>
        <td>🏨 Abbey Inn · Cedar City</td>
        <td><a class="book-link" href="https://www.abbeyinnhotel.com" target="_blank">abbeyinnhotel.com</a></td>
        <td class="status-ok">✅</td>
      </tr>
      <tr>
        <td>Mon Jun 22</td>
        <td>🌊 Kanarra Falls permits</td>
        <td><a class="book-link" href="https://www.kanarrafalls.com" target="_blank">kanarrafalls.com</a></td>
        <td class="status-ok">✅</td>
      </tr>
      <tr>
        <td>Mon Jun 22</td>
        <td>🏨 Ruby's Inn · Bryce</td>
        <td><a class="book-link" href="https://www.rubysinn.com" target="_blank">rubysinn.com</a></td>
        <td class="status-ok">✅</td>
      </tr>
      <tr>
        <td>Tue–Thu Jun 23–25</td>
        <td>🏨 Petty Ranch Inn</td>
        <td><a class="book-link" href="https://www.pettyranchinn.com" target="_blank">pettyranchinn.com</a></td>
        <td class="status-ok">✅</td>
      </tr>
      <tr class="pending">
        <td>Wed Jun 24</td>
        <td>🧗 Double Crown · $279/pp</td>
        <td><a class="book-link" href="https://www.zionguru.com" target="_blank">zionguru.com</a></td>
        <td class="status-no">⬜</td>
      </tr>
      <tr class="pending">
        <td>Thu Jun 25</td>
        <td>🚲 E-Bikes · ~$100/bike</td>
        <td><a class="book-link" href="https://www.zioncycles.com" target="_blank">zioncycles.com</a></td>
        <td class="status-no">⬜</td>
      </tr>
      <tr class="pending">
        <td>Thu Jun 25</td>
        <td>🌟 Stargazing · $190/pp</td>
        <td><a class="book-link" href="https://www.stargazingzion.com" target="_blank">stargazingzion.com</a></td>
        <td class="status-no">⬜</td>
      </tr>
      <tr>
        <td>Fri–Sat Jun 26–27</td>
        <td>🏨 The Ledges · St. George</td>
        <td><a class="book-link" href="https://www.ledges.com" target="_blank">ledges.com</a></td>
        <td class="status-ok">✅</td>
      </tr>
      <tr class="pending">
        <td>Sun Jun 28</td>
        <td>✈️ Flights (LAS out)</td>
        <td>—</td>
        <td class="status-no">⬜</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- COST TRACKER -->
<div class="plan-section" style="margin-top:32px">
  <div class="plan-section-title">Cost per person (activities)</div>
  <ul class="cost-list">
    <li class="cost-item"><span class="cost-item-name">Kanarra Falls permit</span><span class="cost-item-amt">$15</span></li>
    <li class="cost-item"><span class="cost-item-name">The Double Crown canyoneering</span><span class="cost-item-amt">$279</span></li>
    <li class="cost-item"><span class="cost-item-name">Narrows gear rental</span><span class="cost-item-amt">~$50</span></li>
    <li class="cost-item"><span class="cost-item-name">E-bike rental</span><span class="cost-item-amt">~$100</span></li>
    <li class="cost-item"><span class="cost-item-name">Zion Stargazing Tour</span><span class="cost-item-amt">$190</span></li>
    <li class="cost-item"><span class="cost-item-name">America the Beautiful Pass (split)</span><span class="cost-item-amt">$40</span></li>
  </ul>
  <div class="cost-total">
    <span class="cost-total-label">Activities total</span>
    <span class="cost-total-amt">~$674/person</span>
  </div>
</div>

<!-- NOTES -->
<div class="plan-section" style="margin-top:32px; padding-bottom:8px">
  <div class="plan-section-title">Open notes</div>
  <div class="note-card">
    <strong>Thursday is still full</strong>
    Two options to ease it: (1) shorten the Narrows to 2–2.5 hrs — the best scenery is in the first couple miles anyway; (2) move e-bikes to Friday morning before Kolob, which also makes for a better last morning in Zion.
  </div>
  <div class="note-card">
    <strong>Balcony restaurant — name TBD</strong>
    Slotted for Tuesday Jun 23 dinner (first night in Zion). Spotted Dog Café or Switchback Grille as backup.
  </div>
</div>

<div class="plan-footer">Last synced from utah-trip.md · April 2026</div>

</body>
</html>
```

- [ ] **Step 2: Open plan.html in browser**

Verify: Pending rows have amber left border and faint amber background, all links are clickable, cost total renders, notes display, "Back to trip" link goes to index.html.

- [ ] **Step 3: Commit**

```bash
git add plan.html
git commit -m "feat: plan.html — bookings table, cost tracker, open notes"
```

---

## Task 9: Polish + Desktop Centering

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add desktop styles to the `<style>` block**

```css
@media (min-width: 480px) {
  body {
    box-shadow: 0 0 60px rgba(44,24,16,0.12);
  }
  html {
    background: #e8e0d8;
  }
}
```

- [ ] **Step 2: Verify scroll animations work**

Scroll down the full page slowly. Each chapter should fade up into view as it enters the viewport. If a chapter is already visible on load it should be visible immediately (the IntersectionObserver handles this).

- [ ] **Step 3: Remove "← swipe →" hint from all chapters except the first**

The hint only needs to appear once. In `index.html`, delete the `<div class="media-strip-hint">← swipe photos →</div>` lines from Chapters 2, 3, and 4. Keep it only in Chapter 1.

- [ ] **Step 4: Open in browser at 390px, then at 768px (tablet)**

At 390px: full-bleed, no side margins, everything legible.
At 768px: content centered in a 480px column with a subtle shadow and warm gray background on either side.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: desktop centering, scroll animations, swipe hint cleanup"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|-----------------|------|
| Mobile-first 390px base | Task 1 |
| 480px max-width centered on desktop | Task 9 |
| Crossfade hero (3 photos) | Task 2 |
| Wedding pill in hero | Task 2 |
| 4 story chapters | Tasks 4–7 |
| Chapter splash photo + overlay | Tasks 4–7 |
| Horizontal-scroll media strip | Task 3 CSS, Tasks 4–7 HTML |
| YouTube thumbnail in media strip | Tasks 4–7 (search-link pattern) |
| Accordion (collapsed default, smooth expand) | Task 3 |
| ✅/⬜ booking status per item | Tasks 4–7 |
| Zion day selector (Wed/Thu) | Task 6 |
| Footer with trip stats | Task 7 |
| Clipboard icon → plan.html | Task 7 |
| plan.html bookings table | Task 8 |
| plan.html cost tracker | Task 8 |
| plan.html open notes | Task 8 |
| `<!-- CHAPTER: -->` comments | Tasks 4–7 |
| Source-of-truth comment at top | Task 1 |
| Thursday load note in Narrows accordion | Task 6 |
| Scroll fade-up animations | Task 3 JS + Task 9 |
| No Leaflet map | ✓ (not included) |
| No Angels Landing content | ✓ (not included) |

**Placeholder scan:** YouTube video links use YouTube search URLs instead of hardcoded video IDs — this is intentional (content decision at implementation time), not a code placeholder. All HTML, CSS, and JS is complete.

**Type consistency:** `toggleAcc()`, `showZionDay()`, `.acc-header`, `.acc-body`, `.zion-day`, `zion-day-wed`, `zion-day-thu` — all consistent across Task 3 JS and Tasks 6 HTML.
