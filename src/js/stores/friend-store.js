function FriendStore () {
  'use strict'

  // Inherit from StoreBase
  var _base = StoreBase.call(this)

  // Public interface
  this.all = all
  this.last = last
  this.findById = findById
  this.handle = handle

  // Private state
  var _friends = [fran, carol]
  var _lastId = carol.id

  // Implementation details
  function all () {
    return _friends
  }

  function last () {
    return _friends[_friends.length - 1]
  }

  function findById (id) {
    if (typeof id === 'string') {
      id = parseInt(id)
    }
    var index = _indexById(id)
    return _friends[index]
  }

  function handle (action) {
    switch (action.key) {
      case 'CREATE_FRIEND':
        _createFriend()
        break

      case 'EDIT_FRIEND':
        _editFriend(action)
        break

      case 'DESTROY_FRIEND':
        _destroyFriend(action)
        break
    }
  }

  function _indexById (id) {
    var index
    for (index = 0; index < _friends.length; index += 1) {
      if (_friends[index].id === id) {
        return index
      }
    }
    return -1
  }

  function _createFriend () {
    var id = _lastId + 1
    var newFriend = {
      id: id
    }
    _friends.push(newFriend)
    _lastId = id
    _base.notify()
  }

  function _editFriend (action) {
    var id = action.id
    var friend = findById(id)
    switch (action.intention) {
      case 'CHANGE_NAME':
        friend.name = action.value
        break

      case 'CREATE_DATE':
        if (!Array.isArray(friend.dates)) {
          friend.dates = []
        }
        friend.dates.unshift({})
        break

      case 'CHANGE_DATE_CALENDAR':
        friend.dates[action.index].date = action.value
        break

      case 'CHANGE_DATE_LABEL':
        friend.dates[action.index].label = action.value
        break

      case 'DESTROY_DATE':
        friend.dates.splice(action.index, 1)
        break

      case 'CREATE_LIKE':
        if (!Array.isArray(friend.likes)) {
          friend.likes = []
        }
        friend.likes.unshift('')
        break

      case 'CHANGE_LIKE_LABEL':
        friend.likes[action.index] = action.value
        break

      case 'DESTROY_LIKE':
        friend.likes.splice(action.index, 1)
        break

      case 'CREATE_DISLIKE':
        if (!Array.isArray(friend.dislikes)) {
          friend.dislikes = []
        }
        friend.dislikes.unshift('')
        break

      case 'CHANGE_DISLIKE_LABEL':
        friend.dislikes[action.index] = action.value
        break

      case 'DESTROY_DISLIKE':
        friend.dislikes.splice(action.index, 1)
        break
    }
    _base.notify()
  }

  function _destroyFriend (action) {
    var id = action.id
    var index = _indexById(id)
    _friends.splice(index, 1)
    _base.notify()
  }
}
