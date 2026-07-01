/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFD700', // Brighter Yellow
          DEFAULT: '#F59E0B', // Amber
          dark: '#EC4899', // Pink
        },
        secondary: {
          light: '#3B82F6', // Brighter Blue
          DEFAULT: '#8B5CF6', // Violet
          dark: '#6D28D9', // Deep Purple
        },
        dark: '#000000',
        light: '#FFFFFF',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(14, 165, 233, 0.16)',
        warm: '0 18px 50px rgba(245, 158, 11, 0.16)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
