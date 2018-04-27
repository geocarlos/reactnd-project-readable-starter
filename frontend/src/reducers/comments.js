import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SHOW_COMMENTS
} from '../actions/types';

export function comments(state = [], action) {
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
