/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#00BBDB",
        "primary-300": "#0099A6",
        "primary-500": "#0084DB",
        "primary-700": "#00375C",
        "neutral-100": "#f4f3f1",
        "neutral-200": "#fcfcfc",
        "neutral-300": "#677279",
        "neutral-400": "#efeeee",
        "neutral-500": "#F8F9FA",
        "neutral-600": "#F9FAFB",
        "yellow-100": "#FCD53F",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      height: {
        90: "90px",
      },
    },
    screens: {
      "xs-max": { max: "320px" },
      xs: "320px",
      "xxs-max": { max: "424px" },
      sm: "425px",
      "sm-max": { max: "767px" },
      md: "768px",
      "md-max": { max: "1023px" },
      lg: "1024px",
      xl: "1440px",
      "cs-max-1170": { max: "1170px" },
      "cs-1300": "1300px",
    },
  },
  plugins: [],
};
