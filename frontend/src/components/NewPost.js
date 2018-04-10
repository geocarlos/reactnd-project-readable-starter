import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class NewPost extends Component {
  render(){
    return (
      <div className='new-post'>
        <h1>New Post</h1>
        <Link to='/'>Post List</Link>
      </div>
    )
  }
}

export default connect()(NewPost);
