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
    const {posts, category} = this.props;

    let postList = [];

    const categories = [
      'all', 'react', 'redux', 'udacity'
    ]

    if(category && category !== 'all'){
      postList = posts.filter(post => post.category === category);
    } else {
      postList = posts;
    }

    console.log(postList)

    console.log(category)
    return (<div className='post-list'>
      <div className='categories'>
        <ul>
          {categories.map((cat,i)=>(
            <li key={i}><Link to={`/category/${cat}`}>{cat}</Link></li>
          ))}
        </ul>
      </div>
      <ul>
        {
          postList.map(post => (<li key={post.id}>
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
        {postList.length < 1 && <p>No posts in this category.</p>}
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
