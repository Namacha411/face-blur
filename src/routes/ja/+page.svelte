<script lang="ts">
	import ImageUploader from '$lib/components/ja/ImageUploader.svelte';
	import FaceCanvas from '$lib/components/FaceCanvas.svelte';
	import ControlPanel from '$lib/components/ja/ControlPanel.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { detectFaces } from '$lib/utils/faceDetection';
	import {
		isProcessing,
		uploadedImage,
		detectedFaces,
		detectionConfidence,
		blurredFaceIds
	} from '$lib/stores/appState';

	// Re-detect faces when confidence changes (if image is uploaded)
	async function redetectFaces() {
		if (!$uploadedImage) return;

		try {
			isProcessing.set(true);
			const faces = await detectFaces($uploadedImage, $detectionConfidence);

			if (faces.length === 0) {
				alert('現在の信頼度閾値では顔を検出できませんでした。閾値を下げてみてください。');
				detectedFaces.set([]);
				blurredFaceIds.set(new Set());
			} else {
				detectedFaces.set(faces);
				blurredFaceIds.set(new Set(faces.map((f) => f.id)));
			}
		} catch (err) {
			console.error('Error re-detecting faces:', err);
		} finally {
			isProcessing.set(false);
		}
	}
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<!-- Header -->
	<header class="text-center mb-8">
		<h1 class="text-4xl font-bold text-gray-800 mb-2">顔ぼかしアプリ</h1>
		<p class="text-gray-600">
			写真内の顔を自動的にぼかします。100%クライアントサイド処理 - 画像はデバイスの外に出ません。
		</p>
		<div class="mt-4 space-x-4">
			<a href="/ja/info" class="text-blue-500 hover:underline font-medium">
				使い方ガイド・インストール方法
			</a>
			<span class="text-gray-400">|</span>
			<a href="/" class="text-blue-500 hover:underline">English</a>
		</div>
	</header>

	<!-- Main Content -->
	<main class="space-y-8">
		<!-- Detection Confidence Settings -->
		<div class="bg-white p-6 rounded-lg shadow-md">
			<label for="detection-confidence" class="block text-sm font-medium text-gray-700 mb-2">
				顔検出の信頼度: {Math.round($detectionConfidence * 100)}%
			</label>
			<input
				id="detection-confidence"
				type="range"
				min="0.1"
				max="1.0"
				step="0.05"
				bind:value={$detectionConfidence}
				class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
				disabled={$isProcessing}
			/>
			<p class="text-xs text-gray-500 mt-2">
				値を下げるとより多くの顔を検出します（誤検出が増える可能性があります）。値を上げると検出が厳密になります。
			</p>
			{#if $uploadedImage}
				<button
					onclick={redetectFaces}
					class="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={$isProcessing}
				>
					新しい信頼度で顔を再検出
				</button>
			{/if}
		</div>

		<!-- Image Upload Section -->
		{#if !$uploadedImage}
			<ImageUploader />
		{/if}

		<!-- Loading State -->
		{#if $isProcessing}
			<LoadingSpinner />
		{/if}

		<!-- Canvas Display -->
		<FaceCanvas />

		<!-- Control Panel -->
		<ControlPanel />

		<!-- Instructions (shown when no image uploaded) -->
		{#if !$uploadedImage && !$isProcessing}
			<div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
				<h2 class="text-lg font-semibold text-blue-900 mb-3">使い方：</h2>
				<ol class="list-decimal list-inside space-y-2 text-blue-800">
					<li>デバイスから画像をアップロード</li>
					<li>アプリが自動的に顔を検出してぼかしを適用</li>
					<li>顔をタップしてぼかしのオン/オフを切り替え</li>
					<li>ぼかしのスタイルと強度をお好みに調整</li>
					<li>処理済み画像をダウンロードまたは共有</li>
				</ol>
			</div>

			<div class="bg-green-50 border border-green-200 rounded-lg p-6">
				<h2 class="text-lg font-semibold text-green-900 mb-3">プライバシー保証：</h2>
				<p class="text-green-800">
					すべての画像処理はWebAssemblyとCanvas APIを使用してブラウザ内で直接行われます。
					あなたの写真は<strong>サーバーにアップロードされません</strong>。このアプリは初回読み込み後、完全にオフラインで動作します。
				</p>
			</div>
		{/if}

		<!-- Upload Another Image Button -->
		{#if $uploadedImage}
			<div class="text-center">
				<button
					onclick={() => window.location.reload()}
					class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
				>
					別の画像をアップロード
				</button>
			</div>
		{/if}
	</main>

	<!-- Footer -->
	<footer class="mt-12 text-center text-sm text-gray-500">
		<p>
			<a
				href="https://kit.svelte.dev"
				class="text-blue-500 hover:underline"
				target="_blank">SvelteKit</a
			>
			と
			<a
				href="https://developers.google.com/mediapipe"
				class="text-blue-500 hover:underline"
				target="_blank">MediaPipe</a
			>
			で構築
		</p>
	</footer>
</div>
