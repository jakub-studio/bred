const {join} = require("path");
const base = process.env.injDir;
const util = require("./util");

const paths = {
	core: join(base, "core"),
	components: join(base, "core", "components"),
	modules: join(base, "core", "modules"),
	structs: join(base, "core", "structs"),
	core_plugins: join(base, "core", "plugins"),
	plugins: join(base, "plugins"),
	themes: join(base, "themes")
};

module.exports = util.createNamedObject("Paths", paths);