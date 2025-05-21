// gulpfile.js

// 1. Import des API Gulp
const { src, dest, watch, series } = require("gulp");

// 2. Import des plugins Gulp
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const rename = require("gulp-rename");

// 3. Import des plugins PostCSS
const atImport = require("postcss-import");
const nested = require("postcss-nested");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

// 4. Définition des chemins
const paths = {
    css: "src/**/*.css",
    dest: "dist/",
};

// 5. Tâche styles : concaténation, PostCSS, autoprefixer, minification
function styles() {
    return (
        src(paths.css)
            // Concaténation en un fichier unique
            .pipe(concat("templater.css"))
            // Application de PostCSS : import, nesting, autoprefixer
            .pipe(
                postcss([
                    atImport({ path: ["src"] }), // Inline @import
                    nested(), // Sass-like nested rules
                    autoprefixer(), // Ajout des préfixes navigateur
                ])
            )
            // Écriture du CSS non minifié
            .pipe(dest(paths.dest))
            // Repassage PostCSS pour la minification
            .pipe(postcss([cssnano({ preset: "default" })]))
            // Renommage en fichier .min.css
            .pipe(rename({ suffix: ".min" }))
            // Écriture du CSS minifié
            .pipe(dest(paths.dest))
    );
}

// 6. Tâche watch : surveillance des fichiers CSS
function watchFiles() {
    watch(paths.css, styles);
}

// 7. Exports : build, watch et tâche par défaut
exports.build = styles;
exports.watch = watchFiles;
exports.default = series(styles, watchFiles);
