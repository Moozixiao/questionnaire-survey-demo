import { c as create_ssr_component } from "../../../chunks/ssr.js";
/* empty css                   */const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen">${slots.default ? slots.default({}) : ``} </div>`;
});
export {
  Layout as default
};
