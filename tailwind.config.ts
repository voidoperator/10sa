import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '896px',
      xl: '1024px',
      '2xl': '1280px',
      '3xl': '1536px',
      '4xl': '1920px',
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '2rem',
          md: '2.5rem',
          lg: '2rem',
          xl: '2rem',
          '2xl': '10rem',
        },
      },
      fontFamily: {
        display: ['Roboto', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      colors: {
        '10sa-purple': '#351f39',
        '10sa-gold': '#bda472',
        '10sa-deep-purple': '#503158',
        mutual: '#003a70',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('@tailwindcss/typography'),
    require('@thoughtbot/tailwindcss-aria-attributes'),
  ],
} satisfies Config;
