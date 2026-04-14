import { c as create_ssr_component, a as subscribe, e as each, d as escape, b as add_attribute } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index.js";
const defaultTheme = {
  mode: "system",
  custom: {
    primaryColor: "#3b82f6",
    // 蓝色
    fontSize: "medium",
    spacing: "default"
  }
};
function loadTheme() {
  if (typeof localStorage !== "undefined") {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return JSON.parse(savedTheme);
      }
    } catch (error) {
      console.error("Failed to load theme settings:", error);
    }
  }
  return defaultTheme;
}
const themeStore = writable(loadTheme());
if (typeof localStorage !== "undefined") {
  themeStore.subscribe((theme) => {
    try {
      localStorage.setItem("theme", JSON.stringify(theme));
    } catch (error) {
      console.error("Failed to save theme settings:", error);
    }
  });
}
function applyTheme(theme) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("light", "dark");
    let currentMode;
    if (theme.mode === "system" && typeof window !== "undefined") {
      currentMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      currentMode = theme.mode;
    }
    document.documentElement.classList.add(currentMode);
    applyCustomSettings(theme.custom);
  }
}
function applyCustomSettings(custom) {
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--primary-color", custom.primaryColor);
    document.documentElement.classList.remove("text-sm", "text-base", "text-lg");
    switch (custom.fontSize) {
      case "small":
        document.documentElement.classList.add("text-sm");
        break;
      case "large":
        document.documentElement.classList.add("text-lg");
        break;
      default:
        document.documentElement.classList.add("text-base");
    }
    document.documentElement.classList.remove("space-compact", "space-default", "space-comfortable");
    document.documentElement.classList.add(`space-${custom.spacing}`);
  }
}
if (typeof window !== "undefined") {
  themeStore.subscribe(applyTheme);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    themeStore.update((theme) => {
      if (theme.mode === "system") {
        applyTheme(theme);
      }
      return theme;
    });
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_themeStore;
  $$unsubscribe_themeStore = subscribe(themeStore, (value) => value);
  const settingsCategories = [
    {
      id: "account",
      title: "账户设置",
      icon: "account_circle",
      description: "管理您的账户信息和偏好设置",
      items: [
        {
          id: "profile",
          label: "个人资料",
          icon: "person",
          description: "更新您的个人信息和头像"
        },
        {
          id: "security",
          label: "安全设置",
          icon: "lock",
          description: "密码和安全选项"
        },
        {
          id: "notifications",
          label: "通知偏好",
          icon: "notifications",
          description: "管理通知和提醒设置"
        }
      ]
    },
    {
      id: "preferences",
      title: "偏好设置",
      icon: "tune",
      description: "自定义应用的外观和行为",
      items: [
        {
          id: "appearance",
          label: "外观主题",
          icon: "palette",
          description: "选择深色或浅色主题"
        },
        {
          id: "language",
          label: "语言设置",
          icon: "language",
          description: "选择界面语言"
        },
        {
          id: "accessibility",
          label: "无障碍功能",
          icon: "accessibility",
          description: "辅助功能选项"
        }
      ]
    },
    {
      id: "data",
      title: "数据管理",
      icon: "storage",
      description: "管理您的数据和存储选项",
      items: [
        {
          id: "storage",
          label: "存储管理",
          icon: "folder",
          description: "查看和管理存储空间"
        },
        {
          id: "backup",
          label: "备份与恢复",
          icon: "backup",
          description: "数据备份和恢复选项"
        },
        {
          id: "export",
          label: "数据导出",
          icon: "download",
          description: "导出您的数据"
        }
      ]
    }
  ];
  let selectedCategory = settingsCategories[0];
  $$unsubscribe_themeStore();
  return `<div class="max-w-7xl mx-auto"> <div class="mb-8" data-svelte-h="svelte-93x4no"><h1 class="text-4xl font-extrabold text-on-surface tracking-tight">系统设置</h1> <p class="text-secondary mt-2 text-lg">管理您的账户、偏好和数据设置</p></div>  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div class="lg:col-span-1"><div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-slate-200/15"><h2 class="text-lg font-bold text-on-surface mb-4" data-svelte-h="svelte-16qof9j">设置分类</h2> <div class="space-y-2">${each(settingsCategories, (category) => {
    return `<button${add_attribute(
      "class",
      `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${selectedCategory.id === category.id ? "bg-primary text-white shadow-md" : "hover:bg-slate-100 text-slate-700"}`,
      0
    )}><span class="material-symbols-outlined">${escape(category.icon)}</span> <div class="text-left"><div class="font-semibold text-sm">${escape(category.title)}</div> <div class="text-xs opacity-80">${escape(category.description)}</div></div> </button>`;
  })}</div></div></div>  <div class="lg:col-span-2">${` <div class="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-slate-200/15"><h3 class="text-2xl font-bold text-on-surface mb-6">${escape(selectedCategory.title)}</h3> <p class="text-secondary mb-8">${escape(selectedCategory.description)}</p> <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${each(selectedCategory.items, (item) => {
    return `<button class="flex items-start gap-4 p-5 rounded-xl text-left transition-all duration-200 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 hover:shadow-md"><div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10"><span class="material-symbols-outlined text-primary">${escape(item.icon)}</span></div> <div><h4 class="font-bold text-on-surface">${escape(item.label)}</h4> <p class="text-sm text-secondary mt-1">${escape(item.description)}</p></div> <span class="material-symbols-outlined text-slate-400 ml-auto" data-svelte-h="svelte-1ago8xq">chevron_right</span> </button>`;
  })}</div></div>`}</div></div></div>`;
});
export {
  Page as default
};
