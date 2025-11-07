/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mindwave-navy': '#0F172A', // Nuestro Deep Navy Blue
        'mindwave-cyan': '#22D3EE', // Nuestro Electric Cyan
        'mindwave-lime': '#A3E635', // Nuestro Neon Lime
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Podemos cambiar 'Inter' luego
      }
    },
  },
  plugins: [],
}