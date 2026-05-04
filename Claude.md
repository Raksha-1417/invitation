# claude.md
## Build Spec — Naveen & Shreya Wedding Invitation (Ankad Family)

> **Version 3** — Royal Peshwai palette + caricature hero.
> This file is the single source of truth. Any AI assistant or developer opening this project reads this first and follows it exactly.

---

## Project Overview

**Deliverable:** A Next.js 14 web application — a premium mobile-first Maharashtrian wedding invitation for the **Ankad family** that doubles as a portfolio piece for the designer.

**Primary user:** Wedding guest opening the link on their phone via WhatsApp.
**Secondary user:** A potential client who receives the forwarded invite, sees the "Designed by" footer, and books the designer.

**Success metric:** Gets forwarded. Gets screenshot. Generates DMs to the designer's WhatsApp.

**Design direction:** *Modern Peshwai luxury* — cream cardstock base (elegant, printed feel), with magenta/maroon/teal/gold used as royal accents. The invite must feel like a folded heirloom paper invitation that opens on a phone, not a webpage.

---

## Tech Stack (Locked)

```
Framework:     Next.js 14 (App Router, TypeScript)
Styling:       Tailwind CSS + CSS variables for the palette
Animation:     Framer Motion — scroll reveals, micro-interactions, hero fades
               GSAP + ScrollTrigger — envelope cinematic open, timeline line draw
Fonts:         next/font/google — Cinzel, Cormorant Garamond, Great Vibes,
               Noto Serif Devanagari (auto-optimized, zero layout shift)
Icons:         Inline SVG components (peacock, paisley, mandap, henna, turmeric)
Images:        next/image — auto-optimized, lazy-loaded, WebP conversion
Calendar:      `ics` npm package — generates .ics file client-side
Hosting:       Vercel (free tier, one-click deploy from GitHub)
Analytics:     Vercel Analytics (free)
```

**Do NOT add:**
- Any UI component library (Shadcn, MUI, Chakra, Mantine, DaisyUI) — they fight the custom aesthetic
- jQuery, Bootstrap, or any legacy styling framework
- CSS-in-JS libraries (styled-components, Emotion) — Tailwind only
- Icon libraries (Lucide, Heroicons, React Icons) — all icons are inline SVG
- State management libraries (Redux, Zustand) — no state beyond local component state

---

## Non-Negotiable Constraints

1. **Mobile-first.** Design target is 430px wide. Desktop view centers the 430px column on a cream background with a soft paper-texture surround — not a responsive redesign.
2. **No backend.** No RSVP, no message wall. Everything runs client-side.
3. **No video.** No autoplay audio. No heavy libraries.
4. **Total JS bundle < 120KB gzipped.** Measured via Next.js build output.
5. **Must work in WhatsApp in-app browser** on iOS and Android (90% of opens happen here).
6. **Lighthouse mobile targets:** Performance ≥ 90, Accessibility 100, SEO 100.
7. **`prefers-reduced-motion` respected** — disable envelope animation (fade only), skip scroll reveals (show immediately).

---

## Couple & Event Details

```
Family:          Ankad family
Couple:          Naveen & Shreya
Wedding date:    14 May 2026
Wedding time:    12:32 PM
Venue:           Swapnapurti Lawns
Address:         Opp Shell Petrol Pump, Near Mirchi Hotel,
                 Nandur Naka, Belagavi
Maps link:       https://maps.app.goo.gl/xDXkPKzS7PEKkJ9y5

Ceremonies:
  - Mehendi  — 23 April 2026
  - Haldi    — 25 April 2026
  - Vivah    — 14 May 2026, 12:32 PM
```

Invitation opening line (hero section):

> *With the blessings of the **Ankad family**, we invite you to celebrate our wedding*

Placeholder tokens the designer replaces before deploy:
- `{{BRAND_NAME}}` — footer credit
- `{{WHATSAPP_NUMBER}}` — international format, e.g. `919876543210`
- `{{DEPLOY_URL}}` — used in WhatsApp share text
- `/public/photos/story-1.jpg`, `/story-2.jpg`, `/story-3.jpg` — our-story images
- `/public/caricature.png` — the couple illustration (Peshwai-style, provided)
- `{{MEHENDI_TIME}}`, `{{HALDI_TIME}}` — if provided later, else hidden

---

## Design System — Royal Peshwai Palette

The palette is drawn directly from the caricature. Cream base + rich accents = royal, not loud.

### Core tokens

```ts
// tailwind.config.ts — extend.colors
{
  // Base surfaces
  cream:         '#F5EDE0',    // primary background — warm ivory paper
  'cream-soft':  '#FBF6EC',    // card / elevated surface
  parchment:     '#EFE3CF',    // subtle card tint

  // Primary accents (from caricature)
  rani:          '#7A1142',    // bride's saree — the ROYAL color, used for names, key highlights
  'rani-deep':   '#5A0A31',    // hover / active states on rani elements
  maroon:        '#5A1822',    // groom's turban — used for section headings & borders
  'maroon-deep': '#3D0E16',    // deepest accent, used sparingly

  // Secondary accents
  teal:          '#0A5C4A',    // peacock dupatta — for divider icons, sparing pops
  'teal-soft':   '#1E7A66',    // hover for teal elements

  // Gold family (muted warm, not shiny)
  gold:          '#C8964A',    // primary gold — ornamental borders, monograms
  'gold-deep':   '#8B6A3A',    // shadow gold, embossing depth
  'gold-light':  '#E5CFA5',    // gradient highlight

  // Supporting tones
  rose:          '#E89AA3',    // soft pink — used only in decorative flourishes
  'rose-pale':   '#F5D8DB',    // petal accents

  // Text
  ink:           '#2B1F1A',    // body text — NOT pure black
  'ink-soft':    '#5A4B3E',    // secondary text
}
```

### Color usage rules (critical — enforce strictly)

| Color | Use for | Don't use for |
|---|---|---|
| `cream` / `cream-soft` | All section backgrounds | Buttons, text |
| `rani` | Couple names, Hero "&", primary CTAs, decorative accents | Body text, backgrounds |
| `maroon` | Section titles, card borders, footer text emphasis | Buttons bg, large fills |
| `teal` | Small divider icons, accent flourishes, icon strokes | Primary CTAs, large areas |
| `gold` | Borders, dividers, monograms, ornamental frames | Body text |
| `rose` / `rose-pale` | Background flourishes, paisley motifs at low opacity | Text, borders |
| `ink` | All body text | Decorative elements |

**The gold rule:** gold should NEVER dominate. It should feel like embossing — thin lines, small motifs, ornamental borders. Never gold fills or gold buttons.

**The rani rule:** rani is the star color. The couple's names in rani, not gold. This is the most important palette decision.

### Typography

Load via `next/font/google` in one request:
- `Cinzel` (400, 500, 600) — display / carved-stone headings
- `Cormorant Garamond` (300, 400, 500, italic 300/400) — body serif
- `Great Vibes` (400) — script flourishes, signatures
- `Noto Serif Devanagari` (400, 500, 600) — Marathi

Rules:
- Couple names, section headings → `font-display` (Cinzel), `tracking-[0.15em]` to `tracking-[0.25em]`
- Body → `font-serif` (Cormorant Garamond), `leading-relaxed`
- "With love", signatures → `font-script` (Great Vibes)
- All Marathi → `font-devanagari` (Noto Serif Devanagari)
- **Never use Inter, Roboto, Arial, or system fonts anywhere.**

### Textures & atmosphere

- Fixed full-screen SVG noise overlay at opacity 0.35 using `feTurbulence` — paper grain
- Two soft radial warmth spots via `body::before` with `mix-blend-mode: multiply`:
  - Rani pink at 20%/30%, 8% opacity
  - Gold at 80%/70%, 6% opacity
- Base background: solid cream. No linear gradients as section backgrounds.

### Spacing & layout

- Main container: `max-w-[430px] mx-auto`
- Section vertical padding: `py-16 md:py-20`
- Horizontal padding: `px-7`
- Between sections: thin gold line (1px) with a small paisley/diamond SVG in the middle, rani dot on each side

---

## The Caricature — Placement & Treatment

The caricature (`/public/caricature.png`) is the **visual centerpiece** of the invitation. Treatment:

### Primary placement: Hero section (see Section 2 below)

Positioned **below the couple names**, inside a **mandap-shaped arch frame** in gold. The frame is an inline SVG — two slim pillars with a pointed arch on top, mimicking a traditional Maharashtrian mandap, ornamented with tiny paisley details at the corners.

The caricature sits inside the arch, cropped to just above the couple's feet so it fits elegantly. Max width 280px, maintains aspect ratio.

A very subtle gold filigree glow sits behind the frame (radial gradient fading from gold-light to transparent, opacity 0.3).

On first reveal, the caricature fades in AFTER the names (500ms delay, scale from 0.95 → 1, opacity 0 → 1, duration 900ms).

### Secondary placement: Open Graph preview

- `/public/og-preview.jpg` — 1200×630px
- Cream background
- Caricature centered-right (not cropped, whole image visible)
- Left side: couple names in Cinzel rani + date in Cinzel maroon + `शुभ विवाह` in Devanagari gold
- Thin gold border frame at 40px offset from edge
- This is what users see when the link is shared on WhatsApp, Instagram DMs, Facebook

### Tertiary placement: Favicon

- Small cropped circular version (faces of the couple only), 64×64px
- Gold circular border
- Used as `/app/icon.png`

### Rules
- Do NOT repeat the caricature elsewhere (sections 3–7). It should feel precious.
- Do NOT animate the caricature beyond the initial fade-in. No parallax, no hover effects.
- Do NOT use it as the envelope seal. Seal stays as "R & N" + peacock.

---

## Project File Structure

```
naveen-shreya-invitation/
├── app/
│   ├── layout.tsx              ← fonts, metadata, OG tags
│   ├── page.tsx                ← single-page assembly of all sections
│   ├── globals.css             ← Tailwind + CSS variables + paper texture
│   ├── icon.png                ← caricature-based favicon
│   └── opengraph-image.jpg     ← OG preview (1200×630)
├── components/
│   ├── Envelope.tsx            ← envelope + seal + GSAP open animation
│   ├── Hero.tsx                ← शुभ विवाह + names + caricature in mandap arch + date
│   ├── Story.tsx               ← 3-moment timeline
│   ├── Ceremonies.tsx          ← Mehendi / Haldi / Vivah cards
│   ├── Venue.tsx               ← Swapnapurti Lawns + Maps CTA
│   ├── Blessings.tsx           ← Marathi couplet
│   ├── Footer.tsx              ← monogram + action buttons + designer credit
│   ├── ActionButtons.tsx       ← Share / Calendar / Directions
│   └── svg/
│       ├── Peacock.tsx
│       ├── Paisley.tsx
│       ├── Divider.tsx
│       ├── MandapArch.tsx      ← the frame for the caricature
│       ├── MandapIcon.tsx
│       ├── HennaHandIcon.tsx
│       └── TurmericBowlIcon.tsx
├── lib/
│   ├── calendar.ts             ← .ics generation with `ics` package
│   ├── share.ts                ← WhatsApp share URL builder
│   └── motion.ts               ← reusable Framer Motion variants
├── public/
│   ├── caricature.png          ← the couple illustration
│   └── photos/
│       ├── story-1.jpg
│       ├── story-2.jpg
│       └── story-3.jpg
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
├── IDEA.md
└── claude.md                   ← this file
```

---

## Section-by-Section Spec

### 1. Envelope (`<Envelope />`)

**Purpose:** The hook. The screenshot moment.

**Component behavior:**
- Renders as a full-viewport overlay (`fixed inset-0 z-50`) on initial mount
- Cream envelope centered, 280px × 200px, with triangular closed flap
- Flap tint: subtle `cream-soft` gradient for depth
- Gold wax seal at center of flap: 64px circle in `rani` color with gold filigree border, "R & N" in Cinzel gold + peacock silhouette wrapping around it
- Below envelope: italic "Tap to open" in `text-ink-soft`
- Decorative paisley SVG flourishes at top-left and bottom-right corners at 20% opacity in gold

**GSAP timeline on tap (total ~2500ms):**
```ts
tl.to('.seal-left',  { rotate: -35, x: -12, duration: 0.4, ease: 'power2.in' })
  .to('.seal-right', { rotate:  35, x:  12, duration: 0.4, ease: 'power2.in' }, '<')
  .to('.flap',       { rotateX: 180, duration: 0.6, transformOrigin: 'top center' })
  .to('.paper',      { y: -160, duration: 0.8, ease: 'power3.out' }, '-=0.2')
  .to('.envelope-scene', { opacity: 0, y: 40, duration: 0.7 }, '-=0.3')
  .call(() => setOpen(true))
```

**States:**
- Before tap: subtle gold shimmer CSS animation sweeps across seal every 3s
- During animation: `overflow-hidden` on body, `pointer-events: none` on envelope
- After: envelope unmounts, main content scrollable, auto-scroll to Hero

**Accessibility:**
- Envelope is a real `<button type="button">` with `aria-label="Open invitation"`
- Triggers on `Enter` and `Space`
- Visually-hidden "Skip invitation animation" link jumps past

### 2. Hero (`<Hero />`) — THE showpiece

Stacked center-aligned, framer-motion staggered reveal on mount. Order matters:

1. `शुभ विवाह` — `font-devanagari`, `text-gold`, 18px, `tracking-wider`
2. Thin gold divider with center paisley — 60px wide
3. Italic: *"With the blessings of the Ankad family, we invite you to celebrate our wedding"* — `font-serif` 300 italic, 14px, `text-ink-soft`
4. Spacer 20px
5. `Naveen` — `font-display` 500, 44px, **`text-rani`**
6. `&` — `font-script`, 52px, `text-maroon`
7. `Shreya` — `font-display` 500, 44px, **`text-rani`**
8. Spacer 24px
9. **`<MandapArch>` component** containing the caricature:
   - Gold mandap-arch SVG frame, ~300px wide, ~340px tall
   - Inside: `<Image src="/caricature.png" />` with `object-contain`
   - Behind: soft radial gold-light glow, opacity 0.3
   - Two tiny paisley corner ornaments in rani
10. Spacer 24px
11. Ornamental peacock-feather SVG divider in gold
12. Date: `26 . 04 . 2026` — `font-display`, 22px, `text-maroon`, `tracking-[0.3em]`
13. Sub-line: `Thursday · रविवार` — `font-serif` 14px `text-ink-soft`
14. Bottom: animated scroll cue (bouncing chevron in gold, Framer Motion `repeat: Infinity`)

Background: solid cream. Four paisley SVG watermarks at corners at opacity 0.08 in rose.

**Gold shimmer** applied to the names once on first reveal, then removed.

**Stagger timing:**
```
Greeting (शुभ विवाह)     → 0ms
Divider                  → 150ms
Blessing line            → 300ms
Naveen                    → 450ms
&                        → 600ms
Shreya                  → 750ms
Caricature in arch       → 1100ms (scale 0.95→1, fade in, duration 900ms)
Peacock divider          → 1600ms
Date                     → 1750ms
Sub-line                 → 1900ms
Scroll cue               → 2200ms (starts infinite bounce)
```

### 3. Story (`<Story />`)

Vertical timeline with alternating entries.

- Section title: `Our Story` in `font-display` `text-maroon` + subtitle `आमची कहाणी` in Devanagari gold smaller
- Vertical gold line (1px wide) down the center, drawn via GSAP ScrollTrigger (`scaleY` 0 → 1 as section enters viewport)
- Each timeline dot is `bg-rani` with a `ring-2 ring-gold` outer ring
- 3 timeline entries with framer-motion scroll reveal (`whileInView`, `viewport={{ once: true, amount: 0.3 }}`)
- Each entry:
  - Rani dot on the center line
  - `next/image` photo, 160×160px, `rounded-md`, gold 1px border with 4px offset (use nested divs)
  - Title in `font-display` `text-maroon` + date in `font-serif` italic `text-ink-soft`
  - 2-line description in `font-serif` `text-ink`

Entries:
1. **First Meeting** — `/photos/story-1.jpg` — "Where it all began. A conversation that lasted longer than it should have."
2. **The Proposal** — `/photos/story-2.jpg` — "A quiet moment, a quiet question, an unforgettable yes."
3. **Forever** — `/photos/story-3.jpg` — "...and the rest is our story."

### 4. Ceremonies (`<Ceremonies />`)

- Title: `Sacred Ceremonies` / `पवित्र सोहळे`
- Three vertical cards, gap 16px, stagger reveal on scroll
- Each card:
  - `bg-cream-soft` with `border border-gold/40 rounded-sm p-6`
  - On hover: border shifts to `border-rani/60`, subtle lift
  - 40px circular icon badge — `border-gold` outline, `bg-cream` fill, icon in `stroke-teal`
  - Event name in `font-display` 22px `text-maroon`
  - Marathi name in `font-devanagari` `text-rani` 14px
  - Thin gold divider
  - Date + time in `font-serif` `text-ink`
  - Poetic one-liner in italic `text-ink-soft`

Data:
```ts
const ceremonies = [
  { en: 'Mehendi', mr: 'मेहंदी', date: '23 April 2026', note: 'Adorning the bride' },
  { en: 'Haldi',   mr: 'हळद',   date: '25 April 2026', note: 'Golden blessings' },
  { en: 'Vivah',   mr: 'विवाह', date: '14 May 2026, 12:32 PM', note: 'The sacred union' },
]
```

Icons (inline SVG in `/components/svg/`, 1.5px stroke in teal):
- Mehendi: stylized hand with henna dots
- Haldi: bowl with paste + crossed leaves
- Vivah: mandap arch with two pillars

### 5. Venue (`<Venue />`)

- Title: `The Venue` / `स्थळ` — title in maroon, subtitle in gold Devanagari
- Venue name **Swapnapurti Lawns** — `font-display` 28px `text-rani`
- Address centered, `font-serif` 16px, `leading-loose`, `text-ink`
- Landmark line in italic `text-ink-soft`
- Spacer 24px
- **Primary CTA** — single most important button on the page:
  - `bg-rani text-cream-soft font-display tracking-wider px-6 py-4 rounded-sm w-full`
  - Hover: `bg-rani-deep scale-[1.02] transition-transform`
  - Shadow: subtle gold-tinted shadow
  - Label: `Get Directions →`
  - `href={googleMapsLink}` `target="_blank" rel="noopener"`
- Two mirrored paisley SVGs below in gold

### 6. Blessings (`<Blessings />`)

- Title: `Blessings` / `आशीर्वाद` — maroon + gold Devanagari
- Marathi couplet centered, italic `font-devanagari text-maroon`:
  > शुभ मंगल सावधान
  > दोन जीवांचे एक स्वप्न, आज सत्यात उतरत आहे
- English translation below in `font-serif` italic `text-ink-soft`
- Spacer
- `Your presence is the only gift we ask for.` — `font-display` 14px `tracking-widest` `text-rani`
- Decorative peacock SVG centered, 80px, gold with teal detailing

### 7. Footer (`<Footer />`)

- Monogram `R & N` in `font-script`, 72px, `text-gold`, inside thin circular gold frame (80px outer ring)
- Thin gold divider
- `With love,` — `font-script` 24px `text-maroon`
- `Naveen & Shreya` — `font-display` 16px `text-rani`
- Spacer 32px
- **`<ActionButtons />`** — three buttons in a row (stacked below 360px):

  1. **Share** → opens `https://wa.me/?text=${encoded}` with:
     > *"You're invited to Naveen & Shreya's wedding on 14th May 2026. Open the invitation: {{DEPLOY_URL}}"*
  2. **Add to Calendar** → calls `generateICS()`, triggers download of `naveen-shreya-wedding.ics`
  3. **Directions** → opens the Google Maps link

  Each button: `border border-gold bg-transparent text-maroon font-display uppercase text-xs tracking-wider px-4 py-3`, `hover:bg-gold hover:text-cream transition`. Icon + label stacked.

- Spacer, thin gold divider
- Designer credit, centered, `text-ink-soft`, 12px:
  > Designed with love by **{{BRAND_NAME}}**
  > [Book your invitation →](https://wa.me/{{WHATSAPP_NUMBER}})
- Final spacer 48px

---

## Animation Rules

### GSAP (choreographed sequences only)
- Envelope open timeline (Section 1)
- Story timeline vertical line draw (Section 3)
- Lazy-load GSAP via dynamic import to keep initial bundle small

### Framer Motion (everything else)
- Hero stagger reveal on mount (including the caricature's scale-fade)
- Section scroll reveals: `whileInView`, `viewport={{ once: true, amount: 0.2 }}`
- Button hover: `whileHover={{ scale: 1.02 }}`
- Scroll-cue bounce: infinite y-oscillation

### Shared motion variants in `lib/motion.ts`
```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}
export const caricatureReveal = {
  hidden: { opacity: 0, scale: 0.95 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}
```

### Forbidden
- Floating particles, parallax backgrounds, scroll-jacking, cursor trails, 3D card tilts, typing animations, Lottie animations
- Animating the caricature beyond its initial reveal

---

## Metadata & SEO

In `app/layout.tsx`:
```ts
export const metadata: Metadata = {
  title: 'Naveen & Shreya · 14 May 2026',
  description: "You're invited to our wedding. With the blessings of the Ankad family.",
  openGraph: {
    title: 'Naveen & Shreya · Wedding Invitation',
    description: "You're invited to our wedding. 14 May 2026, Belagavi.",
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  themeColor: '#F5EDE0',
}
```

---

## Code Quality Rules

- TypeScript strict mode on
- Semantic HTML (`<section>`, `<header>`, `<footer>`, `<nav>`)
- All interactive elements are `<button>` or `<a>` — never `<div onClick>`
- Components: function components with typed props (`interface Props`)
- No inline style objects unless dynamic — use Tailwind classes
- Section components marked `'use client'` only when they need Framer Motion / GSAP / events; keep `Blessings`, static bits as server components where possible
- Comments: section headers and GSAP timeline explanations only
- All SVGs inline with `aria-hidden="true"`
- All images use `next/image` with explicit width/height, `loading="lazy"` on non-critical

---

## Accessibility

- Color contrast check:
  - `text-ink #2B1F1A` on `bg-cream #F5EDE0` = 12.8:1 (AAA) ✓
  - `text-rani #7A1142` on `bg-cream #F5EDE0` = 8.2:1 (AAA) ✓
  - `text-maroon #5A1822` on `bg-cream #F5EDE0` = 10.1:1 (AAA) ✓
  - `text-gold #C8964A` on `bg-cream #F5EDE0` = 3.1:1 → use gold ONLY for decorative/large text ≥18px, never for body
- All buttons have visible focus states: `focus-visible:outline-2 focus-visible:outline-rani focus-visible:outline-offset-2`
- Envelope has proper ARIA label and keyboard support (Enter, Space)
- Decorative SVGs are `aria-hidden`
- Caricature `<Image>` has descriptive `alt="Illustrated portrait of Naveen and Shreya in traditional Maharashtrian wedding attire"`
- Honor `prefers-reduced-motion` in both GSAP (check `matchMedia`) and Framer Motion (`useReducedMotion`)
- Skip link at top of page: "Skip to main content"

---

## Deployment

1. Designer creates GitHub repo, pushes code
2. Connects repo to Vercel — deploys automatically on every push
3. Sets custom domain (e.g. `invite-ankad.your-brand.com`)
4. Vercel Analytics enabled in project settings
5. Share deploy URL on WhatsApp + Instagram

---

## Handoff Checklist (before final delivery)

- [ ] Envelope opens smoothly on first tap, no jank (tested on iOS + Android)
- [ ] `prefers-reduced-motion` respected in both GSAP and Framer Motion
- [ ] Caricature loads crisp at all pixel densities (use `next/image` with proper `sizes`)
- [ ] Mandap arch frame SVG scales cleanly on all viewports
- [ ] All placeholders (`{{BRAND_NAME}}`, `{{WHATSAPP_NUMBER}}`, `{{DEPLOY_URL}}`) marked with `// TODO` comments
- [ ] WhatsApp share button pre-fills correct message with live URL
- [ ] Add-to-calendar `.ics` download works on iOS Safari, Android Chrome, desktop
- [ ] Maps button opens Google Maps app on mobile, web on desktop
- [ ] OG preview image verified via opengraph.xyz — looks premium in WhatsApp preview
- [ ] `next build` completes with no errors or warnings
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility 100, SEO 100
- [ ] Bundle size: first-load JS < 120KB gzipped
- [ ] Tested in WhatsApp in-app browser (iOS + Android)
- [ ] No console errors or warnings in production build

---

## Explicitly OUT of Scope

- RSVP form, countdown timer, background music toggle
- Message / blessing wall, guest login, dark mode
- Multi-language toggle (Marathi is embedded)
- Family introduction section beyond "Ankad family"
- Masonry photo gallery, Instagram feed, QR codes, live streaming
- Admin panel / CMS / database of any kind

---

## Reuse Playbook (for future clients)

Because this is built as a Next.js project, reusing it for the next wedding client is:

1. Clone the GitHub repo
2. Update `/app/layout.tsx` metadata
3. Update data constants file with new couple/family/venue/dates
4. Drop in new photos in `/public/photos/` and new `caricature.png`
5. Swap colors in `tailwind.config.ts` if different palette is needed (emerald + rose for South Indian, red + gold for Punjabi, etc.)
6. Swap Marathi text for regional language if needed (Tamil, Telugu, Hindi)
7. Deploy to new Vercel subdomain

Total time per new client: ~2 hours once the template is solid.

---

## Summary of v3 changes

- Palette shifted from ivory/champagne/gold to **cream + rani + maroon + teal + gold** (royal Peshwai)
- Couple names now in **rani** (the star color from the caricature's saree), not gold
- Caricature integrated into Hero as the visual centerpiece, framed in a gold mandap arch
- OG preview and favicon now derived from the caricature
- Color usage rules added to enforce the "gold as embossing, not fill" principle
- Contrast check performed on all text combinations — AAA across the board