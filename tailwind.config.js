module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: { min: "375px", max: "414px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
