import React, { useRef, useEffect, useState } from "react";

function PoseAngleDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);
  const [permissionState, setPermissionState] = useState("unknown");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [angles, setAngles] = useState({ left: null, right: null });
  const [feedback, setFeedback] = useState("");
  const [phase, setPhase] = useState("idle"); // idle, countdown, challenge, finished
  const [countdown, setCountdown] = useState(10);
  const [challengeTime, setChallengeTime] = useState(10);
  const [heldTime, setHeldTime] = useState(0);
  const intervalRef = useRef(null);
  const challengeIntervalRef = useRef(null);
  const [finalMessage, setFinalMessage] = useState("");
  const [isHolding, setIsHolding] = useState(false);
  const [challengeCountdown, setChallengeCountdown] = useState(10);
  const [incorrectTime, setIncorrectTime] = useState(0);
  const [getReadyCountdown, setGetReadyCountdown] = useState(10);
  const [mode, setMode] = useState("pose"); // 'pose' or 'face'

  // Face mesh/rep tracker refs and state
  const faceMeshRef = useRef(null);
  const holdStartTimeRef = useRef(null);
  const [repCount, setRepCount] = useState(0);
  const [holdTime, setHoldTime] = useState(0);
  const [faceStatus, setFaceStatus] = useState({ type: 'loading', message: 'Loading camera and face detection...' });
  const [faceError, setFaceError] = useState(null);
  const [facePermissionState, setFacePermissionState] = useState('prompt');
  const [faceIsLoading, setFaceIsLoading] = useState(false);

  // Face mesh logic
  const pitchThreshold = 15;
  const targetReps = 5;

  const loadMediaPipeScriptsFace = () => {
    return new Promise((resolve, reject) => {
      const scripts = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js'
      ];
      
      let loadedCount = 0;
      
      const loadScript = (src) => {
        return new Promise((resolveScript, rejectScript) => {
          // Check if script already exists
          if (document.querySelector(`script[src="${src}"]`)) {
            resolveScript();
            return;
          }
          
          const script = document.createElement('script');
          script.src = src;
          script.async = false;
          script.onload = () => resolveScript();
          script.onerror = () => rejectScript(new Error(`Failed to load ${src}`));
          document.head.appendChild(script);
        });
      };
      
      // Load scripts sequentially
      const loadSequentially = async () => {
        try {
          for (const src of scripts) {
            await loadScript(src);
            loadedCount++;
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      
      loadSequentially();
    });
  };

  const calculatePitch = (landmarks) => {
    const nose = landmarks[1];
    const chin = landmarks[152];
    const dz = nose.z - chin.z;
    const dy = nose.y - chin.y;
    const radians = Math.atan2(dz, dy);
    return radians * (180 / Math.PI);
  };

  const onFaceResults = (results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
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
            setFaceStatus({ type: 'ready', message: '🎉 Congratulations! All 5 reps completed!' });
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

  // Face mesh initialization and cleanup
  useEffect(() => {
    if (mode !== "face") return;
  
    let cancelled = false;
  
    const cleanup = () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
      if (faceMeshRef.current) {
        faceMeshRef.current.close?.();
        faceMeshRef.current = null;
      }
    };
  
    const initFaceMesh = async () => {
      setFaceIsLoading(true);
      setFaceError(null);
      setFaceStatus({ type: 'loading', message: 'Loading camera and face detection...' });
  
      cleanup();
      await new Promise(resolve => setTimeout(resolve, 100));
  
      try {
        await loadMediaPipeScriptsFace();
        
        if (!window.FaceMesh) {
          throw new Error('FaceMesh not available after loading scripts');
        }
        
        if (!videoRef.current || cancelled) {
          setFaceError('Video not ready or cancelled.');
          setFaceIsLoading(false);
          return;
        }
  
        const faceMesh = new window.FaceMesh({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });
  
        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
  
        faceMesh.onResults(onFaceResults);
        faceMeshRef.current = faceMesh;
        
        if (!window.Camera) {
          throw new Error('Camera not available after loading scripts');
        }
  
        cameraRef.current = new window.Camera(videoRef.current, {
          onFrame: async () => {
            if (faceMeshRef.current && videoRef.current) {
              await faceMeshRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });
  
        await cameraRef.current.start();
        if (!cancelled) {
          setFaceStatus({ type: 'ready', message: 'Camera ready! Start your face exercises.' });
          setFaceIsLoading(false);
        }
      } catch (err) {
        console.error("FaceMesh init error:", err);
        if (!cancelled) {
          setFaceError(`Failed to initialize MediaPipe: ${err.message}`);
          setFaceStatus({ type: 'error', message: 'Initialization failed' });
          setFaceIsLoading(false);
        }
      }
    };
  
    initFaceMesh();
  
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [mode, repCount]);

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "camera" }).then((result) => {
        setPermissionState(result.state);
        result.onchange = () => setPermissionState(result.state);
      });
    }
  }, []);

  useEffect(() => {
    if (mode !== "pose") return;
    
    if (permissionState === "denied") {
      setError("Camera permission denied. Please allow camera access and reload the page.");
      return;
    }

    if (permissionState === "granted" || permissionState === "prompt") {
      initializePose();
    }

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, [permissionState, mode]);

  const initializePose = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!videoRef.current) {
        setError('Video element not ready.');
        setIsLoading(false);
        return;
      }

      await loadMediaPipeScripts();

      poseRef.current = new window.Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });

      poseRef.current.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      poseRef.current.onResults(onResults);

      if (videoRef.current) {
        cameraRef.current = new window.Camera(videoRef.current, {
          onFrame: async () => {
            if (poseRef.current) {
              await poseRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });
        
        await cameraRef.current.start();
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('MediaPipe initialization error:', err);
      setError(`Failed to initialize MediaPipe: ${err.message}`);
      setIsLoading(false);
    }
  };

  const loadMediaPipeScripts = () => {
    return new Promise((resolve, reject) => {
      const scripts = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js'
      ];

      let loadedCount = 0;
      
      scripts.forEach(src => {
        if (document.querySelector(`script[src="${src}"]`)) {
          loadedCount++;
          if (loadedCount === scripts.length) {
            resolve();
          }
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          loadedCount++;
          if (loadedCount === scripts.length) {
            resolve();
          }
        };
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });
    });
  };

  const calculateAngle = (a, b, c) => {
    const v1 = [a.x - b.x, a.y - b.y];
    const v2 = [c.x - b.x, c.y - b.y];
    const dot = v1[0] * v2[0] + v1[1] * v2[1];
    const magV1 = Math.sqrt(v1[0] ** 2 + v1[1] ** 2);
    const magV2 = Math.sqrt(v2[0] ** 2 + v2[1] ** 2);

    if (magV1 * magV2 === 0) {
      return null;
    }

    const cosAngle = Math.max(-1.0, Math.min(1.0, dot / (magV1 * magV2)));
    return Math.degrees(Math.acos(cosAngle));
  };

  Math.degrees = (radians) => radians * (180 / Math.PI);

  function isRightArmCorrect(angle) {
    return angle !== null && angle >= 50 && angle <= 90;
  }

  function onResults(results) {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    
    const canvasCtx = canvasElement.getContext("2d");
    const { width, height } = canvasElement;
    
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, width, height);
    
    canvasCtx.scale(-1, 1);
    canvasCtx.translate(-width, 0);
    canvasCtx.drawImage(results.image, 0, 0, width, height);
    canvasCtx.scale(-1, 1);
    canvasCtx.translate(-width, 0);

    if (results.poseLandmarks) {
      const landmarks = results.poseLandmarks;
      
      const rightShoulder = { x: (1 - landmarks[12].x) * width, y: landmarks[12].y * height };
      const rightElbow = { x: (1 - landmarks[14].x) * width, y: landmarks[14].y * height };
      const rightWrist = { x: (1 - landmarks[16].x) * width, y: landmarks[16].y * height };
      
      const leftShoulder = { x: (1 - landmarks[11].x) * width, y: landmarks[11].y * height };
      const leftElbow = { x: (1 - landmarks[13].x) * width, y: landmarks[13].y * height };
      const leftWrist = { x: (1 - landmarks[15].x) * width, y: landmarks[15].y * height };

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

      setAngles({ left: leftAngle, right: rightAngle });

      canvasCtx.font = "16px Arial";
      canvasCtx.fillStyle = "#00FF00";
      
      if (rightAngle !== null) {
        canvasCtx.fillText(
          `Right: ${Math.round(rightAngle)}°`,
          rightShoulder.x - 50,
          rightShoulder.y - 20
        );
      }
      
      if (leftAngle !== null) {
        canvasCtx.fillText(
          `Left: ${Math.round(leftAngle)}°`,
          leftShoulder.x - 50,
          leftShoulder.y - 20
        );
      }

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

      if (phase === "challenge") {
        if (feedbackText === "Correct") {
          setIsHolding(true);
        } else {
          setIsHolding(false);
          setFinalMessage("Come back and hold correct!");
        }
      }
    }
    
    canvasCtx.restore();
  }

  const startCountdown = () => {
    setPhase("countdown");
    setCountdown(10);
    setChallengeTime(30);
    setHeldTime(0);
    setFinalMessage("");
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          startChallenge();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startChallenge = () => {
    setPhase("challenge");
    setHeldTime(0);
    setFinalMessage("");
    setIsHolding(true);
    setChallengeCountdown(30);
    setIncorrectTime(0);
  };

  useEffect(() => {
    if (phase === "challenge" && challengeCountdown > 0 && heldTime < 60) {
      const interval = setInterval(() => {
        setChallengeCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, challengeCountdown, heldTime]);

  useEffect(() => {
    if (phase === "challenge" && isHolding && heldTime < 60 && challengeCountdown > 0) {
      const interval = setInterval(() => {
        setHeldTime((prev) => {
          if (prev >= 29) {
            clearInterval(interval);
            setPhase("finished");
            setFinalMessage(
              `Success! You held the correct pose for 30 seconds.\nTotal incorrect time: ${incorrectTime} second${incorrectTime === 1 ? '' : 's'}.`
            );
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, isHolding, heldTime, challengeCountdown]);

  useEffect(() => {
    let interval;
    if (phase === "challenge" && !isHolding && challengeCountdown > 0 && heldTime < 30) {
      interval = setInterval(() => {
        setIncorrectTime((prev) => prev + 1);
        console.log('incorrect time:',incorrectTime)
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, isHolding, challengeCountdown, heldTime]);

  // When challenge ends, set phase to 'showfinal' and setFinalMessage
  useEffect(() => {
    if (phase === "challenge" && challengeCountdown === 0 && heldTime < 30) {
      setPhase("showfinal");
      setFinalMessage(
        `Time's up! You held the correct pose for ${heldTime} second${heldTime === 1 ? '' : 's'} out of 30 seconds.\nTotal incorrect time: ${incorrectTime} second${incorrectTime === 1 ? '' : 's'}.`
      );
    }
  }, [phase, challengeCountdown, heldTime, incorrectTime]);

  // When challenge is completed successfully, also set phase to 'showfinal' and setFinalMessage
  useEffect(() => {
    if (phase === "finished") {
      setPhase("showfinal");
      setFinalMessage(
        `Success! You held the correct pose for 30 seconds.\nTotal incorrect time: ${incorrectTime} second${incorrectTime === 1 ? '' : 's'}.`
      );
    }
  }, [phase, incorrectTime]);

  // Show final message for 5 seconds, then move to getready phase
  useEffect(() => {
    if (phase === "showfinal") {
      const timeout = setTimeout(() => {
        setPhase("getready");
        setGetReadyCountdown(10);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // In the getready countdown effect, after countdown reaches 0, switch to face mode
  useEffect(() => {
    if (phase === "getready" && getReadyCountdown > 0) {
      const interval = setInterval(() => {
        setGetReadyCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setGetReadyCountdown(0);
            setMode("face");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, getReadyCountdown]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(challengeIntervalRef.current);
    };
  }, []);

  if (mode === "face") {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Face Rep Tracker</h1>
        <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline />
        <canvas ref={canvasRef} width="640" height="480" style={{ border: "1px solid #ccc", borderRadius: "8px" }} />
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 40 }}>
          <div style={{ background: '#007bff', color: 'white', padding: 15, borderRadius: 8, textAlign: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>{repCount}</div>
            <div style={{ fontSize: 14, marginTop: 5 }}>Reps Completed / 5</div>
          </div>
          <div style={{ background: '#007bff', color: 'white', padding: 15, borderRadius: 8, textAlign: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>{holdTime.toFixed(1)}</div>
            <div style={{ fontSize: 14, marginTop: 5 }}>Hold Time (s)</div>
          </div>
        </div>
        <div style={{ marginTop: 20, padding: 15, background: '#e9ecef', borderRadius: 8, textAlign: 'center' }}>
          <p><strong>Instructions:</strong> Tilt your head back and hold for 10 seconds. Target: 5 reps.</p>
        </div>
        <div style={{ marginTop: 10, padding: 10, borderRadius: 5, textAlign: 'center', fontWeight: 'bold', backgroundColor: faceStatus.type === 'error' ? '#dc3545' : faceStatus.type === 'loading' ? '#ffc107' : '#28a745', color: faceStatus.type === 'error' ? '#fff' : faceStatus.type === 'loading' ? '#856404' : '#fff' }}>
          {faceStatus.message || faceError}
        </div>
        
        {repCount >= targetReps && (
          <button 
            onClick={() => setMode("pose")} 
            style={{ 
              marginTop: 20, 
              padding: "10px 20px", 
              fontSize: "16px", 
              backgroundColor: "#28a745", 
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Return to Pose Detection
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Pose Angle Detection - Arm Position Trainer</h1>
      
      {error && (
        <div style={{ 
          color: "red", 
          backgroundColor: "#ffebee", 
          padding: "10px", 
          borderRadius: "4px",
          margin: "10px 0"
        }}>
          {error}
        </div>
      )}
      
      {isLoading && (
        <div style={{ color: "#1976d2", margin: "10px 0" }}>
          Loading MediaPipe Pose...
        </div>
      )}
      
      <div style={{ marginBottom: "20px" }}>
        {phase === "idle" && (
          <button onClick={startCountdown} disabled={phase !== "idle" || isLoading} style={{ fontSize: "18px", padding: "10px 30px" }}>
            Start Challenge
          </button>
        )}
        {phase === "countdown" && (
          <div style={{ fontSize: "32px", color: "#1976d2", fontWeight: "bold" }}>Get Ready: {countdown}</div>
        )}
        {phase === "challenge" && (
          <div style={{ fontSize: "24px", color: feedback === "Correct" ? "#00FF00" : "#FF0000" }}>
            <div>
              Challenge Time Left: {challengeCountdown} s
            </div>
            <div>
              {feedback === "Correct"
                ? `Hold the correct pose! Time held: ${heldTime} s`
                : `Come back and hold correct! Time held: ${heldTime} s`}
            </div>
          </div>
        )}
        {phase === "finished" && (
          <div style={{ fontSize: "24px", color: finalMessage.startsWith("Success") ? "#00FF00" : "#FF0000" }}>
            {finalMessage}
            <div style={{ marginTop: 20 }}>
              <button 
                onClick={() => setMode("face")} 
                style={{ 
                  fontSize: "18px", 
                  padding: "10px 30px", 
                  backgroundColor: "#007bff", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Continue to Face Exercise
              </button>
            </div>
          </div>
        )}
        {phase === "getready" && (
          <div style={{ fontSize: "24px", color: finalMessage.startsWith("Success") ? "#00FF00" : "#FF0000" }}>
            {finalMessage}
            <div style={{ fontSize: "32px", color: "#1976d2", fontWeight: "bold", marginTop: 10 }}>
              Get Ready for Next Step: {getReadyCountdown}
            </div>
          </div>
        )}
        {phase === "showfinal" && (
          <div style={{ fontSize: "24px", color: finalMessage.startsWith("Success") ? "#00FF00" : "#FF0000" }}>
            {finalMessage}
          </div>
        )}
      </div>
      
      <div style={{ position: "relative", display: "inline-block" }}>
        <video 
          ref={videoRef} 
          style={{ display: "none" }} 
          autoPlay 
          playsInline
        />
        <canvas 
          ref={canvasRef} 
          width="640" 
          height="480"
          style={{ 
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        />
      </div>
      
      <div style={{ 
        marginTop: "20px", 
        padding: "15px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        display: "inline-block",
        minWidth: "300px"
      }}>
        <h3>Arm Angles</h3>
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "10px" }}>
          <div>
            <strong>Left Arm:</strong> {angles.left ? `${Math.round(angles.left)}°` : "N/A"}
          </div>
          <div>
            <strong>Right Arm:</strong> {angles.right ? `${Math.round(angles.right)}°` : "N/A"}
          </div>
        </div>
        <div style={{ 
          fontSize: "18px", 
          fontWeight: "bold",
          color: feedback === "Correct" ? "#00FF00" : "#FF0000"
        }}>
          Status: {feedback || "Detecting..."}
        </div>
      </div>
      
      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <p><strong>Instructions:</strong></p>
        <p>• Position your arms so the right arm angle is between 50° and 90°</p>
        <p>• Hold the correct pose for 30 seconds to complete the challenge</p>
        <p>• The system will show "Correct" when your right arm is in the target range</p>
      </div>
    </div>
  );
}

export default PoseAngleDetector;