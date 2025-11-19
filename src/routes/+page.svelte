<script lang="ts">
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import FaceCanvas from '$lib/components/FaceCanvas.svelte';
	import ControlPanel from '$lib/components/ControlPanel.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { isProcessing, uploadedImage, detectedFaces } from '$lib/stores/appState';
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<!-- Header -->
	<header class="text-center mb-8">
		<h1 class="text-4xl font-bold text-gray-800 mb-2">Face Blur App</h1>
		<p class="text-gray-600">
			Automatically blur faces in photos. 100% client-side - your images never leave your device.
		</p>
	</header>

	<!-- Main Content -->
	<main class="space-y-8">
		<!-- Image Upload Section -->
		{#if !$uploadedImage}
			<ImageUploader />
		{/if}

		<!-- Loading State -->
		{#if $isProcessing}
			<LoadingSpinner />
		{/if}

		<!-- Canvas Display -->
		<FaceCanvas />

		<!-- Control Panel -->
		<ControlPanel />

		<!-- Instructions (shown when no image uploaded) -->
		{#if !$uploadedImage && !$isProcessing}
			<div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
				<h2 class="text-lg font-semibold text-blue-900 mb-3">How to use:</h2>
				<ol class="list-decimal list-inside space-y-2 text-blue-800">
					<li>Upload an image from your device</li>
					<li>The app will automatically detect and blur all faces</li>
					<li>Tap any face to toggle blur on/off</li>
					<li>Adjust blur style and intensity to your preference</li>
					<li>Download or share the processed image</li>
				</ol>
			</div>

			<div class="bg-green-50 border border-green-200 rounded-lg p-6">
				<h2 class="text-lg font-semibold text-green-900 mb-3">Privacy Guarantee:</h2>
				<p class="text-green-800">
					All image processing happens directly in your browser using WebAssembly and Canvas API.
					Your photos are <strong>never uploaded</strong> to any server. This app works completely
					offline after the initial load.
				</p>
			</div>
		{/if}

		<!-- Upload Another Image Button -->
		{#if $uploadedImage}
			<div class="text-center">
				<button
					onclick={() => window.location.reload()}
					class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
				>
					Upload Another Image
				</button>
			</div>
		{/if}
	</main>

	<!-- Footer -->
	<footer class="mt-12 text-center text-sm text-gray-500">
		<p>
			Built with <a
				href="https://kit.svelte.dev"
				class="text-blue-500 hover:underline"
				target="_blank">SvelteKit</a
			>
			and
			<a
				href="https://developers.google.com/mediapipe"
				class="text-blue-500 hover:underline"
				target="_blank">MediaPipe</a
			>
		</p>
	</footer>
</div>
