# Performance Optimization Guide

## Overview

This guide provides strategies to ensure the MediaPipe Rehabilitation App runs smoothly and efficiently.

## Key Performance Improvements

### 1. **Script Loading Optimization**

#### Multiple CDN Sources
```javascript
// The app automatically tries multiple sources
const scriptSources = [
  'https://unpkg.com/@mediapipe/...',
  'https://cdn.jsdelivr.net/npm/@mediapipe/...',
  'https://unpkg.com/@mediapipe/...' // Fallback
];
```

#### Lazy Loading
- MediaPipe scripts load only when needed
- Face detection scripts load only when switching to face mode
- Reduces initial bundle size

### 2. **Memory Management**

#### Proper Cleanup
```javascript
// Cleanup MediaPipe instances
useEffect(() => {
  return () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
    }
    if (poseRef.current) {
      poseRef.current.close();
    }
  };
}, []);
```

#### Audio Context Management
```javascript
// Prevent audio memory leaks
setTimeout(() => {
  try {
    audioContext.close();
  } catch (e) {
    console.warn("Error closing audio context:", e);
  }
}, duration + 100);
```

### 3. **Canvas Optimization**

#### Efficient Rendering
```javascript
// Use requestAnimationFrame for smooth rendering
const renderFrame = () => {
  // Render logic
  requestAnimationFrame(renderFrame);
};
```

#### Canvas Scaling
```javascript
// Responsive canvas sizing
const canvas = canvasRef.current;
const ctx = canvas.getContext('2d');
ctx.scale(canvas.width / 640, canvas.height / 480);
```

## Browser-Specific Optimizations

### Chrome
- Enable hardware acceleration
- Use WebGL for canvas rendering
- Optimize for WebRTC

### Firefox
- Enable WebGL
- Optimize for MediaDevices API
- Use SharedArrayBuffer if available

### Safari
- Enable experimental features
- Use WebKit-specific optimizations
- Optimize for iOS devices

## Device-Specific Optimizations

### Desktop
```javascript
// Higher resolution for desktop
const config = {
  width: 1280,
  height: 720,
  frameRate: 30
};
```

### Mobile
```javascript
// Optimized for mobile performance
const config = {
  width: 640,
  height: 480,
  frameRate: 24
};
```

### Low-End Devices
```javascript
// Reduced quality for better performance
const config = {
  width: 320,
  height: 240,
  frameRate: 15
};
```

## Network Optimization

### CDN Strategy
```javascript
// Multiple CDN sources with fallback
const loadScript = async (src) => {
  try {
    await loadFromPrimaryCDN(src);
  } catch {
    try {
      await loadFromSecondaryCDN(src);
    } catch {
      await loadFromFallbackCDN(src);
    }
  }
};
```

### Caching
```javascript
// Cache MediaPipe models
const cacheKey = 'mediapipe-models';
const cachedModels = localStorage.getItem(cacheKey);
```

## Runtime Optimizations

### 1. **Frame Rate Control**
```javascript
// Adaptive frame rate based on performance
let frameRate = 30;
const measurePerformance = () => {
  const fps = calculateFPS();
  if (fps < 20) frameRate = 15;
  else if (fps > 25) frameRate = 30;
};
```

### 2. **Detection Confidence**
```javascript
// Adjust detection sensitivity
const config = {
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
};
```

### 3. **Batch Processing**
```javascript
// Process multiple frames together
const processBatch = (frames) => {
  return frames.map(frame => processFrame(frame));
};
```

## Monitoring and Debugging

### Performance Monitoring
```javascript
// Monitor frame rate
let frameCount = 0;
let lastTime = performance.now();

const monitorPerformance = () => {
  frameCount++;
  const currentTime = performance.now();
  
  if (currentTime - lastTime >= 1000) {
    const fps = frameCount * 1000 / (currentTime - lastTime);
    console.log(`FPS: ${fps.toFixed(2)}`);
    frameCount = 0;
    lastTime = currentTime;
  }
};
```

### Memory Monitoring
```javascript
// Monitor memory usage
const monitorMemory = () => {
  if ('memory' in performance) {
    const memory = performance.memory;
    console.log(`Memory: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
  }
};
```

## Troubleshooting Performance Issues

### 1. **High CPU Usage**
```javascript
// Reduce processing load
const optimizations = {
  skipFrames: 2, // Process every 3rd frame
  reduceResolution: true,
  lowerFrameRate: true
};
```

### 2. **Memory Leaks**
```javascript
// Regular cleanup
setInterval(() => {
  if (window.gc) window.gc();
}, 30000); // Every 30 seconds
```

### 3. **Slow Detection**
```javascript
// Optimize detection parameters
const optimizedConfig = {
  modelComplexity: 0, // Use lighter model
  smoothLandmarks: false, // Disable smoothing
  enableSegmentation: false // Disable segmentation
};
```

## Best Practices

### 1. **Code Splitting**
```javascript
// Load components on demand
const LazyComponent = React.lazy(() => import('./Component'));
```

### 2. **Memoization**
```javascript
// Prevent unnecessary re-renders
const memoizedValue = useMemo(() => {
  return expensiveCalculation(props);
}, [props.dependency]);
```

### 3. **Debouncing**
```javascript
// Debounce frequent events
const debouncedFunction = useCallback(
  debounce((value) => {
    // Handle value
  }, 100),
  []
);
```

## Testing Performance

### 1. **Benchmarking**
```javascript
// Measure execution time
const benchmark = (fn) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
};
```

### 2. **Load Testing**
```javascript
// Simulate high load
const loadTest = () => {
  for (let i = 0; i < 1000; i++) {
    processFrame(generateTestFrame());
  }
};
```

### 3. **Memory Testing**
```javascript
// Test memory usage
const memoryTest = () => {
  const initialMemory = performance.memory.usedJSHeapSize;
  // Run operations
  const finalMemory = performance.memory.usedJSHeapSize;
  return finalMemory - initialMemory;
};
```

## Production Optimizations

### 1. **Build Optimization**
```bash
# Optimize bundle size
npm run build -- --optimize
```

### 2. **Service Worker**
```javascript
// Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('mediapipe-cache').then((cache) => {
      return cache.addAll([
        '/static/js/mediapipe.js',
        '/static/css/styles.css'
      ]);
    })
  );
});
```

### 3. **Compression**
```javascript
// Enable gzip compression
app.use(compression());
```

## Conclusion

These optimizations ensure the app runs smoothly across different devices and network conditions. Monitor performance regularly and adjust optimizations based on user feedback and analytics.

Remember to test on various devices and network conditions to ensure optimal performance for all users. 