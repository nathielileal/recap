/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"], 
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#E50914",
        accent: "#FF9800", 
        light: {
          100: "#F5F5F5", 
        },
        dark: {
          100: "#1E1E1E", 
        },
      },
    },
  },
  plugins: [],
}
