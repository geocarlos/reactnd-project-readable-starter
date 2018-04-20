import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {ConnectedRouter as Router, routerMiddleware} from 'react-router-redux';
import {withRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {Provider} from 'react-redux';

const RoutedApp = withRouter(App);
const history = createHistory();
const routerMid = routerMiddleware(history);
const store = createStore(reducer, applyMiddleware(thunk, routerMid));

console.log("Store: ", store)
console.log(store.getState())

ReactDOM.render(<Provider store={store}>
  <Router history={history}><RoutedApp/></Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
