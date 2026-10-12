// ===== EDIT THESE =====
// every number and label on the homepage lives here. components only read from this file.
// a value set to null shows "not synced yet" (or hides) instead of a made-up number.

export type LinkItem = { label: string; href: string; badge?: string; primary?: boolean };

export const netWorth = {
  current: 274000,
  goal: 300000,
  goalLabel: '300k by 30',
  goalDate: 'feb 3', // shows as "by feb 3"
  milestones: [100000, 200000, 300000],
  // change since last month, in dollars. null hides the chip and the "months at this pace" line.
  monthDelta: null as number | null,
  // last 12 month-end net worth values, oldest first. fewer than 2 hides the sparkline.
  series: [] as number[],
  // when these numbers were last updated, e.g. 'oct 11'. null leaves the date off.
  asOf: null as string | null,
};

// extra rows in the ledger section, under net worth and distance to goal
export const ledgerRows = [
  { label: '401k per paycheck', value: '26%' },
];

export const proof = { since: '2021', press: ['cnbc', 'acorns'] };

// the molz life dashboard. '#' until it ships: the homepage shows it as coming soon.
export const molzLifeHref = '#';
// where the 1:1 session page lives
export const workWithMeHref = '/work-with-me';

export const links: LinkItem[] = [
  { label: 'build your dashboard with me', href: workWithMeHref, badge: 'new' },
  { label: 'latest net worth update', href: '#goal-title', primary: true },
  { label: 'join the newsletter', href: 'https://moneymolz.substack.com/' },
  { label: 'molz life: a peek at my dashboard', href: molzLifeHref },
  { label: '[YOUR LINK]', href: '#' },
];

export const topics = ['net worth updates', '401k and hsa', 'index funds', 'budgeting', 'solo travel'];
export const instagram = 'https://instagram.com/moneymolz';

// about me. anything in [BRACKETS] is hidden until you replace it,
// and a paragraph that's only a placeholder is left out.
export const about = [
  "hi, i'm anmol. i've been posting about money on here since 2021, sharing my real numbers: net worth updates, what i'm investing in, and yes, the slow years too.",
  '[ADD: why you started moneymolz, in your own words]',
  "i'm based in brooklyn and work in tech. [ADD: something you love outside of money]",
];

// about photos: put files in /public, then set src like '/trip.jpg'. empty src = hidden.
// with no photos, the about section switches to a text-only layout.
export const photos = [
  { src: '', alt: 'you doing something you love' },
  { src: '', alt: 'a trip or a favorite place' },
  { src: '', alt: 'wide shot, friends or your setup', wide: true },
];

// "start here" stays hidden until you add at least one path.
// example: { prompt: "i just got my first 401k", label: 'watch my 401k basics reel', href: 'https://...' },
export const startHere: { prompt: string; label: string; href: string }[] = [];

// the money map: where every paycheck goes. names + one-line whys, no balances, no account numbers.
// slide 2 of the moneymap post, as a living section. update names/whys here; the page redraws.
export const moneyMap = {
  updated: 'september 2026',
  start: { name: 'paycheck', why: 'lands every 15th and end of month' },
  firstLabel: 'first',
  first: [
    { name: '401k (fidelity)', why: 'retirement first. maxing it out' },
    { name: 'hsa', why: 'maxed' },
  ],
  hub: { name: 'robinhood checking', why: 'the hub. bills and rent flow out of here' },
  hubLabel: 'from the hub',
  branches: [
    { name: 'robinhood savings', why: 'travel + gift buckets' },
    { name: 'fidelity brokerage', why: 'emergency fund + wedding bucket, in SGOV' },
  ],
  cardsLabel: 'credit cards',
  cardsNote: 'all on autopay, paid off manually every payday',
  cards: [
    'chase sapphire preferred',
    'chase freedom unlimited',
    'united explorer card',
    'world of hyatt credit card',
    'bilt blue',
    'u.s. bank altitude connect',
    'robinhood credit card',
  ],
  investingLabel: 'investing',
  investing: [
    { name: 'robinhood traditional ira', why: '' },
    { name: 'robinhood roth ira', why: '' },
    { name: 'ny 529', why: '' },
  ],
  cashbackLabel: 'cashback apps',
  cashback: [
    { name: 'rakuten', why: 'cash back on stuff i\u2019d buy anyway' },
    { name: 'fetch', why: 'points for snapping receipts' },
  ],
};
// ======================
