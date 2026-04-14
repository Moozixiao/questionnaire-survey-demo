

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/questionnaire/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.461def75.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js","_app/immutable/chunks/paths.4d27b364.js"];
export const stylesheets = [];
export const fonts = [];
