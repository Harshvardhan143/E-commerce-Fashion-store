/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondaryBrown: "#D4AF37", // Premium Gold
        primaryDeep: "#0a0a0a",    // Rich Black
        accentMuted: "#f8f8f8",    // Pristine Light Gray for backgrounds
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};
