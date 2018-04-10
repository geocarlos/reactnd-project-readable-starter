export const FETCH_POSTS = 'FETCH_POSTS';
export const ADD_POST = 'ADD_POST';

export function fetchPosts(posts = []) {
  return {type: FETCH_POSTS, posts};
}

export function fetchPostList(url){
  return fetchData(url, fetchPosts);
}

export function addPost(post = {}){
  console.log("In the action:",post);
  return {
    type: ADD_POST,
    post
  }
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
    .catch(()=>console.log('There was an error...'))
  }
}


// Fetch data with thunk
function fetchData(url, actionCreator) {

    return (dispatch) => {

        fetch(url, { headers: { 'Authorization': 'geowildcat' }})
            .then((response) => response.json())
            .then((data) => dispatch(actionCreator(data)))
            .catch(()=> console.log("There was an error fetching data..."));
    };
}
