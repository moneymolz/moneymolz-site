/** 80x24 inline trend line: ink-mute stroke, last point in molz. no axes, no labels. */
export function Sparkline({ data, w = 80, h = 24 }: { data: number[]; w?: number; h?: number }) {
  if (data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 2 - ((v - min) / (max - min || 1)) * (h - 4),
  ]);
  const last = pts[pts.length - 1];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="shrink-0 overflow-visible">
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-mute" />
      <circle cx={last[0]} cy={last[1]} r="2.5" className="fill-molz" />
    </svg>
  );
}
