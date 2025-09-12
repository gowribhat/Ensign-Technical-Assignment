/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#9D735C", // navbar/buttons
                secondary: "#DCC5B1", // accents/buttons
                accent: "#A7C7A9", // hover highlights
                bg: "#E1C6AB", // page background
                card: "#E0BFA2", // product cards
                danger: "#EF4444", // remove buttons
                "text-primary": "#000000",
                "text-secondary": "#7A7A7A",
            },
            fontFamily: {
                heading: ["Playfair Display", "serif"],
                body: ["Lora", "serif"],
            },
            borderRadius: {
                md: "0.5rem",
                lg: "0.75rem",
            },
        },
    },
    plugins: [],
};
