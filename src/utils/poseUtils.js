// Pose Detection Utilities
export const calculateAngle = (a, b, c) => {
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

export const isRightArmCorrect = (angle) => {
  return angle !== null && angle >= 50 && angle <= 90;
};

// Add Math.degrees if not available
if (!Math.degrees) {
  Math.degrees = (radians) => radians * (180 / Math.PI);
} 