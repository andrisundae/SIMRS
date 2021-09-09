const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  // mode: 'jit',
  theme: {
    fontFamily: {
      sans: ['Lato', 'Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'],
    },
    extend: {
      outline: {
        blue: '2px solid rgba(147, 197, 253)',
      },
      inset: {
        '25.5': '6.375rem',
        '11.5': '2.875rem',
      },
      padding: {
        '1.2': '0.3rem',
      },
      margin: {
        '5px': '0px',
      },
      spacing: {
        '98': '26rem',
        '100': '28rem',
        '102': '30rem',
        '104': '32rem',
        '106': '34rem',
      },
    },
  },
  important: true,
  variants: {
    extend: {
      textColor: ['after'],
      borderColor: ['before', 'after'],
      borderWidth: ['after'],
      width: ['before', 'after'],
      height: ['before', 'after'],
      inset: ['after'],
      margin: ['first'],
    },
  },
  plugins: [
    require('tailwindcss-pseudo-elements'),
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          '.required-flag': {
            content: '"*"',
            color: 'rgba(239, 68, 68, 1)',
          },
        },
        ['after']
      );
    }),
  ],
};
