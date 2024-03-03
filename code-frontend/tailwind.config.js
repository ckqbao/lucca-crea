/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'totem': '1080px'
      }
    },
  },
  plugins: [],
  prefix: 'tw-',
}
