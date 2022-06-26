const spawn = require('child_process').spawn;
function startSampleServer() {
	const promise = new Promise((resolve, reject) => {
		const process = spawn('npx', ['http-server', './', '-p', '38541', '--mimetypes', 'mime.types', '-e', 'js'],  {stdio: 'inherit'});
		process.on('close', (status) => {
			resolve(status);
		});
		process.on('error', (error) => {
			reject(error);
		});
	});
	return promise;	
}

function runTests() {
	const promise = new Promise((resolve, reject) => {
		const process = spawn('mocha', ['--config', '.mocharc.json'],  {stdio: 'inherit', cwd: './tests' });
		process.on('close', (status) => {
			resolve(status);
		});
		process.on('error', (error) => {
			reject(error);
		});
	});
	return promise;	
}

exports.startSampleServer = startSampleServer;
exports.runTests = runTests;