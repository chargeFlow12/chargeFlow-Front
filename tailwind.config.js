/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    backgroundImage:{
      main:"url('./assets/mainImage.jpeg')"
    },
    extend: {},
  },
  plugins: [],
}

