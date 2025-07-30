# MediaPipe Asset Loading Troubleshooting Guide

## Common Error: "Cannot read properties of undefined (reading 'pose_solution_packed_assets.data')"

This error occurs when MediaPipe cannot load its required asset files from the CDN. Here are several solutions:

## Solution 1: Clear Browser Cache and Refresh

```bash
# Hard refresh the page
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

## Solution 2: Check Network Connectivity

Ensure you have a stable internet connection. MediaPipe requires downloading model files (~10-20MB).

## Solution 3: Try Different Browser

- **Chrome**: Best compatibility
- **Firefox**: Good compatibility
- **Safari**: May have issues with certain CDNs

## Solution 4: Disable Browser Extensions

Some ad blockers or privacy extensions can interfere with CDN loading:

1. Disable ad blockers temporarily
2. Try incognito/private browsing mode
3. Disable browser extensions one by one

## Solution 5: Network Configuration

### For Corporate Networks
```javascript
// Add to your network configuration
// Allow these domains:
// - cdn.jsdelivr.net
// - unpkg.com
// - mediapipe.dev
```

### For Firewall Issues
```bash
# Check if these URLs are accessible:
curl https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose_solution_packed_assets.data
curl https://unpkg.com/@mediapipe/pose/pose_solution_packed_assets.data
```

## Solution 6: Alternative Loading Strategy

The refactored code now includes multiple fallback strategies:

```javascript
// Multiple CDN sources with fallbacks
const scriptSources = [
  // Primary sources with specific versions
  [
    'https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162/pose.js'
  ],
  // Alternative sources
  [
    'https://unpkg.com/@mediapipe/pose@0.5.1635988162/pose.js'
  ],
  // Fallback sources
  [
    'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js'
  ]
];
```

## Solution 7: Local Development Setup

### Option A: Use Local MediaPipe Files

1. Download MediaPipe files locally:
```bash
mkdir -p public/mediapipe
cd public/mediapipe
wget https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js
wget https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose_solution_packed_assets.data
# ... download other required files
```

2. Update the loader to use local files:
```javascript
const loadLocalMediaPipe = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/mediapipe/pose.js';
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
};
```

### Option B: Use a Different CDN

```javascript
// Add to your HTML head
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162/pose.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1620248256/camera_utils.js"></script>
```

## Solution 8: Browser-Specific Fixes

### Chrome
1. Open Developer Tools (F12)
2. Go to Network tab
3. Check "Disable cache"
4. Reload page

### Firefox
1. Open Developer Tools (F12)
2. Go to Network tab
3. Check "Disable Cache"
4. Reload page

### Safari
1. Develop → Disable Caches
2. Reload page

## Solution 9: Debug Network Issues

```javascript
// Add this to your browser console to debug
const testCDN = async (url) => {
  try {
    const response = await fetch(url);
    console.log(`${url}: ${response.status}`);
    return response.ok;
  } catch (error) {
    console.error(`${url}: ${error.message}`);
    return false;
  }
};

// Test CDN availability
testCDN('https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose_solution_packed_assets.data');
testCDN('https://unpkg.com/@mediapipe/pose/pose_solution_packed_assets.data');
```

## Solution 10: Alternative MediaPipe Versions

Try different MediaPipe versions:

```javascript
// Version 0.4 (older, more stable)
const scripts = [
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.4.1633559619/pose.js'
];

// Version 0.3 (much older)
const scripts = [
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.3.1620248256/pose.js'
];
```

## Solution 11: Environment-Specific Fixes

### Development Environment
```bash
# Clear npm cache
npm cache clean --force

# Clear browser cache
# Use hard refresh (Ctrl+Shift+R)
```

### Production Environment
```javascript
// Add error boundaries
window.addEventListener('error', (event) => {
  if (event.message.includes('mediapipe')) {
    console.error('MediaPipe error:', event);
    // Implement fallback or retry logic
  }
});
```

## Solution 12: Progressive Loading

```javascript
// Load MediaPipe progressively
const loadMediaPipeProgressive = async () => {
  try {
    // First try the main script
    await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js');
    
    // Wait for initialization
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check if Pose is available
    if (typeof window.Pose === 'undefined') {
      throw new Error('Pose not available');
    }
    
    return true;
  } catch (error) {
    console.warn('Primary loading failed, trying fallback...');
    
    // Try fallback
    try {
      await loadScript('https://unpkg.com/@mediapipe/pose/pose.js');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (typeof window.Pose === 'undefined') {
        throw new Error('Fallback also failed');
      }
      
      return true;
    } catch (fallbackError) {
      throw new Error('All loading attempts failed');
    }
  }
};
```

## Solution 13: Check Console for Specific Errors

Look for these specific error patterns:

```javascript
// Error: Network request failed
// Solution: Check internet connection

// Error: CORS policy
// Solution: Use HTTPS or configure CORS

// Error: 404 Not Found
// Solution: CDN file not available, try different version

// Error: Timeout
// Solution: Increase timeout or try different CDN
```

## Solution 14: Emergency Fallback

If all else fails, create a simple fallback:

```javascript
// Emergency fallback - show instructions without detection
const EmergencyFallback = () => {
  return (
    <div>
      <h2>MediaPipe Loading Failed</h2>
      <p>Please try:</p>
      <ul>
        <li>Refreshing the page</li>
        <li>Using a different browser</li>
        <li>Checking your internet connection</li>
        <li>Disabling browser extensions</li>
      </ul>
      <button onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );
};
```

## Prevention Strategies

### 1. Preload Critical Resources
```html
<!-- Add to your HTML head -->
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js" as="script">
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose_solution_packed_assets.data" as="fetch">
```

### 2. Implement Retry Logic
```javascript
const retryWithBackoff = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
};
```

### 3. Monitor Loading Progress
```javascript
const monitorLoading = () => {
  const startTime = performance.now();
  
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Loading timeout'));
    }, 30000); // 30 second timeout
    
    // Check if MediaPipe is loaded
    const checkLoaded = () => {
      if (typeof window.Pose !== 'undefined') {
        clearTimeout(timeout);
        const loadTime = performance.now() - startTime;
        console.log(`MediaPipe loaded in ${loadTime.toFixed(2)}ms`);
        resolve();
      } else {
        setTimeout(checkLoaded, 100);
      }
    };
    
    checkLoaded();
  });
};
```

## Summary

The most common solutions are:
1. **Clear browser cache and refresh**
2. **Check internet connection**
3. **Try different browser**
4. **Disable browser extensions**
5. **Use the updated refactored code with multiple CDN fallbacks**

The refactored code now includes multiple fallback strategies and better error handling to prevent this issue. 