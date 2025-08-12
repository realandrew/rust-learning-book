/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        'rust-primary': '#ce422b',
        'rust-secondary': '#d2691e',
        'rust-dark': '#b8371f',
        'code-bg': '#2d3748',
        'code-dark': '#1a202c',
      },
      fontFamily: {
        'mono': ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        }
      }
    },
  },
  plugins: [],
}