import { useState, useEffect, useRef } from 'react';
import { speak, playBeep } from '../utils/audioUtils';

export const useRehabilitationSession = (mode, isHolding, lang) => {
  // Session state
  const [phase, setPhase] = useState("idle");
  const [currentSet, setCurrentSet] = useState(1);
  const [countdown, setCountdown] = useState(10);
  const [heldTime, setHeldTime] = useState(0);
  const [challengeCountdown, setChallengeCountdown] = useState(10);
  const [restCountdown, setRestCountdown] = useState(5);
  const [incorrectTime, setIncorrectTime] = useState(0);
  const [totalCorrectTime, setTotalCorrectTime] = useState(0);
  const [totalIncorrectTime, setTotalIncorrectTime] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");
  const [getReadyCountdown, setGetReadyCountdown] = useState(10);

  // Constants
  const totalSets = 5;
  const holdTimePerSet = 10;
  const restTimePerSet = 5;

  // Refs
  const intervalRef = useRef(null);
  const lastSpokenCountdownRef = useRef(null);

  // Start countdown function
  const startCountdown = () => {
    setPhase("countdown");
    setCountdown(10);
    setCurrentSet(1);
    setHeldTime(0);
    setFinalMessage("");
    setIncorrectTime(0);
    setTotalCorrectTime(0);
    setTotalIncorrectTime(0);
    
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

  // Start challenge function
  const startChallenge = () => {
    setPhase("challenge");
    setHeldTime(0);
    playBeep(800, 1000, 0.4);
    setFinalMessage("");
    setChallengeCountdown(holdTimePerSet);
    setIncorrectTime(0);
  };

  // Start rest function
  const startRest = () => {
    setPhase("rest");
    setRestCountdown(restTimePerSet);
    setHeldTime(0);
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

  // When finished, set summary and score
  useEffect(() => {
    if (phase === "finished") {
      const maxCorrect = totalSets * holdTimePerSet;
      const score = Math.round((totalCorrectTime / maxCorrect) * 10);
      const summaryText = lang === 'th'
        ? `เวลาท่าถูกต้องทั้งหมด: ${totalCorrectTime} วินาที\nคะแนน: ${score} เต็ม10`
        : `Total correct time: ${totalCorrectTime} seconds\nScore: ${score} out of 10`;
      setPhase("showfinal");
      setFinalMessage(summaryText);
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

  // Voice countdown effect for challenge phase
  useEffect(() => {
    if (phase === "challenge" && challengeCountdown <= 3 && challengeCountdown > 0 && heldTime < holdTimePerSet) {
      if (lastSpokenCountdownRef.current !== challengeCountdown) {
        speak(String(challengeCountdown));
        lastSpokenCountdownRef.current = challengeCountdown;
      }
    } else if (phase === "rest") {
      if (lastSpokenCountdownRef.current !== 0) {
        const finishText = lang === 'th'
          ? `จบเซ็ตที่ ${currentSet-1}`
          : `Finish set ${currentSet-1}`;
        speak(finishText);
        lastSpokenCountdownRef.current = 0;
      }
    }
  }, [phase, challengeCountdown, heldTime, currentSet, lang]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
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
  };
}; 