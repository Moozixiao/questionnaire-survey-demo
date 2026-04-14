<script>
	import { goto } from "$app/navigation";
	import { login } from "../../stores/authStore";
	import { base } from "$app/paths";

	// 登录表单状态
	let username = "";
	let password = "";
	let showPassword = false;
	let errorMessage = "";
	let isLoading = false;

	// 模拟账号信息
	const mockCredentials = {
		username: "admin",
		password: "123456",
	};

	// 处理登录
	async function handleLogin() {
		// 清空错误信息
		errorMessage = "";

		// 验证输入
		if (!username || !password) {
			errorMessage = "请输入账号和密码";
			return;
		}

		// 显示加载状态
		isLoading = true;

		// 模拟登录验证
		setTimeout(() => {
			if (login(username, password)) {
				// 登录成功，跳转到主界面
				goto(`${base}/`);
			} else {
				// 登录失败，显示错误信息
				errorMessage = "账号或密码错误";
				isLoading = false;
			}
		}, 1000);
	}

	// 切换密码显示状态
	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	// 处理回车键登录
	function handleKeyPress(event) {
		if (event.key === "Enter") {
			handleLogin();
		}
	}
</script>

<div
	class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 p-4"
>
	<div class="w-full max-w-md">
		<!-- 登录卡片 -->
		<div
			class="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 transform transition-all duration-300 hover:shadow-xl"
		>
			<!-- 品牌标识 -->
			<div class="text-center mb-8">
				<h1 class="text-3xl font-extrabold text-blue-800 mb-2">
					精准架构师
				</h1>
				<p class="text-slate-500">需求管理系统</p>
			</div>

			<!-- 错误提示 -->
			{#if errorMessage}
				<div
					class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
				>
					<p class="text-red-600 text-sm font-medium">
						{errorMessage}
					</p>
				</div>
			{/if}

			<!-- 登录表单 -->
			<form on:submit|preventDefault={handleLogin} class="space-y-6">
				<!-- 账号输入 -->
				<div>
					<label
						for="username"
						class="block text-sm font-medium text-slate-700 mb-2"
					>
						账号
					</label>
					<div class="relative">
						<span
							class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
						>
							<span class="material-symbols-outlined">person</span
							>
						</span>
						<input
							id="username"
							type="text"
							bind:value={username}
							on:keypress={handleKeyPress}
							class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
							placeholder="请输入账号"
							required
						/>
					</div>
				</div>

				<!-- 密码输入 -->
				<div>
					<label
						for="password"
						class="block text-sm font-medium text-slate-700 mb-2"
					>
						密码
					</label>
					<div class="relative">
						<span
							class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
						>
							<span class="material-symbols-outlined">lock</span>
						</span>
						<!-- 密码输入框 -->
						{#if !showPassword}
							<input
								id="password"
								type="password"
								bind:value={password}
								on:keypress={handleKeyPress}
								class="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
								placeholder="请输入密码"
								required
							/>
						{:else}
							<!-- 文本输入框（显示密码） -->
							<input
								id="password-text"
								type="text"
								bind:value={password}
								on:keypress={handleKeyPress}
								class="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
								placeholder="请输入密码"
								required
							/>
						{/if}
						<button
							type="button"
							on:click={togglePasswordVisibility}
							class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
						>
							<span class="material-symbols-outlined">
								{showPassword ? "visibility_off" : "visibility"}
							</span>
						</button>
					</div>
				</div>

				<!-- 登录按钮 -->
				<button
					type="submit"
					disabled={isLoading}
					class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
				>
					{#if isLoading}
						<span class="material-symbols-outlined animate-spin"
							>refresh</span
						>
						登录中...
					{:else}
						登录
					{/if}
				</button>
			</form>

			<!-- 模拟账号信息 -->
			<div
				class="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200"
			>
				<h3 class="text-sm font-semibold text-slate-700 mb-2">
					模拟账号信息
				</h3>
				<p class="text-xs text-slate-600">
					账号: <span class="font-mono"
						>{mockCredentials.username}</span
					>
				</p>
				<p class="text-xs text-slate-600">
					密码: <span class="font-mono"
						>{mockCredentials.password}</span
					>
				</p>
			</div>

			<!-- 底部链接 -->
			<div class="mt-8 text-center text-sm text-slate-500">
				<p>© 2026 精准架构师. 保留所有权利.</p>
			</div>
		</div>
	</div>
</div>
