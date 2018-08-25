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
    options.x = parseFloat(options.x)
  }

  if (typeof options.y === 'string') {
    options.y = parseFloat(options.y)
  }

  if (typeof options.z === 'string') {
    options.z = parseFloat(options.z)
  }

  const latInner = Math.PI * (1 - 2 * options.y / 2 ** options.z)
  const latSinh = Math.sinh(degToRad(latInner))
  const latAtan = Math.atan(degToRad(latSinh))
  const lat = latAtan * 180 / Math.PI

  const long = options.x * 360 / 2 ** options.z - 180

  const {
    easting: x1,
    northing: y2
  } = utm.fromLatLon(lat, long)

  const s = 40075016.686 * Math.cos(degToRad(lat)) / 2 ** options.z

  const x2 = x1 + s
  const y1 = y2 - s

  return { x1, y1, x2, y2 }
}

module.exports = convertCoordinates
