import React, {Component} from 'react';
import {connect} from 'react-redux';

class PostList extends Component {
  componentDidMount(){
    console.log("componentDidMount")
  }
  render(){
    return (
      <div className='post-list'>
        <h1>Post List</h1>
      </div>
    )
  }
}

export default connect()(PostList);
