const axios = require('axios')
const chalk = require('chalk')

axios.defaults.baseURL = 'https://www.umweltkarten-niedersachsen.de'

/**
 * Request map from LGLN
 * @param {Object} options Request options
 * @param {number} options.x1 x1 coordinate
 * @param {number} options.y1 y1 coordinate
 * @param {number} options.x2 x2 coordinate
 * @param {number} options.y2 y2 coordinate
 * @param {number} options.z Zoom
 * @param {number} options.width Image width
 * @param {number} options.height Image height
 * @returns {Object} WMS response
 */
async function requestMap (options) {
  const params = {
    SERVICE: 'WMS',
    VERSION: '1.3.0',
    REQUEST: 'GetMap',
    FORMAT: 'image/png',
    TRANSPARENT: true,
    LAYERS: 'dop20_f',
    WIDTH: options.width,
    HEIGHT: options.height,
    CRS: 'EPSG:25832',
    BBOX: `${options.x1},${options.y1},${options.x2},${options.y2}`
  }

  try {
    return await axios.get('/doorman/farbe_dyn', {
      params,
      responseType: 'arraybuffer'
    })
  } catch (error) {
    console.log(chalk`\n{bold.red Error}`)
    console.log(error)
  }
}

module.exports = requestMap
