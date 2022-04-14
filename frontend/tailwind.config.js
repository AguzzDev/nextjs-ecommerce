const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        gray: colors.gray,
        red: colors.red,
        yellow: colors.amber,
        green: colors.green,
        blue: colors.blue,
        indigo: colors.indigo,
        purple: colors.purple,
        pink: colors.pink,
        black: colors.black,
        white: colors.white,
        gray1: "#ebebeb",
      },
    },
    fontFamily: {
      "nike": ["Nike", "sans-serif"],
      "PT-Sans":["PT-Sans","sans-serif"]
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
