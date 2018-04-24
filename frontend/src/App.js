import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, Link} from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import {fetchPostList, fetchCategoryList} from './actions';
import {connect} from 'react-redux';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class AppRoot extends Component {

  state = {
    newPostModalOPen: false,
    editPostModalOpen: false
  }

  openNewPostForm() {
    this.setState({newPostModalOPen: true})
  }

  closeNewPostForm() {
    this.setState({newPostModalOPen: false})
  }

  openEditPostForm() {
    this.setState({editPostModalOPen: true})
  }

  closeEditPostForm() {
    this.setState({editPostModalOPen: false})
  }

  componentDidMount() {
    this.props.fetchCategories('http://localhost:3001/categories');
    this.props.fetchPosts('http://localhost:3001/posts');
  }

  render() {

    const {categories, location} = this.props;
    const {newPostModalOPen, editPostModalOPen} = this.state;

    console.log(location.pathname === '/')

    return (<div className="App">
      <header>
        <h1 className="App-title">Readable</h1>
        <div className='categories'>
          <ul>
            <li>
              <Link className={location.pathname === '/' ? 'text-info' : 'text-dark'} to='/'>all</Link>
            </li>
            {
              categories.map((cat, i) => (<li key={i}>
                <Link className={location.pathname === `/category/${cat.path}` ? 'text-info' : 'text-dark'}
                  to={`/category/${cat.path}`}>{cat.name}</Link>
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
      <hr/>
      <Route exact path='/' render={({match}) => (
        <PostList
          openEditPostModal={()=>this.openEditPostForm()}
          />)}
        />
      <Route path='/category/:category' render={({match}) => (
        <PostList
          openEditPostModal={()=>this.openEditPostForm()}
          category={match.params.category}
          />)}
        />
      <Route path='/posts/:id' render={({match}) => (
        <PostDetail
          openEditPostModal={()=>this.openEditPostForm()}
          postId={match.params.id}/>
      )}/>

      <Modal className='form-modal'
        overlayClassName='overlay'
        isOpen={newPostModalOPen}
        onRequestClose={this.closeNewPostForm.bind(this)}
        contentLabel='Modal'>
        <NewPost closeModal={()=>this.closeNewPostForm()} />
      </Modal>
      <Modal className='form-modal'
        overlayClassName='overlay'
        isOpen={editPostModalOPen}
        onRequestClose={this.closeEditPostForm.bind(this)}
        contentLabel='Modal'>
        <EditPost closeModal={()=>this.closeEditPostForm()} />
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
