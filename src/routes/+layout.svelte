<script>
	import "../app.css";
	import SideNavBar from "../components/layout/SideNavBar.svelte";	
	import TopNavBar from '../components/layout/TopNavBar.svelte';
	import MobileNavBar from "../components/layout/MobileNavBar.svelte";
	import Loading from "../components/common/Loading.svelte";
	import { loadingStore } from "../stores/loadingStore";
	import { authStore, initAuth } from "../stores/authStore";
	import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { base } from "$app/paths";

	let isLoading = false;
	let loadingMessage = "加载中...";
	let fullscreen = true;
	let isLoggedIn = false;

	// 订阅登录状态
	authStore.subscribe((state) => {
		isLoggedIn = state.isLoggedIn;
	});

	// 订阅加载状态
	loadingStore.subscribe((state) => {
		isLoading = state.isLoading;
		loadingMessage = state.message;
		fullscreen = state.fullscreen;
	});

	// 初始化登录状态（仅在客户端执行）
	if (typeof window !== "undefined") {
		initAuth();
	}

	// 监听路由变化，检查登录状态（仅在客户端执行）
	$: if (typeof window !== "undefined") {
		const currentPath = $page.url.pathname;
		// 登录页面不需要检查
		if (currentPath !== `${base}/login`) {
			// 延迟检查，确保登录状态已经更新
			setTimeout(() => {
				if (!isLoggedIn) {
					// 未登录，跳转到登录页面
					goto(`${base}/login`);
				}
			}, 100);
		}
	}
</script>

<!-- 根据登录状态显示不同界面 -->
{#if isLoggedIn}
	<!-- 已登录状态 -->
	<div class="flex overflow-hidden min-h-screen bg-surface text-on-surface">
		<!-- 侧边栏 -->
		<SideNavBar />

		<!-- 右侧内容区域 -->
		<div class="flex-1 flex flex-col min-w-0 relative md:ml-64">
			<!-- 顶部导航栏 -->
			<TopNavBar />
			<!-- 主内容区域 -->
			<main class="flex-1 overflow-y-auto bg-surface p-6 md:p-12 pt-8">
				<slot />
			</main>
		</div>

		<!-- 移动端导航栏 -->
		<MobileNavBar />

		<!-- 背景装饰元素 -->
		<div
			class="fixed top-0 right-0 -z-10 w-1/3 h-1/2 bg-blue-50/50 dark:bg-blue-900/20 rounded-bl-[100%] blur-3xl opacity-50 pointer-events-none"
		></div>
		<div
			class="fixed bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-slate-100/50 dark:bg-slate-800/20 rounded-tr-[100%] blur-3xl opacity-50 pointer-events-none"
		></div>

		<!-- 全局加载组件 -->
		<Loading {isLoading} message={loadingMessage} {fullscreen} />
	</div>
{:else}
	<!-- 未登录状态 -->
	<div class="min-h-screen">
		<slot />
	</div>
{/if}

<style>
	.material-symbols-outlined {
		font-variation-settings:
			"FILL" 0,
			"wght" 400,
			"GRAD" 0,
			"opsz" 24;
	}
	body {
		font-family: "Inter", "Noto Sans SC", sans-serif;
	}
	h1,
	h2,
	h3 {
		font-family: "Manrope", "Noto Sans SC", sans-serif;
	}

	/* 响应式布局调整 */
	@media (min-width: 768px) {
		/* 在中等及以上屏幕尺寸下，侧边栏和内容区域的比例调整 */
		:global(.md\:ml-64) {
			margin-left: 16rem; /* 侧边栏宽度 */
		}

		/* 确保内容区域和侧边栏在大屏幕上的比例合理 */
		@media (min-width: 1280px) {
			:global(.md\:ml-64) {
				margin-left: 20rem; /* 增加侧边栏宽度，使比例更接近平分 */
			}
		}
	}
</style>
