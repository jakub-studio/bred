declare interface AbsolutePath extends String {}
declare interface RelativePath extends String {}
declare type BuiltInNodeJSModule = 'assert' | 'async_hooks' | 'buffer' | 'child_process' | 'cluster' | 'crypto' | 'dgram' | 'dns' | 'domain' | 'events' | 'fs' | 'http' | 'http2' | 'https' | 'net' | 'os' | 'path' | 'perf_hooks' | 'punycode' | 'querystring' | 'readline' | 'repl' | 'stream' | 'string_decoder' | 'tls' | 'trace_events' | 'tty' | 'url' | 'util' | 'v8' | 'vm' | 'zlib';


declare interface BREDPaths {
	core: AbsolutePath;
	modules: AbsolutePath;
	components: AbsolutePath;
	structs: AbsolutePath;
	core_plugins: AbsolutePath;
	plugins: AbsolutePath;
	themes: AbsolutePath;
}

declare interface BREDUtils {
	createNamedObject: (name: string, properties: object) => {
		[Symbol.toStringTag]: string;
	};
	formatString: (format: string, data: object) => string;
	requireDir: (dir: AbsolutePath) => Promise<any[]>;
	requireAsync: (id: AbsolutePath | RelativePath | BuiltInNodeJSModule, relativeRootPaths?: AbsolutePath[]) => Promise<any>;
	createRequireFunction: (mod: NodeJS.Module) => NodeRequire;
}

declare type BREDSymbols = {
	propName: symbol;
	patcher: symbol;
}

declare class ReactComponent {
	constructor(props: {});
	prototype: {
		render: () => {}
	}
	displayName?: string;
}

declare namespace Webpack {
	export interface Module {
		/**Exports of the module */
		exports: Webpack.ModuleExports
		/**Module ID */
		i: number;
		/**Boolean represting whether the module has been loaded */
		l: boolean;
	}
	export interface ModuleExports {
		default?: ReactComponent;
	}
	/**
	 * Webpack's `__webpack_require__` function
	 */
	export interface Require {
		(ModuleID: number): Webpack.ModuleExports
		/**
		 * Webpack's module **c**ache. Use this to modify Discord's functionality.
		 */
		c: {
			[ModuleID: number]: Webpack.Module
		}
		/**
		 * Webpack's raw modules. **Not recommeneded** for use since these do not affect functionality in any way.
		 */
		m: Webpack.RawModule[];
	}
	export type RawModule = (module: Webpack.Module, exports: Webpack.ModuleExports, require: Webpack.Require) => void
}

declare interface BREDModules {
	util: BREDUtils;
	paths: BREDPaths
}

declare interface DiscordWebpackExports {
	(props: any): {}
	__esModule?: boolean
	default: (props: any) => {}
}


declare interface BRED {
	/**The current version of BRED you are using. Uses semantic versioning. */
	version: string;
	/**The electron `BrowserWindow` class of Discord's main window. */
	discordBrowserWindow: any;
	modules: BREDModules;
	paths: BREDPaths;
	symbols: BREDSymbols;
	util: BREDUtils;
	plugins: []
}

interface Window {
	ED: BRED;
	req: Webpack.Require;
	findModule: (prop: string) => any;
}

declare const ED: BRED;
declare const findModule: (prop: string) => Webpack.ModuleExports | null;
declare const req: Webpack.Require;