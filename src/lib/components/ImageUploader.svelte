<script lang="ts">
	import { loadImage } from '$lib/utils/fileHandler';
	import { detectFaces } from '$lib/utils/faceDetection';
	import {
		uploadedImage,
		detectedFaces,
		blurredFaceIds,
		isProcessing,
		error
	} from '$lib/stores/appState';
	import { ERROR_MESSAGES } from '$lib/utils/constants';

	async function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (!file) return;

		// Validate file type
		if (!file.type.startsWith('image/')) {
			error.set(ERROR_MESSAGES.INVALID_FILE_TYPE);
			return;
		}

		try {
			isProcessing.set(true);
			error.set(null);

			// Load and resize image
			const img = await loadImage(file);
			uploadedImage.set(img);

			// Detect faces
			const faces = await detectFaces(img);

			if (faces.length === 0) {
				error.set(ERROR_MESSAGES.NO_FACES_DETECTED);
				detectedFaces.set([]);
				blurredFaceIds.set(new Set());
			} else {
				detectedFaces.set(faces);
				// Initially blur all detected faces
				blurredFaceIds.set(new Set(faces.map((f) => f.id)));
			}
		} catch (err) {
			console.error('Error processing image:', err);
			error.set(ERROR_MESSAGES.PROCESSING_FAILED);
		} finally {
			isProcessing.set(false);
		}
	}
</script>

<div class="w-full">
	<label
		class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
	>
		<div class="flex flex-col items-center justify-center pt-5 pb-6">
			<svg
				class="w-12 h-12 mb-4 text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				></path>
			</svg>
			<p class="mb-2 text-sm text-gray-500">
				<span class="font-semibold">Click to upload</span> or drag and drop
			</p>
			<p class="text-xs text-gray-500">PNG, JPG, GIF up to 4096px</p>
		</div>
		<input
			type="file"
			class="hidden"
			accept="image/*"
			onchange={handleFileSelect}
			disabled={$isProcessing}
		/>
	</label>
</div>
