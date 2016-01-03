/**
 * Application layout
 *
 * Properties
 * ----------
 *
 * title - Title to show at header
 * children - Body to show (implicit)
 */
var Layout = (function () {
  'use strict'

  return React.createClass({
    render: function () {
      return (
        <div className='layout'>
          <div className='layoutHeader'>
            <h1 className='layoutTitle'>
              {this.props.title}
            </h1>
          </div>
          <div className='layoutBody'>
            {this.props.children}
          </div>
        </div>
      )
    }
  })
}())
