const util = require("./util");

const prefix = "bred";

const symbols = {
	patcher: Symbol.for(`${prefix}.patcher`),
	propName: Symbol.for(`${prefix}.modules.propName`)
};

module.exports = util.createNamedObject("Symbols", symbols);