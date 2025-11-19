# Phase 1 Development Plan - MVP Release

## Current Status Assessment

### ✅ Completed
- [x] SvelteKit project initialized with Svelte 5
- [x] TypeScript configuration
- [x] Tailwind CSS v4 configured (using @tailwindcss/vite)
- [x] Testing infrastructure (Vitest + Playwright)
- [x] ESLint + Prettier setup
- [x] Basic project structure (`src/lib/`, `src/routes/`)

### ❌ Not Implemented
- [ ] MediaPipe Face Detection integration
- [ ] All components (ImageUploader, FaceCanvas, ControlPanel, etc.)
- [ ] All utilities (faceDetection, imageProcessing, fileHandler)
- [ ] State management (Svelte stores)
- [ ] Type definitions
- [ ] PWA configuration
- [ ] Vercel adapter
- [ ] Static assets (icons, manifest)
- [ ] Main application logic

---

## Implementation Roadmap

### **Stage 1: Dependencies & Foundation** (30 minutes)

#### 1.1 Install Missing Dependencies
```bash
npm install @mediapipe/tasks-vision
npm install -D @vite-pwa/sveltekit @sveltejs/adapter-vercel
```

**Deliverable:** Updated `package.json` with all required dependencies

#### 1.2 Configure Vercel Adapter
- Update `svelte.config.js` to use `@sveltejs/adapter-vercel`

**Deliverable:** `svelte.config.js` configured for Vercel deployment

#### 1.3 Create Directory Structure
```bash
src/lib/
├── components/
├── utils/
├── stores/
└── types/
```

**Deliverable:** Complete directory structure matching spec

---

### **Stage 2: Type Definitions & Constants** (20 minutes)

#### 2.1 Implement Type Definitions
File: `src/lib/types/index.ts`

Define:
- `DetectedFace` interface
- `BlurStyle` type
- `BlurConfig` interface
- `AppState` interface

**Deliverable:** Complete TypeScript type definitions per spec lines 210-243

#### 2.2 Create Constants File
File: `src/lib/utils/constants.ts`

Define:
- `MAX_IMAGE_SIZE = 4096`
- `BLUR_STYLES` array
- `DEFAULT_BLUR_INTENSITY = 70`
- `MIN_DETECTION_CONFIDENCE = 0.5`
- `FACE_PADDING_MULTIPLIER = 1.2`
- Error message constants

**Deliverable:** Centralized constants file

---

### **Stage 3: State Management** (30 minutes)

#### 3.1 Implement Svelte Stores
File: `src/lib/stores/appState.ts`

Create writable stores for:
- `uploadedImage`
- `detectedFaces`
- `blurredFaceIds`
- `blurIntensity`
- `blurStyle`
- `isProcessing`
- `error`

**Deliverable:** Complete state management system per spec lines 163-172

---

### **Stage 4: Utility Functions** (2-3 hours)

#### 4.1 Face Detection Utility
File: `src/lib/utils/faceDetection.ts`

Implement:
- `initializeFaceDetector()`: MediaPipe initialization
- `detectFaces(image)`: Face detection logic

**Reference:** Spec lines 250-287
**Deliverable:** Working MediaPipe integration with GPU acceleration

#### 4.2 Image Processing Utility
File: `src/lib/utils/imageProcessing.ts`

Implement:
- `applyBlur()`: Main blur orchestration
- `applyFaceBlur()`: Individual face blur
- `applyGaussianBlur()`: Gaussian blur style
- `applyPixelate()`: Pixelate blur style
- `applyHeavyBlur()`: Heavy blur style
- `drawFaceOverlay()`: Visual feedback (borders)

**Reference:** Spec lines 290-417
**Deliverable:** Complete blur processing system with 3 styles

#### 4.3 File Handler Utility
File: `src/lib/utils/fileHandler.ts`

Implement:
- `loadImage(file)`: Image loading with resize
- `downloadImage(canvas, filename)`: iOS-aware download
- `resizeImage(img, maxSize)`: Image resize helper

**Reference:** Spec lines 475-567
**Deliverable:** Image I/O with iOS Web Share API support

---

### **Stage 5: UI Components** (3-4 hours)

#### 5.1 LoadingSpinner Component
File: `src/lib/components/LoadingSpinner.svelte`

Simple spinner for processing state.

**Deliverable:** Reusable loading component

#### 5.2 ErrorMessage Component
File: `src/lib/components/ErrorMessage.svelte`

Display error messages from store.

**Deliverable:** Error display component with auto-dismiss

#### 5.3 ImageUploader Component
File: `src/lib/components/ImageUploader.svelte`

Features:
- File input with `accept="image/*"`
- Image preview
- Trigger face detection on upload

**Reference:** Spec lines 119-122
**Deliverable:** Image upload UI

#### 5.4 FaceCanvas Component
File: `src/lib/components/FaceCanvas.svelte`

Features:
- Canvas rendering
- Face detection visualization
- Tap/click event handling
- Coordinate mapping (display → canvas)
- Toggle blur on tap

**Reference:** Spec lines 124-129, 420-472
**Deliverable:** Interactive canvas with face detection

#### 5.5 ControlPanel Component
File: `src/lib/components/ControlPanel.svelte`

Features:
- Blur style selector (gaussian/pixelate/heavy)
- Intensity slider (0-100)
- Download button
- Real-time preview updates

**Reference:** Spec lines 131-135
**Deliverable:** Control UI for blur customization

---

### **Stage 6: Main Application** (1-2 hours)

#### 6.1 Layout Component
File: `src/routes/+layout.svelte`

- Basic HTML structure
- Global styles
- App-wide error boundary

**Reference:** Spec lines 184-185
**Deliverable:** Common layout wrapper

#### 6.2 Main Page Component
File: `src/routes/+page.svelte`

Features:
- Component orchestration
- Processing flow control
- Header with logo/description
- Footer with instructions

**Reference:** Spec lines 179-182, 591-615
**Deliverable:** Complete main page integrating all components

---

### **Stage 7: PWA Configuration** (1 hour)

#### 7.1 Create PWA Assets
Files in `static/`:
- `favicon.png`
- `icon-192.png`
- `icon-512.png`
- `manifest.json`

**Reference:** Spec lines 625-650
**Deliverable:** PWA icons and manifest

#### 7.2 Configure Vite PWA Plugin
Update `vite.config.ts`:
- Add `SvelteKitPWA` plugin
- Configure manifest
- Set up Workbox

**Reference:** Spec lines 652-671
**Deliverable:** Working PWA with offline capabilities

#### 7.3 Add CSP Headers
File: `src/app.html`

Add Content Security Policy meta tag.

**Reference:** Spec lines 866-873
**Deliverable:** Security headers configured

---

### **Stage 8: Styling & UX Polish** (1-2 hours)

#### 8.1 Tailwind Configuration
File: `tailwind.config.js`

Custom colors:
- primary: `#3b82f6`
- secondary: `#8b5cf6`
- success: `#10b981`
- danger: `#ef4444`

**Reference:** Spec lines 574-588
**Deliverable:** Custom Tailwind theme

#### 8.2 Responsive Design
- Mobile-first approach
- Touch-optimized tap targets (min 44x44px)
- Proper viewport meta tags
- CSS for canvas scaling

**Reference:** Spec lines 618-621
**Deliverable:** Mobile-optimized UI

#### 8.3 Loading & Error States
- Spinner during face detection
- Error messages with auto-dismiss
- Disabled states during processing
- Visual feedback for blurred/unblurred faces

**Reference:** Spec lines 86-89, 97-100
**Deliverable:** Complete UX states

---

### **Stage 9: Testing & Debugging** (2-3 hours)

#### 9.1 Manual Testing Checklist
- [ ] Image upload works
- [ ] Face detection detects multiple faces
- [ ] All 3 blur styles work correctly
- [ ] Intensity slider updates in real-time
- [ ] Tap toggles blur on/off
- [ ] Download works on desktop
- [ ] Download works on iOS (requires real device)
- [ ] No console errors
- [ ] Performance acceptable on iPhone 12+

**Reference:** Spec lines 776-799
**Deliverable:** Verified functionality

#### 9.2 Unit Tests (Optional for MVP)
- Face detection initialization
- Blur algorithm correctness
- File loading/saving

**Deliverable:** Basic test coverage

#### 9.3 Bug Fixes
Address any issues found during testing.

**Deliverable:** Stable application

---

### **Stage 10: Deployment** (30 minutes)

#### 10.1 Git Repository Setup
```bash
git init
git add .
git commit -m "Initial commit: Face Blur App MVP"
git remote add origin <repository-url>
git push -u origin main
```

**Deliverable:** Code in version control

#### 10.2 Vercel Deployment
1. Import project to Vercel
2. Configure build settings (auto-detected)
3. Deploy to production
4. Verify deployment works

**Reference:** Spec lines 723-747
**Deliverable:** Live production URL

#### 10.3 iPhone Testing
- Access production URL on iPhone
- Test all features
- Verify Web Share API works
- Check performance

**Deliverable:** iPhone-verified application

---

## Success Criteria

### Functional Requirements
- [x] User can upload an image from gallery
- [x] App detects all faces with 50%+ confidence
- [x] All faces are initially blurred
- [x] User can tap faces to toggle blur
- [x] 3 blur styles available (gaussian, pixelate, heavy)
- [x] Blur intensity adjustable 0-100
- [x] Image downloads via Web Share API (iOS) or direct (desktop)
- [x] No server upload (100% client-side)

### Performance Requirements
- [x] Face detection completes in <5 seconds on iPhone 12+
- [x] No crashes on 4K images (resize to 4096px)
- [x] Smooth UI interactions (no lag)

### UX Requirements
- [x] Mobile-first responsive design
- [x] Clear loading states
- [x] Helpful error messages
- [x] Intuitive tap interactions
- [x] Visual feedback (colored borders)

### Technical Requirements
- [x] TypeScript strict mode
- [x] PWA installable on iPhone
- [x] Works offline (after first load)
- [x] Deployed to Vercel
- [x] No console errors

---

## Timeline Estimate

| Stage | Task | Time | Cumulative |
|-------|------|------|------------|
| 1 | Dependencies & Foundation | 30 min | 30 min |
| 2 | Types & Constants | 20 min | 50 min |
| 3 | State Management | 30 min | 1h 20min |
| 4 | Utility Functions | 3h | 4h 20min |
| 5 | UI Components | 4h | 8h 20min |
| 6 | Main Application | 1.5h | 9h 50min |
| 7 | PWA Configuration | 1h | 10h 50min |
| 8 | Styling & UX | 1.5h | 12h 20min |
| 9 | Testing & Debugging | 2.5h | 14h 50min |
| 10 | Deployment | 30min | 15h 20min |

**Total Estimated Time: 15-16 hours** (2-3 working days)

---

## Risk Mitigation

### High-Risk Items
1. **MediaPipe CDN Loading**
   - Risk: CDN unavailable or slow
   - Mitigation: Consider self-hosting WASM files if needed

2. **iOS Web Share API**
   - Risk: API changes or restrictions
   - Mitigation: Provide fallback download method

3. **Performance on Older iPhones**
   - Risk: Slow processing on iPhone X and older
   - Mitigation: Add image size warnings, optimize blur algorithms

4. **Browser Compatibility**
   - Risk: Features not working in older browsers
   - Mitigation: Feature detection, graceful degradation

### Medium-Risk Items
1. **Canvas Memory Usage**
   - Mitigation: Proper cleanup, image size limits

2. **Touch Event Conflicts**
   - Mitigation: Prevent default, proper event handling

---

## Post-MVP Considerations (Phase 2)

Items explicitly deferred per spec (lines 102-108):
- Camera capture functionality
- Batch processing
- Filters & color correction
- Direct SNS posting
- Settings persistence (LocalStorage)
- Analytics

---

## Development Order

**Recommended implementation order:**

1. **Start with utilities** (Stage 4) - Core logic independent of UI
2. **Then state management** (Stage 3) - Connects utilities to UI
3. **Build components bottom-up** (Stage 5) - Simple → Complex
4. **Integrate in main page** (Stage 6) - Wire everything together
5. **Add PWA & polish** (Stages 7-8) - Enhancement layer
6. **Test thoroughly** (Stage 9) - Validate everything works
7. **Deploy** (Stage 10) - Ship it!

---

## Notes

- All code examples in spec are reference implementations
- Use Svelte 5 runes syntax (`$state`, `$derived`, `$effect`)
- Maintain strict TypeScript typing throughout
- Follow existing ESLint/Prettier configuration
- Keep accessibility in mind (ARIA labels, keyboard support where applicable)
- Test on actual iPhone before considering MVP complete
