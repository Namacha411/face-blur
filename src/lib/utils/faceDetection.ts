/**
 * Face detection using MediaPipe Face Detection
 */

import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';
import type { DetectedFace } from '$lib/types';
import { MIN_DETECTION_CONFIDENCE } from './constants';

let faceDetector: FaceDetector | null = null;

/**
 * Initialize MediaPipe Face Detector (singleton pattern)
 * Loads WASM files from CDN and creates detector instance
 */
export async function initializeFaceDetector(): Promise<FaceDetector> {
	if (faceDetector) return faceDetector;

	const vision = await FilesetResolver.forVisionTasks(
		'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
	);

	faceDetector = await FaceDetector.createFromOptions(vision, {
		baseOptions: {
			modelAssetPath:
				'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
			delegate: 'GPU'
		},
		runningMode: 'IMAGE',
		minDetectionConfidence: MIN_DETECTION_CONFIDENCE
	});

	return faceDetector;
}

/**
 * Detect faces in an image
 * @param image - HTMLImageElement to detect faces in
 * @returns Array of detected faces with bounding boxes
 */
export async function detectFaces(image: HTMLImageElement): Promise<DetectedFace[]> {
	const detector = await initializeFaceDetector();
	const detections = detector.detect(image);

	return detections.detections.map((detection, index) => ({
		id: `face-${index}-${Date.now()}`,
		boundingBox: {
			originX: detection.boundingBox?.originX || 0,
			originY: detection.boundingBox?.originY || 0,
			width: detection.boundingBox?.width || 0,
			height: detection.boundingBox?.height || 0
		},
		confidence: detection.categories[0]?.score || 0
	}));
}
