/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // <-- tells Tailwind where to look
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
