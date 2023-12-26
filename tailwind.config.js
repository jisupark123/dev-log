const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        'cf-star': 'var(--cf-star)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        page1: '#F0F0F5',
        page2: '#E2E2EF',
        element1: '#FFFFFF',
        blue: '#6B7AF7',
        indigo: '#6610f2',
        danger: '#E60F6C',
        lightGray: '#C1C1C1',
      },
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      width: px0_1000,
      height: px0_1000,
      spacing: px0_200,
      borderRadius: px0_100,
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
