"use strict"

var assert = require('assert') // core lib
var zlib = require('zlib') // core lib
var fs = require('fs') // core lib (via transform)

var downloadFile = require('./download_file') // custom lib

fs.readFile(__dirname + '/data.txt', function(err, data) {
  assert.ifError(err)
  zlib.gzip(data, function(err, zippedData) {
    assert.ifError(err)
    var filename = 'zipped_file_'+Date.now()+'.gz'
    downloadFile(filename, zippedData)
  })
})
