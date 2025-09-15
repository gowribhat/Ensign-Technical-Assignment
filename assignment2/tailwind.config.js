/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7777",
        bg: "#E1C6AB",
        "text-primary": "#000000",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};
