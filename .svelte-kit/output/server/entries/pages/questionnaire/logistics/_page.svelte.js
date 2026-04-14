import { c as create_ssr_component, v as validate_component, d as escape, b as add_attribute, e as each } from "../../../../chunks/ssr.js";
import { P as ProgressBar } from "../../../../chunks/ProgressBar.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentQuestion;
  let progress;
  let isFirstQuestion;
  let isLastQuestion;
  const questions = [
    {
      id: "Q7",
      text: "项目的预计开始日期",
      type: "date",
      isMandatory: true
    },
    {
      id: "Q8",
      text: "目标上线日期",
      type: "date",
      isMandatory: true
    },
    {
      id: "Q9",
      text: "项目团队规模",
      type: "single",
      options: [
        {
          id: "small",
          label: "小型团队",
          description: "1-5人"
        },
        {
          id: "medium",
          label: "中型团队",
          description: "6-15人"
        },
        {
          id: "large",
          label: "大型团队",
          description: "16人以上"
        }
      ],
      isMandatory: false
    }
  ];
  let currentQuestionIndex = 0;
  let selectedDate = "";
  let selectedOption = "";
  currentQuestion = questions[currentQuestionIndex];
  progress = Math.round((currentQuestionIndex + 1) / questions.length * 100);
  isFirstQuestion = currentQuestionIndex === 0;
  isLastQuestion = currentQuestionIndex === questions.length - 1;
  return `<div class="max-w-7xl mx-auto"> <div class="mb-12">${validate_component(ProgressBar, "ProgressBar").$$render($$result, { progress, label: "模块 03" }, {}, {})} <h1 class="text-4xl font-extrabold text-on-surface mt-8" data-svelte-h="svelte-1fk3c6j">后勤规划</h1></div>  <div class="space-y-8"> <div class="bg-surface-container-lowest rounded-2xl p-8 md:p-12 relative overflow-hidden transition-all duration-300"> <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary"></div> <div class="flex flex-col gap-8"><header><span class="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 inline-block" data-svelte-h="svelte-1ta0o8n">时间规划</span> <h2 class="text-2xl md:text-3xl font-bold text-on-surface leading-tight">问题 ${escape(currentQuestionIndex + 7)}：${escape(currentQuestion.text)}</h2> <p class="text-secondary mt-3 text-lg leading-relaxed">${escape(
    "确定项目开始日期有助于我们制定初步的项目计划。"
  )}</p> ${currentQuestion.isMandatory ? `<span class="inline-flex items-center gap-1 text-xs text-error mt-2" data-svelte-h="svelte-jtc77r"><span class="material-symbols-outlined text-xs">error</span>
							必填项</span>` : ``}</header>  ${``}  ${currentQuestion.type === "date" ? ` <div class="bg-surface-container p-6 rounded-xl"><input type="date" class="w-full p-4 border border-outline-variant rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-colors"${add_attribute("value", selectedDate, 0)}> <p class="text-secondary text-sm mt-2">${escape(
    "请选择项目计划开始的日期"
  )}</p></div>` : ` <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${each(currentQuestion.options, (option) => {
    return `<button${add_attribute(
      "class",
      `group relative flex items-start gap-4 p-5 rounded-xl text-left transition-all duration-300 ${selectedOption === option.id ? "bg-tertiary ring-2 ring-tertiary ring-offset-4 ring-offset-surface-container-lowest" : "bg-surface-container-low hover:bg-surface-bright border border-transparent hover:border-outline-variant/30"}`,
      0
    )}><div${add_attribute(
      "class",
      `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedOption === option.id ? "bg-white/20" : "bg-tertiary/10 group-hover:bg-tertiary/20 transition-colors"}`,
      0
    )}><span class="${"material-symbols-outlined $" + escape(
      selectedOption === option.id ? "text-white" : "text-tertiary group-hover:text-tertiary",
      true
    )}">${escape(option.id === "small" ? "person" : option.id === "medium" ? "group" : "groups")} </span></div> <div><h3${add_attribute(
      "class",
      `font-bold text-lg ${selectedOption === option.id ? "text-white" : "text-on-surface"}`,
      0
    )}>${escape(option.label)}</h3> <p${add_attribute(
      "class",
      `text-sm mt-1 ${selectedOption === option.id ? "text-white/80" : "text-secondary"}`,
      0
    )}>${escape(option.description)}</p></div> ${selectedOption === option.id ? `<div class="absolute top-4 right-4 text-white" data-svelte-h="svelte-a571m0"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span> </div>` : ``} </button>`;
  })}</div>`}</div></div>  <div class="flex items-center justify-between pt-8 border-t border-outline-variant/10"><button${add_attribute(
    "class",
    `flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-colors ${isFirstQuestion ? "text-outline-variant cursor-not-allowed opacity-50" : "text-secondary hover:bg-surface-container-high"}`,
    0
  )} ${isFirstQuestion ? "disabled" : ""}><span class="material-symbols-outlined" data-svelte-h="svelte-nqs1va">arrow_back</span> <span data-svelte-h="svelte-1t20php">上一步</span></button> <div class="flex items-center gap-4"> ${!currentQuestion.isMandatory ? `<button class="bg-surface-container-high text-on-surface font-semibold px-8 py-3 rounded-xl hover:brightness-95 transition-all" data-svelte-h="svelte-xse7os">跳过</button>` : ``}  <button class="bg-gradient-to-r from-tertiary to-tertiary-container text-on-tertiary font-bold px-12 py-3 rounded-xl shadow-lg shadow-tertiary/20 flex items-center gap-2 hover:scale-[1.02] transition-transform"><span>${escape(isLastQuestion ? "完成" : "下一步")}</span> <span class="material-symbols-outlined">${escape(isLastQuestion ? "check_circle" : "arrow_forward")}</span></button></div></div></div>  <div class="mt-20 flex flex-col items-center gap-6 text-center" data-svelte-h="svelte-14u85hp"><div class="w-16 h-1 bg-surface-container rounded-full"></div> <p class="text-secondary text-xs font-medium max-w-sm">每个回答都会自动保存到活动工作区。完成所有模块后，您可以查看生成的需求报告。</p></div></div>`;
});
export {
  Page as default
};
