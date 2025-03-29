/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-primary-color": "#5F5AD9",
        "custom-bg": "#111315",
        "custom-bg-2": "#292C2D",
      },
      
    },
  },
  plugins: [],
};
