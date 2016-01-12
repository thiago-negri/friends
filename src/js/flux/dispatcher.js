function Dispatcher () {
  'use strict'

  // Public interface
  this.register = register
  this.dispatch = dispatch
  this.waitFor = waitFor

  // Private state
  var _stores = []
  var _actionInFlight = null
  var _storesInFlight = []
  var _storesDone = []

  // Implementation details
  function register (store) {
    var key = _stores.length
    _stores.push(store)
    return key
  }

  function dispatch (action) {
    var key

    if (_actionInFlight !== null) {
      throw 'You should not double dispatch.'
    }

    _actionInFlight = action
    _storesInFlight = []
    _storesDone = []

    for (key in _stores) {
      _handle(key)
    }

    _actionInFlight = null
    _storesInFlight = []
    _storesDone = []
  }

  function waitFor (key) {
    if (key in _storesDone) {
      return
    }
    if (key in _storesInFlight) {
      throw 'There seems to be a circular dependency on your stores.'
    }
    _handle(key)
  }

  function _handle (key) {
    _storesInFlight[key] = true
    _stores[key].handle(_actionInFlight)
    _storesInFlight[key] = false
    _storesDone[key] = true
  }
}
