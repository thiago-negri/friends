var FriendList = (function () {
  'use strict'

  return React.createClass({
    render: function () {
      var friends = this.props.friends.map(function (friend) {
        return (
          <li className='friendName'>{friend.name}</li>
        )
      })

      return (
        <ul className='friendList'>
          {friends}
        </ul>
      )
    }
  })
}())
