import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchComments, showPostDetails, selectPost} from '../actions';
import {formatDate} from '../utils/general_functions';
import CommentList from './CommentList'

class PostDetail extends Component {

  componentWillMount(){
    this.props.showPost(`http://localhost:3001/posts/${this.props.postId}`);
  }

  componentDidMount() {
    this.props.getComments(`http://localhost:3001/posts/${this.props.postId}/comments`);
  }

  render() {

    const {comments, post} = this.props;

    return (<div className="post-detail">
      {
        !post
          ? <h3>Post Not Found</h3>
          : <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>
                Score: {post.voteScore}
                | {post.commentCount}
                comments | {formatDate(post.timestamp)}
              </p>
            </div>
      }
      <p>
        <Link to='/'>Post List</Link>
      </p>
      <CommentList comments={comments}/>
    </div>)
  }
}

function mapStateToProps({postDetail, posts, comments}) {
  return {post: postDetail, posts, comments}
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: (url) => dispatch(fetchComments(url)),
    showPost: (url) => dispatch(selectPost(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

// export default PostDetail
