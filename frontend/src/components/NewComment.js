import React, {Component} from 'react';
import {uuid, validateForm} from '../utils/general_functions';
import {connect} from 'react-redux';
import {createComment, showPostDetails, checkFormErrors, editPost} from '../actions';

class NewComment extends Component {

  componentDidMount(){
    if(this.props.errors){
      this.props.catchFormErrors(
        {...this.props.errors, ['author']: null, ['body']: null}
      );
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const comment = {
      id: uuid(),
      timestamp: Date.now(),
      body: this.refs.body.value,
      author: this.refs.author.value,
      parentId: this.props.post.id,
    }

    validateForm(comment)
    .then(()=>this.props.addComment('http://localhost:3001/comments', comment))
    .then(()=>this.props.updateCommentCount({
      ...this.props.post, commentCount: this.props.comments.length
    })) // Update comment count of copy of individual post on this view.
    .then(()=>this.props.updateList(this.props.post)) // update in the list
    .then(()=> this.props.closeModal()) // Closes Modal
    .catch((errors) => this.props.catchFormErrors(errors));
  }

  resetError(input){
    const {errors} = this.props;
    if(errors[input] && this.refs[input].value){
      this.props.catchFormErrors({...errors, [input]: null});
    }
  }

  render(){

    const {errors} = this.props;

    return (
      <div className='new-post'>
        <h3>Enter your comment</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <input type='text' ref='author' placeholder='author'
              className='col-lg'
              onKeyPress={()=>this.resetError('author')}  />
            <div className='input-caption text-danger'>
              {errors['author'] && errors['author']}
            </div>
          </div>
          <div>
            <textarea rows='8' ref='body' placeholder='body'
              className='col-lg'
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

function mapStateToProps({formErrors, postDetail, comments}){
  return {
    errors: formErrors,
    post: postDetail,
    comments
  }
}

function mapDispatchToProps(dispatch){
  return {
    addComment: (url, comment) => dispatch(createComment(url, comment)),
    updateCommentCount: (post) => dispatch(showPostDetails(post)),
    updateList: (post) => dispatch(editPost(post)),
    catchFormErrors: (data) => dispatch(checkFormErrors(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
