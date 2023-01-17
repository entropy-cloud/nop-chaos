const path = require('path')
const jimp = require('jimp')

async function resize(filename) {
  const image = await jimp.read(path.join(__dirname, '../cypress/downloads', filename))
  image.contain(320, 180).write(path.join(__dirname, '../src/img', filename))
  console.log(`${filename} resized`)
}

console.log('Resizing images...')
resize('bpmn.png')
resize('nodeRed.png')
