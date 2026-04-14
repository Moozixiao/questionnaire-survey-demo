

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.6de9994b.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js"];
export const stylesheets = ["_app/immutable/assets/app.29f32b9b.css"];
export const fonts = [];
