# Face Blur App

A privacy-focused Progressive Web App (PWA) that automatically detects and blurs faces in photos. Users can selectively reveal individual faces by tapping them. All processing happens client-side in the browser - no images are ever uploaded to a server.

## Features

- **Automatic Face Detection**: Uses MediaPipe's Face Detection to identify all faces in an image
- **Multiple Blur Styles**: Choose from Gaussian blur, pixelation, or heavy blur
- **Adjustable Blur Intensity**: Fine-tune the blur strength from 0-100
- **Tap to Toggle**: Easily reveal or re-blur individual faces
- **Privacy-First**: All processing happens in your browser - images never leave your device
- **iOS Optimized**: Native sharing on iOS via Web Share API
- **Offline Capable**: Works without internet connection after first load (PWA)
- **Multilingual**: Available in English and Japanese

## Demo

Visit the live app: [Face Blur App](https://your-deployment-url.vercel.app)

## Technology Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with Svelte 5
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Face Detection**: [MediaPipe Face Detection](https://developers.google.com/mediapipe/solutions/vision/face_detector)
- **PWA**: [@vite-pwa/sveltekit](https://vite-pwa-org.netlify.app/frameworks/sveltekit.html)
- **Testing**: Vitest + Playwright
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/face-blur-app.git
cd face-blur-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Start dev server and open in browser
npm run dev -- --open
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Testing

```bash
# Run all tests
npm run test

# Run unit tests only
npm run test:unit

# Run E2E tests only
npm run test:e2e

# Type checking
npm run check
```

## Code Quality

```bash
# Format code with Prettier
npm run format

# Lint code (Prettier + ESLint)
npm run lint
```

## Project Structure

```
face-blur-app/
├── src/
│   ├── lib/
│   │   ├── components/          # Svelte components
│   │   │   ├── ImageUploader.svelte
│   │   │   ├── FaceCanvas.svelte
│   │   │   ├── ControlPanel.svelte
│   │   │   └── ja/              # Japanese translations
│   │   ├── utils/               # Utility functions
│   │   │   ├── faceDetection.ts
│   │   │   ├── imageProcessing.ts
│   │   │   └── fileHandler.ts
│   │   ├── stores/              # Svelte stores
│   │   │   └── appState.ts
│   │   └── types/               # TypeScript types
│   ├── routes/
│   │   ├── +page.svelte         # Main app (English)
│   │   ├── info/                # Info page (English)
│   │   └── ja/                  # Japanese routes
│   └── app.html
├── e2e/                         # E2E tests
└── static/                      # Static assets
```

## How It Works

1. **Upload**: User selects or drops an image
2. **Detection**: MediaPipe detects all faces in the image
3. **Blur**: All detected faces are initially blurred
4. **Toggle**: User taps faces to reveal/blur individual faces
5. **Download**: Save the processed image via Web Share API (iOS) or direct download (desktop)

## Browser Support

- Chrome/Edge 90+
- Safari 14+ (iOS 14+)
- Firefox 88+

## Deployment

This app is configured for deployment on Vercel:

```bash
# Deploy to Vercel
vercel
```

The PWA is configured to work offline after the first load.

## Privacy & Security

- All image processing happens client-side in your browser
- No images are uploaded to any server
- No analytics or tracking
- No cookies required
- Open source - audit the code yourself

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [MediaPipe](https://developers.google.com/mediapipe) for the face detection model
- [SvelteKit](https://kit.svelte.dev/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## Development Guide

For detailed development instructions and architecture documentation, see [CLAUDE.md](./CLAUDE.md).
