;(function () {
  document.addEventListener('deviceready', onDeviceReady, false)

  function onDeviceReady () {
    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('app')
    )
  }
}())
