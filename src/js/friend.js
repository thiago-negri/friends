var Friend = (function () {
  'use strict'

  return React.createClass({
    render: function () {
      var dates = safeMap(this.props.friend.dates, function (date) {
        return (
          <div className='friendDate'>
            <span className='friendDateCalendar'>{date.date}</span>
            &nbsp;
            <span classNmae='friendDateLabel'>{date.label}</span>
          </div>
        )
      })

      var likes = safeMap(this.props.friend.likes, function (like) {
        return (
          <li className='friendLike'>{like}</li>
        )
      })

      var dislikes = safeMap(this.props.friend.dislikes, function (dislike) {
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
