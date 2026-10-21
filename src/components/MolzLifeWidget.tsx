import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Eye, EyeOff, Gift, Home, Plane, Sparkles, Target, Wallet, type LucideIcon,
} from 'lucide-react';
import { prefersReducedMotion, useInView } from './hooks';
import { Sparkline } from './Sparkline';
import { usd } from '../lib/format';

const TABS = [
  { id: 'cash', label: 'cash flow' },
  { id: 'alloc', label: 'allocation' },
  { id: 'goals', label: 'goals' },
  { id: 'life', label: 'life buckets' },
] as const;
type TabId = (typeof TABS)[number]['id'];
type AllocKey = 'retirement' | 'hsa' | 'sgov' | 'brokerage' | 'cash';
type BucketIcon = 'plane' | 'gift' | 'home' | 'sparkles' | 'wallet';

export type MolzPeriod = {
  id: string; // 'monthly' | 'quarterly' | 'ytd'
  label: string;
  income: number;
  spending: number;
  prevRate: number | null; // last period's savings rate, in %
  topSpend: { label: string; value: number }[];
  months: { label: string; income: number; spending: number }[]; // for the flow bars, oldest first
};

export type MolzData = {
  isSample?: boolean; // shows a "sample data" chip
  periods: MolzPeriod[];
  allocation: { key: AllocKey; label: string; value: number; series?: number[] }[];
  goals: { id: string; label: string; current: number; target: number; due?: string; note: string }[];
  buckets: { id: string; label: string; icon?: BucketIcon; balance: number; target: number; topUp?: number; lastSpent?: string }[];
};

// bucket colors from the spec: retirement = sky, cash and sgov = hold, brokerage = molz
const ALLOC_COLOR: Record<AllocKey, string> = {
  retirement: 'bg-sky', hsa: 'bg-sky/50', sgov: 'bg-hold', brokerage: 'bg-molz', cash: 'bg-hold/50',
};
const BUCKET_ICON: Record<BucketIcon, LucideIcon> = { plane: Plane, gift: Gift, home: Home, sparkles: Sparkles, wallet: Wallet };

const pctOf = (n: number, of: number) => (of > 0 ? (n / of) * 100 : 0);
const pct0 = (n: number) => `${n.toFixed(0)}%`;
const card = 'rounded-2xl border border-line bg-card p-5';

function Hidden() {
  return <><span aria-hidden="true">•••</span><span className="sr-only">hidden</span></>;
}

function NotSynced() {
  return <p className="m-0 text-sm italic text-ink-soft">not synced yet</p>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow m-0">{children}</p>;
}

/** a text version of each chart, for screen readers and quick scanners */
function Summary({ children }: { children: ReactNode }) {
  return <p className="m-0 mt-4 text-sm text-ink-soft">{children}</p>;
}

function MetricCard({ label, value, delta, caption }: { label: string; value: ReactNode; delta?: number | null; caption?: string }) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className={card}>
      <Eyebrow>{label}</Eyebrow>
      <p className="m-0 mt-2 text-[32px] font-semibold leading-tight tabular-nums text-ink">{value}</p>
      {(delta != null || caption) && (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          {delta != null && (
            <span className={`inline-flex items-center gap-0.5 font-semibold tabular-nums ${up ? 'text-gain' : 'text-loss'}`}>
              {up ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : <ArrowDownRight className="h-4 w-4" aria-hidden="true" />}
              {up ? '+' : '-'}{Math.abs(delta).toFixed(1)} pts
            </span>
          )}
          {caption && <span className="text-ink-soft">{caption}</span>}
        </div>
      )}
    </div>
  );
}

function ProgressRow({ label, right, pct, color = 'bg-molz', seen }: { label: string; right: ReactNode; pct: number; color?: string; seen: boolean }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-right tabular-nums text-ink-soft">{right}</span>
      </div>
      <div className="h-2 rounded-full bg-sand" aria-hidden="true">
        <div
          className={`h-full rounded-full ${color} transition-[width] duration-[900ms] ease-out motion-reduce:transition-none`}
          style={{ width: seen ? `${Math.min(pct, 100)}%` : '0%' }}
        />
      </div>
    </div>
  );
}

/** income per month as a column: spending at the bottom, what was kept shaded in gain on top */
function FlowBars({ months, hide, seen }: { months: MolzPeriod['months']; hide: boolean; seen: boolean }) {
  const max = Math.max(...months.map((m) => m.income), 1);
  return (
    <div>
      <div className="flex h-40 items-end gap-3" aria-hidden="true">
        {months.map((m) => {
          const kept = Math.max(m.income - m.spending, 0);
          return (
            <div key={m.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div
                className="flex w-full max-w-[44px] flex-col overflow-hidden rounded-lg transition-[height] duration-[900ms] ease-out motion-reduce:transition-none"
                style={{ height: seen ? `${pctOf(m.income, max)}%` : '0%' }}
                title={hide ? undefined : `${m.label}: ${usd(m.income)} in, ${usd(m.spending)} out`}
              >
                <div className="bg-gain/25" style={{ flex: kept }} />
                <div className="bg-ink-mute" style={{ flex: m.spending }} />
              </div>
              <span className="text-xs text-ink-soft">{m.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-ink-soft" aria-hidden="true">
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-ink-mute" />spending</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-gain/25" />kept</span>
      </div>
    </div>
  );
}

export function MolzLifeWidget({ data, ctaHref }: { data: MolzData; ctaHref?: string }) {
  const [tab, setTab] = useState<TabId>('cash');
  const [hide, setHide] = useState(false);
  const [periodId, setPeriodId] = useState(data.periods[0]?.id ?? '');
  const { ref, seen } = useInView<HTMLElement>(0.15);
  const money = (n: number) => (hide ? <Hidden /> : usd(n));

  // the active tab's pill slides under the selection
  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const el = list.querySelector<HTMLElement>('[aria-selected="true"]');
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !el) return;
    // on narrow screens the tab bar scrolls sideways; keep the active tab in view
    if (el.offsetLeft < list.scrollLeft || el.offsetLeft + el.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: el.offsetLeft - 8, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
    const raf = requestAnimationFrame(() => setPill({ left: el.offsetLeft, width: el.offsetWidth }));
    return () => cancelAnimationFrame(raf);
  }, [tab]);

  const period = data.periods.find((p) => p.id === periodId) ?? data.periods[0];
  const saved = period ? period.income - period.spending : 0;
  const rate = period ? pctOf(saved, period.income) : 0;
  const rateDelta = period && period.prevRate != null ? rate - period.prevRate : null;
  const total = data.allocation.reduce((a, x) => a + x.value, 0);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = TABS.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setTab(TABS[next].id);
    document.getElementById(`ml-tab-${TABS[next].id}`)?.focus();
  };

  // cards in a view fade in one after another
  const stagger = (i: number) => ({ animationDelay: `${i * 60}ms` });
  const enter = 'animate-fade-up motion-reduce:animate-none';

  return (
    <section ref={ref} aria-label="molz life dashboard" className="rounded-3xl border border-line bg-paper p-4 font-sans sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {data.isSample && (
            <span className="mb-2 inline-block rounded-full bg-molz-tint px-3 py-1 text-xs font-semibold text-molz">sample data</span>
          )}
          <h2 className="m-0 font-serif text-[40px] font-normal leading-none text-ink">peek at my dashboard</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {data.periods.length > 1 && (
            <div role="group" aria-label="period" className="inline-flex rounded-full bg-sand p-1">
              {data.periods.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={p.id === period?.id}
                  onClick={() => setPeriodId(p.id)}
                  className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-molz motion-reduce:transition-none ${
                    p.id === period?.id ? 'bg-card text-ink shadow-sm' : 'bg-transparent text-ink-soft hover:text-ink'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setHide((h) => !h)}
            aria-pressed={hide}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink-soft transition hover:border-ink-mute focus-visible:outline focus-visible:outline-2 focus-visible:outline-molz motion-reduce:transition-none"
          >
            {hide ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            {hide ? 'showing percentages' : 'showing amounts'}
          </button>
        </div>
      </header>

      <div className="sticky top-0 z-10 -mx-1 mt-5 bg-paper px-1 py-1">
        <div ref={listRef} role="tablist" aria-label="dashboard views" className="relative flex gap-1 overflow-x-auto rounded-full bg-sand p-1">
          {pill && (
            <span
              aria-hidden="true"
              className="absolute inset-y-1 rounded-full bg-card shadow-sm transition-all duration-200 ease-out motion-reduce:transition-none"
              style={{ left: pill.left, width: pill.width }}
            />
          )}
          {TABS.map((t, i) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                id={`ml-tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls={`ml-view-${t.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative cursor-pointer whitespace-nowrap rounded-full bg-transparent px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-molz motion-reduce:transition-none ${
                  active ? 'text-ink' : 'text-ink-soft hover:text-ink'
                } ${active && !pill ? 'bg-card shadow-sm' : ''}`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div key={tab} id={`ml-view-${tab}`} role="tabpanel" aria-labelledby={`ml-tab-${tab}`} tabIndex={0} className="mt-5 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-molz">
        {tab === 'cash' && (
          !period ? <div className={card}><NotSynced /></div> : (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className={enter} style={stagger(0)}><MetricCard label="income" value={money(period.income)} /></div>
                <div className={enter} style={stagger(1)}><MetricCard label="spending" value={money(period.spending)} /></div>
                <div className={enter} style={stagger(2)}>
                  <MetricCard label="savings rate" value={pct0(rate)} delta={rateDelta} caption={rateDelta != null ? 'vs last period' : undefined} />
                </div>
              </div>

              {period.months.length > 0 && (
                <div className={`${card} ${enter}`} style={stagger(3)}>
                  <Eyebrow>in vs out · last {period.months.length} months</Eyebrow>
                  <div className="mt-4"><FlowBars months={period.months} hide={hide} seen={seen} /></div>
                  <Summary>
                    savings rate is {pct0(rate)}
                    {rateDelta != null && `, ${rateDelta >= 0 ? 'up' : 'down'} ${Math.abs(rateDelta).toFixed(1)} points from last period`}.
                  </Summary>
                </div>
              )}

              <div className={`${card} space-y-4 ${enter}`} style={stagger(4)}>
                <Eyebrow>where it went</Eyebrow>
                {period.topSpend.length === 0 ? <NotSynced /> : period.topSpend.slice(0, 5).map((s) => (
                  <ProgressRow
                    key={s.label}
                    label={s.label}
                    right={hide ? pct0(pctOf(s.value, period.spending)) : usd(s.value)}
                    pct={pctOf(s.value, period.spending)}
                    color="bg-ink-mute"
                    seen={seen}
                  />
                ))}
              </div>
            </div>
          )
        )}

        {tab === 'alloc' && (
          data.allocation.length === 0 ? <div className={card}><NotSynced /></div> : (
            <div className="space-y-4">
              <div className={`${card} ${enter}`}>
                <Eyebrow>where the money sits</Eyebrow>
                <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-sand" aria-hidden="true">
                  {data.allocation.map((a) => (
                    <div
                      key={a.key}
                      className={`${ALLOC_COLOR[a.key]} transition-[width] duration-[900ms] ease-out motion-reduce:transition-none`}
                      style={{ width: seen ? `${pctOf(a.value, total)}%` : '0%' }}
                    />
                  ))}
                </div>
                <ul className="m-0 mt-5 grid list-none gap-3 p-0 sm:grid-cols-2">
                  {data.allocation.map((a) => (
                    <li key={a.key} className="flex items-center justify-between gap-3 text-sm">
                      <span className="inline-flex items-center gap-2 text-ink">
                        <span className={`h-2.5 w-2.5 rounded-full ${ALLOC_COLOR[a.key]}`} aria-hidden="true" />
                        {a.label}
                      </span>
                      <span className="tabular-nums text-ink-soft">
                        {pct0(pctOf(a.value, total))}{!hide && <span className="ml-2 text-ink-soft">{usd(a.value)}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
                <Summary>
                  biggest share: {[...data.allocation].sort((x, y) => y.value - x.value)[0].label},{' '}
                  {pct0(pctOf(Math.max(...data.allocation.map((a) => a.value)), total))} of the total.
                </Summary>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {data.allocation.map((a, i) => (
                  <div key={a.key} className={`${card} ${enter}`} style={stagger(i + 1)}>
                    <p className="m-0 inline-flex items-center gap-2 text-sm text-ink">
                      <span className={`h-2.5 w-2.5 rounded-full ${ALLOC_COLOR[a.key]}`} aria-hidden="true" />
                      {a.label}
                    </p>
                    <p className="m-0 mt-2 text-lg font-semibold tabular-nums text-ink">{hide ? pct0(pctOf(a.value, total)) : usd(a.value)}</p>
                    {a.series && <div className="mt-2"><Sparkline data={a.series} /></div>}
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {tab === 'goals' && (
          <div className={`${card} space-y-5 ${enter}`}>
            {data.goals.length === 0 ? <NotSynced /> : data.goals.map((g) => (
              <div key={g.id}>
                <ProgressRow
                  label={g.label}
                  right={hide ? pct0(pctOf(g.current, g.target)) : `${usd(g.current)} of ${usd(g.target)}`}
                  pct={pctOf(g.current, g.target)}
                  seen={seen}
                />
                <p className="m-0 mt-1.5 flex items-center gap-1.5 text-xs text-ink-soft">
                  <Target className="h-3.5 w-3.5" aria-hidden="true" />
                  {g.note}{g.due && ` · by ${g.due}`}
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === 'life' && (
          data.buckets.length === 0 ? <div className={card}><NotSynced /></div> : (
            <div className="grid gap-4 sm:grid-cols-2">
              {data.buckets.map((b, i) => {
                const Icon = BUCKET_ICON[b.icon ?? 'wallet'];
                const funded = pctOf(b.balance, b.target);
                return (
                  <div key={b.id} className={`${card} ${enter}`} style={stagger(i)}>
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-gain/10 text-gain">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="m-0 font-semibold text-ink">{b.label}</p>
                        <p className="m-0 text-sm tabular-nums text-ink-soft">
                          {hide ? `${pct0(funded)} funded` : `${usd(b.balance)} of ${usd(b.target)}`}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <ProgressRow label="funded" right={pct0(funded)} pct={funded} color="bg-gain" seen={seen} />
                    </div>
                    {(b.topUp != null || b.lastSpent) && (
                      <dl className="m-0 mt-4 grid grid-cols-2 gap-2 text-xs">
                        {b.topUp != null && (
                          <div><dt className="text-ink-soft">monthly top-up</dt><dd className="m-0 font-semibold tabular-nums text-ink">{hide ? <Hidden /> : usd(b.topUp)}</dd></div>
                        )}
                        {b.lastSpent && (
                          <div><dt className="text-ink-soft">last spent on</dt><dd className="m-0 font-semibold text-ink">{b.lastSpent}</dd></div>
                        )}
                      </dl>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      {ctaHref && (
        <p className="m-0 mt-5 text-sm text-ink-soft">
          want one like this?{' '}
          <a href={ctaHref} className="inline-flex items-center gap-1 font-semibold text-molz underline-offset-4 hover:underline">
            build it with me <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </p>
      )}
    </section>
  );
}
