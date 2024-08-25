import withMT from "@material-tailwind/react/utils/withMT";
import daisyui from 'daisyui';
import flowbite from "flowbite/plugin";
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default withMT({
  darkMode: 'class',  // Enable dark mode via a class
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
         sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
    },
  },
  plugins: [
    flowbite,
    daisyui,
    typography,
  ],
});
