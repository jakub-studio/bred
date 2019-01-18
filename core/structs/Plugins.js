const util = require("../modules/util");

class Plugins extends Array {
	constructor(dir) {
		super();
		Object.defineProperty(this, "_", {value: {
			pluginsHaveLoaded: false,
			dir
		}, enumerable: false});
	}
	loadAllPlugins() {

	}
	loadPlugin(fileName) {

	}
	_loadPlugin(pluginExports) {

	}
	unloadPlugin(pluginID) {
		const plugin = this.getPlugin(pluginID);
	}
	getPlugin(pluginIDorName) {
		return this.find(plugin => plugin.id === pluginIDorName || plugin.name === pluginIDorName);
	}
	get pluginsAreLoaded() {
		return this._.pluginsAreLoading;
	}
	toString(format="{name}, ") {
		return this.map(plugin => util.formatString(format, plugin)).join("");
	}
}

module.exports = Plugins;