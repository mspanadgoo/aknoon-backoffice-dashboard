module.exports = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bakery: {
          light: "#f5f7fb",
          dark: "#0b1a2f",
          accent: "#1e3a8a",
          card: "#0f172a",
          logo: "#f5f3c4",
        },
      },
    },
  },
  plugins: [],
};
