export const FETCH_POSTS = 'FETCH_POSTS';

export function fetchPosts(posts = []) {
  return {type: FETCH_POSTS, posts};
}

export function fetchPostList(url){
  return fetchData(url, fetchPosts);
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
