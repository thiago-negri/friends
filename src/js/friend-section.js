/**
 * A section inside Friend view.
 *
 * Properties
 * ----------
 *
 * title - Section title
 * icon - Section icon
 * items - Rendered items to display
 * onCreate - Callback triggered when user wants to create a new entry
 * onDestroy - Callback triggered when user want to destroy an entry
 */
var FriendSection = (function () {
  'use strict'

  return React.createClass({
    render: function () {
      var items = safeMap(this.props.items, function (item, index) {
        return (
          <li data-index={index}>
            {item}
            <button type='button' onClick={this.handleDestroyClick}>
              <i className='fa fa-trash-o'></i>
            </button>
          </li>
        )
      }.bind(this))
      return (
        <div className='list'>
          <h3><i className={this.props.icon}></i> {this.props.title}</h3>
          <button type='button' className='create'
            onClick={this.handleCreateClick}>
            <i className='fa fa-plus'></i>
          </button>
          <ul>
            {items}
          </ul>
        </div>
      )
    },
    handleCreateClick: function () {
      this.props.onCreate()
    },
    handleDestroyClick: function (event) {
      var node = event.target
      var index = node.dataset.index
      while (typeof index === 'undefined' && node.parentNode != null) {
        node = node.parentNode
        index = node.dataset.index
      }
      this.props.onDestroy(index)
    }
  })
}())
