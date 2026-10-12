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
  // month-end history for the sparkline. left empty on purpose: anything here ships in the
  // page source, even though the sparkline doesn't print the numbers.
  series: [] as number[],
  // when these numbers were last updated, e.g. 'oct 11'. null leaves the date off.
  asOf: 'oct 12' as string | null,
};

// the molz life dashboard. '#' until it ships: the homepage shows it as coming soon.
export const molzLifeHref = '#';
// where the 1:1 session page lives
export const workWithMeHref = '/work-with-me';

// the bento grid under the hero. null values show "not synced yet".
// an href of '#' shows the tile as "coming soon" instead of a dead link.
export const bento = {
  moneyMap: { href: '#money-map' },
  molzLife: {
    href: molzLifeHref,
    // pre-tax savings rate: retirement + hsa contributions as a share of gross pay.
    // doesn't count anything saved from take-home. null hides the ring.
    savingsRate: 28.7 as number | null,
    savingsLabel: 'saved before taxes',
    savingsNote: 'retirement + hsa, as a share of gross pay',
  },
  milestones: { href: '#net-worth' },
  investing: {
    href: '#',
    // biggest holdings first, as % of everything invested. percentages only, no dollar amounts.
    allocation: [
      { label: 'vti', pct: 49 },
      { label: 'sgov', pct: 18 },
      { label: 'vxus', pct: 14 },
    ] as { label: string; pct: number }[],
  },
  travel: {
    href: '#',
    photo: '/anmol.jpg',
    alt: 'Anmol on a balcony in Dubrovnik at sunset',
    latest: 'dubrovnik, july 2026',
    next: null as string | null, // where next, e.g. 'lisbon in march'. null hides the line
  },
  slowYears: {
    href: 'https://www.instagram.com/p/DcXfqy5jX9e/',
    // one line from the latest note, in your words. null shows "not synced yet".
    note: 'early 2026: unemployed for ~3 months. net worth dropped by $8k.' as string | null,
  },
};

export const proof = { since: '2021', press: ['cnbc', 'acorns'] };

export const links: LinkItem[] = [
  { label: 'build your dashboard with me', href: workWithMeHref, badge: 'new' },
  { label: 'latest net worth update', href: '#net-worth', primary: true },
  { label: 'join the newsletter', href: 'https://moneymolz.substack.com/' },
  { label: 'molz life: a peek at my dashboard', href: molzLifeHref },
  { label: '[YOUR LINK]', href: '#' },
];

// what i post about. add an instagram post or highlight link to `href` and that topic
// becomes clickable with an arrow; leave it '' and it shows as plain text.
export const topics: { label: string; href: string }[] = [
  { label: 'net worth updates', href: '' },
  { label: '401k and hsa', href: '' },
  { label: 'index funds', href: '' },
  { label: 'budgeting', href: '' },
  { label: 'solo travel', href: '' },
];

// small round photo next to the hero intro
export const avatar = { src: '/anmol-avatar.jpg', alt: 'Anmol smiling on a balcony in Dubrovnik' };
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
// slide 2 of the moneymap post, as a living section. both the node map (desktop) and the
// list (mobile) read from `stages`, so edit copy here once.
// `col` places a stop in the node map: 0 paycheck, 1 deductions, 2 the hub, 3 destinations.
export type MapStage = {
  id: string;
  eyebrow: string;
  title: string;
  headline: string;
  note?: string;
  details: { label: string; value: string }[];
  col: 0 | 1 | 2 | 3;
};

export const moneyMapUpdated = 'september 2026';

export const stages: MapStage[] = [
  {
    id: 'paycheck', col: 0, eyebrow: 'lands', title: 'paycheck',
    headline: 'lands every 15th and end of month',
    note: 'everything starts here. retirement and hsa come out first, then the rest goes to the hub.',
    details: [{ label: 'lands', value: 'every 15th and end of month' }, { label: 'goes to', value: 'the hub' }],
  },
  {
    id: 'deductions', col: 1, eyebrow: 'first', title: 'deductions',
    headline: 'retirement and hsa',
    note: 'retirement first. maxing it out.',
    details: [{ label: 'retirement', value: 'maxed' }, { label: 'hsa', value: 'maxed' }],
  },
  {
    id: 'hub', col: 2, eyebrow: 'the hub', title: 'robinhood checking',
    headline: 'the hub. bills and rent flow out of here',
    note: 'everything else is funded from this one account.',
    details: [
      { label: 'bills and rent', value: 'flow out of here' },
      { label: 'transfers', value: 'savings, brokerage, investing' },
      { label: 'credit cards', value: 'paid off every payday' },
    ],
  },
  {
    id: 'savings', col: 3, eyebrow: 'set aside', title: 'robinhood savings',
    headline: 'travel + gift buckets',
    details: [{ label: 'travel', value: 'bucket' }, { label: 'gifts', value: 'bucket' }],
  },
  {
    id: 'brokerage', col: 3, eyebrow: 'held', title: 'fidelity brokerage',
    headline: 'emergency fund + wedding bucket, in SGOV',
    note: 'held in SGOV so the cash keeps working while it waits.',
    details: [{ label: 'emergency fund', value: 'SGOV' }, { label: 'wedding bucket', value: 'SGOV' }],
  },
  {
    id: 'investing', col: 3, eyebrow: 'growing', title: 'investing',
    headline: 'retirement and education savings',
    note: 'long-term accounts.',
    details: [{ label: 'retirement', value: 'traditional + roth' }, { label: 'education savings', value: 'long-term' }],
  },
  {
    id: 'cards', col: 3, eyebrow: 'spending', title: 'credit cards',
    headline: 'all on autopay, paid off manually every payday',
    details: [
      { label: 'chase sapphire preferred', value: 'on autopay' },
      { label: 'chase freedom unlimited', value: 'on autopay' },
      { label: 'united explorer card', value: 'on autopay' },
      { label: 'world of hyatt credit card', value: 'on autopay' },
      { label: 'bilt blue', value: 'on autopay' },
      { label: 'u.s. bank altitude connect', value: 'on autopay' },
      { label: 'robinhood credit card', value: 'on autopay' },
    ],
  },
  {
    id: 'cashback', col: 3, eyebrow: 'bonus', title: 'cashback apps',
    headline: 'rakuten + fetch',
    note: 'rewards loop back into the hub.',
    details: [
      { label: 'rakuten', value: 'cash back on stuff i\u2019d buy anyway' },
      { label: 'fetch', value: 'points for snapping receipts' },
    ],
  },
];

// lines on the node map. `loop` draws dashed: money coming back into the hub.
export const mapEdges: { from: string; to: string; loop?: boolean }[] = [
  { from: 'paycheck', to: 'deductions' },
  { from: 'paycheck', to: 'hub' },
  { from: 'hub', to: 'savings' },
  { from: 'hub', to: 'brokerage' },
  { from: 'hub', to: 'investing' },
  { from: 'hub', to: 'cards' },
  { from: 'cashback', to: 'hub', loop: true },
];

// ======================

// stops after the paycheck, for the bento tile ("paycheck in, 7 destinations")
export const mapDestinations = stages.length - 1;
