<script lang="ts">
	import { blurIntensity, blurStyle, detectedFaces, isProcessing, error } from '$lib/stores/appState';
	import type { BlurStyle } from '$lib/types';
	import { downloadImage } from '$lib/utils/fileHandler';

	const BLUR_STYLES_JA: Array<{ value: BlurStyle; label: string }> = [
		{ value: 'gaussian', label: 'ガウスぼかし' },
		{ value: 'pixelate', label: 'モザイク' },
		{ value: 'heavy', label: '強力ぼかし' }
	];

	const ERROR_MESSAGE_DOWNLOAD_FAILED = 'ダウンロードに失敗しました。もう一度お試しください。';

	let canvasElement: HTMLCanvasElement | null = null;

	// Get canvas reference from parent (will be passed via context or prop)
	export function setCanvas(canvas: HTMLCanvasElement) {
		canvasElement = canvas;
	}

	async function handleDownload() {
		const canvas = document.querySelector('canvas');
		if (!canvas) {
			error.set(ERROR_MESSAGE_DOWNLOAD_FAILED);
			return;
		}

		try {
			await downloadImage(canvas);
		} catch (err) {
			console.error('Download error:', err);
			error.set(ERROR_MESSAGE_DOWNLOAD_FAILED);
		}
	}

	$: showControls = $detectedFaces.length > 0;
</script>

{#if showControls}
	<div class="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
		<!-- Blur Style Selector -->
		<div>
			<div class="block text-sm font-medium text-gray-700 mb-2" role="group" aria-label="ぼかしスタイル">ぼかしスタイル</div>
			<div class="grid grid-cols-3 gap-2">
				{#each BLUR_STYLES_JA as style}
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
				ぼかし強度: {$blurIntensity}
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
				画像をダウンロード
			</button>
		</div>

		<!-- Instructions -->
		<div class="text-sm text-gray-600 text-center">
			<p>顔をタップしてぼかしのオン/オフを切り替え</p>
			<p class="text-xs mt-1">白枠 = ぼかし適用 | 緑枠 = 表示中</p>
		</div>
	</div>
{/if}
