<script>
	import { loadingStore } from '../../stores/loadingStore';

	function handleExportPDF() {
		loadingStore.show('导出PDF中...');
		setTimeout(() => {
			loadingStore.hide();
			// 这里应该实现PDF导出功能
		}, 1000);
	}

	function handleExportExcel() {
		loadingStore.show('导出Excel中...');
		setTimeout(() => {
			loadingStore.hide();
			// 这里应该实现Excel导出功能
		}, 1000);
	}

	function handleShare() {
		loadingStore.show('准备分享...');
		setTimeout(() => {
			loadingStore.hide();
			// 这里应该实现分享功能
		}, 1000);
	}
</script>

<div class="max-w-7xl mx-auto">
	<!-- Dashboard Header -->
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
		<div>
			<h1 class="text-4xl font-extrabold text-on-surface tracking-tight">项目蓝图需求摘要</h1>
			<p class="text-secondary mt-2">生成于 2026年04月14日 • 架构审查版本 v2.4</p>
		</div>
		<div class="flex gap-3">
			<button class="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface rounded-xl hover:bg-surface-container-highest transition-colors font-medium text-sm" on:click={handleShare}>
				<span class="material-symbols-outlined text-lg">share</span>
				分享报告
			</button>
			<button class="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface rounded-xl hover:bg-surface-container-highest transition-colors font-medium text-sm" on:click={handleExportExcel}>
				<span class="material-symbols-outlined text-lg">description</span>
				导出 Excel
			</button>
			<button class="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl hover:shadow-lg transition-all font-medium text-sm" on:click={handleExportPDF}>
				<span class="material-symbols-outlined text-lg">picture_as_pdf</span>
				导出 PDF
			</button>
		</div>
	</div>

	<!-- Bento Grid Visualization -->
	<div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
		<!-- Technical Complexity Radar -->
		<div class="md:col-span-4 bg-surface-container-lowest p-6 rounded-3xl relative overflow-hidden group">
			<div class="flex justify-between items-start mb-6">
				<h3 class="font-bold text-lg text-on-surface-variant">技术复杂度</h3>
				<span class="material-symbols-outlined text-primary/40">radar</span>
			</div>
			<div class="h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center relative">
				<!-- Visual representation of Radar Chart -->
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="w-48 h-48 border border-outline-variant/30 rounded-full flex items-center justify-center">
						<div class="w-32 h-32 border border-outline-variant/30 rounded-full flex items-center justify-center">
							<div class="w-16 h-16 border border-outline-variant/30 rounded-full"></div>
						</div>
					</div>
					<div class="absolute w-40 h-40 bg-primary/10 rotate-45" style="clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);"></div>
				</div>
			</div>
			<span class="text-xs font-medium text-primary uppercase tracking-widest">雷达可视化图表</span>
			<div class="mt-4 flex justify-between text-sm">
				<span class="text-secondary italic">核心: 85%</span>
				<span class="text-primary font-semibold">高强度</span>
			</div>
		</div>

		<!-- Feature Distribution Pie -->
		<div class="md:col-span-4 bg-surface-container-lowest p-6 rounded-3xl relative overflow-hidden group">
			<div class="flex justify-between items-start mb-6">
				<h3 class="font-bold text-lg text-on-surface-variant">功能分布</h3>
				<span class="material-symbols-outlined text-primary/40">pie_chart</span>
			</div>
			<div class="h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center relative">
				<!-- Visual representation of Pie Chart -->
				<div class="w-40 h-40 rounded-full border-8 border-primary-container relative">
					<div class="absolute inset-0 border-8 border-tertiary-container rounded-full" style="clip-path: inset(0 0 50% 50%)"></div>
					<div class="absolute inset-0 flex items-center justify-center">
						<div class="text-center">
							<div class="text-2xl font-bold text-on-surface">12</div>
							<div class="text-[10px] text-secondary uppercase tracking-tighter">模块数量</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-4 grid grid-cols-2 gap-2">
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 rounded-full bg-primary"></div>
					<span class="text-xs text-secondary">前端 (45%)</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 rounded-full bg-tertiary"></div>
					<span class="text-xs text-secondary">后端 (55%)</span>
				</div>
			</div>
		</div>

		<!-- Risk Level Bar -->
		<div class="md:col-span-4 bg-surface-container-lowest p-6 rounded-3xl relative overflow-hidden group">
			<div class="flex justify-between items-start mb-6">
				<h3 class="font-bold text-lg text-on-surface-variant">风险等级</h3>
				<span class="material-symbols-outlined text-primary/40">bar_chart</span>
			</div>
			<div class="h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex flex-col justify-end p-6 gap-3">
				<!-- Visual representation of Bar Chart -->
				<div class="flex items-end gap-4 h-full">
					<div class="flex-1 bg-surface-variant rounded-t-lg h-[40%]"></div>
					<div class="flex-1 bg-tertiary-container rounded-t-lg h-[60%]"></div>
					<div class="flex-1 bg-primary rounded-t-lg h-[90%]"></div>
					<div class="flex-1 bg-error/40 rounded-t-lg h-[30%]"></div>
				</div>
			</div>
			<div class="mt-4 flex justify-between items-center">
				<span class="text-sm font-medium text-secondary">累积风险</span>
				<span class="bg-tertiary-container text-on-tertiary-fixed text-[10px] px-2 py-1 rounded-full font-bold">稳定</span>
			</div>
		</div>
	</div>

	<!-- Summary of Answers Section -->
	<div class="space-y-8">
		<div class="flex items-center justify-between">
			<h2 class="font-bold text-2xl text-on-surface">回答汇总</h2>
			<div class="flex gap-4">
				<div class="flex items-center gap-2">
					<div class="w-3 h-3 rounded-sm bg-tertiary-container"></div>
					<span class="text-xs font-medium text-secondary">已完成</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-3 h-3 rounded-sm bg-orange-400"></div>
					<span class="text-xs font-medium text-secondary">待定</span>
				</div>
			</div>
		</div>

		<!-- Module Group 1 -->
		<section class="bg-surface-container-low rounded-3xl p-1 overflow-hidden">
			<div class="px-6 py-4 bg-white/40 flex justify-between items-center">
				<div class="flex items-center gap-3">
					<span class="material-symbols-outlined text-primary">analytics</span>
					<h3 class="font-bold text-lg text-on-surface">模块 A：核心基础设施</h3>
				</div>
				<span class="text-sm text-secondary font-medium">85% 已完成</span>
			</div>
			<div class="p-6 space-y-4">
				<!-- Question Card -->
				<div class="bg-surface-container-lowest p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
					<div class="absolute left-0 top-6 bottom-6 w-1 bg-tertiary rounded-r-full"></div>
					<div class="flex flex-col gap-2">
						<div class="flex justify-between items-start">
							<span class="text-[10px] text-tertiary font-bold tracking-widest uppercase">问题 1.1</span>
							<span class="text-xs font-medium text-secondary">基础设施类型</span>
						</div>
						<h4 class="font-bold text-on-surface">将使用哪种主要的托管服务商？</h4>
						<p class="text-on-surface-variant text-sm mt-1">采用 AWS 多可用区部署，并结合 RDS 和 S3 用于静态资产集成。</p>
					</div>
				</div>

				<!-- Question Card - TBD -->
				<div class="bg-surface-container-lowest p-6 rounded-2xl relative shadow-sm border-l-4 border-orange-400">
					<div class="flex flex-col gap-2">
						<div class="flex justify-between items-start">
							<span class="text-[10px] text-orange-500 font-bold tracking-widest uppercase">问题 1.2</span>
							<span class="text-xs font-medium text-orange-500">待定</span>
						</div>
						<h4 class="font-bold text-on-surface">数据存储合规性要求？</h4>
						<p class="text-orange-600/80 italic text-sm mt-1">正在等待法务评审有关 GDPR/CCPA 针对本地化存储节点的细节。</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Module Group 2 -->
		<section class="bg-surface-container-low rounded-3xl p-1 overflow-hidden">
			<div class="px-6 py-4 bg-white/40 flex justify-between items-center">
				<div class="flex items-center gap-3">
					<span class="material-symbols-outlined text-primary">security</span>
					<h3 class="font-bold text-lg text-on-surface">模块 B：安全协议</h3>
				</div>
				<span class="text-sm text-secondary font-medium">60% 已完成</span>
			</div>
			<div class="p-6 space-y-4">
				<!-- Question Card -->
				<div class="bg-surface-container-lowest p-6 rounded-2xl relative shadow-sm border-l-4 border-tertiary">
					<div class="flex flex-col gap-2">
						<div class="flex justify-between items-start">
							<span class="text-[10px] text-tertiary font-bold tracking-widest uppercase">问题 2.1</span>
							<span class="text-xs font-medium text-secondary">身份验证</span>
						</div>
						<h4 class="font-bold text-on-surface">要求的 MFA（多因素认证）方法是什么？</h4>
						<p class="text-on-surface-variant text-sm mt-1">使用支持 OAuth 2.0 的 Auth0，支持 TOTP 以及用于硬件密钥的 WebAuthn。</p>
					</div>
				</div>

				<!-- Question Card - Skipped -->
				<div class="bg-surface-container-lowest p-6 rounded-2xl relative shadow-sm border-l-4 border-orange-400">
					<div class="flex flex-col gap-2">
						<div class="flex justify-between items-start">
							<span class="text-[10px] text-orange-500 font-bold tracking-widest uppercase">问题 2.2</span>
							<span class="text-xs font-medium text-orange-500">已跳过</span>
						</div>
						<h4 class="font-bold text-on-surface">第三方渗透测试计划？</h4>
						<p class="text-orange-600/80 italic text-sm mt-1">标记为待 24 财年第四季度预算审批。</p>
					</div>
				</div>
			</div>
		</section>
	</div>

	<!-- Footer Spacer -->
	<div class="h-12"></div>
</div>