import {
  FETCH_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  POST_DETAIL,
  SELECTED_POST
} from '../actions/types';

// Post List
export function posts(state = [], action) {

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

// Post detail
export function postDetail(state = {}, action){
  switch(action.type){
    case POST_DETAIL:
      return action.postDetail;
    default:
      return state;
  }
}

// Select post to confirm delete
export function selectedPost(state = null, action){
  switch(action.type){
    case SELECTED_POST:
      return action.id;
    default:
      return state
  }
}
