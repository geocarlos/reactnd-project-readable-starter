import React, {Component} from 'react';
import {uuid, validateForm} from '../utils/general_functions';
import {connect} from 'react-redux';
import {createPost, checkFormErrors, showPostDetails, showComments} from '../actions';
import {push} from 'react-router-redux';

class NewPost extends Component {

  componentDidMount(){
    if(this.props.errors){
      this.props.catchFormErrors(
        {...this.props.errors, ['author']: null, ['title']: null, ['body']: null}
      );
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: this.refs.title.value,
      body: this.refs.body.value,
      author: this.refs.author.value,
      category: this.refs.category.value,
    }

    validateForm(post)
    .then(()=> this.props.addPost('http://localhost:3001/posts', post))
    .then(()=> this.props.closeModal())
    .then(()=> this.props.setPostDetail({...post, voteScore: 1, commentCount: 0})) // new post to postDetail
    .then(()=> this.props.resetCommentList([])) // Clear current comment list
    .then(()=> this.props.goToPost(post.id)) // Take user to new post
    .catch((errors) => this.props.catchFormErrors(errors));
  }

  resetError(input){
    const {errors} = this.props;
    if(errors[input] && this.refs[input].value){
      this.props.catchFormErrors({...errors, [input]: null});
    }
  }

  render(){

    const {errors, categories} = this.props;

    return (
      <div className='new-post'>
        <h3>Enter Your New Post</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <input
              type='text' ref='author' placeholder='author'
              className='col-lg'
              onKeyPress={()=>this.resetError('author')}  />
            <div className='input-caption text-danger'>
              {errors['author'] && errors['author']}
            </div>
          </div>
          <div>
            <input
              type='text' ref='title' placeholder='title'
              className='col-lg'
              onKeyPress={()=>this.resetError('title')}  />
            <div className='input-caption text-danger'>
              {errors['title'] && errors['title']}
            </div>
          </div>
          <div>
            <textarea rows='5' ref='body' placeholder='body'
              className='col-lg'
              onKeyPress={()=>this.resetError('body')}  />
            <div className='input-caption text-danger'>
              {errors['body'] && errors['body']}
            </div>
          </div>
          <div>
            <select ref='category'
              className='col-lg'
              onChange={()=>this.resetError('category')}>
              {categories.map((cat,i) => (
                <option key={i}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className='buttons'>
            <input className='btn btn-primary' value="Submit" type='submit' />
            <button onClick={()=>this.props.closeModal()} className='btn btn-danger'>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps({formErrors, categories}){
  return {
    errors: formErrors,
    categories
  }
}

function mapDispatchToProps(dispatch){
  return {
    addPost: (url, post) => dispatch(createPost(url, post)),
    catchFormErrors: (data) => dispatch(checkFormErrors(data)),
    setPostDetail: (post) => dispatch(showPostDetails(post)),
    resetCommentList: (arr) => dispatch(showComments(arr)), // Clear comment list
    goToPost: (id)=>dispatch(push(`/posts/${id}`))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
