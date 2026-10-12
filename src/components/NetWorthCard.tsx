import { ArrowDownRight, ArrowUpRight, Target } from 'lucide-react';
import { useCountUp, useInView } from './hooks';
import { short, signedShort, usd } from '../lib/format';
import { Sparkline } from './Sparkline';

type Props = {
  netWorth: number;
  goal: number;
  goalLabel: string; // e.g. '300k by 30'
  goalDate?: string; // e.g. 'feb 3', shows as "by feb 3"
  monthDelta: number | null; // change this month, in dollars. null hides the chip
  milestones: number[]; // e.g. [100000, 200000, 300000]
  series: number[]; // last 12 month-end values for the sparkline
  climb?: { amount: number; date: string }[]; // milestones crossed, oldest first
  startedOn?: string; // 'yyyy-mm' the climb starts, for the summary line
  className?: string;
};

/** whole years between a 'yyyy-mm' start and now, e.g. "~7 years" */
function yearsSince(start: string) {
  const [y, m] = start.split('-').map(Number);
  const now = new Date();
  const years = Math.round((now.getFullYear() * 12 + now.getMonth() - (y * 12 + m - 1)) / 12);
  return `~${years} year${years === 1 ? '' : 's'}`;
}

export function NetWorthCard({ netWorth, goal, goalLabel, goalDate, monthDelta, milestones, series, climb = [], startedOn, className = '' }: Props) {
  const { ref, seen } = useInView<HTMLElement>();
  const shown = useCountUp(netWorth, seen);
  const pct = Math.min(netWorth / goal, 1) * 100;
  const remaining = Math.max(goal - netWorth, 0);
  const monthsLeft = monthDelta && monthDelta > 0 ? Math.ceil(remaining / monthDelta) : null;
  const up = (monthDelta ?? 0) >= 0;
  const next = milestones.find((m) => netWorth < m);
  // the "i am here" arrow tip sits exactly at the end of the filled bar; near the start of the
  // rail the note flips to the other side of the arrow so it stays inside the card
  const flip = pct < 35;

  return (
    <section
      ref={ref}
      aria-label="net worth tracker"
      className={`flex flex-col rounded-2xl border border-line bg-card p-6 shadow-[0_1px_2px_rgba(28,25,23,.04)] transition duration-150 hover:-translate-y-0.5 hover:border-ink-mute motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 ${className}`}
    >
      <div className={`grid items-center gap-8 ${climb.length ? 'md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-10' : ''}`}>
        <div>
        <p className="eyebrow m-0">net worth</p>

        <p className="m-0 mt-2 font-display text-5xl leading-[1.05] tracking-[-0.02em] tabular-nums text-ink sm:text-6xl">
          <span className="sr-only">{usd(netWorth)}</span>
          {/* without js this shows the real number; with js it hides until the count-up starts */}
          <span aria-hidden="true" data-ready={seen} className="[.js_&[data-ready=false]]:opacity-0">
            {usd(seen ? shown : netWorth)}
          </span>
        </p>

        {(monthDelta !== null || series.length > 1) && (
          <div className="mt-4 flex items-center gap-4">
            {monthDelta !== null && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold tabular-nums ${
                  up ? 'bg-gain/10 text-gain' : 'bg-loss/10 text-loss'
                }`}
              >
                {up ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : <ArrowDownRight className="h-4 w-4" aria-hidden="true" />}
                {up ? '+' : '-'}{usd(Math.abs(monthDelta))} this month
              </span>
            )}
            <Sparkline data={series} />
          </div>
        )}

        {/* goal rail */}
        <div className="mt-8 sm:mt-10">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
              <Target className="h-4 w-4 text-molz" aria-hidden="true" /> {goalLabel}
              {goalDate && <span className="font-normal text-ink-soft">· by {goalDate}</span>}
            </span>
            <span className="tabular-nums text-ink-soft">{Math.round(pct)}%</span>
          </div>

          <div className="relative h-8" aria-hidden="true">
            <span
              className={`absolute bottom-0 flex items-end gap-0.5 whitespace-nowrap font-display text-lg italic leading-none text-molz ${
                flip ? 'flex-row-reverse' : '-translate-x-full'
              }`}
              style={{ left: `${pct}%` }}
            >
              i am here
              {/* arrow tip is the svg's bottom corner, so it lands on the end of the bar */}
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" className={`shrink-0 translate-y-1.5 ${flip ? '-scale-x-100' : ''}`}>
                <path d="M1 4c9 0 16 4 20 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16.5 16 21 19.5l.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={goal}
            aria-valuenow={Math.min(netWorth, goal)}
            aria-valuetext={`${usd(netWorth)} of ${usd(goal)}`}
            aria-label={`progress toward ${goalLabel}`}
            className="relative h-3 rounded-full bg-sand"
          >
            <div
              className="h-full rounded-full bg-molz transition-[width] duration-[900ms] ease-out motion-reduce:transition-none"
              style={{ width: seen ? `${pct}%` : '0%' }}
            />
            {milestones.map((m) => {
              const reached = netWorth >= m;
              return (
                <span
                  key={m}
                  title={usd(m)}
                  className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card transition-colors duration-500 motion-reduce:transition-none ${
                    reached ? 'bg-molz' : 'bg-line'
                  } ${seen && m === next ? 'animate-pulse-once motion-reduce:animate-none' : ''}`}
                  style={{ left: `${Math.min((m / goal) * 100, 100)}%` }}
                />
              );
            })}
          </div>
          <ul className="sr-only">
            {milestones.map((m) => (
              <li key={m}>{short(m)} milestone: {netWorth >= m ? 'reached' : m === next ? 'next' : 'ahead'}</li>
            ))}
          </ul>
          <div className="relative mt-2 h-4 text-xs tabular-nums text-ink-soft" aria-hidden="true">
            <span className="absolute left-0">$0</span>
            {milestones.map((m) => {
              const at = Math.min((m / goal) * 100, 100);
              return (
                <span key={m} className={`absolute ${at > 95 ? '-translate-x-full' : '-translate-x-1/2'}`} style={{ left: `${at}%` }}>
                  {short(m)}
                </span>
              );
            })}
          </div>

          <p className="m-0 mt-4 text-sm text-ink-soft">
            <span className="font-semibold tabular-nums text-ink">{usd(remaining)}</span> to go
            {monthsLeft ? `, about ${monthsLeft} months at this pace.` : '.'}
          </p>
        </div>

        {startedOn && climb.length > 0 && (
          <p className="m-0 mt-5 font-display text-xl italic leading-snug text-ink">
            {signedShort(climb[0].amount)} to {short(netWorth)} in <span className="text-molz">{yearsSince(startedOn)}</span>
          </p>
        )}
        </div>

        {climb.length > 0 && (
          <div>
            <p className="eyebrow m-0">the climb</p>
            <ol aria-label="net worth milestones" className="relative m-0 mt-3 list-none p-0">
              <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-line" />
              {next !== undefined && (
                <li className="relative flex items-center gap-3 py-1.5 text-sm">
                  <span aria-hidden="true" className="relative h-[11px] w-[11px] shrink-0 rounded-full border-2 border-molz bg-card" />
                  <span className="w-12 font-semibold tabular-nums text-ink">{short(next)}</span>
                  <span className="ml-auto text-right text-molz">
                    next{goalDate && next === goal ? ` · by ${goalDate}` : ''}
                  </span>
                </li>
              )}
              {[...climb].reverse().map((c) => (
                <li key={c.amount} className="relative flex items-center gap-3 py-1.5 text-sm">
                  <span aria-hidden="true" className={`relative h-[11px] w-[11px] shrink-0 rounded-full border-2 ${c.amount < 0 ? 'border-ink-mute bg-card' : 'border-molz bg-molz'}`} />
                  <span className="w-12 font-semibold tabular-nums text-ink">{signedShort(c.amount)}</span>
                  <span className="ml-auto text-right tabular-nums text-ink-soft">{c.date}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
