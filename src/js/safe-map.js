function safeMap (array, callback) {
  'use strict'
  var index = 0
  if (Array.isArray(array)) {
    return array.map(function (e) {
      var currentIndex = index
      index += 1
      return callback(e, currentIndex)
    })
  } else {
    return null
  }
}
