/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        transparrentBlack:"rgba(0,0,0,0.85)",
        sunsetOrange:"#FF4F5A",
        tangroa:"#1A2E35",
        Gainsboro:"#E1E1E1",
        greenteal:"#22C55E",
        Gray:"#687498"
      },
      fontFamily: {
        'Poppins':['Poppins', 'sans-serif'],
      },
    },
    screens:{
      xs:"480px",
      sm:"768px",
      md:"1060px",
    },
  },
  plugins: [],
}