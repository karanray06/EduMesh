/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Dark Cosmos Backgrounds ────────────────────── */
        'bg-primary':    '#05050E',
        'bg-surface':    '#0C0C1E',
        'bg-elevated':   '#111128',

        /* ── Glass System ──────────────────────────────── */
        'glass-fill':    'rgba(255,255,255,0.025)',
        'glass-border':  'rgba(255,255,255,0.07)',
        'glass-hover':   'rgba(255,255,255,0.04)',

        /* ── Brand Colors ──────────────────────────────── */
        'indigo':        '#4F46E5',
        'indigo-light':  '#818CF8',
        'violet':        '#7C3AED',
        'cyan':          '#06B6D4',
        'cyan-light':    '#67E8F9',
        'amber':         '#F59E0B',
        'green':         '#4ADE80',
        'pink':          '#F472B6',

        /* ── Text ──────────────────────────────────────── */
        'text-primary':   '#FFFFFF',
        'text-secondary': '#94A3B8',
        'text-muted':     '#64748B',
        'text-accent':    '#A5B4FC',

        /* ── Legacy (for gradual migration) ────────────── */
        'navy':          '#05050E',
        'alabaster':     '#FFFFFF',
        'steel':         '#94A3B8',

        /* ── Slate override for existing components ────── */
        slate: {
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          800: '#e2e8f0',
        },
      },

      backgroundImage: {
        /* ── Gradients ─────────────────────────────────── */
        'grad-hero':    'linear-gradient(135deg, #818cf8 0%, #06B6D4 100%)',
        'grad-feature': 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        'grad-jee':     'linear-gradient(135deg, #818cf8, #a78bfa)',
        'grad-neet':    'linear-gradient(135deg, #34d399, #06B6D4)',
        'grad-degree':  'linear-gradient(135deg, #f472b6, #a78bfa)',
        'grad-school':  'linear-gradient(135deg, #fbbf24, #f97316)',
      },

      boxShadow: {
        'glass':       '0 8px 32px rgba(0,0,0,0.3)',
        'glass-hover': '0 20px 60px rgba(0,0,0,0.4)',
        'glow-indigo': '0 12px 40px rgba(79,70,229,0.4)',
        'glow-cyan':   '0 12px 40px rgba(6,182,212,0.3)',
        'glow-violet': '0 12px 40px rgba(124,58,237,0.3)',
        /* Legacy */
        'pastel':      '0 8px 32px rgba(79,70,229,0.15)',
        'pastel-hover':'0 12px 40px rgba(6,182,212,0.25)',
        'card':        '0 4px 20px rgba(0,0,0,0.2)',
      },

      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        body:    ['"Plus Jakarta Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        /* Legacy aliases */
        logo:    ['"Outfit"', 'sans-serif'],
        brand:   ['"Outfit"', 'sans-serif'],
      },

      borderRadius: {
        card: '20px',
        pill: '999px',
      },

      animation: {
        'fade-in':       'fadeIn 0.5s ease-out',
        'fade-in-up':    'fadeUp 0.8s ease-out both',
        'slide-up':      'slideUp 0.4s ease-out',
        'glow':          'glowPulse 2s ease-in-out infinite',
        'orb-float':     'orbFloat 8s ease-in-out infinite',
        'ticker':        'ticker 25s linear infinite',
        'pulse-soft':    'pulseSoft 2s ease-in-out infinite',
        'spin-slow':     'spin 4s linear infinite',
        'grad-shift':    'gradShift 6s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(32px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 24px rgba(79,70,229,0.3)' },
          '50%':      { boxShadow: '0 0 32px rgba(6,182,212,0.5)' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%':      { transform: 'translateY(-28px) scale(1.05)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        gradShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
