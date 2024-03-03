/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'button': '0px 3px 6px #00000029',
        'card': '0px 6px 6px #00000029'
      },
      fontFamily: {
        'CocoSharp': ['CocoSharp']
      },
      zIndex: {
        // mobile stepper: 1000.
        fab: 1050,
        // speed dial: 1050.
        appBar: 1100,
        'above-appBar': '1101',
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
      }
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: 'ds-', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
