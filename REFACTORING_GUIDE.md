# MediaPipe Rehabilitation App Refactoring Guide

## Overview

The original `MediaPipefulldemo.js` file was over 2000 lines long and contained multiple responsibilities mixed together. This refactoring splits it into smaller, focused modules for better maintainability and performance.

## New File Structure

```
src/
├── utils/
│   ├── mediaPipeLoader.js      # MediaPipe script loading utilities
│   ├── audioUtils.js           # Speech synthesis and beep sounds
│   ├── poseUtils.js            # Pose detection calculations
│   └── faceUtils.js            # Face detection calculations
├── hooks/
│   ├── usePoseDetection.js     # Pose detection state management
│   ├── useFaceDetection.js     # Face detection state management
│   └── useRehabilitationSession.js # Session state management
├── components/
│   ├── PoseRehabilitationUI.js # Pose mode UI component
│   └── FaceRehabilitationUI.js # Face mode UI component
└── page/
    └── MediaPipefulldemoRefactored.js # Main refactored component
```

## Key Improvements

### 1. **Separation of Concerns**
- **Utils**: Pure functions for calculations and external services
- **Hooks**: State management and side effects
- **Components**: UI rendering and user interactions
- **Main Component**: Orchestration and mode switching

### 2. **Better Performance**
- **Lazy Loading**: MediaPipe scripts load only when needed
- **Memoization**: Hooks prevent unnecessary re-renders
- **Cleanup**: Proper resource management prevents memory leaks
- **Optimized Effects**: Reduced dependency arrays and better cleanup

### 3. **Maintainability**
- **Single Responsibility**: Each file has one clear purpose
- **Reusability**: Hooks and utils can be reused across components
- **Testability**: Smaller functions are easier to test
- **Debugging**: Clear separation makes issues easier to isolate

## How to Use the Refactored Code

### 1. **Replace the Original File**
```javascript
// In your App.js or routing
import MediaPipefulldemoRefactored from './page/MediaPipefulldemoRefactored';
```

### 2. **Running the Application**

#### Development Mode
```bash
npm start
```

#### Production Build
```bash
npm run build
npm install -g serve
serve -s build
```

### 3. **Performance Optimizations**

#### Browser Compatibility
- The app now uses multiple CDN sources for MediaPipe scripts
- Fallback mechanisms ensure scripts load even if primary sources fail
- Non-SIMD versions are used for better compatibility

#### Memory Management
- Proper cleanup of MediaPipe instances
- Audio context cleanup prevents memory leaks
- Speech synthesis cancellation prevents overlapping audio

#### Responsive Design
- Mobile-first approach with responsive breakpoints
- Canvas scaling for different screen sizes
- Touch-friendly UI elements

## Key Features

### 1. **Dual Mode Rehabilitation**
- **Pose Mode**: Arm angle detection for office syndrome
- **Face Mode**: Head tilt detection for neck exercises
- **Automatic Transition**: Seamless switching between modes

### 2. **Real-time Feedback**
- Visual feedback on canvas
- Audio cues and speech synthesis
- Progress tracking and scoring

### 3. **Multilingual Support**
- Thai and English language support
- Localized tips and instructions
- Voice synthesis in both languages

### 4. **Accessibility**
- Voice guidance for visually impaired users
- Clear visual indicators
- Keyboard navigation support

## Troubleshooting

### Common Issues

#### 1. **Camera Permission Denied**
```javascript
// Check browser console for permission errors
// Ensure HTTPS is used (required for camera access)
```

#### 2. **MediaPipe Scripts Not Loading**
```javascript
// The app automatically tries multiple CDN sources
// Check network connectivity
// Try refreshing the page
```

#### 3. **Poor Detection Accuracy**
```javascript
// Ensure good lighting
// Position camera correctly
// Check browser console for detection confidence
```

#### 4. **Audio Not Working**
```javascript
// Check browser audio permissions
// Ensure system volume is on
// Try clicking the test audio button
```

### Performance Tips

#### 1. **For Better Performance**
- Use a modern browser (Chrome, Firefox, Safari)
- Ensure good internet connection for script loading
- Close other resource-intensive applications

#### 2. **For Better Detection**
- Use a high-quality webcam
- Ensure good lighting conditions
- Position yourself according to the instructions

#### 3. **For Smoother Experience**
- Allow camera permissions when prompted
- Wait for scripts to load completely
- Follow the on-screen instructions carefully

## Development Notes

### Adding New Features

#### 1. **New Detection Mode**
```javascript
// Create new hook in hooks/
export const useNewDetection = (videoRef, canvasRef) => {
  // Implementation
};

// Add to main component
const newDetection = useNewDetection(videoRef, canvasRef);
```

#### 2. **New UI Component**
```javascript
// Create new component in components/
const NewRehabilitationUI = ({ props }) => {
  // Implementation
};
```

#### 3. **New Utility Function**
```javascript
// Add to appropriate utils file
export const newUtility = () => {
  // Implementation
};
```

### Testing

#### 1. **Unit Tests**
```bash
npm test
```

#### 2. **Integration Tests**
```bash
# Test camera access
# Test MediaPipe loading
# Test audio functionality
```

#### 3. **Performance Testing**
```bash
# Monitor memory usage
# Check frame rate
# Test on different devices
```

## Migration from Original Code

### 1. **Backup Original**
```bash
cp src/page/MediaPipefulldemo.js src/page/MediaPipefulldemo.js.backup
```

### 2. **Update Imports**
```javascript
// Replace in your routing
import MediaPipefulldemoRefactored from './page/MediaPipefulldemoRefactored';
```

### 3. **Test Functionality**
- Verify pose detection works
- Verify face detection works
- Test audio and speech synthesis
- Check multilingual support

## Benefits of Refactoring

### 1. **Code Quality**
- Reduced complexity
- Better error handling
- Consistent patterns
- Clear documentation

### 2. **Performance**
- Faster loading times
- Better memory management
- Optimized re-renders
- Reduced bundle size

### 3. **Maintainability**
- Easier to debug
- Simpler to extend
- Better testing capabilities
- Clear separation of concerns

### 4. **User Experience**
- Smoother interactions
- Better error messages
- More responsive UI
- Improved accessibility

## Conclusion

This refactoring transforms a monolithic 2000+ line file into a well-structured, maintainable application. The new architecture provides better performance, easier debugging, and simpler feature additions while maintaining all original functionality.

The modular approach makes it easy to:
- Add new detection modes
- Implement new UI components
- Extend utility functions
- Test individual components
- Debug specific issues

Follow this guide to successfully migrate to the refactored version and enjoy the improved development experience. 