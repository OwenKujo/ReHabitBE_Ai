import { useState, useEffect, useRef } from 'react';
import { loadMediaPipeScriptsPose } from '../utils/mediaPipeLoader';
import { calculateAngle, isRightArmCorrect } from '../utils/poseUtils';

export const usePoseDetection = (videoRef, canvasRef) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isHolding, setIsHolding] = useState(false);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);

  const onResults = (results) => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    
    const canvasCtx = canvasElement.getContext("2d");
    if (!canvasCtx) return;
    
    const { width, height } = canvasElement;
    
    try {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, width, height);
      
      if (results.image) {
        canvasCtx.scale(-1, 1);
        canvasCtx.translate(-width, 0);
        canvasCtx.drawImage(results.image, 0, 0, width, height);
        canvasCtx.scale(-1, 1);
        canvasCtx.translate(-width, 0);
      }

      if (results.poseLandmarks && results.poseLandmarks.length >= 17) {
        const landmarks = results.poseLandmarks;
        
        // Check if required landmarks exist
        if (!landmarks[12] || !landmarks[14] || !landmarks[16] || 
            !landmarks[11] || !landmarks[13] || !landmarks[15]) {
          console.warn("Missing required landmarks");
          return;
        }
        
        const rightAngle = calculateAngle(
          landmarks[14], // elbow
          landmarks[12], // shoulder
          landmarks[16]  // wrist
        );
        
        const leftAngle = calculateAngle(
          landmarks[13], // elbow
          landmarks[11], // shoulder
          landmarks[15]  // wrist
        );

        let feedbackText = "";
        let feedbackColor = "#FF0000";
        
        if (rightAngle !== null && leftAngle !== null) {
          if (isRightArmCorrect(rightAngle)) {
            feedbackText = "Correct";
            feedbackColor = "#00FF00";
            setIsHolding(true);
          } else {
            feedbackText = "Incorrect";
            feedbackColor = "#FF0000";
            setIsHolding(false);
          }
        }

        if (feedbackText) {
          canvasCtx.font = "24px Arial";
          canvasCtx.fillStyle = feedbackColor;
          canvasCtx.fillText(feedbackText, 50, 50);
        }
        
        setFeedback(feedbackText);
      }
    } catch (error) {
      console.error("Error in onResults:", error);
    } finally {
      canvasCtx.restore();
    }
  };

  const initializePose = async () => {
    try {
      setIsLoading(true);
      setError(null);

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

      console.log('Creating Pose instance...');
      poseRef.current = new window.Pose({
        locateFile: (file) => {
          // Use non-SIMD version for better compatibility
          if (file.includes('_simd_wasm_bin')) {
            file = file.replace('_simd_wasm_bin', '_wasm_bin');
          }
          
          // Try multiple CDN sources for asset files
          const cdnSources = [
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
            `https://unpkg.com/@mediapipe/pose/${file}`,
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162/${file}`,
            `https://unpkg.com/@mediapipe/pose@0.5.1635988162/${file}`
          ];
          
          // Return the first available source
          return cdnSources[0];
        },
      });

      console.log('Setting Pose options...');
      poseRef.current.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        staticImageMode: false,
      });

      console.log('Setting Pose onResults callback...');
      poseRef.current.onResults(onResults);

      if (!window.Camera) {
        throw new Error('Camera not available after loading scripts');
      }

      if (videoRef.current) {
        console.log('Creating Camera instance...');
        cameraRef.current = new window.Camera(videoRef.current, {
          onFrame: async () => {
            try {
              if (poseRef.current && videoRef.current) {
                await poseRef.current.send({ image: videoRef.current });
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
        console.log('Pose initialization complete!');
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('MediaPipe initialization error:', err);
      setError(`Failed to initialize MediaPipe: ${err.message}. Please try refreshing the page.`);
      setIsLoading(false);
    }
  };

  const cleanup = () => {
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
  };

  return {
    isLoading,
    error,
    feedback,
    isHolding,
    initializePose,
    cleanup
  };
}; 