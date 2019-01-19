(async () => {
	console.info("BRED injected sucessfully");
	const electron = require("electron");
	const constants = require("./modules/constants");
	const currentWindow = electron.remote.getCurrentWindow();
	if (currentWindow.__preload) require(currentWindow.__preload);

	if (!process.env.injDir) return console.error(constants.error("NO_INJDIR", true));

	const util = require("./modules/util");
	const paths = require("./modules/paths");
	const symbols = require("./modules/symbols");
	const PluginArr = require("./structs/Plugins");

	window.ED = util.createNamedObject("🍞", {
		version: constants.VERSION,
		versionParsed: util.parseVersion(constants.VERSION),
		discordBrowserWindow: currentWindow,
		modules: util.createNamedObject("Modules"),
		util,
		paths,
		symbols,
		constants,
		plugins: new PluginArr(paths.plugins),
		corePlugins: new PluginArr(paths.core_plugins),
		loaded: false
	});

	process.once("loaded", async () => {
		console.info(constants.template("CONSOLE_GENERIC", {msg: `Loading version: ${constants.VERSION}`}));

		while (window.webpackJsonp === void 0) await util.sleep(500); // Wait until webpack modules begin loading

		window.ED.discordWebSocket = window._ws;

		window.ED.loaded = true;
	});
})();