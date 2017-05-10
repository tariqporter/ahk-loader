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
	var test = source.replace(/\r\n/gm, '\n');
	var result = re.exec(source.replace(/\r\n/gm, '\n'));
	console.log(test);
	var innerSource = null;
	while (result != null) {
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