const clean = require('./clean');
const gulp = require('gulp');
const lint = require('./lint');
const compile = require('./compile');
const test = require('./test');

exports.clean = clean.dist;
exports.lintSsrc = lint.src;
exports.lintTests = lint.tests;
exports.lint = gulp.parallel(lint.src, lint.tests);
exports.compileEs = compile.compileEs;
exports.compileUmd = compile.compileUmd;
exports.compileTypescript = gulp.parallel(compile.compileEs, compile.compileUmd);
exports.minify = compile.minify;
exports.bundle = compile.bundle;
exports.compile = gulp.series(exports.compileTypescript, exports.minify, exports.bundle);
exports.startSampleServer = test.startSampleServer;