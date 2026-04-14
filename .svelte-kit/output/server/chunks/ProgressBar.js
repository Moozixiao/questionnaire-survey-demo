import { c as create_ssr_component, d as escape } from "./ssr.js";
const ProgressBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { progress = 0 } = $$props;
  let { label = "" } = $$props;
  if ($$props.progress === void 0 && $$bindings.progress && progress !== void 0)
    $$bindings.progress(progress);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `<div class="mb-6">${label ? `<div class="flex items-end justify-between mb-2"><span class="text-primary font-bold text-sm tracking-widest font-label uppercase">${escape(label)}</span> <span class="text-2xl font-black text-primary">${escape(Math.round(progress))}%</span></div>` : ``} <div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden"><div class="h-full bg-primary transition-all duration-700 ease-out" style="${"width: " + escape(progress, true) + "%"}"></div></div></div>`;
});
export {
  ProgressBar as P
};
