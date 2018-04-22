import React, {Component} from 'react';
import {formatDate} from '../utils/general_functions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {votePost, showPostDetails, disablePost} from '../actions';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaUser from 'react-icons/lib/fa/user';


class PostList extends Component {

  handleVote(option, post){
    this.props.processVote(`http://localhost:3001/posts/${post.id}`,{option, id: post.id});
  }

  handleEditModal(id){
    this.props.selectPostToEdit(this.props.posts.filter(p=>p.id===id)[0]);
    this.props.openEditPostModal();
  }

  handleDelete(id){
    this.props.deletePost(`http://localhost:3001/posts/${id}`);
  }

  render() {
    const {posts, category} = this.props;
    console.log(this.props)
    let postList = [];

    if (category && category !== 'all') {
      postList = posts.filter(post => post.category === category);
    } else {
      postList = posts;
    }
    return (<div className='post-list'>
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
                    <FaCommentO /> {post.commentCount} <FaCalendar /> {formatDate(post.timestamp)} <FaUser/> {post.author}
                    <button className='btn btn-light btn-sm' onClick={()=>this.handleEditModal(post.id)}>Edit</button>
                    <button className='btn btn-light btn-sm' onClick={()=>this.handleDelete(post.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </li>))
          }
          {(category && category !== 'all') && postList.length < 1 && <p>No posts in this category.</p>}
          {!category && posts.length < 1 && <p>No posts to show. Click on 'New Post' to create a new one.</p>}
        </ul>
      </div>
    </div>)
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

function mapDispatchToProps(dispatch){
  return {
    processVote: (url, data) => dispatch(votePost(url, data)),
    selectPostToEdit: (post) => dispatch(showPostDetails(post)),
    deletePost: (post) => dispatch(disablePost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
