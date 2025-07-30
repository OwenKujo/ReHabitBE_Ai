import { useState, useEffect, useRef } from 'react';
import { loadMediaPipeScriptsFace } from '../utils/mediaPipeLoader';
import { calculatePitch, isFacePoseCorrect } from '../utils/faceUtils';

export const useFaceDetection = (videoRef, canvasRef) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("#FF0000");
  const [isHolding, setIsHolding] = useState(false);
  const faceMeshRef = useRef(null);
  const cameraRef = useRef(null);

  const onFaceResults = (results) => {
    console.log("onFaceResults called", { 
      hasImage: !!results.image, 
      hasLandmarks: !!results.multiFaceLandmarks,
      numFaces: results.multiFaceLandmarks?.length || 0
    });
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.image) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    if (results.multiFaceLandmarks?.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      
      const pitch = calculatePitch(landmarks);
      const isCorrect = isFacePoseCorrect(pitch);
      console.log('Face detection - pitch:', pitch.toFixed(2), 'isCorrect:', isCorrect);
      
      // Show pitch value on frame
      ctx.fillStyle = 'white';
      ctx.font = '18px Arial';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.strokeText(`Pitch: ${pitch.toFixed(2)}°`, 10, 30);
      ctx.fillText(`Pitch: ${pitch.toFixed(2)}°`, 10, 30);

      if (isCorrect) {
        setFeedback('Correct! Keep holding!');
        setFeedbackColor("#00FF00");
        setIsHolding(true);
        
        // Show "Correct" on frame
        ctx.fillStyle = 'lime';
        ctx.strokeStyle = 'darkgreen';
        ctx.lineWidth = 3;
        ctx.font = '24px Arial';
        ctx.strokeText('Correct', 10, 60);
        ctx.fillText('Correct', 10, 60);
      } else {
        setFeedback('Adjust your head position!');
        setFeedbackColor("#FF0000");
        setIsHolding(false);
        
        // Show "Incorrect" on frame
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'darkred';
        ctx.lineWidth = 3;
        ctx.font = '24px Arial';
        ctx.strokeText('Incorrect', 10, 60);
        ctx.fillText('Incorrect', 10, 60);
      }
    } else {
      // No face detected
      console.log('No face landmarks detected - check camera and face visibility');
      ctx.fillStyle = 'yellow';
      ctx.strokeStyle = 'orange';
      ctx.lineWidth = 2;
      ctx.font = '18px Arial';
      ctx.strokeText('No face detected - check camera', 10, 60);
      ctx.fillText('No face detected - check camera', 10, 60);
      
      setFeedback('No face detected');
      setFeedbackColor("#FF0000");
      setIsHolding(false);
    }

    ctx.restore();
  };

  const initializeFaceMesh = async () => {
    console.log('Initializing face mesh...');
    
    try {
      setIsLoading(true);
      setError(null);

      if (!videoRef.current) {
        setError('Video element not ready.');
        setIsLoading(false);
        return;
      }

      await loadMediaPipeScriptsFace();
      
      if (!window.FaceMesh) {
        throw new Error('FaceMesh not available after loading scripts');
      }
      
      console.log('Creating FaceMesh instance...');
      const faceMesh = new window.FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      console.log('Setting FaceMesh options...');
      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      console.log('Setting FaceMesh onResults callback...');
      faceMesh.onResults(onFaceResults);
      faceMeshRef.current = faceMesh;
      
      if (!window.Camera) {
        throw new Error('Camera not available after loading scripts');
      }

      console.log('Creating Camera instance...');
      cameraRef.current = new window.Camera(videoRef.current, {
        onFrame: async () => {
          try {
            if (faceMeshRef.current && videoRef.current) {
              await faceMeshRef.current.send({ image: videoRef.current });
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
      console.log('Face mesh initialization complete!');
      setIsLoading(false);
    } catch (err) {
      console.error("FaceMesh init error:", err);
      setError(`Failed to initialize MediaPipe: ${err.message}`);
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
    if (faceMeshRef.current) {
      try {
        faceMeshRef.current.close?.();
      } catch (e) {
        console.warn("Error closing face mesh:", e);
      }
      faceMeshRef.current = null;
    }
  };

  return {
    isLoading,
    error,
    feedback,
    feedbackColor,
    isHolding,
    initializeFaceMesh,
    cleanup
  };
}; 