module.exports = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bakery: {
          light: "#fef7e5", // warm cream
          dark: "#2b1b12", // deep cocoa
          accent: "#d97706", // amber glaze
          card: "#3a261a", // chocolate card
        },
      },
    },
  },
  plugins: [],
};
