import { c as create_ssr_component, a as subscribe, e as each, b as add_attribute, d as escape, v as validate_component, n as null_to_empty } from "../../chunks/ssr.js";
/* empty css                */import { p as page } from "../../chunks/stores.js";
import { b as base } from "../../chunks/paths.js";
import { a as authStore, i as initAuth } from "../../chunks/authStore.js";
import { w as writable } from "../../chunks/index.js";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const goto = /* @__PURE__ */ client_method("goto");
const LogoutModal_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "@keyframes svelte-npq1kw-fade-in{from{opacity:0}to{opacity:1}}@keyframes svelte-npq1kw-zoom-in-95{from{transform:scale(0.95);opacity:0}to{transform:scale(1);opacity:1}}",
  map: null
};
const LogoutModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isVisible = false } = $$props;
  if ($$props.isVisible === void 0 && $$bindings.isVisible && isVisible !== void 0)
    $$bindings.isVisible(isVisible);
  $$result.css.add(css$2);
  return `${isVisible ? ` <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-opacity duration-300" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="logout-modal-title"> <div class="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100 w-full max-w-md transform transition-all duration-300" role="document"> <div class="flex justify-center mb-6" data-svelte-h="svelte-tjrnf9"><div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center"><span class="material-symbols-outlined text-red-500 text-2xl">logout</span></div></div>  <div class="text-center mb-8" data-svelte-h="svelte-1oidpqm"><h2 id="logout-modal-title" class="text-xl font-bold text-slate-800 mb-2">确认登出</h2> <p class="text-slate-500">您确定要退出当前账号吗？</p> <p class="text-slate-400 text-sm mt-2">退出后需要重新登录才能访问系统</p></div>  <div class="flex space-x-4"> <button class="flex-1 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200" data-svelte-h="svelte-zv0gyl">取消</button>  <button class="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow" data-svelte-h="svelte-1q28mlb">确认登出</button></div></div></div>` : ``}`;
});
function getInitials(name) {
  return name.charAt(0).toUpperCase();
}
const SideNavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPath;
  let isActive;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const navItems = [
    {
      id: "dashboard",
      label: "仪表盘",
      icon: "dashboard",
      href: `${base}/`
    },
    {
      id: "modules",
      label: "模块",
      icon: "inventory_2",
      href: `${base}/questionnaire`
    },
    {
      id: "report",
      label: "报告",
      icon: "summarize",
      href: `${base}/report`
    }
  ];
  const userInfo = { name: "Alex Chen", role: "首席架构师" };
  let showLogoutModal = false;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    currentPath = $page.url.pathname;
    isActive = (item) => {
      if (item.href === `${base}/`) {
        return currentPath === `${base}/`;
      } else if (item.href === `${base}/questionnaire`) {
        return currentPath === `${base}/questionnaire` || currentPath.startsWith(`${base}/questionnaire/`);
      } else {
        return currentPath === item.href || currentPath.startsWith(item.href + "/");
      }
    };
    $$rendered = `<aside class="hidden md:flex flex-col h-screen w-64 lg:w-80 fixed left-0 top-0 bg-slate-50 border-r border-slate-200/15 z-[60] py-6 overflow-y-auto transition-all duration-300"><div class="px-6 mb-8" data-svelte-h="svelte-t2keai"><div class="text-xl font-bold text-blue-800">精准架构师</div> <div class="text-xs text-secondary mt-1 font-medium">需求管理器</div></div> <nav class="flex-1 space-y-1 px-4">${each(navItems, (item) => {
      return `<a${add_attribute(
        "class",
        `flex items-center space-x-3 px-3 py-2 transition-colors duration-300 ${isActive(item) ? "text-blue-700 font-semibold border-r-4 border-blue-600 bg-slate-200" : "text-slate-600 hover:bg-slate-200"}`,
        0
      )}${add_attribute("href", item.href, 0)}><span class="material-symbols-outlined">${escape(item.icon)}</span> <span class="text-sm font-label">${escape(item.label)}</span> </a>`;
    })}</nav> <div class="px-4 pt-4 border-t border-slate-200/30"><div class="flex items-center space-x-3 px-3 py-2 mb-4"> <div class="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-sm shadow-md">${escape(getInitials(userInfo.name))}</div> <div class="overflow-hidden"><span class="text-xs font-bold truncate text-on-surface">${escape(userInfo.name)}</span> <span class="text-[10px] text-secondary">${escape(userInfo.role)}</span></div></div> <a${add_attribute(
      "class",
      `flex items-center space-x-3 px-3 py-2 transition-colors duration-300 ${currentPath === `${base}/settings` || currentPath.startsWith(`${base}/settings/`) ? "text-blue-700 font-semibold border-r-4 border-blue-600 bg-slate-200" : "text-slate-600 hover:bg-slate-200"}`,
      0
    )} href="${"$" + escape(base, true) + "/settings"}"><span class="material-symbols-outlined" data-svelte-h="svelte-asg9my">settings</span> <span class="text-sm font-label" data-svelte-h="svelte-klhvzz">系统设置</span></a> <a${add_attribute(
      "class",
      `flex items-center space-x-3 px-3 py-2 transition-colors duration-300 ${currentPath === `${base}/support` || currentPath.startsWith(`${base}/support/`) ? "text-blue-700 font-semibold border-r-4 border-blue-600 bg-slate-200" : "text-slate-600 hover:bg-slate-200"}`,
      0
    )} href="${"$" + escape(base, true) + "/support"}"><span class="material-symbols-outlined" data-svelte-h="svelte-14m2008">help</span> <span class="text-sm font-label" data-svelte-h="svelte-1k09y9o">帮助与支持</span></a>  <button class="w-full flex items-center space-x-3 px-3 py-2 transition-colors duration-300 text-slate-600 hover:bg-slate-200 hover:text-red-600" data-svelte-h="svelte-3i8gsr"><span class="material-symbols-outlined">logout</span> <span class="text-sm font-label">登出</span></button></div></aside>  ${validate_component(LogoutModal, "LogoutModal").$$render(
      $$result,
      { isVisible: showLogoutModal },
      {
        isVisible: ($$value) => {
          showLogoutModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
const TopNavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPath;
  let breadcrumbs;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  authStore.subscribe((state) => {
    state.user;
  });
  function generateBreadcrumbs(path) {
    const parts = path.split("/").filter((part) => part);
    const breadcrumbs2 = [{ label: "仪表盘", href: `${base}/` }];
    if (parts.length === 0) {
      breadcrumbs2[0].isActive = true;
      return breadcrumbs2;
    }
    let currentPath2 = "";
    parts.forEach((part, index) => {
      currentPath2 += `/${part}`;
      let label = part;
      switch (part) {
        case "questionnaire":
          label = "模块";
          break;
        case "project-core":
          label = "项目核心";
          break;
        case "technical":
          label = "技术层面";
          break;
        case "logistics":
          label = "后勤规划";
          break;
        case "report":
          label = "报告";
          break;
        case "settings":
          label = "系统设置";
          break;
        case "support":
          label = "帮助与支持";
          break;
      }
      breadcrumbs2.push({
        label,
        href: currentPath2,
        isActive: index === parts.length - 1
      });
    });
    return breadcrumbs2;
  }
  currentPath = $page.url.pathname;
  breadcrumbs = generateBreadcrumbs(currentPath);
  $$unsubscribe_page();
  return `<header class="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-slate-200/15 shadow-sm flex justify-between items-center w-full px-8 h-16 transition-all duration-300 ease-in-out"><div class="flex items-center gap-8"><span class="text-lg font-black tracking-tight text-blue-700" data-svelte-h="svelte-ai9qpy">项目蓝图</span> <div class="hidden lg:flex items-center bg-surface-container-low rounded-full px-4 py-1.5 border border-outline-variant/10" data-svelte-h="svelte-1rjqx03"><span class="material-symbols-outlined text-slate-400 text-xl mr-2">search</span> <input class="bg-transparent border-none text-sm focus:ring-0 p-0 w-64 placeholder:text-slate-400" placeholder="搜索需求..." type="text"></div>  <div class="hidden md:flex items-center gap-2 ml-4 text-sm">${each(breadcrumbs, (breadcrumb, index) => {
    return `${index > 0 ? `<span class="material-symbols-outlined text-xs text-secondary" data-svelte-h="svelte-k0b6eh">chevron_right</span>` : ``} ${breadcrumb.isActive ? `<span class="text-on-surface font-medium">${escape(breadcrumb.label)}</span>` : `<a${add_attribute("href", breadcrumb.href, 0)} class="text-secondary hover:text-primary transition-colors">${escape(breadcrumb.label)}</a>`}`;
  })}</div></div> <div class="flex items-center gap-4" data-svelte-h="svelte-m0d8yz"><div class="flex items-center gap-3 ml-2 border-l border-slate-200/30 pl-4"><span class="material-symbols-outlined text-slate-500 cursor-pointer hover:text-primary transition-colors">notifications</span>  </div></div></header>`;
});
const MobileNavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const currentPath = $page.url.pathname;
  const navItems = [
    {
      id: "dashboard",
      label: "核心",
      icon: "dashboard",
      href: `${base}/`
    },
    {
      id: "modules",
      label: "模块",
      icon: "layers",
      href: `${base}/questionnaire`
    },
    {
      id: "report",
      label: "报告",
      icon: "assessment",
      href: `${base}/report`
    },
    {
      id: "settings",
      label: "设置",
      icon: "settings",
      href: `${base}/settings`
    }
  ];
  $$unsubscribe_page();
  return `<nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/20 px-6 py-3 flex justify-between items-center z-[100]">${each(navItems, (item) => {
    return `<button${add_attribute(
      "class",
      `flex flex-col items-center gap-1 ${currentPath.includes(item.id) ? "text-primary" : "text-slate-400"}`,
      0
    )}><span class="material-symbols-outlined">${escape(item.icon)}</span> <span class="text-[10px] font-bold">${escape(item.label)}</span> </button>`;
  })} </nav>`;
});
const Loading_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "@keyframes svelte-1l6u60s-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes svelte-1l6u60s-pulse{0%,100%{opacity:1}50%{opacity:0.5}}.animate-spin.svelte-1l6u60s{animation:svelte-1l6u60s-spin 1s linear infinite}.animate-pulse.svelte-1l6u60s{animation:svelte-1l6u60s-pulse 1.5s ease-in-out infinite}",
  map: null
};
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isLoading = false } = $$props;
  let { message = "加载中..." } = $$props;
  let { fullscreen = true } = $$props;
  if ($$props.isLoading === void 0 && $$bindings.isLoading && isLoading !== void 0)
    $$bindings.isLoading(isLoading);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.fullscreen === void 0 && $$bindings.fullscreen && fullscreen !== void 0)
    $$bindings.fullscreen(fullscreen);
  $$result.css.add(css$1);
  return `${isLoading ? `<div class="${escape(
    null_to_empty(`${fullscreen ? "fixed inset-0 z-50 flex items-center justify-center bg-surface/80 backdrop-blur-sm" : "flex items-center justify-center"}`),
    true
  ) + " svelte-1l6u60s"}"><div class="relative"> <div class="w-16 h-16 md:w-20 md:h-20 relative" data-svelte-h="svelte-1ne9dho"><div class="absolute inset-0 rounded-full border-4 border-primary/20"></div> <div class="absolute inset-0 rounded-full border-4 border-t-primary animate-spin svelte-1l6u60s"></div> <div class="absolute inset-2 rounded-full border-4 border-tertiary/30"></div></div>  ${message ? `<div class="mt-6 text-center"><p class="text-on-surface font-medium">${escape(message)}</p> <div class="mt-2 flex justify-center space-x-1">${each([1, 2, 3], (dot, index) => {
    return `<div class="w-2 h-2 rounded-full bg-primary animate-pulse svelte-1l6u60s" style="${"animation-delay: " + escape(index * 0.2, true) + "s"}"></div>`;
  })}</div></div>` : ``}</div></div>` : ``}`;
});
const createLoadingStore = () => {
  const { set, update, subscribe: subscribe2 } = writable({
    isLoading: false,
    message: "加载中...",
    fullscreen: true
  });
  return {
    subscribe: subscribe2,
    show: (message = "加载中...", fullscreen = true) => {
      set({ isLoading: true, message, fullscreen });
    },
    hide: () => {
      set({ isLoading: false, message: "加载中...", fullscreen: true });
    }
  };
};
const loadingStore = createLoadingStore();
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "@media(min-width: 768px){.md\\:ml-64{margin-left:16rem}@media(min-width: 1280px){.md\\:ml-64{margin-left:20rem}}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let isLoading = false;
  let loadingMessage = "加载中...";
  let fullscreen = true;
  let isLoggedIn = false;
  authStore.subscribe((state) => {
    isLoggedIn = state.isLoggedIn;
  });
  loadingStore.subscribe((state) => {
    isLoading = state.isLoading;
    loadingMessage = state.message;
    fullscreen = state.fullscreen;
  });
  if (typeof window !== "undefined") {
    initAuth();
  }
  $$result.css.add(css);
  {
    if (typeof window !== "undefined") {
      const currentPath = $page.url.pathname;
      if (currentPath !== "/login") {
        setTimeout(
          () => {
            if (!isLoggedIn) {
              goto("/login");
            }
          },
          100
        );
      }
    }
  }
  $$unsubscribe_page();
  return ` ${isLoggedIn ? ` <div class="flex overflow-hidden min-h-screen bg-surface text-on-surface"> ${validate_component(SideNavBar, "SideNavBar").$$render($$result, {}, {}, {})}  <div class="flex-1 flex flex-col min-w-0 relative md:ml-64"> ${validate_component(TopNavBar, "TopNavBar").$$render($$result, {}, {}, {})}  <main class="flex-1 overflow-y-auto bg-surface p-6 md:p-12 pt-8">${slots.default ? slots.default({}) : ``}</main></div>  ${validate_component(MobileNavBar, "MobileNavBar").$$render($$result, {}, {}, {})}  <div class="fixed top-0 right-0 -z-10 w-1/3 h-1/2 bg-blue-50/50 dark:bg-blue-900/20 rounded-bl-[100%] blur-3xl opacity-50 pointer-events-none"></div> <div class="fixed bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-slate-100/50 dark:bg-slate-800/20 rounded-tr-[100%] blur-3xl opacity-50 pointer-events-none"></div>  ${validate_component(Loading, "Loading").$$render(
    $$result,
    {
      isLoading,
      message: loadingMessage,
      fullscreen
    },
    {},
    {}
  )}</div>` : ` <div class="min-h-screen">${slots.default ? slots.default({}) : ``}</div>`}`;
});
export {
  Layout as default
};
