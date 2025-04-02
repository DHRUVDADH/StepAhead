/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-primary-color": "rgba(var(--custom-primary-color))",
        "custom-bg": "rgba(var(--custom-bg))",
        "custom-bg-2": "rgba(var(--custom-bg-2))",
        "custom-gray" : "rgba(var(--custom-gray))",
        "custom-text-color" : "rgba(var(--custom-text-color))"
      },
      boxShadow :{
        "custom-box-shadow" : "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.7) 0px 3px 7px -3px;rgba(0, 0, 0, 0.1) 0px 4px 12px;"
      }
      
    },
  },
  plugins: [],
};
