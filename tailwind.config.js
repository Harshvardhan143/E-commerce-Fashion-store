/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondaryBrown: "#bdae82", // Muted Sand/Gold
        primaryDeep: "#1a1a1a",    // Deep Charcoal
        accentMuted: "#f4f4f4",    // Soft Gray for backgrounds
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};
