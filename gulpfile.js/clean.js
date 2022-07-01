const emptyDir = require('fs-extra');
async function cleanDist() {
	await emptyDir('dist');
}

exports.clean = cleanDist;