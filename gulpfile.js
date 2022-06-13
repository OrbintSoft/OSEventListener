const eslint = require('gulp-eslint');
const gulp = require('gulp');
const src = gulp.src;
const gulpIf = require('gulp-if');
const spawn = require('child_process').spawn;


function lint(){
	return src(['src/**/*.ts'])
		.pipe(eslint({fix:true}))
		.pipe(eslint.format())
		.pipe(gulpIf(file => file.eslint != null && file.eslint.fixed, gulp.dest(file => file.base)))
		.pipe(eslint.failAfterError());
}

function compileTypescript(tsconfig){
	const promise = new Promise((resolve, reject) => {
		const process = spawn('npx', ['tsc', '-b', '-f', tsconfig],  {stdio: 'inherit'});
		process.on('close', (status) => {
			resolve(status);
		});
		process.on('error', (error) => {
			reject(error);
		});
	});
	return promise;
}


function compileEs(){
	return compileTypescript('src/tsconfig.json');
}

function compileUmd(){
	return compileTypescript('src/tsconfig.umd.json');
}

exports.lint = lint;

exports.compile = async function() { 
	await compileEs();
	await compileUmd();
};