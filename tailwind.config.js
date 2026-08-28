/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oyishi: {
          bg: '#120E0C',
          bgSec: '#181310',
          card: '#1E1714',
          cardHover: '#261E1A',
          gold: '#D8B36A',
          goldAlt: '#C5A059',
          coral: '#E85D4E',
          coralHover: '#D44C3D',
          wasabi: '#7CB342',
          text: '#F7F2EC',
          textSec: '#B0A69D',
          border: '#2E241F',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', '"Cinzel"', '"Noto Serif JP"', 'serif'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Inter Mono"', '"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'radial-dark': 'radial-gradient(circle, transparent 0%, rgba(18,14,12,0.85) 100%)',
        'photo-pedestal': 'radial-gradient(ellipse at center, #251D18 0%, #1A1410 60%, #120E0C 100%)',
      }
    },
  },
  plugins: [],
}
