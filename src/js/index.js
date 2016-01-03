;(function () {
  document.addEventListener('deviceready', onDeviceReady, false)

  function onDeviceReady () {
    ReactDOM.render(
      <Layout title='Friends List'>
        <FriendList
          friends={[fran, carol]}
          onSelect={onFriendSelect} />
      </Layout>,
      document.getElementById('app')
    )
  }

  function onFriendSelect (friend) {
    ReactDOM.render(
      <Layout title='Friend'>
        <Friend friend={friend} />
      </Layout>,
      document.getElementById('app')
    )
  }
}())
