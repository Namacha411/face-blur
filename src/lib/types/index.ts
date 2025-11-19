/**
 * Type definitions for Face Blur App
 */

/**
 * Detected face with bounding box and metadata
 */
export interface DetectedFace {
	id: string;
	boundingBox: {
		originX: number;
		originY: number;
		width: number;
		height: number;
	};
	confidence: number;
}

/**
 * Available blur styles
 */
export type BlurStyle = 'gaussian' | 'pixelate' | 'heavy';

/**
 * Blur configuration
 */
export interface BlurConfig {
	style: BlurStyle;
	intensity: number; // 0-100
}

/**
 * Application state shape
 */
export interface AppState {
	uploadedImage: HTMLImageElement | null;
	detectedFaces: DetectedFace[];
	blurredFaceIds: Set<string>;
	blurIntensity: number;
	blurStyle: BlurStyle;
	isProcessing: boolean;
	error: string | null;
}
