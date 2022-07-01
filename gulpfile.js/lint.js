const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const src = gulp.src;

function lint(paths) {
	return src(paths)
		.pipe(eslint({fix: true}))
		.pipe(eslint.format())
		.pipe(gulpIf(file => file.eslint !== null && file.eslint.fixed, gulp.dest(file => file.base)))
		.pipe(eslint.failAfterError());
}

function lintSrc() {
	return lint(['src/**/*.ts']);
}
function lintTests() {
	return lint(['tests/**/*.ts']);
}

exports.lint = lint;
exports.lintSrc = lintSrc;
exports.lintTests = lintTests;