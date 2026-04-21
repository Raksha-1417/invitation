# Rohit & Nandini — Wedding Invitation Website
## The Idea

---

## 1. What this actually is

A **mobile-first, vertical, phone-sized digital invitation** that doubles as your portfolio piece.

Not a traditional desktop wedding website. Not a landing page. It's built to look exactly like what's going viral right now — the cream-paper, gold-foil invitation that people scroll through on their phone and forward on WhatsApp.

The format matches the reel you sent: 430px wide, opens on a phone, feels like a real printed invitation card that someone is holding.

---

## 2. The one thing people should remember

**The envelope-opening moment.**

When someone opens the link, they don't see the invitation. They see a sealed cream envelope with a gold wax seal stamped "R & N" with a peacock motif around it. They tap it. The seal breaks, the envelope flap lifts, and the invitation slides out.

That 3-second moment is what people screenshot, send to their friends, and DM you saying *"can you make mine like this?"*

Everything else is supporting work.

---

## 3. Aesthetic direction

**Modern Maharashtrian luxury — printed invitation, not a webpage.**

Feels like:
- Heavy cream cardstock you can almost feel through the screen
- Gold foil that catches light when you scroll
- Subtle paper grain texture
- Deep maroon details used sparingly (not dominant)
- Devanagari typography placed thoughtfully — not as decoration, but as a second voice
- Everything breathes — lots of negative space, like a luxury magazine

NOT: gradients, glassmorphism, neon, modern SaaS look. Those exist in your original concept doc — I'm cutting them.

**Color palette (refined from your doc):**
- Ivory base: `#F5EDE0`
- Warm cream: `#FBF6EC`
- Champagne: `#D9C3A5`
- Gold: `#B8935A` (primary accent)
- Deep gold: `#8B6A3A` (for depth)
- Maroon: `#6B1E2B` (used maybe 3 times in whole site)
- Ink brown: `#2B1F1A` (body text, not black)

**Typography:**
- **Cinzel** — for couple's names, section titles (elegant, carved-stone feel)
- **Cormorant Garamond** — for all body text (warm, editorial)
- **Great Vibes** — for one-off flourishes ("Save the Date", signatures)
- **Noto Serif Devanagari** — for Marathi text (शुभ विवाह, names in Marathi)

---

## 4. Structure — 7 sections, not 11

Your original had 11 sections. That's a website. This needs to feel like an invitation. Cutting to 7:

### Section 1 — Envelope (the hook)
- Closed cream envelope on ivory background
- Gold wax seal with "R & N" + peacock motif
- Tiny instruction: *"Tap to open"*
- Subtle gold shimmer animation on the seal
- On tap: seal cracks → envelope flap lifts → invitation slides up → envelope fades out

### Section 2 — Hero (the invitation proper)
- Tiny Marathi header: **शुभ विवाह** in gold
- Decorative gold divider (paisley-style)
- *"Together with the blessings of their families"*
- **Rohit & Nandini** — large, centered, Cinzel
- Ornament below
- Wedding date: **26 . 04 . 2026**
- Small Marathi date line
- Gentle scroll cue at bottom

### Section 3 — Our Story (trimmed timeline)
Since you only have a few photos, keep it to **3 moments** max:
- **First Meeting** — with their first photo together
- **The Proposal** — with a pre-wedding photo
- **Forever** — with another pre-wedding photo

Alternating left-right layout, gold vertical line connecting them, photos in soft rounded frames with gold border. No masonry gallery (would look empty with few photos).

### Section 4 — Sacred Ceremonies
Three clean cards, stacked vertically (mobile-first):
- **Mehendi** — 23rd April 2026 — henna hand icon
- **Haldi** — 25th April 2026 — turmeric bowl icon
- **Vivah (Wedding)** — 26th April 2026, 12:43 PM — mandap icon

Each card: gold border, event name in Cinzel, date + time, one line of Marathi below.

### Section 5 — Venue
- Venue name: **Swapnapurti Lawns**
- Full address in warm ink
- Landmark line: *Opp Shell Petrol Pump, Near Mirchi Hotel, Nandur Naka, Nashik*
- **Gold "Get Directions" button** → opens your Maps link in Google Maps app directly
- A small decorative venue illustration (optional, hand-drawn feel)

### Section 6 — Blessings (replaces the message wall)
Short, elegant, scriptural feel:
- Marathi couplet or shloka
- Translation below
- One line: *"Your presence is the only gift we ask for"*
- Decorative peacock motif

This replaces the whole "Blessings Wall + RSVP form + Message Wall" from your original concept. Those need a backend and nobody uses them.

### Section 7 — Footer (where you get orders)
- Monogram **R & N** in gold script
- Thin gold divider
- *"With love, Rohit & Nandini"*
- Small separator
- **"Designed by [Your Brand] · Book your invitation →"** linked to your WhatsApp
- Three action buttons:
  - **Share on WhatsApp** (pre-written message with link)
  - **Add to Calendar** (downloads .ics file with wedding details)
  - **Get Directions** (opens Maps)

---

## 5. What I removed from your original concept and why

| Original section | Why I cut it |
|---|---|
| Countdown timer | Looks dated, every free template has it, adds no emotional weight |
| RSVP form | Needs backend, nobody fills it, makes invite feel like paperwork |
| Blessings / Message Wall | Over-engineered, needs backend, guests don't engage |
| Background music toggle | Annoying on mobile, people share on WhatsApp with sound off |
| Video background in hero | Heavy on mobile data, most users won't wait for it to load |
| Family introduction section | Unless couple specifically wants this, it pads the flow |
| Masonry gallery | You have few photos — masonry will look sparse and amateur |
| Dress code section | Can fit as one line inside ceremonies cards if needed |
| Instagram hashtag section | Feels like 2018 wedding trends |
| QR code section | Guests opening on phones don't need to scan QR on the same phone |

---

## 6. What I'm adding that your concept missed

These are what actually drive orders:

1. **Share-on-WhatsApp button with pre-written message** — every share is free marketing for you
2. **Add-to-calendar .ics download** — practical, no one else does this, feels premium
3. **Direct Maps deep-link** — tap and their Google Maps app opens with directions
4. **Your branding footer** — "Designed by [Your Brand] · Book yours" with WhatsApp link
5. **Envelope-open reveal** — the screenshot-worthy moment
6. **Paper grain texture overlay** — tiny detail that sells the "printed" feel
7. **Gold shimmer on key elements** — subtle animation on names and seal, runs once on reveal
8. **Devanagari script used as real language, not decoration** — most templates slap शुभ विवाह as a pattern; we use it as actual text with proper typographic hierarchy

---

## 7. Animation plan (restrained, premium)

Over-animation kills the "printed invitation" feel. Rules:
- **Envelope opening** — one-time, 2.5 seconds, cinematic
- **Scroll reveals** — elements fade up gently as they enter viewport (IntersectionObserver)
- **Gold shimmer** — on names only, runs once, then stops
- **Hover states** — gentle scale (1.02x) on buttons and cards
- **No floating particles, no parallax, no scroll-jacking**

Everything else is still. Static. Like a real invitation card.

---

## 8. Technical approach

- **Single HTML file** — everything inline (HTML + CSS + JS)
- No frameworks, no build step
- Fonts from Google Fonts (Cinzel, Cormorant Garamond, Great Vibes, Noto Serif Devanagari)
- Icons and decorative motifs as inline SVG (peacock, paisley, mandap icon, henna hand, turmeric bowl)
- Works offline after first load
- Host anywhere: Netlify, Vercel, GitHub Pages, even a single file on your own server
- File size target: under 200KB total (fast even on 3G)

---

## 9. What you still need to send me

Before or after I build, replace the placeholders:
1. Your brand name (e.g., "Nashik Invites" or your personal name)
2. Your WhatsApp number
3. The couple's photos (3 photos for timeline + any hero accent)
4. Optional: Marathi shloka preference, or I'll pick a classic wedding blessing
5. Optional: the couple's parents' names if they want them in the invitation line

---

## 10. What to do next

I'll now build the single HTML file based on this plan.

When it's done, you can:
- Open it in browser and test the envelope animation
- Replace the placeholder texts and photos
- Host it on Netlify (drag-and-drop, free)
- Share the link on your Instagram + WhatsApp status as your portfolio piece

Every person who opens it sees the "Designed by [Your Brand]" in the footer. That's how you turn one invitation into ten orders.