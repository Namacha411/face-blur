# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Face Blur App - A privacy-focused web application that automatically blurs all faces in photos and allows users to selectively reveal individual faces by tapping. Built as a PWA targeting iPhone users, with all processing happening client-side in the browser.

## Essential Commands

### Development
```bash
npm run dev              # Start development server
npm run dev -- --open    # Start dev server and open in browser
```

### Building & Preview
```bash
npm run build            # Create production build
npm run preview          # Preview production build locally
```

### Code Quality
```bash
npm run check            # Type-check with svelte-check
npm run check:watch      # Type-check in watch mode
npm run lint             # Run prettier and eslint
npm run format           # Format all files with prettier
```

### Testing
```bash
npm run test:unit        # Run unit tests with Vitest
npm run test:e2e         # Run E2E tests with Playwright
npm run test             # Run all tests
```

## Architecture

### Technology Stack
- **Framework**: SvelteKit with Svelte 5
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 (using Vite plugin)
- **Face Detection**: MediaPipe Face Detection (@mediapipe/tasks-vision)
- **Image Processing**: Canvas API
- **PWA**: @vite-pwa/sveltekit (offline support and installability)
- **Deployment**: Vercel (@sveltejs/adapter-vercel)
- **Testing**: Vitest (unit/component) + Playwright (E2E)

### Project Structure
```
src/
├── lib/
│   ├── components/        # Svelte components
│   │   ├── ImageUploader.svelte    # File upload UI (English)
│   │   ├── FaceCanvas.svelte       # Main canvas with face detection
│   │   ├── ControlPanel.svelte     # Blur controls (English)
│   │   ├── LoadingSpinner.svelte   # Loading state
│   │   ├── ErrorMessage.svelte     # Error display
│   │   └── ja/                     # Japanese component translations
│   │       ├── ImageUploader.svelte
│   │       └── ControlPanel.svelte
│   ├── utils/
│   │   ├── faceDetection.ts       # MediaPipe integration
│   │   ├── imageProcessing.ts     # Canvas blur operations
│   │   ├── fileHandler.ts         # Image load/save with iOS support
│   │   └── constants.ts           # App constants
│   ├── stores/
│   │   └── appState.ts            # Svelte stores for state management
│   └── types/
│       └── index.ts               # TypeScript type definitions
├── routes/
│   ├── +page.svelte               # Main page (English)
│   ├── +layout.svelte             # App layout
│   ├── info/
│   │   └── +page.svelte           # Info/about page (English)
│   └── ja/                        # Japanese routes
│       ├── +page.svelte           # Main page (Japanese)
│       └── info/
│           └── +page.svelte       # Info/about page (Japanese)
└── app.html                       # HTML template
```

### Test Configuration
The project uses Vitest with two test configurations:
- **Client tests**: Browser-based tests using Playwright for `.svelte.{test,spec}.{js,ts}` files
- **Server tests**: Node environment tests for `.{test,spec}.{js,ts}` files (excluding Svelte tests)

E2E tests are in the `e2e/` directory and run with Playwright against the built app on port 4173.

### Routes
The app has the following route structure:
- **Main App** (`/` and `/ja`): Face blur application interface
- **Info Page** (`/info` and `/ja/info`): About page with app information, privacy policy, and usage instructions

Each route is available in both English and Japanese versions.

## Core Concepts

### Internationalization (i18n)
The app supports multiple languages through route-based localization:
- **English**: Default routes (`/`, `/info`)
- **Japanese**: `/ja/*` routes (`/ja`, `/ja/info`)

Localized components are organized in parallel structures:
- UI text translations are maintained in component duplicates under `src/lib/components/ja/`
- Each language has its own route structure under `src/routes/` and `src/routes/ja/`
- Users can switch languages via links in the UI

No i18n library is used - translations are handled through component-level duplication for simplicity and performance.

### State Management
Uses Svelte writable stores in `src/lib/stores/appState.ts`:
- `uploadedImage`: Current image being processed
- `detectedFaces`: Array of detected face objects with bounding boxes
- `blurredFaceIds`: Set of face IDs that are currently blurred
- `blurIntensity`: Blur strength (0-100)
- `blurStyle`: 'gaussian' | 'pixelate' | 'heavy'
- `isProcessing`: Loading state flag
- `error`: Error message string

### Image Processing Flow
1. User uploads image → `fileHandler.loadImage()`
2. Image resized if >4096px → `resizeImage()`
3. MediaPipe detects faces → `faceDetection.detectFaces()`
4. All faces initially blurred on canvas → `imageProcessing.applyBlur()`
5. User taps faces to toggle blur → `toggleFaceBlur()`
6. Download via Web Share API (iOS) or direct download (Desktop) → `fileHandler.downloadImage()`

### Blur Implementation
Three blur styles implemented in `imageProcessing.ts`:
- **gaussian**: Canvas filter `blur()` - smooth blur
- **pixelate**: Downscale/upscale technique - mosaic effect
- **heavy**: Gaussian blur + brightness filter - strong obscuring

Each face gets a 1.2x bounding box padding for natural blur boundaries.

### iOS-Specific Handling
- Uses Web Share API for image saving on iOS Safari
- Falls back to `<a download>` on desktop browsers
- Touch events properly scaled for canvas coordinate mapping

### PWA Configuration
The app is configured as a Progressive Web App using `@vite-pwa/sveltekit`:
- **Offline Support**: Service worker caches assets for offline use
- **Install Prompt**: Users can install the app to their home screen
- **Manifest**: Web app manifest defines app metadata and icons
- **Update Strategy**: Automatic update checks when online

PWA configuration is in `vite.config.ts` with the VitePWA plugin settings.

### Deployment
The app is configured for deployment on Vercel:
- **Adapter**: Uses `@sveltejs/adapter-vercel` for optimized Vercel deployment
- **Static Assets**: All assets served via Vercel's CDN
- **Environment**: Production builds automatically optimize for performance
- **Zero Config**: Deploy with `vercel` command or via GitHub integration

## Development Notes

### Svelte 5 Syntax
This project uses Svelte 5, which has different syntax from Svelte 4:
- Uses runes like `$state`, `$derived`, `$effect` instead of reactive statements
- Component props use `let { prop } = $props()` syntax

### MediaPipe Integration
- Models loaded from CDN (jsdelivr + Google Cloud Storage)
- Face detector initialized once and cached
- Uses BlazeFace short-range model with 50% confidence threshold
- GPU delegate enabled for performance

### Canvas Coordinate Mapping
When handling tap events, canvas coordinates must be scaled from display coordinates:
```typescript
const scaleX = canvas.width / rect.width;
const scaleY = canvas.height / rect.height;
```

## Specification Reference

The complete technical specification is in `docs/spec.md` (written in Japanese). It includes:
- Detailed component architecture
- Complete type definitions
- Implementation examples for all utilities
- UI/UX wireframes
- PWA configuration
- Performance optimization strategies
- Security/privacy considerations

Refer to this document for:
- Detailed blur algorithm implementations
- MediaPipe initialization code
- iOS file handling patterns
- Complete type interfaces

## Caution

### playwright

Do NOT use playwright - Take a screenshot
The following error occurs, causing the system to freeze.
```sh
 [Image]
API Error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"messages.13.content.4.image.source.base64.data: Image does not match the provided media type image/jpeg"},"request_id":"req_011CVHYE4nuP9hqfsVRdbL6d"}
```
