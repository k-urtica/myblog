module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
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
    extend: {
      colors: {
        alabaster: '#fafafa',
      },
      maxHeight: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
