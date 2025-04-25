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
        back: '#1C1C1E',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
