/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('mouse', '@media (hover: hover) { &:hover }');
      addVariant('group-mouse', '@media (hover: hover) { .group:hover & }');
    }),
    require('@tailwindcss/typography'),
  ],

}