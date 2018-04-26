import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments, selectPost, showPostDetails} from '../actions';
import {formatDate} from '../utils/general_functions';
import CommentList from './CommentList';
import NewComment from './NewComment';
import {votePost, selectedPost} from '../actions';
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
      this.props.showPost(`http://localhost:3001/posts/${this.props.postId}`);
      return;
    }

    const listPost = this.props.posts.filter(p => p.id === this.props.postId)[0];

    // If navigating from a newly created post, listPost with the given id
    // won't be available yet. Thus user is shown a copy sent by the NewPost component.
    if (listPost) {
      this.props.getPostFromList(listPost);
    }

  }

  componentDidMount() {
    this.props.getComments(`http://localhost:3001/posts/${this.props.postId}/comments`);
  }

  handleVote(option, post) {

    const i = option === 'upVote'
      ? 1
      : -1;

    // Update current copy of the PostDetail
    this.props.updateCurrentPost({
      ...post,
      voteScore: post.voteScore + i
    });

    // Update voteScore on the server and the list
    this.props.processVote(`http://localhost:3001/posts/${post.id}`, {option, id: post.id});
  }

  handleDeletePost(id) {
      this.props.deletePost(id);
      this.props.openDeleteModal();
  }

  render() {

    const {newCommentModalOPen} = this.state;

    const {post} = this.props;

    return (<div className="post-detail">
      {
        !post
          ? <h3>Post Not Found</h3>
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
      <CommentList
        openNewModal={() => this.openNewCommentForm()}
        openEditModal={() => this.openEditCommentForm()}/>
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
  return {
    getComments: (url) => dispatch(fetchComments(url)),
    showPost: (url) => dispatch(selectPost(url)),
    getPostFromList: (post) => dispatch(showPostDetails(post)),
    processVote: (url, data) => dispatch(votePost(url, data)),
    updateCurrentPost: (post) => dispatch(showPostDetails(post)),
    deletePost: (post) => dispatch(selectedPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
