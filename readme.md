## browserify

#### Yet another client-side depedency management tool

## why browserify?
####

## Bower

Pros:

* Requires minimal change to existing workflow.
* Unopinionated.
* Many existing libs work out of the box.
* Code hosted on github.
* 9,335 packages in the bower registry.

Cons:

* Doesn't provide encapsulation or module loading.
* Custom registry for publishing.
* Unpublishing requires manual intervention from admin.
* Unopinionated.
* Doesn't manage nested dependencies.
* Doesn't leverage power of npm.

Use when:

* You have an existing codebase and need to manage non-commonjs libs.
* You want to use currently popular libraries.
* You don't really care about modularity.

## Component.io

Pros:

* Builds also include assets e.g. css/fonts/images
* Project and community ephasise modularity.
* No custom registry, just uses github.
* 1,586 packages in the component registry.

Cons:

* Doesn't leverage power of npm (slightly different).
* Requires a build step.
* Opinionated.
* No npm.

Use when:

* You want to build apps out of reusable, composable modules.
* You're building primarily frontend pieces.
* You can't/won't share much code with the backend anyway.
* You don't care to use libraries from npm or you can be bothered converting them to component (it's quick).
* You want to experiment with something a little different.

## AMD/require.js/jamjs

Pros:

* No build step.
* Provides Encapsulation.
* Async dependency loading.
* Lightweight.
* Compatible with node.
* 711 packages in jam.

Cons:

* Verbose syntax
* Not at all idomatic node.
* Doesn't leverage power of npm.
* Opinionated.
* Loading dependencies asynchronously isn't as important as you think it is.
* Bad attitude.

Use when:

* You haven't used anything better.

## Browserify

Pros:

* Share code between client/server.
* Infinitely nested dependencies.
* Project and community ephasise modularity.
* 578 'browserify-related' packages.
* Leverages a possible 59,404 npm modules.
* Powerful features like transforms.

Cons:

* Might require a build step.
* Opinionated.
* Uses a registry for hosting code and search.
* Not yet a good solution for asset packing.

Use when:

* You want to share code between frontend/backend.
* You want to build apps out of reusable, composable modules.
* You want to harness existing code.
* You want to maintain consistent code style between frontend/backend.

## browserify ftw
#### What does it look like?

## client-side require

```javascript
// say_hello.js
"use strict"
module.exports = function() {
  console.log('hello world')
}
```

```javascript
"use strict"
var sayHello = require('./say_hello')
sayHello()
```

```bash
(cd examples; beefy hello_world.js --open -- -t brfs)
```

## npm modules in the browser

Use npm to manage browser modules.

```bash
(cd examples; beefy jsynth.js --open)
```

## node core in the browser

```javascript
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

```

```bash
(cd examples; beefy core.js --open)
```

## browserified node core modules

* assert
* buffer
* console
* constants
* crypto
* domain
* events
* http
* https
* os
* path
* punycode
* querystring
* stream
* string_decoder
* timers
* tty
* url
* util
* vm
* zlib

## many npm modules will *just work* in the browser

* rework
* css-parse
* marked
* etc

## marked just works in the browser

e.g. this slideshow

```javascript
"use strict"

var fs = require('fs')
var marked = require('marked')

var slides = marked(fs.readFileSync(__dirname + '/slides.md'))

document.body.innerHTML = slides
```

If it doesn't do IO or conditional requires, it'll probably just work.

## with some work, interesting things can be made work in the browser
#### e.g. databases

## e.g. leveldb

* LevelDB is an embedded database by Google.
* LevelDown is a binding to LevelDB for Node.
* LevelUP is a popular API layer on top of LevelDown.
* Level.js is an implementation of the LevelDown API on top of IndexedDB
* [Anything that works with LevelUP](https://github.com/rvagg/node-levelup/wiki/Modules) should now work in the browser!

> LevelUP Dependents (85): rss-emitter, testling-server, level-json, cinnamon, emitdb, hbond, blockchain-link-server, jamesjwood-pouchdb, socket-sync, idx, seneca-level-store, osmparser, fnpm, level-sleep, fash, insight-bitcore, hangar, alldata-storage-leveldb, dscape-mind-explosion-database, media-scanner, 
and 65 more


## leveldb working in node and the browser

```javascript
"use strict"
var sublevel = require('level-sublevel')
var leveljs = require('level.js')
var level = require('level')

if (process.browser) {
  db = sublevel('users', leveljs('./db')) // for browser
} else {
  db = sublevel('users', leveljs('./db')) // for node
}

db.put('user1', 'wei', function (err) {
  if (err) throw err
  db.get('user1', function (err, value) {
    if (err) throw err
    console.log('Got user1 =', value)
  })
})
```

```bash
(cd examples; node level.js)
(cd examples; beefy level.js --open)
```

## browserify supports transforms

Like Array#map for modules.

```bash
browserify -t uglifyify index.js # output uglified js
```
## AltJS &#8594; JS

* typescriptify – TypeScript &#8594; JS
* coffeeify – CoffeeScript &#8594; JS
* dogeify – Dogescript &#8594; JS

```javascript
var ts = require('./script.typescript')
var cs = require('./script.coffee')
var ds = require('./script.doge')
```

## NextJS &#8594; JS 

* browserify-shim – Adds ES5 support
* es6ify – Adds ES6 support
* sweetify – Adds Macros

```bash
node examples/transforms.js
```

## alt dependency management &#8594; browserify 

* deamdify – Converts AMD to CommonJS
* debowerify – Use bower with browserify
* decomponentify – Use component.io build files with browserify.
* deglobalify – Wrangle non-browserify libs by preventing global writing.


## The best part of node is its package manager and module isolation.
#### 
## Browserify gives you the best part of node, in the browser.
#### 
## Try browserify on your next project.
#### 
## Questions?
#### 
