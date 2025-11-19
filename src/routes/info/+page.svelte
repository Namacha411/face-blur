<script lang="ts">
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<!-- Header -->
	<header class="text-center mb-8">
		<h1 class="text-4xl font-bold text-gray-800 mb-2">Face Blur App - User Guide</h1>
		<p class="text-gray-600">Everything you need to know about using Face Blur App</p>
		<div class="mt-4">
			<a href="/" class="text-blue-500 hover:underline">← Back to App</a>
		</div>
	</header>

	<main class="space-y-8">
		<!-- Basic Usage Instructions -->
		<section class="bg-white p-6 rounded-lg shadow-md">
			<h2 class="text-2xl font-bold text-gray-800 mb-4">Basic Usage Instructions</h2>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Step 1: Upload an Image</h3>
					<p class="text-gray-600">
						Click the upload area on the main page and select a photo from your device. The app
						accepts common image formats (JPEG, PNG, WebP).
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Step 2: Automatic Face Detection</h3>
					<p class="text-gray-600">
						Once uploaded, the app automatically detects all faces in your photo using MediaPipe's
						advanced AI model. All detected faces will be blurred by default.
					</p>
					<p class="text-gray-600 mt-2">
						<strong>Detection Confidence:</strong> Adjust the confidence slider if faces are missed
						or too many false positives appear. Lower values (30-50%) detect more faces but may include
						non-faces. Higher values (60-90%) are more strict.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Step 3: Toggle Individual Faces</h3>
					<p class="text-gray-600">
						Tap or click on any blurred face to toggle the blur on/off. This allows you to selectively
						reveal certain faces while keeping others private.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Step 4: Customize Blur Settings</h3>
					<p class="text-gray-600">Use the Control Panel to adjust:</p>
					<ul class="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
						<li><strong>Blur Style:</strong> Choose between Gaussian (smooth), Pixelate (mosaic), or Heavy (strong obscuring)</li>
						<li><strong>Blur Intensity:</strong> Adjust the strength from subtle to complete obscuring</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Step 5: Download or Share</h3>
					<p class="text-gray-600">
						<strong>On iPhone/iPad:</strong> Use the "Share Image" button to save to Photos or share via any app.
					</p>
					<p class="text-gray-600 mt-2">
						<strong>On Desktop:</strong> Use the "Download Image" button to save the processed photo to your computer.
					</p>
				</div>
			</div>
		</section>

		<!-- PWA Installation Guide -->
		<section class="bg-blue-50 border border-blue-200 rounded-lg p-6">
			<h2 class="text-2xl font-bold text-blue-900 mb-4">Installing on iPhone (PWA)</h2>

			<p class="text-blue-800 mb-4">
				Install Face Blur App as a Progressive Web App (PWA) for a native app-like experience with offline support.
			</p>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold text-blue-900 mb-2">Installation Steps (iOS Safari):</h3>
					<ol class="list-decimal list-inside text-blue-800 space-y-2 ml-4">
						<li>Open the Face Blur App in <strong>Safari browser</strong> (PWAs only work in Safari on iOS)</li>
						<li>Tap the <strong>Share button</strong> (square with arrow pointing up) at the bottom of the screen</li>
						<li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
						<li>Customize the name if desired (default: "Face Blur App")</li>
						<li>Tap <strong>"Add"</strong> in the top right corner</li>
					</ol>
				</div>

				<div class="bg-blue-100 p-4 rounded-md">
					<h3 class="text-lg font-semibold text-blue-900 mb-2">Benefits of Installing as PWA:</h3>
					<ul class="list-disc list-inside text-blue-800 space-y-1 ml-4">
						<li><strong>Works Offline:</strong> Process images without internet connection after initial install</li>
						<li><strong>Faster Access:</strong> Launch directly from your home screen like a native app</li>
						<li><strong>Full Screen:</strong> No browser UI clutter - immersive experience</li>
						<li><strong>Privacy:</strong> No tracking, no analytics - truly private image processing</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-blue-900 mb-2">Requirements:</h3>
					<ul class="list-disc list-inside text-blue-800 space-y-1 ml-4">
						<li>iOS 11.3 or later</li>
						<li>Safari browser (Chrome/Firefox on iOS don't support PWA installation)</li>
						<li>~20MB of storage for the app and AI models</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Security Considerations -->
		<section class="bg-green-50 border border-green-200 rounded-lg p-6">
			<h2 class="text-2xl font-bold text-green-900 mb-4">Security & Privacy</h2>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold text-green-900 mb-2">100% Client-Side Processing</h3>
					<p class="text-green-800">
						All image processing happens directly in your browser using WebAssembly and the HTML5 Canvas API.
						<strong>Your photos never leave your device</strong> - they are not uploaded to any server, cloud
						storage, or third-party service.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-green-900 mb-2">No Data Collection</h3>
					<p class="text-green-800">
						This app does not collect, store, or transmit any personal data. There is:
					</p>
					<ul class="list-disc list-inside text-green-800 ml-4 mt-2 space-y-1">
						<li>No analytics or tracking</li>
						<li>No cookies (except essential browser storage for PWA functionality)</li>
						<li>No user accounts or authentication</li>
						<li>No server logs of your images or usage</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-green-900 mb-2">Open Source & Transparent</h3>
					<p class="text-green-800">
						This application is built with open-source technologies and can be audited for security.
						The face detection uses Google's MediaPipe library, a trusted open-source ML framework.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-green-900 mb-2">Offline Capability</h3>
					<p class="text-green-800">
						After the initial load, the app works completely offline. This means:
					</p>
					<ul class="list-disc list-inside text-green-800 ml-4 mt-2 space-y-1">
						<li>You can process images without internet connection</li>
						<li>No network requests are made during image processing</li>
						<li>Your images stay on your device even in airplane mode</li>
					</ul>
				</div>

				<div class="bg-green-100 p-4 rounded-md">
					<h3 class="text-lg font-semibold text-green-900 mb-2">Best Practices for Privacy:</h3>
					<ul class="list-disc list-inside text-green-800 space-y-1 ml-4">
						<li>Use the app offline (enable airplane mode) for maximum privacy</li>
						<li>Install as PWA to avoid browser tracking extensions</li>
						<li>Clear your browser cache if using a shared device</li>
						<li>The app does not save any processing history - refresh to clear the current image</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-green-900 mb-2">Technical Security Details:</h3>
					<ul class="list-disc list-inside text-green-800 space-y-1 ml-4">
						<li><strong>AI Models:</strong> Loaded from Google's CDN (MediaPipe) - standard trusted source</li>
						<li><strong>No External APIs:</strong> Zero external API calls after initial page load</li>
						<li><strong>Browser Sandboxing:</strong> All code runs in browser's security sandbox</li>
						<li><strong>Memory Safety:</strong> Images processed in-memory only, cleared on page refresh</li>
						<li><strong>HTTPS Only:</strong> App served over secure connection (when deployed)</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- FAQ Section -->
		<section class="bg-gray-50 border border-gray-200 rounded-lg p-6">
			<h2 class="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Why isn't my face being detected?</h3>
					<p class="text-gray-600">
						Try lowering the detection confidence threshold (30-50%). Some faces at angles, partially
						obscured, or in poor lighting may need lower confidence settings. If still not detected,
						ensure the face is clear and well-lit in the photo.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Does this work on Android/Desktop?</h3>
					<p class="text-gray-600">
						Yes! The app works on all modern browsers (Chrome, Firefox, Safari, Edge). PWA installation
						is available on Android Chrome and Desktop Chrome/Edge. However, the UI is optimized for iPhone.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">What happens to the original image?</h3>
					<p class="text-gray-600">
						The original image remains unchanged on your device. The app creates a new processed version
						when you download/share. The original is never modified.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Can I process multiple images at once?</h3>
					<p class="text-gray-600">
						Currently, the app processes one image at a time. To process multiple images, complete
						the current one and click "Upload Another Image".
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Is there a file size limit?</h3>
					<p class="text-gray-600">
						Images larger than 4096px on any side are automatically resized to prevent performance
						issues. For best results, use images under 10MB.
					</p>
				</div>
			</div>
		</section>

		<!-- Back to App -->
		<div class="text-center py-4">
			<a
				href="/"
				class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
			>
				← Back to App
			</a>
		</div>
	</main>

	<!-- Footer -->
	<footer class="mt-12 text-center text-sm text-gray-500">
		<p>
			Built with <a
				href="https://kit.svelte.dev"
				class="text-blue-500 hover:underline"
				target="_blank">SvelteKit</a
			>
			and
			<a
				href="https://developers.google.com/mediapipe"
				class="text-blue-500 hover:underline"
				target="_blank">MediaPipe</a
			>
		</p>
		<p class="mt-2">
			<a href="/ja/info" class="text-blue-500 hover:underline">日本語版 (Japanese Version)</a>
		</p>
	</footer>
</div>
