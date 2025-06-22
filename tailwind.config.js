module.exports = {
    content: [
        "./public/**/*.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                fade: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0.5' },
                },
            },
            animation: {
                fade: 'fade 0.5s ease forwards',
            },
        },
    },
    plugins: [],
}