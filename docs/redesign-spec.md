# MoneyMolz Design System

Updated Oct 12, 2026 · @Anmol

This is the design system as it actually shipped on moneymolz.com, written so you can use it for carousels, stories and anything else you make. The original redesign plan (Oct 11) is kept at the bottom for reference. Where the two disagree, this top part wins.

**The vibe in one line:** warm paper, one terracotta accent, a serif with personality, and numbers that stay quiet and honest. Editorial, not corporate. Rounded squares, never circles.

---

## 1. Color

Warm neutrals instead of cold grays. Terracotta is the only accent. Green and red are only for money moving (up and down), never decoration.

### Core palette

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `paper` | `#FAF7F2` | `#14120F` | Page / slide background |
| `card` | `#FFFFFF` | `#1D1A16` | Cards and tiles |
| `sand` | `#F1EBE0` | `#26221C` | Subtle fills, empty bar tracks, detail chips |
| `line` | `#E7DFD1` | `#332E26` | 1px borders and dividers |
| `ink` | `#1C1917` | `#F5F1EA` | Headlines and key numbers |
| `ink-soft` | `#57534E` | `#B8B0A3` | Body text and **all small text** |
| `ink-mute` | `#A8A196` | `#7A7468` | Lines, dots, chart strokes only (too light for text) |
| `molz` | `#C8553D` | `#E4725A` | The accent: italic headline words, links, "i am here", active states |
| `molz-solid` | `#B94A33` | `#B94A33` | **Solid buttons only**, with white text (hover `#A3402B`) |
| `molz-tint` | `#F6E3DD` | `#3A211B` | Soft accent fills: "new" chips, the slow-years tile, photo offset shadow |

### Money and chart colors

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `gain` | `#3F7D58` | `#6BB88A` | Money up, goal reached, "kept" in cash flow |
| `loss` | `#B4483A` | `#E0786A` | Money down, overspend |
| `hold` | `#C79A3B` | `#E0B860` | Cash and SGOV, parked money |
| `sky` | `#4F7CAC` | `#7FA6D1` | Retirement accounts |

Bucket colors stay the same everywhere: retirement = `sky`, cash and SGOV = `hold`, brokerage / your top holding = `molz`, spending = `ink-mute`, travel = `gain`.

### Color rules
- One terracotta moment per screen or slide. It should point at the thing that matters.
- White text only ever sits on `#B94A33`, never on the lighter `#C8553D` (that one fails contrast).
- Small text (captions, labels, dates) is always `ink-soft`, never `ink-mute`.
- Never use color alone to say up or down: pair it with an arrow and a + or − sign.

---

## 2. Type

Three fonts, each with one job. All free on Google Fonts.

| Font | Job | Where you've seen it |
| --- | --- | --- |
| **Instrument Serif** | The one big moment | "every dollar, *out loud*.", $274,000, "i am here", "−25k to 274k in ~7 years" |
| **Young Serif** | Editorial titles | moneymolz wordmark, section titles ("where every paycheck goes"), tile titles, the drop-cap "h", the slow-years quote, "kyoto, japan" |
| **Figtree** | Everything else | Body, labels, eyebrows, buttons, every number that isn't the hero number |

### Scale (website)

| Role | Font | Size | Notes |
| --- | --- | --- | --- |
| Display | Instrument Serif | 72 / 76 desktop, 48 / 52 phone | Tracking −0.02em. One per screen. Italic + `molz` for the emphasized phrase. |
| Big number | Instrument Serif | 60–72 | $274,000 |
| Section title | Young Serif | 56 desktop, 34 phone | "about me", "what i post about" |
| Card title | Young Serif | 28 / 34 | |
| Stat number | Figtree 600 | 32–44, tabular | 28.7%, $5,850 |
| Body | Figtree 300–400 | 17–19, line-height 1.6 | Never below 16 on the site |
| Small / labels | Figtree 400–500 | 13–15 | `ink-soft` |
| Eyebrow | Figtree 600 | 12, tracking +0.08em | **lowercase**, never all caps |
| Masthead meta | Figtree | 12, tracking +0.22em | "est. 2021 · updated oct 12" |

### Type rules
- Only one serif size shouts at a time.
- Every dollar figure and percentage uses tabular numbers so columns line up.
- Short money format: 274k, 1.25m. Negative uses a true minus sign: **−25k** (not a hyphen).

---

## 3. Voice and copy

- **Lowercase everything**: headlines, buttons, labels, eyebrows, dates ("jan 2026", "oct 12").
- Exceptions: tickers when they're a proper noun in a sentence ("in SGOV"), and press names (CNBC, Acorns).
- Plain words, not finance jargon. "where every paycheck goes", not "cash flow allocation".
- No corporate filler. No "last synced", no "self-reported, not audited", no repeated dates. One date line, at the top: "est. 2021 · updated oct 12".
- Honest beats polished: the slow years get a tile.

### Privacy rules (what's OK to share)
- ✅ Net worth (rounded), milestones with **month + year only**, percentages (savings rate, allocation, goal progress), tickers.
- ✅ Account *institutions* in the money map (robinhood checking, fidelity brokerage), card names.
- ❌ Month-by-month history, balances per account, paycheck or contribution dollar amounts (they reveal salary), FI number or spending totals.
- ❌ Retirement and education account names: keep them generic ("retirement", "education savings"), no 401k / 529 / IRA labels in the map.
- Anything made up for a demo is labeled **sample data**, every time.

---

## 4. Shape, space, depth

- **Radius:** 16px cards and tiles, 12px inner elements (chips, detail rows, small photos), 999px pills and progress bars. Photos get rounded corners, never circles.
- **Borders:** 1px `line` on every card. Shadow is barely there: `0 1px 2px rgba(28,25,23,.04)`.
- **Signature move:** the framed photo. A white card frame with 10px padding, 16px corners, and a solid **10px offset shadow in `molz-tint`** (no blur). Use it for one hero photo, not everywhere.
- **Hover (web):** lift 2px and darken the border to `ink-mute`.
- **Spacing:** 4px grid. Card padding 24–32px. Section gap 96px desktop, 56px phone. Max content width 1120px.
- **Grid:** 12 columns, 16px gaps.

---

## 5. Components (as built)

| Component | What it looks like | Reuse it for |
| --- | --- | --- |
| **Net worth card** | Eyebrow "net worth", big Instrument Serif number, goal rail (sand track, molz fill, white-ringed milestone dots), "i am here" in italic molz with a hand-drawn arrow pointing at the bar's end, "$26,000 to go.", then the summary line | Any milestone or progress post |
| **The climb** | Vertical timeline, newest at top. Filled molz dots for reached, hollow molz dot for "next", hollow gray dot for the starting point. Amount left (bold, tabular), date right (ink-soft) | "how long each 50k took" posts |
| **Goal rail** | 12px sand track, molz fill, 16px dots at each milestone | Any "x% of the way there" visual |
| **Bento tile** | White card, eyebrow, one fact, arrow button bottom-right (sand circle). Slow-years tile uses `molz-tint` background | Cover grids, "what i track" slides |
| **Ring gauge** | 96px ring, 6px stroke, sand track, molz progress | A single percentage (savings rate) |
| **Allocation bar** | One stacked bar + dot legend with % | Portfolio breakdown |
| **Money map** | Nodes as rounded cards, hub in solid `#B94A33` with white text, thin gray curved connectors, dashed line for money flowing back | Flow diagrams |
| **Photo tile** | Full-bleed photo, dark gradient from the bottom, small label + Young Serif caption in white | Travel, life moments |
| **Solid button** | `#B94A33` pill, white Figtree 600, arrow icon | CTAs: "book your session · $75" |
| **"new" chip** | `molz-tint` pill, ink text, 13px | Labeling something fresh |

Icons are Lucide (thin, 1.5–2px stroke), always in a tinted circle or square when they stand alone.

---

## 6. Carousel cheat sheet

Instagram portrait carousel: **1080 × 1350 px** (4:5). Everything below is the website system scaled up roughly 2.5×.

### Canvas
- Background `paper` `#FAF7F2` (or dark `#14120F` for a moody / slow-years series).
- Safe margin: **96px** on all sides. Keep text out of the bottom 160px on the last slide (the UI covers it).
- Cards on slides: white, 1px `#E7DFD1` border (2px at this size reads better), **40px radius**, 64–80px padding.

### Type on slides

| Role | Font | Size on a 1080 slide |
| --- | --- | --- |
| Cover headline | Instrument Serif | 120–150px, tracking −2%, italic molz for the key phrase |
| Big number | Instrument Serif | 160–200px |
| Slide title | Young Serif | 64–80px |
| Body | Figtree 400 | 40–44px (never below 32) |
| Eyebrow / label | Figtree 600 | 28–30px, +8% tracking, lowercase |
| Footnote | Figtree 400 | 26–28px, `ink-soft` |

### Slide recipes
1. **Cover:** paper background, small eyebrow ("net worth update · oct 2026"), Instrument Serif headline with one italic terracotta phrase ("every dollar, *out loud*."). Optional framed photo with the molz-tint offset shadow.
2. **The number:** white card, "net worth" eyebrow, huge Instrument Serif number, goal rail with "i am here". One sentence under it.
3. **The climb:** the timeline (dots + amount + month/year). Close with the summary line in Instrument Serif italic.
4. **Breakdown:** allocation bar or ring gauge, percentages only, one takeaway sentence.
5. **Money map:** nodes as rounded cards, hub in solid `#B94A33`.
6. **Slow years / real talk:** `molz-tint` background, one Young Serif quote in your words.
7. **Closing CTA:** short line + `#B94A33` pill button ("build your dashboard with me"), handle @moneymolz in Figtree.

### Do / don't
- ✅ One accent moment per slide · lowercase · lots of paper space · rounded squares · tabular numbers.
- ❌ Circle crops · gradients or neon greens · all caps · more than two fonts on a slide · exact balances or monthly history · "AI-ish" filler ("last synced", "self-reported").

---

## 7. Where things live in the code

- Tokens: `src/styles/global.css` (CSS variables) and `tailwind.config.ts`.
- Every homepage number and label: `src/data/site.ts`. Change `siteUpdated` when you update numbers; add a row to `netWorth.climb` when you hit a milestone.
- Sample dashboard data for /work-with-me: `src/data/demo.ts` (always labeled sample).

---
---

## Appendix: original redesign plan (Oct 11, 2026)

The plan the site was built from. Kept for reference; the sections above describe what actually shipped. Main differences: Astro instead of Next.js, lowercase everywhere (no caps eyebrows), `ink-soft` for small text, a single date line instead of "last synced", the hero photo and the net worth card in the bento (with "the climb"), and generic account names in the money map.

## MoneyMolz Redesign Spec

Oct 11, 2026 · @Anmol

A warm paper background, one terracotta accent, and a serif that carries the personality. The numbers stay quiet and tabular so the story, not the chrome, is what people notice.

### 1. Design system and tokens

#### Color palette

Warm neutrals instead of cold grays. Green and red are reserved for money movement only, so they never feel decorative.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `paper` | `#FAF7F2` | `#14120F` | Page background |
| `card` | `#FFFFFF` | `#1D1A16` | Cards, bento tiles |
| `sand` | `#F1EBE0` | `#26221C` | Subtle fills, tracks, hover |
| `line` | `#E7DFD1` | `#332E26` | 1px borders, dividers |
| `ink` | `#1C1917` | `#F5F1EA` | Headlines, key numbers |
| `ink-soft` | `#57534E` | `#B8B0A3` | Body text |
| `ink-mute` | `#A8A196` | `#7A7468` | Captions, axis labels |
| `molz` (accent) | `#C8553D` | `#E4725A` | Brand accent, links, active states |
| `molz-tint` | `#F6E3DD` | `#3A211B` | Accent backgrounds, chips |
| `gain` | `#3F7D58` | `#6BB88A` | Positive change, goal reached |
| `loss` | `#B4483A` | `#E0786A` | Negative change, overspend |
| `hold` | `#C79A3B` | `#E0B860` | In progress, parked cash (SGOV) |
| `sky` | `#4F7CAC` | `#7FA6D1` | Retirement accounts |

Bucket colors for charts, used consistently everywhere: Retirement = `sky`, Cash and SGOV = `hold`, Brokerage = `molz`, Spending = `ink-mute`, Travel = `gain`.

#### Typography

| Role | Font | Size / line | Weight | Notes |
| --- | --- | --- | --- | --- |
| Display | Instrument Serif | 72 / 76 (mobile 48 / 52) | 400 | Hero number and page titles, tight tracking `-0.02em` |
| H1 | Young Serif | 40 / 46 | 400 | Section titles |
| H2 | Young Serif | 28 / 34 | 400 | Card titles |
| H3 | Figtree | 18 / 26 | 600 | Sub-headings |
| Body | Figtree | 16 / 26 | 400 | Never below 16px |
| Small | Figtree | 14 / 20 | 500 | Metric labels |
| Eyebrow | Figtree | 12 / 16 | 600, caps, `+0.08em` | Category labels above titles |
| Numerals | Figtree with `tabular-nums` | any | 600 | Every dollar figure, so columns align |

Pairing rule: use Instrument Serif for one big moment per screen (the hero number), and Young Serif for everything else editorial. Only one serif size dominates at a time.

#### Spacing, shape, depth

- 4px base grid. Section padding 96px desktop, 56px mobile. Card padding 24px (32px for hero).
- Radius: 16px cards, 12px inner elements, 999px chips and progress bars.
- Depth comes from a 1px `line` border plus a faint shadow (`0 1px 2px rgba(28,25,23,.04)`), never heavy drop shadows. Hover lifts by 2px and darkens the border.
- Max content width 1120px. Bento grid uses a 12 column layout with 16px gaps.

#### Motion

Subtle, snappy, purposeful. Nothing moves unless it explains something.

| Interaction | Behavior | Timing |
| --- | --- | --- |
| Scroll reveal | Fade up 12px, staggered 60ms per sibling | 450ms, `cubic-bezier(.22,1,.36,1)` |
| Progress bars | Width animates from 0 when 30% in view | 900ms ease-out, one time |
| Count-up numbers | Hero net worth counts from 0, then settles | 1200ms, ease-out |
| Card hover | Translate -2px, border to `ink-mute` | 150ms |
| Tab / toggle change | Content cross-fades, active pill slides | 200ms |
| Money Map node open | Panel expands with height animation, connector line draws | 300ms |
| Reduced motion | All of the above become instant opacity changes | `prefers-reduced-motion` |

### 2. Homepage: "The Ledger"

The homepage opens like the first page of an accounting book: one honest number, how far it is from the goal, and a line about why you share it.

#### Hero section

Two columns on desktop, stacked on mobile. Left is the story, right is the live tracker card.

**Left column**

- Eyebrow: `THE LEDGER · UPDATED OCT 11`
- Headline in Instrument Serif: "Every dollar, out loud." with "out loud" in italic `molz`.
- Two lines of body copy: who you are, Brooklyn, sharing real numbers since 2021.
- Two actions: primary button "See the Money Map", text link "Peek at my dashboard".
- A small proof row under the buttons: "Since 2021" and "Covered by CNBC and Acorns".

**Right column: the Net Worth Tracker card**

- Label "Net worth", then the number in Display serif with a count-up on load.
- Delta chip under it: `+$X this month` in `gain`, with a tiny sparkline of the last 12 months.
- A goal rail: a thick progress bar with the current value as a filled segment, a marker for the goal ("300k by 30"), and the remaining distance written in words ("$X to go, about N months at this pace").
- Three mini milestones as dots on the rail (100k, 200k, 300k) that fill in as they are reached. The next one pulses once.
- Footer line: "Self-reported, not audited. Last synced Oct 11." This keeps the honest tone and prevents a corporate feel.

What keeps it from feeling sterile: the paper background, serif numerals, hand-written style annotation ("you are here" with a small curved arrow in `molz`), and plain-English captions instead of finance jargon.

#### Bento grid

Six tiles on a 12 column grid, directly under the hero. Every tile is a link, shows one live fact, and has a single arrow icon that nudges right on hover.

| Tile | Grid span | Live fact shown | Visual treatment |
| --- | --- | --- | --- |
| The Money Map | 7 cols, 2 rows | "Paycheck in, 7 destinations" | Mini flow diagram preview, animated line draw on hover |
| Molz Life dashboard | 5 cols, 1 row | This month's savings rate | Ring gauge, `molz` stroke |
| Milestones | 5 cols, 1 row | Next milestone and % there | Stepped progress dots |
| Investing | 4 cols | Top allocation, e.g. "Index funds, 62%" | Stacked bar, 3 segments |
| Solo travel | 4 cols | Latest trip and where next | Photo tile with a soft overlay and serif caption |
| Slow years | 4 cols | One line from the latest note | Pure type tile on `molz-tint` |

On tablet the grid becomes two columns, Money Map spans both. On mobile it is a single column, ordered Money Map, Dashboard, Milestones, Investing, Travel, Slow years.

#### Below the grid

1. "Latest from the ledger": three most recent posts as text-forward cards (serif title, one line, date).
2. A quiet footer with Instagram link (@moneymolz), newsletter field, and a short disclaimer: personal sharing, not financial advice.

### 3. The Money Map: "Where Every Paycheck Goes"

Every paycheck passes through one Hub, then splits into saving, investing, and spending. The map shows that flow at a glance, and each stop opens to show what is inside it.

&#91;embedded content: paycheck flow, from paycheck to the Hub to every bucket\]

Only the Hub is highlighted because every other stop depends on it, and rewards loop back into it.

#### Interaction model

Three levels, so the page is readable in five seconds and explorable in five minutes.

| Level | What the visitor sees | Interaction |
| --- | --- | --- |
| 1. The whole map | Every stop joined by lines, Hub in the accent color | Hover a stop to light up its incoming and outgoing lines and dim the rest |
| 2. A stop | Name, one-line purpose, and the amount or share it receives | Click or tap to open a detail panel |
| 3. The detail | The actual contents of that stop | Close with the same click, Escape, or by opening another stop |

#### Two render modes

1. **Node map, desktop default.** Inline SVG laid out in four columns (paycheck, deductions, Hub, destinations). Nodes are real `<button>` elements positioned over the SVG lines so they stay keyboard accessible. Lines draw in with a stroke-dashoffset animation when the section scrolls into view. The open stop's detail panel slides in beside the map on wide screens and under it on narrow ones.
2. **Accordion, mobile default.** The same stops as a vertical rail with a connector line between icon chips, each one a collapsible card. This is Component 2 in the code blueprint. Switch at the `md` breakpoint, and let visitors override with a small "Map / List" toggle.

Both modes read from one `stages` array, so content is edited in a single place.

#### What each detail panel holds

| Stop | Detail content |
| --- | --- |
| Paycheck | When it lands and what comes out first |
| Deductions | Retirement account and HSA, both maxed, and why they come first |
| The Hub | Robinhood checking, with what leaves it: bills, rent, and each transfer |
| Robinhood savings | Travel and gift buckets, each with a progress bar |
| Fidelity brokerage | Emergency fund and wedding bucket, held in SGOV |
| Investing | Traditional IRA, Roth IRA, and the education savings plan |
| Credit cards | One row per card with the category it is used for and its reward |
| Cashback apps | Rakuten and Fetch, with what each is used for |

#### Behavior details

- Deep links: opening a stop sets the URL hash (for example `#money-map/brokerage`), so a post or Instagram story can link straight to one stop.
- Keyboard: Tab moves between stops in flow order, Enter or Space opens, Escape closes, and arrow keys move between sibling stops.
- Reduced motion: lines render fully drawn and panels appear without sliding.
- Print and share: a "Copy as image" action renders the closed map as a clean PNG for social posts.

### 4. "Molz Life": Peek at My Dashboard

An open book, not a login wall. One tabbed command center with a consistent card system, so visitors learn the layout once and then just flip through views.

#### Layout

- **Header strip:** title "Peek at my dashboard", a "Last synced" timestamp, and a Monthly / Quarterly / YTD segmented toggle that applies to every tab.
- **Tab bar:** four pill tabs: Cash flow, Allocation, Goals, Life buckets. Sticky on scroll, horizontally scrollable on mobile. The active pill slides under the selection.
- **Stage:** a 12 column grid that swaps per tab. Cards cross-fade in with a 60ms stagger.
- **Privacy control:** a "Show amounts / Show percentages" switch in the header, so Anmol can share the shape of finances without exact figures when she wants to.

#### Reusable components

| Component | Anatomy | Notes |
| --- | --- | --- |
| MetricCard | Eyebrow label, big tabular number, delta chip, one-line caption | Number in Figtree 600, 32px. Delta uses `gain` or `loss`. |
| ProgressRow | Label left, "$ of $" right, 8px rounded track, filled bar | Bar color follows the bucket color. Animates once on view. |
| AllocationBar | One horizontal stacked bar plus a legend with % and $ | Preferred over pie charts: easier to read, fits the editorial feel. |
| FlowBars | Paired income and spend bars per month, savings gap shaded in `gain` | Six months by default. |
| Sparkline | 80x24 inline SVG, 1.5px `ink-mute` line, last point in `molz` | No axes, no labels. |
| BucketCard | Icon in a tinted circle, name, balance, target, ProgressRow | Used for travel and life buckets. |

#### The four views

| View | What visitors see | Cards |
| --- | --- | --- |
| Cash flow | How much came in, went out, and was kept this period | 3 MetricCards (Income, Spending, Savings rate), FlowBars chart, a ranked list of top 5 spend categories with ProgressRows |
| Allocation | Where the money sits | Large AllocationBar split across retirement accounts, HSA, SGOV, Brokerage, Cash, with a legend. Below it, a row of small cards, one per account type, each with a sparkline |
| Goals | Progress toward named goals | ProgressRows for "300k by 30", emergency fund, wedding bucket, each with a target date and a pace note such as "on track" or "3 weeks behind" |
| Life buckets | Money set aside for living | BucketCards for Solo travel, Gifts, Home, Fun money, each showing balance, monthly top-up, and what it was last spent on |

#### Readability rules

- One idea per card. If a card needs a paragraph to explain, split it.
- Numbers always in `tabular-nums`, aligned right in lists.
- Never rely on color alone: delta chips carry an up or down arrow icon and a +/- sign.
- Charts get a text summary underneath ("Savings rate is 34%, up 3 points from last month") for screen readers and quick scanners.
- Empty or stale data shows "Not synced yet" in `ink-mute`, never a zero.

#### Data shape

A single JSON endpoint per period keeps the front end simple. Suggested contract:

```json
{
  "asOf": "2026-10-11",
  "cashFlow": { "income": 0, "spending": 0, "saved": 0, "months": [] },
  "allocation": [{ "key": "retirement", "label": "Retirement accounts", "value": 0 }],
  "goals": [{ "id": "300k-by-30", "label": "300k by 30", "current": 0, "target": 300000, "due": "2029-12-31" }],
  "buckets": [{ "id": "travel", "label": "Solo travel", "balance": 0, "target": 0 }]
}
```

### 5. Code blueprint (Next.js, Tailwind, Lucide)

All three components are below, plus the token wiring they depend on. They assume Next.js App Router, Tailwind 3.4+, and `lucide-react`. Every figure comes in as a prop from your data feed, so no numbers are hardcoded in the components.

```bash
npm i lucide-react
```

#### File map

| File | Purpose |
| --- | --- |
| `app/globals.css` | Color tokens as CSS variables with light and dark values |
| `tailwind.config.ts` | Maps tokens to Tailwind colors, fonts, animation |
| `app/layout.tsx` | Loads the three fonts via `next/font` |
| `components/hooks.ts` | `useInView` and `useCountUp` |
| `components/NetWorthCard.tsx` | Hero tracker |
| `components/MoneyMap.tsx` | Paycheck flow, accordion version |
| `components/MolzLifeWidget.tsx` | Tabbed dashboard |

#### Tokens: `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --paper: 250 247 242; --card: 255 255 255; --sand: 241 235 224; --line: 231 223 209;
  --ink: 28 25 23; --ink-soft: 87 83 78; --ink-mute: 168 161 150;
  --molz: 200 85 61; --molz-tint: 246 227 221;
  --gain: 63 125 88; --loss: 180 72 58; --hold: 199 154 59; --sky: 79 124 172;
}
@media (prefers-color-scheme: dark) {
  :root {
    --paper: 20 18 15; --card: 29 26 22; --sand: 38 34 28; --line: 51 46 38;
    --ink: 245 241 234; --ink-soft: 184 176 163; --ink-mute: 122 116 104;
    --molz: 228 114 90; --molz-tint: 58 33 27;
    --gain: 107 184 138; --loss: 224 120 106; --hold: 224 184 96; --sky: 127 166 209;
  }
}
body { @apply bg-paper font-sans text-ink antialiased; }
```

#### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const c = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: c('paper'), card: c('card'), sand: c('sand'), line: c('line'),
        ink: { DEFAULT: c('ink'), soft: c('ink-soft'), mute: c('ink-mute') },
        molz: { DEFAULT: c('molz'), tint: c('molz-tint') },
        gain: c('gain'), loss: c('loss'), hold: c('hold'), sky: c('sky'),
      },
      fontFamily: {
        display: ['var(--font-instrument)', 'serif'],
        serif: ['var(--font-young)', 'serif'],
        sans: ['var(--font-figtree)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up 450ms cubic-bezier(.22,1,.36,1) both' },
    },
  },
  plugins: [],
} satisfies Config;
```

#### `app/layout.tsx` (fonts only)

```tsx
import { Figtree, Instrument_Serif, Young_Serif } from 'next/font/google';
import './globals.css';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument' });
const young = Young_Serif({ subsets: ['latin'], weight: '400', variable: '--font-young' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${figtree.variable} ${instrument.variable} ${young.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

#### `components/hooks.ts`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

export function useCountUp(target: number, run: boolean, ms = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(target); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / ms, 1);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return value;
}
```

#### Component 1: `components/NetWorthCard.tsx`

Count-up number, delta chip with sparkline, and a goal rail with milestone dots and a plain-English distance line.

```tsx
'use client';
import { ArrowUpRight, Target } from 'lucide-react';
import { useCountUp, useInView } from './hooks';

type Props = {
  netWorth: number;
  goal: number;
  goalLabel: string;       // e.g. '300k by 30'
  monthDelta: number;      // change this month, in dollars
  milestones: number[];    // e.g. [100000, 200000, 300000]
  series: number[];        // last 12 month-end values for the sparkline
  asOf: string;            // e.g. 'Oct 11'
};

const usd = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null;
  const w = 80, h = 24;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 2 - ((v - min) / (max - min || 1)) * (h - 4),
  ]);
  const last = pts[pts.length - 1];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill='none' stroke='currentColor' strokeWidth='1.5' className='text-ink-mute' />
      <circle cx={last[0]} cy={last[1]} r='2.5' className='fill-molz' />
    </svg>
  );
}

export function NetWorthCard({ netWorth, goal, goalLabel, monthDelta, milestones, series, asOf }: Props) {
  const { ref, seen } = useInView<HTMLElement>();
  const shown = useCountUp(netWorth, seen);
  const pct = Math.min(netWorth / goal, 1) * 100;
  const remaining = Math.max(goal - netWorth, 0);
  const monthsLeft = monthDelta > 0 ? Math.ceil(remaining / monthDelta) : null;
  const up = monthDelta >= 0;

  return (
    <section
      ref={ref}
      aria-label='Net worth tracker'
      className='rounded-2xl border border-line bg-card p-6 shadow-[0_1px_2px_rgba(28,25,23,.04)] transition duration-150 hover:-translate-y-0.5 hover:border-ink-mute/60 sm:p-8'
    >
      <p className='text-xs font-semibold uppercase tracking-[0.08em] text-ink-mute'>Net worth</p>

      <p className='mt-2 font-display text-5xl leading-[1.05] tracking-tight tabular-nums text-ink sm:text-7xl'>
        {usd(shown)}
      </p>

      <div className='mt-4 flex items-center gap-4'>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold tabular-nums ${
            up ? 'bg-gain/10 text-gain' : 'bg-loss/10 text-loss'
          }`}
        >
          <ArrowUpRight className={`h-4 w-4 ${up ? '' : 'rotate-90'}`} aria-hidden />
          {up ? '+' : '-'}{usd(Math.abs(monthDelta))} this month
        </span>
        <Sparkline data={series} />
      </div>

      {/* Goal rail */}
      <div className='mt-8'>
        <div className='mb-3 flex items-center justify-between text-sm'>
          <span className='inline-flex items-center gap-1.5 font-semibold text-ink'>
            <Target className='h-4 w-4 text-molz' aria-hidden /> {goalLabel}
          </span>
          <span className='tabular-nums text-ink-soft'>{Math.round(pct)}%</span>
        </div>

        <div
          role='progressbar'
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-valuenow={Math.min(netWorth, goal)}
          aria-label={`Progress toward ${goalLabel}`}
          className='relative h-3 rounded-full bg-sand'
        >
          <div
            className='h-full rounded-full bg-molz transition-[width] duration-[900ms] ease-out'
            style={{ width: seen ? `${pct}%` : '0%' }}
          />
          {milestones.map((m) => {
            const reached = netWorth >= m;
            return (
              <span
                key={m}
                title={usd(m)}
                className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card transition-colors duration-500 ${
                  reached ? 'bg-molz' : 'bg-line'
                }`}
                style={{ left: `${(m / goal) * 100}%` }}
              />
            );
          })}
        </div>

        <p className='mt-4 text-sm text-ink-soft'>
          <span className='font-semibold tabular-nums text-ink'>{usd(remaining)}</span> to go
          {monthsLeft ? `, about ${monthsLeft} months at this pace.` : '.'}
        </p>
      </div>

      <p className='mt-6 border-t border-line pt-4 text-xs text-ink-mute'>
        Self-reported, not audited. Last synced {asOf}.
      </p>
    </section>
  );
}
```

Usage:

```tsx
<NetWorthCard
  netWorth={data.netWorth}
  goal={data.goal}
  goalLabel={data.goalLabel}
  monthDelta={data.monthDelta}
  milestones={data.milestones}
  series={data.series}
  asOf={data.asOf}
/>
```

#### Component 2: `components/MoneyMap.tsx`

Accordion version of the paycheck flow. Each stage is a node on a vertical rail. Opening one animates its height and reveals the detail rows. For the interactive node-map variant, see the Money Map section above.

```tsx
'use client';
import { useState } from 'react';
import {
  BadgePercent, ChevronDown, CreditCard, Landmark, PiggyBank, Plane,
  ShieldCheck, TrendingUp, Wallet, type LucideIcon,
} from 'lucide-react';

type Detail = { label: string; value: string };
export type Stage = {
  id: string;
  stage: string;      // eyebrow, words only
  icon: LucideIcon;
  tone: string;       // full Tailwind classes for the icon chip
  title: string;
  headline: string;
  note: string;
  details: Detail[];
};

// Wording follows the live Money Map. Edit copy here and both render modes update.
export const STAGES: Stage[] = [
  {
    id: 'paycheck', stage: 'Lands', icon: Wallet, tone: 'bg-molz-tint text-molz',
    title: 'Paycheck lands', headline: 'Twice a month',
    note: 'Everything starts here. Retirement and health savings come out first, then the rest goes to the Hub.',
    details: [{ label: 'Lands', value: 'Mid-month and month end' }, { label: 'Goes to', value: 'The Hub' }],
  },
  {
    id: 'deductions', stage: 'First', icon: PiggyBank, tone: 'bg-sky/15 text-sky',
    title: 'Deductions', headline: 'Retirement and HSA',
    note: 'Retirement first. Both are maxed out.',
    details: [{ label: 'Retirement', value: 'Fidelity, maxed' }, { label: 'HSA', value: 'Maxed' }],
  },
  {
    id: 'hub', stage: 'The Hub', icon: Landmark, tone: 'bg-sand text-ink',
    title: 'Robinhood checking', headline: 'Bills and rent flow out from here',
    note: 'Everything below is funded from this one account.',
    details: [{ label: 'Account', value: 'Robinhood checking' }, { label: 'Pays', value: 'Bills and rent' }],
  },
  {
    id: 'savings', stage: 'Set aside', icon: Plane, tone: 'bg-gain/10 text-gain',
    title: 'Robinhood savings', headline: 'Travel and gift buckets',
    note: 'Money set aside for the things planned ahead.',
    details: [{ label: 'Travel', value: 'Bucket' }, { label: 'Gifts', value: 'Bucket' }],
  },
  {
    id: 'brokerage', stage: 'Held', icon: ShieldCheck, tone: 'bg-hold/15 text-hold',
    title: 'Fidelity brokerage', headline: 'Emergency fund and wedding bucket',
    note: 'Held in SGOV so the cash keeps working while it waits.',
    details: [{ label: 'Emergency fund', value: 'SGOV' }, { label: 'Wedding bucket', value: 'SGOV' }],
  },
  {
    id: 'investing', stage: 'Growing', icon: TrendingUp, tone: 'bg-molz-tint text-molz',
    title: 'Investing', headline: 'IRAs and the education savings plan',
    note: 'Long-term accounts.',
    details: [{ label: 'Traditional IRA', value: 'Robinhood' }, { label: 'Roth IRA', value: 'Robinhood' }, { label: 'Education plan', value: 'New York' }],
  },
  {
    id: 'cards', stage: 'Spending', icon: CreditCard, tone: 'bg-sand text-ink',
    title: 'Credit cards', headline: 'All on autopay, paid off manually every payday',
    note: 'Each card has its own job. Open a card to see what it is used for.',
    details: [
      { label: 'Chase Sapphire Preferred', value: 'On autopay' },
      { label: 'Chase Freedom Unlimited', value: 'On autopay' },
      { label: 'United Explorer', value: 'On autopay' },
      { label: 'World of Hyatt', value: 'On autopay' },
      { label: 'Bilt Blue', value: 'On autopay' },
      { label: 'U.S. Bank Altitude Connect', value: 'On autopay' },
      { label: 'Robinhood credit card', value: 'On autopay' },
    ],
  },
  {
    id: 'cashback', stage: 'Bonus', icon: BadgePercent, tone: 'bg-gain/10 text-gain',
    title: 'Cashback apps', headline: 'Cash back on things already bought',
    note: 'Small, steady wins on top of everyday spending.',
    details: [{ label: 'Rakuten', value: 'Cash back on purchases' }, { label: 'Fetch', value: 'Points for receipts' }],
  },
];

export function MoneyMap({ stages = STAGES }: { stages?: Stage[] }) {
  const [open, setOpen] = useState<string | null>(stages[0]?.id ?? null);

  return (
    <ol className='relative space-y-4'>
      {stages.map((s, i) => {
        const isOpen = open === s.id;
        const Icon = s.icon;
        return (
          <li key={s.id} className='relative pl-16'>
            {i < stages.length - 1 && (
              <span aria-hidden className='absolute -bottom-4 left-5 top-12 w-px bg-line' />
            )}
            <span className={`absolute left-0 top-3 grid h-10 w-10 place-items-center rounded-full ${s.tone}`}>
              <Icon className='h-5 w-5' aria-hidden />
            </span>

            <div className='rounded-2xl border border-line bg-card transition duration-150 hover:border-ink-mute/60'>
              <button
                type='button'
                aria-expanded={isOpen}
                aria-controls={`panel-${s.id}`}
                onClick={() => setOpen(isOpen ? null : s.id)}
                className='flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-molz'
              >
                <span>
                  <span className='block text-xs font-semibold uppercase tracking-[0.08em] text-ink-mute'>{s.stage}</span>
                  <span className='mt-1 block font-serif text-2xl text-ink'>{s.title}</span>
                  <span className='mt-1 block text-sm text-ink-soft'>{s.headline}</span>
                </span>
                <ChevronDown
                  aria-hidden
                  className={`h-5 w-5 shrink-0 text-ink-mute transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                id={`panel-${s.id}`}
                role='region'
                aria-hidden={!isOpen}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className='overflow-hidden'>
                  <div className='border-t border-line px-5 pb-5 pt-4'>
                    <p className='text-sm leading-6 text-ink-soft'>{s.note}</p>
                    <dl className='mt-4 grid gap-2 sm:grid-cols-2'>
                      {s.details.map((d) => (
                        <div key={d.label} className='flex items-baseline justify-between gap-3 rounded-xl bg-sand px-4 py-3'>
                          <dt className='text-sm text-ink-soft'>{d.label}</dt>
                          <dd className='text-right text-sm font-semibold text-ink'>{d.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
```

#### Component 3: `components/MolzLifeWidget.tsx`

Tabbed dashboard with a period-agnostic data prop, an amounts/percentages privacy switch, keyboard arrow navigation between tabs, and animated progress bars.

```tsx
'use client';
import { useState, type KeyboardEvent } from 'react';
import { ArrowDownRight, ArrowUpRight, Eye, EyeOff, Plane, Target } from 'lucide-react';
import { useInView } from './hooks';

const TABS = [
  { id: 'cash', label: 'Cash flow' },
  { id: 'alloc', label: 'Allocation' },
  { id: 'goals', label: 'Goals' },
  { id: 'life', label: 'Life buckets' },
] as const;
type TabId = (typeof TABS)[number]['id'];
type AllocKey = 'retirement' | 'hsa' | 'sgov' | 'brokerage' | 'cash';

export type MolzData = {
  asOf: string;
  cash: { income: number; spending: number; prevRate: number };
  topSpend: { label: string; value: number }[];
  allocation: { key: AllocKey; label: string; value: number }[];
  goals: { id: string; label: string; current: number; target: number; note: string }[];
  buckets: { id: string; label: string; balance: number; target: number }[];
};

const ALLOC_COLOR: Record<AllocKey, string> = {
  retirement: 'bg-sky', hsa: 'bg-sky/50', sgov: 'bg-hold', brokerage: 'bg-molz', cash: 'bg-ink-mute',
};

const usd = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

function MetricCard({ label, value, delta, caption }: { label: string; value: string; delta?: number; caption?: string }) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className='rounded-2xl border border-line bg-card p-5'>
      <p className='text-xs font-semibold uppercase tracking-[0.08em] text-ink-mute'>{label}</p>
      <p className='mt-2 text-3xl font-semibold tabular-nums text-ink'>{value}</p>
      <div className='mt-2 flex items-center gap-2 text-sm'>
        {delta !== undefined && (
          <span className={`inline-flex items-center gap-0.5 font-semibold tabular-nums ${up ? 'text-gain' : 'text-loss'}`}>
            {up ? <ArrowUpRight className='h-4 w-4' aria-hidden /> : <ArrowDownRight className='h-4 w-4' aria-hidden />}
            {up ? '+' : '-'}{Math.abs(delta).toFixed(1)} pts
          </span>
        )}
        {caption && <span className='text-ink-soft'>{caption}</span>}
      </div>
    </div>
  );
}

function ProgressRow({ label, right, pct, color = 'bg-molz', seen }: { label: string; right: string; pct: number; color?: string; seen: boolean }) {
  return (
    <div>
      <div className='mb-1.5 flex items-baseline justify-between gap-3 text-sm'>
        <span className='font-medium text-ink'>{label}</span>
        <span className='tabular-nums text-ink-soft'>{right}</span>
      </div>
      <div className='h-2 rounded-full bg-sand'>
        <div
          className={`h-full rounded-full ${color} transition-[width] duration-[900ms] ease-out`}
          style={{ width: seen ? `${Math.min(pct, 100)}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export function MolzLifeWidget({ data }: { data: MolzData }) {
  const [tab, setTab] = useState<TabId>('cash');
  const [hide, setHide] = useState(false);
  const { ref, seen } = useInView<HTMLDivElement>(0.15);
  const money = (n: number) => (hide ? '•••' : usd(n));

  const saved = data.cash.income - data.cash.spending;
  const rate = (saved / data.cash.income) * 100;
  const total = data.allocation.reduce((a, x) => a + x.value, 0);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length].id;
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section ref={ref} aria-label='Molz Life dashboard' className='rounded-3xl border border-line bg-paper p-4 sm:p-6'>
      <header className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h2 className='font-serif text-3xl text-ink'>Peek at my dashboard</h2>
          <p className='text-sm text-ink-mute'>Last synced {data.asOf}</p>
        </div>
        <button
          type='button'
          onClick={() => setHide((h) => !h)}
          aria-pressed={hide}
          className='inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink-soft transition hover:border-ink-mute/60'
        >
          {hide ? <EyeOff className='h-4 w-4' aria-hidden /> : <Eye className='h-4 w-4' aria-hidden />}
          {hide ? 'Showing percentages' : 'Showing amounts'}
        </button>
      </header>

      <div role='tablist' aria-label='Dashboard views' className='mt-5 flex gap-1 overflow-x-auto rounded-full bg-sand p-1'>
        {TABS.map((t, i) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role='tab'
            type='button'
            aria-selected={tab === t.id}
            aria-controls={`view-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
              tab === t.id ? 'bg-card text-ink shadow-sm' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div key={tab} id={`view-${tab}`} role='tabpanel' aria-labelledby={`tab-${tab}`} className='mt-5 animate-fade-up'>
        {tab === 'cash' && (
          <div className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-3'>
              <MetricCard label='Income' value={money(data.cash.income)} />
              <MetricCard label='Spending' value={money(data.cash.spending)} />
              <MetricCard label='Savings rate' value={`${rate.toFixed(0)}%`} delta={rate - data.cash.prevRate} caption='vs last period' />
            </div>
            <div className='space-y-4 rounded-2xl border border-line bg-card p-5'>
              <p className='text-xs font-semibold uppercase tracking-[0.08em] text-ink-mute'>Where it went</p>
              {data.topSpend.map((s) => (
                <ProgressRow key={s.label} label={s.label} right={hide ? `${((s.value / data.cash.spending) * 100).toFixed(0)}%` : usd(s.value)} pct={(s.value / data.cash.spending) * 100} color='bg-ink-mute' seen={seen} />
              ))}
            </div>
          </div>
        )}

        {tab === 'alloc' && (
          <div className='rounded-2xl border border-line bg-card p-5'>
            <p className='text-xs font-semibold uppercase tracking-[0.08em] text-ink-mute'>Where the money sits</p>
            <div className='mt-4 flex h-4 overflow-hidden rounded-full bg-sand' role='img' aria-label='Asset allocation'>
              {data.allocation.map((a) => (
                <div key={a.key} className={`${ALLOC_COLOR[a.key]} transition-[width] duration-[900ms] ease-out`} style={{ width: seen ? `${(a.value / total) * 100}%` : '0%' }} />
              ))}
            </div>
            <ul className='mt-5 grid gap-3 sm:grid-cols-2'>
              {data.allocation.map((a) => (
                <li key={a.key} className='flex items-center justify-between gap-3 text-sm'>
                  <span className='inline-flex items-center gap-2 text-ink'>
                    <span className={`h-2.5 w-2.5 rounded-full ${ALLOC_COLOR[a.key]}`} aria-hidden />
                    {a.label}
                  </span>
                  <span className='tabular-nums text-ink-soft'>
                    {((a.value / total) * 100).toFixed(0)}%{!hide && <span className='ml-2 text-ink-mute'>{usd(a.value)}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'goals' && (
          <div className='space-y-5 rounded-2xl border border-line bg-card p-5'>
            {data.goals.map((g) => (
              <div key={g.id}>
                <ProgressRow label={g.label} right={hide ? `${((g.current / g.target) * 100).toFixed(0)}%` : `${usd(g.current)} of ${usd(g.target)}`} pct={(g.current / g.target) * 100} seen={seen} />
                <p className='mt-1.5 flex items-center gap-1.5 text-xs text-ink-mute'><Target className='h-3.5 w-3.5' aria-hidden />{g.note}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'life' && (
          <div className='grid gap-4 sm:grid-cols-2'>
            {data.buckets.map((b) => (
              <div key={b.id} className='rounded-2xl border border-line bg-card p-5'>
                <div className='flex items-center gap-3'>
                  <span className='grid h-9 w-9 place-items-center rounded-full bg-gain/10 text-gain'><Plane className='h-4 w-4' aria-hidden /></span>
                  <div>
                    <p className='font-semibold text-ink'>{b.label}</p>
                    <p className='text-sm tabular-nums text-ink-soft'>{hide ? `${((b.balance / b.target) * 100).toFixed(0)}% funded` : `${usd(b.balance)} of ${usd(b.target)}`}</p>
                  </div>
                </div>
                <div className='mt-4'><ProgressRow label='Funded' right={`${((b.balance / b.target) * 100).toFixed(0)}%`} pct={(b.balance / b.target) * 100} color='bg-gain' seen={seen} /></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

#### Hand-off notes for the developer

- Fetch dashboard data in a server component and pass it as the `data` prop. The widget itself only needs client state for tabs and the privacy toggle.
- The privacy toggle only changes display. If amounts should never reach the browser, strip them on the server and send percentages only.
- Every animation respects `prefers-reduced-motion` through the count-up hook; add `motion-reduce:transition-none` to the bar classes if you want bars instant as well.
- Replace the single `Plane` icon in bucket cards with a per-bucket icon field when more bucket types are added.

### 6. Build your dashboard with me (1:1 sessions)

The homepage link tagged "new" opens /work-with-me, a 60 minute, $75 working session where you build someone's personal finance dashboard with them. The redesign makes this page the bridge between the public Molz Life dashboard and a booked session, by showing the same dashboard component as the proof.

#### What the live page does today

| Block | Current content |
| --- | --- |
| Hero | Headline "build your dashboard with me.", 60 minutes at $75, button to the cal.com booking page |
| What you get | Four items: your money picture, the system, dashboard walkthrough, your version |
| What you will walk away with | A hand-built sample dashboard: net worth vs goal, YTD spend, cash flow, recurring bills, holdings, emergency and travel cash, an actual vs pace chart, holdings by value, a sample month cash flow split. Labeled as sample data |
| How it works | Three steps: book and pay, fill the prep form, meet for 60 minutes |
| The honest bit | Not licensed financial advice, just the system you use rebuilt around them |
| Closing action | Second booking button, $75 |

#### Redesign changes

1. **Reuse the Molz Life widget as the sample.** Replace the bespoke demo with `MolzLifeWidget` (Component 3) fed by a `demoData` object, with a permanent "Sample data" chip above it. Visitors can flip tabs, so the proof doubles as the demo, and the session page and the homepage dashboard can never drift apart.
2. **Hero.** Keep the serif headline with "dashboard" in italic accent. Put price and length in a quiet meta row next to the button (clock icon, "60 minutes · $75"). On mobile, a sticky booking bar appears once the hero scrolls out of view.
3. **What you get.** Turn the four items into a 2x2 bento using the same tile style as the homepage, each with a Lucide icon in a tinted circle.
4. **How it works.** A horizontal three step rail with a connecting line, matching the Money Map accordion rail. Step 2 carries a shield icon callout: ranges are fine, never share logins or account numbers.
5. **The honest bit.** Move it into a bordered `molz-tint` card so the disclaimer reads as part of the voice, not fine print.
6. **One action, repeated.** The same label and price in the hero and at the end. No extra forms on the site; booking stays on cal.com.

Accessibility note: white text on the `molz` terracotta is about 4.4:1, just under 4.5:1. For solid buttons use a slightly deeper fill such as `#B94A33` (about 5.1:1).

#### How it connects to the rest of the site

| From | To | Treatment |
| --- | --- | --- |
| Homepage hero | /work-with-me | Secondary action under the primary button, with a small `new` chip in `molz-tint` |
| Homepage bento grid | /work-with-me | Optional seventh tile, "build yours with me", spanning 4 columns, pure type on `molz-tint` |
| Molz Life dashboard | /work-with-me | Footer line under the widget: "want one like this? build it with me" |
| /work-with-me | Molz Life | Secondary link in the hero: "peek at my dashboard" |

The homepage currently shows Molz Life as "coming soon". Until it ships, the sample dashboard on /work-with-me is the only live preview, so keep it prominent.

#### Component sketch: `components/SessionHero.tsx`

```tsx
import { ArrowRight, Clock } from 'lucide-react';

export function SessionHero({ bookingUrl, dashboardHref }: { bookingUrl: string; dashboardHref: string }) {
  return (
    <section className='mx-auto max-w-[1120px] px-4 py-14 sm:py-24'>
      <p className='text-xs font-semibold uppercase tracking-[0.08em] text-ink-mute'>1:1 sessions</p>
      <h1 className='mt-3 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-7xl'>
        build your <em className='text-molz'>dashboard</em> with me.
      </h1>
      <p className='mt-5 max-w-xl text-lg leading-8 text-ink-soft'>
        a 60 minute working session where we build your personal finance dashboard together, using your real numbers.
      </p>

      <div className='mt-8 flex flex-wrap items-center gap-x-6 gap-y-4'>
        <a
          href={bookingUrl}
          className='group inline-flex items-center gap-2 rounded-full bg-[#B94A33] px-6 py-3 text-base font-semibold text-white transition duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-molz'
        >
          book your session
          <ArrowRight className='h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5' aria-hidden />
        </a>
        <span className='inline-flex items-center gap-1.5 text-sm tabular-nums text-ink-soft'>
          <Clock className='h-4 w-4' aria-hidden /> 60 minutes · $75
        </span>
        <a href={dashboardHref} className='text-sm font-semibold text-molz underline-offset-4 hover:underline'>
          peek at my dashboard
        </a>
      </div>
    </section>
  );
}
```

Place the sample under it:

```tsx
<span className='mb-3 inline-block rounded-full bg-molz-tint px-3 py-1 text-xs font-semibold text-molz'>Sample data</span>
<MolzLifeWidget data={demoData} />
```
