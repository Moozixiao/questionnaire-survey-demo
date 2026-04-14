<script>
	import { page } from "$app/stores";
	import { authStore, logout } from "../../stores/authStore";
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";

	$: currentPath = $page.url.pathname;
	let user = null;
	let showDropdown = false;

	// 订阅登录状态
	authStore.subscribe((state) => {
		user = state.user;
	});

	// 生成面包屑导航
	$: breadcrumbs = generateBreadcrumbs(currentPath);

	function generateBreadcrumbs(path) {
		const parts = path.split("/").filter((part) => part);
		const breadcrumbs = [{ label: "仪表盘", href: `${base}/` }];

		if (parts.length === 0) {
			breadcrumbs[0].isActive = true;
			return breadcrumbs;
		}

		let currentPath = "";
		parts.forEach((part, index) => {
			currentPath += `/${part}`;
			let label = part;

			// 映射路径到友好标签
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

			breadcrumbs.push({
				label,
				href: currentPath,
				isActive: index === parts.length - 1,
			});
		});

		return breadcrumbs;
	}

	/**
	 * 保存草稿功能
	 * @description 保存当前表单数据为草稿，确保用户数据不会丢失
	 * @returns {void}
	 * @example
	 * // 点击保存草稿按钮时调用
	 * saveDraft();
	 */
	function saveDraft() {
		// 这里可以添加保存草稿的逻辑
		// 例如：将表单数据存储到localStorage或发送到后端
		console.log("保存草稿功能被调用");
		// 实际项目中，这里应该实现具体的保存逻辑
	}

	// 切换下拉菜单
	function toggleDropdown() {
		showDropdown = !showDropdown;
	}

	// 处理登出
	function handleLogout() {
		logout();
		goto(`${base}/login`);
	}
</script>

<header
	class="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-slate-200/15 shadow-sm flex justify-between items-center w-full px-8 h-16 transition-all duration-300 ease-in-out"
>
	<div class="flex items-center gap-8">
		<span class="text-lg font-black tracking-tight text-blue-700"
			>项目蓝图</span
		>
		<div
			class="hidden lg:flex items-center bg-surface-container-low rounded-full px-4 py-1.5 border border-outline-variant/10"
		>
			<span class="material-symbols-outlined text-slate-400 text-xl mr-2"
				>search</span
			>
			<input
				class="bg-transparent border-none text-sm focus:ring-0 p-0 w-64 placeholder:text-slate-400"
				placeholder="搜索需求..."
				type="text"
			/>
		</div>
		<!-- 面包屑导航 -->
		<div class="hidden md:flex items-center gap-2 ml-4 text-sm">
			{#each breadcrumbs as breadcrumb, index}
				{#if index > 0}
					<span
						class="material-symbols-outlined text-xs text-secondary"
						>chevron_right</span
					>
				{/if}
				{#if breadcrumb.isActive}
					<span class="text-on-surface font-medium"
						>{breadcrumb.label}</span
					>
				{:else}
					<a
						href={breadcrumb.href}
						class="text-secondary hover:text-primary transition-colors"
						>{breadcrumb.label}</a
					>
				{/if}
			{/each}
		</div>
	</div>
	<div class="flex items-center gap-4">
		<div
			class="flex items-center gap-3 ml-2 border-l border-slate-200/30 pl-4"
		>
			<span
				class="material-symbols-outlined text-slate-500 cursor-pointer hover:text-primary transition-colors"
				>notifications</span
			>
			<!-- 用户头像和下拉菜单 -->
			<!-- <div
				class="relative"
				on:click.outside={() => (showDropdown = false)}
			>
				<button
					class="flex items-center gap-2 cursor-pointer"
					on:click={toggleDropdown}
				>
					<div
						class="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-xs shadow-md"
					>
						{user?.name?.charAt(0).toUpperCase() || "U"}
					</div>
					<span class="text-sm font-medium text-on-surface"
						>{user?.name || "用户"}</span
					>
					<span
						class="material-symbols-outlined text-slate-400 text-xs"
						>expand_more</span
					>
				</button>
				{#if showDropdown}
					<div
						class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50"
					>
						<div class="p-3 border-b border-slate-100">
							<p class="font-semibold text-on-surface">
								{user?.name || "用户"}
							</p>
							<p class="text-xs text-slate-500">
								{user?.role || "未知角色"}
							</p>
						</div>
						<a
						href="{base}/settings"
						class="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-sm"
						on:click={() => (showDropdown = false)}
					>
						<span
							class="material-symbols-outlined text-slate-500 text-xs"
							>settings</span
						>
						设置
					</a>
						<button
							class="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-sm text-red-600 w-full text-left"
							on:click={handleLogout}
						>
							<span
								class="material-symbols-outlined text-red-500 text-xs"
								>logout</span
							>
							登出
						</button>
					</div>
				{/if}
			</div> -->
		</div>
	</div>
</header>
