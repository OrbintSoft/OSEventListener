const { executeProcess } = require('./helpers');
function startSampleServer() {
	return executeProcess('npx', ['http-server', './', '-p', '38541', '--mimetypes', 'mime.types', '-e', 'js']);
}

function runTests() {
	return executeProcess('npx', ['mocha', '--config', '.mocharc.json'], './tests');
}

exports.startSampleServer = startSampleServer;
exports.runTests = runTests;