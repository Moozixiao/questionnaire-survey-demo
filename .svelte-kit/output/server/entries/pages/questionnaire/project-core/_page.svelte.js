import { c as create_ssr_component, v as validate_component, d as escape, e as each, b as add_attribute } from "../../../../chunks/ssr.js";
import { P as ProgressBar } from "../../../../chunks/ProgressBar.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentQuestion;
  let progress;
  let isFirstQuestion;
  let isLastQuestion;
  const questions = [
    {
      id: "Q1",
      text: "目标主平台是什么？",
      type: "single",
      options: [
        {
          id: "web",
          label: "网页端",
          description: "具有全球覆盖能力的响应式浏览器端应用程序。"
        },
        {
          id: "mobile",
          label: "移动端",
          description: "集成了设备功能的原生 iOS 和 Android 体验。"
        },
        {
          id: "desktop",
          label: "桌面端",
          description: "面向专业用户的独立操作系统特定安装程序。"
        },
        {
          id: "cross",
          label: "跨平台",
          description: "在所有数字接触点上共享的代码库。"
        }
      ],
      isMandatory: true
    },
    {
      id: "Q2",
      text: "项目的主要目标是什么？",
      type: "single",
      options: [
        {
          id: "new",
          label: "新产品开发",
          description: "创建全新的产品或服务"
        },
        {
          id: "improve",
          label: "现有系统改进",
          description: "优化和增强现有系统"
        },
        {
          id: "migrate",
          label: "系统迁移",
          description: "从旧系统迁移到新系统"
        },
        {
          id: "integrate",
          label: "系统集成",
          description: "整合多个系统或服务"
        }
      ],
      isMandatory: true
    },
    {
      id: "Q3",
      text: "项目的预期规模如何？",
      type: "single",
      options: [
        {
          id: "small",
          label: "小型",
          description: "1-5人团队，3个月内完成"
        },
        {
          id: "medium",
          label: "中型",
          description: "5-15人团队，3-6个月完成"
        },
        {
          id: "large",
          label: "大型",
          description: "15+人团队，6个月以上"
        }
      ],
      isMandatory: false
    }
  ];
  let currentQuestionIndex = 0;
  let selectedOption = "";
  currentQuestion = questions[currentQuestionIndex];
  progress = Math.round((currentQuestionIndex + 1) / questions.length * 100);
  isFirstQuestion = currentQuestionIndex === 0;
  isLastQuestion = currentQuestionIndex === questions.length - 1;
  return `<div class="max-w-7xl mx-auto"> <div class="mb-12">${validate_component(ProgressBar, "ProgressBar").$$render($$result, { progress, label: "模块 01" }, {}, {})} <h1 class="text-4xl font-extrabold text-on-surface mt-8" data-svelte-h="svelte-h9vay9">项目核心</h1></div>  <div class="space-y-8"> <div class="bg-surface-container-lowest rounded-2xl p-8 md:p-12 relative overflow-hidden transition-all duration-300"> <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div> <div class="flex flex-col gap-8"><header><span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 inline-block" data-svelte-h="svelte-1am84vy">初始定义</span> <h2 class="text-2xl md:text-3xl font-bold text-on-surface leading-tight">问题 ${escape(currentQuestionIndex + 1)}：${escape(currentQuestion.text)}</h2> <p class="text-secondary mt-3 text-lg leading-relaxed">${escape(
    "定义部署目标可确保我们根据正确的运行时环境和性能约束进行架构设计。"
  )}</p> ${currentQuestion.isMandatory ? `<span class="inline-flex items-center gap-1 text-xs text-error mt-2" data-svelte-h="svelte-jtc77r"><span class="material-symbols-outlined text-xs">error</span>
							必填项</span>` : ``}</header>  ${``}  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${each(currentQuestion.options, (option) => {
    return `<button${add_attribute(
      "class",
      `group relative flex items-start gap-4 p-5 rounded-xl text-left transition-all duration-300 ${selectedOption === option.id ? "bg-primary ring-2 ring-primary ring-offset-4 ring-offset-surface-container-lowest" : "bg-surface-container-low hover:bg-surface-bright border border-transparent hover:border-outline-variant/30"}`,
      0
    )}><div${add_attribute(
      "class",
      `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedOption === option.id ? "bg-white/20" : "bg-secondary/10 group-hover:bg-primary/10 transition-colors"}`,
      0
    )}><span class="${"material-symbols-outlined $" + escape(
      selectedOption === option.id ? "text-white" : "text-secondary group-hover:text-primary",
      true
    )}">${escape(
      option.id === "web" ? "language" : option.id === "mobile" ? "smartphone" : option.id === "desktop" ? "desktop_windows" : "devices_other"
    )} </span></div> <div><h3${add_attribute(
      "class",
      `font-bold text-lg ${selectedOption === option.id ? "text-white" : "text-on-surface"}`,
      0
    )}>${escape(option.label)}</h3> <p${add_attribute(
      "class",
      `text-sm mt-1 ${selectedOption === option.id ? "text-white/80" : "text-secondary"}`,
      0
    )}>${escape(option.description)}</p></div> ${selectedOption === option.id ? `<div class="absolute top-4 right-4 text-white" data-svelte-h="svelte-cq4veu"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span> </div>` : ``} </button>`;
  })}</div></div></div>  <div class="flex items-center justify-between pt-8 border-t border-outline-variant/10"><button${add_attribute(
    "class",
    `flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-colors ${isFirstQuestion ? "text-outline-variant cursor-not-allowed opacity-50" : "text-secondary hover:bg-surface-container-high"}`,
    0
  )} ${isFirstQuestion ? "disabled" : ""}><span class="material-symbols-outlined" data-svelte-h="svelte-nqs1va">arrow_back</span> <span data-svelte-h="svelte-1t20php">上一步</span></button> <div class="flex items-center gap-4"> ${!currentQuestion.isMandatory ? `<button class="bg-surface-container-high text-on-surface font-semibold px-8 py-3 rounded-xl hover:brightness-95 transition-all" data-svelte-h="svelte-xse7os">跳过</button>` : ``}  <button class="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold px-12 py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] transition-transform"><span>${escape(isLastQuestion ? "提交" : "下一步")}</span> <span class="material-symbols-outlined">${escape(isLastQuestion ? "check" : "arrow_forward")}</span></button></div></div></div>  <div class="mt-20 flex flex-col items-center gap-6 text-center" data-svelte-h="svelte-bt8ppc"><div class="w-16 h-1 bg-surface-container rounded-full"></div> <p class="text-secondary text-xs font-medium max-w-sm">每个回答都会自动保存到活动工作区。您可以稍后在“技术层面”模块中调整这些核心设置。</p></div></div>`;
});
export {
  Page as default
};
