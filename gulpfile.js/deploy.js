const fse = require('fs-extra');
const semver = require('semver');
const pinfo = require('package-info');
const { executeProcess } = require('./helpers');

async function getCurrentPackageVersion() {
	const packageJSON = await fse.readJSON('package.json');
	const versionString = packageJSON.version;
	const version = semver.parse(versionString);
	return version;
}

async function getDeployedPackageVersion() {
	const packageInfo = await pinfo('oseventlistener');
	const versionString = packageInfo.version;
	const version = semver.parse(versionString);
	return version;
}

async function publish() {
	const currentVersion = await getCurrentPackageVersion();
	const deployedVersion = await getDeployedPackageVersion();
	if (semver.gte(deployedVersion, currentVersion)) {
		throw Error(`currentVersion ${currentVersion.raw} <= deployedVersion ${deployedVersion}`);
	}
	const npmToken = process.env.NPM_TOKEN;
	console.log(npmToken);
	await executeProcess('npm', [ 'pack' ]);
}

exports.publish = publish;