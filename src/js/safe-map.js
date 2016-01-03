function safeMap (array, callback) {
  'use strict'
  if (Array.isArray(array)) {
    return array.map(callback)
  } else {
    return null
  }
}
