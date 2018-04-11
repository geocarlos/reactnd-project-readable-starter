import {combineReducers} from 'redux'
import {FETCH_POSTS, ADD_POST} from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.posts;
    case ADD_POST:
      return [...state, action.post];
    default:
      return state;
  }
}

export default combineReducers({posts});
