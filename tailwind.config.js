const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      mobile: { max: "425px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      poppins: ["Poppins"],
    },
    extend: {
      colors: {
        a_primary: "",
        a_secondary: "",
        a_accent: "",
        emerald: colors.emerald,
        primary: colors.purple[700],
        secondary: "#212223",
        black: {
          100: "#cdd0d6",
          200: "#9ba2ae",
          300: "#687385",
          400: "#36455d",
          500: "#041634",
          600: "#03122a",
          700: "#020d1f",
          800: "#020915",
          900: "#01040a",
        },
      },
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
        "10xl": "8rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
