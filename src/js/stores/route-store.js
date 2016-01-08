function RouteStore (app) {
  'use strict'

  // Inherit from StoreBase
  var _base = StoreBase.call(this)

  // Public interface
  this.currentRoute = currentRoute
  this.handle = handle

  // Private state
  var _currentRoute = {
    view: 'friend-list'
  }

  // Implementation details
  function currentRoute () {
    return _currentRoute
  }

  function handle (action) {
    switch (action.key) {
      case 'VIEW_FRIEND_LIST':
        _viewFriendList()
        break

      case 'CREATE_FRIEND':
        _createFriend()
        break

      case 'VIEW_FRIEND':
        _viewFriend(action)
        break
    }
  }

  function _viewFriendList () {
    _currentRoute = {
      view: 'friend-list'
    }
    _base.notify()
  }

  function _createFriend () {
    app.dispatcher.waitFor(app.friendStoreKey)

    var last = app.friendStore.last()

    _currentRoute = {
      view: 'friend',
      id: last.id
    }

    _base.notify()
  }

  function _viewFriend (action) {
    _currentRoute = {
      view: 'friend',
      id: action.id
    }
    _base.notify()
  }
}
