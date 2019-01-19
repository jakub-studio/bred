const {formatString, requireAsync} = require("../modules/util");
const { promisify } = require("util");
const _fs = require("fs");

const fs = {
	readdir: promisify(_fs.readdir),
	readFile: promisify(_fs.readFile)
};

class Plugins extends Array {
	constructor(dir) {
		super();
		Object.defineProperty(this, "_", {value: {
			pluginsHaveLoaded: false,
			dir
		}, enumerable: false});
	}
	async loadAllPlugins() {
		const plugins = await fs.readdir(this._.dir, {encoding: "utf-8"});
		for (const plugin of plugins) {
			await this.loadPlugin(plugin);
		}
	}
	async loadPlugin(fileName) {
		const path = join()
	}
	_loadPlugin(pluginExports) {

	}
	unloadPlugin(pluginID) {
		const plugin = this.getPlugin(pluginID);
	}
	getPlugin(pluginIDorName) {
		return this.find(plugin => plugin.id === pluginIDorName || plugin.name === pluginIDorName);
	}
	get pluginsHaveLoaded() {
		return this._.pluginsHaveLoaded;
	}
	toString(format="{{name}}, ") {
		return this.map(plugin => formatString(format, plugin)).join("");
	}
}

module.exports = Plugins;