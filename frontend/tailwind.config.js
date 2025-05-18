/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        jadeGreen:"#00A86B",
        navajoWhite:"#FFF5EE"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        tinos:["Tinos", "serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "960px",
      lg: "1200px",
      xl: "1400px",
    },
  },
  plugins: [],
}