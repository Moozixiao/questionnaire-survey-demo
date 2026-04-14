<script>
	import ProgressBar from '../../../components/layout/ProgressBar.svelte';
	import { loadingStore } from '../../../stores/loadingStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// 问卷数据
	const questions = [
		{
			id: 'Q4',
			text: '是否有偏好的技术栈？',
			type: 'boolean',
			isMandatory: true
		},
		{
			id: 'Q5',
			text: '项目需要哪些集成服务？',
			type: 'multiple',
			options: [
				{ id: 'auth', label: '身份验证', description: '用户登录和权限管理' },
				{ id: 'payment', label: '支付系统', description: '在线支付处理' },
				{ id: 'analytics', label: '数据分析', description: '用户行为和业务数据' },
				{ id: 'notifications', label: '通知系统', description: '邮件、短信等通知' }
			],
			isMandatory: false
		},
		{
			id: 'Q6',
			text: '对系统性能有特殊要求吗？',
			type: 'single',
			options: [
				{ id: 'high', label: '高性能', description: '需要处理高并发和快速响应' },
				{ id: 'normal', label: '标准性能', description: '满足常规业务需求' },
				{ id: 'low', label: '低性能要求', description: '对性能要求不高' }
			],
			isMandatory: true
		}
	];

	// 当前问题索引
	let currentQuestionIndex = 0;
	let selectedOption = true;
	let selectedOptions = [];
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
		const savedAnswers = localStorage.getItem('technicalAnswers');
		if (savedAnswers) {
			answers = JSON.parse(savedAnswers);
			if (answers[currentQuestion.id]) {
				if (currentQuestion.type === 'boolean') {
					selectedOption = answers[currentQuestion.id];
				} else if (currentQuestion.type === 'multiple') {
					selectedOptions = answers[currentQuestion.id];
				} else {
					selectedOption = answers[currentQuestion.id];
				}
			}
		}
	});

	function saveAnswer() {
		if (currentQuestion.type === 'boolean') {
			answers[currentQuestion.id] = selectedOption;
		} else if (currentQuestion.type === 'multiple') {
			answers[currentQuestion.id] = selectedOptions;
		} else {
			answers[currentQuestion.id] = selectedOption;
		}
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('technicalAnswers', JSON.stringify(answers));
		}
	}

	// 验证必填项
	function validateMandatory() {
		if (currentQuestion.isMandatory) {
			if (currentQuestion.type === 'boolean') {
				// 布尔题总是有值，不需要验证
			} else if (currentQuestion.type === 'multiple') {
				if (selectedOptions.length === 0) {
					errorMessage = '请至少选择一个选项，此为必填项';
					return false;
				}
			} else {
				// 单选题
				if (!selectedOption) {
					errorMessage = '请选择一个选项，此为必填项';
					return false;
				}
			}
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
					// 直接使用 questions 数组获取下一步的 ID，而不是依赖于 currentQuestion 的响应式更新
					const nextQuestion = questions[currentQuestionIndex];
					// 重置选择
					if (nextQuestion.type === 'boolean') {
						selectedOption = answers[nextQuestion.id] || true;
					} else if (nextQuestion.type === 'multiple') {
						selectedOptions = answers[nextQuestion.id] || [];
					} else {
						selectedOption = answers[nextQuestion.id] || '';
					}
					errorMessage = '';
				}
				isLoading = false;
			}, 800);
		} else {
			// 最后一题，提交问卷
			// 最终验证所有必填项
			const allMandatoryAnswered = questions
				.filter(q => q.isMandatory)
				.every(q => {
					if (q.type === 'boolean') {
						return true; // 布尔题总是有值
					} else if (q.type === 'multiple') {
						return answers[q.id] && answers[q.id].length > 0;
					} else {
						return answers[q.id];
					}
				});

			if (!allMandatoryAnswered) {
				errorMessage = '请完成所有必填项后再提交';
				return;
			}

			isLoading = true;
			loadingStore.show('提交问卷...');
			setTimeout(() => {
				loadingStore.hide();
				// 导航到后勤规划模块
				goto('/questionnaire/logistics');
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
					// 重置选择
					if (currentQuestion.type === 'boolean') {
						selectedOption = answers[currentQuestion.id] || true;
					} else if (currentQuestion.type === 'multiple') {
						selectedOptions = answers[currentQuestion.id] || [];
					} else {
						selectedOption = answers[currentQuestion.id] || '';
					}
					errorMessage = '';
				} else {
					// 最后一题跳过，直接提交
					// 最终验证所有必填项
					const allMandatoryAnswered = questions
						.filter(q => q.isMandatory)
						.every(q => {
							if (q.type === 'boolean') {
								return true; // 布尔题总是有值
							} else if (q.type === 'multiple') {
								return answers[q.id] && answers[q.id].length > 0;
							} else {
								return answers[q.id];
							}
						});

					if (!allMandatoryAnswered) {
						errorMessage = '请完成所有必填项后再提交';
						isLoading = false;
						return;
					}
					goto('/questionnaire/logistics');
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
					const previousQuestion = questions[currentQuestionIndex];
					// 恢复之前的选择
					if (previousQuestion.type === 'boolean') {
						selectedOption = answers[previousQuestion.id] || true;
					} else if (previousQuestion.type === 'multiple') {
						selectedOptions = answers[previousQuestion.id] || [];
					} else {
						selectedOption = answers[previousQuestion.id] || '';
					}
					errorMessage = '';
				}
				isLoading = false;
			}, 800);
		}
	}

	function toggleOption(optionId) {
		if (selectedOptions.includes(optionId)) {
			selectedOptions = selectedOptions.filter(id => id !== optionId);
		} else {
			selectedOptions.push(optionId);
		}
		errorMessage = '';
	}
</script>

<div class="max-w-7xl mx-auto">
	<!-- Progress Header -->
	<div class="mb-12">
		<ProgressBar progress={progress} label="模块 02" />
		<h1 class="text-4xl font-extrabold text-on-surface mt-8">技术层面</h1>
	</div>

	<!-- Focused Question Area -->
	<div class="space-y-8">
		<!-- Question Card -->
		<div class="bg-surface-container-lowest rounded-2xl p-8 md:p-12 relative overflow-hidden transition-all duration-300">
			<!-- Left Status Stripe -->
			<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
			<div class="flex flex-col gap-8">
				<header>
					<span class="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 inline-block">技术选择</span>
					<h2 class="text-2xl md:text-3xl font-bold text-on-surface leading-tight">问题 {currentQuestionIndex + 4}：{currentQuestion.text}</h2>
					<p class="text-secondary mt-3 text-lg leading-relaxed">
						{currentQuestionIndex === 0 ? '了解您的技术偏好有助于我们设计更符合您团队技能的解决方案。' : 
						 currentQuestionIndex === 1 ? '确定需要集成的服务可以帮助我们规划系统架构和接口设计。' : 
						 '了解性能要求有助于我们选择合适的技术栈和架构方案。'}
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

				<!-- Question Content Based on Type -->
				{#if currentQuestion.type === 'boolean'}
					<!-- Boolean Options -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<button 
							class={`flex items-center justify-center gap-4 p-8 rounded-xl text-center transition-all duration-300 ${selectedOption === true 
								? 'bg-secondary text-white ring-2 ring-secondary ring-offset-4 ring-offset-surface-container-lowest' 
								: 'bg-surface-container-low hover:bg-surface-bright border border-transparent hover:border-outline-variant/30'}`}
							on:click={() => {
								selectedOption = true;
								errorMessage = '';
							}}
						>
							<span class="material-symbols-outlined text-4xl">check_circle</span>
							<span class="text-xl font-bold">是</span>
						</button>
						<button 
							class={`flex items-center justify-center gap-4 p-8 rounded-xl text-center transition-all duration-300 ${selectedOption === false 
								? 'bg-secondary text-white ring-2 ring-secondary ring-offset-4 ring-offset-surface-container-lowest' 
								: 'bg-surface-container-low hover:bg-surface-bright border border-transparent hover:border-outline-variant/30'}`}
							on:click={() => {
								selectedOption = false;
								errorMessage = '';
							}}
						>
							<span class="material-symbols-outlined text-4xl">cancel</span>
							<span class="text-xl font-bold">否</span>
						</button>
					</div>
				{:else if currentQuestion.type === 'multiple'}
					<!-- Multiple Choice Options -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each currentQuestion.options as option}
							<button 
								class={`group relative flex items-start gap-4 p-5 rounded-xl text-left transition-all duration-300 ${selectedOptions.includes(option.id) 
									? 'bg-secondary ring-2 ring-secondary ring-offset-4 ring-offset-surface-container-lowest' 
									: 'bg-surface-container-low hover:bg-surface-bright border border-transparent hover:border-outline-variant/30'}`}
								on:click={() => toggleOption(option.id)}
							>
								<div class={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedOptions.includes(option.id) ? 'bg-white/20' : 'bg-secondary/10 group-hover:bg-secondary/20 transition-colors'}`}>
									<span class="material-symbols-outlined ${selectedOptions.includes(option.id) ? 'text-white' : 'text-secondary group-hover:text-secondary'}">
										{option.id === 'auth' ? 'lock' : option.id === 'payment' ? 'payment' : option.id === 'analytics' ? 'analytics' : 'notifications'}
									</span>
								</div>
								<div>
									<h3 class={`font-bold text-lg ${selectedOptions.includes(option.id) ? 'text-white' : 'text-on-surface'}`}>{option.label}</h3>
									<p class={`text-sm mt-1 ${selectedOptions.includes(option.id) ? 'text-white/80' : 'text-secondary'}`}>{option.description}</p>
								</div>
								{#if selectedOptions.includes(option.id)}
									<div class="absolute top-4 right-4 text-white">
										<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span>
									</div>
								{/if}
							</button>
						{/each}
					</div>
				{:else}
					<!-- Single Choice Options -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each currentQuestion.options as option}
							<button 
								class={`group relative flex items-start gap-4 p-5 rounded-xl text-left transition-all duration-300 ${selectedOption === option.id 
									? 'bg-secondary ring-2 ring-secondary ring-offset-4 ring-offset-surface-container-lowest' 
									: 'bg-surface-container-low hover:bg-surface-bright border border-transparent hover:border-outline-variant/30'}`}
								on:click={() => {
									selectedOption = option.id;
									errorMessage = '';
								}}
							>
								<div class={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedOption === option.id ? 'bg-white/20' : 'bg-secondary/10 group-hover:bg-secondary/20 transition-colors'}`}>
									<span class="material-symbols-outlined ${selectedOption === option.id ? 'text-white' : 'text-secondary group-hover:text-secondary'}">
										{option.id === 'high' ? 'speed' : option.id === 'normal' ? 'schedule' : 'low_priority'}
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
				{/if}
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
					class="bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-bold px-12 py-3 rounded-xl shadow-lg shadow-secondary/20 flex items-center gap-2 hover:scale-[1.02] transition-transform"
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
		<p class="text-secondary text-xs font-medium max-w-sm">每个回答都会自动保存到活动工作区。您可以稍后在“后勤规划”模块中调整这些技术设置。</p>
	</div>
</div>