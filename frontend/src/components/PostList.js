import React, {Component} from 'react';
import {formatDate} from '../utils/general_functions';
import {connect} from 'react-redux';
import {fetchPostList} from '../actions';
import {Link} from 'react-router-dom';

class PostList extends Component {

  // componentDidMount() {
  //   this.props.fetchPosts('http://localhost:3001/posts');
  // }

  render() {
    let {posts} = this.props;

    const categories = [
      'all', 'react', 'redux', 'udacity'
    ]
    return (<div className='post-list'>
      <h1>Post List</h1>
      <div className='categories'>
        <ul>
          {categories.map((cat,i)=>(
            <li key={i}><Link to={`/category/${cat}`}>{cat}</Link></li>
          ))}
        </ul>
      </div>
      <ul>
        {
          posts.map(post => (<li key={post.id}>
            <Link to={`/posts/${post.id}`}>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
// export default PostList;
