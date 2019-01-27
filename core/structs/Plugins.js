const {formatString, requireAsync} = require("../modules/util");
const internal = require("../modules/symbols").pluginsArrInternal;
const { promisify } = require("util");
const _fs = require("fs");

const fs = {
	readdir: promisify(_fs.readdir),
	readFile: promisify(_fs.readFile)
};

const getInternal = t => t[internal];

class Plugins extends Array {
	constructor(dir) {
		super();
		Object.defineProperty(this, internal, {value: {
			pluginsHaveLoaded: false,
			dir
		}, enumerable: false});
	}
	async loadAll() {
		const plugins = await fs.readdir(getInternal(this).dir, {encoding: "utf-8"});
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
		return getInternal(this).dir;
	}
	toString(format="{{name}}, ") {
		return this.map(plugin => formatString(format, plugin)).join("");
	}
}

module.exports = Plugins;