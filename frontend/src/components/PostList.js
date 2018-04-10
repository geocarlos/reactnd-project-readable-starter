import React, {Component} from 'react';
import {formatDate} from '../utils/general_functions';
import {connect} from 'react-redux';
import {fetchPostList} from '../actions';

class PostList extends Component {
  componentDidMount(){
    this.props.fetchPosts('http://localhost:3001/posts');
  }
  render(){
    const {posts} = this.props;
    return (
      <div className='post-list'>
        <h1>Post List</h1>
        <ul>
          {posts.map(post=>(
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>
                Score: {post.voteScore} | {
                  post.commentCount} comments | {
                    formatDate(post.timestamp)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({posts}){
  return {
    posts
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchPosts: (url) => dispatch(fetchPostList(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
