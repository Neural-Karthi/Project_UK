/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      screens: {
        'max-xl': { 'max': '1279px' },      
        'laptop':'960px'         
      },
    },
    
  },
  plugins: [],
}