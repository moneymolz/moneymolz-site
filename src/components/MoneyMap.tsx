import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  BadgePercent, ChevronDown, Circle, CreditCard, Landmark, List, Network, PiggyBank, Plane,
  ShieldCheck, TrendingUp, Wallet, X, type LucideIcon,
} from 'lucide-react';
import { useInView } from './hooks';
import type { MapStage } from '../data/site';

type Edge = { from: string; to: string; loop?: boolean };
type Props = { stages: MapStage[]; edges: Edge[] };

// icons and chip tones live here so the data file stays plain text
const LOOK: Record<string, { icon: LucideIcon; tone: string }> = {
  paycheck: { icon: Wallet, tone: 'bg-molz-tint text-molz' },
  deductions: { icon: PiggyBank, tone: 'bg-sky/15 text-sky' },
  hub: { icon: Landmark, tone: 'bg-white/20 text-white' },
  savings: { icon: Plane, tone: 'bg-gain/10 text-gain' },
  brokerage: { icon: ShieldCheck, tone: 'bg-hold/15 text-hold' },
  investing: { icon: TrendingUp, tone: 'bg-sky/15 text-sky' },
  cards: { icon: CreditCard, tone: 'bg-sand text-ink' },
  cashback: { icon: BadgePercent, tone: 'bg-gain/10 text-gain' },
};
const look = (id: string) => LOOK[id] ?? { icon: Circle, tone: 'bg-sand text-ink' };
const listTone = (id: string) => (id === 'hub' ? 'bg-molz-tint text-molz' : look(id).tone);

const HASH = '#money-map';
const COL_X = [12, 37, 62, 86]; // % across the node map

/** spread each column's stops evenly top to bottom */
function layout(stages: MapStage[]) {
  const pos: Record<string, { x: number; y: number }> = {};
  for (const col of [0, 1, 2, 3] as const) {
    const inCol = stages.filter((s) => s.col === col);
    inCol.forEach((s, i) => {
      // a lone stop in column 1 (deductions) sits high so the paycheck → hub line runs under it
      const y = inCol.length === 1 ? (col === 1 ? 20 : 50) : 10 + (80 / (inCol.length - 1)) * i;
      pos[s.id] = { x: COL_X[col], y };
    });
  }
  return pos;
}

function Detail({ stage, onClose }: { stage: MapStage; onClose: () => void }) {
  return (
    <div key={stage.id} className="animate-fade-up motion-reduce:animate-none">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow m-0">{stage.eyebrow}</p>
          <h3 id="mm-detail-title" className="m-0 mt-1 font-serif text-[28px] font-normal leading-[34px] text-ink">{stage.title}</h3>
          <p className="m-0 mt-1 text-sm text-ink-soft">{stage.headline}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={`close ${stage.title}`}
          className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-card text-ink-soft transition hover:border-ink-mute hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-molz motion-reduce:transition-none"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {stage.note && <p className="m-0 mt-4 text-sm leading-6 text-ink-soft">{stage.note}</p>}
      <dl className="m-0 mt-4 grid gap-2 md:grid-cols-2">
        {stage.details.map((d) => (
          <div key={d.label} className="flex items-baseline justify-between gap-3 rounded-xl bg-sand px-4 py-3">
            <dt className="text-sm text-ink-soft">{d.label}</dt>
            <dd className="m-0 shrink-0 text-right text-sm font-semibold text-ink">{d.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function MoneyMap({ stages, edges }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [mode, setMode] = useState<'map' | 'list' | null>(null); // null = map on md+, list below
  const [lit, setLit] = useState<string | null>(null); // hovered or focused stop on the map
  const rootRef = useRef<HTMLDivElement>(null);
  const userActed = useRef(false);
  const { ref: mapRef, seen } = useInView<HTMLDivElement>(0.25);
  const [box, setBox] = useState({ w: 0, h: 0 }); // node map size in px, so lines aren't stretched
  const [wide, setWide] = useState(false); // md+ screens show the node map by default
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setWide(mq.matches);
    const raf = requestAnimationFrame(sync);
    mq.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    const el = mapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [mapRef]);

  const byId = Object.fromEntries(stages.map((s) => [s.id, s]));
  const pos = layout(stages);
  const openStage = open ? byId[open] : null;

  const choose = useCallback((id: string | null) => {
    userActed.current = true;
    setOpen((cur) => (cur === id ? null : id));
  }, []);

  // deep links: #money-map/brokerage opens that stop (on load and on in-page links)
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#money-map\/(.+)$/);
      if (m && byIdHas(m[1])) {
        setOpen(m[1]);
        rootRef.current?.closest('section')?.scrollIntoView({ block: 'start' });
      }
    };
    const byIdHas = (id: string) => stages.some((s) => s.id === id);
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [stages]);

  // on the node map, an open stop shows as a pop-up; the list opens stops in place instead
  const mapShown = mode === 'map' || (mode === null && wide);
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && mapShown) {
      if (!d.open) d.showModal();
    } else if (d.open) {
      d.close();
    }
  }, [open, mapShown]);

  // keep the url in sync once the visitor opens or closes something
  useEffect(() => {
    if (!userActed.current) return;
    const next = open ? `${HASH}/${open}` : HASH;
    if (window.location.hash !== next) history.replaceState(null, '', next);
  }, [open]);

  // arrow keys walk the stops in flow order, escape closes
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      const was = open;
      choose(null);
      Array.from(rootRef.current?.querySelectorAll<HTMLElement>(`[data-stop="${was}"]`) ?? [])
        .find((el) => el.offsetParent !== null)
        ?.focus();
      return;
    }
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    const target = e.target as HTMLElement;
    if (!step || !target.dataset.stop) return;
    const visible = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[data-stop]') ?? []).filter(
      (el) => el.offsetParent !== null,
    );
    const i = visible.indexOf(target);
    if (i < 0) return;
    e.preventDefault();
    visible[(i + step + visible.length) % visible.length].focus();
  };

  const isLitEdge = (ed: Edge) => !lit || ed.from === lit || ed.to === lit;
  const isLitNode = (id: string) =>
    !lit || id === lit || edges.some((ed) => (ed.from === lit && ed.to === id) || (ed.to === lit && ed.from === id));
  const flowsTo = (id: string) =>
    edges.filter((ed) => ed.from === id).map((ed) => byId[ed.to]?.title).filter(Boolean).join(', ');

  const listClass = mode === 'list' ? '' : mode === 'map' ? 'hidden' : 'md:hidden';
  const mapClass = mode === 'list' ? 'hidden' : mode === 'map' ? 'block' : 'hidden md:block';
  const showingMap = mode !== 'list';

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- keyboard handling for the buttons inside
    <div ref={rootRef} onKeyDown={onKeyDown} className="mt-6">
      {/* map / list override, only where the map fits */}
      <div className="mb-4 hidden items-center justify-between gap-4 md:flex">
        <p className="m-0 text-sm text-ink-soft">{mode !== 'list' ? "pick a stop to see what's inside." : ''}</p>
        <div role="group" aria-label="money map view" className="inline-flex rounded-full bg-sand p-1">
          {([['map', Network], ['list', List]] as const).map(([m, Icon]) => {
            const active = m === 'map' ? showingMap : !showingMap;
            return (
              <button
                key={m}
                type="button"
                aria-pressed={active}
                onClick={() => setMode(m)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 px-3 py-1.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-molz motion-reduce:transition-none ${
                  active ? 'bg-card text-ink shadow-sm' : 'bg-transparent text-ink-soft hover:text-ink'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* node map */}
      <div className={mapClass}>
        <div className="grid gap-6">
          <div ref={mapRef} className="relative h-[580px] rounded-2xl border border-line bg-card lg:h-[760px]" onMouseLeave={() => setLit(null)}>
            <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${box.w || 100} ${box.h || 100}`} aria-hidden="true">
              {box.w > 0 && edges.map((ed) => {
                const a = pos[ed.from], b = pos[ed.to];
                if (!a || !b) return null;
                const ax = (a.x / 100) * box.w, ay = (a.y / 100) * box.h;
                const bx = (b.x / 100) * box.w, by = (b.y / 100) * box.h;
                const mid = (ax + bx) / 2;
                const d = `M${ax},${ay} C${mid},${ay} ${mid},${by} ${bx},${by}`;
                const hot = lit && isLitEdge(ed);
                return (
                  <path
                    key={`${ed.from}-${ed.to}`}
                    d={d}
                    fill="none"
                    pathLength={ed.loop ? undefined : 1}
                    strokeWidth={hot ? 2.5 : 1.75}
                    strokeDasharray={ed.loop ? '5 6' : '1'}
                    className={`transition-[stroke-dashoffset,opacity,stroke] duration-700 ease-out motion-reduce:transition-none ${
                      hot ? 'stroke-molz' : 'stroke-ink-mute'
                    } ${isLitEdge(ed) ? 'opacity-100' : 'opacity-20'} ${
                      ed.loop ? (seen ? 'opacity-100' : 'opacity-0') : seen ? '[stroke-dashoffset:0]' : '[stroke-dashoffset:1]'
                    } motion-reduce:[stroke-dashoffset:0]`}
                  />
                );
              })}
            </svg>

            {stages.map((s) => {
              const p = pos[s.id];
              const Icon = look(s.id).icon;
              const isHub = s.id === 'hub';
              const isOpen = open === s.id;
              const to = flowsTo(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  data-stop={s.id}
                  aria-expanded={isOpen}
                  aria-controls="mm-detail"
                  onClick={() => choose(s.id)}
                  onMouseEnter={() => setLit(s.id)}
                  onFocus={() => setLit(s.id)}
                  onBlur={() => setLit(null)}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  className={`absolute flex w-[9.5rem] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-start gap-2 rounded-xl border p-2.5 lg:w-[14rem] lg:gap-3 lg:p-3.5 text-left font-sans shadow-[0_1px_2px_rgba(28,25,23,.04)] transition duration-150 hover:-translate-y-[calc(50%+2px)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-molz motion-reduce:transition-none motion-reduce:hover:-translate-y-1/2 ${
                    isHub ? 'border-transparent bg-[#B94A33] text-white' : 'border-line bg-card text-ink'
                  } ${isOpen ? 'ring-2 ring-molz ring-offset-2 ring-offset-card' : ''} ${
                    isLitNode(s.id) ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${look(s.id).tone}`}>
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-[15px] leading-tight lg:text-lg">{s.title}</span>
                    <span className={`mt-0.5 line-clamp-2 block text-xs leading-snug lg:mt-1 lg:text-sm ${isHub ? 'text-white/85' : 'text-ink-soft'}`}>
                      {s.headline}
                    </span>
                    {to && <span className="sr-only">, flows to {to}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* stop details as a pop-up over the map. click outside, press escape, or hit × to close */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- backdrop click; escape is handled natively */}
      <dialog
        ref={dialogRef}
        id="mm-detail"
        aria-labelledby="mm-detail-title"
        onClose={() => {
          userActed.current = true;
          setOpen(null);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-[85vh] w-[min(560px,calc(100vw-32px))] overflow-y-auto rounded-2xl border border-line bg-card p-0 font-sans text-ink-soft shadow-[0_20px_60px_rgba(28,25,23,.18)] backdrop:bg-black/40 backdrop:backdrop-blur-[2px]"
      >
        <div className="p-6 sm:p-8">
          {mapShown && openStage && <Detail stage={openStage} onClose={() => dialogRef.current?.close()} />}
        </div>
      </dialog>

      {/* accordion list */}
      <ol className={`relative m-0 list-none space-y-4 p-0 ${listClass}`}>
        {stages.map((s, i) => {
          const isOpen = open === s.id;
          const Icon = look(s.id).icon;
          return (
            <li key={s.id} className="relative pl-14">
              {i < stages.length - 1 && <span aria-hidden="true" className="absolute -bottom-4 left-5 top-12 w-px bg-line" />}
              <span className={`absolute left-0 top-3 grid h-10 w-10 place-items-center rounded-full ${listTone(s.id)}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              <div className={`rounded-2xl border bg-card transition duration-150 hover:border-ink-mute motion-reduce:transition-none ${s.id === 'hub' ? 'border-molz' : 'border-line'}`}>
                <button
                  type="button"
                  data-stop={s.id}
                  aria-expanded={isOpen}
                  aria-controls={`mm-panel-${s.id}`}
                  onClick={() => choose(s.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border-0 bg-transparent p-5 text-left font-sans focus-visible:outline focus-visible:outline-2 focus-visible:outline-molz"
                >
                  <span>
                    <span className="eyebrow block">{s.eyebrow}</span>
                    <span className="mt-1 block font-serif text-2xl text-ink">{s.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{s.headline}</span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-ink-soft transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  id={`mm-panel-${s.id}`}
                  role="region"
                  aria-label={s.title}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-line px-5 pb-5 pt-4">
                      {s.note && <p className="m-0 text-sm leading-6 text-ink-soft">{s.note}</p>}
                      <dl className="m-0 mt-4 grid gap-2 sm:grid-cols-2">
                        {s.details.map((d) => (
                          <div key={d.label} className="flex items-baseline justify-between gap-3 rounded-xl bg-sand px-4 py-3">
                            <dt className="text-sm text-ink-soft">{d.label}</dt>
                            <dd className="m-0 shrink-0 text-right text-sm font-semibold text-ink">{d.value}</dd>
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
    </div>
  );
}
