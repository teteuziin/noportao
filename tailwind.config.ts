import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: "#FFB800",
          "amber-light": "#FCD34D",
          "amber-dark": "#D97706",
          navy: "#0B1120",
          surface: "#161F30",
          border: "#233044",
        },
      },
    },
  },
  plugins: [],
};
export default config;
