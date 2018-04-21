import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {uuid, validateForm} from '../utils/general_functions';
import {connect} from 'react-redux';
import {createComment, checkFormErrors} from '../actions';

class NewComment extends Component {

  componentDidMount(){
    if(this.props.errors){
      this.props.catchFormErrors(
        {...this.props.errors, ['body']: null}
      );
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const comment = {
      id: uuid(),
      timestamp: Date.now(),
      body: this.refs.body.value,
      author: 'geowildcat',
      parentId: this.props.post.id,
    }

    validateForm(comment)
    .then(()=>this.props.addComment('http://localhost:3001/comments', comment))
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
        <h1>Comment on this post</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <textarea ref='body' placeholder='body'
              className='col-lg'
              onKeyPress={()=>this.resetError('body')}  />
            {errors['body'] && <p className='text-danger'>{errors['body']}</p>}
          </div>
          <div className='buttons'>
            <input className='btn btn-primary' value="Submit" type='submit' />
            <Link to='/'><button className='btn btn-danger'>Cancel</button></Link>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps({formErrors, postDetail}){
  return {
    errors: formErrors,
    post: postDetail
  }
}

function mapDispatchToProps(dispatch){
  return {
    addComment: (url, comment) => dispatch(createComment(url, comment)),
    catchFormErrors: (data) => dispatch(checkFormErrors(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
