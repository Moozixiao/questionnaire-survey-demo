export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "questionnaire-survey-demo/_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.78b75e71.js","app":"_app/immutable/entry/app.40292b9a.js","imports":["_app/immutable/entry/start.78b75e71.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/singletons.f4121284.js","_app/immutable/chunks/index.1dbeafb7.js","_app/immutable/chunks/paths.4d27b364.js","_app/immutable/entry/app.40292b9a.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js"],"stylesheets":[],"fonts":[]},
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
