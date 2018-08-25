const utm = require('utm')

const degToRad = require('./deg-to-rad')

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
    options.x = parseInt(options.x)
  }

  if (typeof options.y === 'string') {
    options.y = parseInt(options.y)
  }

  if (typeof options.z === 'string') {
    options.z = parseInt(options.z)
  }

  const latInner = Math.PI * (1 - 2 * options.y / 2 ** options.z)
  const latSinh = Math.sinh(latInner)
  const latAtan = Math.atan(latSinh)
  const lat = latAtan * 180 / Math.PI

  const long = options.x * 360 / 2 ** options.z - 180

  const s = 40075016.686 * Math.cos(degToRad(lat)) / 2 ** options.z

  try {
    const {
      easting: x1,
      northing: y2
    } = utm.fromLatLon(lat, long)

    const x2 = x1 + s
    const y1 = y2 - s

    return { success: true, x1, y1, x2, y2 }
  } catch (error) {
    return { success: false, error }
  }
}

module.exports = convertCoordinates
