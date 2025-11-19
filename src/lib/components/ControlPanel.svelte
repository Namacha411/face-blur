<script lang="ts">
	import { blurIntensity, blurStyle, detectedFaces, isProcessing, error, uploadedImage, blurredFaceIds } from '$lib/stores/appState';
	import { BLUR_STYLES, ERROR_MESSAGES } from '$lib/utils/constants';
	import { downloadImage } from '$lib/utils/fileHandler';
	import { applyBlur } from '$lib/utils/imageProcessing';

	let canvasElement: HTMLCanvasElement | null = null;

	// Get canvas reference from parent (will be passed via context or prop)
	export function setCanvas(canvas: HTMLCanvasElement) {
		canvasElement = canvas;
	}

	async function handleDownload() {
		const img = $uploadedImage;
		const faces = $detectedFaces;
		const blurred = $blurredFaceIds;

		if (!img || faces.length === 0) {
			error.set(ERROR_MESSAGES.DOWNLOAD_FAILED);
			return;
		}

		try {
			// Create a temporary canvas without overlays for clean download
			const tempCanvas = document.createElement('canvas');
			applyBlur(tempCanvas, img, faces, blurred, {
				style: $blurStyle,
				intensity: $blurIntensity
			}, false); // false = no overlays

			await downloadImage(tempCanvas);
		} catch (err) {
			console.error('Download error:', err);
			error.set(ERROR_MESSAGES.DOWNLOAD_FAILED);
		}
	}

	$: showControls = $detectedFaces.length > 0;
</script>

{#if showControls}
	<div class="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
		<!-- Blur Style Selector -->
		<div>
			<div class="block text-sm font-medium text-gray-700 mb-2" role="group" aria-label="Blur Style">Blur Style</div>
			<div class="grid grid-cols-3 gap-2">
				{#each BLUR_STYLES as style}
					<button
						onclick={() => blurStyle.set(style.value)}
						class="px-4 py-2 rounded-md font-medium transition-colors {$blurStyle === style.value
							? 'bg-blue-500 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
						disabled={$isProcessing}
					>
						{style.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Intensity Slider -->
		<div>
			<label for="blur-intensity" class="block text-sm font-medium text-gray-700 mb-2">
				Blur Intensity: {$blurIntensity}
			</label>
			<input
				id="blur-intensity"
				type="range"
				min="0"
				max="100"
				bind:value={$blurIntensity}
				class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
				disabled={$isProcessing}
			/>
		</div>

		<!-- Download Button -->
		<div>
			<button
				onclick={handleDownload}
				class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={$isProcessing}
			>
				Download Image
			</button>
		</div>

		<!-- Instructions -->
		<div class="text-sm text-gray-600 text-center">
			<p>Tap faces to toggle blur on/off</p>
			<p class="text-xs mt-1">White border = blurred | Green border = visible</p>
		</div>
	</div>
{/if}
