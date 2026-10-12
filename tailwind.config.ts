import type { Config } from 'tailwindcss';

// token colors live in src/styles/global.css as rgb triplets, so opacity modifiers work (bg-gain/10).
const c = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{astro,ts,tsx}'],
  // the pages still carry hand-written css; tailwind's reset would fight it.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        paper: c('paper'), card: c('card'), sand: c('sand'), line: c('line'),
        ink: { DEFAULT: c('ink'), soft: c('ink-soft'), mute: c('ink-mute') },
        molz: { DEFAULT: c('molz'), tint: c('molz-tint'), solid: '#B94A33' },
        teal: { DEFAULT: c('teal'), tint: c('teal-tint'), solid: '#1F6B65' },
        gain: c('gain'), loss: c('loss'), hold: c('hold'), sky: c('sky'),
      },
      fontFamily: {
        display: ['var(--font-instrument)', 'serif'],
        serif: ['var(--font-young)', 'serif'],
        sans: ['var(--font-figtree)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1120px' },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
        'pulse-once': { '0%': { boxShadow: '0 0 0 0 rgb(var(--molz) / .45)' }, '100%': { boxShadow: '0 0 0 10px rgb(var(--molz) / 0)' } },
      },
      animation: {
        'fade-up': 'fade-up 450ms cubic-bezier(.22,1,.36,1) both',
        'pulse-once': 'pulse-once 1.2s ease-out 1.1s 2',
      },
      transitionTimingFunction: { out: 'cubic-bezier(.22,1,.36,1)' },
    },
  },
  plugins: [],
} satisfies Config;
