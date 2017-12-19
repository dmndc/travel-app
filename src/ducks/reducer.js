import axios from "axios";
// Action Constants
const REQ_USER = "REQ_USER";

// Action Creators

// Initial State
const initialState = {};

// Reducer
export function requestUser() {
  return {
    type: REQ_USER,
    payload: axios.get("/api/me").then(response => response.data)
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });
    default:
      return state;
  }
}
