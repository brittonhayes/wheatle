/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wheat: {
          500: '#B8860B',
          600: '#9A7209',
          700: '#7C5E07'
        }
      },
      fontFamily: {
        display: ['Roboto Slab', 'serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
