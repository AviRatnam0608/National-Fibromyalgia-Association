/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AC1E52",
        secondary: "#2B6785",
        text: "#1A202C",
        background: "#F7FAFC",
        border: "#E2E8F0",
        primaryHover: "#B52761",
        primaryBorder: "#920F34",
        primaryDarker: "#400017",
        // add other colors as needed
      },
    },
  },
  plugins: [],
};
