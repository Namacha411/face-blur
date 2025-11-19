/**
 * Application constants
 */

import type { BlurStyle } from '$lib/types';

/**
 * Maximum image dimension (width or height)
 * Images larger than this will be resized to prevent memory issues
 */
export const MAX_IMAGE_SIZE = 4096;

/**
 * Available blur styles with display names
 */
export const BLUR_STYLES: Array<{ value: BlurStyle; label: string }> = [
	{ value: 'gaussian', label: 'Gaussian Blur' },
	{ value: 'pixelate', label: 'Pixelate' },
	{ value: 'heavy', label: 'Heavy Blur' }
];

/**
 * Default blur intensity (0-100)
 */
export const DEFAULT_BLUR_INTENSITY = 50;

/**
 * Minimum confidence score for face detection (0-1)
 */
export const MIN_DETECTION_CONFIDENCE = 0.2;

/**
 * Multiplier for face bounding box padding
 * 1.2 means 20% padding around the detected face
 */
export const FACE_PADDING_MULTIPLIER = 1.2;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
	NO_FACES_DETECTED: 'No faces detected in the image. Please try another image.',
	IMAGE_LOAD_FAILED: 'Failed to load image. Please try another file.',
	FACE_DETECTOR_INIT_FAILED: 'Failed to initialize face detector. Please refresh the page.',
	INVALID_FILE_TYPE: 'Invalid file type. Please upload an image file.',
	IMAGE_TOO_LARGE: `Image is too large. Maximum size is ${MAX_IMAGE_SIZE}px.`,
	DOWNLOAD_FAILED: 'Failed to download image. Please try again.',
	PROCESSING_FAILED: 'Failed to process image. Please try again.'
};
