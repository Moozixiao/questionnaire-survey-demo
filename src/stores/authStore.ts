import { writable } from 'svelte/store';

// 登录状态store
export const authStore = writable({
	isLoggedIn: false,
	user: null,
	token: null
});

// 订阅登录状态变化
if (typeof window !== 'undefined') {
	authStore.subscribe((state) => {
		console.log('Auth store state changed:', state);
	});
}

// 登录函数
export function login(username, password) {
	// 模拟登录验证
	if (username === 'admin' && password === '123456') {
		const authData = {
			isLoggedIn: true,
			user: {
				username: 'admin',
				name: 'Alex Chen',
				role: '首席架构师'
			},
			token: 'mock-token-' + Date.now()
		};
		authStore.set(authData);
		// 保存登录状态到localStorage（仅在客户端）
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('auth', JSON.stringify(authData));
		}
		return true;
	}
	return false;
}

// 登出函数
export function logout() {
	authStore.set({
		isLoggedIn: false,
		user: null,
		token: null
	});
	// 清除localStorage中的登录状态（仅在客户端）
	if (typeof localStorage !== 'undefined') {
		localStorage.removeItem('auth');
	}
}

// 初始化登录状态
export function initAuth() {
	// 检查localStorage是否存在（在服务器端渲染时不存在）
	if (typeof localStorage !== 'undefined') {
		const savedAuth = localStorage.getItem('auth');
		if (savedAuth) {
			try {
				const auth = JSON.parse(savedAuth);
				authStore.set(auth);
			} catch (e) {
				// 解析失败，清除无效数据
				localStorage.removeItem('auth');
			}
		}
	}
}