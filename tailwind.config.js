// import type { Config } from "tailwindcss"; // Use JS syntax

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#E63946',
        'primary-dark': '#d5303c',
        'primary-red': '#E63946',
        'primary-red-dark': '#d5303c',
        'dark-blue': '#1D3557',
        'blue': '#457B9D',
        'light-blue': '#A8DADC',
        'soft-white': '#F1FAEE',
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
        subheading: ["Open Sans", "sans-serif"],
      },
      // screens: { ... },
      // spacing: { ... },
      // backgroundImage: { ... },
      maxWidth: {
        'screen-desktop': '1280px',
      },
    },
  },
  plugins: [],
};
// export default config; // Use module.exports for .js file
module.exports = config; 