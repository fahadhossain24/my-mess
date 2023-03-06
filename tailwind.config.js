/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        messTheme: {
          primary: "#0000FF",
          secondary: "#00FFFF",
          accent: "#7FFFD4",
        },
      },
      "light",
      "cupcake",
    ],
  },
  plugins: [require('daisyui')],
}
