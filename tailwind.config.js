/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      variants: {
        lineClamp: ['responsive', 'hover']
      }},
  },
	plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/line-clamp')]
}
