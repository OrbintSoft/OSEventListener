const fse = require('fs-extra');
const glob = require('glob-promise');
const { executeProcess } = require('./helpers');
function startSampleServer() {
	return executeProcess('npx', ['http-server', './', '-p', '38541', '--mimetypes', 'mime.types', '-e', 'js']);
}

async function checkDistBuild() {
	const files = await glob('./dist/**/*.js');
	if (files.length === 0) {
		throw Error('dist build not generated');
	} else if (files.length !== 235) {
		throw Error('files count differs from latest succesfull build');
	}
}

async function runTests() {
	await executeProcess('npx', ['mocha', '--config', '.mocharc.json'], './tests');
	await fixJUnitTestReportPaths();
	await fixMochaAwesomePaths();
}

async function fixJUnitTestReportPaths() {
	let xmlContentBuffer = await fse.readFile('./tests/report-results/results.xml', 'utf-8');
	xmlContentBuffer = xmlContentBuffer.replace(/file="[A-Za-z0-9\\/:_.\\-]*\/OSEventListener\/([A-Za-z0-9\\/_.\\-]+)\.spec\.ts"/g, 'file="$1.spec.ts"');
	await fse.writeFile('./tests/report-results/results.xml', xmlContentBuffer);
}

async function fixMochaAwesomePaths() {
	let jsonContentBuffer = await fse.readFile('./tests/report-results/mochawesome.json', 'utf-8');
	jsonContentBuffer = jsonContentBuffer.replace(/"fullFile": "[A-Za-z0-9\\/:_.\\-]+\/OSEventListener\/([A-Za-z0-9\\/_.\\-]+)\.spec\.ts"/g, '"fullFile": "$1.spec.ts"');
	await fse.writeFile('./tests/report-results/mochawesome.json', jsonContentBuffer);
	let htmlContentBuffer = await fse.readFile('./tests/report-results/mochawesome.html', 'utf-8');
	htmlContentBuffer = htmlContentBuffer.replace(/&quot;(fullFile|jsonFile|htmlFile)&quot;:&quot;[A-Za-z0-9\\/:_.\\-]+\/OSEventListener\/([A-Za-z0-9\\/_.\\-]+)(\.spec\.ts|\.json|\.html)&quot;/g, '&quot;$1&quot;:&quot;$2$3&quot;');
	await fse.writeFile('./tests/report-results/mochawesome.html', htmlContentBuffer);
}


async function runCoverage() {
	await executeProcess('npx', ['nyc', 'npm', 'run', 'test']);
	await fse.remove('tests/report-results/tmpc');
	const lcovStream = fse.createReadStream('tests/report-results/coverage/lcov.info');
	await executeProcess('npx', ['coveralls'], '.', ['pipe', 'inherit', 'inherit'], lcovStream);
}

exports.startSampleServer = startSampleServer;
exports.runTests = runTests;
exports.runCoverage = runCoverage;
exports.checkDistBuild = checkDistBuild;