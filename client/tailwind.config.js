module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dfront: "##E35F21",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"), 
  ],
  darkMode: "class",
};
