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
    getInitialState: function () {
      var state = {
        friends: this.props.app.friendStore.all()
      }
      return state
    },
    componentDidMount: function () {
      this.props.app.friendStore.observe(this._onChange)
    },
    componentWillUnmount: function () {
      this.props.app.friendStore.unobserve(this._onChange)
    },
    render: function () {
      var index = 0
      var friends = safeMap(this.state.friends, function (friend) {
        return (
          <button type='button' className='friendLink' key={friend.id} onClick={this.handleClick} data-friend-id={friend.id}>
            {friend.name}
          </button>
        )
      }.bind(this))

      return (
        <FriendSection icon='fa fa-users' title='Friends'
          items={friends}
          onCreate={this.handleCreate}
          onDestroy={this.handleDestroy} />
      )
    },
    _onChange: function () {
      this.setState(this.getInitialState())
    },
    handleClick: function (event) {
      var friendId = event.target.dataset.friendId
      this.props.app.dispatcher.dispatch({
        key: 'VIEW_FRIEND',
        id: friendId
      })
    },
    handleCreate: function () {
      this.props.app.dispatcher.dispatch({
        key: 'CREATE_FRIEND'
      })
    },
    handleDestroy: function (index) {
      var friendId = this.state.friends[index].id
      this.props.app.dispatcher.dispatch({
        key: 'DESTROY_FRIEND',
        id: friendId
      })
    }
  })
}())
