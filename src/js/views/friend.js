var Friend = (function () {
  'use strict'

  return React.createClass({
    getInitialState: function () {
      var friend = this.props.app.friendStore.findById(this.props.id)
      var state = {
        name: friend.name,
        dates: safeMap(friend.dates, function (date) {
          return {
            date: date.date,
            label: date.label
          }
        }),
        likes: safeMap(friend.likes, function (like) {
          return like
        }),
        dislikes: safeMap(friend.dislikes, function (dislike) {
          return dislike
        }),
        focus: friend.focus
      }
      return state
    },
    render: function () {
      var dates = safeMap(this.state.dates, function (date, index) {
        var refName = 'dates' + index
        return (
          <div className='friendDate'>
            <input type='date' className='friendDateCalendar' value={date.date}
              placeholder='1989-08-27'
              onChange={this.handleDateCalendarChange}
              data-dates-index={index}
              ref={refName} />
            <input type='text' className='friendDateLabel' value={date.label}
              placeholder='Birthdate'
              onChange={this.handleDateLabelChange}
              data-dates-index={index} />
          </div>
        )
      }.bind(this))

      var likes = safeMap(this.state.likes, function (like, index) {
        var refName = 'likes' + index
        return (
          <input type='text' className='friendLikeLabel' value={like}
            placeholder='Icecream'
            onChange={this.handleLikeLabelChange}
            data-likes-index={index}
            ref={refName} />
        )
      }.bind(this))

      var dislikes = safeMap(this.state.dislikes, function (dislike, index) {
        var refName = 'dislikes' + index
        return (
          <input type='text' className='friendDislikeLabel' value={dislike}
            placeholder='Smoking'
            onChange={this.handleDislikeLabelChange}
            data-dislikes-index={index}
            ref={refName} />
        )
      }.bind(this))

      return (
        <div className='friend'>
          <div className='friendNameContainer'>
            <input className='friendName' type='text'
              value={this.state.name}
              onChange={this.handleNameChange}
              ref='name' />
          </div>
          <FriendSection title='Dates' icon='fa fa-calendar'
            items={dates} onCreate={this.handleDatesAddClick}
            onDestroy={this.handleDateDestroy} />
          <FriendSection title='Likes' icon='fa fa-thumbs-o-up'
            items={likes} onCreate={this.handleLikesAddClick}
            onDestroy={this.handleLikeDestroy} />
          <FriendSection title='Dislikes' icon='fa fa-thumbs-o-down'
            items={dislikes} onCreate={this.handleDislikesAddClick}
            onDestroy={this.handleDislikeDestroy} />
        </div>
      )
    },
    handleNameChange: function (event) {
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'CHANGE_NAME',
        value: event.target.value
      })
    },
    handleDatesAddClick: function () {
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'CREATE_DATE'
      })
    },
    handleDateCalendarChange: function (event) {
      var index = event.target.dataset.datesIndex
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'CHANGE_DATE_CALENDAR',
        index: index,
        value: event.target.value
      })
    },
    handleDateLabelChange: function (event) {
      var index = event.target.dataset.datesIndex
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'CHANGE_DATE_LABEL',
        index: index,
        value: event.target.value
      })
    },
    handleDateDestroy: function (index) {
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'DESTROY_DATE',
        index: index
      })
    },
    handleLikesAddClick: function () {
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'CREATE_LIKE'
      })
    },
    handleLikeLabelChange: function (event) {
      var index = event.target.dataset.likesIndex
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'CHANGE_LIKE_LABEL',
        index: index,
        value: event.target.value
      })
    },
    handleLikeDestroy: function (index) {
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'DESTROY_LIKE',
        index: index
      })
    },
    handleDislikesAddClick: function () {
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'CREATE_DISLIKE'
      })
    },
    handleDislikeLabelChange: function (event) {
      var index = event.target.dataset.dislikesIndex
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'CHANGE_DISLIKE_LABEL',
        index: index,
        value: event.target.value
      })
    },
    handleDislikeDestroy: function (index) {
      this.props.app.dispatcher.dispatch({
        key: 'EDIT_FRIEND',
        id: this.props.id,
        intention: 'DESTROY_DISLIKE',
        index: index
      })
    },
    componentDidMount: function () {
      this._setFocus()
      this.props.app.friendStore.observe(this._onChange)
    },
    componentDidUpdate: function () {
      this._setFocus()
    },
    componentWillUnmount: function () {
      this.props.app.friendStore.unobserve(this._onChange)
    },
    _setFocus: function () {
      var input
      if (this.state.focus) {
        input = ReactDOM.findDOMNode(this.refs[this.state.focus])
        if (input) {
          input.focus()
          input.select()
        }
      }
    },
    _onChange: function () {
      this.setState(this.getInitialState())
    }
  })
}())
