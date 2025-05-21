module.exports = {
    plugins: [
        require("postcss-import"),
        require("postcss-nested"),
        require("autoprefixer"),
        // cssnano n’est appelé que dans Gulp, pour séparer dev et prod
    ],
};
