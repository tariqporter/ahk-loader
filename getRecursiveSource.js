const path = require("path");
const fs = require("fs");

function getRecursiveSource(module, source) {
	const REGEX_INCLUDE = /^([\t ])#Include\s+(.*)$/gim;
	let replaceNewLine = function(s) {
		return s.replace(/\r\n/gm, '\n');
	};
	
	source = replaceNewLine(source);
	let result = REGEX_INCLUDE.exec(source);
	
	while (result != null) {
		let match = result[0];
		let indent = result[1];
		let includePath = path.resolve(result[2]);
		if (!fs.existsSync(includePath)) {
			throw new Error("File does not exist: " + includePath);
		}
		
		module.addDependency(includePath);
		let includeSource = fs.readFileSync(includePath, "utf-8");
		includeSource = getRecursiveSource(module, includeSource);
		includeSource = replaceNewLine(includeSource).replace(/^/gm, indent);
		source = source.replace(match, includeSource);
		result = REGEX_INCLUDE.exec(source);
	}
	return source;
}
module.exports = getRecursiveSource;