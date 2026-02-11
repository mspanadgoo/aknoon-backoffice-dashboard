module.exports = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bakery: {
          light: "#ffffff",
          dark: "#0f172a",
          accent: "#1d4ed8",
          card: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
