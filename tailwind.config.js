/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',      // Small phones
        'sm': '640px',      // Large phones
        'md': '768px',      // Tablets
        'lg': '1024px',     // Small laptops
        'xl': '1280px',     // Desktops
        '2xl': '1536px',    // Large screens
      },
      colors: {
        // Powalyze Brand Colors
        gold: {
          50: '#FDFBF7',
          100: '#F9F5E8',
          200: '#F3E9C9',
          300: '#E8D89F',
          400: '#D4AF37',  // Primary Gold
          500: '#BFA76A',  // Secondary Gold
          600: '#A08A4E',
          700: '#7A6938',
          800: '#544926',
          900: '#342D17',
        },
        dark: {
          50: '#2A2A2A',
          100: '#1F1F1F',
          200: '#1A1A1A',
          300: '#161616',
          400: '#111111',  // Primary Dark
          500: '#0D0D0D',
          600: '#0A0A0A',  // Background Dark
          700: '#070707',
          800: '#050505',
          900: '#000000',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      fontSize: {
        'xxs': '0.625rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}
