/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3f018c",

          secondary: "#71e25a",

          accent: "#fc9b99",

          neutral: "#241b27",

          "base-100": "#ffffff",

          info: "#8fa1dc",

          success: "#158e6a",

          warning: "#f6c523",

          error: "#fa1427",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
