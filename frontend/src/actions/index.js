export const FETCH_POSTS = 'FETCH_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const SHOW_COMMENTS = 'SHOW_COMMENTS';
export const POST_DETAIL = 'POST_DETAIL';
export const CHECK_FORM_ERRORS = 'CHECK_FORM_ERRORS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

/*
  Categories
*/

const AUTHORIZATION = 'geowildcat';

export function fetchCategories(categories = []){
  return {
    type: FETCH_CATEGORIES,
    categories
  }
}

export function fetchCategoryList(url){
  return fetchData(url, fetchCategories);
}

/*
  Post actions
*/
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

export function votePost(url, data){
  // data must be post.id and vote option
  console.log(data);
  return sendData(url, data, editPost)
}

export function createPost(url, post){
  return sendData(url, post, addPost)
}

export function fetchPostList(url){
  return fetchData(url, fetchPosts);
}

export function showPostDetails(postDetail = {}){
  return {
    type: POST_DETAIL,
    postDetail
  }
}

export function selectPost(url){
  return fetchData(url, showPostDetails);
}

export function updatePost(url, post){
  return sendData(url, post, editPost, 'PUT');
}

/*
  Comment actions
*/
export function addComment(comment = {}){
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function showComments(comments = []){
  return {
    type: SHOW_COMMENTS,
    comments
  }
}

export function createComment(url, comment){
  return sendData(url, comment, addComment)
}

export function fetchComments(url){
  return fetchData(url, showComments);
}


// Common function for posting data
function sendData(url, data, actionCreator, METHOD = 'POST'){
  return (dispatch) => {
    fetch(url, {
      method: METHOD,
      headers: {
        'Authorization': AUTHORIZATION,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res)=> res.json())
    .then((data)=> dispatch(actionCreator(data)))
    .catch((e)=>console.log('There was an error: ', e))
  }
}

// Common function to fetch data with thunk
function fetchData(url, actionCreator) {

    return (dispatch) => {

        fetch(url, { headers: { 'Authorization': AUTHORIZATION }})
            .then((response) => response.json())
            .then((data) => dispatch(actionCreator(data)))
            .catch((e)=> console.log("There was an error fetching data: ", e));
    };
}


// New post for validation
export function checkFormErrors(formErrors = {}){
  return {
    type: CHECK_FORM_ERRORS,
    formErrors
  }
}
