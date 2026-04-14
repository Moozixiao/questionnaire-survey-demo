<script>
    import { page } from "$app/stores";
    import { base } from "$app/paths";

    const currentPath = $page.url.pathname;

    const navItems = [
        { id: "dashboard", label: "核心", icon: "dashboard", href: `${base}/` },
        {
            id: "modules",
            label: "模块",
            icon: "layers",
            href: `${base}/questionnaire`,
        },
        { id: "report", label: "报告", icon: "assessment", href: `${base}/report` },
        { id: "settings", label: "设置", icon: "settings", href: `${base}/settings` },
    ];
</script>

<nav
    class="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/20 px-6 py-3 flex justify-between items-center z-[100]"
>
    {#each navItems as item}
        <button
            class={`flex flex-col items-center gap-1 ${
                currentPath.includes(item.id)
                    ? "text-primary"
                    : "text-slate-400"
            }`}
            on:click={() => (window.location.href = item.href)}
        >
            <span class="material-symbols-outlined">{item.icon}</span>
            <span class="text-[10px] font-bold">{item.label}</span>
        </button>
    {/each}
    <!-- <div class="relative -top-6">
		<button class="bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center">
			<span class="material-symbols-outlined text-3xl">add</span>
		</button>
	</div> -->
</nav>
