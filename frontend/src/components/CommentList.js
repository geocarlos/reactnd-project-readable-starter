import React, {Component} from 'react';
import {connect} from 'react-redux';
import {voteComment, disableComment} from '../actions/comments';
import Modal from 'react-modal';
import EditComment from './EditComment';
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaUser from 'react-icons/lib/fa/user';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import {formatDate} from '../utils/general_functions';

class CommentList extends Component {

  state = {
    editCommentModalOpen: false,
    editingComment: null
  }

  openEditCommentForm() {
    this.setState({editCommentModalOPen: true})
  }

  closeEditCommentForm() {
    this.setState({editCommentModalOPen: false})
  }

  handleVote(option, comment) {
    this.props.processVote(`http://localhost:3001/comments/${comment.id}`, {option, id: comment.id});
  }

  handleEditModal(editingComment) {
    this.setState({editingComment})
    this.openEditCommentForm();
  }

  handleDelete(id) {
    this.props.deleteComment(`http://localhost:3001/comments/${id}`);
    this.props.handleDeleteComment(id) // update in the locally existing list
  }

  render() {

    const {comments} = this.props;

    const {editCommentModalOPen} = this.state;

    return (<div className="comment-list">
      <div className='row'>
        <div className='col-md'>
          <h4><FaCommentO/> {comments.length}
            {
              comments.length === 1
                ? 'comment'
                : 'comments'
            }</h4>
        </div>
        <div className='col-md text-right'>
          <button onClick={() => this.props.openNewModal()} className='btn btn-info btn-sm btn-new-post'>
            Comment on this post
          </button>
        </div>
      </div>

      {this.listComments(comments)}
      
      <Modal
        className='form-modal'
        overlayClassName='overlay'
        isOpen={editCommentModalOPen}
        onRequestClose={this.closeEditCommentForm.bind(this)}
        contentLabel='Modal'>
        <EditComment
          comment={this.state.editingComment}
          closeModal={() => this.closeEditCommentForm()}/>
      </Modal>
    </div>)
  }

  // Method to create list of Comments
  listComments(comments) {
    return (
      Array.isArray(comments) && comments.length > 0
        ? <ul>
            {
              comments.map(comment => (<li key={comment.id}>
                <div className='comment row'>
                  <div className='voting col-md-1'>
                    <div className='vote'>
                      <button className='btn btn-light btn-sm text-success' onClick={() => this.handleVote('upVote', comment)}>
                        <FaCaretUp/>
                      </button>
                    </div>
                    <div className={`${comment.voteScore > 0
                        ? 'text-success'
                        : 'text-danger'} score text-center`}>
                      {comment.voteScore}
                    </div>
                    <div className='vote'>
                      <button className='btn btn-light btn-sm text-danger' onClick={() => this.handleVote('downVote', comment)}>
                        <FaCaretDown/>
                      </button>
                    </div>
                  </div>
                  <div>
                    <h5><FaUser/> {comment.author}:</h5>
                    <p>{comment.body}</p>
                    <div className='text-center comment-details'>
                      {formatDate(comment.timestamp)}
                      <button className='btn btn-light btn-sm' onClick={() => this.handleEditModal(comment)}>Edit</button>
                      <button className='btn btn-light btn-sm' onClick={() => this.handleDelete(comment.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </li>))
            }
          </ul>
        : <div className='comment'>
            <p>No comments yet...</p>
          </div>
    )
  }

}

function mapStateToProps({comments, postDetail}) {
  return {comments, post: postDetail}
}

function mapDispatchToProps(dispatch) {
  return {
    processVote: (url, data) => dispatch(voteComment(url, data)),
    deleteComment: (comment) => dispatch(disableComment(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
