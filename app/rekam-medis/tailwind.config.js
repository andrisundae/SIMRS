module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Lato', 'Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'],
    },
    extend: {
      outline: {
        blue: '2px solid rgba(147, 197, 253)',
      },
      inset: {
        submenu: '-26.9rem',
      },
      padding: {
        '1.2': '0.3rem',
      },
    },
  },
  important: true,
  variants: {
    extend: {
      borderColor: ['before', 'after'],
      borderWidth: ['after'],
      width: ['before', 'after'],
      height: ['before', 'after'],
      inset: ['after'],
      margin: ['first'],
    },
  },
  plugins: [require('tailwindcss-pseudo-elements')],
};
