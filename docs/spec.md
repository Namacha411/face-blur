# Face Blur Web App - 技術仕様書

## プロジェクト概要

SNSに投稿する写真で、全員の顔を自動でぼかし、タップした人の顔だけを表示できるWebアプリケーション。
iPhoneユーザーを主要ターゲットとし、PWAとして提供。

### コンセプト
- フロントエンド完結（サーバーレス）
- プライバシー保護（画像はブラウザ内のみで処理）
- 高速処理（最新iPhoneで5秒以内）
- 映える調整機能

---

## 技術スタック

### コア技術
```yaml
フレームワーク: SvelteKit
言語: TypeScript
スタイリング: Tailwind CSS
顔検出: MediaPipe Face Detection (@mediapipe/tasks-vision)
画像処理: Canvas API (ネイティブ)
PWA: @vite-pwa/sveltekit
ホスティング: Vercel
```

### 依存関係
```json
{
  "dependencies": {
    "@mediapipe/tasks-vision": "^0.10.17",
    "@sveltejs/kit": "^2.0.0",
    "svelte": "^4.0.0"
  },
  "devDependencies": {
    "@sveltejs/adapter-vercel": "^5.0.0",
    "@vite-pwa/sveltekit": "^0.6.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

### 対応環境
- **最優先**: iPhone (iOS 14+, Safari)
- **サポート**: デスクトップブラウザ（Chrome, Safari, Firefox）

---

## MVP機能要件

### 必須機能（Phase 1）

#### 1. 画像入力
- ギャラリーから画像選択（`<input type="file" accept="image/*">`）
- 画像プレビュー表示

#### 2. 顔検出
- MediaPipe Face Detectorを使用
- 複数顔の同時検出
- 検出信頼度: 50%以上

#### 3. ぼかし処理
**ぼかしスタイル（3種類）:**
- `gaussian`: ガウスぼかし（滑らか）- デフォルト
- `pixelate`: ピクセレート（モザイク風）
- `heavy`: 強いぼかし

**ぼかし強度調整:**
- スライダーで調整（範囲: 0-100）
- デフォルト値: 70
- リアルタイムプレビュー

**適用範囲:**
- 初期状態: 全員の顔がぼかされている
- タップで個別にぼかしON/OFF切り替え
- 顔の境界に余白を持たせる（バウンディングボックスの1.2倍）

#### 4. インタラクション
- 顔のタップ検出
- 状態に応じた視覚フィードバック:
  - ぼかし中: 半透明の白枠
  - ぼかし解除: 緑の枠

#### 5. 画像出力
- PNG形式でダウンロード
- ファイル名: `face-blur-{timestamp}.png`
- iOS対応: Web Share API使用
- デスクトップ: `<a download>`で直接ダウンロード

#### 6. UI/UX
- シンプルなスピナー表示（処理中）
- 基本的なエラーメッセージ表示
- レスポンシブデザイン（モバイルファースト）
- タッチ操作最適化

### 後回し機能（Phase 2以降）
- カメラ撮影機能
- 複数画像の一括処理
- フィルター・色調補正
- SNS直接投稿
- 設定の保存（LocalStorage）
- アクセス解析

---

## ファイル構成

```
face-blur-app/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ImageUploader.svelte
│   │   │   │   # 画像選択UI
│   │   │   │   # - ファイル選択ボタン
│   │   │   │   # - 画像プレビュー
│   │   │   │
│   │   │   ├── FaceCanvas.svelte
│   │   │   │   # メインキャンバス
│   │   │   │   # - 画像表示
│   │   │   │   # - 顔検出結果の可視化
│   │   │   │   # - タップイベント処理
│   │   │   │   # - ぼかし適用
│   │   │   │
│   │   │   ├── ControlPanel.svelte
│   │   │   │   # 調整パネル
│   │   │   │   # - ぼかし強度スライダー
│   │   │   │   # - ぼかしスタイル選択
│   │   │   │   # - ダウンロードボタン
│   │   │   │
│   │   │   ├── LoadingSpinner.svelte
│   │   │   │   # シンプルなスピナー
│   │   │   │
│   │   │   └── ErrorMessage.svelte
│   │   │       # エラー表示
│   │   │
│   │   ├── utils/
│   │   │   ├── faceDetection.ts
│   │   │   │   # MediaPipe初期化・実行
│   │   │   │   # export async function initializeFaceDetector()
│   │   │   │   # export async function detectFaces(image: HTMLImageElement)
│   │   │   │
│   │   │   ├── imageProcessing.ts
│   │   │   │   # Canvas操作・ぼかし適用
│   │   │   │   # export function applyBlur(canvas, faces, blurConfig)
│   │   │   │   # export function drawFaceOverlay(ctx, face, isBlurred)
│   │   │   │
│   │   │   ├── fileHandler.ts
│   │   │   │   # 画像読み込み・保存
│   │   │   │   # export async function loadImage(file: File)
│   │   │   │   # export async function downloadImage(canvas, filename)
│   │   │   │
│   │   │   └── constants.ts
│   │   │       # 定数定義
│   │   │       # MAX_IMAGE_SIZE, BLUR_STYLES, etc.
│   │   │
│   │   ├── stores/
│   │   │   └── appState.ts
│   │   │       # 状態管理（Svelte writable store）
│   │   │       # - uploadedImage
│   │   │       # - detectedFaces
│   │   │       # - blurredFaceIds
│   │   │       # - blurIntensity
│   │   │       # - blurStyle
│   │   │       # - isProcessing
│   │   │       # - error
│   │   │
│   │   └── types/
│   │       └── index.ts
│   │           # TypeScript型定義
│   │
│   ├── routes/
│   │   ├── +page.svelte
│   │   │   # メインページ
│   │   │   # - 各コンポーネントの統合
│   │   │   # - 処理フローの制御
│   │   │
│   │   └── +layout.svelte
│   │       # 共通レイアウト
│   │
│   ├── app.html
│   ├── app.css
│   └── app.d.ts
│
├── static/
│   ├── favicon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.json
│   └── robots.txt
│
├── svelte.config.js
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 型定義

```typescript
// src/lib/types/index.ts

export interface DetectedFace {
  id: string; // ユニークID
  boundingBox: {
    originX: number;
    originY: number;
    width: number;
    height: number;
  };
  keypoints: Array<{
    x: number;
    y: number;
  }>;
  score: number; // 検出信頼度
}

export type BlurStyle = 'gaussian' | 'pixelate' | 'heavy';

export interface BlurConfig {
  intensity: number; // 0-100
  style: BlurStyle;
}

export interface AppState {
  uploadedImage: HTMLImageElement | null;
  detectedFaces: DetectedFace[];
  blurredFaceIds: Set<string>; // ぼかされている顔のIDセット
  blurIntensity: number;
  blurStyle: BlurStyle;
  isProcessing: boolean;
  error: string | null;
}
```

---

## 実装詳細

### 1. MediaPipe Face Detection 初期化

```typescript
// src/lib/utils/faceDetection.ts
import { FaceDetector, FilesetResolver, Detection } from '@mediapipe/tasks-vision';

let faceDetector: FaceDetector | null = null;

export async function initializeFaceDetector(): Promise<FaceDetector> {
  if (faceDetector) return faceDetector;
  
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  
  faceDetector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
      delegate: "GPU"
    },
    runningMode: "IMAGE",
    minDetectionConfidence: 0.5
  });
  
  return faceDetector;
}

export async function detectFaces(image: HTMLImageElement): Promise<DetectedFace[]> {
  const detector = await initializeFaceDetector();
  const detections = detector.detect(image);
  
  return detections.detections.map((detection, index) => ({
    id: `face-${index}-${Date.now()}`,
    boundingBox: detection.boundingBox,
    keypoints: detection.keypoints || [],
    score: detection.categories[0]?.score || 0
  }));
}
```

### 2. ぼかし処理実装

```typescript
// src/lib/utils/imageProcessing.ts

export function applyBlur(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  faces: DetectedFace[],
  blurredFaceIds: Set<string>,
  config: BlurConfig
): void {
  const ctx = canvas.getContext('2d')!;
  
  // キャンバスサイズを画像に合わせる
  canvas.width = image.width;
  canvas.height = image.height;
  
  // 1. 元画像を描画
  ctx.drawImage(image, 0, 0);
  
  // 2. 各顔に対してぼかしを適用
  faces.forEach(face => {
    if (blurredFaceIds.has(face.id)) {
      applyFaceBlur(ctx, image, face, config);
    }
  });
  
  // 3. オーバーレイ描画（枠線表示）
  faces.forEach(face => {
    drawFaceOverlay(ctx, face, blurredFaceIds.has(face.id));
  });
}

function applyFaceBlur(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  face: DetectedFace,
  config: BlurConfig
): void {
  const { originX, originY, width, height } = face.boundingBox;
  
  // 余白を追加（1.2倍）
  const padding = 0.2;
  const x = Math.max(0, originX - width * padding / 2);
  const y = Math.max(0, originY - height * padding / 2);
  const w = Math.min(image.width - x, width * (1 + padding));
  const h = Math.min(image.height - y, height * (1 + padding));
  
  // 一時キャンバスでぼかしを生成
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCanvas.width = w;
  tempCanvas.height = h;
  
  // ぼかしスタイルに応じた処理
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
  
  // 元のキャンバスに描画
  ctx.drawImage(tempCanvas, x, y);
}

function applyGaussianBlur(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number, y: number, w: number, h: number,
  intensity: number
): void {
  // Canvas filterを使用
  const blurAmount = (intensity / 100) * 30; // 0-30px
  ctx.filter = `blur(${blurAmount}px)`;
  ctx.drawImage(image, x, y, w, h, 0, 0, w, h);
  ctx.filter = 'none';
}

function applyPixelate(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number, y: number, w: number, h: number,
  intensity: number
): void {
  // ピクセルサイズを計算（intensity高いほど粗い）
  const pixelSize = Math.max(1, Math.floor((intensity / 100) * 20));
  
  const smallW = Math.ceil(w / pixelSize);
  const smallH = Math.ceil(h / pixelSize);
  
  // 縮小して拡大
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, x, y, w, h, 0, 0, smallW, smallH);
  ctx.drawImage(ctx.canvas, 0, 0, smallW, smallH, 0, 0, w, h);
  ctx.imageSmoothingEnabled = true;
}

function applyHeavyBlur(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number, y: number, w: number, h: number,
  intensity: number
): void {
  // ガウスぼかし + 暗めのオーバーレイ
  const blurAmount = (intensity / 100) * 40; // 0-40px
  ctx.filter = `blur(${blurAmount}px) brightness(0.8)`;
  ctx.drawImage(image, x, y, w, h, 0, 0, w, h);
  ctx.filter = 'none';
}

export function drawFaceOverlay(
  ctx: CanvasRenderingContext2D,
  face: DetectedFace,
  isBlurred: boolean
): void {
  const { originX, originY, width, height } = face.boundingBox;
  
  ctx.strokeStyle = isBlurred ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 255, 0, 0.8)';
  ctx.lineWidth = 3;
  ctx.strokeRect(originX, originY, width, height);
}
```

### 3. タップ検出

```typescript
// src/lib/components/FaceCanvas.svelte 内で実装

function handleCanvasTap(event: MouseEvent | TouchEvent) {
  const canvas = canvasRef;
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  // タップ座標を取得
  let clientX, clientY;
  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  }
  
  const x = (clientX - rect.left) * scaleX;
  const y = (clientY - rect.top) * scaleY;
  
  // タップされた顔を検出
  const tappedFace = $detectedFaces.find(face => {
    const { originX, originY, width, height } = face.boundingBox;
    return (
      x >= originX &&
      x <= originX + width &&
      y >= originY &&
      y <= originY + height
    );
  });
  
  if (tappedFace) {
    toggleFaceBlur(tappedFace.id);
  }
}

function toggleFaceBlur(faceId: string) {
  blurredFaceIds.update(set => {
    const newSet = new Set(set);
    if (newSet.has(faceId)) {
      newSet.delete(faceId);
    } else {
      newSet.add(faceId);
    }
    return newSet;
  });
}
```

### 4. ファイル保存（iOS対応）

```typescript
// src/lib/utils/fileHandler.ts

export async function downloadImage(
  canvas: HTMLCanvasElement,
  filename: string = `face-blur-${Date.now()}.png`
): Promise<void> {
  try {
    // iOS Safariチェック
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS && navigator.share) {
      // iOS: Web Share API
      const blob = await new Promise<Blob>((resolve) => 
        canvas.toBlob(blob => resolve(blob!), 'image/png')
      );
      
      const file = new File([blob], filename, { type: 'image/png' });
      
      await navigator.share({
        files: [file],
        title: 'Face Blur Image',
        text: 'Processed with Face Blur App'
      });
    } else {
      // Desktop: 直接ダウンロード
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('画像の保存に失敗しました');
  }
}

export async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        // 画像サイズチェック・リサイズ
        const MAX_SIZE = 4096;
        if (img.width > MAX_SIZE || img.height > MAX_SIZE) {
          const resized = resizeImage(img, MAX_SIZE);
          resolve(resized);
        } else {
          resolve(img);
        }
      };
      
      img.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
    reader.readAsDataURL(file);
  });
}

function resizeImage(img: HTMLImageElement, maxSize: number): HTMLImageElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  let width = img.width;
  let height = img.height;
  
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
```

---

## UI/UX仕様

### カラースキーム（Tailwind CSS）
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',    // blue-500
        secondary: '#8b5cf6',  // violet-500
        success: '#10b981',    // green-500
        danger: '#ef4444',     // red-500
      }
    }
  }
}
```

### レイアウト構成

```
+----------------------------------+
|           Header                 |
|   「Face Blur」ロゴ・説明       |
+----------------------------------+
|                                  |
|   [画像選択ボタン]               |
|   （画像未選択時）               |
|                                  |
|   または                         |
|                                  |
|   [Canvas 表示エリア]            |
|   （画像選択後）                 |
|                                  |
+----------------------------------+
|   コントロールパネル             |
|   - ぼかしスタイル選択           |
|   - 強度スライダー               |
|   - ダウンロードボタン           |
+----------------------------------+
|   Footer                         |
|   使い方・注意事項               |
+----------------------------------+
```

### レスポンシブブレークポイント
- モバイル: 〜640px（デフォルト）
- タブレット: 641px〜1024px
- デスクトップ: 1025px〜

---

## PWA設定

### manifest.json
```json
{
  "name": "Face Blur - 顔ぼかしアプリ",
  "short_name": "Face Blur",
  "description": "タップで顔を選択的に表示できる画像加工アプリ",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker設定
```typescript
// vite.config.ts での @vite-pwa/sveltekit 設定
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default {
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      manifest: {
        // 上記のmanifest.json内容
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}']
      }
    })
  ]
};
```

---

## 開発フロー

### セットアップ
```bash
# 1. プロジェクト作成
npm create svelte@latest face-blur-app
cd face-blur-app

# 2. 依存関係インストール
npm install
npm install @mediapipe/tasks-vision
npm install -D tailwindcss postcss autoprefixer
npm install -D @vite-pwa/sveltekit
npm install -D @sveltejs/adapter-vercel

# 3. Tailwind初期化
npx tailwindcss init -p

# 4. 開発サーバー起動
npm run dev
```

### 実装順序（優先度順）

**Day 1: 基礎実装**
1. ✅ プロジェクトセットアップ
2. ✅ 基本レイアウト作成
3. ✅ 画像アップロード機能
4. ✅ Canvas表示
5. ✅ MediaPipe初期化

**Day 2: コア機能**
6. ✅ 顔検出実装
7. ✅ 検出結果の可視化
8. ✅ ぼかし処理実装（3スタイル）
9. ✅ タップイベント処理

**Day 3: UI調整・リリース**
10. ✅ コントロールパネル実装
11. ✅ 画像ダウンロード機能
12. ✅ エラーハンドリング
13. ✅ UI/UX最終調整
14. ✅ PWA設定
15. ✅ Vercelデプロイ
16. ✅ iPhone実機テスト

---

## デプロイ

### Vercel設定

1. **GitHub連携**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Vercelにインポート**
- https://vercel.com/new
- GitHubリポジトリを選択
- フレームワーク: SvelteKit（自動検出）
- デプロイ

3. **環境変数（不要）**
- 本プロジェクトはサーバーレスのため環境変数不要

4. **カスタムドメイン（オプション）**
- Vercelダッシュボードで設定可能

### GitHub Pages（代替案）

```bash
# adapter-staticに変更
npm install -D @sveltejs/adapter-static

# svelte.config.jsを修正
# export default {
#   kit: {
#     adapter: adapter({
#       pages: 'build',
#       assets: 'build',
#       fallback: 'index.html'
#     })
#   }
# };

# ビルド
npm run build

# GitHub Pagesにデプロイ
# Actions経由または手動でbuildフォルダをpush
```

---

## テスト項目

### 機能テスト
- [ ] 画像選択が正常に動作
- [ ] 顔検出が動作（複数人対応）
- [ ] 各ぼかしスタイルが正常に適用
- [ ] スライダーで強度調整が反映
- [ ] タップで顔のON/OFF切り替え
- [ ] 画像ダウンロードが動作（iOS/Desktop）

### パフォーマンステスト
- [ ] iPhone 12以降で3秒以内に処理完了
- [ ] 10人検出時も動作
- [ ] 4K画像でもクラッシュしない

### UI/UXテスト
- [ ] モバイルで操作しやすい
- [ ] タップ領域が適切
- [ ] ローディング表示が明確
- [ ] エラーメッセージが分かりやすい

### ブラウザ互換性
- [ ] iPhone Safari
- [ ] Chrome (Desktop)
- [ ] Safari (Desktop)
- [ ] Firefox (Desktop)

---

## パフォーマンス最適化

### 画像処理の最適化
```typescript
// debounceでリアルタイムプレビュー最適化
import { debounce } from './debounce';

const debouncedApplyBlur = debounce((intensity: number) => {
  applyBlur(canvas, image, faces, blurredFaceIds, {
    intensity,
    style: $blurStyle
  });
}, 300);
```

### MediaPipeモデルのキャッシング
```typescript
// 初回ロード時にモデルを事前読み込み
onMount(async () => {
  await initializeFaceDetector(); // アプリ起動時に初期化
});
```

---

## エラーハンドリング

### エラーケースと対処

```typescript
// src/lib/stores/appState.ts

export function setError(message: string) {
  error.set(message);
  
  // 3秒後に自動消去
  setTimeout(() => {
    error.set(null);
  }, 3000);
}

// 主なエラーケース
const ERROR_MESSAGES = {
  FILE_TOO_LARGE: '画像ファイルが大きすぎます（最大10MB）',
  INVALID_FILE: '画像ファイルを選択してください',
  NO_FACES: '顔が検出されませんでした',
  DETECTION_FAILED: '顔検出に失敗しました',
  DOWNLOAD_FAILED: '画像の保存に失敗しました',
  MEDIAPIPE_INIT_FAILED: '初期化に失敗しました。ページを再読み込みしてください'
};
```

---

## セキュリティ・プライバシー

### データの取り扱い
- ✅ 全ての処理はブラウザ内で完結
- ✅ 画像データはサーバーに送信されない
- ✅ LocalStorageにも画像は保存しない（設定のみ保存予定）
- ✅ 処理後の画像はユーザーが明示的に保存

### Content Security Policy
```html
<!-- src/app.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; 
               img-src 'self' data: blob:; 
               connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com;">
```

---

## 今後の拡張（Phase 2以降）

### 優先度高
- カメラ撮影機能
- 複数画像の一括処理
- ぼかし境界の手動調整
- プリセット保存

### 優先度中
- フィルター・色調補正
- SNS直接投稿
- アニメーションGIF出力
- 背景ぼかし機能

### 優先度低
- Android最適化
- 多言語対応
- アクセス解析
- ユーザーアカウント機能

---

## 参考リンク

- MediaPipe Face Detection: https://developers.google.com/mediapipe/solutions/vision/face_detector/web_js
- SvelteKit ドキュメント: https://kit.svelte.dev/
- Tailwind CSS: https://tailwindcss.com/
- Vite PWA: https://vite-pwa-org.netlify.app/frameworks/sveltekit.html
- Vercel ドキュメント: https://vercel.com/docs

---

## 補足: Claude Code への指示

このspec.mdを読んだ上で、以下の順序で実装を進めてください：

1. **プロジェクトセットアップ**
   - SvelteKitプロジェクトの作成
   - 依存関係のインストール
   - Tailwind CSSの設定

2. **基本構造の作成**
   - ファイル構成の作成
   - 型定義の実装
   - Store（状態管理）の実装

3. **コンポーネント実装**
   - ImageUploader.svelte
   - FaceCanvas.svelte
   - ControlPanel.svelte
   - LoadingSpinner.svelte
   - ErrorMessage.svelte

4. **ユーティリティ実装**
   - faceDetection.ts
   - imageProcessing.ts
   - fileHandler.ts

5. **統合・テスト**
   - +page.svelteでの統合
   - 動作確認
   - バグ修正

実装中に不明点があれば質問してください。
また、各ステップで動作確認を行いながら進めてください。
