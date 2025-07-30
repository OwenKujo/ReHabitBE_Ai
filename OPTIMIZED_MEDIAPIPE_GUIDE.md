# Optimized MediaPipe Detection Guide

## Overview

This guide covers the optimized MediaPipe movement detection functions that provide smoother performance and better user experience.

## Key Optimizations

### 1. **Frame Rate Control**
- **Target FPS**: 30 FPS for smooth detection
- **Frame Skipping**: Automatically skips frames to maintain performance
- **RequestAnimationFrame**: Uses browser's animation frame for smooth rendering

### 2. **Performance Monitoring**
- **Real-time FPS tracking**
- **Detection time monitoring**
- **Frame count tracking**
- **Performance status indicators**

### 3. **Caching System**
- **Angle calculation caching** for pose detection
- **Landmark position caching**
- **Automatic cache cleanup** to prevent memory leaks

### 4. **Optimized Detection Functions**

#### Pose Detection (`detectPoseSmooth`)
```javascript
// Features:
// - Frame rate control (30 FPS target)
// - Cached angle calculations
// - Efficient canvas rendering
// - Performance metrics tracking
// - Smooth feedback updates

const result = detectPoseSmooth(results, canvasRef);
// Returns: { feedback: "Correct", isHolding: true }
```

#### Face Detection (`detectFaceSmooth`)
```javascript
// Features:
// - Frame rate control (30 FPS target)
// - Optimized pitch calculation
// - Smooth visual feedback
// - Performance monitoring
// - Error handling

const result = detectFaceSmooth(results, canvasRef);
// Returns: { feedback: "Correct! Keep holding!", isHolding: true, feedbackColor: "#00FF00" }
```

## File Structure

```
src/
├── utils/
│   └── mediaPipeDetection.js     # Optimized detection functions
├── hooks/
│   ├── useSmoothPoseDetection.js # Optimized pose detection hook
│   └── useSmoothFaceDetection.js # Optimized face detection hook
├── components/
│   └── PerformanceMonitor.js     # Performance monitoring component
└── page/
    └── MediaPipefulldemoOptimized.js # Main optimized component
```

## How to Use

### 1. **Import the Optimized Hooks**
```javascript
import { useSmoothPoseDetection } from '../hooks/useSmoothPoseDetection';
import { useSmoothFaceDetection } from '../hooks/useSmoothFaceDetection';
```

### 2. **Use in Your Component**
```javascript
const {
  isLoading,
  error,
  feedback,
  isHolding,
  performance,
  initializePose,
  cleanup
} = useSmoothPoseDetection(videoRef, canvasRef);
```

### 3. **Add Performance Monitor**
```javascript
import PerformanceMonitor from '../components/PerformanceMonitor';

// In your JSX
<PerformanceMonitor 
  performance={performance} 
  isVisible={showPerformanceMonitor}
/>
```

## Performance Benefits

### 1. **Smoother Detection**
- **Consistent 30 FPS** regardless of device performance
- **Reduced jitter** in detection results
- **Smoother visual feedback**

### 2. **Better Resource Management**
- **Automatic frame skipping** when needed
- **Efficient canvas rendering**
- **Memory leak prevention**

### 3. **Real-time Monitoring**
- **Live FPS display**
- **Detection time tracking**
- **Performance status indicators**

## Configuration Options

### Detection Confidence
```javascript
const DETECTION_CONFIG = {
  pose: {
    minDetectionConfidence: 0.6,    // Higher = more accurate but slower
    minTrackingConfidence: 0.6,     // Higher = more stable tracking
    modelComplexity: 1,             // 0 = fastest, 2 = most accurate
    smoothLandmarks: true,          // Smooth landmark positions
    enableSegmentation: false,      // Disable for better performance
    staticImageMode: false          // Real-time mode
  },
  face: {
    maxNumFaces: 1,                // Detect only one face
    refineLandmarks: true,         // More accurate landmarks
    minDetectionConfidence: 0.6,   // Detection threshold
    minTrackingConfidence: 0.6     // Tracking threshold
  }
};
```

### Frame Rate Control
```javascript
const targetFPS = 30;              // Target frame rate
const frameInterval = 1000 / targetFPS; // Time between frames
```

## Performance Monitoring

### Performance Metrics
```javascript
const metrics = getPerformanceMetrics();
// Returns: { fps: 30, detectionTime: 15.2, frameCount: 1500 }
```

### Performance Status
- **Excellent**: 25+ FPS (Green)
- **Good**: 20-24 FPS (Yellow)
- **Fair**: 15-19 FPS (Orange)
- **Poor**: <15 FPS (Red)

## Troubleshooting

### 1. **Low FPS Issues**
```javascript
// Reduce model complexity
const config = {
  modelComplexity: 0,  // Use fastest model
  minDetectionConfidence: 0.5,  // Lower threshold
  minTrackingConfidence: 0.5
};
```

### 2. **High Detection Time**
```javascript
// Increase frame skipping
const frameInterval = 1000 / 24; // Target 24 FPS instead of 30
```

### 3. **Memory Issues**
```javascript
// Clear cache manually
resetPerformanceMetrics();
```

## Advanced Usage

### 1. **Custom Detection Thresholds**
```javascript
// In mediaPipeDetection.js
export const setDetectionThresholds = (pose, face) => {
  DETECTION_CONFIG.pose = { ...DETECTION_CONFIG.pose, ...pose };
  DETECTION_CONFIG.face = { ...DETECTION_CONFIG.face, ...face };
};
```

### 2. **Performance Callbacks**
```javascript
const onPerformanceUpdate = (metrics) => {
  console.log(`FPS: ${metrics.fps}, Detection Time: ${metrics.detectionTime}ms`);
};

// Add to your hook
useEffect(() => {
  const interval = setInterval(() => {
    const metrics = getPerformanceMetrics();
    onPerformanceUpdate(metrics);
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
```

### 3. **Adaptive Performance**
```javascript
// Automatically adjust based on performance
const adaptiveDetection = () => {
  const metrics = getPerformanceMetrics();
  
  if (metrics.fps < 20) {
    // Reduce quality for better performance
    setDetectionConfig({ modelComplexity: 0 });
  } else if (metrics.fps > 28) {
    // Increase quality
    setDetectionConfig({ modelComplexity: 1 });
  }
};
```

## Migration from Original Code

### 1. **Replace Detection Functions**
```javascript
// Old
const onResults = (results) => {
  // Complex detection logic
};

// New
const onResults = (results) => {
  const result = detectPoseSmooth(results, canvasRef);
  setFeedback(result.feedback);
  setIsHolding(result.isHolding);
};
```

### 2. **Update Hooks**
```javascript
// Old
import { usePoseDetection } from '../hooks/usePoseDetection';

// New
import { useSmoothPoseDetection } from '../hooks/useSmoothPoseDetection';
```

### 3. **Add Performance Monitor**
```javascript
// Add to your component
<PerformanceMonitor performance={performance} isVisible={true} />
```

## Best Practices

### 1. **Initialize Properly**
```javascript
useEffect(() => {
  if (permissionState === 'granted') {
    initializePose();
  }
  
  return () => cleanup();
}, [permissionState]);
```

### 2. **Monitor Performance**
```javascript
// Always show performance monitor during development
const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(true);
```

### 3. **Handle Errors Gracefully**
```javascript
if (error) {
  console.error('Detection error:', error);
  // Show user-friendly error message
  return <ErrorComponent error={error} />;
}
```

### 4. **Optimize for Different Devices**
```javascript
// Detect device performance and adjust accordingly
const devicePerformance = getDevicePerformance();
if (devicePerformance === 'low') {
  setDetectionConfig({ modelComplexity: 0 });
}
```

## Conclusion

The optimized MediaPipe detection functions provide:

- **Smoother performance** with consistent frame rates
- **Better resource management** with automatic optimization
- **Real-time monitoring** for performance tracking
- **Easier debugging** with detailed metrics
- **Better user experience** with reduced jitter and lag

Use these optimized functions for production applications where smooth performance is critical. 