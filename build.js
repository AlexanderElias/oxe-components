'use strict';

const Cp = require('child_process');
const Mp = Cp.execSync('npm root -g').toString().trim();
const Muleify = require(`${Mp}/muleify`);

const Fs = require('fs');
const Util = require('util');
const Path = require('path');
const Package = require('./package');

const ReadFolder = Util.promisify(Fs.readdir);
const ReadFile = Util.promisify(Fs.readFile);
const WriteFile = Util.promisify(Fs.writeFile);

const header = `/*
	Name: ${Package.name}
	Version: ${Package.version}
	License: ${Package.license}
	Author: ${Package.author}
	Email: ${Package.email}
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
`;

const prepend = async function (data, path) {
	let fileData = await ReadFile(path, 'utf8');
	fileData = fileData.replace(/\\n|\\t/g, '');
	await WriteFile(path, data + fileData, 'utf8');
};

(async function() {
	const options = { bundle: true, transpile: true, minify: true };

	const items = await ReadFolder('src');

	for (const item of items) {
		const name = Path.basename(item, '.js');

		const data = await ReadFile(`src/${item}`);
		await WriteFile(`dst/${item}`, `${header}${data}`);

		await Muleify.packer(`src/${item}`, `dst/${name}.min.js`, options);
		await prepend(header, `dst/${name}.min.js`);
	}

}()).catch(console.error);
