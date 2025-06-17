/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#111111", // softer black
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        jadeGreen: "#00A86B",
        navajoWhite: "#FFF5EE",
    
        // 🆕 Updated dark mode colors
        darkBackground: "#1A1A2E",       // Main background
        darkCard: "#1F2937",             // Card / section background
        darkBorder: "#374151",           // Borders / outlines
        darkText: "#E5E7EB",             // Main text
        darkMutedText: "#9CA3AF"         // Secondary text
      },
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
  plugins: [],
}