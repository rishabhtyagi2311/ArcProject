/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 10s linear infinite',
        fadeIn : 'fadeIn 4s forwards',
        slideUp: ' slideUp 2s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(500%)', opacity: '0' }, 
          '100%': {  transform: 'translateY(0%)',opacity: '1' }
        },
      },
    },
  
  },
  plugins: [],
}

