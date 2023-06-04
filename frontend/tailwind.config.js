/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#FFBD17'
      },
      fontFamily: {
        pt: ['PT Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        slab: ['Roboto Slab', 'sans-serif']
      }
    }
  },
  plugins: []
}
