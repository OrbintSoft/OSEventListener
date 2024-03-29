
const { spawn } = require('child_process');
function executeProcess(executable, parameters, directory = '.', stdio = 'inherit', inputStream = null) {
	const promise = new Promise((resolve, reject) => {
		const process = spawn(executable, parameters, { stdio: stdio, cwd: directory });
		if (inputStream !== null) {
			inputStream.pipe(process.stdin);
		}
		process.on('close', (status) => {
			if (status === 0) {
				resolve(status);
			} else {
				reject(status);
			}
		});
		process.on('error', (error) => {
			reject(error);
		});
	});
	return promise;
}

exports.executeProcess = executeProcess;