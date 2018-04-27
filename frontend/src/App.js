import React, {Component} from 'react';
import logo from './img/readable_icon.svg';
import './App.css';
import {Route, Link} from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import * as postActions from './actions/posts';
import * as categoryActions from './actions/categories';
import {capitalize as cap} from './utils/general_functions';
import {connect} from 'react-redux';
import ConfirmDelete from './components/ConfirmDelete';
import Modal from 'react-modal';
import {push as goTo} from 'react-router-redux';
import {bindActionCreators} from 'redux';

Modal.setAppElement('#root');

class AppRoot extends Component {

  state = {
    newPostModalOPen: false,
    editPostModalOpen: false,
    confirmDeleteOpen: false
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
    this.props.fetchCategoryList('http://localhost:3001/categories');
    this.props.fetchPostList('http://localhost:3001/posts');
  }

  // Confirm delete post
  openDeleteModal(){
    this.setState({confirmDeleteOpen: true})
  }

  closeDeleteModal(){
    this.setState({confirmDeleteOpen: false});
  }

  confirmDelete(){
    this.props.disablePost(`http://localhost:3001/posts/${this.props.postToDelete}`);
    this.closeDeleteModal();
    // Redirect to root page
    this.props.goTo('/');
  }


  render() {

    const {categories, location} = this.props;
    const {newPostModalOPen, editPostModalOPen, confirmDeleteOpen} = this.state;

    return (<div className="App">
      <header>
        <h1 className="App-title"><img src={logo} alt='app logo'/>readable</h1>
        <div className='categories'>
          <ul>
            <li>
              <Link className={location.pathname === '/' ? 'text-info' : 'text-dark'} to='/'>All</Link>
            </li>
            {
              categories.map((cat, i) => (<li key={i}>
                <Link className={location.pathname === `/${cat.path}` ? 'text-info' : 'text-dark'}
                  to={`/${cat.path}`}>{cap(cat.name)}</Link>
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
          openDeleteModal={()=>this.openDeleteModal()}
          />)}
        />
      <Route exact path='/:category' render={({match}) => (
        <PostList
          openEditPostModal={()=>this.openEditPostForm()}
          openDeleteModal={()=>this.openDeleteModal()}
          category={match.params.category}
          />)}
        />
      <Route path='/:category/:id' render={({match}) => (
        <PostDetail
          openEditPostModal={()=>this.openEditPostForm()}
          openDeleteModal={()=>this.openDeleteModal()}
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
      <Modal className='confirm-modal'
        overlayClassName='confirm-overlay'
        isOpen={confirmDeleteOpen}
        onRequestClose={this.closeDeleteModal.bind(this)}
        contentLabel='Modal'>
        <ConfirmDelete
          confirmDelete={()=>this.confirmDelete()}
          closeModal={()=>this.closeDeleteModal()}
         />
      </Modal>
    </div>);
  }
}

function mapStateToProps({categories, selectedPost}) {
  return {categories, postToDelete: selectedPost}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...postActions,
    ...categoryActions,
    goTo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
