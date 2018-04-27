import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatDate} from '../utils/general_functions';
import CommentList from './CommentList';
import NewComment from './NewComment';
import {fetchComments} from '../actions/comments';
import * as postActions from '../actions/posts';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaUser from 'react-icons/lib/fa/user';

class PostDetail extends Component {

  state = {
    newCommentModalOPen: false
  }

  openNewCommentForm() {
    this.setState({newCommentModalOPen: true})
  }

  closeNewCommentForm() {
    this.setState({newCommentModalOPen: false})
  }

  componentWillMount() {
    // Fetch post from API only if list does not exist.
    if (this.props.posts.length === 0) {
      this.props.selectPost(`http://localhost:3001/posts/${this.props.postId}`);
      return;
    }

    const listPost = this.props.posts.filter(p => p.id === this.props.postId)[0];

    // If navigating from a newly created post, listPost with the given id
    // won't be available yet. Thus user is shown a copy sent by the NewPost component.
    if (listPost) {
      this.props.showPostDetails(listPost);
    }

  }

  componentDidMount() {
    this.props.fetchComments(`http://localhost:3001/posts/${this.props.postId}/comments`);
  }

  handleVote(option, post) {

    const i = option === 'upVote' ? 1 : -1;

    // Update current copy of the PostDetail
    this.props.showPostDetails({
      ...post,
      voteScore: post.voteScore + i
    });

    // Update voteScore on the server and the list
    this.props.votePost(`http://localhost:3001/posts/${post.id}`, {option, id: post.id});
  }

  handleDeletePost(id) {
      this.props.selectedPost(id);
      this.props.openDeleteModal();
  }

  handleDeleteComment(id){
    this.props.showPostDetails({
      ...this.props.post, commentCount: this.props.post.commentCount - 1
    });
    this.props.editPost({
      ...this.props.post, commentCount: this.props.post.commentCount - 1
    });
  }

  render() {

    const {newCommentModalOPen} = this.state;

    const {post} = this.props;

    return (<div className="post-detail">
      {
        !post.id
          ? <h3 className='text-center'>Page Not Found</h3>
          : <div className='post'>
              <div className='row'>
                <div className='voting col-md-1'>
                  <div className='vote'>
                    <button className='btn btn-light btn-sm text-success' onClick={() => this.handleVote('upVote', post)}>
                      <FaCaretUp/>
                    </button>
                  </div>
                  <div className={`${post.voteScore > 0 ? 'text-success' : 'text-danger'} score text-center`}>
                    {post.voteScore}
                  </div>
                  <div className='vote'>
                    <button className='btn btn-light btn-sm text-danger' onClick={() => this.handleVote('downVote', post)}>
                      <FaCaretDown/>
                    </button>
                  </div>
                </div>
                <div className='post-detail col-md'>
                  <h4>{post.title}</h4>
                  <div className='details'>
                    <div className='text-info'>
                      <FaCalendar/> {formatDate(post.timestamp)}
                      <FaUser/> {post.author}
                      <button
                        className='btn btn-light btn-sm'
                        onClick={() => this.props.openEditPostModal()}>Edit</button>
                      <button
                        className='btn btn-light btn-sm'
                        onClick={() => this.handleDeletePost(post.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='post-body'>{post.body}</div>
            </div>
      }
      {post.id && <CommentList
        handleDeleteComment={this.handleDeleteComment.bind(this)}
        openNewModal={() => this.openNewCommentForm()}
        openEditModal={() => this.openEditCommentForm()}/>}
      <Modal className='form-modal'
        overlayClassName='overlay'
        isOpen={newCommentModalOPen}
        onRequestClose={this.closeNewCommentForm.bind(this)}
        contentLabel='Modal'>
        <NewComment closeModal={() => this.closeNewCommentForm()}/>
      </Modal>
    </div>)
  }
}

function mapStateToProps({postDetail, posts, comments, history}) {
  return {post: postDetail, posts, comments, history}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...postActions,
    fetchComments
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
