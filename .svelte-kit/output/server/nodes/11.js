

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/support/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/11.a53d6671.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = [];
export const fonts = [];
