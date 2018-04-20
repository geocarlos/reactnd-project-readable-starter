import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {uuid, validateForm} from '../utils/general_functions';
import {connect} from 'react-redux';
import {createPost, checkFormErrors} from '../actions';

class NewPost extends Component {

  componentDidMount(){
    if(this.props.errors){
      this.props.catchFormErrors(
        {...this.props.errors, ['title']: null, ['body']: null}
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
      author: 'geowildcat',
      category: this.refs.category.value,
    }

    validateForm(post)
    .then(()=>this.props.addPost('http://localhost:3001/posts', post))
    .catch((errors)=> this.props.catchFormErrors(errors));
  }

  resetError(input){
    const {errors} = this.props;
    if(errors[input] && this.refs[input].value){
      this.props.catchFormErrors({...errors, [input]: null});
    }
  }

  render(){

    const {errors} = this.props;

    console.log('Errors in render: ', errors)

    const categories = [
      'react', 'redux', 'udacity'
    ]

    return (
      <div className='new-post'>
        <h1>New Post</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <input
              type='text' ref='title' placeholder='title'
              className='col-lg'
              onKeyPress={()=>this.resetError('title')}  />
            {errors['title'] && <p className='text-danger'>{errors['title']}</p>}
          </div>
          <div>
            <textarea ref='body' placeholder='content'
              className='col-lg'
              onKeyPress={()=>this.resetError('body')}  />
            {errors['body'] && <p className='text-danger'>{errors['body']}</p>}
          </div>
          <div>
            <select ref='category'
              className='col-lg'
              onChange={()=>this.resetError('category')}>
              {categories.map((cat,i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>
            {errors['category'] && <p className='text-danger'>{errors['category']}</p>}
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

function mapStateToProps({formErrors}){
  return {
    errors: formErrors
  }
}

function mapDispatchToProps(dispatch){
  return {
    addPost: (url, post) => dispatch(createPost(url, post)),
    catchFormErrors: (data) => dispatch(checkFormErrors(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
