import { writable } from 'svelte/store';

// 主题类型定义
export type ThemeMode = 'light' | 'dark' | 'system';

// 主题设置类型定义
export interface ThemeSettings {
    mode: ThemeMode;
    custom: {
        primaryColor: string;
        fontSize: 'small' | 'medium' | 'large';
        spacing: 'compact' | 'default' | 'comfortable';
    };
}

// 默认主题设置
const defaultTheme: ThemeSettings = {
    mode: 'system',
    custom: {
        primaryColor: '#3b82f6', // 蓝色
        fontSize: 'medium',
        spacing: 'default'
    }
};

// 加载保存的主题设置
function loadTheme(): ThemeSettings {
    if (typeof localStorage !== 'undefined') {
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return JSON.parse(savedTheme);
            }
        } catch (error) {
            console.error('Failed to load theme settings:', error);
        }
    }
    return defaultTheme;
}

// 创建主题存储
const themeStore = writable<ThemeSettings>(loadTheme());

// 订阅主题变化，保存到本地存储
if (typeof localStorage !== 'undefined') {
    themeStore.subscribe((theme) => {
        try {
            localStorage.setItem('theme', JSON.stringify(theme));
        } catch (error) {
            console.error('Failed to save theme settings:', error);
        }
    });
}

// 应用主题到文档
function applyTheme(theme: ThemeSettings) {
    // 移除旧的主题类
    document.documentElement.classList.remove('light', 'dark');
    
    // 确定当前主题模式
    let currentMode: 'light' | 'dark';
    if (theme.mode === 'system') {
        currentMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
        currentMode = theme.mode;
    }
    
    // 添加新的主题类
    document.documentElement.classList.add(currentMode);
    
    // 应用自定义设置
    applyCustomSettings(theme.custom);
}

// 应用自定义设置
function applyCustomSettings(custom: ThemeSettings['custom']) {
    // 应用主色调
    document.documentElement.style.setProperty('--primary-color', custom.primaryColor);
    
    // 应用字体大小
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    switch (custom.fontSize) {
        case 'small':
            document.documentElement.classList.add('text-sm');
            break;
        case 'large':
            document.documentElement.classList.add('text-lg');
            break;
        default:
            document.documentElement.classList.add('text-base');
    }
    
    // 应用间距
    document.documentElement.classList.remove('space-compact', 'space-default', 'space-comfortable');
    document.documentElement.classList.add(`space-${custom.spacing}`);
}

// 主题操作函数
export function setThemeMode(mode: ThemeMode) {
    themeStore.update((theme) => {
        const newTheme = { ...theme, mode };
        applyTheme(newTheme);
        return newTheme;
    });
}

export function updateCustomSettings(custom: Partial<ThemeSettings['custom']>) {
    themeStore.update((theme) => {
        const newTheme = { 
            ...theme, 
            custom: { ...theme.custom, ...custom }
        };
        applyTheme(newTheme);
        return newTheme;
    });
}

export function resetTheme() {
    themeStore.set(defaultTheme);
    applyTheme(defaultTheme);
}

// 初始化主题
if (typeof window !== 'undefined') {
    // 应用初始主题
    themeStore.subscribe(applyTheme);
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        themeStore.update((theme) => {
            if (theme.mode === 'system') {
                applyTheme(theme);
            }
            return theme;
        });
    });
}

export default themeStore;