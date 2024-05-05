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
                primary: '#DF7B32',
                green: '#6BB92D',
                black: '#11101B',
                white: '#f2f2f2',
                'grey-light': '#BDBDBD',
                grey: '#828282',
                container: '#181722',
            },
        },
        fontFamily: {
            roboto: ['var(--font-roboto)', ...fontFamily.serif],
        },
    },
    plugins: [],
}
export default config
