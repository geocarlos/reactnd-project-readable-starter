import {combineReducers} from 'redux'
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  ADD_POST,
  EDIT_POST,
  ADD_COMMENT,
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
    case EDIT_POST:
      const post = state.filter(p => p.id === action.post.id)[0];
      const newState = Object.assign([], state);
      newState.map((p,i)=>{
        if(p.id === action.post.id){
          newState[i] = action.post;
        }
      })
      return newState;
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
    case ADD_COMMENT:
      return [
        ...state,
        action.comment
      ]
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
