

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.d5dbb1ce.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js","_app/immutable/chunks/navigation.453e4b30.js","_app/immutable/chunks/singletons.29c959af.js","_app/immutable/chunks/index.1dbeafb7.js","_app/immutable/chunks/paths.17d88947.js","_app/immutable/chunks/authStore.7949ffa9.js"];
export const stylesheets = [];
export const fonts = [];
