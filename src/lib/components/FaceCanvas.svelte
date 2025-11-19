<script lang="ts">
	import { onMount } from 'svelte';
	import { applyBlur } from '$lib/utils/imageProcessing';
	import {
		uploadedImage,
		detectedFaces,
		blurredFaceIds,
		blurIntensity,
		blurStyle
	} from '$lib/stores/appState';

	let canvas = $state<HTMLCanvasElement>();

	// Redraw canvas whenever relevant state changes
	$effect(() => {
		const img = $uploadedImage;
		const faces = $detectedFaces;
		const blurred = $blurredFaceIds;
		const intensity = $blurIntensity;
		const style = $blurStyle;

		if (canvas && img && faces.length > 0) {
			applyBlur(canvas, img, faces, blurred, {
				style,
				intensity
			});
		}
	});

	function handleCanvasTap(event: MouseEvent | TouchEvent) {
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		// Get tap coordinates
		let clientX: number, clientY: number;
		if (event instanceof MouseEvent) {
			clientX = event.clientX;
			clientY = event.clientY;
		} else {
			event.preventDefault(); // Prevent scrolling on touch
			clientX = event.touches[0].clientX;
			clientY = event.touches[0].clientY;
		}

		// Convert display coordinates to canvas coordinates
		const x = (clientX - rect.left) * scaleX;
		const y = (clientY - rect.top) * scaleY;

		// Find tapped face
		const tappedFace = $detectedFaces.find((face) => {
			const { originX, originY, width, height } = face.boundingBox;
			return x >= originX && x <= originX + width && y >= originY && y <= originY + height;
		});

		if (tappedFace) {
			toggleFaceBlur(tappedFace.id);
		}
	}

	function toggleFaceBlur(faceId: string) {
		blurredFaceIds.update((set) => {
			const newSet = new Set(set);
			if (newSet.has(faceId)) {
				newSet.delete(faceId);
			} else {
				newSet.add(faceId);
			}
			return newSet;
		});
	}
</script>

{#if $uploadedImage && $detectedFaces.length > 0}
	<div class="w-full flex justify-center my-4">
		<canvas
			bind:this={canvas}
			class="max-w-full h-auto border-2 border-gray-300 rounded-lg shadow-lg cursor-pointer"
			onclick={handleCanvasTap}
			ontouchstart={handleCanvasTap}
		></canvas>
	</div>
{/if}
