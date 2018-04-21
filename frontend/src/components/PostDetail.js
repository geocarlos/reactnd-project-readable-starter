import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchComments, selectPost, showPostDetails} from '../actions';
import {formatDate} from '../utils/general_functions';
import CommentList from './CommentList';
import NewComment from './NewComment';
import {editPost, votePost} from '../actions';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaCalendar from 'react-icons/lib/fa/calendar';

class PostDetail extends Component {

  componentWillMount(){
    // Fetch post from API only if list does not exist.
    if(this.props.posts.length === 0){
      this.props.showPost(`http://localhost:3001/posts/${this.props.postId}`);
      return;
    }
    // If list does exist, pick post from it
    this.props.getPostFromList(this.props.posts.filter(p => p.id === this.props.postId)[0])
  }

  componentDidMount() {
    this.props.getComments(`http://localhost:3001/posts/${this.props.postId}/comments`);
  }

  handleVote(option, post){

    const i = option === 'upVote' ? 1 : -1;

    // Update current copy of the PostDetail
    this.props.updateCurrentPost({...post, voteScore: post.voteScore + i});

    // Update voteScore on the server and the list
    this.props.processVote(`http://localhost:3001/posts/${post.id}`,{option, id: post.id});
  }

  render() {

    const {comments, post} = this.props;

    return (<div className="post-detail">
      {
        !post
          ? <h3>Post Not Found</h3>
          :   <div className='row'>
            <div className='voting col-md-1'>
              <div className='vote'>
                <button className='btn btn-light btn-sm' onClick={()=>this.handleVote('upVote', post)}>
                  <FaCaretUp />
                </button>
              </div>
              <div className='score text-center'>{post.voteScore}</div>
              <div className='vote'>
                <button className='btn btn-light btn-sm' onClick={()=>this.handleVote('downVote', post)}>
                  <FaCaretDown />
                </button>
              </div>
            </div>
            <div className='post-detail col-md'>
              <Link to={`/posts/${post.id}`}>
                <h4>{post.title}</h4>
              </Link>
              <div className='details'>
                <p>{post.body}</p>
                <FaCommentO /> {post.commentCount} <FaCalendar /> {formatDate(post.timestamp)}
              </div>
            </div>
          </div>
      }
      <p>
        <Link to='/'>Post List</Link>
      </p>
      <CommentList comments={comments}/>
      <NewComment />
    </div>)
  }
}

function mapStateToProps({postDetail, posts, comments}) {
  return {post: postDetail, posts, comments}
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: (url) => dispatch(fetchComments(url)),
    showPost: (url) => dispatch(selectPost(url)),
    getPostFromList: (post) => dispatch(showPostDetails(post)),
    processVote: (url, data) => dispatch(votePost(url, data)),
    updateCurrentPost: (post) => dispatch(showPostDetails(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
