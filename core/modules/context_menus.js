const { propName } = require("./symbols");


const createContextMenu = (config=[], event) => {
	if (!event) throw new TypeError("A onContextMenu event must be provided as the second argument.");
	if (!Array.isArray(config)) throw new TypeError(`Context Menu Config must be an Array. Recieved: ${config}`);

	findModule("openContextMenu").openContextMenu(event, props => EDApi.React.createElement(module.exports.components.ContextMenu, props), config);
};

module.exports = {
	ContextMenu: null,
	createContextMenu,
};

Object.defineProperties(module.exports, {
	[Symbol.toStringTag]: {
		value: "Context Menus",
		enumerable: false
	},
	[propName]: {
		value: "contextMenu",
		enumerable: false
	}
});