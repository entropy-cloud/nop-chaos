'use strict'

const fs = require('fs')
const path = require('path')
const pluginutils = require('@rollup/pluginutils')

const defaults = {
  dom: false,
  exclude: null,
  include: null,
}

const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

const domTemplate = function (ref) {
  const dataUri = ref.dataUri

  return (`\n  var img = new Image();\n  img.src = "${dataUri}";\n  export default img;\n`)
}

const constTemplate = function (ref) {
  const dataUri = ref.dataUri

  return (`\n  var img = "${dataUri}";\n  export default img;\n`)
}

const getDataUri = function (ref) {
  const format = ref.format
  const mime = ref.mime
  const source = ref.source

  return `data:${mime};${format},${source}`
}

function image(opts) {
  if (!opts)
    opts = {}

  const options = Object.assign({}, defaults, opts)
  const filter = pluginutils.createFilter(options.include, options.exclude)

  return {
    name: 'image',
    enforce: 'pre',
    load: function load(id) {
      if (!filter(id))
        return null

      const mime = mimeTypes[path.extname(id)]
      if (!mime) {
        // not an image
        return null
      }
      if (fs.statSync(id).size > 8192) {
        // file is too big
        return null
      }

      const format = 'base64'
      const source = fs.readFileSync(id, format).replace(/[\r\n]+/gm, '')

      const dataUri = getDataUri({ format, mime, source })
      const code = options.dom ? domTemplate({ dataUri }) : constTemplate({ dataUri })

      return code.trim()
    },
  }
}

module.exports = image
