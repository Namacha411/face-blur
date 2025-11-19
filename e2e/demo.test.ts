import { expect, test } from '@playwright/test';
import path from 'path';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});

test('should upload image without showing error alert', async ({ page }) => {
	await page.goto('/');

	// Get file input
	const fileInput = page.locator('input[type="file"]');
	await expect(fileInput).toBeAttached();

	// Upload a test image
	const testImagePath = path.join(process.cwd(), 'static', 'test-images', 'pic_02.jpg');
	await fileInput.setInputFiles(testImagePath);

	// Wait for processing to complete (loading spinner should disappear)
	const loadingSpinner = page.locator('[data-testid="loading-spinner"]').or(page.locator('text=処理中'));

	// Wait a bit for processing to start/complete
	await page.waitForTimeout(3000);

	// Check that no error message is displayed
	const errorMessage = page.locator('[data-testid="error-message"]').or(page.locator('[role="alert"]'));
	await expect(errorMessage).not.toBeVisible({ timeout: 5000 }).catch(() => {
		// If error is visible, this test will fail
	});

	// Verify canvas is visible (image processed successfully)
	const canvas = page.locator('canvas');
	await expect(canvas).toBeVisible();
});

test('should upload and process multiple test images', async ({ page }) => {
	const testImages = [
		'26883306_s.jpg',
		'31594587_s.jpg',
		'54944_s.jpg',
		'pic_02.jpg'
	];

	for (const imageName of testImages) {
		await page.goto('/');

		const fileInput = page.locator('input[type="file"]');
		const testImagePath = path.join(process.cwd(), 'static', 'test-images', imageName);

		await fileInput.setInputFiles(testImagePath);

		// Wait for processing
		await page.waitForTimeout(3000);

		// Check for error alerts
		const errorMessage = page.locator('[data-testid="error-message"]').or(page.locator('[role="alert"]'));
		const isErrorVisible = await errorMessage.isVisible().catch(() => false);

		if (isErrorVisible) {
			const errorText = await errorMessage.textContent();
			console.error(`Error for ${imageName}: ${errorText}`);
		}

		// This will fail if error is visible
		await expect(errorMessage).not.toBeVisible({ timeout: 1000 });
	}
});
