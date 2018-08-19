/**
 * Convert degree to radian
 * @param {number} angle Degree
 * @returns {number} Radian
 */
function degToRad (angle) {
  return angle * (Math.PI / 180)
}

module.exports = degToRad
