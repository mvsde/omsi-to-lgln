const chalk = require('chalk')
const express = require('express')
const getPort = require('get-port')
const inquirer = require('inquirer')

const convertCoordinates = require('./lib/convert-coordinates')
const requestMap = require('./lib/request-map')

module.exports = async function () {
  console.log(chalk`{bold.yellow OMSI to LGLN}\n`)

  const settings = await inquirer.prompt([
    {
      type: 'input',
      name: 'port',
      message: 'Server port',
      default: 3000,
      filter: port => getPort({ port })
    },
    {
      type: 'input',
      name: 'width',
      message: 'Image width',
      default: 1024
    },
    {
      type: 'input',
      name: 'height',
      message: 'Image height',
      default: 1024
    }
  ])

  const app = express()

  app.get('/', async (request, response) => {
    console.log(chalk`\n================================================================================`)

    console.log(chalk`\n{bold Request coordinates (lat/long)}`)
    console.log(request.query)

    const coordinates = convertCoordinates(request.query)

    console.log(chalk`\n{bold Converted coordinates (UTM)}`)
    console.log(coordinates)

    const map = await requestMap({
      ...coordinates,
      width: settings.width,
      height: settings.height
    })

    if (map) {
      response.type('png')
      response.send(map.data)
    } else {
      response.send('Error')
    }
  })

  app.listen(settings.port, function () {
    const address = `http://localhost:${this.address().port}`

    console.log(chalk`\n{bold Server listening at}`)
    console.log(chalk`{blue ${address}}`)

    console.log(chalk`\n{bold Usage}`)
    console.log(chalk`${address}/?x={black.bgWhite LATITUDE}&y={black.bgWhite LONGITUDE}&z={black.bgWhite ZOOM}`)

    console.log(chalk`\n{bold.green Waiting for requests…}`)
  })
}
