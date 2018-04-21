import React, {Component} from 'react';
import {formatDate} from '../utils/general_functions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {votePost} from '../actions';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaCalendar from 'react-icons/lib/fa/calendar';


class PostList extends Component {

  handleVote(option, post){

    // const i = vote === 'upVote' ? 1 : -1;
    // this.props.updateList({
    //   ...post, voteScore: post.voteScore + i
    // });
    this.props.processVote(`http://localhost:3001/posts/${post.id}`,{option, id: post.id});
  }

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
      <div className='posts'>
        <ul>
          {
            postList.map(post => (<li key={post.id}>
              <div className='post row'>
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
            </li>))
          }
          {postList.length < 1 && <p>No posts in this category.</p>}
        </ul>
      </div>
    </div>)
  }
}

function mapStateToProps({categories, posts}) {
  return {categories, posts}
}

function mapDispatchToProps(dispatch){
  return {
    processVote: (url, data) => dispatch(votePost(url, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
