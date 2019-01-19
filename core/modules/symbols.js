const util = require("./util");
const {SYMBOLS_PREFIX:prefix} = require("./constants");

const symbols = {
	patcher: Symbol.for(`${prefix}.patcher`),
	propName: Symbol.for(`${prefix}.modules.propName`)
};

module.exports = util.createNamedObject("Symbols", symbols);