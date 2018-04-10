import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {uuid} from '../utils/general_functions';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class NewPost extends Component {

  handleSubmit(e){
    e.preventDefault();
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: this.refs.title.value,
      body: this.refs.body.value,
      author: 'geowildcat',
      category: this.refs.category.value,
    }
    this.props.addPost('http://localhost:3001/posts', post);
  }

  render(){
    return (
      <div className='new-post'>
        <h1>New Post</h1>
        <Link to='/'>Post List</Link>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <input type='text' ref='title' placeholder='title' />
          </div>
          <div>
            <textarea ref='body' placeholder='content' />
          </div>
          <div>
            <input type='text' ref='category' placeholder='category' />
          </div>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    addPost: (url, post) => dispatch(createPost(url, post))
  }
}

export default connect(null, mapDispatchToProps)(NewPost);
