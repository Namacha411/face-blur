<script lang="ts">
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<!-- Header -->
	<header class="text-center mb-8">
		<h1 class="text-4xl font-bold text-gray-800 mb-2">顔ぼかしアプリ - ユーザーガイド</h1>
		<p class="text-gray-600">顔ぼかしアプリの使い方を詳しく解説</p>
		<div class="mt-4">
			<a href="/ja" class="text-blue-500 hover:underline">← アプリに戻る</a>
		</div>
	</header>

	<main class="space-y-8">
		<!-- Basic Usage Instructions -->
		<section class="bg-white p-6 rounded-lg shadow-md">
			<h2 class="text-2xl font-bold text-gray-800 mb-4">基本的な使い方</h2>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">ステップ1: 画像をアップロード</h3>
					<p class="text-gray-600">
						メインページのアップロードエリアをクリックして、デバイスから写真を選択してください。JPEG、PNG、WebPなどの一般的な画像形式に対応しています。
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">ステップ2: 自動顔検出</h3>
					<p class="text-gray-600">
						アップロードすると、MediaPipeの高度なAIモデルを使用して自動的に写真内のすべての顔を検出します。検出されたすべての顔はデフォルトでぼかしが適用されます。
					</p>
					<p class="text-gray-600 mt-2">
						<strong>検出信頼度:</strong> 顔が検出されない場合や誤検出が多い場合は、信頼度スライダーを調整してください。低い値（30-50%）はより多くの顔を検出しますが、顔以外のものも検出する可能性があります。高い値（60-90%）は検出が厳密になります。
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">ステップ3: 個別の顔を切り替え</h3>
					<p class="text-gray-600">
						ぼかされた顔をタップまたはクリックすると、ぼかしのオン/オフを切り替えることができます。これにより、特定の顔だけを見せながら、他の顔はプライバシーを保護できます。
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">ステップ4: ぼかし設定をカスタマイズ</h3>
					<p class="text-gray-600">コントロールパネルで以下を調整できます：</p>
					<ul class="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
						<li><strong>ぼかしスタイル:</strong> ガウシアン（滑らか）、ピクセル化（モザイク）、強力（完全な隠蔽）から選択</li>
						<li><strong>ぼかし強度:</strong> 微妙なものから完全な隠蔽まで強度を調整</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">ステップ5: ダウンロードまたは共有</h3>
					<p class="text-gray-600">
						<strong>iPhone/iPadの場合:</strong> 「画像を共有」ボタンを使用して写真アプリに保存したり、任意のアプリで共有できます。
					</p>
					<p class="text-gray-600 mt-2">
						<strong>デスクトップの場合:</strong> 「画像をダウンロード」ボタンを使用して処理済みの写真をコンピューターに保存できます。
					</p>
				</div>
			</div>
		</section>

		<!-- PWA Installation Guide -->
		<section class="bg-blue-50 border border-blue-200 rounded-lg p-6">
			<h2 class="text-2xl font-bold text-blue-900 mb-4">iPhoneへのインストール方法（PWA）</h2>

			<p class="text-blue-800 mb-4">
				顔ぼかしアプリをプログレッシブウェブアプリ（PWA）としてインストールすると、ネイティブアプリのような体験とオフラインサポートが利用できます。
			</p>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold text-blue-900 mb-2">インストール手順（iOS Safari）：</h3>
					<ol class="list-decimal list-inside text-blue-800 space-y-2 ml-4">
						<li><strong>Safariブラウザ</strong>で顔ぼかしアプリを開く（iOSではPWAはSafariでのみ動作します）</li>
						<li>画面下部の<strong>共有ボタン</strong>（上向き矢印の四角）をタップ</li>
						<li>下にスクロールして<strong>「ホーム画面に追加」</strong>をタップ</li>
						<li>必要に応じて名前をカスタマイズ（デフォルト：「顔ぼかしアプリ」）</li>
						<li>右上の<strong>「追加」</strong>をタップ</li>
					</ol>
				</div>

				<div class="bg-blue-100 p-4 rounded-md">
					<h3 class="text-lg font-semibold text-blue-900 mb-2">PWAとしてインストールするメリット：</h3>
					<ul class="list-disc list-inside text-blue-800 space-y-1 ml-4">
						<li><strong>オフライン動作:</strong> 初回インストール後はインターネット接続なしで画像処理が可能</li>
						<li><strong>高速アクセス:</strong> ネイティブアプリのようにホーム画面から直接起動</li>
						<li><strong>フルスクリーン:</strong> ブラウザのUIが表示されない没入型体験</li>
						<li><strong>プライバシー:</strong> トラッキングや分析なし - 完全にプライベートな画像処理</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-blue-900 mb-2">必要な環境：</h3>
					<ul class="list-disc list-inside text-blue-800 space-y-1 ml-4">
						<li>iOS 11.3以降</li>
						<li>Safariブラウザ（iOS版のChromeやFirefoxではPWAのインストールに対応していません）</li>
						<li>アプリとAIモデル用に約20MBのストレージ</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Security Considerations -->
		<section class="bg-green-50 border border-green-200 rounded-lg p-6">
			<h2 class="text-2xl font-bold text-green-900 mb-4">セキュリティとプライバシー</h2>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold text-green-900 mb-2">100%クライアントサイド処理</h3>
					<p class="text-green-800">
						すべての画像処理は、WebAssemblyとHTML5 Canvas APIを使用してブラウザ内で直接行われます。
						<strong>あなたの写真はデバイスの外に出ることはありません</strong> - サーバー、クラウドストレージ、サードパーティサービスへのアップロードは一切行われません。
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-green-900 mb-2">データ収集なし</h3>
					<p class="text-green-800">
						このアプリは個人データの収集、保存、送信を一切行いません：
					</p>
					<ul class="list-disc list-inside text-green-800 ml-4 mt-2 space-y-1">
						<li>分析やトラッキングなし</li>
						<li>Cookie なし（PWA機能に必要な基本的なブラウザストレージを除く）</li>
						<li>ユーザーアカウントや認証なし</li>
						<li>画像や使用状況のサーバーログなし</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-green-900 mb-2">オープンソースで透明性の高い設計</h3>
					<p class="text-green-800">
						このアプリケーションはオープンソース技術で構築されており、セキュリティ監査が可能です。
						顔検出にはGoogleのMediaPipeライブラリを使用しています。これは信頼性の高いオープンソースMLフレームワークです。
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-green-900 mb-2">オフライン機能</h3>
					<p class="text-green-800">
						初回読み込み後、アプリは完全にオフラインで動作します。つまり：
					</p>
					<ul class="list-disc list-inside text-green-800 ml-4 mt-2 space-y-1">
						<li>インターネット接続なしで画像処理が可能</li>
						<li>画像処理中にネットワークリクエストは発生しない</li>
						<li>機内モードでも画像はデバイス内に留まる</li>
					</ul>
				</div>

				<div class="bg-green-100 p-4 rounded-md">
					<h3 class="text-lg font-semibold text-green-900 mb-2">プライバシーのベストプラクティス：</h3>
					<ul class="list-disc list-inside text-green-800 space-y-1 ml-4">
						<li>最大限のプライバシーを確保するため、オフラインで使用（機内モードを有効化）</li>
						<li>ブラウザのトラッキング拡張機能を避けるため、PWAとしてインストール</li>
						<li>共有デバイスを使用する場合はブラウザのキャッシュをクリア</li>
						<li>アプリは処理履歴を保存しません - ページを更新すると現在の画像がクリアされます</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-green-900 mb-2">技術的なセキュリティの詳細：</h3>
					<ul class="list-disc list-inside text-green-800 space-y-1 ml-4">
						<li><strong>AIモデル:</strong> GoogleのCDN（MediaPipe）から読み込み - 標準的な信頼できるソース</li>
						<li><strong>外部API なし:</strong> 初回ページ読み込み後の外部APIコールはゼロ</li>
						<li><strong>ブラウザサンドボックス:</strong> すべてのコードはブラウザのセキュリティサンドボックス内で実行</li>
						<li><strong>メモリ安全性:</strong> 画像はメモリ内でのみ処理され、ページ更新時にクリアされる</li>
						<li><strong>HTTPS のみ:</strong> アプリは安全な接続で提供されます（デプロイ時）</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- FAQ Section -->
		<section class="bg-gray-50 border border-gray-200 rounded-lg p-6">
			<h2 class="text-2xl font-bold text-gray-800 mb-4">よくある質問</h2>

			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">顔が検出されないのはなぜですか？</h3>
					<p class="text-gray-600">
						検出信頼度の閾値を下げてみてください（30-50%）。角度のある顔、一部が隠れている顔、照明が悪い場合は、低い信頼度設定が必要な場合があります。それでも検出されない場合は、写真内の顔が明瞭で十分に照らされているか確認してください。
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Android/デスクトップでも動作しますか？</h3>
					<p class="text-gray-600">
						はい！すべての最新ブラウザ（Chrome、Firefox、Safari、Edge）で動作します。PWAのインストールはAndroid ChromeおよびデスクトップChrome/Edgeで利用可能です。ただし、UIはiPhone向けに最適化されています。
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">元の画像はどうなりますか？</h3>
					<p class="text-gray-600">
						元の画像はデバイス上でそのまま残ります。アプリはダウンロード/共有時に新しい処理済みバージョンを作成します。元の画像は変更されません。
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">複数の画像を一度に処理できますか？</h3>
					<p class="text-gray-600">
						現在、アプリは一度に1つの画像を処理します。複数の画像を処理するには、現在の画像の処理を完了してから「別の画像をアップロード」をクリックしてください。
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-gray-700 mb-2">ファイルサイズの制限はありますか？</h3>
					<p class="text-gray-600">
						どちらかの辺が4096pxを超える画像は、パフォーマンスの問題を防ぐために自動的にリサイズされます。最良の結果を得るには、10MB未満の画像を使用してください。
					</p>
				</div>
			</div>
		</section>

		<!-- Back to App -->
		<div class="text-center py-4">
			<a
				href="/ja"
				class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
			>
				← アプリに戻る
			</a>
		</div>
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
		<p class="mt-2">
			<a href="/info" class="text-blue-500 hover:underline">English Version</a>
		</p>
	</footer>
</div>
