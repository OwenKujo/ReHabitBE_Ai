// Face Detection Utilities
export const calculatePitch = (landmarks) => {
  if (!landmarks || landmarks.length < 153) {
    console.log('Not enough landmarks:', landmarks?.length);
    return 0;
  }
  
  const nose = landmarks[1];
  const chin = landmarks[152];
  
  if (!nose || !chin) {
    console.log('Missing nose or chin landmarks');
    return 0;
  }
  
  // When tilting head back (looking up):
  // - nose moves up (smaller Y value)
  // - chin moves down (larger Y value)
  // - So (nose.y - chin.y) should be negative
  const dy = nose.y - chin.y;
  const dz = nose.z - chin.z;
  
  // Use atan2(dy, dz) instead of atan2(dz, dy) for correct angle
  const radians = Math.atan2(dy, dz);
  const pitch = radians * (180 / Math.PI);
  
  return pitch;
};

export const isFacePoseCorrect = (pitch, threshold = 2) => {
  // When head is tilted back (looking up), pitch should be negative
  return pitch < -threshold;
}; 