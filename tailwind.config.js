/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#81d7f7',
        dark: '#0b0b0b',
      },
      animation: {
        rotation: 'shaking 0.6s linear',
      },
      keyframes: {
        shaking: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(8deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-8deg)' },
          '75%': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
};
