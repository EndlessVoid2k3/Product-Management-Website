/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003756",
        secondary: {
          300: "#23C1F0",
          200: "#98E2F9",
          100: "#D3EBF3"
        },
        accent1: {
          200: "#F0A824",
          100: "#FFD993"
        },
        accent2: {
          200: "#F06624",
          100: "#FFA67C"
        }
      }
    },
  },
  plugins: [],
}