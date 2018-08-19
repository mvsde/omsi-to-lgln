const utm = require('utm')

/**
 * Convert OMSI coordinates to LGLN coordinates
 * @param {Object} options Convert options
 * @param {(number|string)} options.x x coordinate
 * @param {(number|string)} options.y y coordinate
 * @param {(number|string)} options.z Zoom
 * @returns {{x1: number, y1: number, x2: number, y2: number}} Converted coordinates
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

  const { easting, northing } = utm.fromLatLon(options.x, options.y)
  const zoom = (100 * options.z) / 2

  return {
    x1: easting - zoom,
    y1: northing - zoom,
    x2: easting + zoom,
    y2: northing + zoom
  }
}

module.exports = convertCoordinates
