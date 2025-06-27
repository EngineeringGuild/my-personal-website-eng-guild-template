const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBlue: colors.sky,
        blue: colors.blue,
        gray: colors.gray,
        blueGray: colors.slate,
        white: colors.white,
        pink: colors.pink,
      },
    },
  },
  plugins: [],
}
