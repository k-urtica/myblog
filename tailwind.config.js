module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'FlopDesignFONT',
        '-apple-system',
        'BlinkMacSystemFont',
        'Roboto',
        'Yu Gothic Medium',
        '游ゴシック Medium',
        'メイリオ',
        'Segoe UI',
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
