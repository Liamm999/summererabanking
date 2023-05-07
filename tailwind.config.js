/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx,scss}"],
  theme: {
    screens: {
      sm: "400px",
      sm1: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        white: "#ffffff",
        purple: {
          100: "#443C68",
          200: "#18122B",
          300: "#635985",
          login: "#5E5389",
          savings: "#B39EF4",
        },
        pink: {
          trash: "#ffc0c0",
        },
        blue: {
          edit: "#EAF3FB",
        },
        yellow: {
          btn: "#FFA319",
          loans: "#FAF7A6",
        },
        red: {
          cancle: "#D01E43",
        },
      },
    },
  },
  plugins: [],
}
