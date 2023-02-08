/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "100px",
      md: "650px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
