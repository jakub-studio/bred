const util = require("./util");

const c = {
	log: function (msg, plugin) {
		if (plugin && plugin.name)
			console.log(`%c[EnhancedDiscord] %c[${plugin.name}]`, "color: red;", `color: ${plugin.color}`, msg);
		else console.log("%c[EnhancedDiscord]", "color: red;", msg);
	},
	info: function (msg, plugin) {
		if (plugin && plugin.name)
			console.info(`%c[EnhancedDiscord] %c[${plugin.name}]`, "color: red;", `color: ${plugin.color}`, msg);
		else console.info("%c[EnhancedDiscord]", "color: red;", msg);
	},
	warn: function (msg, plugin) {
		if (plugin && plugin.name)
			console.warn(`%c[EnhancedDiscord] %c[${plugin.name}]`, "color: red;", `color: ${plugin.color}`, msg);
		else console.warn("%c[EnhancedDiscord]", "color: red;", msg);
	},
	error: function (msg, plugin) {
		if (plugin && plugin.name)
			console.error(`%c[EnhancedDiscord] %c[${plugin.name}]`, "color: red;", `color: ${plugin.color}`, msg);
		else console.error("%c[EnhancedDiscord]", "color: red;", msg);
	},
	sleep: function (ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}
};

module.exports = {
	insert() {
		Object.assign(window, module.exports.windowProps);

		delete req.m["__extra_id__"];
		delete req.c["__extra_id__"];
	},
	get windowProps() {
		return {
			req: window.webpackJsonp.push([
				[], {
					"__extra_id__": (module, exports, req) => module.exports = req
				},
				[
					["__extra_id__"]
				]
			]),
			findModule(prop, silent) {
				for (const i in req.c) {
					if (req.c.hasOwnProperty(i)) {
						const m = req.c[i].exports;
						if (m && m.__esModule && m.default && m.default[prop] !== undefined)
							return m.default;
						if (m && m[prop] !== undefined)
							return m;
					}
				}
				if (!silent) c.warn(`Could not find module ${prop}.`, {
					name: "Modules",
					color: "black"
				});
				return null;
			},
			findModules(prop) {
				const mods = [];
				for (const i in req.c) {
					if (req.c.hasOwnProperty(i)) {
						const m = req.c[i].exports;
						if (m && m.__esModule && m.default && m.default[prop] !== undefined)
							mods.push(m.default);
						if (m && m[prop] !== undefined)
							mods.push(m);
					}
				}
				return mods;
			},
			findRawModule(prop, silent) {
				for (const i in req.c) {
					if (req.c.hasOwnProperty(i)) {
						const m = req.c[i].exports;
						if (m && m.__esModule && m.default && m.default[prop] !== undefined)
							return req.c[i];
						if (m && m[prop] !== undefined)
							return req.c[i];
					}
				}
				if (!silent) c.warn(`Could not find module ${prop}.`, {
					name: "Modules",
					color: "black"
				});
				return null;
			},
			monkeyPatch(what, methodName, newFunc) {
				util.deprecate(arguments, ED.constants.strings.deprecationNotices.GLOBAL_MONKEY_PATCH);
				if (!what || typeof what !== "object")
					return c.error(`Could not patch ${methodName} - Invalid module passed!`, {
						name: "Modules",
						color: "black"
					});
				const displayName = what.displayName || what.name || what.constructor.displayName || what.constructor.name;
				const origMethod = what[methodName];
				const cancel = () => {
					what[methodName] = origMethod;
					console.log("%c[EnhancedDiscord] %c[Modules]", "color: red;", "color: black;", `Unpatched ${methodName} in module:`, what);
					return true;
				};
				what[methodName] = function () {
					const data = {
						thisObject: this,
						methodArguments: arguments,
						//cancelPatch: cancel,
						originalMethod: origMethod,
						callOriginalMethod: () => data.returnValue = data.originalMethod.apply(data.thisObject, data.methodArguments)
					};
					return newFunc(data);
				};
				what[methodName].__monkeyPatched = true;
				what[methodName].displayName = "patched " + (what[methodName].displayName || methodName);
				what[methodName].unpatch = cancel;
				console.log("%c[EnhancedDiscord] %c[Modules]", "color: red;", "color: black;", `Patched ${methodName} in module:`, what);
				return true;
			}
		};
	}
};