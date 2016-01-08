var RootView = (function () {
  'use strict'

  return React.createClass({
    render: function () {
      switch (this.state.route.view) {
        case 'friend-list':
          return this.renderFriendList()

        case 'friend':
          return this.renderFriend()
      }
    },
    renderFriendList: function () {
      return (
        <Layout title='Friend List'>
          <FriendList app={this.props.app} />
        </Layout>
      )
    },
    renderFriend: function () {
      return (
        <Layout title='Friend' onBack={this._goToIndex}>
          <Friend app={this.props.app} id={this.state.route.id} />
        </Layout>
      )
    },
    getInitialState: function () {
      var state = {
        route: this.props.app.routeStore.currentRoute()
      }
      return state
    },
    componentDidMount: function () {
      this.props.app.routeStore.observe(this._onChange)
    },
    componentWillUnmount: function () {
      this.props.app.routeStore.unobserve(this._onChange)
    },
    _onChange: function () {
      this.setState(this.getInitialState())
    },
    _goToIndex: function () {
      this.props.app.dispatcher.dispatch({
        key: 'VIEW_FRIEND_LIST'
      })
    }
  })
}())
