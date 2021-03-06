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
  var _friends = (function () {
    var friends = localStorage.getItem('friends')
    if (friends) {
      try {
        return JSON.parse(friends)
      } catch (e) {
        localStorage.setItem('friends', '[]')
      }
    }
    return []
  }())
  var _lastId = (function () {
    var lastId = 0
    _friends.forEach(function (friend) {
      if (friend.id > lastId) {
        lastId = friend.id
      }
    })
    return lastId
  }())

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

  function _save () {
    localStorage.setItem('friends', JSON.stringify(_friends))
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
      id: id,
      name: 'John Doe',
      focus: 'name'
    }
    _friends.push(newFriend)
    _lastId = id
    _save()
    _base.notify()
  }

  function _editFriend (action) {
    var id = action.id
    var friend = findById(id)
    if (friend.focus) {
      delete friend.focus
    }
    switch (action.intention) {
      case 'CHANGE_NAME':
        friend.name = action.value
        break

      case 'CREATE_DATE':
        if (!Array.isArray(friend.dates)) {
          friend.dates = []
        }
        friend.focus = 'dates0'
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
        friend.focus = 'likes0'
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
        friend.focus = 'dislikes0'
        friend.dislikes.unshift('')
        break

      case 'CHANGE_DISLIKE_LABEL':
        friend.dislikes[action.index] = action.value
        break

      case 'DESTROY_DISLIKE':
        friend.dislikes.splice(action.index, 1)
        break
    }
    _save()
    _base.notify()
  }

  function _destroyFriend (action) {
    var id = action.id
    var index = _indexById(id)
    _friends.splice(index, 1)
    _save()
    _base.notify()
  }
}
