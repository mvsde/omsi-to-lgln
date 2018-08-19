/**
 * Convert OMSI coordinates to LGLN coordinates
 * @param {Object} options Convert options
 * @param {(number|string)} options.x x coordinate
 * @param {(number|string)} options.y y coordinate
 * @param {(number|string)} options.z Zoom
 * @returns {{x1: number, x2: number, y1: number, y2: number}} Converted coordinates
 */
function convertCoordinates (options) {
  if (typeof options.x === 'string') {
    options.x = parseFloat(options.x)
  }

  if (typeof options.y === 'string') {
    options.y = parseFloat(options.y)
  }

  if (typeof options.z === 'string') {
    options.z = parseFloat(options.z)
  }

  return {
    x1: options.x,
    x2: options.x + 100 * options.z,
    y1: options.y,
    y2: options.y + 100 * options.z
  }
}

module.exports = convertCoordinates
