const colors = require("tailwindcss/colors");
const gridTemplateRows = {};
const gridTemplateColumns = {};
const heights = {};

[(7, 8, 9, 10, 11, 12, 49)].map(
  (k) => (gridTemplateRows[k] = `repeat(${k},minmax(0,1fr))`)
);
[13, 14, 15, 16, 17, 18].map(
  (k) => (gridTemplateColumns[k] = `repeat(${k},minmax(0,1fr))`)
);
Array(25).map((k, i) => {
  heights[`${i * 5}h`] = `${i * 5}vh`;
});
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
      gridTemplateRows: {
        ...gridTemplateRows,
      },
      gridTemplateColumns: {
        ...gridTemplateColumns,
      },
      width: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
      },
      minHeight: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
        ...heights,
      },
      height: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
        ...heights,
      },
      colors: {
        emerald: colors.emerald,
        primary: "#fed300",
        secondary: "#212223",
        cyan: "#9cdbff",
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
