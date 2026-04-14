<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import LogoutModal from "../../components/auth/LogoutModal.svelte";
    import { base } from "$app/paths";

    const navItems = [
        { id: "dashboard", label: "仪表盘", icon: "dashboard", href: `${base}/` },
        {
            id: "modules",
            label: "模块",
            icon: "inventory_2",
            href: `${base}/questionnaire`,
        },
        { id: "report", label: "报告", icon: "summarize", href: `${base}/report` },
    ];

    // 用户信息
    const userInfo = {
        name: "Alex Chen",
        role: "首席架构师",
    };

    // 登出弹窗状态
    let showLogoutModal = false;

    // 获取用户名首字母
    function getInitials(name) {
        return name.charAt(0).toUpperCase();
    }

    // 响应式路径变量，确保路径变化时能正确更新
    $: currentPath = $page.url.pathname;

    /**
     * 判断导航项是否激活
     * @param {Object} item - 导航项对象
     * @returns {boolean} - 是否激活
     * @description 根据当前路径判断导航项是否应该处于激活状态
     */
    $: isActive = (item) => {
        if (item.href === `${base}/`) {
            // 仪表盘：只有根路径时激活
            return currentPath === `${base}/`;
        } else if (item.href === `${base}/questionnaire`) {
            // 模块：/questionnaire 或 /questionnaire/* 路径时激活
            return (
                currentPath === `${base}/questionnaire` ||
                currentPath.startsWith(`${base}/questionnaire/`)
            );
        } else {
            // 其他：精确匹配或以该路径开头
            return (
                currentPath === item.href ||
                currentPath.startsWith(item.href + "/")
            );
        }
    }

    // 处理登出
    function handleLogout() {
        showLogoutModal = true;
    }
</script>

<aside
    class="hidden md:flex flex-col h-screen w-64 lg:w-80 fixed left-0 top-0 bg-slate-50 border-r border-slate-200/15 z-[60] py-6 overflow-y-auto transition-all duration-300"
>
    <div class="px-6 mb-8">
        <div class="text-xl font-bold text-blue-800">精准架构师</div>
        <div class="text-xs text-secondary mt-1 font-medium">需求管理器</div>
    </div>
    <nav class="flex-1 space-y-1 px-4">
        {#each navItems as item}
            <a
                class={`flex items-center space-x-3 px-3 py-2 transition-colors duration-300 ${
                    isActive(item)
                        ? "text-blue-700 font-semibold border-r-4 border-blue-600 bg-slate-200"
                        : "text-slate-600 hover:bg-slate-200"
                }`}
                href={item.href}
                on:click={(e) => {
                    // 确保点击时能正确更新激活状态
                    e.preventDefault();
                    goto(item.href);
                }}
            >
                <span class="material-symbols-outlined">{item.icon}</span>
                <span class="text-sm font-label">{item.label}</span>
            </a>
        {/each}
    </nav>
    <div class="px-4 pt-4 border-t border-slate-200/30">
        <div class="flex items-center space-x-3 px-3 py-2 mb-4">
            <!-- 文本头像 -->
            <div
                class="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-sm shadow-md"
            >
                {getInitials(userInfo.name)}
            </div>
            <div class="overflow-hidden">
                <span class="text-xs font-bold truncate text-on-surface"
                    >{userInfo.name}</span
                >
                <span class="text-[10px] text-secondary">{userInfo.role}</span>
            </div>
        </div>
        <a
            class={`flex items-center space-x-3 px-3 py-2 transition-colors duration-300 ${
                currentPath === `${base}/settings` ||
                currentPath.startsWith(`${base}/settings/`)
                    ? "text-blue-700 font-semibold border-r-4 border-blue-600 bg-slate-200"
                    : "text-slate-600 hover:bg-slate-200"
            }`}
            href="${base}/settings"
            on:click={(e) => {
                e.preventDefault();
                goto(`${base}/settings`);
            }}
        >
            <span class="material-symbols-outlined">settings</span>
            <span class="text-sm font-label">系统设置</span>
        </a>
        <a
            class={`flex items-center space-x-3 px-3 py-2 transition-colors duration-300 ${
                currentPath === `${base}/support` ||
                currentPath.startsWith(`${base}/support/`)
                    ? "text-blue-700 font-semibold border-r-4 border-blue-600 bg-slate-200"
                    : "text-slate-600 hover:bg-slate-200"
            }`}
            href="${base}/support"
            on:click={(e) => {
                e.preventDefault();
                goto(`${base}/support`);
            }}
        >
            <span class="material-symbols-outlined">help</span>
            <span class="text-sm font-label">帮助与支持</span>
        </a>
        <!-- 登出按钮 -->
        <button
            class="w-full flex items-center space-x-3 px-3 py-2 transition-colors duration-300 text-slate-600 hover:bg-slate-200 hover:text-red-600"
            on:click={handleLogout}
        >
            <span class="material-symbols-outlined">logout</span>
            <span class="text-sm font-label">登出</span>
        </button>
    </div>
</aside>

<!-- 登出确认弹窗 -->
<LogoutModal bind:isVisible={showLogoutModal} />
