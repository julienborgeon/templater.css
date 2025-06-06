const gulp = require("gulp");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcssImport = require("postcss-import");

const paths = {
	css: {
		src: "src/templater.css",
		dest: "dist/",
	},
};

// Unminified CSS task (autoprefixed + import)
function css() {
	return gulp
		.src(paths.css.src)
		.pipe(postcss([postcssImport(), autoprefixer()]))
		.pipe(gulp.dest(paths.css.dest));
}

// Minified CSS task (autoprefixed + minified + import)
function cssMin() {
	return gulp
		.src(paths.css.src)
		.pipe(
			postcss([
				postcssImport(),
				autoprefixer(),
				cssnano({ preset: "default" }),
			])
		)
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(paths.css.dest));
}

// Default task
exports.build = gulp.series(css, cssMin);
exports.default = exports.build;
