/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(31, 87, 106)',
          light: 'rgb(134, 162, 171)',
          lighter: 'rgb(198, 214, 218)',
        },
        accent: {
          DEFAULT: 'rgb(31, 220, 234)',
          hover: 'rgb(20, 190, 210)',
        },
        background: {
          DEFAULT: 'rgb(246, 248, 248)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        'sans-ar': ['Cairo', 'system-ui', 'sans-serif'],
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        shine: 'shine 3s linear infinite',
      },
      keyframes: {
        shine: {
          from: { backgroundPosition: 'right center' },
          to: { backgroundPosition: 'left center' },
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
};