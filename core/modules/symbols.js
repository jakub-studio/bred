const util = require("./util");
const {SYMBOLS_PREFIX:prefix} = require("./constants");

module.exports = util.createNamedObject("Symbols", {
	patcher: Symbol.for(`${prefix}.patcher`),
	propName: Symbol.for(`${prefix}.modules.propName`),
	pluginsArrInternal: Symbol.for(`${prefix}.pluginsArr.interal`)
});