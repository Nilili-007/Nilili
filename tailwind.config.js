module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "3xl": "1700px",
        sm: "415px",
        xs: { min: "375px", max: "414px" },
      },

      colors: {
        error: "#B3261E",
        like: "#EC6762",
        correct: "#50AA72",
        gray: {
          "00": "#FBFBFB",
          "01": "#F7F8F9",
          "02": "#E9EBED",
          "03": "#CBCDD2",
          "04": "#A0A4A8",
          "05": "#474C51",
          "06": "#262829",
        },
      },
    },

    fontFamily: {
      sans: ["noto-sans-cjk-kr", "sans-serif"],
      eng: ["Montserrat", "sans-serif"],
      hashtags: ["GmarketSansMedium"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
