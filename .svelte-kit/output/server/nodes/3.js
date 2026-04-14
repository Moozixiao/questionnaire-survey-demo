

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.39c3553d.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js"];
export const stylesheets = [];
export const fonts = [];
