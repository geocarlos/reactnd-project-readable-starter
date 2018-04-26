import React, {Component} from 'react';
import {validateForm} from '../utils/general_functions';
import {connect} from 'react-redux';
import {updateComment, checkFormErrors} from '../actions';

class EditComment extends Component {

  state = {
    body: '',
  }

  componentDidMount(){
    if(this.props.errors){
      this.props.catchFormErrors(
        {...this.props.errors, ['body']: null}
      );
    }

    this.setState({
      body: this.props.comment.body,
    });

  }

  handleChange(e){
    // Set state.body
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    const newData = {
      id: this.props.comment.id,
      timestamp: Date.now(),
      body: this.refs.body.value,
    }

    validateForm(newData)
    .then(()=> this.props.editComment(`http://localhost:3001/comments/${newData.id}`, newData))
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

    const {errors} = this.props;

    return (
      <div className='edit-comment'>
        <h3>Edit comment</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
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

function mapStateToProps({formErrors, comments}){
  return {
    comments,
    errors: formErrors
  }
}

function mapDispatchToProps(dispatch){
  return {
    editComment: (url, comment) => dispatch(updateComment(url, comment)),
    catchFormErrors: (data) => dispatch(checkFormErrors(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
