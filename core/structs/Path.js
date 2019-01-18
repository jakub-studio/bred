const p = require("path");

class Path {
	constructor(path) {
		const parsed = p.parse(path);
		Object.assign(this, parsed);
	}
	append(returnNew=false, ...args) {
		if (returnNew !== true) return p.join(p.format(this), ...arguments);
		else return new Path(p.join(p.format(this), ...args));
	}
	toString() {
		return p.format(this);
	}
}

module.exports = Path;