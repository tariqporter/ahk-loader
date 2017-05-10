/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tariq Porter @tariqporter
*/

var path = require("path");
var fs = require("fs");

function ahkLoader(source) {
	const callback = this.async();
	var re = /^([\t ])#Include\s+(.*)$/gim;
	var re2 = /(^.*$)/gim;
	source = source.replace(/\r\n/gm, '\n');
	var result = re.exec(source);
	if (!fs.existsSync(result[2])) {
		throw new Error("File does not exist: " + result[2]);
	}
	
	var innerSource = null;
	while (result != null) {
		this.addDependency(path.resolve(result[2]));
		innerSource = fs.readFileSync(result[2], "utf-8");
		innerSource = innerSource.replace(/\r\n/gm, '\n').replace(/^/gm, result[1]);
		source = source.replace(result[0], innerSource);
		result = re.exec(source);
	}

	var exp = `
		exports = module.exports = [];
		{{moduleJS}}
	`;
	exp = exp.replace(/{{moduleJS}}/g, "exports.push([0, `" + source + "`, '']);");
	callback(null, exp);
};
module.exports = ahkLoader;