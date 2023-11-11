const { text } = require('stream/consumers');
const { factory } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#1f1f1f',
                text: '#333',
                textDark: '#f1f1f1',
            },
        },
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
        },
    },
    plugins: [require('flowbite/plugin')],
};
