import React, {Component} from 'react';
import {formatDate} from '../utils/general_functions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class PostList extends Component {

  render() {
    const {posts, category, categories} = this.props;

    let postList = [];

    if (category && category !== 'all') {
      postList = posts.filter(post => post.category === category);
    } else {
      postList = posts;
    }

    return (<div className='post-list'>
      <div className='categories'>
        <ul>
          <li>
            <Link to='/'>all</Link>
          </li>
          {
            categories.map((cat, i) => (<li key={i}>
              <Link to={`/category/${cat.path}`}>{cat.name}</Link>
            </li>))
          }
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

function mapStateToProps({categories, posts}) {
  return {categories, posts}
}

export default connect(mapStateToProps)(PostList);
