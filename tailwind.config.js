/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      colors: {
        primary: "#121212",       // Rich, modern black
        secondary: "#FFFBFC",     // Crisp white for contrast
        accent: "#065A82",        // Modern vibrant blue for highlights
        neutral: "#9CA3AF",       // Cool neutral gray
        light: {
          primary: "#FFFBFC",     // Soft modern white-gray
          secondary: "#111827",   // Deep black for contrast
          accent: "#22D3EE",      // Light cyan for accents
          neutral: "#D1D5DB",     // Light neutral gray
        },
        dark: {
          primary: "#1F2937",     // Charcoal for modern dark mode
          secondary: "#F9FAFB",   // Off-white for readability
          accent: "#065A82",       // Aqua blue for emphasis
          neutral: "#4B5563",     // Medium neutral gray
        },
        danger: "#EF4444",         // Modern bright red for errors
        success: "#10B981",        // Vibrant emerald green
        warning: "#F59E0B",        // Warm amber for warnings
        info: "#3B82F6",           // Modern blue for information
      },

      fontFamily: {
        sans: ["Cairo", "sans-serif"], // Using the Cairo font as you prefer
      },
      keyframes: {
        honeycomb: {
          '0%, 20%, 80%, 100%': { opacity: '0', transform: 'scale(0)' },
          '30%, 70%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        honeycomb: 'honeycomb 2.1s infinite backwards',
      },
      spacing: {
        24: '6rem',
        12: '3rem',
        6: '1.5rem',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("tailwindcss-animated"),
  ],
};