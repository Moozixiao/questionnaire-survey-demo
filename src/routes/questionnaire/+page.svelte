<script>
    import ProgressBar from "../../components/layout/ProgressBar.svelte";
    import { base } from "$app/paths";
</script>

<div class="max-w-7xl mx-auto space-y-8">
    <!-- Progress Header -->
    <div class="mb-12">
        <h1 class="text-4xl font-extrabold text-on-surface mb-6">问卷模块</h1>
        <p class="text-secondary text-lg mb-8">请选择以下模块开始填写问卷</p>

        <!-- Module Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Project Core Module -->
            <a
                href="{base}/questionnaire/project-core"
                class="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-primary group"
            >
                <div class="flex items-center gap-4 mb-4">
                    <div
                        class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                        <span class="material-symbols-outlined">assignment</span
                        >
                    </div>
                    <h3 class="text-xl font-bold text-on-surface">项目核心</h3>
                </div>
                <p class="text-secondary text-sm mb-6">
                    定义项目的基本信息和核心目标
                </p>
                <div
                    class="flex items-center gap-2 text-primary font-bold group-hover:translate-x-2 transition-transform"
                >
                    <span>开始填写</span>
                    <span class="material-symbols-outlined">arrow_forward</span>
                </div>
            </a>

            <!-- Technical Module -->
            <a
                href="{base}/questionnaire/technical"
                class="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-secondary group"
            >
                <div class="flex items-center gap-4 mb-4">
                    <div
                        class="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors"
                    >
                        <span class="material-symbols-outlined">layers</span>
                    </div>
                    <h3 class="text-xl font-bold text-on-surface">技术层面</h3>
                </div>
                <p class="text-secondary text-sm mb-6">
                    技术栈选择和技术可行性评估
                </p>
                <div
                    class="flex items-center gap-2 text-secondary font-bold group-hover:translate-x-2 transition-transform"
                >
                    <span>开始填写</span>
                    <span class="material-symbols-outlined">arrow_forward</span>
                </div>
            </a>

            <!-- Logistics Module -->
            <a
                href="{base}/questionnaire/logistics"
                class="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-tertiary group"
            >
                <div class="flex items-center gap-4 mb-4">
                    <div
                        class="w-12 h-12 bg-tertiary/10 rounded-lg flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-white transition-colors"
                    >
                        <span class="material-symbols-outlined"
                            >local_shipping</span
                        >
                    </div>
                    <h3 class="text-xl font-bold text-on-surface">后勤规划</h3>
                </div>
                <p class="text-secondary text-sm mb-6">项目时间线和资源规划</p>
                <div
                    class="flex items-center gap-2 text-tertiary font-bold group-hover:translate-x-2 transition-transform"
                >
                    <span>开始填写</span>
                    <span class="material-symbols-outlined">arrow_forward</span>
                </div>
            </a>
        </div>
    </div>
</div>
