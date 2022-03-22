import { GET_ALL_COMMENTS } from "../actionTypes/commentsTypes";

const cache = window.localStorage.getItem('state');
const preloadedState = cache ? JSON.parse(cache).comments : [];

export default function commentReducer(state = preloadedState || [], { type, payload }) {
  switch (type) {

  case GET_ALL_COMMENTS:
    return payload;

  default:
    return state;
  }
}

