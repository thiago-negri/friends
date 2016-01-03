var Friend = (function () {
  'use strict'

  return React.createClass({
    render: function () {
      var dates = this.props.friend.dates.map(function (date) {
        return (
          <div className='friendDate'>
            <span className='friendDateCalendar'>{date.date}</span>
            &nbsp;
            <span classNmae='friendDateLabel'>{date.label}</span>
          </div>
        )
      })
      var likes = this.props.friend.likes.map(function (like) {
        return (
          <li className='friendLike'>{like}</li>
        )
      })
      var dislikes = this.props.friend.dislikes.map(function (dislike) {
        return (
          <li className='friendDislike'>{dislike}</li>
        )
      })

      return (
        <div className='friend'>
          <h2 className='friendName'>{this.props.friend.name}</h2>
          <div className='friendDates'>
            <h3><i className='fa fa-calendar'></i></h3>
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
    }
  })
}())
