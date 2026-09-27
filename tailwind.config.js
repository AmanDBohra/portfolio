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
        // Warm coral accent scale (was analytics blue)
        brand: {
          50: "#fdf2ee",
          100: "#fbe1d6",
          200: "#f5c2ac",
          300: "#ee9d7c",
          400: "#e97c54", // coral accent
          500: "#de5c30", // primary coral
          600: "#bc431e", // hover / deep coral
          700: "#8f3216", // enterprise
          800: "#5f210f", // deep rust
          900: "#3d150a", // midnight rust
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
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        gradient: "gradient 6s ease infinite",
      },
    },
  },
  plugins: [],
};
