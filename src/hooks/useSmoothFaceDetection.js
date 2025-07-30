import { useState, useEffect, useRef, useCallback } from 'react';
import { loadMediaPipeScriptsFace } from '../utils/mediaPipeLoader';
import { detectFaceSmooth, getPerformanceMetrics, resetPerformanceMetrics, getDetectionConfig } from '../utils/mediaPipeDetection';

export const useSmoothFaceDetection = (videoRef, canvasRef) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("#FF0000");
  const [isHolding, setIsHolding] = useState(false);
  const [performance, setPerformance] = useState({ fps: 0, detectionTime: 0 });
  const faceMeshRef = useRef(null);
  const cameraRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Optimized results handler with frame rate control
  const onResults = useCallback((results) => {
    const detectionResult = detectFaceSmooth(results, canvasRef);
    
    if (detectionResult) {
      setFeedback(detectionResult.feedback);
      setFeedbackColor(detectionResult.feedbackColor);
      setIsHolding(detectionResult.isHolding);
      
      // Update performance metrics
      const metrics = getPerformanceMetrics();
      setPerformance(metrics);
    }
  }, [canvasRef]);

  // Initialize MediaPipe with optimized settings
  const initializeFaceMesh = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      resetPerformanceMetrics();

      if (!videoRef.current) {
        setError('Video element not ready.');
        setIsLoading(false);
        return;
      }

      console.log('Loading MediaPipe Face Mesh scripts...');
      await loadMediaPipeScriptsFace();
      
      if (!window.FaceMesh) {
        throw new Error('FaceMesh not available after loading scripts');
      }
      
      console.log('Creating optimized FaceMesh instance...');
      faceMeshRef.current = new window.FaceMesh({
        locateFile: (file) => {
          // Multiple CDN sources for reliability
          const cdnSources = [
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
            `https://unpkg.com/@mediapipe/face_mesh/${file}`,
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`,
            `https://unpkg.com/@mediapipe/face_mesh@0.4.1633559619/${file}`
          ];
          
          return cdnSources[0];
        },
      });

      console.log('Setting optimized FaceMesh options...');
      const config = getDetectionConfig('face');
      faceMeshRef.current.setOptions(config);

      console.log('Setting FaceMesh onResults callback...');
      faceMeshRef.current.onResults(onResults);
      
      if (!window.Camera) {
        throw new Error('Camera not available after loading scripts');
      }

      console.log('Creating optimized Camera instance...');
      cameraRef.current = new window.Camera(videoRef.current, {
        onFrame: async () => {
          try {
            if (faceMeshRef.current && videoRef.current) {
              // Use requestAnimationFrame for smooth rendering
              if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
              }
              
              animationFrameRef.current = requestAnimationFrame(async () => {
                await faceMeshRef.current.send({ image: videoRef.current });
              });
            }
          } catch (error) {
            console.error("Error sending frame to face mesh:", error);
          }
        },
        width: 640,
        height: 480,
      });

      console.log('Starting camera...');
      await cameraRef.current.start();
      console.log('Optimized face mesh initialization complete!');
      setIsLoading(false);
    } catch (err) {
      console.error("FaceMesh init error:", err);
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
    
    if (faceMeshRef.current) {
      try {
        faceMeshRef.current.close?.();
      } catch (e) {
        console.warn("Error closing face mesh:", e);
      }
      faceMeshRef.current = null;
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
    feedbackColor,
    isHolding,
    performance,
    initializeFaceMesh,
    cleanup
  };
}; 