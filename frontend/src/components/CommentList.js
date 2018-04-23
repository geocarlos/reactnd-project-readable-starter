import React, {Component} from 'react';
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaUser from 'react-icons/lib/fa/user';
import {formatDate} from '../utils/general_functions';

export default class CommentList extends Component {
  render(){
    const {comments} = this.props;
    return (
      <div className="comment-list">
        <div className='row'>
          <div className='col-md'><h4><FaCommentO/> comments</h4></div>
          <div className='col-md'><button
            onClick={()=>this.props.openModal()}
            className='btn btn-info btn-sm btn-new-post'
            >
            Comment on this post
          </button></div>
        </div>
        {Array.isArray(comments) && comments.length > 0
          ?
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <h5><FaUser/> {comment.author}:</h5>
                <p>{comment.body}</p>
                <p>{formatDate(comment.timestamp)}</p>
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
