import { writable } from 'svelte/store';

interface LoadingState {
	isLoading: boolean;
	message: string;
	fullscreen: boolean;
}

const createLoadingStore = () => {
	const { set, update, subscribe } = writable<LoadingState>({
		isLoading: false,
		message: '加载中...',
		fullscreen: true
	});

	return {
		subscribe,
		show: (message: string = '加载中...', fullscreen: boolean = true) => {
			set({ isLoading: true, message, fullscreen });
		},
		hide: () => {
			set({ isLoading: false, message: '加载中...', fullscreen: true });
		}
	};
};

export const loadingStore = createLoadingStore();