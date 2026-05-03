/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#E8613A',
          light: '#F0825F',
          dark: '#C94D28',
        },
        cream: {
          DEFAULT: '#FDF6EE',
          dark: '#F5E8D8',
        },
        dark: {
          DEFAULT: '#1C1410',
          light: '#3D2B1F',
          muted: '#6B5548',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
