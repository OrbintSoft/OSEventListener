const fse = require('fs-extra');
async function cleanDist() {
	await fse.emptyDir('dist');
}
exports.dist = cleanDist;