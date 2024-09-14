/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'false',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundColor: {
        'body': '#ffffff',
      },

      textColor: {
        'body': '#000000',
      },
      
      colors: {
        navy: '#001f3f', // You can replace this with your desired navy blue hex code
        light_blue: '#9DD9F3',
        ivory:'#FFFFF0',
        yellow:'#FFD300',
        metal:'#A9ACB6',
        silver:'#c2c2c2',
        orange:'#ffa701',
        mud: '#e3f542',
        glow_orange: '#f27128',
      },
    },
  },
  plugins: [],
}

