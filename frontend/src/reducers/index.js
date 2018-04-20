import {combineReducers} from 'redux'
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  ADD_POST,
  SHOW_COMMENTS,
  POST_DETAIL,
  CHECK_FORM_ERRORS
} from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS: // Fetch post list from the API
      return action.posts;
    case ADD_POST: // Add new post to the previously fetched list
      return [
        ...state,
        action.post
      ];
    default:
      return state;
  }
}

function categories(state = [], action){
  switch(action.type){
    case FETCH_CATEGORIES:
      const {categories} = action.categories;
      return [...state, ...categories];
    default:
      return state;
  }
}

function postDetail(state = {}, action){
  switch(action.type){
    case POST_DETAIL:
      return action.postDetail;
    default:
      return state;
  }
}

function comments(state = [], action) {
  switch (action.type) {
    case SHOW_COMMENTS:
      return action.comments;
    default:
      return state;
  }
}

function formErrors(state = {}, action){
  switch(action.type){
    case CHECK_FORM_ERRORS:
      return action.formErrors;
    default:
      return state;
  }
}

export default combineReducers({posts, postDetail, comments, formErrors, categories});
