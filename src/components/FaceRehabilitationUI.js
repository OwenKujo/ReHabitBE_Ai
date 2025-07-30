import React from 'react';
import { speak } from '../utils/audioUtils';

const FaceRehabilitationUI = ({ 
  facePhase, 
  faceCurrentSet, 
  faceCountdown, 
  faceChallengeCountdown, 
  faceRestCountdown, 
  faceFeedback, 
  faceFeedbackColor,
  faceFinalMessage, 
  startFaceCountdown, 
  isLoading, 
  error, 
  lang 
}) => {
  const faceTips = [
    "Tilt your head back until you feel a gentle stretch in your neck.",
    "Keep your chin up and look slightly upwards.",
    "Relax your shoulders and keep your back straight.",
    "Hold your head steady and avoid moving during the rep.",
    "Make sure your face is clearly visible to the camera."
  ];

  const faceTipsTH = [
    'เงยศีรษะไปด้านหลังจนรู้สึกตึงที่คอ',
    'เชิดคางขึ้นและมองขึ้นเล็กน้อย',
    'ผ่อนคลายไหล่และนั่งหลังตรง',
    'อย่าขยับศีรษะขณะทำท่า',
    'ให้ใบหน้าเห็นชัดเจนต่อกล้อง',
  ];

  const getRandomTip = () => {
    const tips = lang === 'th' ? faceTipsTH : faceTips;
    return tips[Math.floor(Math.random() * tips.length)];
  };

  return (
    <div className="mpfull-control-panel" style={{ marginTop: 50, paddingTop: 0 }}>
      <h1 className="mpfull-title">{lang === 'th' ? 'ฟื้นฟูท่าศีรษะ' : 'Face Rehabilitation'}</h1>
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
          Loading MediaPipe Face Mesh...
        </div>
      )}
      {facePhase === "idle" && (
        <div>
          <div style={{ fontSize: 18, color: "#1976d2", marginBottom: 16 }}>
            {lang === 'th' ? 'เตรียมตัวสำหรับการฟื้นฟูท่าศีรษะ' : 'Get ready for face rehabilitation'}
          </div>
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
            <div>{lang === 'th' ? '1. ปรับมุมกล้องให้เห็นใบหน้าชัดเจน' : '1. Adjust camera to see your face clearly'}</div>
            <div>{lang === 'th' ? '2. เงยหน้าขึ้นและค้างไว้ 10 วินาที' : '2. Tilt your head back and hold for 10 seconds'}</div>
          </div>
          <button 
            onClick={() => {
              console.log("Manual start face rehabilitation");
              startFaceCountdown();
            }}
            style={{ 
              fontSize: "18px", 
              padding: "10px 30px", 
              marginTop: "16px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {lang === 'th' ? 'เริ่มฟื้นฟูท่าศีรษะ' : 'Start Face Rehabilitation'}
          </button>
        </div>
      )}
      {facePhase === "countdown" && (
        <div>
          <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>
            {lang === 'th' ? 'เตรียมตัว' : 'Get Ready'}
          </div>
          <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>
            Countdown: {faceCountdown} s
          </div>
          <div style={{ marginBottom: 8 }}>
            {lang === 'th'
              ? 'เงยหน้าขึ้นและค้างไว้ 10 วินาที ทำทั้งหมด 5 เซ็ต'
              : 'Tilt your head back and hold for 10 seconds. Complete 5 sets.'}
          </div>
        </div>
      )}
      {facePhase === "challenge" && (
        <>
          <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>
            {lang === 'th' ? `เซ็ต ${faceCurrentSet} / 5` : `Set ${faceCurrentSet} / 5`}
          </div>
          <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>
            {lang === 'th' ? `จับเวลา: ${faceChallengeCountdown} วินาที` : `Countdown: ${faceChallengeCountdown} s`}
          </div>
          <div style={{
            fontSize: 18,
            color: faceFeedbackColor,
            fontWeight: "bold",
            marginTop: 10,
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: faceFeedbackColor === "#00FF00" ? "#e8f5e8" : "#ffe8e8"
          }}>
            {faceFeedback}
          </div>
          {faceFeedback === (lang === 'th' ? 'ปรับท่าให้ถูกต้อง' : 'Adjust your head position!') && (
            <div style={{ color: "#ff9800", fontSize: 16, marginTop: 8 }}>
              Tip: {getRandomTip()}
            </div>
          )}
        </>
      )}
      {facePhase === "rest" && (
        <div>
          <div style={{ fontSize: 20, color: "#FFA500", fontWeight: "bold", marginBottom: 8 }}>
            {lang === 'th' ? 'เวลาพัก' : 'Rest Time'}: {faceRestCountdown} s
          </div>
          <div style={{ marginBottom: 8 }}>
            {lang === 'th' ? `ถัดไป: เซ็ต ${faceCurrentSet} / 5` : `Next: Set ${faceCurrentSet} / 5`}
          </div>
        </div>
      )}
      {facePhase === "finished" && (
        <div>
          <div style={{ fontSize: 20, color: "#00FF00", fontWeight: "bold", marginBottom: 8 }}>
            {lang === 'th' ? 'ครบทุกเซ็ต!' : 'All Sets Complete!'}
          </div>
          <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>
            {lang === 'th' ? 'ดูผลการทดสอบด้านล่าง' : 'See your results below.'}
          </div>
          <div style={{ fontSize: 18, color: "#333", marginBottom: 8, whiteSpace: "pre-line" }}>
            {faceFinalMessage}
          </div>
        </div>
      )}
      {facePhase === "showfinal" && (
        <div>
          <div style={{ fontSize: 20, color: "#00FF00", fontWeight: "bold", marginBottom: 8 }}>
            {lang === 'th' ? 'สรุป' : 'Summary'}
          </div>
          <div style={{ fontSize: 18, color: "#333", marginBottom: 8, whiteSpace: "pre-line" }}>
            {faceFinalMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceRehabilitationUI; 