/** @type {import('tailwindcss').Config} */
export default {
  // 1. IMPORTANTE: Habilita o modo manual via classe
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'erp-green': {
          light: '#E8F5E9',
          DEFAULT: '#2E7D32',
          dark: '#1B5E20', // Verde mais escuro para o modo noturno
        },
        'erp-gray': {
          header: '#F5F5F5',
          border: '#D4D4D4',
          darkHeader: '#27272a', // Cinza escuro para cabeçalhos no dark mode
          darkBorder: '#3f3f46', // Borda escura
        }
      }
    },
  },
  plugins: [],
}