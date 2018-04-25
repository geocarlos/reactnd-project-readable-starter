import React, {Component} from 'react';
import {validateForm} from '../utils/general_functions';
import {connect} from 'react-redux';
import {showPostDetails, updatePost, checkFormErrors} from '../actions';

class EditPost extends Component {

  state = {
    title: '',
    body: ''
  }

  componentDidMount(){

    if(this.props.errors){
      this.props.catchFormErrors(
        {...this.props.errors, ['title']: null, ['body']: null}
      );
    }

    this.setState({
      title: this.props.post.title,
      body: this.props.post.body,
    });

  }

  handleChange(e){
    // Set state.body and state.title
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

    const {errors, post} = this.props;

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
            <div className='input-caption text-danger'>
              {errors['title'] && errors['title']}
            </div>
          </div>
          <div>
            <textarea
              ref='body'
              name='body'
              value={this.state.body}
              onChange={this.handleChange.bind(this)}
              placeholder='body'
              className='col-lg'
              rows='5'
              onKeyPress={()=>this.resetError('body')}  />
            <div className='input-caption text-danger'>
              {errors['body'] && errors['body']}
            </div>
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

function mapStateToProps({formErrors, postDetail}){
  return {
    post: postDetail,
    errors: formErrors
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
