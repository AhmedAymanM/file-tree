/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-color-scheme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(71 26 255)',
      },
      backgroundImage: {
        'background-gradient': 'linear-gradient(to bottom, #1a1a2e, #0e0e2f)',
      },
    },
  },
  plugins: [],
}
