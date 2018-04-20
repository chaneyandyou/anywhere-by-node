const promisify = require('util').promisify
const fs = require('fs')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const path = require('path')
const config = require('../config/defaultConfig')
const mime = require('../helper/mime')
const compress = require('../helper/compress')
const range = require('../helper/range')
const Handlebars = require('handlebars')
const isFresh = require('../helper/cache')

const tplPath = path.join(__dirname, '../template/dir.tpl') // eslint-disable-line
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

module.exports = async function (req, res, filePath) { // eslint-disable-line
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType = mime(filePath)
      res.setHeader('Content-Type', contentType)

      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }

      let rs
      const { code, start, end } = range(stats.size, req, res)
      if (code === 200) {
        res.statusCode = 200
        rs = fs.createReadStream(filePath)
      } else {
        res.statusCode = 206
        rs = rs = fs.createReadStream(filePath, { start, end })
      }

      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      const data = {
        files,
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : ''
      }
      res.end(template(data))
    }
  } catch (error) {
    console.error(error)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a dirdectory or file \n ${error.toString()}`)
  }
}
