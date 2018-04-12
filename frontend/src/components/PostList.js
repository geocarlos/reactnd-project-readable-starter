import React, {Component} from 'react';
import {formatDate} from '../utils/general_functions';
import {connect} from 'react-redux';
import {fetchPostList, showPostDetails} from '../actions';
import {Link} from 'react-router-dom';

class PostList extends Component {

  componentDidMount() {
    this.props.fetchPosts('http://localhost:3001/posts');
  }

  /*
    When navigating to PostDetail, this picks post from existing,
    instead of fecthing it from the API
  */
  selectPost(post){
    this.props.selectPostToShow(post)
  }

  render() {
    const {posts} = this.props;
    return (<div className='post-list'>
      <h1>Post List</h1>
      <ul>
        {
          posts.map(post => (<li key={post.id}>
            <Link onClick={this.selectPost(post)} to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>
              Score: {post.voteScore}
              | {post.commentCount}
              comments | {formatDate(post.timestamp)}
            </p>
          </li>))
        }
      </ul>
    </div>)
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (url) => dispatch(fetchPostList(url)),
    selectPostToShow: (post) => dispatch(showPostDetails(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
