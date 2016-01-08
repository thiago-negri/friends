;(function () {
  document.addEventListener('deviceready', _onDeviceReady, false)

  function _onDeviceReady () {
    var app = new App()
    ReactDOM.render(<RootView app={app} />, document.getElementById('app'))
  }
}())
