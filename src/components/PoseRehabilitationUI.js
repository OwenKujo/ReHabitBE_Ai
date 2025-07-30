import React from 'react';
import { speak } from '../utils/audioUtils';

const PoseRehabilitationUI = ({ 
  phase, 
  currentSet, 
  countdown, 
  challengeCountdown, 
  restCountdown, 
  feedback, 
  finalMessage, 
  getReadyCountdown,
  startCountdown, 
  isLoading, 
  error, 
  lang 
}) => {
  const poseTips = [
    "Make sure your right arm is bent between 50° and 90°. Try raising or lowering your elbow!",
    "Keep your back straight and avoid leaning forward.",
    "Relax your shoulders and keep them level.",
    "Check your camera angle to ensure your full arm is visible.",
    "Try to keep your wrist in line with your elbow for better accuracy."
  ];

  const poseTipsTH = [
    'งอข้อศอกขวาให้ได้มุม 50° ถึง 90° ลองยกหรือกดข้อศอก',
    'นั่งหลังตรง หลีกเลี่ยงการโน้มตัวไปข้างหน้า',
    'ผ่อนคลายไหล่และตั้งไหล่ให้เสมอกัน',
    'ปรับกล้องให้เห็นแขนขวาชัดเจน',
    'พยายามให้ข้อมืออยู่ในแนวเดียวกับข้อศอก',
  ];

  const getRandomTip = () => {
    const tips = lang === 'th' ? poseTipsTH : poseTips;
    return tips[Math.floor(Math.random() * tips.length)];
  };

  return (
    <div className="mpfull-control-panel" style={{ marginTop: 50, paddingTop: 0 }}>
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
            {phase === "countdown" && (
              <>
                <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>{lang === 'th' ? 'เตรียมตัว' : 'Get Ready'}</div>
                <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>Countdown: {countdown} s</div>
              </>
            )}
            {phase === "challenge" && (
              <>
                <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>Set {currentSet} / 5</div>
                <div style={{ fontSize: 20, color: "#1976d2", fontWeight: "bold", marginBottom: 8 }}>Countdown: {challengeCountdown} s</div>
                <div style={{ marginBottom: 8 }}>{feedback === "Correct" ? (lang === 'th' ? 'ถูกต้อง! ค้างท่าไว้' : 'Great! Keep holding the correct pose!') : (lang === 'th' ? 'ปรับท่าให้ถูกต้อง' : 'Adjust your pose to the correct position!')}</div>
                {feedback === "Incorrect" && (
                  <div style={{ color: "#ff9800", fontSize: 16, marginTop: 8 }}>
                    Tip: {getRandomTip()}
                  </div>
                )}
              </>
            )}
            {phase === "rest" && (
              <>
                <div style={{ fontSize: 20, color: "#FFA500", fontWeight: "bold", marginBottom: 8 }}>{lang === 'th' ? 'เวลาพัก' : 'Rest Time'}: {restCountdown} s</div>
                <div style={{ marginBottom: 8 }}>{lang === 'th' ? 'ถัดไป: เซ็ต' : 'Next: Set'} {currentSet} / 5</div>
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
      <button onClick={() => speak(lang === 'th' ? 'สวัสดีครับ นี่คือระบบแปลงข้อความเป็นเสียงภาษาไทย' : 'Hello, this is the Thai text-to-speech system')}
        style={{ margin: '16px 0', padding: '10px 24px', fontSize: 16, borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}>
        🔊 {lang === 'th' ? 'ทดสอบเสียงภาษาไทย' : 'Test Thai Speech'}
      </button>
    </div>
  );
};

export default PoseRehabilitationUI; 