const usdFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/** $274,000 */
export const usd = (n: number) => usdFmt.format(n);

/** 274000 -> "274k", 1250000 -> "1.25m" */
export const short = (n: number) =>
  n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(2)}m` : n >= 1000 ? `${+(n / 1000).toFixed(1)}k` : `${n}`;

/** "$274k" */
export const usdShort = (n: number) => `$${short(n)}`;

// a link with href '' or '#' shows as "coming soon" instead of a dead link.
export const hasUrl = (href?: string | null): href is string => Boolean(href) && href !== '#';

// anything still named like '[PLACEHOLDER]' is left off the page entirely.
export const isPlaceholder = (text: string) => text.trim().startsWith('[');
export const stripPlaceholders = (text = '') => text.replace(/\[[^\]]*\]/g, '').replace(/\s+/g, ' ').trim();
