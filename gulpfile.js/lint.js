const eslint = require('gulp-eslint');
const gulp = require('gulp');
const src = gulp.src;
const gulpIf = require('gulp-if');

function lint(paths) {
	return src(paths)
		.pipe(eslint({fix:true}))
		.pipe(eslint.format())
		.pipe(gulpIf(file => file.eslint != null && file.eslint.fixed, gulp.dest(file => file.base)))
		.pipe(eslint.failAfterError());
}

function lintSrc(){
	return lint(['src/**/*.ts']);
}
function lintTests(){
	return lint(['tests/**/*.ts']);
}

exports.src = lintSrc;
exports.tests = lintTests;

