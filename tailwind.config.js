/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                lime: {
                    100: '#ecfccb',
                    200: '#d9f99d',
                    300: '#bef264',
                    400: '#a3e635',
                    500: '#84cc16',
                    600: '#65a30d',
                    700: '#4d7c0f',
                    800: '#3f6212',
                    900: '#365314',
                },
                gray: {
                    950: '#0f0f0f', // consistent background
                },
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
            },
            container: {
                center: true,
                padding: '1rem',
            },
        },
    },
    // tailwind.config.js
    plugins: [require('@tailwindcss/line-clamp')],
};
  