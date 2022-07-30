/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      body: [
        'ZenMaruGothic Regular',
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
  daisyui: {
    styled: true,

    darkTheme: 'dark',
    themes: [
      {
        dark: {
          'base-100': '#111827',
        },
      },
    ],
  },
};
