const AUTHORIZATION = 'geowildcat';

// Common function for posting data
export function sendData(url, data, actionCreator, METHOD = 'POST'){
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

// Disable posts or comments
export function disableData(url, actionCreator){
  return (dispatch) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': AUTHORIZATION,
      }
    })
    .then((res)=> res.json())
    .then((data)=> dispatch(actionCreator(data)))
    .catch((e)=>console.log('There was an error: ', e))
  }
}

// Common function to fetch data with thunk
export function fetchData(url, actionCreator) {

    return (dispatch) => {

        fetch(url, { headers: { 'Authorization': AUTHORIZATION }})
            .then((response) => response.json())
            .then((data) => dispatch(actionCreator(data)))
            .catch((e)=> console.log("There was an error fetching data: ", e));
    };
}
