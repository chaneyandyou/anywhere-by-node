module.exports = {
  root: process.cwd(), // eslint-disable-line
  hostname: '127.0.0.1',
  port: 9527,
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 60000,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}
