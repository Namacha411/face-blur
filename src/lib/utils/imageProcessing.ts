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
 * Blur scales proportionally with face size for consistent privacy protection
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
	// Calculate blur based on face width: 8-20% of face size
	// This ensures blur scales with resolution (larger faces = stronger blur)
	const minBlurPercent = 0.08; // 8% at intensity 0
	const maxBlurPercent = 0.20; // 20% at intensity 100
	const blurPercent = minBlurPercent + ((maxBlurPercent - minBlurPercent) * (intensity / 100));
	const faceBasedBlur = w * blurPercent;

	// Clamp between 10px minimum and 200px maximum
	const blurAmount = Math.max(10, Math.min(faceBasedBlur, 200));

	ctx.filter = `blur(${blurAmount}px)`;
	ctx.drawImage(image, x, y, w, h, 0, 0, w, h);
	ctx.filter = 'none';
}

/**
 * Apply pixelate effect by downscaling and upscaling
 * Pixel size scales proportionally with face size
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
	// Calculate pixel size based on face width: 2-15% of face size
	// This ensures pixelation scales with resolution
	const minPixelPercent = 0.02; // 2% at intensity 0
	const maxPixelPercent = 0.15; // 15% at intensity 100
	const pixelPercent = minPixelPercent + ((maxPixelPercent - minPixelPercent) * (intensity / 100));
	const faceBasedPixelSize = w * pixelPercent;

	// Clamp between 2px minimum and 100px maximum
	const pixelSize = Math.max(2, Math.min(Math.floor(faceBasedPixelSize), 100));

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
 * Maximum obscuring effect with proportional scaling
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
	// Calculate heavy blur based on face width: 10-25% of face size
	// Stronger than gaussian for maximum privacy protection
	const minBlurPercent = 0.10; // 10% at intensity 0
	const maxBlurPercent = 0.25; // 25% at intensity 100
	const blurPercent = minBlurPercent + ((maxBlurPercent - minBlurPercent) * (intensity / 100));
	const faceBasedBlur = w * blurPercent;

	// Clamp between 15px minimum and 250px maximum
	const blurAmount = Math.max(15, Math.min(faceBasedBlur, 250));

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
