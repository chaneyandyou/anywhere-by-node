const { exec } = require('child_process')

module.exports = url => {
  switch (process.platform) { // eslint-disable-line
  case 'darwin':
    exec(`open ${url}`)
    break
  case 'win32':
    exec(`start ${url}`)
  }
}
