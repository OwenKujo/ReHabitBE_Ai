import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from '../LangContext';
import { usePoseDetection } from '../hooks/usePoseDetection';
import { useFaceDetection } from '../hooks/useFaceDetection';
import { useRehabilitationSession } from '../hooks/useRehabilitationSession';
import { speak, playBeep } from '../utils/audioUtils';
import PoseRehabilitationUI from '../components/PoseRehabilitationUI';
import FaceRehabilitationUI from '../components/FaceRehabilitationUI';

function PoseAngleDetector() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [permissionState, setPermissionState] = useState("unknown");
  const [mode, setMode] = useState("pose"); // 'pose' or 'face'

  // Pose detection hook
  const {
    isLoading: poseLoading,
    error: poseError,
    feedback: poseFeedback,
    isHolding: poseIsHolding,
    initializePose,
    cleanup: poseCleanup
  } = usePoseDetection(videoRef, canvasRef);

  // Face detection hook
  const {
    isLoading: faceLoading,
    error: faceError,
    feedback: faceFeedback,
    feedbackColor: faceFeedbackColor,
    isHolding: faceIsHolding,
    initializeFaceMesh,
    cleanup: faceCleanup
  } = useFaceDetection(videoRef, canvasRef);

  // Rehabilitation session hook
  const {
    phase,
    currentSet,
    countdown,
    heldTime,
    challengeCountdown,
    restCountdown,
    incorrectTime,
    totalCorrectTime,
    totalIncorrectTime,
    finalMessage,
    getReadyCountdown,
    startCountdown,
    startChallenge,
    startRest,
    setPhase,
    setGetReadyCountdown
  } = useRehabilitationSession(mode, mode === 'pose' ? poseIsHolding : faceIsHolding, lang);

  // Face-specific state
  const [facePhase, setFacePhase] = useState("idle");
  const [faceCurrentSet, setFaceCurrentSet] = useState(1);
  const [faceCountdown, setFaceCountdown] = useState(10);
  const [faceChallengeCountdown, setFaceChallengeCountdown] = useState(10);
  const [faceRestCountdown, setFaceRestCountdown] = useState(5);
  const [faceHeldTime, setFaceHeldTime] = useState(0);
  const [faceIncorrectTime, setFaceIncorrectTime] = useState(0);
  const [faceTotalCorrectTime, setFaceTotalCorrectTime] = useState(0);
  const [faceTotalIncorrectTime, setFaceTotalIncorrectTime] = useState(0);
  const [faceFinalMessage, setFaceFinalMessage] = useState("");
  const faceIntervalRef = useRef(null);

  // Camera permission effect
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "camera" }).then((result) => {
        setPermissionState(result.state);
        result.onchange = () => setPermissionState(result.state);
      });
    }
  }, []);

  // Pose mode initialization
  useEffect(() => {
    if (mode !== "pose") return;
    
    if (permissionState === "denied") {
      return;
    }

    if (permissionState === "granted" || permissionState === "prompt") {
      initializePose();
    }

    return () => {
      poseCleanup();
    };
  }, [permissionState, mode, initializePose, poseCleanup]);

  // Face mode initialization
  useEffect(() => {
    if (mode !== "face") return;
    
    let cancelled = false;
    
    const initFace = async () => {
      await initializeFaceMesh();
    };
    
    initFace();
    
    return () => {
      cancelled = true;
      faceCleanup();
    };
  }, [mode, initializeFaceMesh, faceCleanup]);

  // Face session management
  const startFaceCountdown = () => {
    console.log("Starting face countdown...");
    setFacePhase("countdown");
    setFaceCountdown(10);
    setFaceCurrentSet(1);
    setFaceHeldTime(0);
    setFaceFinalMessage("");
    setFaceIncorrectTime(0);
    setFaceTotalCorrectTime(0);
    setFaceTotalIncorrectTime(0);
    faceIntervalRef.current = setInterval(() => {
      setFaceCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(faceIntervalRef.current);
          startFaceChallenge();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startFaceChallenge = () => {
    console.log("Starting face challenge...");
    setFacePhase("challenge");
    setFaceHeldTime(0);
    playBeep(800, 1000, 0.4);
    setFaceFinalMessage("");
    setFaceChallengeCountdown(10);
    setFaceIncorrectTime(0);
  };

  const startFaceRest = () => {
    setFacePhase("rest");
    setFaceRestCountdown(5);
    setFaceHeldTime(0);
  };

  // Face challenge countdown effect
  useEffect(() => {
    if (facePhase === "challenge" && faceChallengeCountdown > 0) {
      const interval = setInterval(() => {
        setFaceChallengeCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            if (faceCurrentSet < 5) {
              setFaceCurrentSet(faceCurrentSet + 1);
              setFacePhase("rest");
              setFaceRestCountdown(5);
              setFaceChallengeCountdown(10);
            } else {
              setFacePhase("finished");
              const score = Math.round((faceTotalCorrectTime / 50) * 10);
              setFaceFinalMessage(
                lang === 'th'
                  ? `เวลาท่าถูกต้องทั้งหมด: ${faceTotalCorrectTime} วินาที\nคะแนน: ${score} เต็ม 10`
                  : `Total correct time: ${faceTotalCorrectTime} seconds\nScore: ${score} out of 10`
              );
            }
            return 0;
          } else {
            if (faceIsHolding) {
              setFaceTotalCorrectTime((t) => t + 1);
            } else {
              setFaceTotalIncorrectTime((t) => t + 1);
            }
            return prev - 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [facePhase, faceChallengeCountdown, faceIsHolding, faceCurrentSet, faceTotalCorrectTime, faceTotalIncorrectTime, lang]);

  // Face hold time tracking effect
  useEffect(() => {
    if (facePhase === "challenge" && faceIsHolding && faceHeldTime < 10 && faceChallengeCountdown > 0) {
      const interval = setInterval(() => {
        setFaceHeldTime((prev) => {
          if (prev >= 9) {
            clearInterval(interval);
            setFaceTotalCorrectTime((t) => t + 10);
            setFaceTotalIncorrectTime((t) => t + faceIncorrectTime);
            if (faceCurrentSet < 5) {
              setFaceCurrentSet(faceCurrentSet + 1);
              startFaceRest();
            } else {
              setFacePhase("finished");
              setFaceFinalMessage(`Congratulations! You completed all 5 sets!`);
            }
            return 10;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [facePhase, faceIsHolding, faceHeldTime, faceChallengeCountdown, faceCurrentSet, faceIncorrectTime]);

  // Face incorrect time tracking effect
  useEffect(() => {
    let interval;
    if (facePhase === "challenge" && !faceIsHolding && faceChallengeCountdown > 0 && faceHeldTime < 10) {
      interval = setInterval(() => {
        setFaceIncorrectTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [facePhase, faceIsHolding, faceChallengeCountdown, faceHeldTime]);

  // Face rest countdown effect
  useEffect(() => {
    if (facePhase === "rest" && faceRestCountdown > 0) {
      const interval = setInterval(() => {
        setFaceRestCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            startFaceChallenge();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [facePhase, faceRestCountdown]);

  // Face challenge ends without completing
  useEffect(() => {
    if (facePhase === "challenge" && faceChallengeCountdown === 0 && faceHeldTime < 10) {
      setFaceTotalCorrectTime((t) => t + faceHeldTime);
      setFaceTotalIncorrectTime((t) => t + faceIncorrectTime);
      if (faceCurrentSet < 5) {
        setFaceCurrentSet(faceCurrentSet + 1);
        startFaceRest();
      } else {
        setFacePhase("finished");
        setFaceFinalMessage(`Congratulations! You completed all 5 sets!`);
      }
    }
  }, [facePhase, faceChallengeCountdown, faceHeldTime, faceCurrentSet, faceIncorrectTime]);

  // Face finished effect
  useEffect(() => {
    if (facePhase === "finished") {
      const maxCorrect = 5 * 10;
      const score = Math.round((faceTotalCorrectTime / maxCorrect) * 10);
      setFacePhase("showfinal");
      setFaceFinalMessage(`Total correct time: ${faceTotalCorrectTime} seconds\nScore: ${score} out of 10`);
    }
  }, [facePhase, faceTotalCorrectTime, faceTotalIncorrectTime]);

  // Face showfinal effect
  useEffect(() => {
    if (facePhase === "showfinal") {
      const timeout = setTimeout(() => {
        navigate('/physicaltherapy');
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [facePhase, navigate]);

  // Mode switching logic
  useEffect(() => {
    if (phase === "getready" && getReadyCountdown === 0) {
      console.log("Switching to face mode");
      setMode("face");
      setFacePhase("idle");
    }
  }, [phase, getReadyCountdown]);

  // Auto-start face rehabilitation
  useEffect(() => {
    if (mode === 'face' && facePhase === 'idle') {
      console.log("Starting face rehabilitation...");
      setFacePhase("countdown");
      startFaceCountdown();
    }
  }, [mode, facePhase]);

  // Instructions effect
  useEffect(() => {
    if (permissionState === 'granted' && phase === 'idle') {
      if (!window.__rehabit_instruction_read) {
        speak('1. ปรับมุมกล้องให้เห็นครึ่งตัวด้านบน และแสงในห้องพอดี 2. ปรับมุมการนั่งเป็นแนวข้าง ให้แขนขวาของคุณเข้าหากล้อง');
        setTimeout(() => {
          speak('1. Adjust the camera to see your upper body and ensure good lighting. 2. Sit sideways so your right arm faces the camera.');
        }, 3000);
        window.__rehabit_instruction_read = true;
      }
    } else if (permissionState !== 'granted') {
      window.__rehabit_instruction_read = false;
    }
  }, [permissionState, phase]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(faceIntervalRef.current);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Render face mode
  if (mode === "face") {
    return (
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
        `}</style>
        <div className="mpfull-content-wrapper">
          <div className={window.innerWidth > 900 ? 'mpfull-horizontal' : 'mpfull-vertical'}>
            <div className="mpfull-video-panel" style={{ marginTop: 50, paddingTop: 0 }}>
              <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline />
              <canvas ref={canvasRef} width="640" height="480" className="mpfull-canvas" />
            </div>
            <FaceRehabilitationUI
              facePhase={facePhase}
              faceCurrentSet={faceCurrentSet}
              faceCountdown={faceCountdown}
              faceChallengeCountdown={faceChallengeCountdown}
              faceRestCountdown={faceRestCountdown}
              faceFeedback={faceFeedback}
              faceFeedbackColor={faceFeedbackColor}
              faceFinalMessage={faceFinalMessage}
              startFaceCountdown={startFaceCountdown}
              isLoading={faceLoading}
              error={faceError}
              lang={lang}
            />
          </div>
        </div>
      </div>
    );
  }

  // Render pose mode
  return (
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
          <PoseRehabilitationUI
            phase={phase}
            currentSet={currentSet}
            countdown={countdown}
            challengeCountdown={challengeCountdown}
            restCountdown={restCountdown}
            feedback={poseFeedback}
            finalMessage={finalMessage}
            getReadyCountdown={getReadyCountdown}
            startCountdown={startCountdown}
            isLoading={poseLoading}
            error={poseError}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}

export default PoseAngleDetector; 