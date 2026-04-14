<script>
	import { goto } from '$app/navigation';
	import themeStore, { setThemeMode, updateCustomSettings, resetTheme } from '../../stores/themeStore';

	// 设置分类
	const settingsCategories = [
		{
			id: 'account',
			title: '账户设置',
			icon: 'account_circle',
			description: '管理您的账户信息和偏好设置',
			items: [
				{ id: 'profile', label: '个人资料', icon: 'person', description: '更新您的个人信息和头像' },
				{ id: 'security', label: '安全设置', icon: 'lock', description: '密码和安全选项' },
				{ id: 'notifications', label: '通知偏好', icon: 'notifications', description: '管理通知和提醒设置' }
			]
		},
		{
			id: 'preferences',
			title: '偏好设置',
			icon: 'tune',
			description: '自定义应用的外观和行为',
			items: [
				{ id: 'appearance', label: '外观主题', icon: 'palette', description: '选择深色或浅色主题' },
				{ id: 'language', label: '语言设置', icon: 'language', description: '选择界面语言' },
				{ id: 'accessibility', label: '无障碍功能', icon: 'accessibility', description: '辅助功能选项' }
			]
		},
		{
			id: 'data',
			title: '数据管理',
			icon: 'storage',
			description: '管理您的数据和存储选项',
			items: [
				{ id: 'storage', label: '存储管理', icon: 'folder', description: '查看和管理存储空间' },
				{ id: 'backup', label: '备份与恢复', icon: 'backup', description: '数据备份和恢复选项' },
				{ id: 'export', label: '数据导出', icon: 'download', description: '导出您的数据' }
			]
		}
	];

	// 当前选中的设置项
	let selectedCategory = settingsCategories[0];
	let selectedSetting = null;

	// 主题设置
	// 直接在模板中使用 $themeStore 来订阅store

	// 主题选项
	const themeOptions = [
		{ value: 'light', label: '浅色', icon: 'light_mode' },
		{ value: 'dark', label: '深色', icon: 'dark_mode' },
		{ value: 'system', label: '自动', icon: 'brightness_auto' }
	];

	// 字体大小选项
	const fontSizeOptions = [
		{ value: 'small', label: '小' },
		{ value: 'medium', label: '中' },
		{ value: 'large', label: '大' }
	];

	// 间距选项
	const spacingOptions = [
		{ value: 'compact', label: '紧凑' },
		{ value: 'default', label: '默认' },
		{ value: 'comfortable', label: '舒适' }
	];

	// 预设颜色选项
	const colorOptions = [
		{ value: '#3b82f6', label: '蓝色' },
		{ value: '#ef4444', label: '红色' },
		{ value: '#10b981', label: '绿色' },
		{ value: '#f59e0b', label: '橙色' },
		{ value: '#8b5cf6', label: '紫色' },
		{ value: '#ec4899', label: '粉色' }
	];

	function handleSettingClick(category, item) {
		selectedCategory = category;
		selectedSetting = item;
	}

	function handleBack() {
		selectedSetting = null;
	}

	// 切换主题模式
	function handleThemeModeChange(mode) {
		setThemeMode(mode);
	}

	// 更新自定义设置
	function handleCustomSettingChange(key, value) {
		updateCustomSettings({ [key]: value });
	}

	// 重置主题
	function handleResetTheme() {
		if (confirm('确定要恢复默认主题设置吗？')) {
			resetTheme();
		}
	}
</script>

<div class="max-w-7xl mx-auto">
	<!-- 页面标题 -->
	<div class="mb-8">
		<h1 class="text-4xl font-extrabold text-on-surface tracking-tight">系统设置</h1>
		<p class="text-secondary mt-2 text-lg">管理您的账户、偏好和数据设置</p>
	</div>

	<!-- 设置内容 -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- 左侧：设置分类列表 -->
		<div class="lg:col-span-1">
			<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-slate-200/15">
				<h2 class="text-lg font-bold text-on-surface mb-4">设置分类</h2>
				<div class="space-y-2">
					{#each settingsCategories as category}
						<button 
							class={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${selectedCategory.id === category.id 
								? 'bg-primary text-white shadow-md' 
								: 'hover:bg-slate-100 text-slate-700'}`}
							on:click={() => {
								selectedCategory = category;
								selectedSetting = null;
							}}
						>
							<span class="material-symbols-outlined">{category.icon}</span>
							<div class="text-left">
								<div class="font-semibold text-sm">{category.title}</div>
								<div class="text-xs opacity-80">{category.description}</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- 右侧：设置项详情 -->
		<div class="lg:col-span-2">
			{#if selectedSetting}
				<!-- 设置项详细内容 -->
				<div class="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-slate-200/15">
					<div class="flex items-center gap-4 mb-6">
						<button 
							class="p-2 hover:bg-slate-100 rounded-lg transition-colors"
							on:click={handleBack}
						>
							<span class="material-symbols-outlined">arrow_back</span>
						</button>
						<div>
							<h3 class="text-2xl font-bold text-on-surface">{selectedSetting.label}</h3>
							<p class="text-secondary text-sm">{selectedSetting.description}</p>
						</div>
					</div>

					<!-- 设置内容区域 -->
					<div class="space-y-6">
						{#if selectedSetting.id === 'profile'}
							<div class="space-y-4">
								<div>
						<label for="username" class="block text-sm font-semibold text-on-surface mb-2">用户名</label>
						<input 
							id="username"
							type="text" 
							class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
							value="Alex Chen"
						/>
					</div>
					<div>
						<label for="email" class="block text-sm font-semibold text-on-surface mb-2">邮箱地址</label>
						<input 
							id="email"
							type="email" 
							class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
							value="alex.chen@example.com"
						/>
					</div>
					<div>
						<label for="position" class="block text-sm font-semibold text-on-surface mb-2">职位</label>
						<input 
							id="position"
							type="text" 
							class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
							value="首席架构师"
						/>
					</div>
								<button class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
									保存更改
								</button>
							</div>
						{:else if selectedSetting.id === 'appearance'}
							<div class="space-y-8">
								<!-- 主题模式选择 -->
						<div>
							<h3 class="block text-sm font-semibold text-on-surface mb-3">主题模式</h3>
							<div class="grid grid-cols-3 gap-4">
								{#each themeOptions as option}
									<button 
										class={`p-4 border-2 rounded-xl transition-all duration-300 ${$themeStore.mode === option.value 
											? 'border-primary bg-primary/10' 
											: 'border-slate-200 hover:border-slate-300'}`}
										on:click={() => handleThemeModeChange(option.value)}
									>
										<span class="material-symbols-outlined text-2xl mb-2">{option.icon}</span>
										<div class="text-sm font-semibold">{option.label}</div>
									</button>
								{/each}
							</div>
						</div>

								<!-- 自定义主题设置 -->
								<div>
									<!-- <div class="flex items-center justify-between mb-4">
										<label class="block text-sm font-semibold text-on-surface">自定义主题</label>
										<button 
											class="text-sm text-primary hover:underline"
											on:click={handleResetTheme}
										>
											重置为默认
										</button>
									</div>

									<div class="mb-6">
										<label class="block text-sm font-medium text-on-surface mb-3">主色调</label>
										<div class="grid grid-cols-6 gap-3">
											{#each colorOptions as color}
												<button 
													class={`w-10 h-10 rounded-full transition-all duration-300 ${$themeStore.custom.primaryColor === color.value 
														? 'ring-2 ring-offset-2 ring-primary' 
														: 'hover:scale-110'}`}
													style={`background-color: ${color.value}`}
													on:click={() => handleCustomSettingChange('primaryColor', color.value)}
													title={color.label}
												></button>
											{/each}
											<button 
												class="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center hover:border-primary transition-all duration-300"
												on:click={() => {
													const customColor = prompt('请输入自定义颜色（十六进制）:', $themeStore.custom.primaryColor);
													if (customColor && /^#[0-9A-Fa-f]{6}$/.test(customColor)) {
														handleCustomSettingChange('primaryColor', customColor);
													}
												}}
												title="自定义颜色"
											>
												<span class="material-symbols-outlined text-slate-400 text-xs">add</span>
											</button>
										</div>
									</div> -->

									<!-- 字体大小选择 -->
							<div class="mb-6">
								<h3 class="block text-sm font-medium text-on-surface mb-3">字体大小</h3>
								<div class="flex space-x-2">
									{#each fontSizeOptions as option}
										<button 
											class={`flex-1 py-2 rounded-lg transition-all duration-300 ${$themeStore.custom.fontSize === option.value 
												? 'bg-primary text-white' 
												: 'border border-slate-200 hover:bg-slate-50'}`}
											on:click={() => handleCustomSettingChange('fontSize', option.value)}
										>
											{option.label}
										</button>
									{/each}
								</div>
							</div>

									<!-- 间距选择 -->
									<!-- <div>
										<label class="block text-sm font-medium text-on-surface mb-3">界面间距</label>
										<div class="flex space-x-2">
											{#each spacingOptions as option}
												<button 
													class={`flex-1 py-2 rounded-lg transition-all duration-300 ${$themeStore.custom.spacing === option.value 
														? 'bg-primary text-white' 
														: 'border border-slate-200 hover:bg-slate-50'}`}
													on:click={() => handleCustomSettingChange('spacing', option.value)}
												>
													{option.label}
												</button>
											{/each}
										</div>
									</div> -->
								</div>

								<!-- 主题预览 -->
						<div>
							<h3 class="block text-sm font-semibold text-on-surface mb-3">主题预览</h3>
							<div class="bg-slate-50 rounded-xl p-6 border border-slate-200 theme-preview">
										<div class="flex items-center justify-between mb-4">
											<div class="flex items-center space-x-2">
												<div class="w-3 h-3 rounded-full bg-red-500 preview-window-dots"></div>
												<div class="w-3 h-3 rounded-full bg-yellow-500 preview-window-dots"></div>
												<div class="w-3 h-3 rounded-full bg-green-500 preview-window-dots"></div>
											</div>
											<div class="text-sm text-slate-500">预览窗口</div>
										</div>
										<div class="space-y-3">
											<div class="h-6 bg-slate-200 rounded preview-content"></div>
											<div class="h-4 bg-slate-200 rounded w-3/4 preview-content"></div>
											<div class="h-4 bg-slate-200 rounded w-1/2 preview-content"></div>
											<div class="flex space-x-2 mt-4">
												<button class="px-4 py-2 bg-primary text-white rounded transition-all duration-300">
													按钮
												</button>
												<button class="px-4 py-2 border border-slate-300 rounded transition-all duration-300 preview-button-secondary">
													按钮
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						{:else if selectedSetting.id === 'notifications'}
							<div class="space-y-4">
								<div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
									<div>
										<div class="font-semibold text-on-surface">邮件通知</div>
										<div class="text-sm text-secondary">接收重要更新和提醒</div>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" class="sr-only peer" checked>
										<div class="w-11 h-6 bg-slate-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
									</label>
								</div>
								<div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
									<div>
										<div class="font-semibold text-on-surface">推送通知</div>
										<div class="text-sm text-secondary">浏览器推送通知</div>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" class="sr-only peer">
										<div class="w-11 h-6 bg-slate-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
									</label>
								</div>
								<div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
									<div>
										<div class="font-semibold text-on-surface">每周报告</div>
										<div class="text-sm text-secondary">每周项目进度摘要</div>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" class="sr-only peer" checked>
										<div class="w-11 h-6 bg-slate-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
									</label>
								</div>
							</div>
						{:else}
							<div class="flex flex-col items-center justify-center py-12 text-center">
								<span class="material-symbols-outlined text-6xl text-slate-300 mb-4">{selectedSetting.icon}</span>
								<h4 class="text-lg font-semibold text-on-surface mb-2">{selectedSetting.label}</h4>
								<p class="text-secondary text-sm max-w-md">
									此功能正在开发中，敬请期待。我们正在努力为您带来更好的体验。
								</p>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<!-- 设置项列表 -->
				<div class="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-slate-200/15">
					<h3 class="text-2xl font-bold text-on-surface mb-6">{selectedCategory.title}</h3>
					<p class="text-secondary mb-8">{selectedCategory.description}</p>
					
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each selectedCategory.items as item}
							<button 
								class="flex items-start gap-4 p-5 rounded-xl text-left transition-all duration-200 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 hover:shadow-md"
								on:click={() => handleSettingClick(selectedCategory, item)}
							>
								<div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10">
									<span class="material-symbols-outlined text-primary">{item.icon}</span>
								</div>
								<div>
									<h4 class="font-bold text-on-surface">{item.label}</h4>
									<p class="text-sm text-secondary mt-1">{item.description}</p>
								</div>
								<span class="material-symbols-outlined text-slate-400 ml-auto">chevron_right</span>
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>