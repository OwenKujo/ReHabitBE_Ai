// MediaPipe Detection Utilities - Optimized for smooth performance

// Frame rate control for smooth detection
let frameCount = 0;
let lastFrameTime = 0;
const targetFPS = 30;
const frameInterval = 1000 / targetFPS;

// Detection confidence thresholds
const DETECTION_CONFIG = {
  pose: {
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.6,
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    staticImageMode: false
  },
  face: {
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.6
  }
};

// Performance monitoring
const performanceMetrics = {
  fps: 0,
  detectionTime: 0,
  frameCount: 0,
  lastUpdate: 0
};

// Optimized pose angle calculation with caching
const angleCache = new Map();
const calculateAngleOptimized = (a, b, c) => {
  if (!a || !b || !c) return null;
  
  // Create cache key
  const key = `${a.x.toFixed(2)}_${a.y.toFixed(2)}_${b.x.toFixed(2)}_${b.y.toFixed(2)}_${c.x.toFixed(2)}_${c.y.toFixed(2)}`;
  
  // Check cache first
  if (angleCache.has(key)) {
    return angleCache.get(key);
  }
  
  const v1 = [a.x - b.x, a.y - b.y];
  const v2 = [c.x - b.x, c.y - b.y];
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const magV1 = Math.sqrt(v1[0] ** 2 + v1[1] ** 2);
  const magV2 = Math.sqrt(v2[0] ** 2 + v2[1] ** 2);

  if (magV1 * magV2 === 0) {
    return null;
  }

  const cosAngle = Math.max(-1.0, Math.min(1.0, dot / (magV1 * magV2)));
  const angle = Math.degrees(Math.acos(cosAngle));
  
  // Cache result (limit cache size)
  if (angleCache.size > 1000) {
    const firstKey = angleCache.keys().next().value;
    angleCache.delete(firstKey);
  }
  angleCache.set(key, angle);
  
  return angle;
};

// Optimized face pitch calculation
const calculatePitchOptimized = (landmarks) => {
  if (!landmarks || landmarks.length < 153) {
    return 0;
  }
  
  const nose = landmarks[1];
  const chin = landmarks[152];
  
  if (!nose || !chin) {
    return 0;
  }
  
  const dy = nose.y - chin.y;
  const dz = nose.z - chin.z;
  const radians = Math.atan2(dy, dz);
  const pitch = radians * (180 / Math.PI);
  
  return pitch;
};

// Smooth pose detection with frame rate control
export const detectPoseSmooth = (results, canvasRef) => {
  const currentTime = performance.now();
  
  // Frame rate control
  if (currentTime - lastFrameTime < frameInterval) {
    return null; // Skip frame for smooth performance
  }
  
  lastFrameTime = currentTime;
  frameCount++;
  
  const canvasElement = canvasRef.current;
  if (!canvasElement) return null;
  
  const canvasCtx = canvasElement.getContext("2d");
  if (!canvasCtx) return null;
  
  const { width, height } = canvasElement;
  
  try {
    // Clear canvas efficiently
    canvasCtx.clearRect(0, 0, width, height);
    
    // Draw video frame
    if (results.image) {
      canvasCtx.save();
      canvasCtx.scale(-1, 1);
      canvasCtx.translate(-width, 0);
      canvasCtx.drawImage(results.image, 0, 0, width, height);
      canvasCtx.restore();
    }

    // Process pose landmarks
    if (results.poseLandmarks && results.poseLandmarks.length >= 17) {
      const landmarks = results.poseLandmarks;
      
      // Check required landmarks
      if (!landmarks[12] || !landmarks[14] || !landmarks[16] || 
          !landmarks[11] || !landmarks[13] || !landmarks[15]) {
        return { feedback: "Incorrect", isHolding: false };
      }
      
      // Calculate angles with caching
      const rightAngle = calculateAngleOptimized(
        landmarks[14], // elbow
        landmarks[12], // shoulder
        landmarks[16]  // wrist
      );
      
      const leftAngle = calculateAngleOptimized(
        landmarks[13], // elbow
        landmarks[11], // shoulder
        landmarks[15]  // wrist
      );

      // Determine pose correctness
      let feedbackText = "";
      let feedbackColor = "#FF0000";
      let isHolding = false;
      
      if (rightAngle !== null && leftAngle !== null) {
        if (rightAngle >= 50 && rightAngle <= 90) {
          feedbackText = "Correct";
          feedbackColor = "#00FF00";
          isHolding = true;
        } else {
          feedbackText = "Incorrect";
          feedbackColor = "#FF0000";
          isHolding = false;
        }
      }

      // Draw feedback efficiently
      if (feedbackText) {
        canvasCtx.font = "24px Arial";
        canvasCtx.fillStyle = feedbackColor;
        canvasCtx.fillText(feedbackText, 50, 50);
      }
      
      // Update performance metrics
      performanceMetrics.frameCount++;
      performanceMetrics.detectionTime = performance.now() - currentTime;
      
      return { feedback: feedbackText, isHolding };
    }
  } catch (error) {
    console.error("Error in pose detection:", error);
  }
  
  return { feedback: "Incorrect", isHolding: false };
};

// Smooth face detection with frame rate control
export const detectFaceSmooth = (results, canvasRef) => {
  const currentTime = performance.now();
  
  // Frame rate control
  if (currentTime - lastFrameTime < frameInterval) {
    return null; // Skip frame for smooth performance
  }
  
  lastFrameTime = currentTime;
  frameCount++;
  
  const canvas = canvasRef.current;
  if (!canvas) return null;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  
  try {
    // Clear canvas efficiently
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw video frame
    if (results.image) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    // Process face landmarks
    if (results.multiFaceLandmarks?.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      
      const pitch = calculatePitchOptimized(landmarks);
      const isCorrect = pitch < -2; // Threshold for head tilt
      
      // Show pitch value
      ctx.fillStyle = 'white';
      ctx.font = '18px Arial';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.strokeText(`Pitch: ${pitch.toFixed(2)}°`, 10, 30);
      ctx.fillText(`Pitch: ${pitch.toFixed(2)}°`, 10, 30);

      let feedbackText = "";
      let feedbackColor = "#FF0000";
      let isHolding = false;
      
      if (isCorrect) {
        feedbackText = 'Correct! Keep holding!';
        feedbackColor = "#00FF00";
        isHolding = true;
        
        // Draw success indicator
        ctx.fillStyle = 'lime';
        ctx.strokeStyle = 'darkgreen';
        ctx.lineWidth = 3;
        ctx.font = '24px Arial';
        ctx.strokeText('Correct', 10, 60);
        ctx.fillText('Correct', 10, 60);
      } else {
        feedbackText = 'Adjust your head position!';
        feedbackColor = "#FF0000";
        isHolding = false;
        
        // Draw error indicator
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'darkred';
        ctx.lineWidth = 3;
        ctx.font = '24px Arial';
        ctx.strokeText('Incorrect', 10, 60);
        ctx.fillText('Incorrect', 10, 60);
      }
      
      // Update performance metrics
      performanceMetrics.frameCount++;
      performanceMetrics.detectionTime = performance.now() - currentTime;
      
      return { feedback: feedbackText, isHolding, feedbackColor };
    } else {
      // No face detected
      ctx.fillStyle = 'yellow';
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;
      ctx.font = '18px Arial';
      ctx.strokeText('No face detected - check camera', 10, 60);
      ctx.fillText('No face detected - check camera', 10, 60);
      
      return { feedback: 'No face detected', isHolding: false, feedbackColor: "#FF0000" };
    }
  } catch (error) {
    console.error("Error in face detection:", error);
  }
  
  return { feedback: 'Detection error', isHolding: false, feedbackColor: "#FF0000" };
};

// Performance monitoring
export const getPerformanceMetrics = () => {
  const currentTime = performance.now();
  const timeDiff = currentTime - performanceMetrics.lastUpdate;
  
  if (timeDiff >= 1000) { // Update every second
    performanceMetrics.fps = Math.round((performanceMetrics.frameCount * 1000) / timeDiff);
    performanceMetrics.frameCount = 0;
    performanceMetrics.lastUpdate = currentTime;
  }
  
  return {
    fps: performanceMetrics.fps,
    detectionTime: performanceMetrics.detectionTime,
    frameCount: frameCount
  };
};

// Reset performance metrics
export const resetPerformanceMetrics = () => {
  frameCount = 0;
  lastFrameTime = 0;
  performanceMetrics.frameCount = 0;
  performanceMetrics.lastUpdate = 0;
  angleCache.clear();
};

// Get detection configuration
export const getDetectionConfig = (type) => {
  return DETECTION_CONFIG[type] || DETECTION_CONFIG.pose;
};

// Add Math.degrees if not available
if (!Math.degrees) {
  Math.degrees = (radians) => radians * (180 / Math.PI);
} 