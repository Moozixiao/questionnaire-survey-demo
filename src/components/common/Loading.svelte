<script>
	export let isLoading = false;
	export let message = '加载中...';
	export let fullscreen = true;
</script>

{#if isLoading}
	<div class={`${fullscreen ? 'fixed inset-0 z-50 flex items-center justify-center bg-surface/80 backdrop-blur-sm' : 'flex items-center justify-center'}`}>
		<div class="relative">
			<!-- Circular Loader -->
			<div class="w-16 h-16 md:w-20 md:h-20 relative">
				<div class="absolute inset-0 rounded-full border-4 border-primary/20"></div>
				<div class="absolute inset-0 rounded-full border-4 border-t-primary animate-spin"></div>
				<div class="absolute inset-2 rounded-full border-4 border-tertiary/30"></div>
			</div>
			<!-- Loading Message -->
			{#if message}
				<div class="mt-6 text-center">
					<p class="text-on-surface font-medium">{message}</p>
					<div class="mt-2 flex justify-center space-x-1">
						{#each [1, 2, 3] as dot, index}
							<div class="w-2 h-2 rounded-full bg-primary animate-pulse" style="animation-delay: {index * 0.2}s"></div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.animate-spin {
		animation: spin 1s linear infinite;
	}

	.animate-pulse {
		animation: pulse 1.5s ease-in-out infinite;
	}
</style>