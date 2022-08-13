const fse = require('fs-extra');
const semver = require('semver');
const pkgstat = require('pkgstat');

async function getCurrentPackageVersion() {
	const packageJSON = await fse.readJSON('package.json');
	const versionString = packageJSON.version;
	const version = semver.parse(versionString);
	return version;
}

async function getDeployedPackageVersion() {
	const packageInfo = await pkgstat('oseventlistener');
	const versionString = packageInfo.version;
}

async function publish() {
	const currentVersion = await getCurrentPackageVersion();
	const deployedVersion = await getDeployedPackageVersion();
	console.log(currentVersion, deployedVersion);
}

exports.publish = publish;