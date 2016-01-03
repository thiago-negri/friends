;(function () {
  document.addEventListener('deviceready', onDeviceReady, false)

  function onDeviceReady () {
    showFriendList()
  }

  function showFriendList () {
    ReactDOM.render(
      <Layout title='Friends List'>
        <FriendList
          friends={[fran, carol]}
          onSelect={showFriend} />
      </Layout>,
      document.getElementById('app')
    )
  }

  function showFriend (friend) {
    ReactDOM.render(
      <Layout title='Friend' onBack={showFriendList}>
        <Friend friend={friend} />
      </Layout>,
      document.getElementById('app')
    )
  }
}())
