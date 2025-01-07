import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    screens: {
      xsm: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",

    },
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
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '5/12': '41.666667%',
        '7/12': '58.333333%',
        '11/12': '91.666667%',
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require('daisyui')
  ],
};