var Friend = (function () {
  'use strict'

  return React.createClass({
    getInitialState: function () {
      var state = {
        name: this.props.friend.name,
        dates: safeMap(this.props.friend.dates, function (date) {
          return {
            date: date.date,
            label: date.label
          }
        }),
        likes: safeMap(this.props.friend.likes, function (like) {
          return like
        }),
        dislikes: safeMap(this.props.friend.dislikes, function (dislike) {
          return dislike
        })
      }
      return state
    },
    render: function () {
      var dates = safeMap(this.state.dates, function (date, index) {
        return (
          <div className='friendDate'>
            <input type='date' className='friendDateCalendar' value={date.date}
              placeholder='1989-08-27'
              onChange={this.handleDateCalendarChange}
              data-dates-index={index} />
            <input type='text' className='friendDateLabel' value={date.label}
              placeholder='Birthdate'
              onChange={this.handleDateLabelChange}
              data-dates-index={index} />
          </div>
        )
      }.bind(this))

      var likes = safeMap(this.state.likes, function (like, index) {
        return (
          <input type='text' className='friendLikeLabel' value={like}
            placeholder='Icecream'
            onChange={this.handleLikeLabelChange}
            data-likes-index={index} />
        )
      }.bind(this))

      var dislikes = safeMap(this.state.dislikes, function (dislike, index) {
        return (
          <input type='text' className='friendDislikeLabel' value={dislike}
            placeholder='Smoking'
            onChange={this.handleDislikeLabelChange}
            data-dislikes-index={index} />
        )
      }.bind(this))

      return (
        <div className='friend'>
          <input className='friendName' type='text'
            value={this.state.name}
            onChange={this.handleNameChange} />
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
      this.props.friend.name = event.target.value
      this.setState(this.getInitialState())
    },
    handleDatesAddClick: function () {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var day = now.getDate()
      var fix = function (d) { return (d < 10 ? '0' + d : '' + d) }
      var nowAsString = year + '-' + fix(month) + '-' + fix(day)
      var newDate = {
        date: nowAsString
      }
      if (Array.isArray(this.props.friend.dates)) {
        this.props.friend.dates.unshift(newDate)
      } else {
        this.props.friend.dates = [newDate]
      }
      this.setState(this.getInitialState())
    },
    handleDateCalendarChange: function (event) {
      var index = event.target.dataset.datesIndex
      this.props.friend.dates[index].date = event.target.value
      this.setState(this.getInitialState())
    },
    handleDateLabelChange: function (event) {
      var index = event.target.dataset.datesIndex
      this.props.friend.dates[index].label = event.target.value
      this.setState(this.getInitialState())
    },
    handleDateDestroy: function (index) {
      this.props.friend.dates.splice(index, 1)
      this.setState(this.getInitialState())
    },
    handleLikesAddClick: function () {
      var newLike = ''
      if (Array.isArray(this.props.friend.likes)) {
        this.props.friend.likes.unshift(newLike)
      } else {
        this.props.friend.likes = [newLike]
      }
      this.setState(this.getInitialState())
    },
    handleLikeLabelChange: function (event) {
      var index = event.target.dataset.likesIndex
      this.props.friend.likes[index] = event.target.value
      this.setState(this.getInitialState())
    },
    handleLikeDestroy: function (index) {
      this.props.friend.likes.splice(index, 1)
      this.setState(this.getInitialState())
    },
    handleDislikesAddClick: function () {
      var newDislike = ''
      if (Array.isArray(this.props.friend.dislikes)) {
        this.props.friend.dislikes.unshift(newDislike)
      } else {
        this.props.friend.dislikes = [newDislike]
      }
      this.setState(this.getInitialState())
    },
    handleDislikeLabelChange: function (event) {
      var index = event.target.dataset.dislikesIndex
      this.props.friend.dislikes[index] = event.target.value
      this.setState(this.getInitialState())
    },
    handleDislikeDestroy: function (index) {
      this.props.friend.dislikes.splice(index, 1)
      this.setState(this.getInitialState())
    }
  })
}())
