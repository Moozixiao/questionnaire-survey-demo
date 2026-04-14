

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.0e21bd88.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js","_app/immutable/chunks/stores.bcfeb687.js","_app/immutable/chunks/singletons.f10e9114.js","_app/immutable/chunks/index.1dbeafb7.js","_app/immutable/chunks/paths.5335c1ec.js"];
export const stylesheets = [];
export const fonts = [];
