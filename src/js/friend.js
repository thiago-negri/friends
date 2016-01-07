var Friend = (function () {
  'use strict'

  return React.createClass({
    getInitialState: function () {
      return {
        name: this.props.friend.name,
        dates: this.props.friend.dates,
        likes: this.props.friend.likes,
        dislikes: this.props.friend.dislikes
      }
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
          <li className='friendLike'>
            <input type='text' className='friendLikeLabel' value={like}
              onChange={this.handleLikeLabelChange}
              data-likes-index={index} />
          </li>
        )
      }.bind(this))

      var dislikes = safeMap(this.state.dislikes, function (dislike, index) {
        return (
          <li className='friendDislike'>
            <input type='text' className='friendDislikeLabel' value={dislike}
              onChange={this.handleDislikeLabelChange}
              data-dislikes-index={index} />
          </li>
        )
      }.bind(this))

      return (
        <div className='friend'>
          <input className='friendName' type='text'
            value={this.state.name}
            onChange={this.handleNameChange} />
          <div className='friendDates'>
            <h3><i className='fa fa-calendar'></i></h3>
            <button type='button' className='friendDatesAddButton'
              onClick={this.handleDatesAddClick}>
              <i className='fa fa-plus'></i>
            </button>
            {dates}
          </div>
          <div className='friendLikes'>
            <h3><i className='fa fa-thumbs-o-up'></i></h3>
            <ul className='friendLikesList'>
              {likes}
            </ul>
          </div>
          <div className='friendDislikes'>
            <h3><i className='fa fa-thumbs-o-down'></i></h3>
            <ul className='friendDislikesList'>
              {dislikes}
            </ul>
          </div>
        </div>
      )
    },
    handleNameChange: function (event) {
      this.props.friend.name = event.target.value
      this.setState(this.getInitialState())
    },
    handleDatesAddClick: function (event) {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var day = now.getDate()
      var fix = function (d) { return (d < 10 ? '0' + d : '' + d) }
      var nowAsString = year + '-' + fix(month) + '-' + fix(day)
      this.props.friend.dates.unshift({
        date: nowAsString
      })
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
    handleLikeLabelChange: function (event) {
      var index = event.target.dataset.likesIndex
      this.props.friend.likes[index] = event.target.value
      this.setState(this.getInitialState())
    },
    handleDislikeLabelChange: function (event) {
      var index = event.target.dataset.dislikesIndex
      this.props.friend.dislikes[index] = event.target.value
      this.setState(this.getInitialState())
    }
  })
}())
