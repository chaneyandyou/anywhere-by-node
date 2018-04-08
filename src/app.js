const http = require('http')
const config = require('./config/defaultConfig')
const chalk = require('chalk')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello Wolrd, Hello Node')
})

server.listen(config.port, config.hostname, () => {
  const addr = `http://${config.hostname}:${config.port}`
  console.info(`Server started at ${chalk.green(addr)}`)
})
