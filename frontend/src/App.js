import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, Link} from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import {fetchPostList, fetchCategoryList} from './actions';
import {connect} from 'react-redux';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class AppRoot extends Component {

  state = {
    newPostModalOPen: false
  }

  openNewPostForm() {
    this.setState({newPostModalOPen: true})
  }

  closeNewPostForm() {
    this.setState({newPostModalOPen: false})
  }

  componentDidMount() {
    this.props.fetchCategories('http://localhost:3001/categories');
    this.props.fetchPosts('http://localhost:3001/posts');
  }

  render() {
    const {categories} = this.props;
    const {newPostModalOPen} = this.state;

    return (<div className="App">
      <header>
        <h1 className="App-title">Readable</h1>
        <div className='categories'>
          <ul>
            <li>
              <Link to='/'>all</Link>
            </li>
            {
              categories.map((cat, i) => (<li key={i}>
                <Link to={`/category/${cat.path}`}>{cat.name}</Link>
              </li>))
            }
            <li>
            <button
              onClick={()=>this.openNewPostForm()}
              className='btn btn-info btn-sm btn-new-post'
              >
              New Post
            </button>
            </li>
          </ul>
        </div>
      </header>
      <Route exact path='/' component={PostList}/>
      <Route path='/category/:category' render={({match}) => (
        <PostList
          category={match.params.category}
          />)}
        />
      <Route path='/posts/:id' render={({match}) => (<PostDetail postId={match.params.id}/>)}/>
      <Modal className='form-modal'
        overlayClassName='overlay'
        isOpen={newPostModalOPen}
        onRequestClose={this.closeNewPostForm.bind(this)}
        contentLabel='Modal'>
        <NewPost closeModal={()=>this.closeNewPostForm()} />
      </Modal>
    </div>);
  }
}

function mapStateToProps({categories}) {
  return {categories}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (url) => dispatch(fetchPostList(url)),
    fetchCategories: (url) => dispatch(fetchCategoryList(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
