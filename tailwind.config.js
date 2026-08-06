/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        secondary: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#456D38',
          dark: '#26472B',
          light: '#DDE8D7',
        },
        brand: {
          primary: '#456D38',
          dark: '#26472B',
          light: '#DDE8D7',
        },
        accent: '#D4A017',
        background: '#FAFAF8',
        surface: '#FFFFFF',
        text: '#18181B',
        gray: '#71717A',
        border: '#E5E7EB',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#DC2626',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        card: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        dialog: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
