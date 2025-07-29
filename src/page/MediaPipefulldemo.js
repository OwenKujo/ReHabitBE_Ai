import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from '../App';

const faceTips = [
  "Keep your head steady and avoid moving side to side.",
  "Breathe normally and don't hold your breath.",
  "Try to relax your shoulders and keep them down.",
  "Make sure the camera is at eye level for the best angle.",
  "Avoid tilting your head too far back or forward."
];

const faceTipsTH = [
  "อย่าขยับศีรษะไปมา ให้เกร็งค้างไว้เฉยๆ",
  "หายใจตามปกติ ไม่ต้องกลั้นหายใจ",
  "ผ่อนคลายไหล่และลดไหล่ลงให้มากที่สุด",
  "ปรับกล้องให้อยู่ในระดับสายตาเพื่อมุมที่ดีที่สุด",
  "หลีกเลี่ยงการเงยศีรษะหรือโน้มศีรษะไปข้างหน้ามากเกินไป"
];

function PoseAngleDetector() {
  const { lang } = useLang();
  // Browser-native Thai TTS
  function speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utter = new window.SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      // Simple language detection: if text contains Thai characters, use Thai voice
      const isThai = /[ก-๙]/.test(text);

      if (isThai) {
        const thaiVoice = voices.find(v => v.lang && v.lang.startsWith('th'));
        if (thaiVoice) utter.voice = thaiVoice;
        utter.lang = thaiVoice ? thaiVoice.lang : 'th-TH';
      } else {
        // Prefer English voice
        const enVoice = voices.find(v => v.lang && v.lang.startsWith('en'));
        if (enVoice) utter.voice = enVoice;
        utter.lang = enVoice ? enVoice.lang : 'en-US';
      }

      utter.rate = 0.8; // slower than default
      utter.pitch = 1;
      window.speechSynthesis.speak(utter);
    }
  }
function playBeep(frequency = 800, duration = 300, volume = 0.3) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillator for the beep tone
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Connect oscillator to gain to destination
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configure the beep
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      // Configure volume with fade out to avoid clicking
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      // Start and stop the oscillator
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
      
      // Clean up
      setTimeout(() => {
        try {
          audioContext.close();
        } catch (e) {
          console.warn("Error closing audio context:", e);
        }
      }, duration + 100);
      
    } catch (error) {
      console.warn("Could not play beep sound:", error);
      // Fallback: try to play a system beep or alert sound
      try {
        // This might work in some browsers as a fallback
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp6KFMEAVOqOPxsGIcBTWOzu/Pfy0GII++7+OYSwsUXrXo557NjSCOze+9dy0FJqZyKBwAAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp6KFMEAVOqOPxsGIcBTWOzu/Pfy0GII++7+OYSwsUXrXo557NjS');
        audio.play().catch(() => {
          // Silent fail if audio can't play
        });
      } catch (e) {
        // Silent fail for fallback too
      }
    }
  }


  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);
  const [permissionState, setPermissionState] = useState("unknown");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [phase, setPhase] = useState("idle"); // idle, countdown, challenge, rest, finished, getready, showfinal
  const [countdown, setCountdown] = useState(10);
  const [heldTime, setHeldTime] = useState(0);
  const intervalRef = useRef(null);
  const challengeIntervalRef = useRef(null);
  const [finalMessage, setFinalMessage] = useState("");
  const [isHolding, setIsHolding] = useState(false);
  const [challengeCountdown, setChallengeCountdown] = useState(10);
  const [incorrectTime, setIncorrectTime] = useState(0);
  const [getReadyCountdown, setGetReadyCountdown] = useState(10);
  const [mode, setMode] = useState("pose"); // 'pose' or 'face'
  
  // New state for sets
  const [currentSet, setCurrentSet] = useState(1);
  const [restCountdown, setRestCountdown] = useState(5);
  const totalSets = 5;
  const holdTimePerSet = 10;
  const restTimePerSet = 5;
  // Track total correct/incorrect time
  const [totalCorrectTime, setTotalCorrectTime] = useState(0);
  const [totalIncorrectTime, setTotalIncorrectTime] = useState(0);

  // Face mesh/rep tracker refs and state
  const faceMeshRef = useRef(null);
  const holdStartTimeRef = useRef(null);
  const [repCount, setRepCount] = useState(0);
  const [holdTime, setHoldTime] = useState(0);
  const [faceStatus, setFaceStatus] = useState({ type: 'loading', message: 'Loading camera and face detection...' });
  const [faceError, setFaceError] = useState(null);
  const [showFaceSummary, setShowFaceSummary] = useState(false);
  const [poseScore, setPoseScore] = useState(null);

  // Pose rep tracker refs and state
  const [poseRepCount, setPoseRepCount] = useState(0);
  const [poseRepTimer, setPoseRepTimer] = useState(10);
  const [isPoseRepActive, setIsPoseRepActive] = useState(false);

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
    if (!landmarks || landmarks.length < 153) return 0;
    
    const nose = landmarks[1];
    const chin = landmarks[152];
    
    if (!nose || !chin) return 0;
    
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
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      ctx.restore();
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

      if (facePhase === "challenge" && pitch > pitchThreshold) {
        if (!holdStartTimeRef.current) {
          holdStartTimeRef.current = Date.now();
          playBeep(800, 300, 0.3); // Feedback beep
        }

        const elapsed = (Date.now() - holdStartTimeRef.current) / 1000;
        setHoldTime(elapsed);

        ctx.fillStyle = 'lime';
        ctx.strokeStyle = 'darkgreen';
        const holdText = `HOLD: ${elapsed.toFixed(1)}s`;
        ctx.strokeText(holdText, 10, 60);
        ctx.fillText(holdText, 10, 60);

        if (elapsed >= faceHoldTimePerSet) {
          setRepCount((prev) => prev + 1);
          holdStartTimeRef.current = null;
          setHoldTime(0);
          playBeep(1000, 500, 0.4); // Success beep
        }
      } else {
        holdStartTimeRef.current = null;
        setHoldTime(0);
        
        if (facePhase === "challenge") {
          ctx.fillStyle = 'yellow';
          ctx.strokeStyle = 'orange';
          ctx.strokeText('Tilt head back to start', 10, 60);
          ctx.fillText('Tilt head back to start', 10, 60);
        }
      }

      // Draw set progress
      if (facePhase !== "idle") {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.strokeText(`Set ${faceCurrentSet}/${faceTotalSets}`, canvas.width - 100, 30);
        ctx.fillText(`Set ${faceCurrentSet}/${faceTotalSets}`, canvas.width - 100, 30);
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
  
    const initFaceMesh = async () => {
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
          setFaceStatus({ type: 'error', message: 'Initialization failed' });
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
            try {
              if (faceMeshRef.current && videoRef.current && !cancelled) {
                await faceMeshRef.current.send({ image: videoRef.current });
              }
            } catch (error) {
              console.error("Error sending frame to face mesh:", error);
            }
          },
          width: 640,
          height: 480,
        });
  
        await cameraRef.current.start();
        if (!cancelled) {
          setFaceStatus({ type: 'ready', message: 'Camera ready! Start your face exercises.' });
        }
      } catch (err) {
        console.error("FaceMesh init error:", err);
        if (!cancelled) {
          setFaceError(`Failed to initialize MediaPipe: ${err.message}`);
          setFaceStatus({ type: 'error', message: 'Initialization failed' });
        }
      }
    };
  
    initFaceMesh();
  
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [mode]);

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
        try {
        cameraRef.current.stop();
        } catch (e) {
          console.warn("Error stopping camera:", e);
        }
      }
      if (poseRef.current) {
        try {
        poseRef.current.close();
        } catch (e) {
          console.warn("Error closing pose:", e);
        }
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

      if (!window.Pose) {
        throw new Error('Pose not available after loading scripts');
      }

      poseRef.current = new window.Pose({
        locateFile: (file) => {
          // Use non-SIMD version for better compatibility
          if (file.includes('_simd_wasm_bin')) {
            file = file.replace('_simd_wasm_bin', '_wasm_bin');
          }
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });

      poseRef.current.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        staticImageMode: false,
      });

      poseRef.current.onResults(onResults);

      if (!window.Camera) {
        throw new Error('Camera not available after loading scripts');
      }

      if (videoRef.current) {
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
      
      // Load scripts sequentially for better reliability
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

  const calculateAngle = (a, b, c) => {
    if (!a || !b || !c) return null;
    
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
  }

  const startCountdown = () => {  //1
    setPhase("countdown");
    setCountdown(10);
    setCurrentSet(1);
    setHeldTime(0);
    setFinalMessage("");
    setIncorrectTime(0);
    
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
    playBeep(800,1000,0.4)
    setFinalMessage("");
    setIsHolding(false);
    setChallengeCountdown(holdTimePerSet);
    setIncorrectTime(0);
  };

  const startRest = () => {
    setPhase("rest");
    setRestCountdown(restTimePerSet);
    setHeldTime(0);
    setIsHolding(false);
  };

  // Challenge countdown effect
  useEffect(() => {
    if (phase === "challenge" && challengeCountdown > 0 && heldTime < holdTimePerSet) {
      const interval = setInterval(() => {
        setChallengeCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, challengeCountdown, heldTime]);

  // Hold time tracking effect
  useEffect(() => {
    if (phase === "challenge" && isHolding && heldTime < holdTimePerSet && challengeCountdown > 0) {
      const interval = setInterval(() => {
        setHeldTime((prev) => {
          if (prev >= holdTimePerSet - 1) {
            clearInterval(interval);
            // Add to totals
            setTotalCorrectTime((t) => t + holdTimePerSet);
            setTotalIncorrectTime((t) => t + incorrectTime);
            if (currentSet < totalSets) {
              setCurrentSet(currentSet + 1);
              startRest();
            } else {
            setPhase("finished");
              setFinalMessage(`Congratulations! You completed all ${totalSets} sets!`);
            }
            return holdTimePerSet;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, isHolding, heldTime, challengeCountdown, currentSet, incorrectTime]);

  // Incorrect time tracking effect
  useEffect(() => {
    let interval;
    if (phase === "challenge" && !isHolding && challengeCountdown > 0 && heldTime < holdTimePerSet) {
      interval = setInterval(() => {
        setIncorrectTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, isHolding, challengeCountdown, heldTime]);

  // Rest countdown effect
  useEffect(() => {
    if (phase === "rest" && restCountdown > 0) {
      const interval = setInterval(() => {
        setRestCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            startChallenge();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, restCountdown]);

  // When challenge ends without completing the set
  useEffect(() => {
    if (phase === "challenge" && challengeCountdown === 0 && heldTime < holdTimePerSet) {
      // Add to totals (partial correct time)
      setTotalCorrectTime((t) => t + heldTime);
      setTotalIncorrectTime((t) => t + incorrectTime);
      if (currentSet < totalSets) {
        setCurrentSet(currentSet + 1);
        startRest();
      } else {
      setPhase("finished");
        setFinalMessage(`Congratulations! You completed all ${totalSets} sets!`);
      }
    }
  }, [phase, challengeCountdown, heldTime, currentSet, incorrectTime]);

  // When finished, just set the phase and summary
  useEffect(() => {
    if (phase === "finished") {
      const maxCorrect = totalSets * holdTimePerSet;
      const score = Math.round((totalCorrectTime / maxCorrect) * 10);
      const summaryText = lang === 'th'
        ? `เวลาท่าถูกต้องทั้งหมด: ${totalCorrectTime} วินาที\nคะแนน: ${score} เต็ม10`
        : `Total correct time: ${totalCorrectTime} seconds\nScore: ${score} out of 10`;
      setPhase("showfinal");
      setFinalMessage(summaryText);
      setPoseScore(score);
    }
  }, [phase, totalCorrectTime, totalIncorrectTime, lang]);

  // When showfinal phase is active, speak the summary
  useEffect(() => {
    if (phase === "showfinal" && finalMessage) {
      speak(finalMessage);
    }
  }, [phase, finalMessage]);

  // Show final message for 5 seconds, then move to getready phase
  useEffect(() => {
    if (phase === "showfinal") {
      const timeout = setTimeout(() => {
        setPhase("getready");
        setGetReadyCountdown(10);
      }, 10000);
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
            playBeep(800,1000,0.4)
            setMode("face");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, getReadyCountdown]);

  // New state variables for face exercise
  const [faceTip, setFaceTip] = useState(faceTips[0]);
  const [facePhase, setFacePhase] = useState("idle");
  const [faceCurrentSet, setFaceCurrentSet] = useState(1);
  const [faceRestCountdown, setFaceRestCountdown] = useState(5);
  const [faceChallengeCountdown, setFaceChallengeCountdown] = useState(10);
  const faceTotalSets = 5;
  const faceHoldTimePerSet = 10;
  const faceRestTimePerSet = 5;

  // New functions for face exercise control
  const startFaceExercise = () => {
    setFacePhase("countdown");
    setFaceCurrentSet(1);
    setCountdown(5);
    setHoldTime(0);
    setRepCount(0);
    playBeep(800, 1000, 0.4);
    
    // Start countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startFaceChallenge();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startFaceChallenge = () => {
    setFacePhase("challenge");
    setFaceChallengeCountdown(faceHoldTimePerSet);
    setHoldTime(0);
    playBeep(800, 300, 0.3);
    
    // Start challenge timer
    const challengeInterval = setInterval(() => {
      setFaceChallengeCountdown(prev => {
        if (prev <= 1) {
          clearInterval(challengeInterval);
          if (faceCurrentSet < faceTotalSets) {
            startFaceRest();
          } else {
            finishFaceExercise();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startFaceRest = () => {
    setFacePhase("rest");
    setFaceRestCountdown(faceRestTimePerSet);
    playBeep(600, 500, 0.3);
    
    // Start rest timer
    const restInterval = setInterval(() => {
      setFaceRestCountdown(prev => {
        if (prev <= 1) {
          clearInterval(restInterval);
          setFaceCurrentSet(prev => prev + 1);
          startFaceChallenge();
          return faceRestTimePerSet;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finishFaceExercise = () => {
    setFacePhase("finished");
    const score = Math.min(10, Math.round((repCount / faceTotalSets) * 10));
    setPoseScore(score);
    setShowFaceSummary(true);
  };

  // Update the face mode return statement to include phases
  if (mode === "face") {
    if (showFaceSummary) {
      const totalScore = (poseScore || 0) + (repCount * 2); // Simplified score calculation
      return (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{
            margin: "0 auto",
            maxWidth: 480,
            background: "#f5f5f5",
            borderRadius: 12,
            padding: 32,
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            fontSize: 20
          }}>
            <div style={{ fontSize: 28, color: "#00CC00", fontWeight: "bold", marginBottom: 18 }}>
              🎉 Rehabilitation Complete!
            </div>
            <div style={{ fontSize: 22, color: "#1976d2", marginBottom: 12 }}>
              Pose Score: <b>{poseScore !== null ? poseScore : '-'}</b> / 10
            </div>
            <div style={{ fontSize: 22, color: "#1976d2", marginBottom: 12 }}>
              Face Score: <b>{repCount * 2}</b> / 10
            </div>
            <div style={{ fontSize: 24, color: "#ff9800", fontWeight: "bold", marginBottom: 20 }}>
              Total Score: <b>{totalScore}</b> / 20
            </div>
            <button
              onClick={() => navigate('/physicaltherapy')}
              style={{
                marginTop: 10,
                padding: "12px 32px",
                fontSize: "18px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Return to  PhysicalTherapy
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Face Exercise</h1>
        <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline />
        <canvas ref={canvasRef} width="640" height="480" style={{ border: "1px solid #ccc", borderRadius: "8px" }} />
        
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 40 }}>
          <div style={{ background: '#007bff', color: 'white', padding: 15, borderRadius: 8, textAlign: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>
              {faceCurrentSet} / {faceTotalSets}
            </div>
            <div style={{ fontSize: 14, marginTop: 5 }}>Current Set</div>
          </div>
          <div style={{ background: '#007bff', color: 'white', padding: 15, borderRadius: 8, textAlign: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>{holdTime.toFixed(1)}</div>
            <div style={{ fontSize: 14, marginTop: 5 }}>Hold Time (s)</div>
          </div>
        </div>

        <div style={{ marginTop: 20, padding: 15, background: '#e9ecef', borderRadius: 8, textAlign: 'center' }}>
          {facePhase === "idle" && (
            <>
              <p><strong>{lang === 'th' ? 'คำแนะนำ' : 'Instructions'}:</strong> {lang === 'th' ? 'เงยศีรษะไปด้านหลังและค้างไว้ 10 วินาที ทำ 5 ครั้ง' : 'Tilt your head back and hold for 10 seconds. Complete 5 sets.'}</p>
              <button 
                onClick={startFaceExercise}
                style={{
                  marginTop: 10,
                  padding: "12px 32px",
                  fontSize: "18px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                {lang === 'th' ? 'เริ่มการฝึก' : 'Start Exercise'}
              </button>
            </>
          )}
          
          {facePhase === "countdown" && (
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#007bff' }}>
              {lang === 'th' ? `เตรียมพร้อม! เริ่มใน ${countdown}วิ` : `Get Ready! Starting in ${countdown}s`}
            </div>
          )}
          
          {facePhase === "challenge" && (
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#28a745' }}>
              {lang === 'th' ? `ค้างท่า: ${faceChallengeCountdown}วิ` : `Hold Position: ${faceChallengeCountdown}s`}
            </div>
          )}
          
          {facePhase === "rest" && (
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#ffc107' }}>
              {lang === 'th' ? `พัก: ${faceRestCountdown}วิ` : `Rest Time: ${faceRestCountdown}s`}
              <div style={{ fontSize: 18, marginTop: 10 }}>
                {lang === 'th' ? `ถัดไป: ครั้งที่ ${faceCurrentSet + 1}` : `Next: Set ${faceCurrentSet + 1}`}
              </div>
            </div>
          )}
        </div>

        {facePhase === "challenge" && holdTime === 0 && (
          <div style={{ color: '#ff9800', fontSize: 16, marginTop: 10 }}>
            {faceTip}
          </div>
        )}
      </div>
    );
  }

  return lang === 'en' ? (
    <div className="mpfull-root">
      <style>{`
        .mpfull-root {
          min-height: 100vh;
          background: #eaf6fd;
          font-family: 'Kanit', 'Prompt', Arial, sans-serif;
          position: relative;
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
        .mpfull-horizontal {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          gap: 32px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .mpfull-vertical {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .mpfull-video-panel {
          flex: 1 1 640px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 320px;
          max-width: 700px;
        }
        .mpfull-control-panel {
          flex: 1 1 320px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 16px 0 rgba(30,136,229,0.08);
          padding: 32px 24px;
          max-width: 400px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mpfull-title {
          font-size: 28px;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 18px;
        }
        .mpfull-canvas {
          border: 1px solid #ccc;
          border-radius: 8px;
          max-width: 100%;
          height: auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        @media (max-width: 900px) {
          .mpfull-horizontal {
            flex-direction: column;
            gap: 0;
          }
          .mpfull-control-panel {
            max-width: 98vw;
            padding: 16px 4px;
          }
          .mpfull-title {
            font-size: 18px;
          }
        }
        @media (max-width: 600px) {
          .mpfull-control-panel {
            padding: 8px 2px;
          }
          .mpfull-title {
            font-size: 14px;
          }
        }
        .mpfull-content-wrapper {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
      `}</style>
      <div className="mpfull-content-wrapper">
        <div className={window.innerWidth > 900 ? 'mpfull-horizontal' : 'mpfull-vertical'}>
          <div className="mpfull-video-panel" style={{ marginTop: 50, paddingTop: 0 }}>
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
              className="mpfull-canvas"
            />
          </div>
          <div className="mpfull-control-panel" style={{ marginTop: 50, paddingTop: 0 }}>
            {/* Place all control/status UI here, e.g. phase, feedback, buttons, stats, etc. */}
            <h1 className="mpfull-title">OfficeSyndrome Rehabilitation</h1>
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
                <>
                  <button onClick={startCountdown} disabled={phase !== "idle" || isLoading} style={{ fontSize: "18px", padding: "10px 30px" }}>
                    {lang === 'th' ? 'เริ่มฟื้นฟู' : 'Start Rehabilitation'}
                  </button>
                  <div style={{
                    marginTop: 16,
                    background: '#fffbe7',
                    color: '#b45309',
                    border: '1px solid #fde68a',
                    borderRadius: 8,
                    padding: '16px 20px',
                    fontSize: 16,
                    fontWeight: 500,
                    maxWidth: 480,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    boxShadow: '0 2px 8px rgba(251,191,36,0.08)'
                  }}>
                    <div>{lang === 'th' ? '1. ปรับมุมกล้องให้เห็นครึ่งตัวด้านบน และแสงในห้องพอดี' : '1. Adjust the camera to see your upper body and ensure good lighting.'}</div>
                    <div>{lang === 'th' ? '2. ปรับมุมการนั่งเป็นแนวข้าง ให้แขนขวาของคุณเข้าหากล้อง' : '2. Sit sideways so your right arm faces the camera.'}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12 }}>
                    <img src="/1.1.jpg" alt="ตัวอย่างท่าทาง" style={{ maxWidth: 320, width: '100%', borderRadius: 12, border: '2px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />
                    <div style={{ fontSize: 14, color: '#555', marginTop: 8 }}>{lang === 'th' ? 'ตัวอย่างท่าทางที่ถูกต้อง' : 'Example of correct posture'}</div>
                  </div>
                </>
              )}
              {["countdown", "challenge", "rest", "finished", "getready", "showfinal"].includes(phase) && (
                <div style={{
                  margin: "16px auto 0 auto",
                  maxWidth: 640,
                  background: "#f5f5f5",
                  borderRadius: 8,
                  padding: 20,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  fontSize: 18,
                  color: feedback === "Correct" ? "#00CC00" : "#FF0000"
                }}>
                  {/* ...existing phase/feedback UI... */}
                  {phase === "countdown" && (
                    <>
                      <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>{lang === 'th' ? 'เตรียมตัว' : 'Get Ready'}</div>
                      <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>Countdown: {countdown} s</div>
                    </>
                  )}
                  {phase === "challenge" && (
                    <>
                      <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>Set {currentSet} / {totalSets}</div>
                      <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>Countdown: {challengeCountdown} s</div>
                      <div style={{ marginBottom: 8 }}>{feedback === "Correct" ? (lang === 'th' ? 'ถูกต้อง! ค้างท่าไว้' : 'Great! Keep holding the correct pose!') : (lang === 'th' ? 'ปรับท่าให้ถูกต้อง' : 'Adjust your pose to the correct position!')}</div>
                      {feedback === "Incorrect" && (
                        <div style={{ color: "#ff9800", fontSize: 16, marginTop: 8 }}>
                          Tip: {(lang === 'th' ? faceTipsTH : faceTips)[currentSet % faceTips.length]}
                        </div>
                      )}
                    </>
                  )}
                  {phase === "rest" && (
                    <>
                      <div style={{ fontSize: 20, color: "#FFA500", fontWeight: "bold", marginBottom: 8 }}>{lang === 'th' ? 'เวลาพัก' : 'Rest Time'}: {restCountdown} s</div>
                      <div style={{ marginBottom: 8 }}>{lang === 'th' ? 'ถัดไป: เซ็ต' : 'Next: Set'} {currentSet} / {totalSets}</div>
                    </>
                  )}
                  {phase === "finished" && (
                    <>
                      <div style={{ fontSize: 20, color: "#00FF00", fontWeight: "bold", marginBottom: 8 }}>{lang === 'th' ? 'ครบทุกเซ็ต!' : 'All Sets Complete!'}</div>
                      <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>{lang === 'th' ? 'ดูผลการทดสอบด้านล่าง' : 'See your results below.'}</div>
                    </>
                  )}
                  {phase === "getready" && (
                    <>
                      <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>{lang === 'th' ? 'เตรียมตัวสำหรับขั้นตอนถัดไป' : 'Get Ready for Next Step'}</div>
                      <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>Countdown: {getReadyCountdown} s</div>
                    </>
                  )}
                  {phase === "showfinal" && (
                    <>
                      <div style={{ fontSize: 20, color: "#00FF00", fontWeight: "bold", marginBottom: 8 }}>{lang === 'th' ? 'สรุป' : 'Summary'}</div>
                      <div style={{ fontSize: 18, color: "#333", marginBottom: 8, whiteSpace: "pre-line" }}>
                        {finalMessage}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <button 
          onClick={() => speak('สวัสดีค่ะ นี่คือระบบแปลงข้อความเป็นเสียงภาษาไทย')}
          style={{ 
            margin: '16px 0', 
            padding: '10px 24px', 
            fontSize: 16, 
            borderRadius: 8, 
            background: '#1976d2', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          🔊 ทดสอบเสียงภาษาไทย
        </button>
      </div>
    </div>
  );
}

export default PoseAngleDetector;