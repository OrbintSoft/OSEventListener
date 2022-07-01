const fse = require('fs-extra');
const glob = require('glob-promise');
async function cleanDist() {
	await fse.emptyDir('dist');
}

async function cleanPacks() {
	const files = await glob('oseventlistener-*.tgz');
	for (const f of files) {
		await fse.rm(f);
	}
}


async function cleanTestResults() {
	fse.remove('tests/TEST-RESULT.xml');
}

exports.dist = cleanDist;
exports.packs = cleanPacks;
exports.testResults = cleanTestResults;