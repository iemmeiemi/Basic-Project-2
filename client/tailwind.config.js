/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1f1f1f',
            },
        },
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
        },
    },
    plugins: [],
};
