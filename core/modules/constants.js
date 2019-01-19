const util = require("./util");

const constants = {
	FORK_NAME: "BRED",
	SYMBOLS_PREFIX: "bred",
	VERSION: "@bred/alpha-1.0.0",
	WEBPACK_REQUIRE_CACHE_MIN: 5000,
	errorMsgs: {
		get LOAD_ABORT_PREFIX () {
			return `${constants.FORK_NAME} loading was aborted.\nReason: `;
		},
		NO_INJDIR: "process.env.injDir is undefined"
	},
	_templates: {
		get CONSOLE_GENERIC () {
			return `[${new Date().toLocaleTimeString()}] [${constants.FORK_NAME}] {{msg}}`;
		},
		DEPRECATION_WARNING: "[Deprecation Warning] {{name}} is now deprecated and may be soon removed from the client. Please switch to alternative methods."
	},
	template(str, data) {
		return util.formatString(constants._templates[str], data);
	},
	error(msg, useAbortedPrefix) {
		return useAbortedPrefix ?
			constants.errorMsgs.LOAD_ABORT_PREFIX + constants.errorMsgs[msg] :
			constants.errorMsgs[msg];
	}
};

module.exports = util.createNamedObject("Constants", constants);