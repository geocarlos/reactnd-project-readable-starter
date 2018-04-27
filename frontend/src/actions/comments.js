import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SHOW_COMMENTS,
} from './types';

import { fetchData, sendData, disableData } from './thunk_support';


export function addComment(comment = {}){
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function editComment(comment = {}){
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function deleteComment(comment){
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function disableComment(url){
  return disableData(url, deleteComment);
}

export function showComments(comments = []){
  return {
    type: SHOW_COMMENTS,
    comments
  }
}

export function updateComment(url, comment){
  return sendData(url, comment, editComment, 'PUT');
}

export function createComment(url, comment){
  return sendData(url, comment, addComment)
}

export function fetchComments(url){
  return fetchData(url, showComments);
}

export function voteComment(url, data){
  // data must be post.id and vote option
  return sendData(url, data, editComment)
}
