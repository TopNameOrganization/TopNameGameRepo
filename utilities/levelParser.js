var fs = require('fs')
var { createCanvas, loadImage } = require('canvas')

const tilesMap = [
  'blackblack',
  'redblack',
  'redred',
  'whitewhite',
  'whiteblack',
  'blackyellow',
  'purpleblack',
  'greyblack',
]

const tileSize = 8
const width = 32
const height = 22
const offsetX = 19
const offsetY = 19
const levelStepX = 277
const levelStepY = 213

check = [
  { x: 1, y: 0 },
  { x: 6, y: 3 },
]

loadImage(__dirname + '/levels.png').then(img => {
  const getColorName = data => {
    if (data[0] === 0 && data[1] === 0 && data[2] === 0) {
      return 'black'
    }
    if (data[0] === 255 && data[1] === 0 && data[2] === 0) {
      return 'red'
    }
    if (data[0] === 255 && data[1] === 255 && data[2] === 255) {
      return 'white'
    }
    if (data[0] === 255 && data[1] === 255 && data[2] === 0) {
      return 'yellow'
    }
    if (data[0] === 255 && data[1] === 0 && data[2] === 255) {
      return 'purple'
    }
    if (data[0] === 204 && data[1] === 204 && data[2] === 204) {
      return 'grey'
    }
  }

  const getTileAt = (x, y) => {
    const offset = { x: x * tileSize, y: y * tileSize }
    const color1 = getColorName(
      ctx.getImageData(offset.x + check[0].x, offset.y + check[0].y, 1, 1).data
    )
    const color2 = getColorName(
      ctx.getImageData(offset.x + check[1].x, offset.y + check[1].y, 1, 1).data
    )
    return tilesMap.indexOf(`${color1}${color2}`)
  }

  const canvasWidth = width * tileSize
  const canvasHeight = height * tileSize
  const canvas = createCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')
  const levelMap = []

  const yc = 0
  for (var i = 0; i < 15; i++) {
    ctx.drawImage(
      img,
      offsetX + levelStepX * i,
      offsetY + levelStepY * yc,
      canvasWidth,
      canvasHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
    )

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        levelMap.push(getTileAt(x, y))
      }
    }
    console.log(`${i} done`)
  }
  const data = new Uint8Array(Buffer.from(levelMap))
  fs.writeFile(
    __dirname + `/levels${yc * 15 + 1}_${yc * 15 + 15}.bin`,
    data,
    err => {
      console.log(err)
    }
  )
})
