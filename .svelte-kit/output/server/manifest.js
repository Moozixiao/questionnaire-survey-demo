export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.435dc1e2.js","app":"_app/immutable/entry/app.4765333b.js","imports":["_app/immutable/entry/start.435dc1e2.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/singletons.f10e9114.js","_app/immutable/chunks/index.1dbeafb7.js","_app/immutable/chunks/paths.5335c1ec.js","_app/immutable/entry/app.4765333b.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
