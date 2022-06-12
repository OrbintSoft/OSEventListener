const eslint = require('gulp-eslint');
const gulp = require('gulp');
const src = gulp.src;
const gulpIf = require('gulp-if')

exports.lint = function() {
    return src(['src/**/*.ts'])
    .pipe(eslint({fix:true}))
    .pipe(eslint.format())
    .pipe(gulpIf(file => file.eslint != null && file.eslint.fixed, gulp.dest(file => file.base)))
    .pipe(eslint.failAfterError())
}