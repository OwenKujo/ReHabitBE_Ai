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
  const [isHolding, setIsHolding] = useState(false); // Track if currently holding correct pose
  const [challengeCountdown, setChallengeCountdown] = useState(10); // Challenge phase countdown
  const [incorrectTime, setIncorrectTime] = useState(0); // Total incorrect seconds during challenge

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "camera" }).then((result) => {
        setPermissionState(result.state);
        result.onchange = () => setPermissionState(result.state);
      });
    }
  }, []);

  useEffect(() => {
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
  }, [permissionState]);

  const initializePose = async () => {
    try {
      setIsLoading(true);
      setError(null);

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
      setError(`Failed to initialize pose detection: ${err.message}`);
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

  // Calculate angle between three points (same as your Python function)
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

  // Convert radians to degrees
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
    
    // Flip the image horizontally for mirror effect
    canvasCtx.scale(-1, 1);
    canvasCtx.translate(-width, 0);
    
    // Draw the flipped image
    canvasCtx.drawImage(results.image, 0, 0, width, height);
    
    // Flip back for drawing annotations
    canvasCtx.scale(-1, 1);
    canvasCtx.translate(-width, 0);

    if (results.poseLandmarks) {
      const landmarks = results.poseLandmarks;
      
      // Get arm landmarks (converting normalized coordinates to pixel coordinates)
      const rightShoulder = { x: (1 - landmarks[12].x) * width, y: landmarks[12].y * height }; // Flip x
      const rightElbow = { x: (1 - landmarks[14].x) * width, y: landmarks[14].y * height };
      const rightWrist = { x: (1 - landmarks[16].x) * width, y: landmarks[16].y * height };
      
      const leftShoulder = { x: (1 - landmarks[11].x) * width, y: landmarks[11].y * height };
      const leftElbow = { x: (1 - landmarks[13].x) * width, y: landmarks[13].y * height };
      const leftWrist = { x: (1 - landmarks[15].x) * width, y: landmarks[15].y * height };

    //   // Draw right arm (blue points, yellow lines)
    //   canvasCtx.strokeStyle = "#00FFFF";
    //   canvasCtx.lineWidth = 2;
    //   canvasCtx.beginPath();
    //   canvasCtx.moveTo(rightShoulder.x, rightShoulder.y);
    //   canvasCtx.lineTo(rightElbow.x, rightElbow.y);
    //   canvasCtx.lineTo(rightWrist.x, rightWrist.y);
    //   canvasCtx.stroke();

    //   // Draw right arm points
    //   canvasCtx.fillStyle = "#FF0000";
    //   [rightShoulder, rightElbow, rightWrist].forEach(point => {
    //     canvasCtx.beginPath();
    //     canvasCtx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
    //     canvasCtx.fill();
    //   });

    //   // Draw left arm (red points, cyan lines)
    //   canvasCtx.strokeStyle = "#FFFF00";
    //   canvasCtx.lineWidth = 2;
    //   canvasCtx.beginPath();
    //   canvasCtx.moveTo(leftShoulder.x, leftShoulder.y);
    //   canvasCtx.lineTo(leftElbow.x, leftElbow.y);
    //   canvasCtx.lineTo(leftWrist.x, leftWrist.y);
    //   canvasCtx.stroke();

    //   // Draw left arm points
    //   canvasCtx.fillStyle = "#0000FF";
    //   [leftShoulder, leftElbow, leftWrist].forEach(point => {
    //     canvasCtx.beginPath();
    //     canvasCtx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
    //     canvasCtx.fill();
    //   });

      // Calculate angles using normalized coordinates (same as Python)
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

      // Update state
      setAngles({ left: leftAngle, right: rightAngle });

      // Draw angle text
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

      // Check if angles are in correct range and provide feedback
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

      // Draw feedback
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
    setChallengeTime(60);
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
    setChallengeCountdown(60);
    setIncorrectTime(0);
  };

  // Timer effect for challenge countdown (always runs during challenge phase)
  useEffect(() => {
    if (phase === "challenge" && challengeCountdown > 0 && heldTime < 60) { // challengeCountdown is the countdown for the challenge
      const interval = setInterval(() => {
        setChallengeCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, challengeCountdown, heldTime]);

  // Timer effect for counting held time only when isHolding is true and phase is challenge
  useEffect(() => {
    if (phase === "challenge" && isHolding && heldTime < 60 && challengeCountdown > 0) {
      const interval = setInterval(() => {
        setHeldTime((prev) => {
          if (prev >= 59) { // will become 10
            clearInterval(interval);
            // Inline stopChallenge(true):
            setPhase("finished");
            setFinalMessage(
              `Success! You held the correct pose for 60 seconds.\nTotal incorrect time: ${incorrectTime} second${incorrectTime === 1 ? '' : 's'}.`
            );
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, isHolding, heldTime, challengeCountdown]);

  // Timer effect for counting incorrect time during challenge
  useEffect(() => {
    let interval;
    if (phase === "challenge" && !isHolding && challengeCountdown > 0 && heldTime < 60) {
      interval = setInterval(() => {
        setIncorrectTime((prev) => prev + 1);
        console.log("Incorrect time: ", incorrectTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, isHolding, challengeCountdown, heldTime]);


  useEffect(() => {
    if (phase === "challenge" && challengeCountdown === 0 && heldTime < 60) {
      // Inline stopChallenge(false):
      setPhase("finished");
      setFinalMessage(
        `Time's up! You held the correct pose for ${heldTime} second${heldTime === 1 ? '' : 's'} out of 60 seconds.\nTotal incorrect time: ${incorrectTime} second${incorrectTime === 1 ? '' : 's'}.`
      );
    }
  }, [phase, challengeCountdown, heldTime]);

  

  useEffect(() => {
    // Cleanup intervals on unmount
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(challengeIntervalRef.current);
    };
  }, []);

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
            Start
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
      
      {/* Angle Display Panel */}
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
        <p>• Red dots = Right arm, Blue dots = Left arm</p>
        <p>• Yellow lines = Left arm connections, Cyan lines = Right arm connections</p>
        <p>• The system will show "Correct" when your right arm is in the target range</p>
      </div>
    </div>
  );
}

export default PoseAngleDetector;