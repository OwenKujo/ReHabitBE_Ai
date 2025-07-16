import React, { useEffect, useRef, useState } from 'react';

function FaceRepTracker() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const faceMeshRef = useRef(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);
  const holdStartTimeRef = useRef(null);

  const [repCount, setRepCount] = useState(0);
  const [holdTime, setHoldTime] = useState(0);
  const [status, setStatus] = useState({ type: 'loading', message: 'Checking camera permission...' });
  const [permissionState, setPermissionState] = useState('prompt');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pitchThreshold = 15;
  const targetReps = 5;

  // Check permission
  useEffect(() => {
    navigator.permissions?.query({ name: 'camera' }).then((result) => {
      setPermissionState(result.state);
      result.onchange = () => setPermissionState(result.state);
    });
  }, []);

  // Main useEffect depending on permission
  useEffect(() => {
    if (permissionState === 'denied') {
      setError('Camera permission denied. Please allow camera access and reload the page.');
      return;
    }

    if (permissionState === 'granted' || permissionState === 'prompt') {
      initializePose();
    }

    return () => {
      cameraRef.current?.stop();
      poseRef.current?.close?.();
    };
  }, [permissionState]);

  const loadMediaPipeScripts = () => {
    return new Promise((resolve, reject) => {
      const scripts = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.4.1646424915/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1646424915/face_mesh.js'
      ];
      let loadedCount = 0;
      scripts.forEach(src => {
        if (document.querySelector(`script[src="${src}"]`)) {
          loadedCount++;
          if (loadedCount === scripts.length) resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = false; // Important: preserve order!
        script.onload = () => {
          loadedCount++;
          if (loadedCount === scripts.length) resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });
    });
  };

  const initializePose = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await loadMediaPipeScripts();

      const faceMesh = new window.FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults(onResults);
      faceMeshRef.current = faceMesh;

      poseRef.current = new window.Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      poseRef.current.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      poseRef.current.onResults(() => {}); // Placeholder if needed later

      if (videoRef.current) {
        cameraRef.current = new window.Camera(videoRef.current, {
          onFrame: async () => {
            if (faceMeshRef.current) {
              await faceMeshRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });

        await cameraRef.current.start();
        setStatus({ type: 'ready', message: 'Camera ready! Start your face exercises.' });
      }

      setIsLoading(false);
    } catch (err) {
      setError(`Failed to initialize MediaPipe: ${err.message}`);
      setStatus({ type: 'error', message: 'Initialization failed' });
      setIsLoading(false);
    }
  };

  const calculatePitch = (landmarks) => {
    const nose = landmarks[1];
    const chin = landmarks[152];
    const dz = nose.z - chin.z;
    const dy = nose.y - chin.y;
    const radians = Math.atan2(dz, dy);
    return radians * (180 / Math.PI);
  };

  const onResults = (results) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.image) {
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    }

    if (results.multiFaceLandmarks?.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      const pitch = calculatePitch(landmarks);

      ctx.fillStyle = 'white';
      ctx.font = '18px Arial';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.strokeText(`Pitch: ${pitch.toFixed(2)}°`, 10, 30);
      ctx.fillText(`Pitch: ${pitch.toFixed(2)}°`, 10, 30);

      if (pitch > pitchThreshold) {
        if (!holdStartTimeRef.current) {
          holdStartTimeRef.current = Date.now();
        }

        const elapsed = (Date.now() - holdStartTimeRef.current) / 1000;
        setHoldTime(elapsed);

        ctx.fillStyle = 'lime';
        ctx.strokeStyle = 'darkgreen';
        const holdText = `HOLD: ${elapsed.toFixed(1)}s`;
        ctx.strokeText(holdText, 10, 60);
        ctx.fillText(holdText, 10, 60);

        if (elapsed >= 10 && repCount < targetReps) {
          setRepCount((prev) => prev + 1);
          holdStartTimeRef.current = null;
          setHoldTime(0);

          if (repCount + 1 >= targetReps) {
            setStatus({ type: 'ready', message: '🎉 Congratulations! All 5 reps completed!' });
          }
        }
      } else {
        holdStartTimeRef.current = null;
        setHoldTime(0);
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'orange';
        ctx.strokeText('Tilt head back to start', 10, 60);
        ctx.fillText('Tilt head back to start', 10, 60);
      }
    }

    ctx.restore();
  };

  return React.createElement('div', { style: styles.body },
    React.createElement('div', { style: styles.container }, [
      React.createElement('h1', { style: styles.h1, key: 'title' }, 'Face Rep Tracker'),
      React.createElement('div', { style: styles.videoContainer, key: 'video' }, [
        React.createElement('video', {
          ref: videoRef,
          style: { display: 'none' },
          autoPlay: true,
          playsInline: true
        }),
        React.createElement('canvas', {
          ref: canvasRef,
          width: 640,
          height: 480,
          style: styles.canvas
        })
      ]),
      React.createElement('div', { style: styles.stats, key: 'stats' }, [
        React.createElement('div', { style: styles.statBox }, [
          React.createElement('div', { style: styles.statValue }, repCount),
          React.createElement('div', { style: styles.statLabel }, 'Reps Completed / 5')
        ]),
        React.createElement('div', { style: styles.statBox }, [
          React.createElement('div', { style: styles.statValue }, holdTime.toFixed(1)),
          React.createElement('div', { style: styles.statLabel }, 'Hold Time (s)')
        ])
      ]),
      React.createElement('div', { style: styles.instructions },
        React.createElement('p', null, React.createElement('strong', null, 'Instructions:'), ' Tilt your head back and hold for 10 seconds. Target: 5 reps.')
      ),
      React.createElement('div', {
        style: { ...styles.status, ...statusStyles[status.type] }
      }, status.message || error)
    ])
  );
}

const styles = {
  body: { backgroundColor: '#f0f0f0', padding: 20, display: 'flex', justifyContent: 'center' },
  container: { background: 'white', padding: 20, borderRadius: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: 700, width: '100%' },
  h1: { textAlign: 'center', color: '#333', marginBottom: 30 },
  videoContainer: { display: 'flex', justifyContent: 'center', marginBottom: 20 },
  canvas: { border: '2px solid #333', borderRadius: 8 },
  stats: { display: 'flex', justifyContent: 'space-around', gap: 20, marginTop: 20 },
  statBox: { background: '#007bff', color: 'white', padding: 15, borderRadius: 8, textAlign: 'center', flex: 1 },
  statValue: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 14, marginTop: 5 },
  instructions: { marginTop: 20, padding: 15, background: '#e9ecef', borderRadius: 8, textAlign: 'center' },
  status: { marginTop: 10, padding: 10, borderRadius: 5, textAlign: 'center', fontWeight: 'bold' }
};

const statusStyles = {
  loading: { backgroundColor: '#ffc107', color: '#856404' },
  ready: { backgroundColor: '#28a745', color: '#fff' },
  error: { backgroundColor: '#dc3545', color: '#fff' }
};

export default FaceRepTracker;
