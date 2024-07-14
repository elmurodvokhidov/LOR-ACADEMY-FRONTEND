/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": "#A45AA9",
        "primary-2": "#821987",
        "primary-3": "#76047A",
      },
      boxShadow: {
        dim: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        smooth: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      },
      screens: {
        small: '320px',
        xsm: '375px',
        sm: '425px',
        pc: '1700px',
      }
    },
  },
  plugins: [],
}