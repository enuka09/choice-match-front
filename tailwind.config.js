/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6EC",
        "gray-100": "#DFCCCC",
        "gray-500": "#5E0000",
        "primary-100": "#FFE1E0",
        "primary-300": "#FFA6A3",
        "primary-500": "#FF6B66",
      },
      // backgroundImage: theme => ({
      //   "gradient-yelloered": "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
      //   "mobile-home": "url('./assets/HomePageGraphic.png')",
      // }),
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        // dmsans: ["DM Sans", "sans-serif"],
        // montserrat: ["Montserrat", "sans-serif"],
      },
      // content: {
      //   evolveText: "url('./assetss/EvolveText.png')",
      // },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
