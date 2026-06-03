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
        sans: ["'Airbnb Cereal VF'", 'Circular', '-apple-system', 'system-ui', 'Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#ff385c',
          active: '#e00b41',
          disabled: '#ffd1da',
        },
        canvas: '#ffffff',
        ink: '#222222',
        body: '#3f3f3f',
        muted: {
          DEFAULT: '#6a6a6a',
          soft: '#929292',
        },
        hairline: {
          DEFAULT: '#dddddd',
          soft: '#ebebeb',
        },
        surface: {
          soft: '#f7f7f7',
          strong: '#f2f2f2',
        },
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.1) 0 4px 8px 0',
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
