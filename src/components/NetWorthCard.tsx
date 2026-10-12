import { ArrowDownRight, ArrowUpRight, Target } from 'lucide-react';
import { useCountUp, useInView } from './hooks';
import { short, usd } from '../lib/format';

type Props = {
  netWorth: number;
  goal: number;
  goalLabel: string; // e.g. '300k by 30'
  monthDelta: number | null; // change this month, in dollars. null hides the chip
  milestones: number[]; // e.g. [100000, 200000, 300000]
  series: number[]; // last 12 month-end values for the sparkline
  asOf: string | null; // e.g. 'oct 11'
};

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
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="overflow-visible">
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-mute" />
      <circle cx={last[0]} cy={last[1]} r="2.5" className="fill-molz" />
    </svg>
  );
}

export function NetWorthCard({ netWorth, goal, goalLabel, monthDelta, milestones, series, asOf }: Props) {
  const { ref, seen } = useInView<HTMLElement>();
  const shown = useCountUp(netWorth, seen);
  const pct = Math.min(netWorth / goal, 1) * 100;
  const remaining = Math.max(goal - netWorth, 0);
  const monthsLeft = monthDelta && monthDelta > 0 ? Math.ceil(remaining / monthDelta) : null;
  const up = (monthDelta ?? 0) >= 0;
  const next = milestones.find((m) => netWorth < m);
  // keep the "you are here" note inside the card at either end of the rail
  const herePos = Math.min(Math.max(pct, 14), 86);

  return (
    <section
      ref={ref}
      aria-label="net worth tracker"
      className="rounded-2xl border border-line bg-card p-6 shadow-[0_1px_2px_rgba(28,25,23,.04)] transition duration-150 hover:-translate-y-0.5 hover:border-ink-mute motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8"
    >
      <p className="eyebrow m-0">net worth</p>

      <p className="m-0 mt-2 font-display text-5xl leading-[1.05] tracking-[-0.02em] tabular-nums text-ink sm:text-7xl">
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
      <div className="mt-8">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
            <Target className="h-4 w-4 text-molz" aria-hidden="true" /> {goalLabel}
          </span>
          <span className="tabular-nums text-ink-soft">{Math.round(pct)}%</span>
        </div>

        <div className="relative h-8" aria-hidden="true">
          <span
            className="absolute bottom-0.5 flex -translate-x-full items-end gap-0.5 whitespace-nowrap font-display text-lg italic leading-none text-molz"
            style={{ left: `${herePos}%` }}
          >
            you are here
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" className="translate-y-1">
              <path d="M2 3c8 0 14 3 16 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14.5 11.5 18 14.5l2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

      <p className="m-0 mt-6 border-t border-line pt-4 text-xs text-ink-soft">
        self-reported, not audited.{asOf && ` last synced ${asOf}.`}
      </p>
    </section>
  );
}
