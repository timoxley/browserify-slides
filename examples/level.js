var sublevel = require('sublevel')
var levelup = require('levelup')
var leveljs = require('level-js')

if (process.browser) {
  // for browser
  db = levelup('./db', {
    db: function (location) {return leveljs(location)}
  })
} else {
  var leveldown = require('leveldown')
  db = levelup('./db', {
    db: function (location) {return leveldown(location)}
  })
}

var users = db//sublevel(db, 'users')
users.put('user1', 'wei', function (err) {
  if (err) throw err
  users.get('user1', function (err, value) {
    if (err) throw err
    console.log('Got user1 =', value)
  })
})
