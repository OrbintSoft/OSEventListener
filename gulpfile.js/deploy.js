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
	if (deployedVersion.prerelease[0] === 'rc' || currentVersion.prerelease[0] === 'rc') {
		const npmToken = process.env.NPM_AUTH_TOKEN;
		await executeProcess('npm', [ 'pack' ]);
		await executeProcess('npm', [ 'set', '//registry.npmjs.org/:_authToken', npmToken ]);
		await executeProcess('npm', [ 'publish']);
	} else {
		throw Error('Before releasing a stable version, an rc must be published and manually tested.');
	}
}

exports.publish = publish;