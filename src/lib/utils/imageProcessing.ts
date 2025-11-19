/**
 * Image processing utilities for applying blur effects to faces
 */

import type { DetectedFace, BlurConfig } from '$lib/types';

/**
 * Apply blur to selected faces on canvas
 * Main orchestration function that coordinates all blur operations
 */
export function applyBlur(
	canvas: HTMLCanvasElement,
	image: HTMLImageElement,
	faces: DetectedFace[],
	blurredFaceIds: Set<string>,
	config: BlurConfig
): void {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	// Set canvas dimensions to match image
	canvas.width = image.width;
	canvas.height = image.height;

	// 1. Draw original image
	ctx.drawImage(image, 0, 0);

	// 2. Apply blur to each selected face
	faces.forEach((face) => {
		if (blurredFaceIds.has(face.id)) {
			applyFaceBlur(ctx, image, face, config);
		}
	});

	// 3. Draw overlay borders for visual feedback
	faces.forEach((face) => {
		drawFaceOverlay(ctx, face, blurredFaceIds.has(face.id));
	});
}

/**
 * Apply blur effect to a single face
 */
function applyFaceBlur(
	ctx: CanvasRenderingContext2D,
	image: HTMLImageElement,
	face: DetectedFace,
	config: BlurConfig
): void {
	const { originX, originY, width, height } = face.boundingBox;

	// Add padding around face (1.2x multiplier = 20% padding)
	const padding = 0.2;
	const x = Math.max(0, originX - (width * padding) / 2);
	const y = Math.max(0, originY - (height * padding) / 2);
	const w = Math.min(image.width - x, width * (1 + padding));
	const h = Math.min(image.height - y, height * (1 + padding));

	// Create temporary canvas for blur processing
	const tempCanvas = document.createElement('canvas');
	const tempCtx = tempCanvas.getContext('2d');
	if (!tempCtx) return;

	tempCanvas.width = w;
	tempCanvas.height = h;

	// Apply blur based on selected style
	switch (config.style) {
		case 'gaussian':
			applyGaussianBlur(tempCtx, image, x, y, w, h, config.intensity);
			break;
		case 'pixelate':
			applyPixelate(tempCtx, image, x, y, w, h, config.intensity);
			break;
		case 'heavy':
			applyHeavyBlur(tempCtx, image, x, y, w, h, config.intensity);
			break;
	}

	// Draw blurred region onto main canvas
	ctx.drawImage(tempCanvas, x, y);
}

/**
 * Apply Gaussian blur using Canvas filter
 */
function applyGaussianBlur(
	ctx: CanvasRenderingContext2D,
	image: HTMLImageElement,
	x: number,
	y: number,
	w: number,
	h: number,
	intensity: number
): void {
	// Convert intensity (0-100) to blur amount (0-30px)
	const blurAmount = (intensity / 100) * 30;
	ctx.filter = `blur(${blurAmount}px)`;
	ctx.drawImage(image, x, y, w, h, 0, 0, w, h);
	ctx.filter = 'none';
}

/**
 * Apply pixelate effect by downscaling and upscaling
 */
function applyPixelate(
	ctx: CanvasRenderingContext2D,
	image: HTMLImageElement,
	x: number,
	y: number,
	w: number,
	h: number,
	intensity: number
): void {
	// Calculate pixel size (higher intensity = coarser pixels)
	const pixelSize = Math.max(1, Math.floor((intensity / 100) * 20));

	const smallW = Math.ceil(w / pixelSize);
	const smallH = Math.ceil(h / pixelSize);

	// Disable smoothing for pixelated effect
	ctx.imageSmoothingEnabled = false;

	// Downscale then upscale to create pixelation
	ctx.drawImage(image, x, y, w, h, 0, 0, smallW, smallH);
	ctx.drawImage(ctx.canvas, 0, 0, smallW, smallH, 0, 0, w, h);

	ctx.imageSmoothingEnabled = true;
}

/**
 * Apply heavy blur with brightness adjustment
 */
function applyHeavyBlur(
	ctx: CanvasRenderingContext2D,
	image: HTMLImageElement,
	x: number,
	y: number,
	w: number,
	h: number,
	intensity: number
): void {
	// Stronger blur with darkening effect
	const blurAmount = (intensity / 100) * 40;
	ctx.filter = `blur(${blurAmount}px) brightness(0.8)`;
	ctx.drawImage(image, x, y, w, h, 0, 0, w, h);
	ctx.filter = 'none';
}

/**
 * Draw colored border around face for visual feedback
 */
export function drawFaceOverlay(
	ctx: CanvasRenderingContext2D,
	face: DetectedFace,
	isBlurred: boolean
): void {
	const { originX, originY, width, height } = face.boundingBox;

	// White border for blurred faces, green for unblurred
	ctx.strokeStyle = isBlurred ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 255, 0, 0.8)';
	ctx.lineWidth = 3;
	ctx.strokeRect(originX, originY, width, height);
}
