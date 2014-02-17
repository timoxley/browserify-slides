var path = require('path')
var fs = require('fs')
var http = require('http')
var url = require('url')
var browserify = require('browserify')
var es6ify = require('es6ify')

http.createServer(function(req, res) {
  if (url.parse(req.url).pathname === '/bundle.js') return script(req, res)
  if (url.parse(req.url).pathname === '/favicon.ico') return res.end()
  else return html(req, res)
}).listen(9090)


function script(req, res) {
  res.setHeader("Content-Type", "application/javascript");
  browserify()
  .add(es6ify.runtime)
  .transform(es6ify)
  .require(require.resolve('./transforms_client.js'), { entry: true })
  .bundle({ debug: true })
  .pipe(res)
}

function html(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.end('<script src="bundle.js"></script>')
}
