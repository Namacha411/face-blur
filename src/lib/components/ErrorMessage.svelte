<script lang="ts">
	import { error } from '$lib/stores/appState';
	import { onMount } from 'svelte';

	// Auto-dismiss error after 5 seconds
	$effect(() => {
		if ($error) {
			const timeout = setTimeout(() => {
				error.set(null);
			}, 5000);

			return () => clearTimeout(timeout);
		}
	});

	function dismiss() {
		error.set(null);
	}
</script>

{#if $error}
	<div
		class="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between"
	>
		<p class="flex-1">{$error}</p>
		<button
			onclick={dismiss}
			class="ml-4 text-white hover:text-gray-200 font-bold text-xl"
			aria-label="Dismiss error"
		>
			×
		</button>
	</div>
{/if}
