/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./public/**/*.{html,js}",  // pega tudo dentro da pasta public
      "./src/**/*.{html,js}",     // pega arquivos da pasta src
      "./*.{html,js}"             // pega arquivos soltos na raiz
    ],
    theme: {
      extend: {
        fontFamily: {
          inter: ['Inter', 'sans-serif'],
        },
        colors: {
          primary: {
            50: '#f0f9ff',
            500: '#667eea',
            600: '#5a67d8',
            700: '#4c51bf',
          },
          secondary: {
            500: '#764ba2',
            600: '#6b46c1',
          },
          accent: {
            500: '#ff6b6b',
            600: '#ee5a24',
          },
          success: {
            500: '#4ade80',
            600: '#22c55e',
          },
        },
      },
    },
    plugins: [],
  }
  