import type { Config } from 'tailwindcss'

const { fontFamily } = require('tailwindcss/defaultTheme')

const config: Config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                dark: '#444444',
                grey: '#3C484B',
            },
        },
        fontFamily: {
            roboto: ['var(--font-roboto)', ...fontFamily.serif],
        },
    },
    plugins: [],
}
export default config
