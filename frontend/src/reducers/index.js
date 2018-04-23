import {combineReducers} from 'redux'
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SHOW_COMMENTS,
  POST_DETAIL,
  CHECK_FORM_ERRORS
} from '../actions';

function posts(state = [], action) {

  // Make a copy of the state
  const newState = Object.assign([], state);

  switch (action.type) {
    case FETCH_POSTS: // Fetch post list from the API
      return action.posts;
    case ADD_POST: // Add new post to the previously fetched list
      return [
        ...state,
        action.post
      ];
    case EDIT_POST:
      newState.map((p,i)=>{
        if(p.id === action.post.id){
          newState[i] = action.post;
        }
        return null;
      })
      return newState;
    case DELETE_POST:
      newState.map((p,i)=>{
        if(p.id === action.post.id){
          newState.splice(i, 1);
        }
        return null;
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
  const newState = Object.assign([], state);
  switch (action.type) {
    case SHOW_COMMENTS:
      return action.comments;
    case ADD_COMMENT:
      return [
        ...state,
        action.comment
      ]
    case EDIT_COMMENT:
      newState.map((p,i)=>{
        if(p.id === action.comment.id){
          newState[i] = action.comment;
        }
        return null;
      })
      return newState;
    case DELETE_COMMENT:
      newState.map((p,i)=>{
        if(p.id === action.comment.id){
          newState.splice(i, 1);
        }
        return null;
      })
      return newState;
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
