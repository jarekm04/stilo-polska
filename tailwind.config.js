/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

const capitalizeFirst = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.capitalize-first:first-letter': {
      textTransform: 'uppercase',
    },
  };
  addUtilities(newUtilities, ['responsive', 'hover']);
});

module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      display: ['"Playfair Display"', 'Georgia', 'serif'],
    },
    extend: {
      maxWidth: {
        shell: '1320px',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(27, 24, 21, 0.06), 0 12px 32px -12px rgba(27, 24, 21, 0.12)',
        lift: '0 8px 24px -8px rgba(27, 24, 21, 0.16), 0 32px 64px -24px rgba(27, 24, 21, 0.22)',
        brand: '0 10px 30px -10px rgba(236, 129, 23, 0.55)',
        inset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          soft: 'rgb(var(--ink-soft) / <alpha-value>)',
        },
        sand: 'rgb(var(--sand) / <alpha-value>)',
        cream: 'rgb(var(--cream) / <alpha-value>)',
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          dark: 'rgb(var(--brand-dark) / <alpha-value>)',
          light: 'rgb(var(--brand-light) / <alpha-value>)',
          soft: 'rgb(var(--brand-soft) / <alpha-value>)',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        custom: {
          primary: 'var(--custom-primary)',
          secondary: 'var(--custom-secondary)',
          tertiary: 'var(--custom-tertiary)',
          fourth: 'var(--custom-fourth)',
          fifth: 'var(--custom-fifth)',
          sixth: 'var(--custom-sixth)',
          seventh: 'var(--custom-seventh)',
          eigth: 'var(--custom-eigth)',
          ninth: 'var(--custom-ninth)',
          tenth: 'var(--custom-tenth)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'custom-appear': {
          from: {
            opacity: '0.7',
          },
          to: {
            opacity: '1',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        moveChevronsDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(30px)', opacity: '0' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1.14)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        drawLine: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'custom-appear': 'custom-appear .8s',
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in-out forwards',
        slideIn: 'slideIn 0.3s ease-in-out',
        slideOut: 'slideOut 0.5s ease-in-out',
        moveChevronsDown: 'moveChevronsDown 1.5s ease-out infinite',
        kenBurns: 'kenBurns 12s ease-out forwards',
        fadeUp: 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 1.8s infinite',
        drawLine: 'drawLine 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), capitalizeFirst],
};
