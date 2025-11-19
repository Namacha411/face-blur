<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Face Blur App - Privacy-Focused Photo Editor</title>
	<meta name="description" content="Automatically blur faces in photos. 100% client-side processing - your images never leave your device." />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
	<meta name="theme-color" content="#3b82f6" />
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<ErrorMessage />
	{@render children()}
</div>
