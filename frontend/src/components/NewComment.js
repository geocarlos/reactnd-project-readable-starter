import React, {Component} from 'react';
import {uuid, validateForm} from '../utils/general_functions';
import {connect} from 'react-redux';
import {showPostDetails, editPost} from '../actions/posts';
import {createComment} from '../actions/comments';
import {checkFormErrors} from '../actions/errors';
import {bindActionCreators} from 'redux';

class NewComment extends Component {

  componentDidMount(){
    if(this.props.errors){
      this.props.checkFormErrors(
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
    .then(()=>this.props.createComment('http://localhost:3001/comments', comment))
    .then(()=>this.props.showPostDetails({
      ...this.props.post, commentCount: this.props.post.commentCount + 1
    })) // Update comment count of copy of individual post on this view.
    .then(()=> this.props.editPost(this.props.post)) // update in the list
    .then(()=> this.props.closeModal()) // Closes Modal
    .catch((errors) => this.props.checkFormErrors(errors));
  }

  resetError(input){
    const {errors} = this.props;
    if(errors[input] && this.refs[input].value){
      this.props.checkFormErrors({...errors, [input]: null});
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
  return bindActionCreators({
    createComment,
    showPostDetails,
    editPost,
    checkFormErrors
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
