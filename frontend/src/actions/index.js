export const FETCH_POSTS = 'FETCH_POSTS';
export const ADD_POST = 'ADD_POST';
export const SHOW_COMMENTS = 'SHOW_COMMENTS';
export const POST_DETAIL = 'POST_DETAIL';

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
  console.log("In the action:", post);
  return {
    type: ADD_POST,
    post
  }
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


/*
  Comment actions
*/
export function showComments(comments = []){
  return {
    type: SHOW_COMMENTS,
    comments
  }
}

export function fetchComments(url){
  return fetchData(url, showComments);
}


export function createPost(url, post){
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'geowildcat',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then((res)=> res.json())
    .then((post)=> dispatch(addPost(post)))
    .catch((e)=>console.log('There was an error: ', e))
  }
}


// Common function to fetch data with thunk
function fetchData(url, actionCreator) {

    return (dispatch) => {

        fetch(url, { headers: { 'Authorization': 'geowildcat' }})
            .then((response) => response.json())
            .then((data) => dispatch(actionCreator(data)))
            .catch((e)=> console.log("There was an error fetching data: ", e));
    };
}
