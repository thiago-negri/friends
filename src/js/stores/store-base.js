function StoreBase () {
  'use strict'

  // Public interface
  this.observe = observe
  this.unobserve = unobserve

  // Protected interface
  var base = {}
  base.notify = notify

  // Private state
  var _listeners = []

  // Return handler for protected interface
  return base

  // Implementation details
  function observe (onChange) {
    _listeners.push(onChange)
  }

  function unobserve (onChange) {
    var i, len, index
    for (i = 0, len = _listeners.length; i < len; i++) {
      if (_listeners[i] === onChange) {
        index = i
        break
      }
    }
    _listeners.splice(index, 1)
  }

  function notify () {
    _listeners.forEach(function (listener) {
      listener()
    })
  }
}
