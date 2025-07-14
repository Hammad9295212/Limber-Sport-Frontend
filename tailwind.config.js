/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      padding: {
        '12px': '12px',
      },
      color: {
        's-light-blue': '#97D8E1',
        's-blue': '#344767',
        's-light-grey': '#344767',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

