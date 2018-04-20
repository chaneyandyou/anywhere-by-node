const http = require('http')
const path = require('path')
const config = require('./config/defaultConfig')
const chalk = require('chalk')
const route = require('./helper/router')

const server = http.createServer((req, res) => {
  const filePath = path.join(config.root, req.url)
  route(req, res, filePath)

})

server.listen(config.port, config.hostname, () => {
  const addr = `http://${config.hostname}:${config.port}`
  console.info(`Server started at ${chalk.green(addr)}`)
})
