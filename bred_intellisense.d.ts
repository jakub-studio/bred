declare interface AbsolutePath extends String { }
declare interface RelativePath extends String { }
declare type BuiltInNodeJSModule = 'assert' | 'async_hooks' | 'buffer' | 'child_process' | 'cluster' | 'crypto' | 'dgram' | 'dns' | 'domain' | 'events' | 'fs' | 'http' | 'http2' | 'https' | 'net' | 'os' | 'path' | 'perf_hooks' | 'punycode' | 'querystring' | 'readline' | 'repl' | 'stream' | 'string_decoder' | 'tls' | 'trace_events' | 'tty' | 'url' | 'util' | 'v8' | 'vm' | 'zlib';

declare namespace React {
	export interface ReactModule {
		Children: {
			count: Function;
			forEach: Function;
			map: Function;
			only: Function;
			toArray: Function;
		};
		Component: Component;
		Fragment: symbol;
		PureComponent: Component;
		StrictMode: symbol;
		cloneElement: Function;
		createContext: Function;
		createElement: (element: ValidComponentType, props: {}, ...children: ValidComponentType[]) => Render;
		createFactory: Function;
		createRef: () => Ref;
		forwardRef: Function;
		isValidElement: Function;
		unstable_AsyncMode: symbol;
		unstable_Profiler: symbol;
		version: string;
		__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {}
	}
	export interface ReactDOMModule {
		createPortal: Function;
		findDOMNode: Function;
		flushSync: Function;
		hydrate: Function;
		render: (component: Render, target: HTMLElement, callback: Function) => void;
		unmountComponentAtNode: (target: HTMLElement) => boolean;
	}
	export class Component {
		constructor(props?: {});
		prototype: {
			render: () => Render;
			componentDidMount?: Function;
			shouldComponentUpdate?: Function;
			componentWillUnmount?: Function;
			componentDidCatch?: Function;
			componentDidUpdate?: Function;
			getSnapshotBeforeUpdate?: Function;
			componentWillMount?: Function;
			componentWillReceiveProps?: Function;
			componentWillUpdate?: Function;
			// Discord do use unsafe methods
			UNSAFE_componentWillUpdate?: Function;
			UNSAFE_componentWillReceiveProps?: Function;
			UNSAFE_componentWillMount?: Function;
		}
		displayName?: string;
		propTypes?: {}
	}
	export type Render = {
		$$typeof: symbol;
		key: any;
		props: {
			children?: Render
		};
		ref?: Ref
		type: ValidComponentType
	};
	export type ValidComponentType = string | StatelessFunctionComponent | Component;
	export type Renderable =  StatelessFunctionComponent | Component;
	export type StatelessFunctionComponent = (props?: {}) => Render;
	export type Ref = {
		current: HTMLElement
	}
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
		(props: any): {}
		__esModule?: boolean
		default?: React.Renderable
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
	
	export type RawModule = (module: Webpack.Module, exports: Webpack.ModuleExports, require: Webpack.Require) => void;
}

declare namespace Discord {
	export interface WebSocketObject {
		state: {
			gateway: string;
			messages: MessageEvent[],
			open: boolean;
		}
		ws: WebSocket
	}
}

declare namespace BRED {
	export interface GlobalObject {
		/**The current version of BRED you are using. */
		version: string;
		versionParsed: ParsedVersion;
		/**The electron `BrowserWindow` class of Discord's main window. */
		discordBrowserWindow: any;
		discordWebSocket: Discord.WebSocketObject;
		paths: Paths;
		symbols: Symbols;
		util: Utilities;
		constants: Constants;
		saviour: "Indy"
		plugins: [];
		corePlugins: [];
		loaded: boolean;
	}
	export interface Paths {
		core: AbsolutePath;
		modules: AbsolutePath;
		components: AbsolutePath;
		structs: AbsolutePath;
		core_plugins: AbsolutePath;
		plugins: AbsolutePath;
		themes: AbsolutePath;
	}
	export interface Utilities {
		createNamedObject: (name: string, properties: object) => {
			[Symbol.toStringTag]: string;
		};
		formatString: (format: string, data: object) => string;
		requireDir: (dir: AbsolutePath) => Promise<any[]>;
		requireAsync: (id: AbsolutePath | RelativePath | BuiltInNodeJSModule, relativeRootPaths?: AbsolutePath[]) => Promise<any>;
		createRequireFunction: (mod: NodeJS.Module) => NodeRequire;
	}
	export interface Symbols {
		propName: symbol;
		patcher: symbol;
		pluginsArrInternal: symbol;
	}
	export interface ParsedVersion {
		channel: string;
		fork: string;
		version: string;
	}
	export interface Constants {
		[x: string]: string | number | Function | object;
		strings: {
			deprecationNotices: {
				[x: string]: string;
			}
		}
		errorMsgs: {
			[x: string]: string;
		}
		template: (template: string, data: object) => string;
		error: (template: string, data: object) => string;
	}
	export interface SharedApi {
		React: React.ReactModule;
		ReactDOM: React.ReactDOMModule;
	}
	export class PluginsArray extends Array {
		constructor(dir: AboslutePath);
	}
}

interface Window {
	ED: BRED.GlobalObject;
	req: Webpack.Require;
	findModule: (prop: string) => any;
}

declare const ED: BRED.GlobalObject;
declare const findModule: (prop: string) => Webpack.ModuleExports | null;
declare const req: Webpack.Require;