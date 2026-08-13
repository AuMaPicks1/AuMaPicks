/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#0ea5e9',
      },
    },
  },
  plugins: [],
};
