

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.af7d79ef.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js","_app/immutable/chunks/stores.c7f51872.js","_app/immutable/chunks/singletons.29c959af.js","_app/immutable/chunks/index.1dbeafb7.js","_app/immutable/chunks/paths.17d88947.js"];
export const stylesheets = [];
export const fonts = [];
