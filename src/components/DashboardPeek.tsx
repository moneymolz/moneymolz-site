import { useState, type ReactNode } from 'react';
import { ArrowRight, CalendarDays, Eye, EyeOff, Lightbulb, Sun, Target, TrendingUp } from 'lucide-react';
import { useInView } from './hooks';
import { usd } from '../lib/format';

// the work-with-me sample: four small cards, one per check-in (today, week, month, goals),
// so a visitor sees the whole range without clicking through tabs.

export type PeekData = {
  isSample?: boolean; // shows a "sample data" chip
  today: {
    bills: { name: string; amount: number; due: string }[]; // next 7 days
  };
  week: {
    cats: { label: string; week: number; typical: number }[];
    daysLeft: number;
  };
  month: {
    label: string; // "october"
    contributions: number; // what you put in
    market: number; // what the market added (can be negative)
    needs: number;
    wants: number;
  };
  goal: {
    label: string;
    current: number;
    target: number;
    due: string; // "dec 2027"
    monthsLeft: number;
    addedPerMonth: number; // avg over the last 3 months, market included
  };
};

const pctOf = (n: number, of: number) => (of > 0 ? (n / of) * 100 : 0);
const pct0 = (n: number) => `${Math.round(n)}%`;

function Hidden() {
  return <><span aria-hidden="true">•••</span><span className="sr-only">hidden</span></>;
}

function Bar({ pct, color, seen, label }: { pct: number; color: string; seen: boolean; label?: string }) {
  return (
    <div className="h-2 rounded-full bg-sand" aria-hidden="true" title={label}>
      <div
        className={`h-full rounded-full ${color} transition-[width] duration-[900ms] ease-out motion-reduce:transition-none`}
        style={{ width: seen ? `${Math.min(pct, 100)}%` : '0%' }}
      />
    </div>
  );
}

function Card({
  tag, when, title, icon, delay, children,
}: { tag: string; when: string; title: string; icon: ReactNode; delay: number; children: ReactNode }) {
  return (
    <article
      className="flex flex-col rounded-2xl border border-line bg-card p-5 animate-fade-up motion-reduce:animate-none"
      style={{ animationDelay: `${delay * 70}ms` }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-ink">
          {icon}{tag}
        </span>
        <span className="text-xs text-ink-soft">{when}</span>
      </div>
      <h3 className="m-0 mt-4 text-base font-semibold text-ink">{title}</h3>
      <div className="mt-3 flex flex-1 flex-col">{children}</div>
    </article>
  );
}

export function DashboardPeek({ data, ctaHref }: { data: PeekData; ctaHref?: string }) {
  const [hide, setHide] = useState(false);
  const { ref, seen } = useInView<HTMLElement>(0.15);
  const money = (n: number) => (hide ? <Hidden /> : usd(n));

  const { today, week, month, goal } = data;

  // week: the category furthest over its typical week becomes today's "worth knowing" note
  const over = week.cats
    .map((c) => ({ ...c, by: c.week - c.typical }))
    .filter((c) => c.by > 0)
    .sort((a, b) => b.by - a.by)[0];
  const weekTotal = week.cats.reduce((a, c) => a + c.week, 0);
  const typicalTotal = week.cats.reduce((a, c) => a + c.typical, 0);
  const scale = Math.max(...week.cats.map((c) => Math.max(c.week, c.typical)), 1);

  // month: what moved net worth
  const moved = month.contributions + month.market;
  const spend = month.needs + month.wants;

  // goals: needed per month vs what's actually been going in
  const left = Math.max(goal.target - goal.current, 0);
  const needed = goal.monthsLeft > 0 ? left / goal.monthsLeft : left;
  const onTrack = goal.addedPerMonth >= needed;
  const landsIn = goal.addedPerMonth > 0 ? Math.ceil(left / goal.addedPerMonth) : null;

  return (
    <section ref={ref} aria-label="molz life dashboard sample" className="rounded-3xl border border-line bg-paper p-4 font-sans sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {data.isSample && (
            <span className="mb-2 inline-block rounded-full bg-molz-tint px-3 py-1 text-xs font-semibold text-molz">sample data</span>
          )}
          <h2 className="m-0 font-serif text-[40px] font-normal leading-none text-ink">peek at my dashboard</h2>
          <p className="m-0 mt-2 text-sm text-ink-soft">one dashboard, four check-ins. each one answers a different question.</p>
        </div>
        <button
          type="button"
          onClick={() => setHide((h) => !h)}
          aria-pressed={hide}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink-soft transition hover:border-ink-mute focus-visible:outline focus-visible:outline-2 focus-visible:outline-molz motion-reduce:transition-none"
        >
          {hide ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          {hide ? 'showing percentages' : 'showing amounts'}
        </button>
      </header>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* today */}
        <Card tag="today" when="every morning" title="what needs me today?" icon={<Sun className="h-3.5 w-3.5" aria-hidden="true" />} delay={0}>
          <p className="eyebrow m-0">due in the next 7 days</p>
          <ul className="m-0 mt-2 list-none divide-y divide-line p-0">
            {today.bills.map((b) => (
              <li key={b.name} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                <span className="text-ink">{b.name}<span className="ml-2 text-ink-soft">{b.due}</span></span>
                <span className="tabular-nums text-ink">{money(b.amount)}</span>
              </li>
            ))}
          </ul>
          {over && (
            <p className="m-0 mt-auto flex gap-2 rounded-xl bg-molz-tint px-3 py-2.5 text-sm text-ink">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-molz" aria-hidden="true" />
              <span>
                <span className="font-semibold">worth knowing:</span> {over.label} is{' '}
                {hide ? `${pct0(pctOf(over.by, over.typical))} over` : <>{usd(over.by)} over</>} a typical week, with {week.daysLeft} days left.
              </span>
            </p>
          )}
        </Card>

        {/* week */}
        <Card tag="week" when="sundays" title="where did this week go?" icon={<CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />} delay={1}>
          <ul className="m-0 list-none space-y-3 p-0">
            {week.cats.map((c) => (
              <li key={c.label}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium text-ink">{c.label}</span>
                  <span className={`tabular-nums ${c.week > c.typical ? 'text-loss' : 'text-ink-soft'}`}>
                    {hide ? `${pct0(pctOf(c.week, c.typical))} of typical` : <>{usd(c.week)} <span className="text-ink-soft">/ {usd(c.typical)}</span></>}
                  </span>
                </div>
                <div className="relative">
                  <Bar pct={pctOf(c.week, scale)} color={c.week > c.typical ? 'bg-loss' : 'bg-ink-mute'} seen={seen} />
                  <span
                    aria-hidden="true"
                    className="absolute -top-0.5 h-3 w-0.5 rounded-full bg-ink"
                    style={{ left: `calc(${pctOf(c.typical, scale)}% - 1px)` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="m-0 mt-auto pt-4 text-xs text-ink-soft">
            the tick is a typical week. {hide ? `${pct0(pctOf(weekTotal, typicalTotal))} of a typical week overall.` : `${usd(weekTotal)} so far vs a typical ${usd(typicalTotal)}.`}
          </p>
        </Card>

        {/* month */}
        <Card tag="month" when="the 1st" title="what moved my net worth?" icon={<TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />} delay={2}>
          <p className="m-0 text-[28px] font-semibold leading-tight tabular-nums text-ink">
            {hide ? <Hidden /> : `${moved >= 0 ? '+' : '−'}${usd(Math.abs(moved))}`}
            <span className="ml-2 text-sm font-normal text-ink-soft">in {month.label}</span>
          </p>
          <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-sand" aria-hidden="true">
            <div className="bg-gain transition-[width] duration-[900ms] ease-out motion-reduce:transition-none" style={{ width: seen ? `${pctOf(month.contributions, Math.abs(month.contributions) + Math.abs(month.market))}%` : '0%' }} />
            <div className="bg-sky transition-[width] duration-[900ms] ease-out motion-reduce:transition-none" style={{ width: seen ? `${pctOf(Math.abs(month.market), Math.abs(month.contributions) + Math.abs(month.market))}%` : '0%' }} />
          </div>
          <dl className="m-0 mt-2 grid grid-cols-2 gap-2 text-sm">
            <div><dt className="inline-flex items-center gap-1.5 text-ink-soft"><span className="h-2.5 w-2.5 rounded-sm bg-gain" aria-hidden="true" />i put in</dt><dd className="m-0 font-semibold tabular-nums text-ink">{money(month.contributions)}</dd></div>
            <div><dt className="inline-flex items-center gap-1.5 text-ink-soft"><span className="h-2.5 w-2.5 rounded-sm bg-sky" aria-hidden="true" />the market</dt><dd className="m-0 font-semibold tabular-nums text-ink">{hide ? <Hidden /> : `${month.market >= 0 ? '+' : '−'}${usd(Math.abs(month.market))}`}</dd></div>
          </dl>
          <div className="mt-auto pt-4">
            <div className="mb-1.5 flex items-baseline justify-between text-sm">
              <span className="font-medium text-ink">needs vs wants</span>
              <span className="tabular-nums text-ink-soft">{pct0(pctOf(month.needs, spend))} / {pct0(pctOf(month.wants, spend))}</span>
            </div>
            <Bar pct={pctOf(month.needs, spend)} color="bg-ink-mute" seen={seen} />
          </div>
        </Card>

        {/* goals */}
        <Card tag="goals" when="anytime" title="am i on track?" icon={<Target className="h-3.5 w-3.5" aria-hidden="true" />} delay={3}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="font-medium text-ink">{goal.label}</span>
            <span className="tabular-nums text-ink-soft">{hide ? pct0(pctOf(goal.current, goal.target)) : `${usd(goal.current)} of ${usd(goal.target)}`}</span>
          </div>
          <Bar pct={pctOf(goal.current, goal.target)} color="bg-molz" seen={seen} />
          <p className="eyebrow m-0 mt-5">what would it take</p>
          <dl className="m-0 mt-2 grid grid-cols-2 gap-2 text-sm">
            <div><dt className="text-ink-soft">needed / month</dt><dd className="m-0 text-lg font-semibold tabular-nums text-ink">{money(needed)}</dd></div>
            <div><dt className="text-ink-soft">actually adding</dt><dd className={`m-0 text-lg font-semibold tabular-nums ${onTrack ? 'text-gain' : 'text-loss'}`}>{money(goal.addedPerMonth)}</dd></div>
          </dl>
          <p className="m-0 mt-auto pt-4 text-xs text-ink-soft">
            {onTrack ? 'on track' : 'behind'} for {goal.due}
            {landsIn != null && `. at this pace it lands in about ${landsIn} months`}. last 3 months, market included.
          </p>
        </Card>
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
