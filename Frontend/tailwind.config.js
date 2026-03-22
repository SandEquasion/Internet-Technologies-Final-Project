/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#F8F5F2',
        primary: '#3E1C00',
        secondary_1: '#EB1555',
        secondary_2: '#F35366',
        secondary_3: '#F02D44',
        secondary_4: '#F6CBD8',
        neutral_1: '#000000',
        neutral_2: '#50504E',
        neutral_3: '#80807F',
        neutral_4: '#CDCDC8'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Bricolage Grotesque', 'serif']
      },
      fontSize: {
        'h1': ['2.375rem', { lineHeight: 'auto', fontWeight: 'bold'}],
        'h2': ['2rem', { lineHeight: 'auto', fontWeight: 'semi-bold' }],
        'h3': ['1.5rem', { lineHeight: 'auto', fontWeight: 'medium' }],
        'h4': ['1.125rem', { lineHeight: 'auto', fontWeight: 'medium' }],
        'b1': ['1rem', { lineHeight: '1.6' }],
        'b2': ['0.875rem', { lineHeight: 'auto' }],
        'b3': ['0.75rem', { lineHeight: 'auto' }],
      }
    },
  },
  plugins: [],
}

