/* eslint-disable no-case-declarations */
const { readdir, readFile } = require("fs");
const { parse, join, dirname } = require("path");
const NodeJSModule = require("module");
const constants = require("./constants");

const utils = {
	/**
	 * Easily create a object with a string tag value. These names will then appear in DevTools and .prototype.toString
	 * @param {string} name Value of `[Symbol.toStringTag]`
	 * @param {{}} properties Properties to assign to object
	 * @example
	 * const obj = util.createNamedObject("Mark big bot", {});
	 * obj.toString(); // --> "[object Mark big bot]"
	 */
	createNamedObject(name, properties) {
		const obj = Object.assign({}, properties);
		Object.defineProperty(obj, Symbol.toStringTag, {value: name, enumerable: false});
		return obj;
	},
	/**
	 * Format a string using variables
	 * @param {string} format String to be formatted
	 * @param {{}} data Object with the data
	 * @example
	 * util.formatString("Hi {{name}}", {name: "John"})
	 * // Returns "Hi John"
	 */
	formatString(format, data) {
		for (const val in data) {
			format = format.replace(new RegExp(`\\{\\{${val}\\}\\}`, "g"), data[val]);
		}
		return format;
	},
	/**
	 *  Returns an array of required files from the provided dir. (non recursive)
	 * @param {string} dir Path to read from
	 * @param {function} modifier Modifier function to alter each file's export
	 * @returns {Promise<any[]>} Array or required files
	 */
	requireDir (dir) {
		return new Promise((res, rej) => {
			readdir(dir, {encoding: "utf8"}, async (err, files) => {
				if (err) return rej(err);
				const promiseArr = files.map(file => join(dir, file));
				const final = [];

				for (const i in promiseArr) {
					const path = promiseArr[i];
					const exp = await module.exports.requireAsync(path);

					final.push(exp);
				}

				res(final);
			});
		});
	},
	/**
	 * An async version of node's require
	 * @param {string} moduleOrPath Absolute path to file, or a relative path (you must supply `resolvePaths`)
	 * @param {string[]} resolvePaths Optional. Paths to use if using a relative path for `moduleOrPath`
	 * @returns {Promise<any>} Resolved file
	 * @example (async () => {
	 * 		// Absolute Paths
	 * 		const { join } = require("path");
	 * 		const utils = await requireAsync(join(ED.paths.modules, "context_menu.js"))
	 *
	 *		// Relative Paths
	 *		const Plugins = await requireAsync("./core/structs/Plugins", [process.env.injDir])
	 *
	 * 		// Built-in modules (not recommended but possible)
	 * 		const { promisify } = await requireAsync("util")
	 * })
	 */
	requireAsync(moduleOrPath, resolvePaths=[]) {
		const path = require.resolve(moduleOrPath, {paths: resolvePaths});
		if (require.cache[path]) return require.cache[path].exports;
		return new Promise((res, rej) => {
			const parsedPath = parse(path);
			switch (parsedPath.ext) {
			case ".json":
				readFile(path, {encoding: "utf-8"}, (err, data) => {
					if (err) return rej(err);
					try {
						const json = JSON.parse(data);
						return res(json);
					} catch (e) {
						return rej(e);
					}
				});
				break;
			case ".js":
				const Module = new NodeJSModule(path);
				const req = module.exports.createRequireFunction(Module);
				const args = [
					{ name: "exports", value: Module.exports },
					{ name: "require", value: req }, // to do, make a bound require since this uses the current file path as the base search path (bad)
					{ name: "module", value: Module },
					{ name: "__filename", value: path },
					{ name: "__dirnane", value: dirname(path) }
				];

				Module.filename = path;

				readFile(path, {encoding: "utf-8"}, (err, code) => {
					if (err) return rej(err);

					if (code.charCodeAt(0) === 0xFEFF) code = code.slice(1);

					const func = new Function(...args.map(e => e.name), code);
					let exports;
					try {
						func(...args.map(e => e.value));
						Module.loaded = true;
						exports = Module.exports;
						res(exports);

						require.cache[path] = Module;
					} catch (e) {
						return rej(e);
					}
				});
				break;
			default: throw new Error("Unable to require file, unknown file extension");
			}
		});
	},
	/**
	 * Create a bound require function, mainly used by `util.requireAsync`
	 * @param {NodeJSModule} mod
	 * @returns {NodeRequire} Node require function which works off path set in module
	 */
	createRequireFunction(mod) {
		const Module = mod.constructor;

		const require = path => mod.require(path);

		const resolve = (request, options) => {
			if (typeof request !== "string") throw new TypeError("Argument 'request' is not a string in require.resolve");
			return Module._resolveFilename(request, mod, false, options);
		};

		const paths = (request) => {
			if (typeof request !== "string") throw new TypeError("Argument 'request' is not a string in require.paths");

			return Module._resolveLookupPaths(request, mod, true);
		};

		require.resolve = resolve;
		resolve.paths = paths;
		require.main = process.mainModule;
		require.extensions = Module._extensions;
		require.cache = Module._cache;

		return require;
	},
	parseVersion(v) {
		// eslint-disable-next-line no-useless-escape
		const parsed = /^@(\w+)\/(\w+)-([\d\.]+)$/.exec(v);
		return {
			fork: parsed[1],
			channel: parsed[2],
			version: parsed[3]
		};
	},
	sleep(ms) {
		return new Promise(res => setTimeout(res, ms));
	}
};

module.exports = utils.createNamedObject("Utilities", utils);