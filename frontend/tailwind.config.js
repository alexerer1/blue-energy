import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      textColor: {
        primary: "#02525e",
        secondary: "#fff",
      },
      fill: {
        primary: "#00847c",
        secondary: "#02525e",
      },
    },
  },
  plugins: [typography], // Use the imported plugin
};
