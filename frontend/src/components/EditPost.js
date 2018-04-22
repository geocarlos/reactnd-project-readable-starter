import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {uuid, validateForm} from '../utils/general_functions';
import {connect} from 'react-redux';
import {showPostDetails, updatePost, checkFormErrors} from '../actions';

class EditPost extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: ''
  }

  componentDidMount(){
    if(this.props.errors){
      this.props.catchFormErrors(
        {...this.props.errors, ['author']: null, ['title']: null, ['body']: null}
      );
    }

    this.setState({
      title: this.props.post.title,
      body: this.props.post.body,
      author: this.props.post.author,
      category: this.props.post.category
    });

  }

  handleChange(e){
    console.log(e.target.name)
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    const newData = {
      id: this.props.post.id,
      title: this.refs.title.value,
      body: this.refs.body.value,
    }

    validateForm(newData)
    .then(()=> this.props.editPost(`http://localhost:3001/posts/${newData.id}`, newData))
    .then(()=> this.props.updatePostDetail({...this.props.post, title: newData.title, body: newData.body}))
    .then(()=> this.props.closeModal())
    .catch((errors) => this.props.catchFormErrors(errors));
  }

  resetError(input){
    const {errors} = this.props;
    if(errors[input] && this.refs[input].value){
      this.props.catchFormErrors({...errors, [input]: null});
    }
  }

  render(){

    const {errors, categories, post} = this.props;

    console.log('Errors in render: ', errors)

    return (
      <div className='new-post'>
        <h3>Edit Post</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>Author: {this.props.post.author}</div>
          <div>Category: {this.props.post.category}</div>
          <div>
            <input
              type='text'
              ref='title'
              name='title'
              value={this.state.title}
              onChange={this.handleChange.bind(this)}
              placeholder='title'
              className='col-lg'
              onKeyPress={()=>this.resetError('title')}  />
            {errors['title'] && <p className='text-danger'>{errors['title']}</p>}
          </div>
          <div>
            <textarea
              ref='body'
              name='body'
              value={this.state.body}
              onChange={this.handleChange.bind(this)}
              placeholder='body'
              className='col-lg'
              onKeyPress={()=>this.resetError('body')}  />
            {errors['body'] && <p className='text-danger'>{errors['body']}</p>}
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

function mapStateToProps({formErrors, categories, postDetail}){
  return {
    post: postDetail,
    errors: formErrors,
    categories
  }
}

function mapDispatchToProps(dispatch){
  return {
    editPost: (url, post) => dispatch(updatePost(url, post)),
    updatePostDetail: (post) => dispatch(showPostDetails(post)),
    catchFormErrors: (data) => dispatch(checkFormErrors(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);