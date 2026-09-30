/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raw: '#f7f4ee',
        paper: '#f7f4ee',
        sand: '#ebe5db',
        ink: '#1a1715',
        espresso: '#201915',
        terracotta: {
          DEFAULT: '#c44d2d',
          light: '#d96443',
          dark: '#99371d',
        },
        ochre: '#d99b26',
        charcoal: '#27272a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cinzel"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        'display-massive': ['clamp(3rem, 11vw, 10.5rem)', { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'display-hero': ['clamp(2.5rem, 8vw, 7.5rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'headline': ['clamp(1.75rem, 4.5vw, 4rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'editorial-sub': ['clamp(1rem, 2vw, 1.75rem)', { lineHeight: '1.2' }],
      },
      animation: {
        'float-slow': 'floatSlow 14s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '33%': { transform: 'translate(12px, -20px) rotate(3deg)' },
          '66%': { transform: 'translate(-10px, 15px) rotate(-2deg)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
}
