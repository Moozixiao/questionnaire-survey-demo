import { c as create_ssr_component, v as validate_component, d as escape, b as add_attribute, e as each } from "../../../../chunks/ssr.js";
import { P as ProgressBar } from "../../../../chunks/ProgressBar.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentQuestion;
  let progress;
  let isFirstQuestion;
  let isLastQuestion;
  const questions = [
    {
      id: "Q4",
      text: "是否有偏好的技术栈？",
      type: "boolean",
      isMandatory: true
    },
    {
      id: "Q5",
      text: "项目需要哪些集成服务？",
      type: "multiple",
      options: [
        {
          id: "auth",
          label: "身份验证",
          description: "用户登录和权限管理"
        },
        {
          id: "payment",
          label: "支付系统",
          description: "在线支付处理"
        },
        {
          id: "analytics",
          label: "数据分析",
          description: "用户行为和业务数据"
        },
        {
          id: "notifications",
          label: "通知系统",
          description: "邮件、短信等通知"
        }
      ],
      isMandatory: false
    },
    {
      id: "Q6",
      text: "对系统性能有特殊要求吗？",
      type: "single",
      options: [
        {
          id: "high",
          label: "高性能",
          description: "需要处理高并发和快速响应"
        },
        {
          id: "normal",
          label: "标准性能",
          description: "满足常规业务需求"
        },
        {
          id: "low",
          label: "低性能要求",
          description: "对性能要求不高"
        }
      ],
      isMandatory: true
    }
  ];
  let currentQuestionIndex = 0;
  let selectedOption = true;
  let selectedOptions = [];
  currentQuestion = questions[currentQuestionIndex];
  progress = Math.round((currentQuestionIndex + 1) / questions.length * 100);
  isFirstQuestion = currentQuestionIndex === 0;
  isLastQuestion = currentQuestionIndex === questions.length - 1;
  return `<div class="max-w-7xl mx-auto"> <div class="mb-12">${validate_component(ProgressBar, "ProgressBar").$$render($$result, { progress, label: "模块 02" }, {}, {})} <h1 class="text-4xl font-extrabold text-on-surface mt-8" data-svelte-h="svelte-1e4qcwk">技术层面</h1></div>  <div class="space-y-8"> <div class="bg-surface-container-lowest rounded-2xl p-8 md:p-12 relative overflow-hidden transition-all duration-300"> <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div> <div class="flex flex-col gap-8"><header><span class="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 inline-block" data-svelte-h="svelte-p0fwmk">技术选择</span> <h2 class="text-2xl md:text-3xl font-bold text-on-surface leading-tight">问题 ${escape(currentQuestionIndex + 4)}：${escape(currentQuestion.text)}</h2> <p class="text-secondary mt-3 text-lg leading-relaxed">${escape(
    "了解您的技术偏好有助于我们设计更符合您团队技能的解决方案。"
  )}</p> ${currentQuestion.isMandatory ? `<span class="inline-flex items-center gap-1 text-xs text-error mt-2" data-svelte-h="svelte-jtc77r"><span class="material-symbols-outlined text-xs">error</span>
							必填项</span>` : ``}</header>  ${``}  ${currentQuestion.type === "boolean" ? ` <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><button${add_attribute(
    "class",
    `flex items-center justify-center gap-4 p-8 rounded-xl text-center transition-all duration-300 ${"bg-secondary text-white ring-2 ring-secondary ring-offset-4 ring-offset-surface-container-lowest"}`,
    0
  )}><span class="material-symbols-outlined text-4xl" data-svelte-h="svelte-19d0wey">check_circle</span> <span class="text-xl font-bold" data-svelte-h="svelte-1r9rs1z">是</span></button> <button${add_attribute(
    "class",
    `flex items-center justify-center gap-4 p-8 rounded-xl text-center transition-all duration-300 ${"bg-surface-container-low hover:bg-surface-bright border border-transparent hover:border-outline-variant/30"}`,
    0
  )}><span class="material-symbols-outlined text-4xl" data-svelte-h="svelte-1dnmkl7">cancel</span> <span class="text-xl font-bold" data-svelte-h="svelte-1smh90i">否</span></button></div>` : `${currentQuestion.type === "multiple" ? ` <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${each(currentQuestion.options, (option) => {
    return `<button${add_attribute(
      "class",
      `group relative flex items-start gap-4 p-5 rounded-xl text-left transition-all duration-300 ${selectedOptions.includes(option.id) ? "bg-secondary ring-2 ring-secondary ring-offset-4 ring-offset-surface-container-lowest" : "bg-surface-container-low hover:bg-surface-bright border border-transparent hover:border-outline-variant/30"}`,
      0
    )}><div${add_attribute(
      "class",
      `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedOptions.includes(option.id) ? "bg-white/20" : "bg-secondary/10 group-hover:bg-secondary/20 transition-colors"}`,
      0
    )}><span class="${"material-symbols-outlined $" + escape(
      selectedOptions.includes(option.id) ? "text-white" : "text-secondary group-hover:text-secondary",
      true
    )}">${escape(option.id === "auth" ? "lock" : option.id === "payment" ? "payment" : option.id === "analytics" ? "analytics" : "notifications")} </span></div> <div><h3${add_attribute(
      "class",
      `font-bold text-lg ${selectedOptions.includes(option.id) ? "text-white" : "text-on-surface"}`,
      0
    )}>${escape(option.label)}</h3> <p${add_attribute(
      "class",
      `text-sm mt-1 ${selectedOptions.includes(option.id) ? "text-white/80" : "text-secondary"}`,
      0
    )}>${escape(option.description)}</p></div> ${selectedOptions.includes(option.id) ? `<div class="absolute top-4 right-4 text-white" data-svelte-h="svelte-a571m0"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span> </div>` : ``} </button>`;
  })}</div>` : ` <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${each(currentQuestion.options, (option) => {
    return `<button${add_attribute(
      "class",
      `group relative flex items-start gap-4 p-5 rounded-xl text-left transition-all duration-300 ${selectedOption === option.id ? "bg-secondary ring-2 ring-secondary ring-offset-4 ring-offset-surface-container-lowest" : "bg-surface-container-low hover:bg-surface-bright border border-transparent hover:border-outline-variant/30"}`,
      0
    )}><div${add_attribute(
      "class",
      `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedOption === option.id ? "bg-white/20" : "bg-secondary/10 group-hover:bg-secondary/20 transition-colors"}`,
      0
    )}><span class="${"material-symbols-outlined $" + escape(
      selectedOption === option.id ? "text-white" : "text-secondary group-hover:text-secondary",
      true
    )}">${escape(option.id === "high" ? "speed" : option.id === "normal" ? "schedule" : "low_priority")} </span></div> <div><h3${add_attribute(
      "class",
      `font-bold text-lg ${selectedOption === option.id ? "text-white" : "text-on-surface"}`,
      0
    )}>${escape(option.label)}</h3> <p${add_attribute(
      "class",
      `text-sm mt-1 ${selectedOption === option.id ? "text-white/80" : "text-secondary"}`,
      0
    )}>${escape(option.description)}</p></div> ${selectedOption === option.id ? `<div class="absolute top-4 right-4 text-white" data-svelte-h="svelte-a571m0"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span> </div>` : ``} </button>`;
  })}</div>`}`}</div></div>  <div class="flex items-center justify-between pt-8 border-t border-outline-variant/10"><button${add_attribute(
    "class",
    `flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-colors ${isFirstQuestion ? "text-outline-variant cursor-not-allowed opacity-50" : "text-secondary hover:bg-surface-container-high"}`,
    0
  )} ${isFirstQuestion ? "disabled" : ""}><span class="material-symbols-outlined" data-svelte-h="svelte-nqs1va">arrow_back</span> <span data-svelte-h="svelte-1t20php">上一步</span></button> <div class="flex items-center gap-4"> ${!currentQuestion.isMandatory ? `<button class="bg-surface-container-high text-on-surface font-semibold px-8 py-3 rounded-xl hover:brightness-95 transition-all" data-svelte-h="svelte-xse7os">跳过</button>` : ``}  <button class="bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-bold px-12 py-3 rounded-xl shadow-lg shadow-secondary/20 flex items-center gap-2 hover:scale-[1.02] transition-transform"><span>${escape(isLastQuestion ? "提交" : "下一步")}</span> <span class="material-symbols-outlined">${escape(isLastQuestion ? "check" : "arrow_forward")}</span></button></div></div></div>  <div class="mt-20 flex flex-col items-center gap-6 text-center" data-svelte-h="svelte-mghkx7"><div class="w-16 h-1 bg-surface-container rounded-full"></div> <p class="text-secondary text-xs font-medium max-w-sm">每个回答都会自动保存到活动工作区。您可以稍后在“后勤规划”模块中调整这些技术设置。</p></div></div>`;
});
export {
  Page as default
};
