

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.b291e8ba.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/paths.5335c1ec.js","_app/immutable/chunks/index.1dbeafb7.js"];
export const stylesheets = [];
export const fonts = [];
