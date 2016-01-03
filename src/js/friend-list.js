/**
 * List of friends
 *
 * Properties
 * ----------
 *
 * friends - List of friends to show
 * onSelect - Callback function triggered when user clicks a friend
 */
var FriendList = (function () {
  'use strict'

  return React.createClass({
    render: function () {
      var index = 0
      var friends = safeMap(this.props.friends, function (friend) {
        var currentIndex = index
        index += 1
        return (
          <li className='friendName'>
            <a href='#' onClick={this.handleClick} data-friend-index={currentIndex}>
              {friend.name}
            </a>
          </li>
        )
      }.bind(this))

      return (
        <ul className='friendList'>
          {friends}
        </ul>
      )
    },
    handleClick: function (event) {
      var index = event.target.dataset.friendIndex
      var friend = this.props.friends[index]
      this.props.onSelect(friend)
    }
  })
}())
