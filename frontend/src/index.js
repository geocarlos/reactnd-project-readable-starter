import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AppRoot from './App';
import registerServiceWorker from './registerServiceWorker';
import {ConnectedRouter as Router, routerMiddleware} from 'react-router-redux';
import {withRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {Provider} from 'react-redux';

const App = withRouter(AppRoot);
const history = createHistory();
const routerMid = routerMiddleware(history);
const store = createStore(reducer, applyMiddleware(thunk, routerMid));

ReactDOM.render(<Provider store={store}>
  <Router history={history}><App/></Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();

/**
"A programmer is by nature good; it is kludge which ruins him"
    ~ Jean-Jacques Rousseau
*/
