import React, {Component} from 'react';

export default class CommentList extends Component {
  render(){
    const {comments} = this.props;
    return (
      <div className="comment-list">
        <h4>Comments</h4>
        {Array.isArray(comments) && comments.length > 0
          ?
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <h5>{comment.author}:</h5>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
          :
          <div>
            <p>No comments yet...</p>
          </div>
        }
      </div>
    )
  }
}
