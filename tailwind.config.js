/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7fbe8',
          100: '#eef7d1',
          200: '#ddf0a3',
          300: '#c8e876',
          400: '#ABE44F',
          500: '#9ad43f',
          600: '#7cb832',
          700: '#5e9425',
          800: '#4a7520',
          900: '#3d5f1c',
        },
        secondary: {
          50: '#e8f5ec',
          100: '#c5e6d0',
          200: '#9ed4b1',
          300: '#74c190',
          400: '#4eae70',
          500: '#2a9b52',
          600: '#1a7a3e',
          700: '#145a2e',
          800: '#0f4423',
          900: '#0A2916',
        },
        accent: {
          50: '#f7fbe8',
          100: '#eef7d1',
          200: '#ddf0a3',
          300: '#c8e876',
          400: '#ABE44F',
          500: '#9ad43f',
          600: '#7cb832',
          700: '#5e9425',
          800: '#4a7520',
          900: '#3d5f1c',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
