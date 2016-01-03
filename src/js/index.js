;(function () {
  document.addEventListener('deviceready', onDeviceReady, false)

  function onDeviceReady () {
    ReactDOM.render(
      <FriendList
        friends={[fran, carol]}
        onSelect={onFriendSelect} />,
      document.getElementById('app')
    )
  }

  function onFriendSelect (friend) {
    ReactDOM.render(
      <Friend friend={friend} />,
      document.getElementById('app')
    )
  }
}())
