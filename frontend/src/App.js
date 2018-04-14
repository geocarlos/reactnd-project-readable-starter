import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, Link} from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import {fetchPostList} from './actions';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.fetchPosts('http://localhost:3001/posts');
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <h1 className="App-title">Readable</h1>
      </header>
      <Link to='/new_post'>New Post</Link>
      <Route exact path='/' component={PostList}/>
      <Route path='/category/:category' render={({match}) =>
        (<PostList category={match.params.category}/>)}/>
      <Route path='/posts/:id' render={({match}) =>
        (<PostDetail postId={match.params.id}/>)}/>
      <Route path='/new_post' component={NewPost}/>
    </div>);
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (url) => dispatch(fetchPostList(url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
