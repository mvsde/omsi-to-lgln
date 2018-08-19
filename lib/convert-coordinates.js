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

  const {
    easting: centerX,
    northing: centerY
  } = utm.fromLatLon(options.x, options.y)

  const C = 40075016.686
  const tileWidth = C * Math.cos(degToRad(options.x)) / 2 ** options.z
  const halfTileWidth = tileWidth / 2

  return {
    x1: centerX - halfTileWidth,
    y1: centerY - halfTileWidth,
    x2: centerX + halfTileWidth,
    y2: centerY + halfTileWidth
  }
}

module.exports = convertCoordinates
