/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      body: [
        'ZenMaruGothic Medium',
        '-apple-system',
        'BlinkMacSystemFont',
        'Helvetica',
        'Arial',
        'メイリオ',
        'Meiryo',
        'sans-serif',
      ],
    },
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
};
