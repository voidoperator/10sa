import type { Config } from 'tailwindcss';

export default {
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
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
        'dp-form-color': '#ffffff',
        'dp-primary': '#ededed',
        'dp-secondary': '#c7c7c7',
        'dp-hint': '#fa0217',
        'dp-text-primary': '#000000',
        'dp-text-secondary': '#ffffff',
        'dp-placeholder-text': '#595959',
        mutual: '#003a70',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('@tailwindcss/typography'),
    require('@thoughtbot/tailwindcss-aria-attributes'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
} satisfies Config;
