import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.87e2f75c.js","_app/immutable/chunks/scheduler.f65c9d25.js","_app/immutable/chunks/index.eebda5b4.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/stores.bcfeb687.js","_app/immutable/chunks/singletons.f10e9114.js","_app/immutable/chunks/index.1dbeafb7.js","_app/immutable/chunks/paths.5335c1ec.js","_app/immutable/chunks/navigation.e44e5a97.js","_app/immutable/chunks/authStore.7949ffa9.js","_app/immutable/chunks/loadingStore.91bbacc3.js"];
export const stylesheets = ["_app/immutable/assets/0.b7e38415.css","_app/immutable/assets/app.29f32b9b.css"];
export const fonts = [];
