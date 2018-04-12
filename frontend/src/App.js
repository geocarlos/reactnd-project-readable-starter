import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, Link} from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';

class App extends Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <h1 className="App-title">Readable</h1>
      </header>
      <Link to='/new_post'>New Post</Link>
      <Route exact path='/' component={PostList}/>
      <Route path='/posts/:id' render={({match}) => (
        <PostDetail postId={match.params.id}/>)}/>
      <Route path='/new_post' component={NewPost}/>
    </div>);
  }
}

export default App;
