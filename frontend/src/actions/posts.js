import {
  FETCH_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  POST_DETAIL,
  SELECTED_POST
} from './types';

import { fetchData, sendData, disableData } from './thunk_support';

export function fetchPosts(posts = []) {
  return {
    type: FETCH_POSTS,
    posts
  };
}

export function addPost(post = {}){
  return {
    type: ADD_POST,
    post
  }
}

export function editPost(post){
  return {
    type: EDIT_POST,
    post
  }
}

export function deletePost(post){
  return {
    type: DELETE_POST,
    post
  }
}

export function selectedPost(id = null){
  return {
    type: SELECTED_POST,
    id
  }
}

export function showPostDetails(postDetail = {}){
  return {
    type: POST_DETAIL,
    postDetail
  }
}


export function disablePost(url){
  return disableData(url, deletePost);
}

export function votePost(url, data){
  // data must be post.id and vote option
  return sendData(url, data, editPost)
}

export function createPost(url, post){
  return sendData(url, post, addPost)
}

export function fetchPostList(url){
  return fetchData(url, fetchPosts);
}

export function selectPost(url){
  return fetchData(url, showPostDetails);
}

export function updatePost(url, post){
  return sendData(url, post, editPost, 'PUT');
}
