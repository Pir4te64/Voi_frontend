// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#131315',
        secondary: '#FF6073',
        neutral: '#AAAAAA',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
