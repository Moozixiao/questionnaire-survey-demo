<script>
    export let progress = 0;
    export let label = "";
</script>

<div class="mb-6">
    {#if label}
        <div class="flex items-end justify-between mb-2">
            <span
                class="text-primary font-bold text-sm tracking-widest font-label uppercase"
                >{label}</span
            >
            <span class="text-2xl font-black text-primary"
                >{Math.round(progress)}%</span
            >
        </div>
    {/if}
    <div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
        <div
            class="h-full bg-primary transition-all duration-700 ease-out"
            style="width: {progress}%"
        ></div>
    </div>
</div>
