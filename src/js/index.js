;(function () {
  document.addEventListener('deviceready', onDeviceReady, false)

  function onDeviceReady () {
    ReactDOM.render(
      <FriendList friends={[fran, carol]} />,
      document.getElementById('app')
    )
  }
}())
