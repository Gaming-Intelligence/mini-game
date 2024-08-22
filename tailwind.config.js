/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#001f3f', // You can replace this with your desired navy blue hex code
        light_blue: '#9DD9F3',
      },
    },
  },
  plugins: [],
}

