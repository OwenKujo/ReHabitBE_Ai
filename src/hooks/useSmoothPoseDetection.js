import { useState, useEffect, useRef, useCallback } from 'react';
import { loadMediaPipeScriptsPose } from '../utils/mediaPipeLoader';
import { detectPoseSmooth, getPerformanceMetrics, resetPerformanceMetrics, getDetectionConfig } from '../utils/mediaPipeDetection';

export const useSmoothPoseDetection = (videoRef, canvasRef) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isHolding, setIsHolding] = useState(false);
  const [performance, setPerformance] = useState({ fps: 0, detectionTime: 0 });
  const poseRef = useRef(null);
  const cameraRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Optimized results handler with frame rate control
  const onResults = useCallback((results) => {
    const detectionResult = detectPoseSmooth(results, canvasRef);
    
    if (detectionResult) {
      setFeedback(detectionResult.feedback);
      setIsHolding(detectionResult.isHolding);
      
      // Update performance metrics
      const metrics = getPerformanceMetrics();
      setPerformance(metrics);
    }
  }, [canvasRef]);

  // Initialize MediaPipe with optimized settings
  const initializePose = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      resetPerformanceMetrics();

      if (!videoRef.current) {
        setError('Video element not ready.');
        setIsLoading(false);
        return;
      }

      console.log('Loading MediaPipe scripts...');
      await loadMediaPipeScriptsPose();

      if (!window.Pose) {
        throw new Error('Pose not available after loading scripts');
      }

      console.log('Creating optimized Pose instance...');
      poseRef.current = new window.Pose({
        locateFile: (file) => {
          // Use non-SIMD version for better compatibility
          if (file.includes('_simd_wasm_bin')) {
            file = file.replace('_simd_wasm_bin', '_wasm_bin');
          }
          
          // Multiple CDN sources for reliability
          const cdnSources = [
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
            `https://unpkg.com/@mediapipe/pose/${file}`,
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162/${file}`,
            `https://unpkg.com/@mediapipe/pose@0.5.1635988162/${file}`
          ];
          
          return cdnSources[0];
        },
      });

      console.log('Setting optimized Pose options...');
      const config = getDetectionConfig('pose');
      poseRef.current.setOptions(config);

      console.log('Setting Pose onResults callback...');
      poseRef.current.onResults(onResults);

      if (!window.Camera) {
        throw new Error('Camera not available after loading scripts');
      }

      if (videoRef.current) {
        console.log('Creating optimized Camera instance...');
        cameraRef.current = new window.Camera(videoRef.current, {
          onFrame: async () => {
            try {
              if (poseRef.current && videoRef.current) {
                // Use requestAnimationFrame for smooth rendering
                if (animationFrameRef.current) {
                  cancelAnimationFrame(animationFrameRef.current);
                }
                
                animationFrameRef.current = requestAnimationFrame(async () => {
                  await poseRef.current.send({ image: videoRef.current });
                });
              }
            } catch (error) {
              console.error("Error sending frame to pose:", error);
            }
          },
          width: 640,
          height: 480,
        });
        
        console.log('Starting camera...');
        await cameraRef.current.start();
        console.log('Optimized pose initialization complete!');
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('MediaPipe initialization error:', err);
      setError(`Failed to initialize MediaPipe: ${err.message}. Please try refreshing the page.`);
      setIsLoading(false);
    }
  }, [videoRef, onResults]);

  // Cleanup with proper resource management
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (cameraRef.current) {
      try {
        cameraRef.current.stop();
      } catch (e) {
        console.warn("Error stopping camera:", e);
      }
      cameraRef.current = null;
    }
    
    if (poseRef.current) {
      try {
        poseRef.current.close();
      } catch (e) {
        console.warn("Error closing pose:", e);
      }
      poseRef.current = null;
    }
    
    resetPerformanceMetrics();
  }, []);

  // Performance monitoring effect
  useEffect(() => {
    const performanceInterval = setInterval(() => {
      const metrics = getPerformanceMetrics();
      setPerformance(metrics);
    }, 1000);

    return () => {
      clearInterval(performanceInterval);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    isLoading,
    error,
    feedback,
    isHolding,
    performance,
    initializePose,
    cleanup
  };
}; 