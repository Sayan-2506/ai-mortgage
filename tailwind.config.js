import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{vue,js,ts,jsx,tsx}", "./app.vue"],
  theme: {
    extend: {
      fontFamily: {
        onest: ["Onest", "sans-serif"],
      },
      colors: {
        brand: {
          dark: "#111827",
          primary: "#22c55e",
          accent: "#3b82f6",
        },
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
