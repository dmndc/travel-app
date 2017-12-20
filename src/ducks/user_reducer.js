import axios from "axios";
// Action Constants
const REQ_USER = "REQ_USER";
const GET_WATCHLIST = "GET_WATCHLIST";
const GET_LOCATION = "GET_LOCATION";

// Action Creators

// Initial State
const initialState = {
  user: {},
  watchlist: [],
  user_location: {}
};

// axios call to get locations/destinations/longitude and lattitude of search results
// export function getLocations() {
//   return {
//     type: GET_LOCATIONS,
//     payload:
//   }
// }

export default function users(state = initialState, action) {
  switch (action.type) {
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });
    case GET_LOCATION + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case GET_LOCATION + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user_location: action.payload
      });

    case GET_WATCHLIST:
      return Object.assign({}, state, { watchlist: action.payload });

    default:
      return state;
  }
}

export function requestUser() {
  return {
    type: REQ_USER,
    payload: axios.get("/api/me").then(response => response.data)
  };
}
export function getWatchlist(user_id) {
  return {
    type: GET_WATCHLIST,
    payload: axios
      .get(`/api/getWatchlist/${user_id}`)
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(err => err)
  };
}
export function getLocation(location) {
  return {
    type: GET_LOCATION,
    payload: function() {
      if ("geolocation" in navigator) {
        //geolocation is available
        navigator.geolocation.getCurrentPosition(position => {
          //Call getAirport endpoint on server
          axios
            .get(
              `/api/getAirport?lat=${position.coords.latitude}&long=${
                position.coords.longitude
              }`
            )
            .then(response => ({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              airport: response.data
            }));
          console.log(this.props.user_location);
        });
      }
    }
  };
}
