(async () => {
	console.info("BRED injected sucessfully");
	const electron = require("electron");
	const currentWindow = electron.remote.getCurrentWindow();
	if (currentWindow.__preload) require(currentWindow.__preload);

	const util = require("./modules/util");
	const paths = require("./modules/paths");
	const symbols = require("./modules/symbols");
	const PluginArr = require("./structs/Plugins");

	window.ED = util.createNamedObject("🍞", {
		version: "@bred/1.0.0",
		discordBrowserWindow: currentWindow,
		modules: util.createNamedObject("Modules"),
		util,
		paths,
		symbols,
		plugins: new PluginArr(),
		corePlugins: new PluginArr()
	});

	
})();