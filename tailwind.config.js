module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#FFC72C",
                background: "#14142A",
                secondary: "#23263A",
                accent: "#2C64FF",
                error: "#E74C3C",
                text: "#D8DBE9",
            },
        },
        letterSpacing: {
            widest: ".15em",
        },
    },
    plugins: [],
};
