/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#81d7f7',
        dark: '#0b0b0b',
      },
    },
  },
  plugins: [],
};
