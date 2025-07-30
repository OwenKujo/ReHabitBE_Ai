// Audio Utilities
export function speak(text, lang = 'en') {
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

export function playBeep(frequency = 800, duration = 300, volume = 0.3) {
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