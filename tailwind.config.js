/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1152px" },
    },
    extend: {
      colors: {
        // Analytics blue accent scale
        brand: {
          50: "#eaf4fb",
          100: "#d2e8f6",
          200: "#a9d2ee",
          300: "#73b6e3",
          400: "#46c7e8", // cyan accent
          500: "#2386c8", // analytics blue
          600: "#1769aa", // royal
          700: "#123f66", // enterprise
          800: "#0b2740", // deep navy
          900: "#071a2b", // midnight navy
        },
        navy: {
          900: "#071a2b",
          800: "#0b2740",
          700: "#0e3454",
          600: "#123f66",
        },
        teal: { DEFAULT: "#18a6a6", 400: "#18a6a6" },
        cyan: { DEFAULT: "#46c7e8", 400: "#46c7e8" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
