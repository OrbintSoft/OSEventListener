
const spawn = require('child_process').spawn;
const fse = require('fs-extra');
const glob = require('glob-promise');
const path = require('path');

function compileTypescript(tsconfig) {
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

async function compileEs() {
	await compileTypescript('src/tsconfig.json');
	await fse.copyFile('LICENSE', 'dist/es/LICENSE');
	const files = await glob('dist/es/**/*.d.ts');
	for (const file of files) {
		const f =  'dist/type_definitions/' + file.substring(8);
		await fse.copy(file, f);
	}
	await minify('es');
}

async function compileUmd() {
	await compileTypescript('src/tsconfig.umd.json');
	await fse.copyFile('LICENSE', 'dist/umd/LICENSE');
	await minify('umd');
}

async function minify(type) {
	const files = await glob(`dist/${type}/**/*.js`);
	for (const input of files) {
		const dest = `dist/min/${type}/` + input.substring(`dist/${type}/`.length);
		const folder = path.dirname(dest);
		const sourceMapName = path.basename(dest) + '.map';
		if (!await fse.pathExists(folder)) {
			await fse.mkdirp(folder);
		}
		const sourceMap = input.substring(0, input.length -3) + '.js.map';
		const promise = new Promise((resolve, reject) => {
			const process = spawn('npx', ['terser', input, '--output', dest, '--source-map', `includeSources,url='${sourceMapName}',content='${sourceMap}'`],  {stdio: 'inherit'});
			process.on('close', (status) => {
				resolve(status);
			});
			process.on('error', (error) => {
				reject(error);
			});
		});
		await promise;
	}
}

async function createBundle() {
	const promise = new Promise((resolve, reject) => {
		const process = spawn('rollup', ['-c'],  {stdio: 'inherit', cwd: './rollup'});
		process.on('close', (status) => {
			resolve(status);
		});
		process.on('error', (error) => {
			reject(error);
		});
	});
	return promise;
}

exports.compileEs = compileEs;
exports.compileUmd = compileUmd;
exports.minify = minify;
exports.createBundle = createBundle;