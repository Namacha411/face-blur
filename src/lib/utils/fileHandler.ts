/**
 * File handling utilities for loading and saving images
 * Includes iOS-specific handling with Web Share API
 */

import { MAX_IMAGE_SIZE } from './constants';

/**
 * Download/share processed image
 * Uses Web Share API on iOS, direct download on desktop
 */
export async function downloadImage(
	canvas: HTMLCanvasElement,
	filename: string = `face-blur-${Date.now()}.png`
): Promise<void> {
	try {
		// Check if running on iOS
		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

		if (isIOS && navigator.share) {
			// iOS: Use Web Share API
			const blob = await new Promise<Blob>((resolve) =>
				canvas.toBlob((blob) => resolve(blob!), 'image/png')
			);

			const file = new File([blob], filename, { type: 'image/png' });

			await navigator.share({
				files: [file],
				title: 'Face Blur Image',
				text: 'Processed with Face Blur App'
			});
		} else {
			// Desktop: Direct download
			const link = document.createElement('a');
			link.download = filename;
			link.href = canvas.toDataURL('image/png');
			link.click();
		}
	} catch (error) {
		console.error('Download failed:', error);
		throw new Error('Failed to save image');
	}
}

/**
 * Load image from file with automatic resizing if needed
 */
export async function loadImage(file: File): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			const img = new Image();

			img.onload = () => {
				// Check and resize if image is too large
				if (img.width > MAX_IMAGE_SIZE || img.height > MAX_IMAGE_SIZE) {
					const resized = resizeImage(img, MAX_IMAGE_SIZE);
					resolve(resized);
				} else {
					resolve(img);
				}
			};

			img.onerror = () => reject(new Error('Failed to load image'));
			img.src = e.target?.result as string;
		};

		reader.onerror = () => reject(new Error('Failed to read file'));
		reader.readAsDataURL(file);
	});
}

/**
 * Resize image to fit within maximum dimensions while maintaining aspect ratio
 */
function resizeImage(img: HTMLImageElement, maxSize: number): HTMLImageElement {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Failed to get canvas context');

	let width = img.width;
	let height = img.height;

	// Calculate new dimensions maintaining aspect ratio
	if (width > height) {
		if (width > maxSize) {
			height = (height * maxSize) / width;
			width = maxSize;
		}
	} else {
		if (height > maxSize) {
			width = (width * maxSize) / height;
			height = maxSize;
		}
	}

	canvas.width = width;
	canvas.height = height;
	ctx.drawImage(img, 0, 0, width, height);

	const resizedImg = new Image();
	resizedImg.src = canvas.toDataURL('image/png');
	return resizedImg;
}
