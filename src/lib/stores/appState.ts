/**
 * Application state management using Svelte stores
 */

import { writable } from 'svelte/store';
import type { DetectedFace, BlurStyle } from '$lib/types';
import { DEFAULT_BLUR_INTENSITY, MIN_DETECTION_CONFIDENCE } from '$lib/utils/constants';

/**
 * Currently uploaded image
 */
export const uploadedImage = writable<HTMLImageElement | null>(null);

/**
 * Array of detected faces with bounding boxes
 */
export const detectedFaces = writable<DetectedFace[]>([]);

/**
 * Set of face IDs that are currently blurred
 */
export const blurredFaceIds = writable<Set<string>>(new Set());

/**
 * Current blur intensity (0-100)
 */
export const blurIntensity = writable<number>(DEFAULT_BLUR_INTENSITY);

/**
 * Current blur style
 */
export const blurStyle = writable<BlurStyle>('gaussian');

/**
 * Face detection confidence threshold (0-1)
 */
export const detectionConfidence = writable<number>(MIN_DETECTION_CONFIDENCE);

/**
 * Processing state flag
 */
export const isProcessing = writable<boolean>(false);

/**
 * Error message (null if no error)
 */
export const error = writable<string | null>(null);

/**
 * Reset all stores to initial state
 */
export function resetAppState(): void {
	uploadedImage.set(null);
	detectedFaces.set([]);
	blurredFaceIds.set(new Set());
	blurIntensity.set(DEFAULT_BLUR_INTENSITY);
	blurStyle.set('gaussian');
	detectionConfidence.set(MIN_DETECTION_CONFIDENCE);
	isProcessing.set(false);
	error.set(null);
}
