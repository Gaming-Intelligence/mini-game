/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#001f3f', // You can replace this with your desired navy blue hex code
      },
    },
  },
  plugins: [],
}

