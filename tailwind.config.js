const colors = require("tailwindcss/colors");

// const whitelist =
//   [].reduce <
//   Array <
//   any >>
//     (p, c, i, array)[
//       //gray-800 red-700 red-400 green-500 gray-700
//       ("purple", "red", "blue", "black")
//     ].reduce(
//       (result, color) =>
//         result.push(`text-${color}-500`, `bg-${color}-500`) && result
//     );
const whites = () => {
  const list = ["hover:bg-opacity-600"];

  ["purple", "blue"].map((c) => list.push(...[`bg-${c}-600`]));
  const colors1 = ["indigo", "red", "yellow", "green"];
  colors1.map((c) => list.push(...[`bg-${c}-100`, `bg-${c}-400`]));
  const colors2 = ["red", "green", "black", "gray", "yellow", "blue", "purple"];
  colors2.map((c) => list.push(...[`text-${c}-700`, `bg-${c}-100`]));
  return list.filter((w, i) => list.indexOf(w) == i);
};
module.exports = {
  purge: {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    // whitelist,
    safeList: whites(),
  },
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
