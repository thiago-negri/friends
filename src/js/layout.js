/**
 * Application layout
 *
 * Properties
 * ----------
 *
 * title - Title to show at header
 * onBack - Callback function triggered when back button is pressed
 * children - Body to show (implicit)
 */
var Layout = (function () {
  'use strict'

  return React.createClass({
    render: function () {
      var backButton
      if (typeof this.props.onBack === 'function') {
        backButton = (
          <button type='button' onClick={this.handleBackClick}>
            <i className='fa fa-chevron-left'></i>
            Back
          </button>
        )
      } else {
        backButton = null
      }

      return (
        <div className='layout'>
          <div className='layoutHeader'>
            {backButton}
            <h1 className='layoutTitle'>
              {this.props.title}
            </h1>
          </div>
          <div className='layoutBody'>
            {this.props.children}
          </div>
        </div>
      )
    },
    handleBackClick: function (event) {
      this.props.onBack()
    }
  })
}())
