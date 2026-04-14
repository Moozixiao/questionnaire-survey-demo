<script>
	// FAQ数据
	const faqItems = [
		{
			id: 1,
			question: '如何开始创建新项目？',
			answer: '您可以从仪表盘点击"新建模块"按钮开始创建新项目。系统将引导您完成项目核心、技术层面和后勤规划三个模块的问卷填写，帮助您全面定义项目需求。',
			category: '入门指南'
		},
		{
			id: 2,
			question: '问卷数据会自动保存吗？',
			answer: '是的，系统会自动保存您的问卷答案到本地存储。您可以随时暂停填写，下次继续时数据会自动恢复。建议定期完成问卷以确保数据完整性。',
			category: '数据管理'
		},
		{
			id: 3,
			question: '如何导出项目需求报告？',
			answer: '完成所有问卷模块后，系统会自动生成项目蓝图需求摘要。您可以在"报告"页面查看并导出PDF格式的需求文档，用于团队分享和存档。',
			category: '报告功能'
		},
		{
			id: 4,
			question: '可以修改已提交的问卷答案吗？',
			answer: '可以。您可以随时返回任何问卷模块修改答案。修改后的答案会自动更新到需求报告中。建议在项目初期完成所有修改，以确保需求文档的稳定性。',
			category: '数据管理'
		},
		{
			id: 5,
			question: '系统支持多用户协作吗？',
			answer: '当前版本为单用户版本，所有数据存储在本地浏览器中。多用户协作功能正在开发中，将在未来版本中推出。',
			category: '账户管理'
		},
		{
			id: 6,
			question: '如何更改系统主题和语言？',
			answer: '点击侧边栏的"系统设置"，在"偏好设置"分类中可以找到外观主题和语言设置选项。您可以选择浅色或深色主题，以及多种界面语言。',
			category: '系统设置'
		}
	];

	// 联系方式
	const contactMethods = [
		{
			id: 'email',
			title: '邮件支持',
			description: '发送邮件获取技术支持',
			icon: 'mail',
			value: 'support@architect-precision.com',
			action: 'mailto:support@architect-precision.com'
		},
		{
			id: 'chat',
			title: '在线客服',
			description: '实时在线咨询',
			icon: 'chat',
			value: '工作时间 9:00-18:00',
			action: '#'
		},
		{
			id: 'phone',
			title: '电话支持',
			description: '紧急问题电话咨询',
			icon: 'phone',
			value: '400-123-4567',
			action: 'tel:400-123-4567'
		}
	];

	// 快速链接
	const quickLinks = [
		{ id: 'docs', title: '使用文档', icon: 'description', href: '#' },
		{ id: 'tutorial', title: '视频教程', icon: 'play_circle', href: '#' },
		{ id: 'community', title: '用户社区', icon: 'forum', href: '#' },
		{ id: 'feedback', title: '功能建议', icon: 'lightbulb', href: '#' }
	];

	// 当前展开的FAQ
	let expandedFaq = null;

	function toggleFaq(id) {
		expandedFaq = expandedFaq === id ? null : id;
	}
</script>

<div class="max-w-7xl mx-auto">
	<!-- 页面标题 -->
	<div class="mb-8">
		<h1 class="text-4xl font-extrabold text-on-surface tracking-tight">帮助与支持</h1>
		<p class="text-secondary mt-2 text-lg">获取帮助、查看文档或联系我们的支持团队</p>
	</div>

	<!-- 快速链接 -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
		{#each quickLinks as link}
			<a 
				href={link.href}
				class="flex flex-col items-center gap-3 p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-200/15 hover:shadow-md hover:border-primary/30 transition-all duration-200"
			>
				<div class="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10">
					<span class="material-symbols-outlined text-primary text-2xl">{link.icon}</span>
				</div>
				<span class="font-semibold text-on-surface text-sm">{link.title}</span>
			</a>
		{/each}
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- 左侧：FAQ -->
		<div class="lg:col-span-2">
			<div class="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-slate-200/15">
				<div class="flex items-center gap-3 mb-6">
					<span class="material-symbols-outlined text-primary text-2xl">help</span>
					<h2 class="text-2xl font-bold text-on-surface">常见问题</h2>
				</div>

				<div class="space-y-3">
					{#each faqItems as faq}
						<div class="border border-slate-200 rounded-xl overflow-hidden">
							<button 
								class="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
								on:click={() => toggleFaq(faq.id)}
							>
								<div class="flex items-start gap-4">
									<span class="material-symbols-outlined text-primary mt-0.5">
										{expandedFaq === faq.id ? 'expand_less' : 'expand_more'}
									</span>
									<div>
										<h3 class="font-semibold text-on-surface">{faq.question}</h3>
										<span class="text-xs text-secondary mt-1 inline-block bg-slate-100 px-2 py-1 rounded">
											{faq.category}
										</span>
									</div>
								</div>
							</button>
							{#if expandedFaq === faq.id}
								<div class="px-5 pb-5 pl-16">
									<p class="text-secondary leading-relaxed">{faq.answer}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- 右侧：联系方式 -->
		<div class="lg:col-span-1">
			<div class="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-slate-200/15 mb-6">
				<div class="flex items-center gap-3 mb-6">
					<span class="material-symbols-outlined text-primary text-2xl">contact_support</span>
					<h2 class="text-2xl font-bold text-on-surface">联系我们</h2>
				</div>

				<div class="space-y-4">
					{#each contactMethods as method}
						<a 
							href={method.action}
							class="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 hover:border-primary/30"
						>
							<div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10">
								<span class="material-symbols-outlined text-primary">{method.icon}</span>
							</div>
							<div>
								<h3 class="font-semibold text-on-surface">{method.title}</h3>
								<p class="text-sm text-secondary">{method.description}</p>
								<p class="text-sm font-medium text-primary mt-1">{method.value}</p>
							</div>
						</a>
					{/each}
				</div>
			</div>

			<!-- 提交反馈 -->
			<div class="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-8 text-white">
				<div class="flex items-center gap-3 mb-4">
					<span class="material-symbols-outlined text-2xl">feedback</span>
					<h2 class="text-2xl font-bold">提交反馈</h2>
				</div>
				<p class="text-white/90 mb-6 text-sm leading-relaxed">
					您的反馈对我们非常重要。帮助我们改进产品，为您提供更好的体验。
				</p>
				<button class="w-full bg-white text-primary font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors">
					提交反馈
				</button>
			</div>
		</div>
	</div>

	<!-- 底部信息 -->
	<div class="mt-12 text-center">
		<div class="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-slate-200/15">
			<h3 class="text-xl font-bold text-on-surface mb-4">还需要更多帮助？</h3>
			<p class="text-secondary mb-6 max-w-2xl mx-auto">
				我们的支持团队随时准备为您提供帮助。无论是技术问题、功能建议还是使用咨询，我们都将竭诚为您服务。
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<a 
					href="mailto:support@architect-precision.com"
					class="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
				>
					<span class="material-symbols-outlined">mail</span>
					发送邮件
				</a>
				<a 
					href="#"
					class="flex items-center gap-2 px-6 py-3 bg-slate-100 text-on-surface rounded-lg font-semibold hover:bg-slate-200 transition-colors"
					on:click={(e) => e.preventDefault()}
				>
					<span class="material-symbols-outlined">chat</span>
					在线咨询
				</a>
			</div>
		</div>
	</div>
</div>