import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class PostDetail extends Component {
  render(){
    return (
      <div className='post-detail'>
        <h1>Post Detail</h1>
        <Link to='/'>Post List</Link>
      </div>
    )
  }
}

export default connect()(PostDetail);
