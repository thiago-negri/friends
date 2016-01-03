;(function () {
  document.addEventListener('deviceready', onDeviceReady, false)

  function onDeviceReady () {
    ReactDOM.render(
      <Friend friend={fran} />,
      document.getElementById('app')
    )
  }
}())
