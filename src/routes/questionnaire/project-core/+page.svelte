<script>
	import ProgressBar from '../../../components/layout/ProgressBar.svelte';
	import { loadingStore } from '../../../stores/loadingStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// 问卷数据
	const questions = [
		{
			id: 'Q1',
			text: '目标主平台是什么？',
			type: 'single',
			options: [
				{ id: 'web', label: '网页端', description: '具有全球覆盖能力的响应式浏览器端应用程序。' },
				{ id: 'mobile', label: '移动端', description: '集成了设备功能的原生 iOS 和 Android 体验。' },
				{ id: 'desktop', label: '桌面端', description: '面向专业用户的独立操作系统特定安装程序。' },
				{ id: 'cross', label: '跨平台', description: '在所有数字接触点上共享的代码库。' }
			],
			isMandatory: true
		},
		{
			id: 'Q2',
			text: '项目的主要目标是什么？',
			type: 'single',
			options: [
				{ id: 'new', label: '新产品开发', description: '创建全新的产品或服务' },
				{ id: 'improve', label: '现有系统改进', description: '优化和增强现有系统' },
				{ id: 'migrate', label: '系统迁移', description: '从旧系统迁移到新系统' },
				{ id: 'integrate', label: '系统集成', description: '整合多个系统或服务' }
			],
			isMandatory: true
		},
		{
			id: 'Q3',
			text: '项目的预期规模如何？',
			type: 'single',
			options: [
				{ id: 'small', label: '小型', description: '1-5人团队，3个月内完成' },
				{ id: 'medium', label: '中型', description: '5-15人团队，3-6个月完成' },
				{ id: 'large', label: '大型', description: '15+人团队，6个月以上' }
			],
			isMandatory: false
		}
	];

	// 当前问题索引
	let currentQuestionIndex = 0;
	let selectedOption = '';
	let answers = {};
	let errorMessage = '';
	let isLoading = false;
	
	// 响应式获取当前问题
	$: currentQuestion = questions[currentQuestionIndex];

	// 计算进度
	$: progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

	// 检查是否是第一题或最后一题
	$: isFirstQuestion = currentQuestionIndex === 0;
	$: isLastQuestion = currentQuestionIndex === questions.length - 1;

	// 加载已保存的答案
	onMount(() => {
		const savedAnswers = localStorage.getItem('projectCoreAnswers');
		if (savedAnswers) {
			answers = JSON.parse(savedAnswers);
			if (answers[currentQuestion.id]) {
				selectedOption = answers[currentQuestion.id];
			}
		}
	});

	function saveAnswer() {
		// 无论 selectedOption 是否为空，都保存答案
		answers[currentQuestion.id] = selectedOption;
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('projectCoreAnswers', JSON.stringify(answers));
		}
	}

	// 验证必填项
	function validateMandatory() {
		if (currentQuestion.isMandatory && !selectedOption) {
			errorMessage = '请选择一个选项，此为必填项';
			return false;
		}
		errorMessage = '';
		return true;
	}

	function handleNext() {
		// 防止快速连续点击
		if (isLoading) {
			return;
		}

		// 验证必填项
		if (!validateMandatory()) {
			return;
		}

		// 保存当前答案
		saveAnswer();

		if (!isLastQuestion) {
			// 显示加载状态
			isLoading = true;
			loadingStore.show('加载下一题...');
			
			// 模拟平滑过渡
			setTimeout(() => {
				loadingStore.hide();
				// 额外的边界检查，确保不会超出数组范围
				if (currentQuestionIndex < questions.length - 1) {
					currentQuestionIndex++;
					// 直接使用 questions 数组获取上一步的 ID，而不是依赖于 currentQuestion 的响应式更新
					selectedOption = answers[questions[currentQuestionIndex].id] || '';
					errorMessage = '';
				}
				isLoading = false;
			}, 800);
		} else {
			// 最后一题，提交问卷
			// 最终验证所有必填项
			const allMandatoryAnswered = questions
				.filter(q => q.isMandatory)
				.every(q => answers[q.id]);

			if (!allMandatoryAnswered) {
				errorMessage = '请完成所有必填项后再提交';
				return;
			}

			isLoading = true;
			loadingStore.show('提交问卷...');
			setTimeout(() => {
				loadingStore.hide();
				// 导航到技术层面模块
				goto('/questionnaire/technical');
				isLoading = false;
			}, 1000);
		}
	}

	function handleSkip() {
		// 防止快速连续点击
		if (isLoading) {
			return;
		}

		// 只有非必答题可以跳过
		if (!currentQuestion.isMandatory) {
			// 保存当前答案
			saveAnswer();
			
			isLoading = true;
			loadingStore.show('跳过问题...');
			setTimeout(() => {
				loadingStore.hide();
				if (currentQuestionIndex < questions.length - 1) {
					currentQuestionIndex++;
					// currentQuestion 会通过响应式自动更新
					selectedOption = answers[currentQuestion.id] || '';
					errorMessage = '';
				} else {
					// 最后一题跳过，直接提交
					// 最终验证所有必填项
					const allMandatoryAnswered = questions
						.filter(q => q.isMandatory)
						.every(q => answers[q.id]);

					if (!allMandatoryAnswered) {
						errorMessage = '请完成所有必填项后再提交';
						isLoading = false;
						return;
					}
					goto('/questionnaire/technical');
				}
				isLoading = false;
			}, 800);
		}
	}

	function handlePrevious() {
		// 防止快速连续点击
		if (isLoading) {
			return;
		}

		if (!isFirstQuestion) {
			// 保存当前答案
			saveAnswer();
			
			isLoading = true;
			loadingStore.show('加载上一题...');
			setTimeout(() => {
				loadingStore.hide();
				// 额外的边界检查，确保不会超出数组范围
				if (currentQuestionIndex > 0) {
					currentQuestionIndex--;
					// 直接使用 questions 数组获取上一步的 ID，而不是依赖于 currentQuestion 的响应式更新
					selectedOption = answers[questions[currentQuestionIndex].id] || '';
					errorMessage = '';
				}
				isLoading = false;
			}, 800);
		}
	}
</script>

<div class="max-w-7xl mx-auto">
	<!-- Progress Header -->
	<div class="mb-12">
		<ProgressBar progress={progress} label="模块 01" />
		<h1 class="text-4xl font-extrabold text-on-surface mt-8">项目核心</h1>
	</div>

	<!-- Focused Question Area -->
	<div class="space-y-8">
		<!-- Question Card -->
		<div class="bg-surface-container-lowest rounded-2xl p-8 md:p-12 relative overflow-hidden transition-all duration-300">
			<!-- Left Status Stripe -->
			<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
			<div class="flex flex-col gap-8">
				<header>
					<span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 inline-block">初始定义</span>
					<h2 class="text-2xl md:text-3xl font-bold text-on-surface leading-tight">问题 {currentQuestionIndex + 1}：{currentQuestion.text}</h2>
					<p class="text-secondary mt-3 text-lg leading-relaxed">
						{currentQuestionIndex === 0 ? '定义部署目标可确保我们根据正确的运行时环境和性能约束进行架构设计。' : 
						 currentQuestionIndex === 1 ? '明确项目目标有助于我们确定合适的技术方案和资源分配。' : 
						 '了解项目规模可以帮助我们制定合理的时间计划和团队构成。'}
					</p>
					{#if currentQuestion.isMandatory}
						<span class="inline-flex items-center gap-1 text-xs text-error mt-2">
							<span class="material-symbols-outlined text-xs">error</span>
							必填项
						</span>
					{/if}
				</header>

				<!-- 错误提示 -->
				{#if errorMessage}
					<div class="bg-error-container border border-error/20 rounded-lg p-4 flex items-center gap-3">
						<span class="material-symbols-outlined text-error">error</span>
						<span class="text-error text-sm font-medium">{errorMessage}</span>
					</div>
				{/if}

				<!-- Options Bento Grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each currentQuestion.options as option}
						<button 
							class={`group relative flex items-start gap-4 p-5 rounded-xl text-left transition-all duration-300 ${selectedOption === option.id 
								? 'bg-primary ring-2 ring-primary ring-offset-4 ring-offset-surface-container-lowest' 
								: 'bg-surface-container-low hover:bg-surface-bright border border-transparent hover:border-outline-variant/30'}`}
							on:click={() => {
								selectedOption = option.id;
								errorMessage = '';
							}}
						>
							<div class={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedOption === option.id ? 'bg-white/20' : 'bg-secondary/10 group-hover:bg-primary/10 transition-colors'}`}>
								<span class="material-symbols-outlined ${selectedOption === option.id ? 'text-white' : 'text-secondary group-hover:text-primary'}">
									{currentQuestionIndex === 0 ? 
										(option.id === 'web' ? 'language' : option.id === 'mobile' ? 'smartphone' : option.id === 'desktop' ? 'desktop_windows' : 'devices_other') :
									currentQuestionIndex === 1 ?
										(option.id === 'new' ? 'add_circle' : option.id === 'improve' ? 'edit' : option.id === 'migrate' ? 'move_to_inbox' : 'link') :
									(option.id === 'small' ? 'person' : option.id === 'medium' ? 'group' : 'groups')
									}
								</span>
							</div>
							<div>
								<h3 class={`font-bold text-lg ${selectedOption === option.id ? 'text-white' : 'text-on-surface'}`}>{option.label}</h3>
								<p class={`text-sm mt-1 ${selectedOption === option.id ? 'text-white/80' : 'text-secondary'}`}>{option.description}</p>
							</div>
							{#if selectedOption === option.id}
								<div class="absolute top-4 right-4 text-white">
									<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span>
								</div>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Action Bar -->
		<div class="flex items-center justify-between pt-8 border-t border-outline-variant/10">
			<button 
				class={`flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-colors ${isFirstQuestion 
					? 'text-outline-variant cursor-not-allowed opacity-50' 
					: 'text-secondary hover:bg-surface-container-high'}`} 
				on:click={handlePrevious}
				disabled={isFirstQuestion}
			>
				<span class="material-symbols-outlined">arrow_back</span>
				<span>上一步</span>
			</button>
			<div class="flex items-center gap-4">
				<!-- Skip Button (Secondary) -->
				{#if !currentQuestion.isMandatory}
					<button class="bg-surface-container-high text-on-surface font-semibold px-8 py-3 rounded-xl hover:brightness-95 transition-all" on:click={handleSkip}>
						跳过
					</button>
				{/if}
				<!-- Next Button (Primary/Active) -->
				<button 
					class="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold px-12 py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] transition-transform"
					on:click={handleNext}
				>
					<span>{isLastQuestion ? '提交' : '下一步'}</span>
					<span class="material-symbols-outlined">{isLastQuestion ? 'check' : 'arrow_forward'}</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Footer Aesthetic Meta -->
	<div class="mt-20 flex flex-col items-center gap-6 text-center">
		<div class="w-16 h-1 bg-surface-container rounded-full"></div>
		<p class="text-secondary text-xs font-medium max-w-sm">每个回答都会自动保存到活动工作区。您可以稍后在“技术层面”模块中调整这些核心设置。</p>
	</div>
</div>