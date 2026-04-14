<script>
	import { logout } from "../../stores/authStore";
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";

	// 弹窗状态
	export let isVisible = false;

	// 隐藏弹窗
	function hideModal() {
		isVisible = false;
	}

	// 处理登出
	function handleLogout() {
		hideModal();
		// 执行登出
		logout();
		// 跳转到登录页面
		goto(`${base}/login`);
	}

	// 点击背景关闭
	function handleBackdropClick(event) {
		if (event.target === event.currentTarget) {
			hideModal();
		}
	}
</script>

{#if isVisible}
	<!-- 弹窗背景 -->
	<div 
		class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-opacity duration-300"
		on:click={handleBackdropClick}
		on:keydown={(e) => { if (e.key === 'Escape') hideModal(); }}
		tabindex="-1"
		role="dialog"
		aria-modal="true"
		aria-labelledby="logout-modal-title"
	>
		<!-- 弹窗内容 -->
		<div 
			class="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100 w-full max-w-md transform transition-all duration-300"
			role="document"
		>
			<!-- 图标 -->
			<div class="flex justify-center mb-6">
				<div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
					<span class="material-symbols-outlined text-red-500 text-2xl">logout</span>
				</div>
			</div>

			<!-- 标题和描述 -->
			<div class="text-center mb-8">
				<h2 id="logout-modal-title" class="text-xl font-bold text-slate-800 mb-2">确认登出</h2>
				<p class="text-slate-500">您确定要退出当前账号吗？</p>
				<p class="text-slate-400 text-sm mt-2">退出后需要重新登录才能访问系统</p>
			</div>

			<!-- 按钮组 -->
			<div class="flex space-x-4">
				<!-- 取消按钮 -->
				<button 
					class="flex-1 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200"
					on:click={hideModal}
					on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') hideModal(); }}
				>
					取消
				</button>

				<!-- 确认登出按钮 -->
				<button 
					class="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow"
					on:click={handleLogout}
					on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLogout(); }}
				>
					确认登出
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	/* 动画定义 */
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes zoom-in-95 {
		from {
			transform: scale(0.95);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	
</style>