import React, {Component} from 'react';
import {connect} from 'react-redux';
import {voteComment} from '../actions';
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaUser from 'react-icons/lib/fa/user';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import {formatDate} from '../utils/general_functions';

class CommentList extends Component {

  handleVote(option, comment){
    this.props.processVote(`http://localhost:3001/comments/${comment.id}`,{option, id: comment.id});
  }

  render(){
    const {comments} = this.props;
    return (
      <div className="comment-list">
        <div className='row'>
          <div className='col-md'><h4><FaCommentO/> {comments.length} comments</h4></div>
          <div className='col-md text-right'><button
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
                <div className='comment row'>
                  <div className='voting col-md-1'>
                    <div className='vote'>
                      <button className='btn btn-light btn-sm' onClick={()=>this.handleVote('upVote', comment)}>
                        <FaCaretUp />
                      </button>
                    </div>
                    <div className='score text-center'>{comment.voteScore}</div>
                    <div className='vote'>
                      <button className='btn btn-light btn-sm' onClick={()=>this.handleVote('downVote', comment)}>
                        <FaCaretDown />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h5><FaUser/> {comment.author}:</h5>
                    <p>{comment.body}</p>
                    <p>{formatDate(comment.timestamp)}</p>
                  </div>
                </div>
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

function mapDispatchToProps(dispatch){
  return {
    processVote: (url, data) => dispatch(voteComment(url, data)),
  }
}

export default connect(null, mapDispatchToProps)(CommentList);
