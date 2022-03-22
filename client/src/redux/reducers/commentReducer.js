import { ADD_NEW_COMMENT, GET_ALL_COMMENTS } from "../actionTypes/commentTypes";

const cache = window.localStorage.getItem('state');
const preloadedState = cache ? JSON.parse(cache).comments : [];

export default function commentReducer(state = preloadedState || [], action) {
  const { type, payload } = action;
  
  switch (type) {

  case GET_ALL_COMMENTS:
    return payload;

  case ADD_NEW_COMMENT:
    return [payload, ...state];

  default:
    return state;
  }
}

