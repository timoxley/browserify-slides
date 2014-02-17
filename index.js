"use strict"

var fs = require('fs')
var marked = require('marked')
var hljs = require('highlight.js')

marked.setOptions({
  gfm: true,
  sanitize: false,
  breaks: false,
  highlight: function (code, lang) {
    lang = lang === 'html' ? 'xml' : lang
    lang = lang === 'js' ? 'javascript' : lang
    var r = hljs.highlight(lang, code).value;
    return r
  }
});


var slides = marked(fs.readFileSync(__dirname + '/readme.md', 'utf8'))
var main = document.createElement('main')
main.innerHTML = slides
document.body.appendChild(main)
require('./slides')(main)
require('./big')
