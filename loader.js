/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tariq Porter @tariqporter
*/

let getRecursiveSource = require("./getRecursiveSource.js");

function ahkLoader(source) {
	const self = this;
	const callback = this.async();

	source = getRecursiveSource(self, source);

	var exp = "exports = module.exports = [];\n" +
		"exports.push([0, `" + source + "`, '']);";
	callback(null, exp);
};
module.exports = ahkLoader;