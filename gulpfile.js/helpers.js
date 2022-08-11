
const { spawn } = require('child_process');
function executeProcess(executable, parameters, directory = '.', stdio = 'inherit') {
	const promise = new Promise((resolve, reject) => {
		const process = spawn(executable, parameters, { stdio: stdio, cwd: directory });
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