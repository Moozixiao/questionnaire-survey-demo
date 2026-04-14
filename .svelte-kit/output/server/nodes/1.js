

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ad2bdead.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js","_app/immutable/chunks/stores.a58b99e6.js","_app/immutable/chunks/singletons.f4121284.js","_app/immutable/chunks/index.1dbeafb7.js","_app/immutable/chunks/paths.4d27b364.js"];
export const stylesheets = [];
export const fonts = [];
