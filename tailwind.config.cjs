/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ...
        'white-blue-cabri': {
          light: '#49A5AE',
          DEFAULT: '#49A5AE',
          dark: '#49A5AE',
        },
        'blue-cabri': {
          light: '#41729C',
          DEFAULT: '#41729C',
          dark: 'rgb(53,91,126)',
        },
        'red-cabri': {
          light: '#FF696B',
          DEFAULT: '#FF696B',
          dark: '#FF696B',
        },
        // ...
      },
      fontFamily: {
        'sans-serif': ['\'Montserrat\''],
      },
    },
  },
  plugins: [],
}
