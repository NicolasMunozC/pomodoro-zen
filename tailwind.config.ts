import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'roboto-mono': 'Roboto Mono Variable, monospace',
        'roboto': 'Roboto, sans-serif',
        'poppins': 'Poppins, sans-serif',
        'montserrat': 'Montserrat Variable, sans-serif',
      },
      colors: {
        redAlpha: {
          50: '#FF4C4C',
          100: '#FF4C4Ce6',
          200: '#FF4C4Ccf',
          300: '#FF4C4Cb5',
          400: '#FF4C4C9e',
          500: '#FF4C4C85',
          600: '#FF4C4C6e',
          700: '#FF4C4C54',
          800: '#FF4C4C3d',
          900: '#FF4C4C26',
          950: '#FF4C4Cd',
        },
        greenAlpha: {
          50: '#4DDA6E',
          100: '#4DDA6Ee6',
          200: '#4DDA6Ecf',
          300: '#4DDA6Eb5',
          400: '#4DDA6E9e',
          500: '#4DDA6E85',
          600: '#4DDA6E6e',
          700: '#4DDA6E54',
          800: '#4DDA6E3d',
          900: '#4DDA6E26',
          950: '#4DDA6Ed',
        },
        blueAlpha: {
          50: '#4CACFF',
          100: '#4CACFFe6',
          200: '#4CACFFcf',
          300: '#4CACFFb5',
          400: '#4CACFF9e',
          500: '#4CACFF85',
          600: '#4CACFF6e',
          700: '#4CACFF54',
          800: '#4CACFF3d',
          900: '#4CACFF26',
          950: '#4CACFFd',
        },
      },

    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
